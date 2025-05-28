---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2019-07-31T08:21+08:00
title: ThinkPHP Save 方法引发的错误
slug: tp-save
ogImage: https://cos.lhasa.icu/ArticlePictures/ThinkPHP.jpg_81
tags:
  - ThinkPHP
  - Save
  - PHP
  - Bug
  
description: 事情是这样的，今下午在我在完善修改老人档案表单验证的时候遇到点问题。明明 Save 方法执行成功却报错？
---

事情是这样的，今下午在我在完善修改老人档案表单验证的时候遇到点问题。明明 Save 方法执行成功却报错？
```php
if ( !empty( $ChildrenDate[ 'name' ] ) OR !empty( $ChildrenDate[ 'idcard_no' ] OR !empty( $ChildrenDate[ 'tel' ] ) OR !empty( $ChildrenDate[ 'relation' ] ) ) ) {
    if ( !empty( $ChildrenDate[ 'name' ] ) ) {
        if ( $ChildrenDate[ 'sex' ] AND $ChildrenDate[ 'idcard_no' ] AND $ChildrenDate[ 'tel' ] AND $ChildrenDate[ 'relation' ] == TRUE ) {
            $AddChildren = D( 'OlderFamily' ) -> where( array( 'id' => I( 'id' ) ) ) -> save( $ChildrenDate );
            if ( $AddChildren == FALSE ) {
                print_r( D( 'OlderFamily' ) -> getLastSql() );die;
                // $this -> error( "数据操作失败，请与管理员联系！" );
            }
        }
        else {
            $this -> error( '请补充完整家属信息！' );
        }
    }
    else {
        $this -> error( '请输入家属姓名！' );
    }
}
```

就不能惯它！要么成功，要么就用`getLastSql()`打它

```sql
UPDATE `glbt_older_family` SET `older_id` = 31649,`name` = '阿川',`sex` = 2,`idcard_no` = '412727200001160414',`tel` = '18623947428',`relation` = '家人' WHERE( `id` = 4000 );
> Affected rows: 0
> 时间: 0.001s
```

执行了一下UPDATE并返回 **0**，也就是说语法并没有错只是没有修改数据。然后我又改变 sex 值为 1，然后返回了`Affected rows: 1`修改成功了！<br>
这个UPDATE语句我输出输入几十遍，一点错都没有。我脑子笨，找了好长时间找不到，然后把这个逻辑重写了两遍。然而还是无用...一度感到难受...<br>

好了事情的转折点来了！出于个人癖好，总是喜欢闲着没事敲键盘点鼠标，按着按着鼠标乱点到了save方法，跳到Model模型类源码...<br>
出于好奇，反正来都来了，也瞅瞅Save的源码（这里感谢PHPSTORM的强大）

```php
// Model.class.php
public function save ( $data = '', $options = array() )
{
    if ( empty( $data ) ) {
        if ( !empty( $this -> data ) ) {
            $data = $this -> data;
        }
        else {
            $this -> error = L( '_DATA_TYPE_INVALID_' );
            return FALSE;
        }
    }
    $data = $this -> _facade( $data );
    
    $options = $this -> _parseOptions( $options );
    if ( !isset( $options[ 'where' ] ) ) {
        if ( isset( $data[ $this -> getPk() ] ) ) {
            $pk                 = $this -> getPk();
            $where[ $pk ]       = $data[ $pk ];
            $options[ 'where' ] = $where;
            unset( $data[ $pk ] );
        }
        else {
            $this -> error = L( '_OPERATION_WRONG_' );
            return FALSE;
        }
    }
    $result = $this -> db -> update( $data, $options );
    return $result;
}


// Db.calss.php
public function update ( $data, $options )
{
    $sql   = 'UPDATE '
        . $this -> parseTable( $options[ 'table' ] )
        . $this -> parseSet( $data )
        . $this -> parseWhere( isset( $options[ 'where' ] ) ? $options[ 'where' ] : '' )
        . $this -> parseOrder( isset( $options[ 'order' ] ) ? $options[ 'order' ] : '' )
        . $this -> parseLimit( isset( $options[ 'limit' ] ) ? $options[ 'limit' ] : '' )
        . $this -> parseLock( isset( $options[ 'lock' ] ) ? $options[ 'lock' ] : false );
    return $this -> execute( $sql );
}


// DbPdo.class.php
public function execute ( $str )
{
    $this -> initConnect( TRUE );
    if ( !$this -> _linkID )
        return FALSE;
    $this -> queryStr = $str;
    $flag             = FALSE;
    if ( $this -> dbType == 'OCI' ) {
        if ( preg_match( "/^\s*(INSERT\s+INTO)\s+(\w+)\s+/i", $this -> queryStr, $match ) ) {
            $this -> table = C( "DB_SEQUENCE_PREFIX" ) . str_ireplace( C( "DB_PREFIX" ), "", $match[ 2 ] );
            $flag          = (boolean) $this -> query( "SELECT * FROM user_sequences WHERE sequence_name='" . strtoupper( $this -> table ) . "'" );
        }
    }

    if ( !empty( $this -> PDOStatement ) )
        $this -> free();
    N( 'db_write', 1 );

    G( 'queryStartTime' );
    $this -> PDOStatement = $this -> _linkID -> prepare( $str );
    if ( FALSE === $this -> PDOStatement ) {
        throw_exception( $this -> error() );
    }
    $result = $this -> PDOStatement -> execute();
    $this -> debug();
    if ( FALSE === $result ) {
        $this -> error();
        return FALSE;
    }
    else {
        $this -> numRows = $this -> PDOStatement -> rowCount();
        if ( $flag || preg_match( "/^\s*(INSERT\s+INTO|REPLACE\s+INTO)\s+/i", $str ) ) {
            $this -> lastInsID = $this -> getLastInsertId();
        }
        return $this -> numRows;
    }
}

```
ThinkPHP内置抽象数据库访问层，它是基于PDO封装实现的，项目使用数据库是MySQL，下面开始找UPDATE方法的返回参数。<br>
通过`$result = $this -> db -> update( $data, $options );`找到`UPDATE`更新语句方法。<br>
再通过`return $this -> execute( $sql );`找到`execute`执行语句方法。<br>

```php
$this -> numRows = $this -> PDOStatement -> rowCount();
if ( $flag || preg_match( "/^\s*(INSERT\s+INTO|REPLACE\s+INTO)\s+/i", $str ) ) {
    $this -> lastInsID = $this -> getLastInsertId();
}
return $this -> numRows;
```

在`execute`方法里有段代码返回个`rowCount()`这是什么玩意...它认识我，我不认识它。翻一下手册了解到是返回SQL语句影响的行数（真是对不起楚老师当初还手把手教我们封装PDO...）<br>

也就是说它返回的 SQL影响行数就是我判断的参数，根据SQL输出来说返回个0，是的，是个0。我的判断`$AddChildren == FALSE`<br>
我瞬间就特么服了Save这个方法...，返回给我0，我是用等于号对比值`0 == FALSE`这玩意貌似没啥意义...<br>

因为在使用`==`比较的时候，**0会进行布尔转换**，在PHP中0即FALSE。我是要你是用来判断错误的，你他妈一对比不是相等了...<br>
所以说全等`===`进行比较值，**拒绝类型转换**，**直接比较值和类型**。结果就是整型不等于布尔，解决问题。