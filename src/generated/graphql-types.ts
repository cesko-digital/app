/**
 * THIS IS GENERATED FILE. DO NOT MODIFY IT DIRECTLY, RUN 'yarn gen:types' INSTEAD.
 */

/* eslint-disable */

export type Maybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};











export type BooleanQueryOperatorInput = {
  eq: Maybe<Scalars['Boolean']>;
  ne: Maybe<Scalars['Boolean']>;
  in: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  nin: Maybe<Array<Maybe<Scalars['Boolean']>>>;
};


export type DateQueryOperatorInput = {
  eq: Maybe<Scalars['Date']>;
  ne: Maybe<Scalars['Date']>;
  gt: Maybe<Scalars['Date']>;
  gte: Maybe<Scalars['Date']>;
  lt: Maybe<Scalars['Date']>;
  lte: Maybe<Scalars['Date']>;
  in: Maybe<Array<Maybe<Scalars['Date']>>>;
  nin: Maybe<Array<Maybe<Scalars['Date']>>>;
};

export type Directory = Node & {
  __typename?: 'Directory';
  sourceInstanceName: Scalars['String'];
  absolutePath: Scalars['String'];
  relativePath: Scalars['String'];
  extension: Scalars['String'];
  size: Scalars['Int'];
  prettySize: Scalars['String'];
  modifiedTime: Scalars['Date'];
  accessTime: Scalars['Date'];
  changeTime: Scalars['Date'];
  birthTime: Scalars['Date'];
  root: Scalars['String'];
  dir: Scalars['String'];
  base: Scalars['String'];
  ext: Scalars['String'];
  name: Scalars['String'];
  relativeDirectory: Scalars['String'];
  dev: Scalars['Int'];
  mode: Scalars['Int'];
  nlink: Scalars['Int'];
  uid: Scalars['Int'];
  gid: Scalars['Int'];
  rdev: Scalars['Int'];
  ino: Scalars['Float'];
  atimeMs: Scalars['Float'];
  mtimeMs: Scalars['Float'];
  ctimeMs: Scalars['Float'];
  atime: Scalars['Date'];
  mtime: Scalars['Date'];
  ctime: Scalars['Date'];
  /** @deprecated Use `birthTime` instead */
  birthtime: Maybe<Scalars['Date']>;
  /** @deprecated Use `birthTime` instead */
  birthtimeMs: Maybe<Scalars['Float']>;
  blksize: Maybe<Scalars['Int']>;
  blocks: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type DirectoryModifiedTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type DirectoryAccessTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type DirectoryChangeTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type DirectoryBirthTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type DirectoryAtimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type DirectoryMtimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type DirectoryCtimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};

export type DirectoryConnection = {
  __typename?: 'DirectoryConnection';
  totalCount: Scalars['Int'];
  edges: Array<DirectoryEdge>;
  nodes: Array<Directory>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<DirectoryGroupConnection>;
};


export type DirectoryConnectionDistinctArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: DirectoryFieldsEnum;
};

export type DirectoryEdge = {
  __typename?: 'DirectoryEdge';
  next: Maybe<Directory>;
  node: Directory;
  previous: Maybe<Directory>;
};

export enum DirectoryFieldsEnum {
  sourceInstanceName = 'sourceInstanceName',
  absolutePath = 'absolutePath',
  relativePath = 'relativePath',
  extension = 'extension',
  size = 'size',
  prettySize = 'prettySize',
  modifiedTime = 'modifiedTime',
  accessTime = 'accessTime',
  changeTime = 'changeTime',
  birthTime = 'birthTime',
  root = 'root',
  dir = 'dir',
  base = 'base',
  ext = 'ext',
  name = 'name',
  relativeDirectory = 'relativeDirectory',
  dev = 'dev',
  mode = 'mode',
  nlink = 'nlink',
  uid = 'uid',
  gid = 'gid',
  rdev = 'rdev',
  ino = 'ino',
  atimeMs = 'atimeMs',
  mtimeMs = 'mtimeMs',
  ctimeMs = 'ctimeMs',
  atime = 'atime',
  mtime = 'mtime',
  ctime = 'ctime',
  birthtime = 'birthtime',
  birthtimeMs = 'birthtimeMs',
  blksize = 'blksize',
  blocks = 'blocks',
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type DirectoryFilterInput = {
  sourceInstanceName: Maybe<StringQueryOperatorInput>;
  absolutePath: Maybe<StringQueryOperatorInput>;
  relativePath: Maybe<StringQueryOperatorInput>;
  extension: Maybe<StringQueryOperatorInput>;
  size: Maybe<IntQueryOperatorInput>;
  prettySize: Maybe<StringQueryOperatorInput>;
  modifiedTime: Maybe<DateQueryOperatorInput>;
  accessTime: Maybe<DateQueryOperatorInput>;
  changeTime: Maybe<DateQueryOperatorInput>;
  birthTime: Maybe<DateQueryOperatorInput>;
  root: Maybe<StringQueryOperatorInput>;
  dir: Maybe<StringQueryOperatorInput>;
  base: Maybe<StringQueryOperatorInput>;
  ext: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  relativeDirectory: Maybe<StringQueryOperatorInput>;
  dev: Maybe<IntQueryOperatorInput>;
  mode: Maybe<IntQueryOperatorInput>;
  nlink: Maybe<IntQueryOperatorInput>;
  uid: Maybe<IntQueryOperatorInput>;
  gid: Maybe<IntQueryOperatorInput>;
  rdev: Maybe<IntQueryOperatorInput>;
  ino: Maybe<FloatQueryOperatorInput>;
  atimeMs: Maybe<FloatQueryOperatorInput>;
  mtimeMs: Maybe<FloatQueryOperatorInput>;
  ctimeMs: Maybe<FloatQueryOperatorInput>;
  atime: Maybe<DateQueryOperatorInput>;
  mtime: Maybe<DateQueryOperatorInput>;
  ctime: Maybe<DateQueryOperatorInput>;
  birthtime: Maybe<DateQueryOperatorInput>;
  birthtimeMs: Maybe<FloatQueryOperatorInput>;
  blksize: Maybe<IntQueryOperatorInput>;
  blocks: Maybe<IntQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};

export type DirectoryGroupConnection = {
  __typename?: 'DirectoryGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<DirectoryEdge>;
  nodes: Array<Directory>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};

export type DirectorySortInput = {
  fields: Maybe<Array<Maybe<DirectoryFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type DuotoneGradient = {
  highlight: Scalars['String'];
  shadow: Scalars['String'];
  opacity: Maybe<Scalars['Int']>;
};

export type Event = Node & {
  __typename?: 'Event';
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  rowId: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  summary: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  competenceMap: Maybe<EventCompetenceMap>;
  startTime: Maybe<Scalars['Date']>;
  endTime: Maybe<Scalars['Date']>;
  status: Maybe<Scalars['String']>;
  owner: Maybe<Volunteer>;
  project: Maybe<Project>;
  tags: Maybe<Array<Maybe<Tag>>>;
};


export type EventStartTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type EventEndTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};

export type EventCompetenceMap = {
  __typename?: 'EventCompetenceMap';
  marketing: Maybe<Scalars['Int']>;
  dev: Maybe<Scalars['Int']>;
};

export type EventCompetenceMapFilterInput = {
  marketing: Maybe<IntQueryOperatorInput>;
  dev: Maybe<IntQueryOperatorInput>;
};

export type EventConnection = {
  __typename?: 'EventConnection';
  totalCount: Scalars['Int'];
  edges: Array<EventEdge>;
  nodes: Array<Event>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<EventGroupConnection>;
};


export type EventConnectionDistinctArgs = {
  field: EventFieldsEnum;
};


export type EventConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: EventFieldsEnum;
};

export type EventEdge = {
  __typename?: 'EventEdge';
  next: Maybe<Event>;
  node: Event;
  previous: Maybe<Event>;
};

export enum EventFieldsEnum {
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type',
  rowId = 'rowId',
  name = 'name',
  summary = 'summary',
  description = 'description',
  competenceMap___marketing = 'competenceMap___marketing',
  competenceMap___dev = 'competenceMap___dev',
  startTime = 'startTime',
  endTime = 'endTime',
  status = 'status',
  owner___id = 'owner___id',
  owner___parent___id = 'owner___parent___id',
  owner___parent___parent___id = 'owner___parent___parent___id',
  owner___parent___parent___children = 'owner___parent___parent___children',
  owner___parent___children = 'owner___parent___children',
  owner___parent___children___id = 'owner___parent___children___id',
  owner___parent___children___children = 'owner___parent___children___children',
  owner___parent___internal___content = 'owner___parent___internal___content',
  owner___parent___internal___contentDigest = 'owner___parent___internal___contentDigest',
  owner___parent___internal___description = 'owner___parent___internal___description',
  owner___parent___internal___fieldOwners = 'owner___parent___internal___fieldOwners',
  owner___parent___internal___ignoreType = 'owner___parent___internal___ignoreType',
  owner___parent___internal___mediaType = 'owner___parent___internal___mediaType',
  owner___parent___internal___owner = 'owner___parent___internal___owner',
  owner___parent___internal___type = 'owner___parent___internal___type',
  owner___children = 'owner___children',
  owner___children___id = 'owner___children___id',
  owner___children___parent___id = 'owner___children___parent___id',
  owner___children___parent___children = 'owner___children___parent___children',
  owner___children___children = 'owner___children___children',
  owner___children___children___id = 'owner___children___children___id',
  owner___children___children___children = 'owner___children___children___children',
  owner___children___internal___content = 'owner___children___internal___content',
  owner___children___internal___contentDigest = 'owner___children___internal___contentDigest',
  owner___children___internal___description = 'owner___children___internal___description',
  owner___children___internal___fieldOwners = 'owner___children___internal___fieldOwners',
  owner___children___internal___ignoreType = 'owner___children___internal___ignoreType',
  owner___children___internal___mediaType = 'owner___children___internal___mediaType',
  owner___children___internal___owner = 'owner___children___internal___owner',
  owner___children___internal___type = 'owner___children___internal___type',
  owner___internal___content = 'owner___internal___content',
  owner___internal___contentDigest = 'owner___internal___contentDigest',
  owner___internal___description = 'owner___internal___description',
  owner___internal___fieldOwners = 'owner___internal___fieldOwners',
  owner___internal___ignoreType = 'owner___internal___ignoreType',
  owner___internal___mediaType = 'owner___internal___mediaType',
  owner___internal___owner = 'owner___internal___owner',
  owner___internal___type = 'owner___internal___type',
  owner___rowId = 'owner___rowId',
  owner___email = 'owner___email',
  owner___profilePictureUrl = 'owner___profilePictureUrl',
  owner___name = 'owner___name',
  owner___Projects = 'owner___Projects',
  owner___company = 'owner___company',
  owner___Owned_Events = 'owner___Owned_Events',
  project___id = 'project___id',
  project___parent___id = 'project___parent___id',
  project___parent___parent___id = 'project___parent___parent___id',
  project___parent___parent___children = 'project___parent___parent___children',
  project___parent___children = 'project___parent___children',
  project___parent___children___id = 'project___parent___children___id',
  project___parent___children___children = 'project___parent___children___children',
  project___parent___internal___content = 'project___parent___internal___content',
  project___parent___internal___contentDigest = 'project___parent___internal___contentDigest',
  project___parent___internal___description = 'project___parent___internal___description',
  project___parent___internal___fieldOwners = 'project___parent___internal___fieldOwners',
  project___parent___internal___ignoreType = 'project___parent___internal___ignoreType',
  project___parent___internal___mediaType = 'project___parent___internal___mediaType',
  project___parent___internal___owner = 'project___parent___internal___owner',
  project___parent___internal___type = 'project___parent___internal___type',
  project___children = 'project___children',
  project___children___id = 'project___children___id',
  project___children___parent___id = 'project___children___parent___id',
  project___children___parent___children = 'project___children___parent___children',
  project___children___children = 'project___children___children',
  project___children___children___id = 'project___children___children___id',
  project___children___children___children = 'project___children___children___children',
  project___children___internal___content = 'project___children___internal___content',
  project___children___internal___contentDigest = 'project___children___internal___contentDigest',
  project___children___internal___description = 'project___children___internal___description',
  project___children___internal___fieldOwners = 'project___children___internal___fieldOwners',
  project___children___internal___ignoreType = 'project___children___internal___ignoreType',
  project___children___internal___mediaType = 'project___children___internal___mediaType',
  project___children___internal___owner = 'project___children___internal___owner',
  project___children___internal___type = 'project___children___internal___type',
  project___internal___content = 'project___internal___content',
  project___internal___contentDigest = 'project___internal___contentDigest',
  project___internal___description = 'project___internal___description',
  project___internal___fieldOwners = 'project___internal___fieldOwners',
  project___internal___ignoreType = 'project___internal___ignoreType',
  project___internal___mediaType = 'project___internal___mediaType',
  project___internal___owner = 'project___internal___owner',
  project___internal___type = 'project___internal___type',
  project___highlighted = 'project___highlighted',
  project___finished = 'project___finished',
  project___coverUrl = 'project___coverUrl',
  project___logoUrl = 'project___logoUrl',
  project___trelloUrl = 'project___trelloUrl',
  project___githubUrl = 'project___githubUrl',
  project___slackChannelUrl = 'project___slackChannelUrl',
  project___slackChannelName = 'project___slackChannelName',
  project___url = 'project___url',
  project___rowId = 'project___rowId',
  project___name = 'project___name',
  project___tagline = 'project___tagline',
  project___slug = 'project___slug',
  project___description = 'project___description',
  project___contributeText = 'project___contributeText',
  project___lang = 'project___lang',
  project___tags = 'project___tags',
  project___tags___id = 'project___tags___id',
  project___tags___parent___id = 'project___tags___parent___id',
  project___tags___parent___children = 'project___tags___parent___children',
  project___tags___children = 'project___tags___children',
  project___tags___children___id = 'project___tags___children___id',
  project___tags___children___children = 'project___tags___children___children',
  project___tags___internal___content = 'project___tags___internal___content',
  project___tags___internal___contentDigest = 'project___tags___internal___contentDigest',
  project___tags___internal___description = 'project___tags___internal___description',
  project___tags___internal___fieldOwners = 'project___tags___internal___fieldOwners',
  project___tags___internal___ignoreType = 'project___tags___internal___ignoreType',
  project___tags___internal___mediaType = 'project___tags___internal___mediaType',
  project___tags___internal___owner = 'project___tags___internal___owner',
  project___tags___internal___type = 'project___tags___internal___type',
  project___tags___rowId = 'project___tags___rowId',
  project___tags___name = 'project___tags___name',
  project___tags___slug = 'project___tags___slug',
  project___tags___lang = 'project___tags___lang',
  project___coordinators = 'project___coordinators',
  project___coordinators___id = 'project___coordinators___id',
  project___coordinators___parent___id = 'project___coordinators___parent___id',
  project___coordinators___parent___children = 'project___coordinators___parent___children',
  project___coordinators___children = 'project___coordinators___children',
  project___coordinators___children___id = 'project___coordinators___children___id',
  project___coordinators___children___children = 'project___coordinators___children___children',
  project___coordinators___internal___content = 'project___coordinators___internal___content',
  project___coordinators___internal___contentDigest = 'project___coordinators___internal___contentDigest',
  project___coordinators___internal___description = 'project___coordinators___internal___description',
  project___coordinators___internal___fieldOwners = 'project___coordinators___internal___fieldOwners',
  project___coordinators___internal___ignoreType = 'project___coordinators___internal___ignoreType',
  project___coordinators___internal___mediaType = 'project___coordinators___internal___mediaType',
  project___coordinators___internal___owner = 'project___coordinators___internal___owner',
  project___coordinators___internal___type = 'project___coordinators___internal___type',
  project___coordinators___rowId = 'project___coordinators___rowId',
  project___coordinators___email = 'project___coordinators___email',
  project___coordinators___profilePictureUrl = 'project___coordinators___profilePictureUrl',
  project___coordinators___name = 'project___coordinators___name',
  project___coordinators___Projects = 'project___coordinators___Projects',
  project___coordinators___company = 'project___coordinators___company',
  project___coordinators___Owned_Events = 'project___coordinators___Owned_Events',
  tags = 'tags',
  tags___id = 'tags___id',
  tags___parent___id = 'tags___parent___id',
  tags___parent___parent___id = 'tags___parent___parent___id',
  tags___parent___parent___children = 'tags___parent___parent___children',
  tags___parent___children = 'tags___parent___children',
  tags___parent___children___id = 'tags___parent___children___id',
  tags___parent___children___children = 'tags___parent___children___children',
  tags___parent___internal___content = 'tags___parent___internal___content',
  tags___parent___internal___contentDigest = 'tags___parent___internal___contentDigest',
  tags___parent___internal___description = 'tags___parent___internal___description',
  tags___parent___internal___fieldOwners = 'tags___parent___internal___fieldOwners',
  tags___parent___internal___ignoreType = 'tags___parent___internal___ignoreType',
  tags___parent___internal___mediaType = 'tags___parent___internal___mediaType',
  tags___parent___internal___owner = 'tags___parent___internal___owner',
  tags___parent___internal___type = 'tags___parent___internal___type',
  tags___children = 'tags___children',
  tags___children___id = 'tags___children___id',
  tags___children___parent___id = 'tags___children___parent___id',
  tags___children___parent___children = 'tags___children___parent___children',
  tags___children___children = 'tags___children___children',
  tags___children___children___id = 'tags___children___children___id',
  tags___children___children___children = 'tags___children___children___children',
  tags___children___internal___content = 'tags___children___internal___content',
  tags___children___internal___contentDigest = 'tags___children___internal___contentDigest',
  tags___children___internal___description = 'tags___children___internal___description',
  tags___children___internal___fieldOwners = 'tags___children___internal___fieldOwners',
  tags___children___internal___ignoreType = 'tags___children___internal___ignoreType',
  tags___children___internal___mediaType = 'tags___children___internal___mediaType',
  tags___children___internal___owner = 'tags___children___internal___owner',
  tags___children___internal___type = 'tags___children___internal___type',
  tags___internal___content = 'tags___internal___content',
  tags___internal___contentDigest = 'tags___internal___contentDigest',
  tags___internal___description = 'tags___internal___description',
  tags___internal___fieldOwners = 'tags___internal___fieldOwners',
  tags___internal___ignoreType = 'tags___internal___ignoreType',
  tags___internal___mediaType = 'tags___internal___mediaType',
  tags___internal___owner = 'tags___internal___owner',
  tags___internal___type = 'tags___internal___type',
  tags___rowId = 'tags___rowId',
  tags___name = 'tags___name',
  tags___slug = 'tags___slug',
  tags___lang = 'tags___lang'
}

export type EventFilterInput = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  rowId: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  summary: Maybe<StringQueryOperatorInput>;
  description: Maybe<StringQueryOperatorInput>;
  competenceMap: Maybe<EventCompetenceMapFilterInput>;
  startTime: Maybe<DateQueryOperatorInput>;
  endTime: Maybe<DateQueryOperatorInput>;
  status: Maybe<StringQueryOperatorInput>;
  owner: Maybe<VolunteerFilterInput>;
  project: Maybe<ProjectFilterInput>;
  tags: Maybe<TagFilterListInput>;
};

export type EventGroupConnection = {
  __typename?: 'EventGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<EventEdge>;
  nodes: Array<Event>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};

export type EventSortInput = {
  fields: Maybe<Array<Maybe<EventFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type File = Node & {
  __typename?: 'File';
  sourceInstanceName: Scalars['String'];
  absolutePath: Scalars['String'];
  relativePath: Scalars['String'];
  extension: Scalars['String'];
  size: Scalars['Int'];
  prettySize: Scalars['String'];
  modifiedTime: Scalars['Date'];
  accessTime: Scalars['Date'];
  changeTime: Scalars['Date'];
  birthTime: Scalars['Date'];
  root: Scalars['String'];
  dir: Scalars['String'];
  base: Scalars['String'];
  ext: Scalars['String'];
  name: Scalars['String'];
  relativeDirectory: Scalars['String'];
  dev: Scalars['Int'];
  mode: Scalars['Int'];
  nlink: Scalars['Int'];
  uid: Scalars['Int'];
  gid: Scalars['Int'];
  rdev: Scalars['Int'];
  ino: Scalars['Float'];
  atimeMs: Scalars['Float'];
  mtimeMs: Scalars['Float'];
  ctimeMs: Scalars['Float'];
  atime: Scalars['Date'];
  mtime: Scalars['Date'];
  ctime: Scalars['Date'];
  /** @deprecated Use `birthTime` instead */
  birthtime: Maybe<Scalars['Date']>;
  /** @deprecated Use `birthTime` instead */
  birthtimeMs: Maybe<Scalars['Float']>;
  blksize: Maybe<Scalars['Int']>;
  blocks: Maybe<Scalars['Int']>;
  /** Copy file to static directory and return public url to it */
  publicURL: Maybe<Scalars['String']>;
  childImageSharp: Maybe<ImageSharp>;
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type FileModifiedTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type FileAccessTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type FileChangeTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type FileBirthTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type FileAtimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type FileMtimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type FileCtimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};

export type FileConnection = {
  __typename?: 'FileConnection';
  totalCount: Scalars['Int'];
  edges: Array<FileEdge>;
  nodes: Array<File>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<FileGroupConnection>;
};


export type FileConnectionDistinctArgs = {
  field: FileFieldsEnum;
};


export type FileConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: FileFieldsEnum;
};

export type FileEdge = {
  __typename?: 'FileEdge';
  next: Maybe<File>;
  node: File;
  previous: Maybe<File>;
};

export enum FileFieldsEnum {
  sourceInstanceName = 'sourceInstanceName',
  absolutePath = 'absolutePath',
  relativePath = 'relativePath',
  extension = 'extension',
  size = 'size',
  prettySize = 'prettySize',
  modifiedTime = 'modifiedTime',
  accessTime = 'accessTime',
  changeTime = 'changeTime',
  birthTime = 'birthTime',
  root = 'root',
  dir = 'dir',
  base = 'base',
  ext = 'ext',
  name = 'name',
  relativeDirectory = 'relativeDirectory',
  dev = 'dev',
  mode = 'mode',
  nlink = 'nlink',
  uid = 'uid',
  gid = 'gid',
  rdev = 'rdev',
  ino = 'ino',
  atimeMs = 'atimeMs',
  mtimeMs = 'mtimeMs',
  ctimeMs = 'ctimeMs',
  atime = 'atime',
  mtime = 'mtime',
  ctime = 'ctime',
  birthtime = 'birthtime',
  birthtimeMs = 'birthtimeMs',
  blksize = 'blksize',
  blocks = 'blocks',
  publicURL = 'publicURL',
  childImageSharp___fixed___base64 = 'childImageSharp___fixed___base64',
  childImageSharp___fixed___tracedSVG = 'childImageSharp___fixed___tracedSVG',
  childImageSharp___fixed___aspectRatio = 'childImageSharp___fixed___aspectRatio',
  childImageSharp___fixed___width = 'childImageSharp___fixed___width',
  childImageSharp___fixed___height = 'childImageSharp___fixed___height',
  childImageSharp___fixed___src = 'childImageSharp___fixed___src',
  childImageSharp___fixed___srcSet = 'childImageSharp___fixed___srcSet',
  childImageSharp___fixed___srcWebp = 'childImageSharp___fixed___srcWebp',
  childImageSharp___fixed___srcSetWebp = 'childImageSharp___fixed___srcSetWebp',
  childImageSharp___fixed___originalName = 'childImageSharp___fixed___originalName',
  childImageSharp___resolutions___base64 = 'childImageSharp___resolutions___base64',
  childImageSharp___resolutions___tracedSVG = 'childImageSharp___resolutions___tracedSVG',
  childImageSharp___resolutions___aspectRatio = 'childImageSharp___resolutions___aspectRatio',
  childImageSharp___resolutions___width = 'childImageSharp___resolutions___width',
  childImageSharp___resolutions___height = 'childImageSharp___resolutions___height',
  childImageSharp___resolutions___src = 'childImageSharp___resolutions___src',
  childImageSharp___resolutions___srcSet = 'childImageSharp___resolutions___srcSet',
  childImageSharp___resolutions___srcWebp = 'childImageSharp___resolutions___srcWebp',
  childImageSharp___resolutions___srcSetWebp = 'childImageSharp___resolutions___srcSetWebp',
  childImageSharp___resolutions___originalName = 'childImageSharp___resolutions___originalName',
  childImageSharp___fluid___base64 = 'childImageSharp___fluid___base64',
  childImageSharp___fluid___tracedSVG = 'childImageSharp___fluid___tracedSVG',
  childImageSharp___fluid___aspectRatio = 'childImageSharp___fluid___aspectRatio',
  childImageSharp___fluid___src = 'childImageSharp___fluid___src',
  childImageSharp___fluid___srcSet = 'childImageSharp___fluid___srcSet',
  childImageSharp___fluid___srcWebp = 'childImageSharp___fluid___srcWebp',
  childImageSharp___fluid___srcSetWebp = 'childImageSharp___fluid___srcSetWebp',
  childImageSharp___fluid___sizes = 'childImageSharp___fluid___sizes',
  childImageSharp___fluid___originalImg = 'childImageSharp___fluid___originalImg',
  childImageSharp___fluid___originalName = 'childImageSharp___fluid___originalName',
  childImageSharp___fluid___presentationWidth = 'childImageSharp___fluid___presentationWidth',
  childImageSharp___fluid___presentationHeight = 'childImageSharp___fluid___presentationHeight',
  childImageSharp___sizes___base64 = 'childImageSharp___sizes___base64',
  childImageSharp___sizes___tracedSVG = 'childImageSharp___sizes___tracedSVG',
  childImageSharp___sizes___aspectRatio = 'childImageSharp___sizes___aspectRatio',
  childImageSharp___sizes___src = 'childImageSharp___sizes___src',
  childImageSharp___sizes___srcSet = 'childImageSharp___sizes___srcSet',
  childImageSharp___sizes___srcWebp = 'childImageSharp___sizes___srcWebp',
  childImageSharp___sizes___srcSetWebp = 'childImageSharp___sizes___srcSetWebp',
  childImageSharp___sizes___sizes = 'childImageSharp___sizes___sizes',
  childImageSharp___sizes___originalImg = 'childImageSharp___sizes___originalImg',
  childImageSharp___sizes___originalName = 'childImageSharp___sizes___originalName',
  childImageSharp___sizes___presentationWidth = 'childImageSharp___sizes___presentationWidth',
  childImageSharp___sizes___presentationHeight = 'childImageSharp___sizes___presentationHeight',
  childImageSharp___original___width = 'childImageSharp___original___width',
  childImageSharp___original___height = 'childImageSharp___original___height',
  childImageSharp___original___src = 'childImageSharp___original___src',
  childImageSharp___resize___src = 'childImageSharp___resize___src',
  childImageSharp___resize___tracedSVG = 'childImageSharp___resize___tracedSVG',
  childImageSharp___resize___width = 'childImageSharp___resize___width',
  childImageSharp___resize___height = 'childImageSharp___resize___height',
  childImageSharp___resize___aspectRatio = 'childImageSharp___resize___aspectRatio',
  childImageSharp___resize___originalName = 'childImageSharp___resize___originalName',
  childImageSharp___id = 'childImageSharp___id',
  childImageSharp___parent___id = 'childImageSharp___parent___id',
  childImageSharp___parent___parent___id = 'childImageSharp___parent___parent___id',
  childImageSharp___parent___parent___children = 'childImageSharp___parent___parent___children',
  childImageSharp___parent___children = 'childImageSharp___parent___children',
  childImageSharp___parent___children___id = 'childImageSharp___parent___children___id',
  childImageSharp___parent___children___children = 'childImageSharp___parent___children___children',
  childImageSharp___parent___internal___content = 'childImageSharp___parent___internal___content',
  childImageSharp___parent___internal___contentDigest = 'childImageSharp___parent___internal___contentDigest',
  childImageSharp___parent___internal___description = 'childImageSharp___parent___internal___description',
  childImageSharp___parent___internal___fieldOwners = 'childImageSharp___parent___internal___fieldOwners',
  childImageSharp___parent___internal___ignoreType = 'childImageSharp___parent___internal___ignoreType',
  childImageSharp___parent___internal___mediaType = 'childImageSharp___parent___internal___mediaType',
  childImageSharp___parent___internal___owner = 'childImageSharp___parent___internal___owner',
  childImageSharp___parent___internal___type = 'childImageSharp___parent___internal___type',
  childImageSharp___children = 'childImageSharp___children',
  childImageSharp___children___id = 'childImageSharp___children___id',
  childImageSharp___children___parent___id = 'childImageSharp___children___parent___id',
  childImageSharp___children___parent___children = 'childImageSharp___children___parent___children',
  childImageSharp___children___children = 'childImageSharp___children___children',
  childImageSharp___children___children___id = 'childImageSharp___children___children___id',
  childImageSharp___children___children___children = 'childImageSharp___children___children___children',
  childImageSharp___children___internal___content = 'childImageSharp___children___internal___content',
  childImageSharp___children___internal___contentDigest = 'childImageSharp___children___internal___contentDigest',
  childImageSharp___children___internal___description = 'childImageSharp___children___internal___description',
  childImageSharp___children___internal___fieldOwners = 'childImageSharp___children___internal___fieldOwners',
  childImageSharp___children___internal___ignoreType = 'childImageSharp___children___internal___ignoreType',
  childImageSharp___children___internal___mediaType = 'childImageSharp___children___internal___mediaType',
  childImageSharp___children___internal___owner = 'childImageSharp___children___internal___owner',
  childImageSharp___children___internal___type = 'childImageSharp___children___internal___type',
  childImageSharp___internal___content = 'childImageSharp___internal___content',
  childImageSharp___internal___contentDigest = 'childImageSharp___internal___contentDigest',
  childImageSharp___internal___description = 'childImageSharp___internal___description',
  childImageSharp___internal___fieldOwners = 'childImageSharp___internal___fieldOwners',
  childImageSharp___internal___ignoreType = 'childImageSharp___internal___ignoreType',
  childImageSharp___internal___mediaType = 'childImageSharp___internal___mediaType',
  childImageSharp___internal___owner = 'childImageSharp___internal___owner',
  childImageSharp___internal___type = 'childImageSharp___internal___type',
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type FileFilterInput = {
  sourceInstanceName: Maybe<StringQueryOperatorInput>;
  absolutePath: Maybe<StringQueryOperatorInput>;
  relativePath: Maybe<StringQueryOperatorInput>;
  extension: Maybe<StringQueryOperatorInput>;
  size: Maybe<IntQueryOperatorInput>;
  prettySize: Maybe<StringQueryOperatorInput>;
  modifiedTime: Maybe<DateQueryOperatorInput>;
  accessTime: Maybe<DateQueryOperatorInput>;
  changeTime: Maybe<DateQueryOperatorInput>;
  birthTime: Maybe<DateQueryOperatorInput>;
  root: Maybe<StringQueryOperatorInput>;
  dir: Maybe<StringQueryOperatorInput>;
  base: Maybe<StringQueryOperatorInput>;
  ext: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  relativeDirectory: Maybe<StringQueryOperatorInput>;
  dev: Maybe<IntQueryOperatorInput>;
  mode: Maybe<IntQueryOperatorInput>;
  nlink: Maybe<IntQueryOperatorInput>;
  uid: Maybe<IntQueryOperatorInput>;
  gid: Maybe<IntQueryOperatorInput>;
  rdev: Maybe<IntQueryOperatorInput>;
  ino: Maybe<FloatQueryOperatorInput>;
  atimeMs: Maybe<FloatQueryOperatorInput>;
  mtimeMs: Maybe<FloatQueryOperatorInput>;
  ctimeMs: Maybe<FloatQueryOperatorInput>;
  atime: Maybe<DateQueryOperatorInput>;
  mtime: Maybe<DateQueryOperatorInput>;
  ctime: Maybe<DateQueryOperatorInput>;
  birthtime: Maybe<DateQueryOperatorInput>;
  birthtimeMs: Maybe<FloatQueryOperatorInput>;
  blksize: Maybe<IntQueryOperatorInput>;
  blocks: Maybe<IntQueryOperatorInput>;
  publicURL: Maybe<StringQueryOperatorInput>;
  childImageSharp: Maybe<ImageSharpFilterInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};

export type FileGroupConnection = {
  __typename?: 'FileGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<FileEdge>;
  nodes: Array<File>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};

export type FileSortInput = {
  fields: Maybe<Array<Maybe<FileFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type FloatQueryOperatorInput = {
  eq: Maybe<Scalars['Float']>;
  ne: Maybe<Scalars['Float']>;
  gt: Maybe<Scalars['Float']>;
  gte: Maybe<Scalars['Float']>;
  lt: Maybe<Scalars['Float']>;
  lte: Maybe<Scalars['Float']>;
  in: Maybe<Array<Maybe<Scalars['Float']>>>;
  nin: Maybe<Array<Maybe<Scalars['Float']>>>;
};

export enum HeadingsMdx {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6'
}

export enum ImageCropFocus {
  CENTER = 'CENTER',
  NORTH = 'NORTH',
  NORTHEAST = 'NORTHEAST',
  EAST = 'EAST',
  SOUTHEAST = 'SOUTHEAST',
  SOUTH = 'SOUTH',
  SOUTHWEST = 'SOUTHWEST',
  WEST = 'WEST',
  NORTHWEST = 'NORTHWEST',
  ENTROPY = 'ENTROPY',
  ATTENTION = 'ATTENTION'
}

export enum ImageFit {
  COVER = 'COVER',
  CONTAIN = 'CONTAIN',
  FILL = 'FILL',
  INSIDE = 'INSIDE',
  OUTSIDE = 'OUTSIDE'
}

export enum ImageFormat {
  NO_CHANGE = 'NO_CHANGE',
  JPG = 'JPG',
  PNG = 'PNG',
  WEBP = 'WEBP'
}

export type ImageSharp = Node & {
  __typename?: 'ImageSharp';
  fixed: Maybe<ImageSharpFixed>;
  /** @deprecated Resolutions was deprecated in Gatsby v2. It's been renamed to "fixed" https://example.com/write-docs-and-fix-this-example-link */
  resolutions: Maybe<ImageSharpResolutions>;
  fluid: Maybe<ImageSharpFluid>;
  /** @deprecated Sizes was deprecated in Gatsby v2. It's been renamed to "fluid" https://example.com/write-docs-and-fix-this-example-link */
  sizes: Maybe<ImageSharpSizes>;
  original: Maybe<ImageSharpOriginal>;
  resize: Maybe<ImageSharpResize>;
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type ImageSharpFixedArgs = {
  width: Maybe<Scalars['Int']>;
  height: Maybe<Scalars['Int']>;
  base64Width: Maybe<Scalars['Int']>;
  jpegProgressive?: Maybe<Scalars['Boolean']>;
  pngCompressionSpeed?: Maybe<Scalars['Int']>;
  grayscale?: Maybe<Scalars['Boolean']>;
  duotone: Maybe<DuotoneGradient>;
  traceSVG: Maybe<Potrace>;
  quality: Maybe<Scalars['Int']>;
  jpegQuality: Maybe<Scalars['Int']>;
  pngQuality: Maybe<Scalars['Int']>;
  webpQuality: Maybe<Scalars['Int']>;
  toFormat?: Maybe<ImageFormat>;
  toFormatBase64?: Maybe<ImageFormat>;
  cropFocus?: Maybe<ImageCropFocus>;
  fit?: Maybe<ImageFit>;
  background?: Maybe<Scalars['String']>;
  rotate?: Maybe<Scalars['Int']>;
  trim?: Maybe<Scalars['Float']>;
};


export type ImageSharpResolutionsArgs = {
  width: Maybe<Scalars['Int']>;
  height: Maybe<Scalars['Int']>;
  base64Width: Maybe<Scalars['Int']>;
  jpegProgressive?: Maybe<Scalars['Boolean']>;
  pngCompressionSpeed?: Maybe<Scalars['Int']>;
  grayscale?: Maybe<Scalars['Boolean']>;
  duotone: Maybe<DuotoneGradient>;
  traceSVG: Maybe<Potrace>;
  quality: Maybe<Scalars['Int']>;
  jpegQuality: Maybe<Scalars['Int']>;
  pngQuality: Maybe<Scalars['Int']>;
  webpQuality: Maybe<Scalars['Int']>;
  toFormat?: Maybe<ImageFormat>;
  toFormatBase64?: Maybe<ImageFormat>;
  cropFocus?: Maybe<ImageCropFocus>;
  fit?: Maybe<ImageFit>;
  background?: Maybe<Scalars['String']>;
  rotate?: Maybe<Scalars['Int']>;
  trim?: Maybe<Scalars['Float']>;
};


export type ImageSharpFluidArgs = {
  maxWidth: Maybe<Scalars['Int']>;
  maxHeight: Maybe<Scalars['Int']>;
  base64Width: Maybe<Scalars['Int']>;
  grayscale?: Maybe<Scalars['Boolean']>;
  jpegProgressive?: Maybe<Scalars['Boolean']>;
  pngCompressionSpeed?: Maybe<Scalars['Int']>;
  duotone: Maybe<DuotoneGradient>;
  traceSVG: Maybe<Potrace>;
  quality: Maybe<Scalars['Int']>;
  jpegQuality: Maybe<Scalars['Int']>;
  pngQuality: Maybe<Scalars['Int']>;
  webpQuality: Maybe<Scalars['Int']>;
  toFormat?: Maybe<ImageFormat>;
  toFormatBase64?: Maybe<ImageFormat>;
  cropFocus?: Maybe<ImageCropFocus>;
  fit?: Maybe<ImageFit>;
  background?: Maybe<Scalars['String']>;
  rotate?: Maybe<Scalars['Int']>;
  trim?: Maybe<Scalars['Float']>;
  sizes?: Maybe<Scalars['String']>;
  srcSetBreakpoints?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type ImageSharpSizesArgs = {
  maxWidth: Maybe<Scalars['Int']>;
  maxHeight: Maybe<Scalars['Int']>;
  base64Width: Maybe<Scalars['Int']>;
  grayscale?: Maybe<Scalars['Boolean']>;
  jpegProgressive?: Maybe<Scalars['Boolean']>;
  pngCompressionSpeed?: Maybe<Scalars['Int']>;
  duotone: Maybe<DuotoneGradient>;
  traceSVG: Maybe<Potrace>;
  quality: Maybe<Scalars['Int']>;
  jpegQuality: Maybe<Scalars['Int']>;
  pngQuality: Maybe<Scalars['Int']>;
  webpQuality: Maybe<Scalars['Int']>;
  toFormat?: Maybe<ImageFormat>;
  toFormatBase64?: Maybe<ImageFormat>;
  cropFocus?: Maybe<ImageCropFocus>;
  fit?: Maybe<ImageFit>;
  background?: Maybe<Scalars['String']>;
  rotate?: Maybe<Scalars['Int']>;
  trim?: Maybe<Scalars['Float']>;
  sizes?: Maybe<Scalars['String']>;
  srcSetBreakpoints?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type ImageSharpResizeArgs = {
  width: Maybe<Scalars['Int']>;
  height: Maybe<Scalars['Int']>;
  quality: Maybe<Scalars['Int']>;
  jpegQuality: Maybe<Scalars['Int']>;
  pngQuality: Maybe<Scalars['Int']>;
  webpQuality: Maybe<Scalars['Int']>;
  jpegProgressive?: Maybe<Scalars['Boolean']>;
  pngCompressionLevel?: Maybe<Scalars['Int']>;
  pngCompressionSpeed?: Maybe<Scalars['Int']>;
  grayscale?: Maybe<Scalars['Boolean']>;
  duotone: Maybe<DuotoneGradient>;
  base64?: Maybe<Scalars['Boolean']>;
  traceSVG: Maybe<Potrace>;
  toFormat?: Maybe<ImageFormat>;
  cropFocus?: Maybe<ImageCropFocus>;
  fit?: Maybe<ImageFit>;
  background?: Maybe<Scalars['String']>;
  rotate?: Maybe<Scalars['Int']>;
  trim?: Maybe<Scalars['Float']>;
};

export type ImageSharpConnection = {
  __typename?: 'ImageSharpConnection';
  totalCount: Scalars['Int'];
  edges: Array<ImageSharpEdge>;
  nodes: Array<ImageSharp>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ImageSharpGroupConnection>;
};


export type ImageSharpConnectionDistinctArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: ImageSharpFieldsEnum;
};

export type ImageSharpEdge = {
  __typename?: 'ImageSharpEdge';
  next: Maybe<ImageSharp>;
  node: ImageSharp;
  previous: Maybe<ImageSharp>;
};

export enum ImageSharpFieldsEnum {
  fixed___base64 = 'fixed___base64',
  fixed___tracedSVG = 'fixed___tracedSVG',
  fixed___aspectRatio = 'fixed___aspectRatio',
  fixed___width = 'fixed___width',
  fixed___height = 'fixed___height',
  fixed___src = 'fixed___src',
  fixed___srcSet = 'fixed___srcSet',
  fixed___srcWebp = 'fixed___srcWebp',
  fixed___srcSetWebp = 'fixed___srcSetWebp',
  fixed___originalName = 'fixed___originalName',
  resolutions___base64 = 'resolutions___base64',
  resolutions___tracedSVG = 'resolutions___tracedSVG',
  resolutions___aspectRatio = 'resolutions___aspectRatio',
  resolutions___width = 'resolutions___width',
  resolutions___height = 'resolutions___height',
  resolutions___src = 'resolutions___src',
  resolutions___srcSet = 'resolutions___srcSet',
  resolutions___srcWebp = 'resolutions___srcWebp',
  resolutions___srcSetWebp = 'resolutions___srcSetWebp',
  resolutions___originalName = 'resolutions___originalName',
  fluid___base64 = 'fluid___base64',
  fluid___tracedSVG = 'fluid___tracedSVG',
  fluid___aspectRatio = 'fluid___aspectRatio',
  fluid___src = 'fluid___src',
  fluid___srcSet = 'fluid___srcSet',
  fluid___srcWebp = 'fluid___srcWebp',
  fluid___srcSetWebp = 'fluid___srcSetWebp',
  fluid___sizes = 'fluid___sizes',
  fluid___originalImg = 'fluid___originalImg',
  fluid___originalName = 'fluid___originalName',
  fluid___presentationWidth = 'fluid___presentationWidth',
  fluid___presentationHeight = 'fluid___presentationHeight',
  sizes___base64 = 'sizes___base64',
  sizes___tracedSVG = 'sizes___tracedSVG',
  sizes___aspectRatio = 'sizes___aspectRatio',
  sizes___src = 'sizes___src',
  sizes___srcSet = 'sizes___srcSet',
  sizes___srcWebp = 'sizes___srcWebp',
  sizes___srcSetWebp = 'sizes___srcSetWebp',
  sizes___sizes = 'sizes___sizes',
  sizes___originalImg = 'sizes___originalImg',
  sizes___originalName = 'sizes___originalName',
  sizes___presentationWidth = 'sizes___presentationWidth',
  sizes___presentationHeight = 'sizes___presentationHeight',
  original___width = 'original___width',
  original___height = 'original___height',
  original___src = 'original___src',
  resize___src = 'resize___src',
  resize___tracedSVG = 'resize___tracedSVG',
  resize___width = 'resize___width',
  resize___height = 'resize___height',
  resize___aspectRatio = 'resize___aspectRatio',
  resize___originalName = 'resize___originalName',
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type ImageSharpFilterInput = {
  fixed: Maybe<ImageSharpFixedFilterInput>;
  resolutions: Maybe<ImageSharpResolutionsFilterInput>;
  fluid: Maybe<ImageSharpFluidFilterInput>;
  sizes: Maybe<ImageSharpSizesFilterInput>;
  original: Maybe<ImageSharpOriginalFilterInput>;
  resize: Maybe<ImageSharpResizeFilterInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};

export type ImageSharpFixed = {
  __typename?: 'ImageSharpFixed';
  base64: Maybe<Scalars['String']>;
  tracedSVG: Maybe<Scalars['String']>;
  aspectRatio: Maybe<Scalars['Float']>;
  width: Scalars['Float'];
  height: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp: Maybe<Scalars['String']>;
  srcSetWebp: Maybe<Scalars['String']>;
  originalName: Maybe<Scalars['String']>;
};

export type ImageSharpFixedFilterInput = {
  base64: Maybe<StringQueryOperatorInput>;
  tracedSVG: Maybe<StringQueryOperatorInput>;
  aspectRatio: Maybe<FloatQueryOperatorInput>;
  width: Maybe<FloatQueryOperatorInput>;
  height: Maybe<FloatQueryOperatorInput>;
  src: Maybe<StringQueryOperatorInput>;
  srcSet: Maybe<StringQueryOperatorInput>;
  srcWebp: Maybe<StringQueryOperatorInput>;
  srcSetWebp: Maybe<StringQueryOperatorInput>;
  originalName: Maybe<StringQueryOperatorInput>;
};

export type ImageSharpFluid = {
  __typename?: 'ImageSharpFluid';
  base64: Maybe<Scalars['String']>;
  tracedSVG: Maybe<Scalars['String']>;
  aspectRatio: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp: Maybe<Scalars['String']>;
  srcSetWebp: Maybe<Scalars['String']>;
  sizes: Scalars['String'];
  originalImg: Maybe<Scalars['String']>;
  originalName: Maybe<Scalars['String']>;
  presentationWidth: Scalars['Int'];
  presentationHeight: Scalars['Int'];
};

export type ImageSharpFluidFilterInput = {
  base64: Maybe<StringQueryOperatorInput>;
  tracedSVG: Maybe<StringQueryOperatorInput>;
  aspectRatio: Maybe<FloatQueryOperatorInput>;
  src: Maybe<StringQueryOperatorInput>;
  srcSet: Maybe<StringQueryOperatorInput>;
  srcWebp: Maybe<StringQueryOperatorInput>;
  srcSetWebp: Maybe<StringQueryOperatorInput>;
  sizes: Maybe<StringQueryOperatorInput>;
  originalImg: Maybe<StringQueryOperatorInput>;
  originalName: Maybe<StringQueryOperatorInput>;
  presentationWidth: Maybe<IntQueryOperatorInput>;
  presentationHeight: Maybe<IntQueryOperatorInput>;
};

export type ImageSharpGroupConnection = {
  __typename?: 'ImageSharpGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<ImageSharpEdge>;
  nodes: Array<ImageSharp>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};

export type ImageSharpOriginal = {
  __typename?: 'ImageSharpOriginal';
  width: Maybe<Scalars['Float']>;
  height: Maybe<Scalars['Float']>;
  src: Maybe<Scalars['String']>;
};

export type ImageSharpOriginalFilterInput = {
  width: Maybe<FloatQueryOperatorInput>;
  height: Maybe<FloatQueryOperatorInput>;
  src: Maybe<StringQueryOperatorInput>;
};

export type ImageSharpResize = {
  __typename?: 'ImageSharpResize';
  src: Maybe<Scalars['String']>;
  tracedSVG: Maybe<Scalars['String']>;
  width: Maybe<Scalars['Int']>;
  height: Maybe<Scalars['Int']>;
  aspectRatio: Maybe<Scalars['Float']>;
  originalName: Maybe<Scalars['String']>;
};

export type ImageSharpResizeFilterInput = {
  src: Maybe<StringQueryOperatorInput>;
  tracedSVG: Maybe<StringQueryOperatorInput>;
  width: Maybe<IntQueryOperatorInput>;
  height: Maybe<IntQueryOperatorInput>;
  aspectRatio: Maybe<FloatQueryOperatorInput>;
  originalName: Maybe<StringQueryOperatorInput>;
};

export type ImageSharpResolutions = {
  __typename?: 'ImageSharpResolutions';
  base64: Maybe<Scalars['String']>;
  tracedSVG: Maybe<Scalars['String']>;
  aspectRatio: Maybe<Scalars['Float']>;
  width: Scalars['Float'];
  height: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp: Maybe<Scalars['String']>;
  srcSetWebp: Maybe<Scalars['String']>;
  originalName: Maybe<Scalars['String']>;
};

export type ImageSharpResolutionsFilterInput = {
  base64: Maybe<StringQueryOperatorInput>;
  tracedSVG: Maybe<StringQueryOperatorInput>;
  aspectRatio: Maybe<FloatQueryOperatorInput>;
  width: Maybe<FloatQueryOperatorInput>;
  height: Maybe<FloatQueryOperatorInput>;
  src: Maybe<StringQueryOperatorInput>;
  srcSet: Maybe<StringQueryOperatorInput>;
  srcWebp: Maybe<StringQueryOperatorInput>;
  srcSetWebp: Maybe<StringQueryOperatorInput>;
  originalName: Maybe<StringQueryOperatorInput>;
};

export type ImageSharpSizes = {
  __typename?: 'ImageSharpSizes';
  base64: Maybe<Scalars['String']>;
  tracedSVG: Maybe<Scalars['String']>;
  aspectRatio: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp: Maybe<Scalars['String']>;
  srcSetWebp: Maybe<Scalars['String']>;
  sizes: Scalars['String'];
  originalImg: Maybe<Scalars['String']>;
  originalName: Maybe<Scalars['String']>;
  presentationWidth: Scalars['Int'];
  presentationHeight: Scalars['Int'];
};

export type ImageSharpSizesFilterInput = {
  base64: Maybe<StringQueryOperatorInput>;
  tracedSVG: Maybe<StringQueryOperatorInput>;
  aspectRatio: Maybe<FloatQueryOperatorInput>;
  src: Maybe<StringQueryOperatorInput>;
  srcSet: Maybe<StringQueryOperatorInput>;
  srcWebp: Maybe<StringQueryOperatorInput>;
  srcSetWebp: Maybe<StringQueryOperatorInput>;
  sizes: Maybe<StringQueryOperatorInput>;
  originalImg: Maybe<StringQueryOperatorInput>;
  originalName: Maybe<StringQueryOperatorInput>;
  presentationWidth: Maybe<IntQueryOperatorInput>;
  presentationHeight: Maybe<IntQueryOperatorInput>;
};

export type ImageSharpSortInput = {
  fields: Maybe<Array<Maybe<ImageSharpFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type Internal = {
  __typename?: 'Internal';
  content: Maybe<Scalars['String']>;
  contentDigest: Scalars['String'];
  description: Maybe<Scalars['String']>;
  fieldOwners: Maybe<Array<Maybe<Scalars['String']>>>;
  ignoreType: Maybe<Scalars['Boolean']>;
  mediaType: Maybe<Scalars['String']>;
  owner: Scalars['String'];
  type: Scalars['String'];
};

export type InternalFilterInput = {
  content: Maybe<StringQueryOperatorInput>;
  contentDigest: Maybe<StringQueryOperatorInput>;
  description: Maybe<StringQueryOperatorInput>;
  fieldOwners: Maybe<StringQueryOperatorInput>;
  ignoreType: Maybe<BooleanQueryOperatorInput>;
  mediaType: Maybe<StringQueryOperatorInput>;
  owner: Maybe<StringQueryOperatorInput>;
  type: Maybe<StringQueryOperatorInput>;
};

export type IntQueryOperatorInput = {
  eq: Maybe<Scalars['Int']>;
  ne: Maybe<Scalars['Int']>;
  gt: Maybe<Scalars['Int']>;
  gte: Maybe<Scalars['Int']>;
  lt: Maybe<Scalars['Int']>;
  lte: Maybe<Scalars['Int']>;
  in: Maybe<Array<Maybe<Scalars['Int']>>>;
  nin: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type JsonQueryOperatorInput = {
  eq: Maybe<Scalars['JSON']>;
  ne: Maybe<Scalars['JSON']>;
  in: Maybe<Array<Maybe<Scalars['JSON']>>>;
  nin: Maybe<Array<Maybe<Scalars['JSON']>>>;
  regex: Maybe<Scalars['JSON']>;
  glob: Maybe<Scalars['JSON']>;
};

export type Mdx = Node & {
  __typename?: 'Mdx';
  rawBody: Scalars['String'];
  fileAbsolutePath: Scalars['String'];
  frontmatter: Maybe<MdxFrontmatter>;
  slug: Maybe<Scalars['String']>;
  body: Scalars['String'];
  excerpt: Scalars['String'];
  headings: Maybe<Array<Maybe<MdxHeadingMdx>>>;
  html: Maybe<Scalars['String']>;
  mdxAST: Maybe<Scalars['JSON']>;
  tableOfContents: Maybe<Scalars['JSON']>;
  timeToRead: Maybe<Scalars['Int']>;
  wordCount: Maybe<MdxWordCount>;
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type MdxExcerptArgs = {
  pruneLength?: Maybe<Scalars['Int']>;
  truncate?: Maybe<Scalars['Boolean']>;
};


export type MdxHeadingsArgs = {
  depth: Maybe<HeadingsMdx>;
};


export type MdxTableOfContentsArgs = {
  maxDepth: Maybe<Scalars['Int']>;
};

export type MdxConnection = {
  __typename?: 'MdxConnection';
  totalCount: Scalars['Int'];
  edges: Array<MdxEdge>;
  nodes: Array<Mdx>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<MdxGroupConnection>;
};


export type MdxConnectionDistinctArgs = {
  field: MdxFieldsEnum;
};


export type MdxConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: MdxFieldsEnum;
};

export type MdxEdge = {
  __typename?: 'MdxEdge';
  next: Maybe<Mdx>;
  node: Mdx;
  previous: Maybe<Mdx>;
};

export enum MdxFieldsEnum {
  rawBody = 'rawBody',
  fileAbsolutePath = 'fileAbsolutePath',
  frontmatter___title = 'frontmatter___title',
  slug = 'slug',
  body = 'body',
  excerpt = 'excerpt',
  headings = 'headings',
  headings___value = 'headings___value',
  headings___depth = 'headings___depth',
  html = 'html',
  mdxAST = 'mdxAST',
  tableOfContents = 'tableOfContents',
  timeToRead = 'timeToRead',
  wordCount___paragraphs = 'wordCount___paragraphs',
  wordCount___sentences = 'wordCount___sentences',
  wordCount___words = 'wordCount___words',
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type MdxFilterInput = {
  rawBody: Maybe<StringQueryOperatorInput>;
  fileAbsolutePath: Maybe<StringQueryOperatorInput>;
  frontmatter: Maybe<MdxFrontmatterFilterInput>;
  slug: Maybe<StringQueryOperatorInput>;
  body: Maybe<StringQueryOperatorInput>;
  excerpt: Maybe<StringQueryOperatorInput>;
  headings: Maybe<MdxHeadingMdxFilterListInput>;
  html: Maybe<StringQueryOperatorInput>;
  mdxAST: Maybe<JsonQueryOperatorInput>;
  tableOfContents: Maybe<JsonQueryOperatorInput>;
  timeToRead: Maybe<IntQueryOperatorInput>;
  wordCount: Maybe<MdxWordCountFilterInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};

export type MdxFrontmatter = {
  __typename?: 'MdxFrontmatter';
  title: Scalars['String'];
};

export type MdxFrontmatterFilterInput = {
  title: Maybe<StringQueryOperatorInput>;
};

export type MdxGroupConnection = {
  __typename?: 'MdxGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<MdxEdge>;
  nodes: Array<Mdx>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};

export type MdxHeadingMdx = {
  __typename?: 'MdxHeadingMdx';
  value: Maybe<Scalars['String']>;
  depth: Maybe<Scalars['Int']>;
};

export type MdxHeadingMdxFilterInput = {
  value: Maybe<StringQueryOperatorInput>;
  depth: Maybe<IntQueryOperatorInput>;
};

export type MdxHeadingMdxFilterListInput = {
  elemMatch: Maybe<MdxHeadingMdxFilterInput>;
};

export type MdxSortInput = {
  fields: Maybe<Array<Maybe<MdxFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type MdxWordCount = {
  __typename?: 'MdxWordCount';
  paragraphs: Maybe<Scalars['Int']>;
  sentences: Maybe<Scalars['Int']>;
  words: Maybe<Scalars['Int']>;
};

export type MdxWordCountFilterInput = {
  paragraphs: Maybe<IntQueryOperatorInput>;
  sentences: Maybe<IntQueryOperatorInput>;
  words: Maybe<IntQueryOperatorInput>;
};

/** Node Interface */
export type Node = {
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type NodeFilterInput = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};

export type NodeFilterListInput = {
  elemMatch: Maybe<NodeFilterInput>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  currentPage: Scalars['Int'];
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
  itemCount: Scalars['Int'];
  pageCount: Scalars['Int'];
  perPage: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type Partner = Node & {
  __typename?: 'Partner';
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  rowId: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  logoUrl: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
};

export type PartnerConnection = {
  __typename?: 'PartnerConnection';
  totalCount: Scalars['Int'];
  edges: Array<PartnerEdge>;
  nodes: Array<Partner>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<PartnerGroupConnection>;
};


export type PartnerConnectionDistinctArgs = {
  field: PartnerFieldsEnum;
};


export type PartnerConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: PartnerFieldsEnum;
};

export type PartnerEdge = {
  __typename?: 'PartnerEdge';
  next: Maybe<Partner>;
  node: Partner;
  previous: Maybe<Partner>;
};

export enum PartnerFieldsEnum {
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type',
  rowId = 'rowId',
  name = 'name',
  logoUrl = 'logoUrl',
  url = 'url'
}

export type PartnerFilterInput = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  rowId: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  logoUrl: Maybe<StringQueryOperatorInput>;
  url: Maybe<StringQueryOperatorInput>;
};

export type PartnerGroupConnection = {
  __typename?: 'PartnerGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<PartnerEdge>;
  nodes: Array<Partner>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};

export type PartnerSortInput = {
  fields: Maybe<Array<Maybe<PartnerFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type Potrace = {
  turnPolicy: Maybe<PotraceTurnPolicy>;
  turdSize: Maybe<Scalars['Float']>;
  alphaMax: Maybe<Scalars['Float']>;
  optCurve: Maybe<Scalars['Boolean']>;
  optTolerance: Maybe<Scalars['Float']>;
  threshold: Maybe<Scalars['Int']>;
  blackOnWhite: Maybe<Scalars['Boolean']>;
  color: Maybe<Scalars['String']>;
  background: Maybe<Scalars['String']>;
};

export enum PotraceTurnPolicy {
  TURNPOLICY_BLACK = 'TURNPOLICY_BLACK',
  TURNPOLICY_WHITE = 'TURNPOLICY_WHITE',
  TURNPOLICY_LEFT = 'TURNPOLICY_LEFT',
  TURNPOLICY_RIGHT = 'TURNPOLICY_RIGHT',
  TURNPOLICY_MINORITY = 'TURNPOLICY_MINORITY',
  TURNPOLICY_MAJORITY = 'TURNPOLICY_MAJORITY'
}

export type Project = Node & {
  __typename?: 'Project';
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  highlighted: Maybe<Scalars['Boolean']>;
  finished: Maybe<Scalars['Boolean']>;
  coverUrl: Maybe<Scalars['String']>;
  logoUrl: Maybe<Scalars['String']>;
  trelloUrl: Maybe<Scalars['String']>;
  githubUrl: Maybe<Scalars['String']>;
  slackChannelUrl: Maybe<Scalars['String']>;
  slackChannelName: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
  rowId: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  tagline: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  contributeText: Maybe<Scalars['String']>;
  lang: Maybe<Scalars['String']>;
  tags: Maybe<Array<Maybe<Tag>>>;
  coordinators: Maybe<Array<Maybe<Volunteer>>>;
};

export type ProjectConnection = {
  __typename?: 'ProjectConnection';
  totalCount: Scalars['Int'];
  edges: Array<ProjectEdge>;
  nodes: Array<Project>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ProjectGroupConnection>;
};


export type ProjectConnectionDistinctArgs = {
  field: ProjectFieldsEnum;
};


export type ProjectConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: ProjectFieldsEnum;
};

export type ProjectEdge = {
  __typename?: 'ProjectEdge';
  next: Maybe<Project>;
  node: Project;
  previous: Maybe<Project>;
};

export enum ProjectFieldsEnum {
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type',
  highlighted = 'highlighted',
  finished = 'finished',
  coverUrl = 'coverUrl',
  logoUrl = 'logoUrl',
  trelloUrl = 'trelloUrl',
  githubUrl = 'githubUrl',
  slackChannelUrl = 'slackChannelUrl',
  slackChannelName = 'slackChannelName',
  url = 'url',
  rowId = 'rowId',
  name = 'name',
  tagline = 'tagline',
  slug = 'slug',
  description = 'description',
  contributeText = 'contributeText',
  lang = 'lang',
  tags = 'tags',
  tags___id = 'tags___id',
  tags___parent___id = 'tags___parent___id',
  tags___parent___parent___id = 'tags___parent___parent___id',
  tags___parent___parent___children = 'tags___parent___parent___children',
  tags___parent___children = 'tags___parent___children',
  tags___parent___children___id = 'tags___parent___children___id',
  tags___parent___children___children = 'tags___parent___children___children',
  tags___parent___internal___content = 'tags___parent___internal___content',
  tags___parent___internal___contentDigest = 'tags___parent___internal___contentDigest',
  tags___parent___internal___description = 'tags___parent___internal___description',
  tags___parent___internal___fieldOwners = 'tags___parent___internal___fieldOwners',
  tags___parent___internal___ignoreType = 'tags___parent___internal___ignoreType',
  tags___parent___internal___mediaType = 'tags___parent___internal___mediaType',
  tags___parent___internal___owner = 'tags___parent___internal___owner',
  tags___parent___internal___type = 'tags___parent___internal___type',
  tags___children = 'tags___children',
  tags___children___id = 'tags___children___id',
  tags___children___parent___id = 'tags___children___parent___id',
  tags___children___parent___children = 'tags___children___parent___children',
  tags___children___children = 'tags___children___children',
  tags___children___children___id = 'tags___children___children___id',
  tags___children___children___children = 'tags___children___children___children',
  tags___children___internal___content = 'tags___children___internal___content',
  tags___children___internal___contentDigest = 'tags___children___internal___contentDigest',
  tags___children___internal___description = 'tags___children___internal___description',
  tags___children___internal___fieldOwners = 'tags___children___internal___fieldOwners',
  tags___children___internal___ignoreType = 'tags___children___internal___ignoreType',
  tags___children___internal___mediaType = 'tags___children___internal___mediaType',
  tags___children___internal___owner = 'tags___children___internal___owner',
  tags___children___internal___type = 'tags___children___internal___type',
  tags___internal___content = 'tags___internal___content',
  tags___internal___contentDigest = 'tags___internal___contentDigest',
  tags___internal___description = 'tags___internal___description',
  tags___internal___fieldOwners = 'tags___internal___fieldOwners',
  tags___internal___ignoreType = 'tags___internal___ignoreType',
  tags___internal___mediaType = 'tags___internal___mediaType',
  tags___internal___owner = 'tags___internal___owner',
  tags___internal___type = 'tags___internal___type',
  tags___rowId = 'tags___rowId',
  tags___name = 'tags___name',
  tags___slug = 'tags___slug',
  tags___lang = 'tags___lang',
  coordinators = 'coordinators',
  coordinators___id = 'coordinators___id',
  coordinators___parent___id = 'coordinators___parent___id',
  coordinators___parent___parent___id = 'coordinators___parent___parent___id',
  coordinators___parent___parent___children = 'coordinators___parent___parent___children',
  coordinators___parent___children = 'coordinators___parent___children',
  coordinators___parent___children___id = 'coordinators___parent___children___id',
  coordinators___parent___children___children = 'coordinators___parent___children___children',
  coordinators___parent___internal___content = 'coordinators___parent___internal___content',
  coordinators___parent___internal___contentDigest = 'coordinators___parent___internal___contentDigest',
  coordinators___parent___internal___description = 'coordinators___parent___internal___description',
  coordinators___parent___internal___fieldOwners = 'coordinators___parent___internal___fieldOwners',
  coordinators___parent___internal___ignoreType = 'coordinators___parent___internal___ignoreType',
  coordinators___parent___internal___mediaType = 'coordinators___parent___internal___mediaType',
  coordinators___parent___internal___owner = 'coordinators___parent___internal___owner',
  coordinators___parent___internal___type = 'coordinators___parent___internal___type',
  coordinators___children = 'coordinators___children',
  coordinators___children___id = 'coordinators___children___id',
  coordinators___children___parent___id = 'coordinators___children___parent___id',
  coordinators___children___parent___children = 'coordinators___children___parent___children',
  coordinators___children___children = 'coordinators___children___children',
  coordinators___children___children___id = 'coordinators___children___children___id',
  coordinators___children___children___children = 'coordinators___children___children___children',
  coordinators___children___internal___content = 'coordinators___children___internal___content',
  coordinators___children___internal___contentDigest = 'coordinators___children___internal___contentDigest',
  coordinators___children___internal___description = 'coordinators___children___internal___description',
  coordinators___children___internal___fieldOwners = 'coordinators___children___internal___fieldOwners',
  coordinators___children___internal___ignoreType = 'coordinators___children___internal___ignoreType',
  coordinators___children___internal___mediaType = 'coordinators___children___internal___mediaType',
  coordinators___children___internal___owner = 'coordinators___children___internal___owner',
  coordinators___children___internal___type = 'coordinators___children___internal___type',
  coordinators___internal___content = 'coordinators___internal___content',
  coordinators___internal___contentDigest = 'coordinators___internal___contentDigest',
  coordinators___internal___description = 'coordinators___internal___description',
  coordinators___internal___fieldOwners = 'coordinators___internal___fieldOwners',
  coordinators___internal___ignoreType = 'coordinators___internal___ignoreType',
  coordinators___internal___mediaType = 'coordinators___internal___mediaType',
  coordinators___internal___owner = 'coordinators___internal___owner',
  coordinators___internal___type = 'coordinators___internal___type',
  coordinators___rowId = 'coordinators___rowId',
  coordinators___email = 'coordinators___email',
  coordinators___profilePictureUrl = 'coordinators___profilePictureUrl',
  coordinators___name = 'coordinators___name',
  coordinators___Projects = 'coordinators___Projects',
  coordinators___company = 'coordinators___company',
  coordinators___Owned_Events = 'coordinators___Owned_Events'
}

export type ProjectFilterInput = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  highlighted: Maybe<BooleanQueryOperatorInput>;
  finished: Maybe<BooleanQueryOperatorInput>;
  coverUrl: Maybe<StringQueryOperatorInput>;
  logoUrl: Maybe<StringQueryOperatorInput>;
  trelloUrl: Maybe<StringQueryOperatorInput>;
  githubUrl: Maybe<StringQueryOperatorInput>;
  slackChannelUrl: Maybe<StringQueryOperatorInput>;
  slackChannelName: Maybe<StringQueryOperatorInput>;
  url: Maybe<StringQueryOperatorInput>;
  rowId: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  tagline: Maybe<StringQueryOperatorInput>;
  slug: Maybe<StringQueryOperatorInput>;
  description: Maybe<StringQueryOperatorInput>;
  contributeText: Maybe<StringQueryOperatorInput>;
  lang: Maybe<StringQueryOperatorInput>;
  tags: Maybe<TagFilterListInput>;
  coordinators: Maybe<VolunteerFilterListInput>;
};

export type ProjectGroupConnection = {
  __typename?: 'ProjectGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<ProjectEdge>;
  nodes: Array<Project>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};

export type ProjectSortInput = {
  fields: Maybe<Array<Maybe<ProjectFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type Query = {
  __typename?: 'Query';
  file: Maybe<File>;
  allFile: FileConnection;
  directory: Maybe<Directory>;
  allDirectory: DirectoryConnection;
  site: Maybe<Site>;
  allSite: SiteConnection;
  sitePage: Maybe<SitePage>;
  allSitePage: SitePageConnection;
  imageSharp: Maybe<ImageSharp>;
  allImageSharp: ImageSharpConnection;
  mdx: Maybe<Mdx>;
  allMdx: MdxConnection;
  event: Maybe<Event>;
  allEvent: EventConnection;
  project: Maybe<Project>;
  allProject: ProjectConnection;
  tag: Maybe<Tag>;
  allTag: TagConnection;
  volunteer: Maybe<Volunteer>;
  allVolunteer: VolunteerConnection;
  partner: Maybe<Partner>;
  allPartner: PartnerConnection;
  siteBuildMetadata: Maybe<SiteBuildMetadata>;
  allSiteBuildMetadata: SiteBuildMetadataConnection;
  sitePlugin: Maybe<SitePlugin>;
  allSitePlugin: SitePluginConnection;
};


export type QueryFileArgs = {
  sourceInstanceName: Maybe<StringQueryOperatorInput>;
  absolutePath: Maybe<StringQueryOperatorInput>;
  relativePath: Maybe<StringQueryOperatorInput>;
  extension: Maybe<StringQueryOperatorInput>;
  size: Maybe<IntQueryOperatorInput>;
  prettySize: Maybe<StringQueryOperatorInput>;
  modifiedTime: Maybe<DateQueryOperatorInput>;
  accessTime: Maybe<DateQueryOperatorInput>;
  changeTime: Maybe<DateQueryOperatorInput>;
  birthTime: Maybe<DateQueryOperatorInput>;
  root: Maybe<StringQueryOperatorInput>;
  dir: Maybe<StringQueryOperatorInput>;
  base: Maybe<StringQueryOperatorInput>;
  ext: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  relativeDirectory: Maybe<StringQueryOperatorInput>;
  dev: Maybe<IntQueryOperatorInput>;
  mode: Maybe<IntQueryOperatorInput>;
  nlink: Maybe<IntQueryOperatorInput>;
  uid: Maybe<IntQueryOperatorInput>;
  gid: Maybe<IntQueryOperatorInput>;
  rdev: Maybe<IntQueryOperatorInput>;
  ino: Maybe<FloatQueryOperatorInput>;
  atimeMs: Maybe<FloatQueryOperatorInput>;
  mtimeMs: Maybe<FloatQueryOperatorInput>;
  ctimeMs: Maybe<FloatQueryOperatorInput>;
  atime: Maybe<DateQueryOperatorInput>;
  mtime: Maybe<DateQueryOperatorInput>;
  ctime: Maybe<DateQueryOperatorInput>;
  birthtime: Maybe<DateQueryOperatorInput>;
  birthtimeMs: Maybe<FloatQueryOperatorInput>;
  blksize: Maybe<IntQueryOperatorInput>;
  blocks: Maybe<IntQueryOperatorInput>;
  publicURL: Maybe<StringQueryOperatorInput>;
  childImageSharp: Maybe<ImageSharpFilterInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};


export type QueryAllFileArgs = {
  filter: Maybe<FileFilterInput>;
  sort: Maybe<FileSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QueryDirectoryArgs = {
  sourceInstanceName: Maybe<StringQueryOperatorInput>;
  absolutePath: Maybe<StringQueryOperatorInput>;
  relativePath: Maybe<StringQueryOperatorInput>;
  extension: Maybe<StringQueryOperatorInput>;
  size: Maybe<IntQueryOperatorInput>;
  prettySize: Maybe<StringQueryOperatorInput>;
  modifiedTime: Maybe<DateQueryOperatorInput>;
  accessTime: Maybe<DateQueryOperatorInput>;
  changeTime: Maybe<DateQueryOperatorInput>;
  birthTime: Maybe<DateQueryOperatorInput>;
  root: Maybe<StringQueryOperatorInput>;
  dir: Maybe<StringQueryOperatorInput>;
  base: Maybe<StringQueryOperatorInput>;
  ext: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  relativeDirectory: Maybe<StringQueryOperatorInput>;
  dev: Maybe<IntQueryOperatorInput>;
  mode: Maybe<IntQueryOperatorInput>;
  nlink: Maybe<IntQueryOperatorInput>;
  uid: Maybe<IntQueryOperatorInput>;
  gid: Maybe<IntQueryOperatorInput>;
  rdev: Maybe<IntQueryOperatorInput>;
  ino: Maybe<FloatQueryOperatorInput>;
  atimeMs: Maybe<FloatQueryOperatorInput>;
  mtimeMs: Maybe<FloatQueryOperatorInput>;
  ctimeMs: Maybe<FloatQueryOperatorInput>;
  atime: Maybe<DateQueryOperatorInput>;
  mtime: Maybe<DateQueryOperatorInput>;
  ctime: Maybe<DateQueryOperatorInput>;
  birthtime: Maybe<DateQueryOperatorInput>;
  birthtimeMs: Maybe<FloatQueryOperatorInput>;
  blksize: Maybe<IntQueryOperatorInput>;
  blocks: Maybe<IntQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};


export type QueryAllDirectoryArgs = {
  filter: Maybe<DirectoryFilterInput>;
  sort: Maybe<DirectorySortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QuerySiteArgs = {
  buildTime: Maybe<DateQueryOperatorInput>;
  siteMetadata: Maybe<SiteSiteMetadataFilterInput>;
  port: Maybe<IntQueryOperatorInput>;
  host: Maybe<StringQueryOperatorInput>;
  polyfill: Maybe<BooleanQueryOperatorInput>;
  pathPrefix: Maybe<StringQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};


export type QueryAllSiteArgs = {
  filter: Maybe<SiteFilterInput>;
  sort: Maybe<SiteSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QuerySitePageArgs = {
  path: Maybe<StringQueryOperatorInput>;
  component: Maybe<StringQueryOperatorInput>;
  internalComponentName: Maybe<StringQueryOperatorInput>;
  componentChunkName: Maybe<StringQueryOperatorInput>;
  matchPath: Maybe<StringQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  isCreatedByStatefulCreatePages: Maybe<BooleanQueryOperatorInput>;
  context: Maybe<SitePageContextFilterInput>;
  pluginCreator: Maybe<SitePluginFilterInput>;
  pluginCreatorId: Maybe<StringQueryOperatorInput>;
  componentPath: Maybe<StringQueryOperatorInput>;
};


export type QueryAllSitePageArgs = {
  filter: Maybe<SitePageFilterInput>;
  sort: Maybe<SitePageSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QueryImageSharpArgs = {
  fixed: Maybe<ImageSharpFixedFilterInput>;
  resolutions: Maybe<ImageSharpResolutionsFilterInput>;
  fluid: Maybe<ImageSharpFluidFilterInput>;
  sizes: Maybe<ImageSharpSizesFilterInput>;
  original: Maybe<ImageSharpOriginalFilterInput>;
  resize: Maybe<ImageSharpResizeFilterInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};


export type QueryAllImageSharpArgs = {
  filter: Maybe<ImageSharpFilterInput>;
  sort: Maybe<ImageSharpSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QueryMdxArgs = {
  rawBody: Maybe<StringQueryOperatorInput>;
  fileAbsolutePath: Maybe<StringQueryOperatorInput>;
  frontmatter: Maybe<MdxFrontmatterFilterInput>;
  slug: Maybe<StringQueryOperatorInput>;
  body: Maybe<StringQueryOperatorInput>;
  excerpt: Maybe<StringQueryOperatorInput>;
  headings: Maybe<MdxHeadingMdxFilterListInput>;
  html: Maybe<StringQueryOperatorInput>;
  mdxAST: Maybe<JsonQueryOperatorInput>;
  tableOfContents: Maybe<JsonQueryOperatorInput>;
  timeToRead: Maybe<IntQueryOperatorInput>;
  wordCount: Maybe<MdxWordCountFilterInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};


export type QueryAllMdxArgs = {
  filter: Maybe<MdxFilterInput>;
  sort: Maybe<MdxSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QueryEventArgs = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  rowId: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  summary: Maybe<StringQueryOperatorInput>;
  description: Maybe<StringQueryOperatorInput>;
  competenceMap: Maybe<EventCompetenceMapFilterInput>;
  startTime: Maybe<DateQueryOperatorInput>;
  endTime: Maybe<DateQueryOperatorInput>;
  status: Maybe<StringQueryOperatorInput>;
  owner: Maybe<VolunteerFilterInput>;
  project: Maybe<ProjectFilterInput>;
  tags: Maybe<TagFilterListInput>;
};


export type QueryAllEventArgs = {
  filter: Maybe<EventFilterInput>;
  sort: Maybe<EventSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QueryProjectArgs = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  highlighted: Maybe<BooleanQueryOperatorInput>;
  finished: Maybe<BooleanQueryOperatorInput>;
  coverUrl: Maybe<StringQueryOperatorInput>;
  logoUrl: Maybe<StringQueryOperatorInput>;
  trelloUrl: Maybe<StringQueryOperatorInput>;
  githubUrl: Maybe<StringQueryOperatorInput>;
  slackChannelUrl: Maybe<StringQueryOperatorInput>;
  slackChannelName: Maybe<StringQueryOperatorInput>;
  url: Maybe<StringQueryOperatorInput>;
  rowId: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  tagline: Maybe<StringQueryOperatorInput>;
  slug: Maybe<StringQueryOperatorInput>;
  description: Maybe<StringQueryOperatorInput>;
  contributeText: Maybe<StringQueryOperatorInput>;
  lang: Maybe<StringQueryOperatorInput>;
  tags: Maybe<TagFilterListInput>;
  coordinators: Maybe<VolunteerFilterListInput>;
};


export type QueryAllProjectArgs = {
  filter: Maybe<ProjectFilterInput>;
  sort: Maybe<ProjectSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QueryTagArgs = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  rowId: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  slug: Maybe<StringQueryOperatorInput>;
  lang: Maybe<StringQueryOperatorInput>;
};


export type QueryAllTagArgs = {
  filter: Maybe<TagFilterInput>;
  sort: Maybe<TagSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QueryVolunteerArgs = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  rowId: Maybe<StringQueryOperatorInput>;
  email: Maybe<StringQueryOperatorInput>;
  profilePictureUrl: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  Projects: Maybe<StringQueryOperatorInput>;
  company: Maybe<StringQueryOperatorInput>;
  Owned_Events: Maybe<StringQueryOperatorInput>;
};


export type QueryAllVolunteerArgs = {
  filter: Maybe<VolunteerFilterInput>;
  sort: Maybe<VolunteerSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QueryPartnerArgs = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  rowId: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  logoUrl: Maybe<StringQueryOperatorInput>;
  url: Maybe<StringQueryOperatorInput>;
};


export type QueryAllPartnerArgs = {
  filter: Maybe<PartnerFilterInput>;
  sort: Maybe<PartnerSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QuerySiteBuildMetadataArgs = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  buildTime: Maybe<DateQueryOperatorInput>;
};


export type QueryAllSiteBuildMetadataArgs = {
  filter: Maybe<SiteBuildMetadataFilterInput>;
  sort: Maybe<SiteBuildMetadataSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QuerySitePluginArgs = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  resolve: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  version: Maybe<StringQueryOperatorInput>;
  pluginOptions: Maybe<SitePluginPluginOptionsFilterInput>;
  nodeAPIs: Maybe<StringQueryOperatorInput>;
  browserAPIs: Maybe<StringQueryOperatorInput>;
  ssrAPIs: Maybe<StringQueryOperatorInput>;
  pluginFilepath: Maybe<StringQueryOperatorInput>;
  packageJson: Maybe<SitePluginPackageJsonFilterInput>;
};


export type QueryAllSitePluginArgs = {
  filter: Maybe<SitePluginFilterInput>;
  sort: Maybe<SitePluginSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};

export type Site = Node & {
  __typename?: 'Site';
  buildTime: Maybe<Scalars['Date']>;
  siteMetadata: Maybe<SiteSiteMetadata>;
  port: Maybe<Scalars['Int']>;
  host: Maybe<Scalars['String']>;
  polyfill: Maybe<Scalars['Boolean']>;
  pathPrefix: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type SiteBuildTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};

export type SiteBuildMetadata = Node & {
  __typename?: 'SiteBuildMetadata';
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  buildTime: Maybe<Scalars['Date']>;
};


export type SiteBuildMetadataBuildTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};

export type SiteBuildMetadataConnection = {
  __typename?: 'SiteBuildMetadataConnection';
  totalCount: Scalars['Int'];
  edges: Array<SiteBuildMetadataEdge>;
  nodes: Array<SiteBuildMetadata>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<SiteBuildMetadataGroupConnection>;
};


export type SiteBuildMetadataConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataEdge = {
  __typename?: 'SiteBuildMetadataEdge';
  next: Maybe<SiteBuildMetadata>;
  node: SiteBuildMetadata;
  previous: Maybe<SiteBuildMetadata>;
};

export enum SiteBuildMetadataFieldsEnum {
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type',
  buildTime = 'buildTime'
}

export type SiteBuildMetadataFilterInput = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  buildTime: Maybe<DateQueryOperatorInput>;
};

export type SiteBuildMetadataGroupConnection = {
  __typename?: 'SiteBuildMetadataGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<SiteBuildMetadataEdge>;
  nodes: Array<SiteBuildMetadata>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};

export type SiteBuildMetadataSortInput = {
  fields: Maybe<Array<Maybe<SiteBuildMetadataFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type SiteConnection = {
  __typename?: 'SiteConnection';
  totalCount: Scalars['Int'];
  edges: Array<SiteEdge>;
  nodes: Array<Site>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<SiteGroupConnection>;
};


export type SiteConnectionDistinctArgs = {
  field: SiteFieldsEnum;
};


export type SiteConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: SiteFieldsEnum;
};

export type SiteEdge = {
  __typename?: 'SiteEdge';
  next: Maybe<Site>;
  node: Site;
  previous: Maybe<Site>;
};

export enum SiteFieldsEnum {
  buildTime = 'buildTime',
  siteMetadata___title = 'siteMetadata___title',
  siteMetadata___description = 'siteMetadata___description',
  port = 'port',
  host = 'host',
  polyfill = 'polyfill',
  pathPrefix = 'pathPrefix',
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type SiteFilterInput = {
  buildTime: Maybe<DateQueryOperatorInput>;
  siteMetadata: Maybe<SiteSiteMetadataFilterInput>;
  port: Maybe<IntQueryOperatorInput>;
  host: Maybe<StringQueryOperatorInput>;
  polyfill: Maybe<BooleanQueryOperatorInput>;
  pathPrefix: Maybe<StringQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};

export type SiteGroupConnection = {
  __typename?: 'SiteGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<SiteEdge>;
  nodes: Array<Site>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};

export type SitePage = Node & {
  __typename?: 'SitePage';
  path: Scalars['String'];
  component: Scalars['String'];
  internalComponentName: Scalars['String'];
  componentChunkName: Scalars['String'];
  matchPath: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  isCreatedByStatefulCreatePages: Maybe<Scalars['Boolean']>;
  context: Maybe<SitePageContext>;
  pluginCreator: Maybe<SitePlugin>;
  pluginCreatorId: Maybe<Scalars['String']>;
  componentPath: Maybe<Scalars['String']>;
};

export type SitePageConnection = {
  __typename?: 'SitePageConnection';
  totalCount: Scalars['Int'];
  edges: Array<SitePageEdge>;
  nodes: Array<SitePage>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<SitePageGroupConnection>;
};


export type SitePageConnectionDistinctArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: SitePageFieldsEnum;
};

export type SitePageContext = {
  __typename?: 'SitePageContext';
  id: Maybe<Scalars['String']>;
  language: Maybe<Scalars['String']>;
  i18n: Maybe<SitePageContextI18n>;
  locale: Maybe<Scalars['String']>;
  originalUrl: Maybe<Scalars['String']>;
};

export type SitePageContextFilterInput = {
  id: Maybe<StringQueryOperatorInput>;
  language: Maybe<StringQueryOperatorInput>;
  i18n: Maybe<SitePageContextI18nFilterInput>;
  locale: Maybe<StringQueryOperatorInput>;
  originalUrl: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18n = {
  __typename?: 'SitePageContextI18n';
  language: Maybe<Scalars['String']>;
  languages: Maybe<Array<Maybe<Scalars['String']>>>;
  defaultLanguage: Maybe<Scalars['String']>;
  routed: Maybe<Scalars['Boolean']>;
  resources: Maybe<SitePageContextI18nResources>;
  originalPath: Maybe<Scalars['String']>;
  path: Maybe<Scalars['String']>;
};

export type SitePageContextI18nFilterInput = {
  language: Maybe<StringQueryOperatorInput>;
  languages: Maybe<StringQueryOperatorInput>;
  defaultLanguage: Maybe<StringQueryOperatorInput>;
  routed: Maybe<BooleanQueryOperatorInput>;
  resources: Maybe<SitePageContextI18nResourcesFilterInput>;
  originalPath: Maybe<StringQueryOperatorInput>;
  path: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResources = {
  __typename?: 'SitePageContextI18nResources';
  cs: Maybe<SitePageContextI18nResourcesCs>;
};

export type SitePageContextI18nResourcesCs = {
  __typename?: 'SitePageContextI18nResourcesCs';
  pages: Maybe<SitePageContextI18nResourcesCsPages>;
  translation: Maybe<SitePageContextI18nResourcesCsTranslation>;
};

export type SitePageContextI18nResourcesCsFilterInput = {
  pages: Maybe<SitePageContextI18nResourcesCsPagesFilterInput>;
  translation: Maybe<SitePageContextI18nResourcesCsTranslationFilterInput>;
};

export type SitePageContextI18nResourcesCsPages = {
  __typename?: 'SitePageContextI18nResourcesCsPages';
  urls_projects: Maybe<Scalars['String']>;
  urls_page_2: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsPagesFilterInput = {
  urls_projects: Maybe<StringQueryOperatorInput>;
  urls_page_2: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslation = {
  __typename?: 'SitePageContextI18nResourcesCsTranslation';
  cards: Maybe<SitePageContextI18nResourcesCsTranslationCards>;
  components: Maybe<SitePageContextI18nResourcesCsTranslationComponents>;
  header: Maybe<SitePageContextI18nResourcesCsTranslationHeader>;
  metadata: Maybe<SitePageContextI18nResourcesCsTranslationMetadata>;
  pages: Maybe<SitePageContextI18nResourcesCsTranslationPages>;
};

export type SitePageContextI18nResourcesCsTranslationCards = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationCards';
  project: Maybe<SitePageContextI18nResourcesCsTranslationCardsProject>;
};

export type SitePageContextI18nResourcesCsTranslationCardsFilterInput = {
  project: Maybe<SitePageContextI18nResourcesCsTranslationCardsProjectFilterInput>;
};

export type SitePageContextI18nResourcesCsTranslationCardsProject = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationCardsProject';
  coverAriaLabel: Maybe<Scalars['String']>;
  logoAriaLabel: Maybe<Scalars['String']>;
  projectDetail: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationCardsProjectFilterInput = {
  coverAriaLabel: Maybe<StringQueryOperatorInput>;
  logoAriaLabel: Maybe<StringQueryOperatorInput>;
  projectDetail: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationComponents = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationComponents';
  cards: Maybe<SitePageContextI18nResourcesCsTranslationComponentsCards>;
  sections: Maybe<SitePageContextI18nResourcesCsTranslationComponentsSections>;
};

export type SitePageContextI18nResourcesCsTranslationComponentsCards = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationComponentsCards';
  newProject: Maybe<SitePageContextI18nResourcesCsTranslationComponentsCardsNewProject>;
  panelVolunteer: Maybe<SitePageContextI18nResourcesCsTranslationComponentsCardsPanelVolunteer>;
};

export type SitePageContextI18nResourcesCsTranslationComponentsCardsFilterInput = {
  newProject: Maybe<SitePageContextI18nResourcesCsTranslationComponentsCardsNewProjectFilterInput>;
  panelVolunteer: Maybe<SitePageContextI18nResourcesCsTranslationComponentsCardsPanelVolunteerFilterInput>;
};

export type SitePageContextI18nResourcesCsTranslationComponentsCardsNewProject = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationComponentsCardsNewProject';
  description: Maybe<Scalars['String']>;
  linkText: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationComponentsCardsNewProjectFilterInput = {
  description: Maybe<StringQueryOperatorInput>;
  linkText: Maybe<StringQueryOperatorInput>;
  title: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationComponentsCardsPanelVolunteer = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationComponentsCardsPanelVolunteer';
  description: Maybe<Scalars['String']>;
  linkText: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationComponentsCardsPanelVolunteerFilterInput = {
  description: Maybe<StringQueryOperatorInput>;
  linkText: Maybe<StringQueryOperatorInput>;
  title: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationComponentsFilterInput = {
  cards: Maybe<SitePageContextI18nResourcesCsTranslationComponentsCardsFilterInput>;
  sections: Maybe<SitePageContextI18nResourcesCsTranslationComponentsSectionsFilterInput>;
};

export type SitePageContextI18nResourcesCsTranslationComponentsSections = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationComponentsSections';
  footer: Maybe<SitePageContextI18nResourcesCsTranslationComponentsSectionsFooter>;
  projects: Maybe<SitePageContextI18nResourcesCsTranslationComponentsSectionsProjects>;
};

export type SitePageContextI18nResourcesCsTranslationComponentsSectionsFilterInput = {
  footer: Maybe<SitePageContextI18nResourcesCsTranslationComponentsSectionsFooterFilterInput>;
  projects: Maybe<SitePageContextI18nResourcesCsTranslationComponentsSectionsProjectsFilterInput>;
};

export type SitePageContextI18nResourcesCsTranslationComponentsSectionsFooter = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationComponentsSectionsFooter';
  footNote: Maybe<Scalars['String']>;
  newsletter: Maybe<SitePageContextI18nResourcesCsTranslationComponentsSectionsFooterNewsletter>;
  online: Maybe<SitePageContextI18nResourcesCsTranslationComponentsSectionsFooterOnline>;
  pageLinks: Maybe<SitePageContextI18nResourcesCsTranslationComponentsSectionsFooterPageLinks>;
};

export type SitePageContextI18nResourcesCsTranslationComponentsSectionsFooterFilterInput = {
  footNote: Maybe<StringQueryOperatorInput>;
  newsletter: Maybe<SitePageContextI18nResourcesCsTranslationComponentsSectionsFooterNewsletterFilterInput>;
  online: Maybe<SitePageContextI18nResourcesCsTranslationComponentsSectionsFooterOnlineFilterInput>;
  pageLinks: Maybe<SitePageContextI18nResourcesCsTranslationComponentsSectionsFooterPageLinksFilterInput>;
};

export type SitePageContextI18nResourcesCsTranslationComponentsSectionsFooterNewsletter = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationComponentsSectionsFooterNewsletter';
  emailRequiredError: Maybe<Scalars['String']>;
  inputError: Maybe<Scalars['String']>;
  inputPlaceholder: Maybe<Scalars['String']>;
  invalidEmailError: Maybe<Scalars['String']>;
  note: Maybe<Scalars['String']>;
  serverError: Maybe<Scalars['String']>;
  subscribe: Maybe<Scalars['String']>;
  subscribed: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationComponentsSectionsFooterNewsletterFilterInput = {
  emailRequiredError: Maybe<StringQueryOperatorInput>;
  inputError: Maybe<StringQueryOperatorInput>;
  inputPlaceholder: Maybe<StringQueryOperatorInput>;
  invalidEmailError: Maybe<StringQueryOperatorInput>;
  note: Maybe<StringQueryOperatorInput>;
  serverError: Maybe<StringQueryOperatorInput>;
  subscribe: Maybe<StringQueryOperatorInput>;
  subscribed: Maybe<StringQueryOperatorInput>;
  title: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationComponentsSectionsFooterOnline = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationComponentsSectionsFooterOnline';
  facebook: Maybe<Scalars['String']>;
  github: Maybe<Scalars['String']>;
  linkedin: Maybe<Scalars['String']>;
  slack: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  twitter: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationComponentsSectionsFooterOnlineFilterInput = {
  facebook: Maybe<StringQueryOperatorInput>;
  github: Maybe<StringQueryOperatorInput>;
  linkedin: Maybe<StringQueryOperatorInput>;
  slack: Maybe<StringQueryOperatorInput>;
  title: Maybe<StringQueryOperatorInput>;
  twitter: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationComponentsSectionsFooterPageLinks = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationComponentsSectionsFooterPageLinks';
  blog: Maybe<Scalars['String']>;
  loginToSlack: Maybe<Scalars['String']>;
  logo: Maybe<Scalars['String']>;
  mediaContact: Maybe<Scalars['String']>;
  projects: Maybe<Scalars['String']>;
  submitProject: Maybe<Scalars['String']>;
  supportUs: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationComponentsSectionsFooterPageLinksFilterInput = {
  blog: Maybe<StringQueryOperatorInput>;
  loginToSlack: Maybe<StringQueryOperatorInput>;
  logo: Maybe<StringQueryOperatorInput>;
  mediaContact: Maybe<StringQueryOperatorInput>;
  projects: Maybe<StringQueryOperatorInput>;
  submitProject: Maybe<StringQueryOperatorInput>;
  supportUs: Maybe<StringQueryOperatorInput>;
  title: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationComponentsSectionsProjects = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationComponentsSectionsProjects';
  otherProjects: Maybe<Scalars['String']>;
  ourProjects: Maybe<Scalars['String']>;
  showAll: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationComponentsSectionsProjectsFilterInput = {
  otherProjects: Maybe<StringQueryOperatorInput>;
  ourProjects: Maybe<StringQueryOperatorInput>;
  showAll: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationFilterInput = {
  cards: Maybe<SitePageContextI18nResourcesCsTranslationCardsFilterInput>;
  components: Maybe<SitePageContextI18nResourcesCsTranslationComponentsFilterInput>;
  header: Maybe<SitePageContextI18nResourcesCsTranslationHeaderFilterInput>;
  metadata: Maybe<SitePageContextI18nResourcesCsTranslationMetadataFilterInput>;
  pages: Maybe<SitePageContextI18nResourcesCsTranslationPagesFilterInput>;
};

export type SitePageContextI18nResourcesCsTranslationHeader = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationHeader';
  czech: Maybe<Scalars['String']>;
  english: Maybe<Scalars['String']>;
  projects: Maybe<Scalars['String']>;
  signUp: Maybe<Scalars['String']>;
  supportUs: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationHeaderFilterInput = {
  czech: Maybe<StringQueryOperatorInput>;
  english: Maybe<StringQueryOperatorInput>;
  projects: Maybe<StringQueryOperatorInput>;
  signUp: Maybe<StringQueryOperatorInput>;
  supportUs: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationMetadata = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationMetadata';
  description: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationMetadataFilterInput = {
  description: Maybe<StringQueryOperatorInput>;
  title: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationPages = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPages';
  homepage: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepage>;
  project: Maybe<SitePageContextI18nResourcesCsTranslationPagesProject>;
  projects: Maybe<SitePageContextI18nResourcesCsTranslationPagesProjects>;
};

export type SitePageContextI18nResourcesCsTranslationPagesFilterInput = {
  homepage: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageFilterInput>;
  project: Maybe<SitePageContextI18nResourcesCsTranslationPagesProjectFilterInput>;
  projects: Maybe<SitePageContextI18nResourcesCsTranslationPagesProjectsFilterInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepage = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesHomepage';
  sections: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSections>;
  subtitle: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  whatWeDo: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageFilterInput = {
  sections: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsFilterInput>;
  subtitle: Maybe<StringQueryOperatorInput>;
  title: Maybe<StringQueryOperatorInput>;
  whatWeDo: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSections = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesHomepageSections';
  numbers: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbers>;
  ourValues: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValues>;
  partners: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsPartners>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsFilterInput = {
  numbers: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersFilterInput>;
  ourValues: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesFilterInput>;
  partners: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsPartnersFilterInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbers = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbers';
  first: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersFirst>;
  fourth: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersFourth>;
  second: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersSecond>;
  third: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersThird>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersFilterInput = {
  first: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersFirstFilterInput>;
  fourth: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersFourthFilterInput>;
  second: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersSecondFilterInput>;
  third: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersThirdFilterInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersFirst = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersFirst';
  subtitle: Maybe<Scalars['String']>;
  value: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersFirstFilterInput = {
  subtitle: Maybe<StringQueryOperatorInput>;
  value: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersFourth = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersFourth';
  subtitle: Maybe<Scalars['String']>;
  value: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersFourthFilterInput = {
  subtitle: Maybe<StringQueryOperatorInput>;
  value: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersSecond = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersSecond';
  subtitle: Maybe<Scalars['String']>;
  value: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersSecondFilterInput = {
  subtitle: Maybe<StringQueryOperatorInput>;
  value: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersThird = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersThird';
  subtitle: Maybe<Scalars['String']>;
  value: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsNumbersThirdFilterInput = {
  subtitle: Maybe<StringQueryOperatorInput>;
  value: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValues = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValues';
  efficiency: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesEfficiency>;
  main: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesMain>;
  openness: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesOpenness>;
  participatory: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesParticipatory>;
  professionalism: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesProfessionalism>;
  technologies: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesTechnologies>;
  users: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesUsers>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesEfficiency = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesEfficiency';
  perex: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesEfficiencyFilterInput = {
  perex: Maybe<StringQueryOperatorInput>;
  title: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesFilterInput = {
  efficiency: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesEfficiencyFilterInput>;
  main: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesMainFilterInput>;
  openness: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesOpennessFilterInput>;
  participatory: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesParticipatoryFilterInput>;
  professionalism: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesProfessionalismFilterInput>;
  technologies: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesTechnologiesFilterInput>;
  users: Maybe<SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesUsersFilterInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesMain = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesMain';
  perex: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesMainFilterInput = {
  perex: Maybe<StringQueryOperatorInput>;
  title: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesOpenness = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesOpenness';
  perex: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesOpennessFilterInput = {
  perex: Maybe<StringQueryOperatorInput>;
  title: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesParticipatory = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesParticipatory';
  perex: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesParticipatoryFilterInput = {
  perex: Maybe<StringQueryOperatorInput>;
  title: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesProfessionalism = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesProfessionalism';
  perex: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesProfessionalismFilterInput = {
  perex: Maybe<StringQueryOperatorInput>;
  title: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesTechnologies = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesTechnologies';
  perex: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesTechnologiesFilterInput = {
  perex: Maybe<StringQueryOperatorInput>;
  title: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesUsers = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesUsers';
  perex: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsOurValuesUsersFilterInput = {
  perex: Maybe<StringQueryOperatorInput>;
  title: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsPartners = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsPartners';
  title: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationPagesHomepageSectionsPartnersFilterInput = {
  title: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesProject = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesProject';
  about: Maybe<SitePageContextI18nResourcesCsTranslationPagesProjectAbout>;
  projectCard: Maybe<SitePageContextI18nResourcesCsTranslationPagesProjectProjectCard>;
};

export type SitePageContextI18nResourcesCsTranslationPagesProjectAbout = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesProjectAbout';
  contribute: Maybe<SitePageContextI18nResourcesCsTranslationPagesProjectAboutContribute>;
  title: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationPagesProjectAboutContribute = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesProjectAboutContribute';
  buttonText: Maybe<Scalars['String']>;
  note: Maybe<Scalars['String']>;
  noteLink: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationPagesProjectAboutContributeFilterInput = {
  buttonText: Maybe<StringQueryOperatorInput>;
  note: Maybe<StringQueryOperatorInput>;
  noteLink: Maybe<StringQueryOperatorInput>;
  title: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesProjectAboutFilterInput = {
  contribute: Maybe<SitePageContextI18nResourcesCsTranslationPagesProjectAboutContributeFilterInput>;
  title: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesProjectFilterInput = {
  about: Maybe<SitePageContextI18nResourcesCsTranslationPagesProjectAboutFilterInput>;
  projectCard: Maybe<SitePageContextI18nResourcesCsTranslationPagesProjectProjectCardFilterInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesProjectProjectCard = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesProjectProjectCard';
  coordinators: Maybe<Scalars['String']>;
  links: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationPagesProjectProjectCardFilterInput = {
  coordinators: Maybe<StringQueryOperatorInput>;
  links: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesProjects = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesProjects';
  description: Maybe<Scalars['String']>;
  metadata: Maybe<SitePageContextI18nResourcesCsTranslationPagesProjectsMetadata>;
  navigation: Maybe<SitePageContextI18nResourcesCsTranslationPagesProjectsNavigation>;
  ongoing: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationPagesProjectsFilterInput = {
  description: Maybe<StringQueryOperatorInput>;
  metadata: Maybe<SitePageContextI18nResourcesCsTranslationPagesProjectsMetadataFilterInput>;
  navigation: Maybe<SitePageContextI18nResourcesCsTranslationPagesProjectsNavigationFilterInput>;
  ongoing: Maybe<StringQueryOperatorInput>;
  title: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesProjectsMetadata = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesProjectsMetadata';
  description: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationPagesProjectsMetadataFilterInput = {
  description: Maybe<StringQueryOperatorInput>;
  title: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesCsTranslationPagesProjectsNavigation = {
  __typename?: 'SitePageContextI18nResourcesCsTranslationPagesProjectsNavigation';
  projects: Maybe<Scalars['String']>;
};

export type SitePageContextI18nResourcesCsTranslationPagesProjectsNavigationFilterInput = {
  projects: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextI18nResourcesFilterInput = {
  cs: Maybe<SitePageContextI18nResourcesCsFilterInput>;
};

export type SitePageEdge = {
  __typename?: 'SitePageEdge';
  next: Maybe<SitePage>;
  node: SitePage;
  previous: Maybe<SitePage>;
};

export enum SitePageFieldsEnum {
  path = 'path',
  component = 'component',
  internalComponentName = 'internalComponentName',
  componentChunkName = 'componentChunkName',
  matchPath = 'matchPath',
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type',
  isCreatedByStatefulCreatePages = 'isCreatedByStatefulCreatePages',
  context___id = 'context___id',
  context___language = 'context___language',
  context___i18n___language = 'context___i18n___language',
  context___i18n___languages = 'context___i18n___languages',
  context___i18n___defaultLanguage = 'context___i18n___defaultLanguage',
  context___i18n___routed = 'context___i18n___routed',
  context___i18n___originalPath = 'context___i18n___originalPath',
  context___i18n___path = 'context___i18n___path',
  context___locale = 'context___locale',
  context___originalUrl = 'context___originalUrl',
  pluginCreator___id = 'pluginCreator___id',
  pluginCreator___parent___id = 'pluginCreator___parent___id',
  pluginCreator___parent___parent___id = 'pluginCreator___parent___parent___id',
  pluginCreator___parent___parent___children = 'pluginCreator___parent___parent___children',
  pluginCreator___parent___children = 'pluginCreator___parent___children',
  pluginCreator___parent___children___id = 'pluginCreator___parent___children___id',
  pluginCreator___parent___children___children = 'pluginCreator___parent___children___children',
  pluginCreator___parent___internal___content = 'pluginCreator___parent___internal___content',
  pluginCreator___parent___internal___contentDigest = 'pluginCreator___parent___internal___contentDigest',
  pluginCreator___parent___internal___description = 'pluginCreator___parent___internal___description',
  pluginCreator___parent___internal___fieldOwners = 'pluginCreator___parent___internal___fieldOwners',
  pluginCreator___parent___internal___ignoreType = 'pluginCreator___parent___internal___ignoreType',
  pluginCreator___parent___internal___mediaType = 'pluginCreator___parent___internal___mediaType',
  pluginCreator___parent___internal___owner = 'pluginCreator___parent___internal___owner',
  pluginCreator___parent___internal___type = 'pluginCreator___parent___internal___type',
  pluginCreator___children = 'pluginCreator___children',
  pluginCreator___children___id = 'pluginCreator___children___id',
  pluginCreator___children___parent___id = 'pluginCreator___children___parent___id',
  pluginCreator___children___parent___children = 'pluginCreator___children___parent___children',
  pluginCreator___children___children = 'pluginCreator___children___children',
  pluginCreator___children___children___id = 'pluginCreator___children___children___id',
  pluginCreator___children___children___children = 'pluginCreator___children___children___children',
  pluginCreator___children___internal___content = 'pluginCreator___children___internal___content',
  pluginCreator___children___internal___contentDigest = 'pluginCreator___children___internal___contentDigest',
  pluginCreator___children___internal___description = 'pluginCreator___children___internal___description',
  pluginCreator___children___internal___fieldOwners = 'pluginCreator___children___internal___fieldOwners',
  pluginCreator___children___internal___ignoreType = 'pluginCreator___children___internal___ignoreType',
  pluginCreator___children___internal___mediaType = 'pluginCreator___children___internal___mediaType',
  pluginCreator___children___internal___owner = 'pluginCreator___children___internal___owner',
  pluginCreator___children___internal___type = 'pluginCreator___children___internal___type',
  pluginCreator___internal___content = 'pluginCreator___internal___content',
  pluginCreator___internal___contentDigest = 'pluginCreator___internal___contentDigest',
  pluginCreator___internal___description = 'pluginCreator___internal___description',
  pluginCreator___internal___fieldOwners = 'pluginCreator___internal___fieldOwners',
  pluginCreator___internal___ignoreType = 'pluginCreator___internal___ignoreType',
  pluginCreator___internal___mediaType = 'pluginCreator___internal___mediaType',
  pluginCreator___internal___owner = 'pluginCreator___internal___owner',
  pluginCreator___internal___type = 'pluginCreator___internal___type',
  pluginCreator___resolve = 'pluginCreator___resolve',
  pluginCreator___name = 'pluginCreator___name',
  pluginCreator___version = 'pluginCreator___version',
  pluginCreator___pluginOptions___name = 'pluginCreator___pluginOptions___name',
  pluginCreator___pluginOptions___path = 'pluginCreator___pluginOptions___path',
  pluginCreator___pluginOptions___extensions = 'pluginCreator___pluginOptions___extensions',
  pluginCreator___pluginOptions___defaultLayouts___default = 'pluginCreator___pluginOptions___defaultLayouts___default',
  pluginCreator___pluginOptions___lessBabel = 'pluginCreator___pluginOptions___lessBabel',
  pluginCreator___pluginOptions___mediaTypes = 'pluginCreator___pluginOptions___mediaTypes',
  pluginCreator___pluginOptions___root = 'pluginCreator___pluginOptions___root',
  pluginCreator___pluginOptions___short_name = 'pluginCreator___pluginOptions___short_name',
  pluginCreator___pluginOptions___start_url = 'pluginCreator___pluginOptions___start_url',
  pluginCreator___pluginOptions___background_color = 'pluginCreator___pluginOptions___background_color',
  pluginCreator___pluginOptions___theme_color = 'pluginCreator___pluginOptions___theme_color',
  pluginCreator___pluginOptions___icon = 'pluginCreator___pluginOptions___icon',
  pluginCreator___pluginOptions___cache_busting_mode = 'pluginCreator___pluginOptions___cache_busting_mode',
  pluginCreator___pluginOptions___include_favicon = 'pluginCreator___pluginOptions___include_favicon',
  pluginCreator___pluginOptions___legacy = 'pluginCreator___pluginOptions___legacy',
  pluginCreator___pluginOptions___theme_color_in_head = 'pluginCreator___pluginOptions___theme_color_in_head',
  pluginCreator___pluginOptions___cacheDigest = 'pluginCreator___pluginOptions___cacheDigest',
  pluginCreator___pluginOptions___displayName = 'pluginCreator___pluginOptions___displayName',
  pluginCreator___pluginOptions___fileName = 'pluginCreator___pluginOptions___fileName',
  pluginCreator___pluginOptions___minify = 'pluginCreator___pluginOptions___minify',
  pluginCreator___pluginOptions___transpileTemplateLiterals = 'pluginCreator___pluginOptions___transpileTemplateLiterals',
  pluginCreator___pluginOptions___pure = 'pluginCreator___pluginOptions___pure',
  pluginCreator___pluginOptions___isTSX = 'pluginCreator___pluginOptions___isTSX',
  pluginCreator___pluginOptions___jsxPragma = 'pluginCreator___pluginOptions___jsxPragma',
  pluginCreator___pluginOptions___allExtensions = 'pluginCreator___pluginOptions___allExtensions',
  pluginCreator___pluginOptions___languages = 'pluginCreator___pluginOptions___languages',
  pluginCreator___pluginOptions___defaultLanguage = 'pluginCreator___pluginOptions___defaultLanguage',
  pluginCreator___pluginOptions___redirect = 'pluginCreator___pluginOptions___redirect',
  pluginCreator___pluginOptions___i18nextOptions___defaultNS = 'pluginCreator___pluginOptions___i18nextOptions___defaultNS',
  pluginCreator___pluginOptions___pages = 'pluginCreator___pluginOptions___pages',
  pluginCreator___pluginOptions___pages___matchPath = 'pluginCreator___pluginOptions___pages___matchPath',
  pluginCreator___pluginOptions___pages___languages = 'pluginCreator___pluginOptions___pages___languages',
  pluginCreator___pluginOptions___defaultLocale = 'pluginCreator___pluginOptions___defaultLocale',
  pluginCreator___pluginOptions___prefix = 'pluginCreator___pluginOptions___prefix',
  pluginCreator___pluginOptions___airtableApiKey = 'pluginCreator___pluginOptions___airtableApiKey',
  pluginCreator___pluginOptions___airtableBaseUrl = 'pluginCreator___pluginOptions___airtableBaseUrl',
  pluginCreator___pluginOptions___id = 'pluginCreator___pluginOptions___id',
  pluginCreator___pluginOptions___includeInDevelopment = 'pluginCreator___pluginOptions___includeInDevelopment',
  pluginCreator___pluginOptions___routeChangeEventName = 'pluginCreator___pluginOptions___routeChangeEventName',
  pluginCreator___pluginOptions___pathCheck = 'pluginCreator___pluginOptions___pathCheck',
  pluginCreator___nodeAPIs = 'pluginCreator___nodeAPIs',
  pluginCreator___browserAPIs = 'pluginCreator___browserAPIs',
  pluginCreator___ssrAPIs = 'pluginCreator___ssrAPIs',
  pluginCreator___pluginFilepath = 'pluginCreator___pluginFilepath',
  pluginCreator___packageJson___name = 'pluginCreator___packageJson___name',
  pluginCreator___packageJson___description = 'pluginCreator___packageJson___description',
  pluginCreator___packageJson___version = 'pluginCreator___packageJson___version',
  pluginCreator___packageJson___main = 'pluginCreator___packageJson___main',
  pluginCreator___packageJson___license = 'pluginCreator___packageJson___license',
  pluginCreator___packageJson___dependencies = 'pluginCreator___packageJson___dependencies',
  pluginCreator___packageJson___dependencies___name = 'pluginCreator___packageJson___dependencies___name',
  pluginCreator___packageJson___dependencies___version = 'pluginCreator___packageJson___dependencies___version',
  pluginCreator___packageJson___devDependencies = 'pluginCreator___packageJson___devDependencies',
  pluginCreator___packageJson___devDependencies___name = 'pluginCreator___packageJson___devDependencies___name',
  pluginCreator___packageJson___devDependencies___version = 'pluginCreator___packageJson___devDependencies___version',
  pluginCreator___packageJson___peerDependencies = 'pluginCreator___packageJson___peerDependencies',
  pluginCreator___packageJson___peerDependencies___name = 'pluginCreator___packageJson___peerDependencies___name',
  pluginCreator___packageJson___peerDependencies___version = 'pluginCreator___packageJson___peerDependencies___version',
  pluginCreator___packageJson___keywords = 'pluginCreator___packageJson___keywords',
  pluginCreatorId = 'pluginCreatorId',
  componentPath = 'componentPath'
}

export type SitePageFilterInput = {
  path: Maybe<StringQueryOperatorInput>;
  component: Maybe<StringQueryOperatorInput>;
  internalComponentName: Maybe<StringQueryOperatorInput>;
  componentChunkName: Maybe<StringQueryOperatorInput>;
  matchPath: Maybe<StringQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  isCreatedByStatefulCreatePages: Maybe<BooleanQueryOperatorInput>;
  context: Maybe<SitePageContextFilterInput>;
  pluginCreator: Maybe<SitePluginFilterInput>;
  pluginCreatorId: Maybe<StringQueryOperatorInput>;
  componentPath: Maybe<StringQueryOperatorInput>;
};

export type SitePageGroupConnection = {
  __typename?: 'SitePageGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<SitePageEdge>;
  nodes: Array<SitePage>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};

export type SitePageSortInput = {
  fields: Maybe<Array<Maybe<SitePageFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type SitePlugin = Node & {
  __typename?: 'SitePlugin';
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  resolve: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  version: Maybe<Scalars['String']>;
  pluginOptions: Maybe<SitePluginPluginOptions>;
  nodeAPIs: Maybe<Array<Maybe<Scalars['String']>>>;
  browserAPIs: Maybe<Array<Maybe<Scalars['String']>>>;
  ssrAPIs: Maybe<Array<Maybe<Scalars['String']>>>;
  pluginFilepath: Maybe<Scalars['String']>;
  packageJson: Maybe<SitePluginPackageJson>;
};

export type SitePluginConnection = {
  __typename?: 'SitePluginConnection';
  totalCount: Scalars['Int'];
  edges: Array<SitePluginEdge>;
  nodes: Array<SitePlugin>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<SitePluginGroupConnection>;
};


export type SitePluginConnectionDistinctArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: SitePluginFieldsEnum;
};

export type SitePluginEdge = {
  __typename?: 'SitePluginEdge';
  next: Maybe<SitePlugin>;
  node: SitePlugin;
  previous: Maybe<SitePlugin>;
};

export enum SitePluginFieldsEnum {
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type',
  resolve = 'resolve',
  name = 'name',
  version = 'version',
  pluginOptions___name = 'pluginOptions___name',
  pluginOptions___path = 'pluginOptions___path',
  pluginOptions___extensions = 'pluginOptions___extensions',
  pluginOptions___defaultLayouts___default = 'pluginOptions___defaultLayouts___default',
  pluginOptions___lessBabel = 'pluginOptions___lessBabel',
  pluginOptions___mediaTypes = 'pluginOptions___mediaTypes',
  pluginOptions___root = 'pluginOptions___root',
  pluginOptions___short_name = 'pluginOptions___short_name',
  pluginOptions___start_url = 'pluginOptions___start_url',
  pluginOptions___background_color = 'pluginOptions___background_color',
  pluginOptions___theme_color = 'pluginOptions___theme_color',
  pluginOptions___icon = 'pluginOptions___icon',
  pluginOptions___cache_busting_mode = 'pluginOptions___cache_busting_mode',
  pluginOptions___include_favicon = 'pluginOptions___include_favicon',
  pluginOptions___legacy = 'pluginOptions___legacy',
  pluginOptions___theme_color_in_head = 'pluginOptions___theme_color_in_head',
  pluginOptions___cacheDigest = 'pluginOptions___cacheDigest',
  pluginOptions___displayName = 'pluginOptions___displayName',
  pluginOptions___fileName = 'pluginOptions___fileName',
  pluginOptions___minify = 'pluginOptions___minify',
  pluginOptions___transpileTemplateLiterals = 'pluginOptions___transpileTemplateLiterals',
  pluginOptions___pure = 'pluginOptions___pure',
  pluginOptions___isTSX = 'pluginOptions___isTSX',
  pluginOptions___jsxPragma = 'pluginOptions___jsxPragma',
  pluginOptions___allExtensions = 'pluginOptions___allExtensions',
  pluginOptions___languages = 'pluginOptions___languages',
  pluginOptions___defaultLanguage = 'pluginOptions___defaultLanguage',
  pluginOptions___redirect = 'pluginOptions___redirect',
  pluginOptions___i18nextOptions___defaultNS = 'pluginOptions___i18nextOptions___defaultNS',
  pluginOptions___pages = 'pluginOptions___pages',
  pluginOptions___pages___matchPath = 'pluginOptions___pages___matchPath',
  pluginOptions___pages___languages = 'pluginOptions___pages___languages',
  pluginOptions___defaultLocale = 'pluginOptions___defaultLocale',
  pluginOptions___prefix = 'pluginOptions___prefix',
  pluginOptions___translations___cs___urls_projects = 'pluginOptions___translations___cs___urls_projects',
  pluginOptions___translations___cs___urls_page_2 = 'pluginOptions___translations___cs___urls_page_2',
  pluginOptions___airtableApiKey = 'pluginOptions___airtableApiKey',
  pluginOptions___airtableBaseUrl = 'pluginOptions___airtableBaseUrl',
  pluginOptions___id = 'pluginOptions___id',
  pluginOptions___includeInDevelopment = 'pluginOptions___includeInDevelopment',
  pluginOptions___routeChangeEventName = 'pluginOptions___routeChangeEventName',
  pluginOptions___pathCheck = 'pluginOptions___pathCheck',
  nodeAPIs = 'nodeAPIs',
  browserAPIs = 'browserAPIs',
  ssrAPIs = 'ssrAPIs',
  pluginFilepath = 'pluginFilepath',
  packageJson___name = 'packageJson___name',
  packageJson___description = 'packageJson___description',
  packageJson___version = 'packageJson___version',
  packageJson___main = 'packageJson___main',
  packageJson___license = 'packageJson___license',
  packageJson___dependencies = 'packageJson___dependencies',
  packageJson___dependencies___name = 'packageJson___dependencies___name',
  packageJson___dependencies___version = 'packageJson___dependencies___version',
  packageJson___devDependencies = 'packageJson___devDependencies',
  packageJson___devDependencies___name = 'packageJson___devDependencies___name',
  packageJson___devDependencies___version = 'packageJson___devDependencies___version',
  packageJson___peerDependencies = 'packageJson___peerDependencies',
  packageJson___peerDependencies___name = 'packageJson___peerDependencies___name',
  packageJson___peerDependencies___version = 'packageJson___peerDependencies___version',
  packageJson___keywords = 'packageJson___keywords'
}

export type SitePluginFilterInput = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  resolve: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  version: Maybe<StringQueryOperatorInput>;
  pluginOptions: Maybe<SitePluginPluginOptionsFilterInput>;
  nodeAPIs: Maybe<StringQueryOperatorInput>;
  browserAPIs: Maybe<StringQueryOperatorInput>;
  ssrAPIs: Maybe<StringQueryOperatorInput>;
  pluginFilepath: Maybe<StringQueryOperatorInput>;
  packageJson: Maybe<SitePluginPackageJsonFilterInput>;
};

export type SitePluginGroupConnection = {
  __typename?: 'SitePluginGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<SitePluginEdge>;
  nodes: Array<SitePlugin>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};

export type SitePluginPackageJson = {
  __typename?: 'SitePluginPackageJson';
  name: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  version: Maybe<Scalars['String']>;
  main: Maybe<Scalars['String']>;
  license: Maybe<Scalars['String']>;
  dependencies: Maybe<Array<Maybe<SitePluginPackageJsonDependencies>>>;
  devDependencies: Maybe<Array<Maybe<SitePluginPackageJsonDevDependencies>>>;
  peerDependencies: Maybe<Array<Maybe<SitePluginPackageJsonPeerDependencies>>>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type SitePluginPackageJsonDependencies = {
  __typename?: 'SitePluginPackageJsonDependencies';
  name: Maybe<Scalars['String']>;
  version: Maybe<Scalars['String']>;
};

export type SitePluginPackageJsonDependenciesFilterInput = {
  name: Maybe<StringQueryOperatorInput>;
  version: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPackageJsonDependenciesFilterListInput = {
  elemMatch: Maybe<SitePluginPackageJsonDependenciesFilterInput>;
};

export type SitePluginPackageJsonDevDependencies = {
  __typename?: 'SitePluginPackageJsonDevDependencies';
  name: Maybe<Scalars['String']>;
  version: Maybe<Scalars['String']>;
};

export type SitePluginPackageJsonDevDependenciesFilterInput = {
  name: Maybe<StringQueryOperatorInput>;
  version: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPackageJsonDevDependenciesFilterListInput = {
  elemMatch: Maybe<SitePluginPackageJsonDevDependenciesFilterInput>;
};

export type SitePluginPackageJsonFilterInput = {
  name: Maybe<StringQueryOperatorInput>;
  description: Maybe<StringQueryOperatorInput>;
  version: Maybe<StringQueryOperatorInput>;
  main: Maybe<StringQueryOperatorInput>;
  license: Maybe<StringQueryOperatorInput>;
  dependencies: Maybe<SitePluginPackageJsonDependenciesFilterListInput>;
  devDependencies: Maybe<SitePluginPackageJsonDevDependenciesFilterListInput>;
  peerDependencies: Maybe<SitePluginPackageJsonPeerDependenciesFilterListInput>;
  keywords: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPackageJsonPeerDependencies = {
  __typename?: 'SitePluginPackageJsonPeerDependencies';
  name: Maybe<Scalars['String']>;
  version: Maybe<Scalars['String']>;
};

export type SitePluginPackageJsonPeerDependenciesFilterInput = {
  name: Maybe<StringQueryOperatorInput>;
  version: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPackageJsonPeerDependenciesFilterListInput = {
  elemMatch: Maybe<SitePluginPackageJsonPeerDependenciesFilterInput>;
};

export type SitePluginPluginOptions = {
  __typename?: 'SitePluginPluginOptions';
  name: Maybe<Scalars['String']>;
  path: Maybe<Scalars['String']>;
  extensions: Maybe<Array<Maybe<Scalars['String']>>>;
  defaultLayouts: Maybe<SitePluginPluginOptionsDefaultLayouts>;
  lessBabel: Maybe<Scalars['Boolean']>;
  mediaTypes: Maybe<Array<Maybe<Scalars['String']>>>;
  root: Maybe<Scalars['String']>;
  short_name: Maybe<Scalars['String']>;
  start_url: Maybe<Scalars['String']>;
  background_color: Maybe<Scalars['String']>;
  theme_color: Maybe<Scalars['String']>;
  icon: Maybe<Scalars['String']>;
  cache_busting_mode: Maybe<Scalars['String']>;
  include_favicon: Maybe<Scalars['Boolean']>;
  legacy: Maybe<Scalars['Boolean']>;
  theme_color_in_head: Maybe<Scalars['Boolean']>;
  cacheDigest: Maybe<Scalars['String']>;
  displayName: Maybe<Scalars['Boolean']>;
  fileName: Maybe<Scalars['Boolean']>;
  minify: Maybe<Scalars['Boolean']>;
  transpileTemplateLiterals: Maybe<Scalars['Boolean']>;
  pure: Maybe<Scalars['Boolean']>;
  isTSX: Maybe<Scalars['Boolean']>;
  jsxPragma: Maybe<Scalars['String']>;
  allExtensions: Maybe<Scalars['Boolean']>;
  languages: Maybe<Array<Maybe<Scalars['String']>>>;
  defaultLanguage: Maybe<Scalars['String']>;
  redirect: Maybe<Scalars['Boolean']>;
  i18nextOptions: Maybe<SitePluginPluginOptionsI18nextOptions>;
  pages: Maybe<Array<Maybe<SitePluginPluginOptionsPages>>>;
  defaultLocale: Maybe<Scalars['String']>;
  prefix: Maybe<Scalars['String']>;
  translations: Maybe<SitePluginPluginOptionsTranslations>;
  airtableApiKey: Maybe<Scalars['String']>;
  airtableBaseUrl: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  includeInDevelopment: Maybe<Scalars['Boolean']>;
  routeChangeEventName: Maybe<Scalars['String']>;
  pathCheck: Maybe<Scalars['Boolean']>;
};

export type SitePluginPluginOptionsDefaultLayouts = {
  __typename?: 'SitePluginPluginOptionsDefaultLayouts';
  default: Maybe<Scalars['String']>;
};

export type SitePluginPluginOptionsDefaultLayoutsFilterInput = {
  default: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPluginOptionsFilterInput = {
  name: Maybe<StringQueryOperatorInput>;
  path: Maybe<StringQueryOperatorInput>;
  extensions: Maybe<StringQueryOperatorInput>;
  defaultLayouts: Maybe<SitePluginPluginOptionsDefaultLayoutsFilterInput>;
  lessBabel: Maybe<BooleanQueryOperatorInput>;
  mediaTypes: Maybe<StringQueryOperatorInput>;
  root: Maybe<StringQueryOperatorInput>;
  short_name: Maybe<StringQueryOperatorInput>;
  start_url: Maybe<StringQueryOperatorInput>;
  background_color: Maybe<StringQueryOperatorInput>;
  theme_color: Maybe<StringQueryOperatorInput>;
  icon: Maybe<StringQueryOperatorInput>;
  cache_busting_mode: Maybe<StringQueryOperatorInput>;
  include_favicon: Maybe<BooleanQueryOperatorInput>;
  legacy: Maybe<BooleanQueryOperatorInput>;
  theme_color_in_head: Maybe<BooleanQueryOperatorInput>;
  cacheDigest: Maybe<StringQueryOperatorInput>;
  displayName: Maybe<BooleanQueryOperatorInput>;
  fileName: Maybe<BooleanQueryOperatorInput>;
  minify: Maybe<BooleanQueryOperatorInput>;
  transpileTemplateLiterals: Maybe<BooleanQueryOperatorInput>;
  pure: Maybe<BooleanQueryOperatorInput>;
  isTSX: Maybe<BooleanQueryOperatorInput>;
  jsxPragma: Maybe<StringQueryOperatorInput>;
  allExtensions: Maybe<BooleanQueryOperatorInput>;
  languages: Maybe<StringQueryOperatorInput>;
  defaultLanguage: Maybe<StringQueryOperatorInput>;
  redirect: Maybe<BooleanQueryOperatorInput>;
  i18nextOptions: Maybe<SitePluginPluginOptionsI18nextOptionsFilterInput>;
  pages: Maybe<SitePluginPluginOptionsPagesFilterListInput>;
  defaultLocale: Maybe<StringQueryOperatorInput>;
  prefix: Maybe<StringQueryOperatorInput>;
  translations: Maybe<SitePluginPluginOptionsTranslationsFilterInput>;
  airtableApiKey: Maybe<StringQueryOperatorInput>;
  airtableBaseUrl: Maybe<StringQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  includeInDevelopment: Maybe<BooleanQueryOperatorInput>;
  routeChangeEventName: Maybe<StringQueryOperatorInput>;
  pathCheck: Maybe<BooleanQueryOperatorInput>;
};

export type SitePluginPluginOptionsI18nextOptions = {
  __typename?: 'SitePluginPluginOptionsI18nextOptions';
  defaultNS: Maybe<Scalars['String']>;
};

export type SitePluginPluginOptionsI18nextOptionsFilterInput = {
  defaultNS: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPluginOptionsPages = {
  __typename?: 'SitePluginPluginOptionsPages';
  matchPath: Maybe<Scalars['String']>;
  languages: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type SitePluginPluginOptionsPagesFilterInput = {
  matchPath: Maybe<StringQueryOperatorInput>;
  languages: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPluginOptionsPagesFilterListInput = {
  elemMatch: Maybe<SitePluginPluginOptionsPagesFilterInput>;
};

export type SitePluginPluginOptionsTranslations = {
  __typename?: 'SitePluginPluginOptionsTranslations';
  cs: Maybe<SitePluginPluginOptionsTranslationsCs>;
};

export type SitePluginPluginOptionsTranslationsCs = {
  __typename?: 'SitePluginPluginOptionsTranslationsCs';
  urls_projects: Maybe<Scalars['String']>;
  urls_page_2: Maybe<Scalars['String']>;
};

export type SitePluginPluginOptionsTranslationsCsFilterInput = {
  urls_projects: Maybe<StringQueryOperatorInput>;
  urls_page_2: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPluginOptionsTranslationsFilterInput = {
  cs: Maybe<SitePluginPluginOptionsTranslationsCsFilterInput>;
};

export type SitePluginSortInput = {
  fields: Maybe<Array<Maybe<SitePluginFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type SiteSiteMetadata = {
  __typename?: 'SiteSiteMetadata';
  title: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
};

export type SiteSiteMetadataFilterInput = {
  title: Maybe<StringQueryOperatorInput>;
  description: Maybe<StringQueryOperatorInput>;
};

export type SiteSortInput = {
  fields: Maybe<Array<Maybe<SiteFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export enum SortOrderEnum {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type StringQueryOperatorInput = {
  eq: Maybe<Scalars['String']>;
  ne: Maybe<Scalars['String']>;
  in: Maybe<Array<Maybe<Scalars['String']>>>;
  nin: Maybe<Array<Maybe<Scalars['String']>>>;
  regex: Maybe<Scalars['String']>;
  glob: Maybe<Scalars['String']>;
};

export type Tag = Node & {
  __typename?: 'Tag';
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  rowId: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  lang: Maybe<Scalars['String']>;
};

export type TagConnection = {
  __typename?: 'TagConnection';
  totalCount: Scalars['Int'];
  edges: Array<TagEdge>;
  nodes: Array<Tag>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<TagGroupConnection>;
};


export type TagConnectionDistinctArgs = {
  field: TagFieldsEnum;
};


export type TagConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: TagFieldsEnum;
};

export type TagEdge = {
  __typename?: 'TagEdge';
  next: Maybe<Tag>;
  node: Tag;
  previous: Maybe<Tag>;
};

export enum TagFieldsEnum {
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type',
  rowId = 'rowId',
  name = 'name',
  slug = 'slug',
  lang = 'lang'
}

export type TagFilterInput = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  rowId: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  slug: Maybe<StringQueryOperatorInput>;
  lang: Maybe<StringQueryOperatorInput>;
};

export type TagFilterListInput = {
  elemMatch: Maybe<TagFilterInput>;
};

export type TagGroupConnection = {
  __typename?: 'TagGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<TagEdge>;
  nodes: Array<Tag>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};

export type TagSortInput = {
  fields: Maybe<Array<Maybe<TagFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type Volunteer = Node & {
  __typename?: 'Volunteer';
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  rowId: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  profilePictureUrl: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  Projects: Maybe<Array<Maybe<Scalars['String']>>>;
  company: Maybe<Scalars['String']>;
  Owned_Events: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type VolunteerConnection = {
  __typename?: 'VolunteerConnection';
  totalCount: Scalars['Int'];
  edges: Array<VolunteerEdge>;
  nodes: Array<Volunteer>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<VolunteerGroupConnection>;
};


export type VolunteerConnectionDistinctArgs = {
  field: VolunteerFieldsEnum;
};


export type VolunteerConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: VolunteerFieldsEnum;
};

export type VolunteerEdge = {
  __typename?: 'VolunteerEdge';
  next: Maybe<Volunteer>;
  node: Volunteer;
  previous: Maybe<Volunteer>;
};

export enum VolunteerFieldsEnum {
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type',
  rowId = 'rowId',
  email = 'email',
  profilePictureUrl = 'profilePictureUrl',
  name = 'name',
  Projects = 'Projects',
  company = 'company',
  Owned_Events = 'Owned_Events'
}

export type VolunteerFilterInput = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  rowId: Maybe<StringQueryOperatorInput>;
  email: Maybe<StringQueryOperatorInput>;
  profilePictureUrl: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  Projects: Maybe<StringQueryOperatorInput>;
  company: Maybe<StringQueryOperatorInput>;
  Owned_Events: Maybe<StringQueryOperatorInput>;
};

export type VolunteerFilterListInput = {
  elemMatch: Maybe<VolunteerFilterInput>;
};

export type VolunteerGroupConnection = {
  __typename?: 'VolunteerGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<VolunteerEdge>;
  nodes: Array<Volunteer>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};

export type VolunteerSortInput = {
  fields: Maybe<Array<Maybe<VolunteerFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type HomepageQueryVariables = Exact<{
  locale: Scalars['String'];
}>;


export type HomepageQuery = (
  { __typename?: 'Query' }
  & { projects: (
    { __typename?: 'ProjectConnection' }
    & { nodes: Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'name' | 'slug' | 'tagline' | 'coverUrl' | 'logoUrl'>
      & { tags: Maybe<Array<Maybe<(
        { __typename?: 'Tag' }
        & Pick<Tag, 'rowId' | 'slug' | 'name' | 'lang'>
      )>>> }
    )> }
  ), partners: (
    { __typename?: 'PartnerConnection' }
    & { nodes: Array<(
      { __typename?: 'Partner' }
      & Pick<Partner, 'name' | 'url' | 'logoUrl'>
    )> }
  ) }
);

export type ProjectsPageQueryVariables = Exact<{
  locale: Scalars['String'];
}>;


export type ProjectsPageQuery = (
  { __typename?: 'Query' }
  & { highlightedProject: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'name' | 'lang' | 'slug' | 'tagline' | 'coverUrl' | 'logoUrl' | 'highlighted'>
    & { tags: Maybe<Array<Maybe<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'rowId' | 'slug' | 'name' | 'lang'>
    )>>> }
  )>, otherProjects: (
    { __typename?: 'ProjectConnection' }
    & { nodes: Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'name' | 'lang' | 'slug' | 'tagline' | 'coverUrl' | 'logoUrl' | 'highlighted'>
      & { tags: Maybe<Array<Maybe<(
        { __typename?: 'Tag' }
        & Pick<Tag, 'rowId' | 'slug' | 'name' | 'lang'>
      )>>> }
    )> }
  ) }
);

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = (
  { __typename?: 'Query' }
  & { allProject: (
    { __typename?: 'ProjectConnection' }
    & { nodes: Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'lang' | 'slug' | 'id'>
    )> }
  ) }
);

export type ProjectPageQueryVariables = Exact<{
  id: Scalars['String'];
  locale: Scalars['String'];
}>;


export type ProjectPageQuery = (
  { __typename?: 'Query' }
  & { project: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'name' | 'lang' | 'description' | 'slackChannelName' | 'slackChannelUrl' | 'finished' | 'tagline' | 'coverUrl' | 'githubUrl' | 'trelloUrl' | 'url' | 'contributeText'>
    & { coordinators: Maybe<Array<Maybe<(
      { __typename?: 'Volunteer' }
      & Pick<Volunteer, 'name' | 'company' | 'profilePictureUrl'>
    )>>> }
  )>, otherProjects: (
    { __typename?: 'ProjectConnection' }
    & { nodes: Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'name' | 'tagline' | 'coverUrl' | 'logoUrl' | 'slug'>
      & { tags: Maybe<Array<Maybe<(
        { __typename?: 'Tag' }
        & Pick<Tag, 'name' | 'slug'>
      )>>> }
    )> }
  ) }
);
