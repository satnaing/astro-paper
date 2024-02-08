export interface Database {
  Title: string;
  Description: string;
  Icon: FileObject | Emoji | null;
  Cover: FileObject | null;
}

export interface Post {
  PageId: string;
  Title: string;
  Icon: FileObject | Emoji | null;
  Cover: FileObject | null;
  Slug: string;
  Date: string;
  Tags: SelectProperty[];
  Excerpt: string;
  FeaturedImage: FileObject | null;
  Rank: number;
}

export interface Block {
  Id: string;
  Type: string;
  HasChildren: boolean;

  Paragraph?: Paragraph;
  Heading1?: Heading1;
  Heading2?: Heading2;
  Heading3?: Heading3;
  BulletedListItem?: BulletedListItem;
  NumberedListItem?: NumberedListItem;
  ToDo?: ToDo;
  Image?: Image;
  File?: File;
  Code?: Code;
  Quote?: Quote;
  Equation?: Equation;
  Callout?: Callout;
  SyncedBlock?: SyncedBlock;
  Toggle?: Toggle;
  Embed?: Embed;
  Video?: Video;
  Bookmark?: Bookmark;
  LinkPreview?: LinkPreview;
  Table?: Table;
  ColumnList?: ColumnList;
  TableOfContents?: TableOfContents;
  LinkToPage?: LinkToPage;
}

export interface Paragraph {
  RichTexts: RichText[];
  Color: string;
  Children?: Block[];
}

export interface Heading1 {
  RichTexts: RichText[];
  Color: string;
  IsToggleable: boolean;
  Children?: Block[];
}

export interface Heading2 {
  RichTexts: RichText[];
  Color: string;
  IsToggleable: boolean;
  Children?: Block[];
}

export interface Heading3 {
  RichTexts: RichText[];
  Color: string;
  IsToggleable: boolean;
  Children?: Block[];
}

export interface BulletedListItem {
  RichTexts: RichText[];
  Color: string;
  Children?: Block[];
}

export interface NumberedListItem {
  RichTexts: RichText[];
  Color: string;
  Children?: Block[];
}

export interface ToDo {
  RichTexts: RichText[];
  Checked: boolean;
  Color: string;
  Children?: Block[];
}

export interface Image {
  Caption: RichText[];
  Type: string;
  File?: FileObject;
  External?: External;
  Width?: number;
  Height?: number;
}

export interface Video {
  Caption: RichText[];
  Type: string;
  External?: External;
}

export interface File {
  Caption: RichText[];
  Type: string;
  File?: FileObject;
  External?: External;
}

export interface FileObject {
  Type: string;
  Url: string;
  ExpiryTime?: string;
}

export interface External {
  Url: string;
}

export interface Code {
  Caption: RichText[];
  RichTexts: RichText[];
  Language: string;
}

export interface Quote {
  RichTexts: RichText[];
  Color: string;
  Children?: Block[];
}

export interface Equation {
  Expression: string;
}

export interface Callout {
  RichTexts: RichText[];
  Icon: FileObject | Emoji | null;
  Color: string;
  Children?: Block[];
}

export interface SyncedBlock {
  SyncedFrom: SyncedFrom | null;
  Children?: Block[];
}

export interface SyncedFrom {
  BlockId: string;
}

export interface Toggle {
  RichTexts: RichText[];
  Color: string;
  Children: Block[];
}

export interface Embed {
  Url: string;
}

export interface Bookmark {
  Url: string;
}

export interface LinkPreview {
  Url: string;
}

export interface Table {
  TableWidth: number;
  HasColumnHeader: boolean;
  HasRowHeader: boolean;
  Rows: TableRow[];
}

export interface TableRow {
  Id: string;
  Type: string;
  HasChildren: boolean;
  Cells: TableCell[];
}

export interface TableCell {
  RichTexts: RichText[];
}

export interface ColumnList {
  Columns: Column[];
}

export interface Column {
  Id: string;
  Type: string;
  HasChildren: boolean;
  Children: Block[];
}

export interface List {
  Type: string;
  ListItems: Block[];
}

export interface TableOfContents {
  Color: string;
}

export interface RichText {
  Text?: Text;
  Annotation: Annotation;
  PlainText: string;
  Href?: string;
  Equation?: Equation;
  Mention?: Mention;
}

export interface Text {
  Content: string;
  Link?: Link;
}

export interface Emoji {
  Type: string;
  Emoji: string;
}

export interface Annotation {
  Bold: boolean;
  Italic: boolean;
  Strikethrough: boolean;
  Underline: boolean;
  Code: boolean;
  Color: string;
}

export interface Link {
  Url: string;
}

export interface SelectProperty {
  id: string;
  name: string;
  color: string;
}

export interface LinkToPage {
  Type: string;
  PageId: string;
}

export interface Mention {
  Type: string;
  Page?: Reference;
}

export interface Reference {
  Id: string;
}
