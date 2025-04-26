---
author: tanc
pubDatetime: 2018-12-02T14:00:00+08:00
modDatetime: 2018-12-02T14:00:00+08:00
title: Java 类加载机制详解
slug: personal/20181202-java-classloader
featured: false
draft: false
tags:
  - Java
  - Classloader
description:
  深入理解 Java 的类加载机制，包括内置类加载器、双亲委托机制及线程上下文类加载器。

---

这次来了解一下 Java 的类加载机制。

## Table of contents

## 内置类加载器

首先介绍 JDK 内置的类加载器：

- BootstrapClassLoader
- ExtClassLoader
- AppClassLoader

BootstrapClassLoader 也就是根加载器，该加载器是最顶级的加载器，没有任何父类加载器，由 C++ 编写，负责虚拟机核心类库的加载，如 String 等。

```java
System.out.println(String.class.getClassLoader());
// 根加载器是获取不到引用的，所以输出为
// null
```

ExtClassLoader 即扩展类加载器，用于加载 `JAVA_HOME` 下的 `jre/lib/ext` 等目录下的类库。

```java
ClassLoader cl = JarFileSystemProvider.class.getClassLoader();
System.out.println(cl);
System.out.println(cl.getParent());
// 该类是在 jre/lib/ext 下面的 jar 包中，所以输出为
// sun.misc.Launcher$ExtClassLoader@3cd1a2f1
// null
```

AppClassLoader 也就是应用加载器或者系统类加载器，负责加载 `classpath` 下面的 class 文件，通常来说我们编写的类运行时都是通过这个加载器加载的。

```java
ClassLoader cl = Hello.class.getClassLoader();
System.out.println(cl);
System.out.println(cl.getParent());
// 我自己编写的 Hello 类，在 classpath 下面，输出为
// sun.misc.Launcher$AppClassLoader@18b4aac2
// sun.misc.Launcher$ExtClassLoader@3cd1a2f1
```

## 自定义类加载器

通过继承 ClassLoader 类，然后覆盖 findClass 方法，即可完成自定义类加载器的工作。

```java
// ClassLoader 中默认直接抛出异常，需要自己实现寻找 class 文件的逻辑
protected Class<?> findClass(String name) throws ClassNotFoundException {
    throw new ClassNotFoundException(name);
}
```
后面会具体实现一个加载器，这里不再多说。

## 双亲委托机制

有了类加载器，具体的加载机制是怎样的呢？什么是双亲委托机制呢？

下面是 ClassLoader 中 loadClass 方法的源码，分析一波

```java
public Class<?> loadClass(String name) throws ClassNotFoundException {
    return loadClass(name, false);
}
protected Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException {
    synchronized (getClassLoadingLock(name)) {
        // 1
        Class<?> c = findLoadedClass(name);
        if (c == null) {
            long t0 = System.nanoTime();
            try {
                if (parent != null) {
                    // 2
                    c = parent.loadClass(name, false);
                } else {
                    // 3
                    c = findBootstrapClassOrNull(name);
                }
            } catch (ClassNotFoundException e) {
                // ClassNotFoundException thrown if class not found
                // from the non-null parent class loader
            }

            if (c == null) {
                // 4
                long t1 = System.nanoTime();
                c = findClass(name);

                // this is the defining class loader; record the stats
                sun.misc.PerfCounter.getParentDelegationTime().addTime(t1 - t0);
                sun.misc.PerfCounter.getFindClassTime().addElapsedTimeFrom(t1);
                sun.misc.PerfCounter.getFindClasses().increment();
            }
        }
        if (resolve) {
            resolveClass(c);
        }
        return c;
    }
}
```

首先检查是否已经加载，是的话就直接返回

如果父加载器不为空，则调用父加载器的 loadClass 方法

如果父加载器为空，则使用根加载器加载

如果没有加载成功，则调用自己的 findClass 方法

可以看出，所谓双亲委托，也叫父委托机制，即所有类的加载都会先委托给父加载器进行处理，当父加载器不能完成加载时，才会自己加载。

### 这样做的好处是什么呢？

在 Java 中类的唯一性并不只是通过包名和类名进行判断，还会根据类加载器是否为同一个来进行判断。

假设同一个类由不同的类加载器分别加载，得到的 Class 对象也是不同的。

相当于一个类加载器就是一个命名空间，不同命名空间下的相同的包名和类名的类也不是同一个类。

由于双亲委托机制，类的加载首先交给父加载器加载，如 String 类，不管交给哪个加载器加载，最终都会由 BootstrapClassLoader 加载，所以拿到的 String 类都是同一份。

如果某人破坏了双亲加载机制，制造了一个 String 类出来，但是跟类库中的 String 类也是不同的，因为类加载器是不同的，防止了安全问题。

还有就是隔离的作用，比如 Tomcat 中有多个应用，假设是相同的应用，类都是一样的，但是使用了不同的类加载器分别加载，就实现了多个应用的隔离。

### 破坏双亲加载

说到破坏双亲委托机制，也很简单，自定义 ClassLoader 的时候，同时覆盖 loadClass 方法，自己实现加载逻辑，从而破坏双亲加载的机制。

补充一点，类加载器的父子关系并不是使用继承实现的，而是使用组合的方式，即子类持有父加载器，比如 ExtClassLoader 的继承自 URLClassLoader，但实际的父加载器是 BootstrapClassLoader。

## 线程上下文类加载器

为什么需要线程上下文类加载器呢？

从 SPI（Service Provider Interface）机制说起，JDK 提供了很多 SPI 接口，常见的如 JDBC，第三方厂商只需要提供具体实现即可。JDBC 接口类，其中包括 DriverManager 类是由 BootstrapClassLoader 加载，当在 DriverManager 中生成 Connection 的实现类时，需要加载具体的实现类，而 BootstrapClassLoader 是加载不到这些实现类的，由于双亲委托机制，又不能委托给 AppClassLoader。

这时就需要线程上下文类加载器了，在 DriverManager 中获取到线程上下文类加载器，通常就是 AppClassLoader，于是在 DriverManager 中可以加载到第三方的实现类了。

```java
System.out.println(Thread.currentThread().getContextClassLoader());
// sun.misc.Launcher$AppClassLoader@18b4aac2
```

线程上下文的获取方式如上面的代码所示，当没有显式的进行设置时，默认是与父线程保持相同的类加载器，而所有线程又是从 Main 线程派生出来，即 main 函数所在的线程，main 函数所在的类是 AppClassLoader 加载的，所以默认情况下获取到的是 AppClassLoader。

## 热加载示例

下面来简单实现一个热加载的例子，首先定义一个接口

```java
public interface Info {
    void show();
}
```

main 函数里面循环调用 show 方法，开始的时候使用一个匿名实现类。

```java
import java.nio.file.*;
import java.util.concurrent.TimeUnit;

public class App {

    // 匿名实现输出 main info
    private static Info info = () -> System.out.println("main info");

    public static void main(String[] args) throws Exception {

        // 创建守护线程，监听 class 文件更改
        Thread thread = new Thread(()-> startWatch());
        thread.setDaemon(true);
        thread.start();

        while (true) {
            info.show();
            TimeUnit.SECONDS.sleep(5);
        }
    }

    private static void startWatch() {
        final Path path = Paths.get("/Users/test/classes");
        try {
            WatchService watcher = FileSystems.getDefault().newWatchService();

            path.register(watcher, StandardWatchEventKinds.ENTRY_MODIFY);

            while (true) {
                WatchKey key = watcher.take();
                for (WatchEvent<?> event : key.pollEvents()) {
                    if (event.kind() == StandardWatchEventKinds.ENTRY_MODIFY) {
                        // 监听 class 文件的修改事件
                        String fileName = event.context().toString();
                        if (fileName.endsWith(".class")) {
                            String className = fileName.split("[.]")[0];
                            reload(className);
                        }
                    }
                }
                key.reset();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void reload(String name) {
        MyClassLoader classLoader = new MyClassLoader();
        try {
            Class<?> clazz = Class.forName(name, true, classLoader);
            // 替换 info 的实现类
            info = (Info) clazz.newInstance();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

同时有一个守护线程，负责监听 /Users/test/classes 目录下面 class 文件的变化事件，当 class 文件发生修改，则使用自定义的加载器重新加载类，然后替换 info。

自定义的加载器实现如下，覆盖 findClass 方法即可，可以加载 /Users/test/classes 文件夹下的 class 文件。

```java
public class MyClassLoader extends ClassLoader {

    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        File file = new File("/Users/test/classes/" + name + ".class");
        try {
            // 将文件读入 byte 数组，篇幅问题，具体实现就不贴出来了
            byte[] bytes = getClassBytes(file);
            return this.defineClass(name, bytes, 0, bytes.length);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.findClass(name);
    }
}
```

当程序启动起来后，控制台会不断的进行输出。接下来在 /Users/test/classes 文件夹下编写一个 Info 接口的实现类，然后使用 javac 进行编译，生成 class 文件。

```java
public class InfoImpl implements Info {
    @Override
    public void show() {
        System.out.println("another info");
    }
}
```

守护线程会监听到这个修改事件，然后进行加载和实例化，并将该实例赋值给 info，从而改变了 info 的输出内容，如下

```
main info
main info
main info
main info
another info
another info
another info
...
```

这个示例比较简单，以后看了 tomcat 的实现再来聊聊，如果有不对的地方请提出来哈。
