// Query a database response
// https://developers.notion.com/reference/post-database-query
export interface QueryDatabaseResponse {
  object: string;
  results: PageObject[];
  next_cursor: null | string;
  has_more: boolean;
  type: string;
  page?: Record<string, never>;
}

// Retrieve a database response
// https://developers.notion.com/reference/retrieve-a-database
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RetrieveDatabaseResponse extends DatabaseObject {}

// Retrieve a block response
// https://developers.notion.com/reference/retrieve-a-block
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RetrieveBlockResponse extends BlockObject {}

// Retrieve block children response
// https://developers.notion.com/reference/get-block-children
export interface RetrieveBlockChildrenResponse {
  object: string;
  results: BlockObject[];
  next_cursor: null | string;
  has_more: boolean;
  type: string;
  block?: Record<string, never>;
}

// common interfaces
interface UserObject {
  object: string;
  id: string;
}

interface FileObject {
  type: string;
  name?: string;
  external?: External;
  file?: File;
}

interface File {
  url: string;
  expiry_time: string;
}

interface External {
  url: string;
}

export interface Emoji {
  type: string;
  emoji: string;
}

interface Parent {
  type: string;
  database_id?: string;
  page_id?: string;
}

export interface RichTextObject {
  type: string;
  plain_text: string;
  annotations: Annotations;
  href?: string;

  text?: Text;
  mention?: Mention;
  equation?: Equation;
}

interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

interface Text {
  content: string;
  link?: Link;
}

interface Link {
  type: string;
  url: string;
}

interface Mention {
  type: string;

  user?: UserObject;
  page?: Reference;
  database?: Reference;
  date?: DateProperty;
  link_preview?: LinkPreview;
}

interface Reference {
  id: string;
}

interface DateProperty {
  start: string;
  end?: null | string;
  timezone?: null | string;
}

interface LinkPreview {
  url: string;
}

interface Equation {
  expression: string;
}

// Database object
// https://developers.notion.com/reference/database
interface DatabaseObject {
  object: string;
  id: string;
  created_time: string;
  created_by: UserObject;
  last_edited_time: string;
  last_edited_by: UserObject;
  title: RichTextObject[];
  description: RichTextObject[];
  icon: FileObject | Emoji | null;
  cover: FileObject;
  properties: DatabaseProperties;
  parent: Parent;
  url: string;
  archived: boolean;
  is_inline: boolean;
}

interface DatabaseProperties {
  [key: string]: DatabaseProperty;
}

interface DatabaseProperty {
  id: string;
  type: string;

  title?: Record<string, never>;
  rich_text?: Record<string, never>;
  number?: NumberConfiguration;
  select?: SelectConfiguration;
  status?: StatusConfiguration;
  multi_select?: SelectConfiguration;
  date?: Record<string, never>;
  people?: Record<string, never>;
  files?: Record<string, never>;
  checkbox?: Record<string, never>;
  url?: Record<string, never>;
  email?: Record<string, never>;
  phone_number?: Record<string, never>;
  formula?: FormulaConfiguration;
  relation?: RelationConfiguration;
  rollup?: RollupConfiguration;
  created_time?: Record<string, never>;
  created_by?: Record<string, never>;
  last_edited_time?: Record<string, never>;
  last_edited_by?: Record<string, never>;
}

interface NumberConfiguration {
  format: string;
}

interface SelectConfiguration {
  options: SelectOptionObject[];
}

interface SelectOptionObject {
  name: string;
  id: string;
  color: string;
}

interface StatusConfiguration {
  options: StatusOptionObject[];
  groups: StatusGroupObject[];
}

interface StatusOptionObject {
  name: string;
  id: string;
  color: string;
}

interface StatusGroupObject {
  name: string;
  id: string;
  color: string;
  option_ids: string[];
}

interface FormulaConfiguration {
  expression: string;
}

interface RelationConfiguration {
  database_id: string;
  type: string;

  single_property?: Record<string, never>;
  dual_property?: DualPropertyRelationConfiguration;
}

interface DualPropertyRelationConfiguration {
  synced_property_name: string;
  synced_property_id: string;
}

interface RollupConfiguration {
  relation_property_name: string;
  relation_property_id: string;
  rollup_property_name: string;
  rollup_property_id: string;
  function: string;
}

// Page object
// https://developers.notion.com/reference/page
export interface PageObject {
  object: string;
  id: string;
  created_time: string;
  created_by: UserObject;
  last_edited_time: string;
  last_edited_by: UserObject;
  archived: boolean;
  icon: FileObject | Emoji | null;
  cover: FileObject;
  properties: PageProperties;
  parent: Parent;
  url: string;
}

interface PageProperties {
  [key: string]: PageProperty;
}

interface PageProperty {
  id: string;
  type: string;

  title?: RichTextObject[];
  rich_text?: RichTextObject[];
  number?: number;
  select?: SelectProperty;
  status?: StatusProperty;
  multi_select?: SelectProperty[];
  date?: DateProperty;
  formula?: FormulaProperty;
  relation?: RelationProperty[];
  rollup?: RollupProperty;
  people?: UserObject[];
  files?: FileObject[];
  checkbox?: boolean;
  url?: string;
  email?: string;
  phone_number?: string;
  created_time?: string;
  created_by?: UserObject;
  last_edited_time?: string;
  last_edited_by?: UserObject;
}

interface SelectProperty {
  id: string;
  name: string;
  color: string;
}

interface StatusProperty {
  id: string;
  name: string;
  color: string;
}

interface FormulaProperty {
  type: string;

  number?: number;
  string?: string;
  boolean?: boolean;
  date?: DateProperty;
}

interface RelationProperty {
  id: string;
}

interface RollupProperty {
  type: string;
  function: string;

  number?: number;
  string?: string;
  date?: DateProperty;
  results?: string[];
}

// Block object
// https://developers.notion.com/reference/block
export interface BlockObject {
  object: string;
  id: string;
  created_time: string;
  created_by: UserObject;
  last_edited_by: UserObject;
  has_children: boolean;
  archived: boolean;
  type: string;

  paragraph?: Paragraph;
  heading_1?: Heading;
  heading_2?: Heading;
  heading_3?: Heading;
  callout?: Callout;
  quote?: Quote;
  bulleted_list_item?: ListItem;
  numbered_list_item?: ListItem;
  to_do?: ToDo;
  toggle?: Toggle;
  code?: Code;
  child_page?: ChildPage;
  child_database?: ChildDatabase;
  embed?: Embed;
  image?: FileBlock;
  video?: FileBlock;
  file?: FileBlock;
  pdf?: FileBlock;
  bookmark?: Bookmark;
  equation?: Equation;
  divider?: Record<string, never>;
  table_of_contents?: TableOfContents;
  breadcrumb?: Record<string, never>;
  column_list?: Record<string, never>;
  column?: Record<string, never>;
  link_preview?: LinkPreview;
  template?: Template;
  link_to_page?: LinkToPage;
  synced_block?: SyncedBlock;
  table?: Table;
  table_row?: TableRow;
}

interface Paragraph {
  rich_text: RichTextObject[];
  color: string;
  children?: BlockObject[];
}

interface Heading {
  rich_text: RichTextObject[];
  color: string;
  is_toggleable: boolean;
}

interface Callout {
  rich_text: RichTextObject[];
  icon: FileObject | Emoji;
  color: string;
  children?: BlockObject[];
}

interface Quote {
  rich_text: RichTextObject[];
  color: string;
  children?: BlockObject[];
}

interface ListItem {
  rich_text: RichTextObject[];
  color: string;
  children?: BlockObject[];
}

interface ToDo {
  rich_text: RichTextObject[];
  checked: boolean;
  color: string;
  children?: BlockObject[];
}

interface Toggle {
  rich_text: RichTextObject[];
  color: string;
  children?: BlockObject[];
}

interface Code {
  rich_text: RichTextObject[];
  caption?: RichTextObject[];
  language: string;
}

interface ChildPage {
  title: string;
}

interface ChildDatabase {
  title: string;
}

interface Embed {
  url: string;
}

interface FileBlock extends FileObject {
  caption?: RichTextObject[];
}

interface Bookmark {
  url: string;
  caption?: RichTextObject[];
}

interface TableOfContents {
  color: string;
}

interface Template {
  rich_text: RichTextObject[];
  children?: BlockObject[];
}

interface LinkToPage {
  type: string;
  page_id?: string;
  database_id?: string;
}

interface SyncedBlock {
  synced_from: null | SyncedFrom;
  children?: BlockObject[];
}

interface SyncedFrom {
  type: string;
  block_id: string;
}

interface Table {
  table_width: number;
  has_column_header: boolean;
  has_row_header: boolean;
  children?: BlockObject[];
}

interface TableRow {
  cells: RichTextObject[][];
}
