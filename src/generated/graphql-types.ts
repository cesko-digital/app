/**
 * THIS IS GENERATED FILE. DO NOT MODIFY IT DIRECTLY, RUN 'yarn gen:types' INSTEAD.
 */

/* eslint-disable */

export type Maybe<T> = T
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date string, such as 2007-12-03, compliant with the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
}

export type File = Node & {
  __typename?: 'File'
  sourceInstanceName: Scalars['String']
  absolutePath: Scalars['String']
  relativePath: Scalars['String']
  extension: Scalars['String']
  size: Scalars['Int']
  prettySize: Scalars['String']
  modifiedTime: Scalars['Date']
  accessTime: Scalars['Date']
  changeTime: Scalars['Date']
  birthTime: Scalars['Date']
  root: Scalars['String']
  dir: Scalars['String']
  base: Scalars['String']
  ext: Scalars['String']
  name: Scalars['String']
  relativeDirectory: Scalars['String']
  dev: Scalars['Int']
  mode: Scalars['Int']
  nlink: Scalars['Int']
  uid: Scalars['Int']
  gid: Scalars['Int']
  rdev: Scalars['Int']
  ino: Scalars['Float']
  atimeMs: Scalars['Float']
  mtimeMs: Scalars['Float']
  ctimeMs: Scalars['Float']
  atime: Scalars['Date']
  mtime: Scalars['Date']
  ctime: Scalars['Date']
  /** @deprecated Use `birthTime` instead */
  birthtime: Maybe<Scalars['Date']>
  /** @deprecated Use `birthTime` instead */
  birthtimeMs: Maybe<Scalars['Float']>
  blksize: Maybe<Scalars['Int']>
  blocks: Maybe<Scalars['Int']>
  /** Copy file to static directory and return public url to it */
  publicURL: Maybe<Scalars['String']>
  /** Returns all children nodes filtered by type ImageSharp */
  childrenImageSharp: Maybe<Array<Maybe<ImageSharp>>>
  /** Returns the first child node of type ImageSharp or null if there are no children of given type on this node */
  childImageSharp: Maybe<ImageSharp>
  /** Returns all children nodes filtered by type MarkdownRemark */
  childrenMarkdownRemark: Maybe<Array<Maybe<MarkdownRemark>>>
  /** Returns the first child node of type MarkdownRemark or null if there are no children of given type on this node */
  childMarkdownRemark: Maybe<MarkdownRemark>
  /** Returns all children nodes filtered by type Locale */
  childrenLocale: Maybe<Array<Maybe<Locale>>>
  /** Returns the first child node of type Locale or null if there are no children of given type on this node */
  childLocale: Maybe<Locale>
  id: Scalars['ID']
  parent: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type FileModifiedTimeArgs = {
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  difference: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
}

export type FileAccessTimeArgs = {
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  difference: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
}

export type FileChangeTimeArgs = {
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  difference: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
}

export type FileBirthTimeArgs = {
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  difference: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
}

export type FileAtimeArgs = {
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  difference: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
}

export type FileMtimeArgs = {
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  difference: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
}

export type FileCtimeArgs = {
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  difference: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
}

/** Node Interface */
export type Node = {
  id: Scalars['ID']
  parent: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type Internal = {
  __typename?: 'Internal'
  content: Maybe<Scalars['String']>
  contentDigest: Scalars['String']
  description: Maybe<Scalars['String']>
  fieldOwners: Maybe<Array<Maybe<Scalars['String']>>>
  ignoreType: Maybe<Scalars['Boolean']>
  mediaType: Maybe<Scalars['String']>
  owner: Scalars['String']
  type: Scalars['String']
}

export type Directory = Node & {
  __typename?: 'Directory'
  sourceInstanceName: Scalars['String']
  absolutePath: Scalars['String']
  relativePath: Scalars['String']
  extension: Scalars['String']
  size: Scalars['Int']
  prettySize: Scalars['String']
  modifiedTime: Scalars['Date']
  accessTime: Scalars['Date']
  changeTime: Scalars['Date']
  birthTime: Scalars['Date']
  root: Scalars['String']
  dir: Scalars['String']
  base: Scalars['String']
  ext: Scalars['String']
  name: Scalars['String']
  relativeDirectory: Scalars['String']
  dev: Scalars['Int']
  mode: Scalars['Int']
  nlink: Scalars['Int']
  uid: Scalars['Int']
  gid: Scalars['Int']
  rdev: Scalars['Int']
  ino: Scalars['Float']
  atimeMs: Scalars['Float']
  mtimeMs: Scalars['Float']
  ctimeMs: Scalars['Float']
  atime: Scalars['Date']
  mtime: Scalars['Date']
  ctime: Scalars['Date']
  /** @deprecated Use `birthTime` instead */
  birthtime: Maybe<Scalars['Date']>
  /** @deprecated Use `birthTime` instead */
  birthtimeMs: Maybe<Scalars['Float']>
  blksize: Maybe<Scalars['Int']>
  blocks: Maybe<Scalars['Int']>
  id: Scalars['ID']
  parent: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type DirectoryModifiedTimeArgs = {
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  difference: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
}

export type DirectoryAccessTimeArgs = {
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  difference: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
}

export type DirectoryChangeTimeArgs = {
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  difference: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
}

export type DirectoryBirthTimeArgs = {
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  difference: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
}

export type DirectoryAtimeArgs = {
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  difference: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
}

export type DirectoryMtimeArgs = {
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  difference: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
}

export type DirectoryCtimeArgs = {
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  difference: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
}

export type Site = Node & {
  __typename?: 'Site'
  buildTime: Maybe<Scalars['Date']>
  siteMetadata: Maybe<SiteSiteMetadata>
  port: Maybe<Scalars['Int']>
  host: Maybe<Scalars['String']>
  polyfill: Maybe<Scalars['Boolean']>
  pathPrefix: Maybe<Scalars['String']>
  id: Scalars['ID']
  parent: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type SiteBuildTimeArgs = {
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  difference: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
}

export type SiteSiteMetadata = {
  __typename?: 'SiteSiteMetadata'
  title: Maybe<Scalars['String']>
  description: Maybe<Scalars['String']>
}

export type SiteFunction = Node & {
  __typename?: 'SiteFunction'
  functionRoute: Scalars['String']
  pluginName: Scalars['String']
  originalAbsoluteFilePath: Scalars['String']
  originalRelativeFilePath: Scalars['String']
  relativeCompiledFilePath: Scalars['String']
  absoluteCompiledFilePath: Scalars['String']
  matchPath: Maybe<Scalars['String']>
  id: Scalars['ID']
  parent: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type SitePage = Node & {
  __typename?: 'SitePage'
  path: Scalars['String']
  component: Scalars['String']
  internalComponentName: Scalars['String']
  componentChunkName: Scalars['String']
  matchPath: Maybe<Scalars['String']>
  id: Scalars['ID']
  parent: Maybe<Node>
  children: Array<Node>
  internal: Internal
  isCreatedByStatefulCreatePages: Maybe<Scalars['Boolean']>
  context: Maybe<SitePageContext>
  pluginCreator: Maybe<SitePlugin>
  pluginCreatorId: Maybe<Scalars['String']>
}

export type SitePageContext = {
  __typename?: 'SitePageContext'
  id: Maybe<Scalars['String']>
  language: Maybe<Scalars['String']>
  i18n: Maybe<SitePageContextI18n>
}

export type SitePageContextI18n = {
  __typename?: 'SitePageContextI18n'
  language: Maybe<Scalars['String']>
  languages: Maybe<Array<Maybe<Scalars['String']>>>
  defaultLanguage: Maybe<Scalars['String']>
  generateDefaultLanguagePage: Maybe<Scalars['Boolean']>
  routed: Maybe<Scalars['Boolean']>
  originalPath: Maybe<Scalars['String']>
  path: Maybe<Scalars['String']>
}

export type SitePlugin = Node & {
  __typename?: 'SitePlugin'
  resolve: Maybe<Scalars['String']>
  name: Maybe<Scalars['String']>
  version: Maybe<Scalars['String']>
  nodeAPIs: Maybe<Array<Maybe<Scalars['String']>>>
  browserAPIs: Maybe<Array<Maybe<Scalars['String']>>>
  ssrAPIs: Maybe<Array<Maybe<Scalars['String']>>>
  pluginFilepath: Maybe<Scalars['String']>
  pluginOptions: Maybe<SitePluginPluginOptions>
  packageJson: Maybe<SitePluginPackageJson>
  subPluginPaths: Maybe<Array<Maybe<Scalars['String']>>>
  id: Scalars['ID']
  parent: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type SitePluginPluginOptions = {
  __typename?: 'SitePluginPluginOptions'
  plugins: Maybe<Array<Maybe<SitePluginPluginOptionsPlugins>>>
  name: Maybe<Scalars['String']>
  path: Maybe<Scalars['String']>
  base64Width: Maybe<Scalars['Int']>
  stripMetadata: Maybe<Scalars['Boolean']>
  defaultQuality: Maybe<Scalars['Int']>
  failOnError: Maybe<Scalars['Boolean']>
  short_name: Maybe<Scalars['String']>
  start_url: Maybe<Scalars['String']>
  background_color: Maybe<Scalars['String']>
  theme_color: Maybe<Scalars['String']>
  icon: Maybe<Scalars['String']>
  legacy: Maybe<Scalars['Boolean']>
  theme_color_in_head: Maybe<Scalars['Boolean']>
  cache_busting_mode: Maybe<Scalars['String']>
  crossOrigin: Maybe<Scalars['String']>
  include_favicon: Maybe<Scalars['Boolean']>
  cacheDigest: Maybe<Scalars['String']>
  displayName: Maybe<Scalars['Boolean']>
  fileName: Maybe<Scalars['Boolean']>
  minify: Maybe<Scalars['Boolean']>
  namespace: Maybe<Scalars['String']>
  transpileTemplateLiterals: Maybe<Scalars['Boolean']>
  pure: Maybe<Scalars['Boolean']>
  disableVendorPrefixes: Maybe<Scalars['Boolean']>
  isTSX: Maybe<Scalars['Boolean']>
  jsxPragma: Maybe<Scalars['String']>
  allExtensions: Maybe<Scalars['Boolean']>
  terminal: Maybe<Scalars['String']>
  theme: Maybe<Scalars['String']>
  localeJsonSourceName: Maybe<Scalars['String']>
  siteUrl: Maybe<Scalars['String']>
  languages: Maybe<Array<Maybe<Scalars['String']>>>
  defaultLanguage: Maybe<Scalars['String']>
  redirect: Maybe<Scalars['Boolean']>
  pages: Maybe<Array<Maybe<SitePluginPluginOptionsPages>>>
  id: Maybe<Scalars['String']>
  includeInDevelopment: Maybe<Scalars['Boolean']>
  routeChangeEventName: Maybe<Scalars['String']>
  enableWebVitalsTracking: Maybe<Scalars['Boolean']>
  selfHostedOrigin: Maybe<Scalars['String']>
  pathCheck: Maybe<Scalars['Boolean']>
  airtableApiKey: Maybe<Scalars['String']>
  airtableBaseUrl: Maybe<Scalars['String']>
}

export type SitePluginPluginOptionsPlugins = {
  __typename?: 'SitePluginPluginOptionsPlugins'
  resolve: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  name: Maybe<Scalars['String']>
  version: Maybe<Scalars['String']>
  pluginOptions: Maybe<SitePluginPluginOptionsPluginsPluginOptions>
  pluginFilepath: Maybe<Scalars['String']>
}

export type SitePluginPluginOptionsPluginsPluginOptions = {
  __typename?: 'SitePluginPluginOptionsPluginsPluginOptions'
  terminal: Maybe<Scalars['String']>
  theme: Maybe<Scalars['String']>
}

export type SitePluginPluginOptionsPages = {
  __typename?: 'SitePluginPluginOptionsPages'
  matchPath: Maybe<Scalars['String']>
  getLanguageFromPath: Maybe<Scalars['Boolean']>
  languages: Maybe<Array<Maybe<Scalars['String']>>>
}

export type SitePluginPackageJson = {
  __typename?: 'SitePluginPackageJson'
  name: Maybe<Scalars['String']>
  description: Maybe<Scalars['String']>
  version: Maybe<Scalars['String']>
  main: Maybe<Scalars['String']>
  author: Maybe<Scalars['String']>
  license: Maybe<Scalars['String']>
  dependencies: Maybe<Array<Maybe<SitePluginPackageJsonDependencies>>>
  devDependencies: Maybe<Array<Maybe<SitePluginPackageJsonDevDependencies>>>
  peerDependencies: Maybe<Array<Maybe<SitePluginPackageJsonPeerDependencies>>>
  keywords: Maybe<Array<Maybe<Scalars['String']>>>
}

export type SitePluginPackageJsonDependencies = {
  __typename?: 'SitePluginPackageJsonDependencies'
  name: Maybe<Scalars['String']>
  version: Maybe<Scalars['String']>
}

export type SitePluginPackageJsonDevDependencies = {
  __typename?: 'SitePluginPackageJsonDevDependencies'
  name: Maybe<Scalars['String']>
  version: Maybe<Scalars['String']>
}

export type SitePluginPackageJsonPeerDependencies = {
  __typename?: 'SitePluginPackageJsonPeerDependencies'
  name: Maybe<Scalars['String']>
  version: Maybe<Scalars['String']>
}

export type SiteBuildMetadata = Node & {
  __typename?: 'SiteBuildMetadata'
  buildTime: Maybe<Scalars['Date']>
  id: Scalars['ID']
  parent: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type SiteBuildMetadataBuildTimeArgs = {
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  difference: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
}

export enum ImageFormat {
  NO_CHANGE = 'NO_CHANGE',
  AUTO = 'AUTO',
  JPG = 'JPG',
  PNG = 'PNG',
  WEBP = 'WEBP',
  AVIF = 'AVIF',
}

export enum ImageFit {
  COVER = 'COVER',
  CONTAIN = 'CONTAIN',
  FILL = 'FILL',
  INSIDE = 'INSIDE',
  OUTSIDE = 'OUTSIDE',
}

export enum ImageLayout {
  FIXED = 'FIXED',
  FULL_WIDTH = 'FULL_WIDTH',
  CONSTRAINED = 'CONSTRAINED',
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
  ATTENTION = 'ATTENTION',
}

export type DuotoneGradient = {
  highlight: Scalars['String']
  shadow: Scalars['String']
  opacity: Maybe<Scalars['Int']>
}

export enum PotraceTurnPolicy {
  TURNPOLICY_BLACK = 'TURNPOLICY_BLACK',
  TURNPOLICY_WHITE = 'TURNPOLICY_WHITE',
  TURNPOLICY_LEFT = 'TURNPOLICY_LEFT',
  TURNPOLICY_RIGHT = 'TURNPOLICY_RIGHT',
  TURNPOLICY_MINORITY = 'TURNPOLICY_MINORITY',
  TURNPOLICY_MAJORITY = 'TURNPOLICY_MAJORITY',
}

export type Potrace = {
  turnPolicy: Maybe<PotraceTurnPolicy>
  turdSize: Maybe<Scalars['Float']>
  alphaMax: Maybe<Scalars['Float']>
  optCurve: Maybe<Scalars['Boolean']>
  optTolerance: Maybe<Scalars['Float']>
  threshold: Maybe<Scalars['Int']>
  blackOnWhite: Maybe<Scalars['Boolean']>
  color: Maybe<Scalars['String']>
  background: Maybe<Scalars['String']>
}

export type ImageSharp = Node & {
  __typename?: 'ImageSharp'
  fixed: Maybe<ImageSharpFixed>
  fluid: Maybe<ImageSharpFluid>
  gatsbyImageData: Scalars['JSON']
  original: Maybe<ImageSharpOriginal>
  resize: Maybe<ImageSharpResize>
  id: Scalars['ID']
  parent: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type ImageSharpFixedArgs = {
  width: Maybe<Scalars['Int']>
  height: Maybe<Scalars['Int']>
  base64Width: Maybe<Scalars['Int']>
  jpegProgressive?: Maybe<Scalars['Boolean']>
  pngCompressionSpeed?: Maybe<Scalars['Int']>
  grayscale?: Maybe<Scalars['Boolean']>
  duotone: Maybe<DuotoneGradient>
  traceSVG: Maybe<Potrace>
  quality: Maybe<Scalars['Int']>
  jpegQuality: Maybe<Scalars['Int']>
  pngQuality: Maybe<Scalars['Int']>
  webpQuality: Maybe<Scalars['Int']>
  toFormat?: Maybe<ImageFormat>
  toFormatBase64?: Maybe<ImageFormat>
  cropFocus?: Maybe<ImageCropFocus>
  fit?: Maybe<ImageFit>
  background?: Maybe<Scalars['String']>
  rotate?: Maybe<Scalars['Int']>
  trim?: Maybe<Scalars['Float']>
}

export type ImageSharpFluidArgs = {
  maxWidth: Maybe<Scalars['Int']>
  maxHeight: Maybe<Scalars['Int']>
  base64Width: Maybe<Scalars['Int']>
  grayscale?: Maybe<Scalars['Boolean']>
  jpegProgressive?: Maybe<Scalars['Boolean']>
  pngCompressionSpeed?: Maybe<Scalars['Int']>
  duotone: Maybe<DuotoneGradient>
  traceSVG: Maybe<Potrace>
  quality: Maybe<Scalars['Int']>
  jpegQuality: Maybe<Scalars['Int']>
  pngQuality: Maybe<Scalars['Int']>
  webpQuality: Maybe<Scalars['Int']>
  toFormat?: Maybe<ImageFormat>
  toFormatBase64?: Maybe<ImageFormat>
  cropFocus?: Maybe<ImageCropFocus>
  fit?: Maybe<ImageFit>
  background?: Maybe<Scalars['String']>
  rotate?: Maybe<Scalars['Int']>
  trim?: Maybe<Scalars['Float']>
  sizes?: Maybe<Scalars['String']>
  srcSetBreakpoints?: Maybe<Array<Maybe<Scalars['Int']>>>
}

export type ImageSharpGatsbyImageDataArgs = {
  layout?: Maybe<ImageLayout>
  width: Maybe<Scalars['Int']>
  height: Maybe<Scalars['Int']>
  aspectRatio: Maybe<Scalars['Float']>
  placeholder: Maybe<ImagePlaceholder>
  blurredOptions: Maybe<BlurredOptions>
  tracedSVGOptions: Maybe<Potrace>
  formats: Maybe<Array<Maybe<ImageFormat>>>
  outputPixelDensities: Maybe<Array<Maybe<Scalars['Float']>>>
  breakpoints: Maybe<Array<Maybe<Scalars['Int']>>>
  sizes: Maybe<Scalars['String']>
  quality: Maybe<Scalars['Int']>
  jpgOptions: Maybe<JpgOptions>
  pngOptions: Maybe<PngOptions>
  webpOptions: Maybe<WebPOptions>
  avifOptions: Maybe<AvifOptions>
  transformOptions: Maybe<TransformOptions>
  backgroundColor: Maybe<Scalars['String']>
}

export type ImageSharpResizeArgs = {
  width: Maybe<Scalars['Int']>
  height: Maybe<Scalars['Int']>
  quality: Maybe<Scalars['Int']>
  jpegQuality: Maybe<Scalars['Int']>
  pngQuality: Maybe<Scalars['Int']>
  webpQuality: Maybe<Scalars['Int']>
  jpegProgressive?: Maybe<Scalars['Boolean']>
  pngCompressionLevel?: Maybe<Scalars['Int']>
  pngCompressionSpeed?: Maybe<Scalars['Int']>
  grayscale?: Maybe<Scalars['Boolean']>
  duotone: Maybe<DuotoneGradient>
  base64?: Maybe<Scalars['Boolean']>
  traceSVG: Maybe<Potrace>
  toFormat?: Maybe<ImageFormat>
  cropFocus?: Maybe<ImageCropFocus>
  fit?: Maybe<ImageFit>
  background?: Maybe<Scalars['String']>
  rotate?: Maybe<Scalars['Int']>
  trim?: Maybe<Scalars['Float']>
}

export type ImageSharpFixed = {
  __typename?: 'ImageSharpFixed'
  base64: Maybe<Scalars['String']>
  tracedSVG: Maybe<Scalars['String']>
  aspectRatio: Maybe<Scalars['Float']>
  width: Scalars['Float']
  height: Scalars['Float']
  src: Scalars['String']
  srcSet: Scalars['String']
  srcWebp: Maybe<Scalars['String']>
  srcSetWebp: Maybe<Scalars['String']>
  originalName: Maybe<Scalars['String']>
}

export type ImageSharpFluid = {
  __typename?: 'ImageSharpFluid'
  base64: Maybe<Scalars['String']>
  tracedSVG: Maybe<Scalars['String']>
  aspectRatio: Scalars['Float']
  src: Scalars['String']
  srcSet: Scalars['String']
  srcWebp: Maybe<Scalars['String']>
  srcSetWebp: Maybe<Scalars['String']>
  sizes: Scalars['String']
  originalImg: Maybe<Scalars['String']>
  originalName: Maybe<Scalars['String']>
  presentationWidth: Scalars['Int']
  presentationHeight: Scalars['Int']
}

export enum ImagePlaceholder {
  DOMINANT_COLOR = 'DOMINANT_COLOR',
  TRACED_SVG = 'TRACED_SVG',
  BLURRED = 'BLURRED',
  NONE = 'NONE',
}

export type BlurredOptions = {
  /** Width of the generated low-res preview. Default is 20px */
  width: Maybe<Scalars['Int']>
  /** Force the output format for the low-res preview. Default is to use the same format as the input. You should rarely need to change this */
  toFormat: Maybe<ImageFormat>
}

export type JpgOptions = {
  quality: Maybe<Scalars['Int']>
  progressive: Maybe<Scalars['Boolean']>
}

export type PngOptions = {
  quality: Maybe<Scalars['Int']>
  compressionSpeed: Maybe<Scalars['Int']>
}

export type WebPOptions = {
  quality: Maybe<Scalars['Int']>
}

export type AvifOptions = {
  quality: Maybe<Scalars['Int']>
  lossless: Maybe<Scalars['Boolean']>
  speed: Maybe<Scalars['Int']>
}

export type TransformOptions = {
  grayscale: Maybe<Scalars['Boolean']>
  duotone: Maybe<DuotoneGradient>
  rotate: Maybe<Scalars['Int']>
  trim: Maybe<Scalars['Float']>
  cropFocus: Maybe<ImageCropFocus>
  fit: Maybe<ImageFit>
}

export type ImageSharpOriginal = {
  __typename?: 'ImageSharpOriginal'
  width: Maybe<Scalars['Float']>
  height: Maybe<Scalars['Float']>
  src: Maybe<Scalars['String']>
}

export type ImageSharpResize = {
  __typename?: 'ImageSharpResize'
  src: Maybe<Scalars['String']>
  tracedSVG: Maybe<Scalars['String']>
  width: Maybe<Scalars['Int']>
  height: Maybe<Scalars['Int']>
  aspectRatio: Maybe<Scalars['Float']>
  originalName: Maybe<Scalars['String']>
}

export type MarkdownHeading = {
  __typename?: 'MarkdownHeading'
  id: Maybe<Scalars['String']>
  value: Maybe<Scalars['String']>
  depth: Maybe<Scalars['Int']>
}

export enum MarkdownHeadingLevels {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
}

export enum MarkdownExcerptFormats {
  PLAIN = 'PLAIN',
  HTML = 'HTML',
  MARKDOWN = 'MARKDOWN',
}

export type MarkdownWordCount = {
  __typename?: 'MarkdownWordCount'
  paragraphs: Maybe<Scalars['Int']>
  sentences: Maybe<Scalars['Int']>
  words: Maybe<Scalars['Int']>
}

export type MarkdownRemark = Node & {
  __typename?: 'MarkdownRemark'
  id: Scalars['ID']
  frontmatter: Maybe<MarkdownRemarkFrontmatter>
  excerpt: Maybe<Scalars['String']>
  rawMarkdownBody: Maybe<Scalars['String']>
  fileAbsolutePath: Maybe<Scalars['String']>
  html: Maybe<Scalars['String']>
  htmlAst: Maybe<Scalars['JSON']>
  excerptAst: Maybe<Scalars['JSON']>
  headings: Maybe<Array<Maybe<MarkdownHeading>>>
  timeToRead: Maybe<Scalars['Int']>
  tableOfContents: Maybe<Scalars['String']>
  wordCount: Maybe<MarkdownWordCount>
  parent: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type MarkdownRemarkExcerptArgs = {
  pruneLength?: Maybe<Scalars['Int']>
  truncate?: Maybe<Scalars['Boolean']>
  format?: Maybe<MarkdownExcerptFormats>
}

export type MarkdownRemarkExcerptAstArgs = {
  pruneLength?: Maybe<Scalars['Int']>
  truncate?: Maybe<Scalars['Boolean']>
}

export type MarkdownRemarkHeadingsArgs = {
  depth: Maybe<MarkdownHeadingLevels>
}

export type MarkdownRemarkTableOfContentsArgs = {
  absolute?: Maybe<Scalars['Boolean']>
  pathToSlugField?: Maybe<Scalars['String']>
  maxDepth: Maybe<Scalars['Int']>
  heading: Maybe<Scalars['String']>
}

export type MarkdownRemarkFrontmatter = {
  __typename?: 'MarkdownRemarkFrontmatter'
  title: Maybe<Scalars['String']>
  cover: Maybe<Scalars['String']>
  date: Maybe<Scalars['String']>
  slug: Maybe<Scalars['String']>
  description: Maybe<Scalars['String']>
  videoUrl: Maybe<Scalars['String']>
  tags: Maybe<Array<Maybe<Scalars['String']>>>
  tableOfContent: Maybe<Array<Maybe<MarkdownRemarkFrontmatterTableOfContent>>>
  sources: Maybe<Array<Maybe<MarkdownRemarkFrontmatterSources>>>
  credits: Maybe<Array<Maybe<MarkdownRemarkFrontmatterCredits>>>
}

export type MarkdownRemarkFrontmatterTableOfContent = {
  __typename?: 'MarkdownRemarkFrontmatterTableOfContent'
  title: Maybe<Scalars['String']>
  time: Maybe<Scalars['String']>
  start: Maybe<Scalars['Int']>
}

export type MarkdownRemarkFrontmatterSources = {
  __typename?: 'MarkdownRemarkFrontmatterSources'
  type: Maybe<Scalars['String']>
  title: Maybe<Scalars['String']>
  url: Maybe<Scalars['String']>
}

export type MarkdownRemarkFrontmatterCredits = {
  __typename?: 'MarkdownRemarkFrontmatterCredits'
  title: Maybe<Scalars['String']>
  name: Maybe<Scalars['String']>
}

export type Volunteer = Node & {
  __typename?: 'Volunteer'
  id: Scalars['ID']
  parent: Maybe<Node>
  children: Array<Node>
  internal: Internal
  rowId: Maybe<Scalars['String']>
  email: Maybe<Scalars['String']>
  profilePictureUrl: Maybe<Scalars['String']>
  name: Maybe<Scalars['String']>
  Projects: Maybe<Array<Maybe<Scalars['String']>>>
  ID: Maybe<Scalars['String']>
  Owned_Events: Maybe<Array<Maybe<Scalars['String']>>>
  Opportunities: Maybe<Array<Maybe<Scalars['String']>>>
  company: Maybe<Scalars['String']>
}

export type Tag = Node & {
  __typename?: 'Tag'
  id: Scalars['ID']
  parent: Maybe<Node>
  children: Array<Node>
  internal: Internal
  rowId: Maybe<Scalars['String']>
  name: Maybe<Scalars['String']>
  slug: Maybe<Scalars['String']>
}

export type Project = Node & {
  __typename?: 'Project'
  id: Scalars['ID']
  parent: Maybe<Node>
  children: Array<Node>
  internal: Internal
  highlighted: Maybe<Scalars['Boolean']>
  finished: Maybe<Scalars['Boolean']>
  silent: Maybe<Scalars['Boolean']>
  coverUrl: Maybe<Scalars['String']>
  logoUrl: Maybe<Scalars['String']>
  trelloUrl: Maybe<Scalars['String']>
  githubUrl: Maybe<Scalars['String']>
  slackChannelUrl: Maybe<Scalars['String']>
  slackChannelName: Maybe<Scalars['String']>
  url: Maybe<Scalars['String']>
  rowId: Maybe<Scalars['String']>
  name: Maybe<Scalars['String']>
  tagline: Maybe<Scalars['String']>
  slug: Maybe<Scalars['String']>
  description: Maybe<Scalars['String']>
  contributeText: Maybe<Scalars['String']>
  tags: Maybe<Array<Maybe<Tag>>>
  coordinators: Maybe<Array<Maybe<Volunteer>>>
}

export type Partner = Node & {
  __typename?: 'Partner'
  id: Scalars['ID']
  parent: Maybe<Node>
  children: Array<Node>
  internal: Internal
  rowId: Maybe<Scalars['String']>
  name: Maybe<Scalars['String']>
  logoUrl: Maybe<Scalars['String']>
  url: Maybe<Scalars['String']>
  category: Maybe<Array<Maybe<Scalars['String']>>>
}

export type Opportunity = Node & {
  __typename?: 'Opportunity'
  id: Scalars['ID']
  parent: Maybe<Node>
  children: Array<Node>
  internal: Internal
  rowId: Maybe<Scalars['String']>
  slug: Maybe<Scalars['String']>
  name: Maybe<Scalars['String']>
  coverUrl: Maybe<Scalars['String']>
  summary: Maybe<Scalars['String']>
  timeRequirements: Maybe<Scalars['String']>
  skills: Maybe<Array<Maybe<Scalars['String']>>>
  starred: Maybe<Scalars['Boolean']>
  juniorFriendly: Maybe<Scalars['Boolean']>
  contactUrl: Maybe<Scalars['String']>
  status: Maybe<Scalars['String']>
  owner: Maybe<Volunteer>
  project: Maybe<Project>
}

export type Locale = Node & {
  __typename?: 'Locale'
  id: Scalars['ID']
  parent: Maybe<Node>
  children: Array<Node>
  internal: Internal
  language: Maybe<Scalars['String']>
  ns: Maybe<Scalars['String']>
  data: Maybe<Scalars['String']>
  fileAbsolutePath: Maybe<Scalars['String']>
}

export type Event = Node & {
  __typename?: 'Event'
  id: Scalars['ID']
  parent: Maybe<Node>
  children: Array<Node>
  internal: Internal
  rowId: Maybe<Scalars['String']>
  name: Maybe<Scalars['String']>
  summary: Maybe<Scalars['String']>
  description: Maybe<Scalars['String']>
  competenceMap: Maybe<Array<Maybe<Scalars['String']>>>
  startTime: Maybe<Scalars['Date']>
  endTime: Maybe<Scalars['Date']>
  status: Maybe<Scalars['String']>
  slug: Maybe<Scalars['String']>
  rsvpUrl: Maybe<Scalars['String']>
  rsvpTitle: Maybe<Scalars['String']>
  coverUrl: Maybe<Scalars['String']>
  locationTitle: Maybe<Scalars['String']>
  locationUrl: Maybe<Scalars['String']>
  owner: Maybe<Volunteer>
  project: Maybe<Project>
  tags: Maybe<Array<Maybe<Tag>>>
}

export type EventStartTimeArgs = {
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  difference: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
}

export type EventEndTimeArgs = {
  formatString: Maybe<Scalars['String']>
  fromNow: Maybe<Scalars['Boolean']>
  difference: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  file: Maybe<File>
  allFile: FileConnection
  directory: Maybe<Directory>
  allDirectory: DirectoryConnection
  site: Maybe<Site>
  allSite: SiteConnection
  siteFunction: Maybe<SiteFunction>
  allSiteFunction: SiteFunctionConnection
  sitePage: Maybe<SitePage>
  allSitePage: SitePageConnection
  sitePlugin: Maybe<SitePlugin>
  allSitePlugin: SitePluginConnection
  siteBuildMetadata: Maybe<SiteBuildMetadata>
  allSiteBuildMetadata: SiteBuildMetadataConnection
  imageSharp: Maybe<ImageSharp>
  allImageSharp: ImageSharpConnection
  markdownRemark: Maybe<MarkdownRemark>
  allMarkdownRemark: MarkdownRemarkConnection
  volunteer: Maybe<Volunteer>
  allVolunteer: VolunteerConnection
  tag: Maybe<Tag>
  allTag: TagConnection
  project: Maybe<Project>
  allProject: ProjectConnection
  partner: Maybe<Partner>
  allPartner: PartnerConnection
  opportunity: Maybe<Opportunity>
  allOpportunity: OpportunityConnection
  locale: Maybe<Locale>
  allLocale: LocaleConnection
  event: Maybe<Event>
  allEvent: EventConnection
}

export type QueryFileArgs = {
  sourceInstanceName: Maybe<StringQueryOperatorInput>
  absolutePath: Maybe<StringQueryOperatorInput>
  relativePath: Maybe<StringQueryOperatorInput>
  extension: Maybe<StringQueryOperatorInput>
  size: Maybe<IntQueryOperatorInput>
  prettySize: Maybe<StringQueryOperatorInput>
  modifiedTime: Maybe<DateQueryOperatorInput>
  accessTime: Maybe<DateQueryOperatorInput>
  changeTime: Maybe<DateQueryOperatorInput>
  birthTime: Maybe<DateQueryOperatorInput>
  root: Maybe<StringQueryOperatorInput>
  dir: Maybe<StringQueryOperatorInput>
  base: Maybe<StringQueryOperatorInput>
  ext: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  relativeDirectory: Maybe<StringQueryOperatorInput>
  dev: Maybe<IntQueryOperatorInput>
  mode: Maybe<IntQueryOperatorInput>
  nlink: Maybe<IntQueryOperatorInput>
  uid: Maybe<IntQueryOperatorInput>
  gid: Maybe<IntQueryOperatorInput>
  rdev: Maybe<IntQueryOperatorInput>
  ino: Maybe<FloatQueryOperatorInput>
  atimeMs: Maybe<FloatQueryOperatorInput>
  mtimeMs: Maybe<FloatQueryOperatorInput>
  ctimeMs: Maybe<FloatQueryOperatorInput>
  atime: Maybe<DateQueryOperatorInput>
  mtime: Maybe<DateQueryOperatorInput>
  ctime: Maybe<DateQueryOperatorInput>
  birthtime: Maybe<DateQueryOperatorInput>
  birthtimeMs: Maybe<FloatQueryOperatorInput>
  blksize: Maybe<IntQueryOperatorInput>
  blocks: Maybe<IntQueryOperatorInput>
  publicURL: Maybe<StringQueryOperatorInput>
  childrenImageSharp: Maybe<ImageSharpFilterListInput>
  childImageSharp: Maybe<ImageSharpFilterInput>
  childrenMarkdownRemark: Maybe<MarkdownRemarkFilterListInput>
  childMarkdownRemark: Maybe<MarkdownRemarkFilterInput>
  childrenLocale: Maybe<LocaleFilterListInput>
  childLocale: Maybe<LocaleFilterInput>
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
}

export type QueryAllFileArgs = {
  filter: Maybe<FileFilterInput>
  sort: Maybe<FileSortInput>
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
}

export type QueryDirectoryArgs = {
  sourceInstanceName: Maybe<StringQueryOperatorInput>
  absolutePath: Maybe<StringQueryOperatorInput>
  relativePath: Maybe<StringQueryOperatorInput>
  extension: Maybe<StringQueryOperatorInput>
  size: Maybe<IntQueryOperatorInput>
  prettySize: Maybe<StringQueryOperatorInput>
  modifiedTime: Maybe<DateQueryOperatorInput>
  accessTime: Maybe<DateQueryOperatorInput>
  changeTime: Maybe<DateQueryOperatorInput>
  birthTime: Maybe<DateQueryOperatorInput>
  root: Maybe<StringQueryOperatorInput>
  dir: Maybe<StringQueryOperatorInput>
  base: Maybe<StringQueryOperatorInput>
  ext: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  relativeDirectory: Maybe<StringQueryOperatorInput>
  dev: Maybe<IntQueryOperatorInput>
  mode: Maybe<IntQueryOperatorInput>
  nlink: Maybe<IntQueryOperatorInput>
  uid: Maybe<IntQueryOperatorInput>
  gid: Maybe<IntQueryOperatorInput>
  rdev: Maybe<IntQueryOperatorInput>
  ino: Maybe<FloatQueryOperatorInput>
  atimeMs: Maybe<FloatQueryOperatorInput>
  mtimeMs: Maybe<FloatQueryOperatorInput>
  ctimeMs: Maybe<FloatQueryOperatorInput>
  atime: Maybe<DateQueryOperatorInput>
  mtime: Maybe<DateQueryOperatorInput>
  ctime: Maybe<DateQueryOperatorInput>
  birthtime: Maybe<DateQueryOperatorInput>
  birthtimeMs: Maybe<FloatQueryOperatorInput>
  blksize: Maybe<IntQueryOperatorInput>
  blocks: Maybe<IntQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
}

export type QueryAllDirectoryArgs = {
  filter: Maybe<DirectoryFilterInput>
  sort: Maybe<DirectorySortInput>
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
}

export type QuerySiteArgs = {
  buildTime: Maybe<DateQueryOperatorInput>
  siteMetadata: Maybe<SiteSiteMetadataFilterInput>
  port: Maybe<IntQueryOperatorInput>
  host: Maybe<StringQueryOperatorInput>
  polyfill: Maybe<BooleanQueryOperatorInput>
  pathPrefix: Maybe<StringQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
}

export type QueryAllSiteArgs = {
  filter: Maybe<SiteFilterInput>
  sort: Maybe<SiteSortInput>
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
}

export type QuerySiteFunctionArgs = {
  functionRoute: Maybe<StringQueryOperatorInput>
  pluginName: Maybe<StringQueryOperatorInput>
  originalAbsoluteFilePath: Maybe<StringQueryOperatorInput>
  originalRelativeFilePath: Maybe<StringQueryOperatorInput>
  relativeCompiledFilePath: Maybe<StringQueryOperatorInput>
  absoluteCompiledFilePath: Maybe<StringQueryOperatorInput>
  matchPath: Maybe<StringQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
}

export type QueryAllSiteFunctionArgs = {
  filter: Maybe<SiteFunctionFilterInput>
  sort: Maybe<SiteFunctionSortInput>
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
}

export type QuerySitePageArgs = {
  path: Maybe<StringQueryOperatorInput>
  component: Maybe<StringQueryOperatorInput>
  internalComponentName: Maybe<StringQueryOperatorInput>
  componentChunkName: Maybe<StringQueryOperatorInput>
  matchPath: Maybe<StringQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
  isCreatedByStatefulCreatePages: Maybe<BooleanQueryOperatorInput>
  context: Maybe<SitePageContextFilterInput>
  pluginCreator: Maybe<SitePluginFilterInput>
  pluginCreatorId: Maybe<StringQueryOperatorInput>
}

export type QueryAllSitePageArgs = {
  filter: Maybe<SitePageFilterInput>
  sort: Maybe<SitePageSortInput>
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
}

export type QuerySitePluginArgs = {
  resolve: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  version: Maybe<StringQueryOperatorInput>
  nodeAPIs: Maybe<StringQueryOperatorInput>
  browserAPIs: Maybe<StringQueryOperatorInput>
  ssrAPIs: Maybe<StringQueryOperatorInput>
  pluginFilepath: Maybe<StringQueryOperatorInput>
  pluginOptions: Maybe<SitePluginPluginOptionsFilterInput>
  packageJson: Maybe<SitePluginPackageJsonFilterInput>
  subPluginPaths: Maybe<StringQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
}

export type QueryAllSitePluginArgs = {
  filter: Maybe<SitePluginFilterInput>
  sort: Maybe<SitePluginSortInput>
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
}

export type QuerySiteBuildMetadataArgs = {
  buildTime: Maybe<DateQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
}

export type QueryAllSiteBuildMetadataArgs = {
  filter: Maybe<SiteBuildMetadataFilterInput>
  sort: Maybe<SiteBuildMetadataSortInput>
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
}

export type QueryImageSharpArgs = {
  fixed: Maybe<ImageSharpFixedFilterInput>
  fluid: Maybe<ImageSharpFluidFilterInput>
  gatsbyImageData: Maybe<JsonQueryOperatorInput>
  original: Maybe<ImageSharpOriginalFilterInput>
  resize: Maybe<ImageSharpResizeFilterInput>
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
}

export type QueryAllImageSharpArgs = {
  filter: Maybe<ImageSharpFilterInput>
  sort: Maybe<ImageSharpSortInput>
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
}

export type QueryMarkdownRemarkArgs = {
  id: Maybe<StringQueryOperatorInput>
  frontmatter: Maybe<MarkdownRemarkFrontmatterFilterInput>
  excerpt: Maybe<StringQueryOperatorInput>
  rawMarkdownBody: Maybe<StringQueryOperatorInput>
  fileAbsolutePath: Maybe<StringQueryOperatorInput>
  html: Maybe<StringQueryOperatorInput>
  htmlAst: Maybe<JsonQueryOperatorInput>
  excerptAst: Maybe<JsonQueryOperatorInput>
  headings: Maybe<MarkdownHeadingFilterListInput>
  timeToRead: Maybe<IntQueryOperatorInput>
  tableOfContents: Maybe<StringQueryOperatorInput>
  wordCount: Maybe<MarkdownWordCountFilterInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
}

export type QueryAllMarkdownRemarkArgs = {
  filter: Maybe<MarkdownRemarkFilterInput>
  sort: Maybe<MarkdownRemarkSortInput>
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
}

export type QueryVolunteerArgs = {
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
  rowId: Maybe<StringQueryOperatorInput>
  email: Maybe<StringQueryOperatorInput>
  profilePictureUrl: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  Projects: Maybe<StringQueryOperatorInput>
  ID: Maybe<StringQueryOperatorInput>
  Owned_Events: Maybe<StringQueryOperatorInput>
  Opportunities: Maybe<StringQueryOperatorInput>
  company: Maybe<StringQueryOperatorInput>
}

export type QueryAllVolunteerArgs = {
  filter: Maybe<VolunteerFilterInput>
  sort: Maybe<VolunteerSortInput>
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
}

export type QueryTagArgs = {
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
  rowId: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  slug: Maybe<StringQueryOperatorInput>
}

export type QueryAllTagArgs = {
  filter: Maybe<TagFilterInput>
  sort: Maybe<TagSortInput>
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
}

export type QueryProjectArgs = {
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
  highlighted: Maybe<BooleanQueryOperatorInput>
  finished: Maybe<BooleanQueryOperatorInput>
  silent: Maybe<BooleanQueryOperatorInput>
  coverUrl: Maybe<StringQueryOperatorInput>
  logoUrl: Maybe<StringQueryOperatorInput>
  trelloUrl: Maybe<StringQueryOperatorInput>
  githubUrl: Maybe<StringQueryOperatorInput>
  slackChannelUrl: Maybe<StringQueryOperatorInput>
  slackChannelName: Maybe<StringQueryOperatorInput>
  url: Maybe<StringQueryOperatorInput>
  rowId: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  tagline: Maybe<StringQueryOperatorInput>
  slug: Maybe<StringQueryOperatorInput>
  description: Maybe<StringQueryOperatorInput>
  contributeText: Maybe<StringQueryOperatorInput>
  tags: Maybe<TagFilterListInput>
  coordinators: Maybe<VolunteerFilterListInput>
}

export type QueryAllProjectArgs = {
  filter: Maybe<ProjectFilterInput>
  sort: Maybe<ProjectSortInput>
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
}

export type QueryPartnerArgs = {
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
  rowId: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  logoUrl: Maybe<StringQueryOperatorInput>
  url: Maybe<StringQueryOperatorInput>
  category: Maybe<StringQueryOperatorInput>
}

export type QueryAllPartnerArgs = {
  filter: Maybe<PartnerFilterInput>
  sort: Maybe<PartnerSortInput>
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
}

export type QueryOpportunityArgs = {
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
  rowId: Maybe<StringQueryOperatorInput>
  slug: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  coverUrl: Maybe<StringQueryOperatorInput>
  summary: Maybe<StringQueryOperatorInput>
  timeRequirements: Maybe<StringQueryOperatorInput>
  skills: Maybe<StringQueryOperatorInput>
  starred: Maybe<BooleanQueryOperatorInput>
  juniorFriendly: Maybe<BooleanQueryOperatorInput>
  contactUrl: Maybe<StringQueryOperatorInput>
  status: Maybe<StringQueryOperatorInput>
  owner: Maybe<VolunteerFilterInput>
  project: Maybe<ProjectFilterInput>
}

export type QueryAllOpportunityArgs = {
  filter: Maybe<OpportunityFilterInput>
  sort: Maybe<OpportunitySortInput>
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
}

export type QueryLocaleArgs = {
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
  language: Maybe<StringQueryOperatorInput>
  ns: Maybe<StringQueryOperatorInput>
  data: Maybe<StringQueryOperatorInput>
  fileAbsolutePath: Maybe<StringQueryOperatorInput>
}

export type QueryAllLocaleArgs = {
  filter: Maybe<LocaleFilterInput>
  sort: Maybe<LocaleSortInput>
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
}

export type QueryEventArgs = {
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
  rowId: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  summary: Maybe<StringQueryOperatorInput>
  description: Maybe<StringQueryOperatorInput>
  competenceMap: Maybe<StringQueryOperatorInput>
  startTime: Maybe<DateQueryOperatorInput>
  endTime: Maybe<DateQueryOperatorInput>
  status: Maybe<StringQueryOperatorInput>
  slug: Maybe<StringQueryOperatorInput>
  rsvpUrl: Maybe<StringQueryOperatorInput>
  rsvpTitle: Maybe<StringQueryOperatorInput>
  coverUrl: Maybe<StringQueryOperatorInput>
  locationTitle: Maybe<StringQueryOperatorInput>
  locationUrl: Maybe<StringQueryOperatorInput>
  owner: Maybe<VolunteerFilterInput>
  project: Maybe<ProjectFilterInput>
  tags: Maybe<TagFilterListInput>
}

export type QueryAllEventArgs = {
  filter: Maybe<EventFilterInput>
  sort: Maybe<EventSortInput>
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
}

export type StringQueryOperatorInput = {
  eq: Maybe<Scalars['String']>
  ne: Maybe<Scalars['String']>
  in: Maybe<Array<Maybe<Scalars['String']>>>
  nin: Maybe<Array<Maybe<Scalars['String']>>>
  regex: Maybe<Scalars['String']>
  glob: Maybe<Scalars['String']>
}

export type IntQueryOperatorInput = {
  eq: Maybe<Scalars['Int']>
  ne: Maybe<Scalars['Int']>
  gt: Maybe<Scalars['Int']>
  gte: Maybe<Scalars['Int']>
  lt: Maybe<Scalars['Int']>
  lte: Maybe<Scalars['Int']>
  in: Maybe<Array<Maybe<Scalars['Int']>>>
  nin: Maybe<Array<Maybe<Scalars['Int']>>>
}

export type DateQueryOperatorInput = {
  eq: Maybe<Scalars['Date']>
  ne: Maybe<Scalars['Date']>
  gt: Maybe<Scalars['Date']>
  gte: Maybe<Scalars['Date']>
  lt: Maybe<Scalars['Date']>
  lte: Maybe<Scalars['Date']>
  in: Maybe<Array<Maybe<Scalars['Date']>>>
  nin: Maybe<Array<Maybe<Scalars['Date']>>>
}

export type FloatQueryOperatorInput = {
  eq: Maybe<Scalars['Float']>
  ne: Maybe<Scalars['Float']>
  gt: Maybe<Scalars['Float']>
  gte: Maybe<Scalars['Float']>
  lt: Maybe<Scalars['Float']>
  lte: Maybe<Scalars['Float']>
  in: Maybe<Array<Maybe<Scalars['Float']>>>
  nin: Maybe<Array<Maybe<Scalars['Float']>>>
}

export type ImageSharpFilterListInput = {
  elemMatch: Maybe<ImageSharpFilterInput>
}

export type ImageSharpFilterInput = {
  fixed: Maybe<ImageSharpFixedFilterInput>
  fluid: Maybe<ImageSharpFluidFilterInput>
  gatsbyImageData: Maybe<JsonQueryOperatorInput>
  original: Maybe<ImageSharpOriginalFilterInput>
  resize: Maybe<ImageSharpResizeFilterInput>
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
}

export type ImageSharpFixedFilterInput = {
  base64: Maybe<StringQueryOperatorInput>
  tracedSVG: Maybe<StringQueryOperatorInput>
  aspectRatio: Maybe<FloatQueryOperatorInput>
  width: Maybe<FloatQueryOperatorInput>
  height: Maybe<FloatQueryOperatorInput>
  src: Maybe<StringQueryOperatorInput>
  srcSet: Maybe<StringQueryOperatorInput>
  srcWebp: Maybe<StringQueryOperatorInput>
  srcSetWebp: Maybe<StringQueryOperatorInput>
  originalName: Maybe<StringQueryOperatorInput>
}

export type ImageSharpFluidFilterInput = {
  base64: Maybe<StringQueryOperatorInput>
  tracedSVG: Maybe<StringQueryOperatorInput>
  aspectRatio: Maybe<FloatQueryOperatorInput>
  src: Maybe<StringQueryOperatorInput>
  srcSet: Maybe<StringQueryOperatorInput>
  srcWebp: Maybe<StringQueryOperatorInput>
  srcSetWebp: Maybe<StringQueryOperatorInput>
  sizes: Maybe<StringQueryOperatorInput>
  originalImg: Maybe<StringQueryOperatorInput>
  originalName: Maybe<StringQueryOperatorInput>
  presentationWidth: Maybe<IntQueryOperatorInput>
  presentationHeight: Maybe<IntQueryOperatorInput>
}

export type JsonQueryOperatorInput = {
  eq: Maybe<Scalars['JSON']>
  ne: Maybe<Scalars['JSON']>
  in: Maybe<Array<Maybe<Scalars['JSON']>>>
  nin: Maybe<Array<Maybe<Scalars['JSON']>>>
  regex: Maybe<Scalars['JSON']>
  glob: Maybe<Scalars['JSON']>
}

export type ImageSharpOriginalFilterInput = {
  width: Maybe<FloatQueryOperatorInput>
  height: Maybe<FloatQueryOperatorInput>
  src: Maybe<StringQueryOperatorInput>
}

export type ImageSharpResizeFilterInput = {
  src: Maybe<StringQueryOperatorInput>
  tracedSVG: Maybe<StringQueryOperatorInput>
  width: Maybe<IntQueryOperatorInput>
  height: Maybe<IntQueryOperatorInput>
  aspectRatio: Maybe<FloatQueryOperatorInput>
  originalName: Maybe<StringQueryOperatorInput>
}

export type NodeFilterInput = {
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
}

export type NodeFilterListInput = {
  elemMatch: Maybe<NodeFilterInput>
}

export type InternalFilterInput = {
  content: Maybe<StringQueryOperatorInput>
  contentDigest: Maybe<StringQueryOperatorInput>
  description: Maybe<StringQueryOperatorInput>
  fieldOwners: Maybe<StringQueryOperatorInput>
  ignoreType: Maybe<BooleanQueryOperatorInput>
  mediaType: Maybe<StringQueryOperatorInput>
  owner: Maybe<StringQueryOperatorInput>
  type: Maybe<StringQueryOperatorInput>
}

export type BooleanQueryOperatorInput = {
  eq: Maybe<Scalars['Boolean']>
  ne: Maybe<Scalars['Boolean']>
  in: Maybe<Array<Maybe<Scalars['Boolean']>>>
  nin: Maybe<Array<Maybe<Scalars['Boolean']>>>
}

export type MarkdownRemarkFilterListInput = {
  elemMatch: Maybe<MarkdownRemarkFilterInput>
}

export type MarkdownRemarkFilterInput = {
  id: Maybe<StringQueryOperatorInput>
  frontmatter: Maybe<MarkdownRemarkFrontmatterFilterInput>
  excerpt: Maybe<StringQueryOperatorInput>
  rawMarkdownBody: Maybe<StringQueryOperatorInput>
  fileAbsolutePath: Maybe<StringQueryOperatorInput>
  html: Maybe<StringQueryOperatorInput>
  htmlAst: Maybe<JsonQueryOperatorInput>
  excerptAst: Maybe<JsonQueryOperatorInput>
  headings: Maybe<MarkdownHeadingFilterListInput>
  timeToRead: Maybe<IntQueryOperatorInput>
  tableOfContents: Maybe<StringQueryOperatorInput>
  wordCount: Maybe<MarkdownWordCountFilterInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
}

export type MarkdownRemarkFrontmatterFilterInput = {
  title: Maybe<StringQueryOperatorInput>
  cover: Maybe<StringQueryOperatorInput>
  date: Maybe<StringQueryOperatorInput>
  slug: Maybe<StringQueryOperatorInput>
  description: Maybe<StringQueryOperatorInput>
  videoUrl: Maybe<StringQueryOperatorInput>
  tags: Maybe<StringQueryOperatorInput>
  tableOfContent: Maybe<MarkdownRemarkFrontmatterTableOfContentFilterListInput>
  sources: Maybe<MarkdownRemarkFrontmatterSourcesFilterListInput>
  credits: Maybe<MarkdownRemarkFrontmatterCreditsFilterListInput>
}

export type MarkdownRemarkFrontmatterTableOfContentFilterListInput = {
  elemMatch: Maybe<MarkdownRemarkFrontmatterTableOfContentFilterInput>
}

export type MarkdownRemarkFrontmatterTableOfContentFilterInput = {
  title: Maybe<StringQueryOperatorInput>
  time: Maybe<StringQueryOperatorInput>
  start: Maybe<IntQueryOperatorInput>
}

export type MarkdownRemarkFrontmatterSourcesFilterListInput = {
  elemMatch: Maybe<MarkdownRemarkFrontmatterSourcesFilterInput>
}

export type MarkdownRemarkFrontmatterSourcesFilterInput = {
  type: Maybe<StringQueryOperatorInput>
  title: Maybe<StringQueryOperatorInput>
  url: Maybe<StringQueryOperatorInput>
}

export type MarkdownRemarkFrontmatterCreditsFilterListInput = {
  elemMatch: Maybe<MarkdownRemarkFrontmatterCreditsFilterInput>
}

export type MarkdownRemarkFrontmatterCreditsFilterInput = {
  title: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
}

export type MarkdownHeadingFilterListInput = {
  elemMatch: Maybe<MarkdownHeadingFilterInput>
}

export type MarkdownHeadingFilterInput = {
  id: Maybe<StringQueryOperatorInput>
  value: Maybe<StringQueryOperatorInput>
  depth: Maybe<IntQueryOperatorInput>
}

export type MarkdownWordCountFilterInput = {
  paragraphs: Maybe<IntQueryOperatorInput>
  sentences: Maybe<IntQueryOperatorInput>
  words: Maybe<IntQueryOperatorInput>
}

export type LocaleFilterListInput = {
  elemMatch: Maybe<LocaleFilterInput>
}

export type LocaleFilterInput = {
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
  language: Maybe<StringQueryOperatorInput>
  ns: Maybe<StringQueryOperatorInput>
  data: Maybe<StringQueryOperatorInput>
  fileAbsolutePath: Maybe<StringQueryOperatorInput>
}

export type FileConnection = {
  __typename?: 'FileConnection'
  totalCount: Scalars['Int']
  edges: Array<FileEdge>
  nodes: Array<File>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<FileGroupConnection>
}

export type FileConnectionDistinctArgs = {
  field: FileFieldsEnum
}

export type FileConnectionMaxArgs = {
  field: FileFieldsEnum
}

export type FileConnectionMinArgs = {
  field: FileFieldsEnum
}

export type FileConnectionSumArgs = {
  field: FileFieldsEnum
}

export type FileConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: FileFieldsEnum
}

export type FileEdge = {
  __typename?: 'FileEdge'
  next: Maybe<File>
  node: File
  previous: Maybe<File>
}

export type PageInfo = {
  __typename?: 'PageInfo'
  currentPage: Scalars['Int']
  hasPreviousPage: Scalars['Boolean']
  hasNextPage: Scalars['Boolean']
  itemCount: Scalars['Int']
  pageCount: Scalars['Int']
  perPage: Maybe<Scalars['Int']>
  totalCount: Scalars['Int']
}

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
  childrenImageSharp = 'childrenImageSharp',
  childrenImageSharp___fixed___base64 = 'childrenImageSharp___fixed___base64',
  childrenImageSharp___fixed___tracedSVG = 'childrenImageSharp___fixed___tracedSVG',
  childrenImageSharp___fixed___aspectRatio = 'childrenImageSharp___fixed___aspectRatio',
  childrenImageSharp___fixed___width = 'childrenImageSharp___fixed___width',
  childrenImageSharp___fixed___height = 'childrenImageSharp___fixed___height',
  childrenImageSharp___fixed___src = 'childrenImageSharp___fixed___src',
  childrenImageSharp___fixed___srcSet = 'childrenImageSharp___fixed___srcSet',
  childrenImageSharp___fixed___srcWebp = 'childrenImageSharp___fixed___srcWebp',
  childrenImageSharp___fixed___srcSetWebp = 'childrenImageSharp___fixed___srcSetWebp',
  childrenImageSharp___fixed___originalName = 'childrenImageSharp___fixed___originalName',
  childrenImageSharp___fluid___base64 = 'childrenImageSharp___fluid___base64',
  childrenImageSharp___fluid___tracedSVG = 'childrenImageSharp___fluid___tracedSVG',
  childrenImageSharp___fluid___aspectRatio = 'childrenImageSharp___fluid___aspectRatio',
  childrenImageSharp___fluid___src = 'childrenImageSharp___fluid___src',
  childrenImageSharp___fluid___srcSet = 'childrenImageSharp___fluid___srcSet',
  childrenImageSharp___fluid___srcWebp = 'childrenImageSharp___fluid___srcWebp',
  childrenImageSharp___fluid___srcSetWebp = 'childrenImageSharp___fluid___srcSetWebp',
  childrenImageSharp___fluid___sizes = 'childrenImageSharp___fluid___sizes',
  childrenImageSharp___fluid___originalImg = 'childrenImageSharp___fluid___originalImg',
  childrenImageSharp___fluid___originalName = 'childrenImageSharp___fluid___originalName',
  childrenImageSharp___fluid___presentationWidth = 'childrenImageSharp___fluid___presentationWidth',
  childrenImageSharp___fluid___presentationHeight = 'childrenImageSharp___fluid___presentationHeight',
  childrenImageSharp___gatsbyImageData = 'childrenImageSharp___gatsbyImageData',
  childrenImageSharp___original___width = 'childrenImageSharp___original___width',
  childrenImageSharp___original___height = 'childrenImageSharp___original___height',
  childrenImageSharp___original___src = 'childrenImageSharp___original___src',
  childrenImageSharp___resize___src = 'childrenImageSharp___resize___src',
  childrenImageSharp___resize___tracedSVG = 'childrenImageSharp___resize___tracedSVG',
  childrenImageSharp___resize___width = 'childrenImageSharp___resize___width',
  childrenImageSharp___resize___height = 'childrenImageSharp___resize___height',
  childrenImageSharp___resize___aspectRatio = 'childrenImageSharp___resize___aspectRatio',
  childrenImageSharp___resize___originalName = 'childrenImageSharp___resize___originalName',
  childrenImageSharp___id = 'childrenImageSharp___id',
  childrenImageSharp___parent___id = 'childrenImageSharp___parent___id',
  childrenImageSharp___parent___parent___id = 'childrenImageSharp___parent___parent___id',
  childrenImageSharp___parent___parent___children = 'childrenImageSharp___parent___parent___children',
  childrenImageSharp___parent___children = 'childrenImageSharp___parent___children',
  childrenImageSharp___parent___children___id = 'childrenImageSharp___parent___children___id',
  childrenImageSharp___parent___children___children = 'childrenImageSharp___parent___children___children',
  childrenImageSharp___parent___internal___content = 'childrenImageSharp___parent___internal___content',
  childrenImageSharp___parent___internal___contentDigest = 'childrenImageSharp___parent___internal___contentDigest',
  childrenImageSharp___parent___internal___description = 'childrenImageSharp___parent___internal___description',
  childrenImageSharp___parent___internal___fieldOwners = 'childrenImageSharp___parent___internal___fieldOwners',
  childrenImageSharp___parent___internal___ignoreType = 'childrenImageSharp___parent___internal___ignoreType',
  childrenImageSharp___parent___internal___mediaType = 'childrenImageSharp___parent___internal___mediaType',
  childrenImageSharp___parent___internal___owner = 'childrenImageSharp___parent___internal___owner',
  childrenImageSharp___parent___internal___type = 'childrenImageSharp___parent___internal___type',
  childrenImageSharp___children = 'childrenImageSharp___children',
  childrenImageSharp___children___id = 'childrenImageSharp___children___id',
  childrenImageSharp___children___parent___id = 'childrenImageSharp___children___parent___id',
  childrenImageSharp___children___parent___children = 'childrenImageSharp___children___parent___children',
  childrenImageSharp___children___children = 'childrenImageSharp___children___children',
  childrenImageSharp___children___children___id = 'childrenImageSharp___children___children___id',
  childrenImageSharp___children___children___children = 'childrenImageSharp___children___children___children',
  childrenImageSharp___children___internal___content = 'childrenImageSharp___children___internal___content',
  childrenImageSharp___children___internal___contentDigest = 'childrenImageSharp___children___internal___contentDigest',
  childrenImageSharp___children___internal___description = 'childrenImageSharp___children___internal___description',
  childrenImageSharp___children___internal___fieldOwners = 'childrenImageSharp___children___internal___fieldOwners',
  childrenImageSharp___children___internal___ignoreType = 'childrenImageSharp___children___internal___ignoreType',
  childrenImageSharp___children___internal___mediaType = 'childrenImageSharp___children___internal___mediaType',
  childrenImageSharp___children___internal___owner = 'childrenImageSharp___children___internal___owner',
  childrenImageSharp___children___internal___type = 'childrenImageSharp___children___internal___type',
  childrenImageSharp___internal___content = 'childrenImageSharp___internal___content',
  childrenImageSharp___internal___contentDigest = 'childrenImageSharp___internal___contentDigest',
  childrenImageSharp___internal___description = 'childrenImageSharp___internal___description',
  childrenImageSharp___internal___fieldOwners = 'childrenImageSharp___internal___fieldOwners',
  childrenImageSharp___internal___ignoreType = 'childrenImageSharp___internal___ignoreType',
  childrenImageSharp___internal___mediaType = 'childrenImageSharp___internal___mediaType',
  childrenImageSharp___internal___owner = 'childrenImageSharp___internal___owner',
  childrenImageSharp___internal___type = 'childrenImageSharp___internal___type',
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
  childImageSharp___gatsbyImageData = 'childImageSharp___gatsbyImageData',
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
  childrenMarkdownRemark = 'childrenMarkdownRemark',
  childrenMarkdownRemark___id = 'childrenMarkdownRemark___id',
  childrenMarkdownRemark___frontmatter___title = 'childrenMarkdownRemark___frontmatter___title',
  childrenMarkdownRemark___frontmatter___cover = 'childrenMarkdownRemark___frontmatter___cover',
  childrenMarkdownRemark___frontmatter___date = 'childrenMarkdownRemark___frontmatter___date',
  childrenMarkdownRemark___frontmatter___slug = 'childrenMarkdownRemark___frontmatter___slug',
  childrenMarkdownRemark___frontmatter___description = 'childrenMarkdownRemark___frontmatter___description',
  childrenMarkdownRemark___frontmatter___videoUrl = 'childrenMarkdownRemark___frontmatter___videoUrl',
  childrenMarkdownRemark___frontmatter___tags = 'childrenMarkdownRemark___frontmatter___tags',
  childrenMarkdownRemark___frontmatter___tableOfContent = 'childrenMarkdownRemark___frontmatter___tableOfContent',
  childrenMarkdownRemark___frontmatter___tableOfContent___title = 'childrenMarkdownRemark___frontmatter___tableOfContent___title',
  childrenMarkdownRemark___frontmatter___tableOfContent___time = 'childrenMarkdownRemark___frontmatter___tableOfContent___time',
  childrenMarkdownRemark___frontmatter___tableOfContent___start = 'childrenMarkdownRemark___frontmatter___tableOfContent___start',
  childrenMarkdownRemark___frontmatter___sources = 'childrenMarkdownRemark___frontmatter___sources',
  childrenMarkdownRemark___frontmatter___sources___type = 'childrenMarkdownRemark___frontmatter___sources___type',
  childrenMarkdownRemark___frontmatter___sources___title = 'childrenMarkdownRemark___frontmatter___sources___title',
  childrenMarkdownRemark___frontmatter___sources___url = 'childrenMarkdownRemark___frontmatter___sources___url',
  childrenMarkdownRemark___frontmatter___credits = 'childrenMarkdownRemark___frontmatter___credits',
  childrenMarkdownRemark___frontmatter___credits___title = 'childrenMarkdownRemark___frontmatter___credits___title',
  childrenMarkdownRemark___frontmatter___credits___name = 'childrenMarkdownRemark___frontmatter___credits___name',
  childrenMarkdownRemark___excerpt = 'childrenMarkdownRemark___excerpt',
  childrenMarkdownRemark___rawMarkdownBody = 'childrenMarkdownRemark___rawMarkdownBody',
  childrenMarkdownRemark___fileAbsolutePath = 'childrenMarkdownRemark___fileAbsolutePath',
  childrenMarkdownRemark___html = 'childrenMarkdownRemark___html',
  childrenMarkdownRemark___htmlAst = 'childrenMarkdownRemark___htmlAst',
  childrenMarkdownRemark___excerptAst = 'childrenMarkdownRemark___excerptAst',
  childrenMarkdownRemark___headings = 'childrenMarkdownRemark___headings',
  childrenMarkdownRemark___headings___id = 'childrenMarkdownRemark___headings___id',
  childrenMarkdownRemark___headings___value = 'childrenMarkdownRemark___headings___value',
  childrenMarkdownRemark___headings___depth = 'childrenMarkdownRemark___headings___depth',
  childrenMarkdownRemark___timeToRead = 'childrenMarkdownRemark___timeToRead',
  childrenMarkdownRemark___tableOfContents = 'childrenMarkdownRemark___tableOfContents',
  childrenMarkdownRemark___wordCount___paragraphs = 'childrenMarkdownRemark___wordCount___paragraphs',
  childrenMarkdownRemark___wordCount___sentences = 'childrenMarkdownRemark___wordCount___sentences',
  childrenMarkdownRemark___wordCount___words = 'childrenMarkdownRemark___wordCount___words',
  childrenMarkdownRemark___parent___id = 'childrenMarkdownRemark___parent___id',
  childrenMarkdownRemark___parent___parent___id = 'childrenMarkdownRemark___parent___parent___id',
  childrenMarkdownRemark___parent___parent___children = 'childrenMarkdownRemark___parent___parent___children',
  childrenMarkdownRemark___parent___children = 'childrenMarkdownRemark___parent___children',
  childrenMarkdownRemark___parent___children___id = 'childrenMarkdownRemark___parent___children___id',
  childrenMarkdownRemark___parent___children___children = 'childrenMarkdownRemark___parent___children___children',
  childrenMarkdownRemark___parent___internal___content = 'childrenMarkdownRemark___parent___internal___content',
  childrenMarkdownRemark___parent___internal___contentDigest = 'childrenMarkdownRemark___parent___internal___contentDigest',
  childrenMarkdownRemark___parent___internal___description = 'childrenMarkdownRemark___parent___internal___description',
  childrenMarkdownRemark___parent___internal___fieldOwners = 'childrenMarkdownRemark___parent___internal___fieldOwners',
  childrenMarkdownRemark___parent___internal___ignoreType = 'childrenMarkdownRemark___parent___internal___ignoreType',
  childrenMarkdownRemark___parent___internal___mediaType = 'childrenMarkdownRemark___parent___internal___mediaType',
  childrenMarkdownRemark___parent___internal___owner = 'childrenMarkdownRemark___parent___internal___owner',
  childrenMarkdownRemark___parent___internal___type = 'childrenMarkdownRemark___parent___internal___type',
  childrenMarkdownRemark___children = 'childrenMarkdownRemark___children',
  childrenMarkdownRemark___children___id = 'childrenMarkdownRemark___children___id',
  childrenMarkdownRemark___children___parent___id = 'childrenMarkdownRemark___children___parent___id',
  childrenMarkdownRemark___children___parent___children = 'childrenMarkdownRemark___children___parent___children',
  childrenMarkdownRemark___children___children = 'childrenMarkdownRemark___children___children',
  childrenMarkdownRemark___children___children___id = 'childrenMarkdownRemark___children___children___id',
  childrenMarkdownRemark___children___children___children = 'childrenMarkdownRemark___children___children___children',
  childrenMarkdownRemark___children___internal___content = 'childrenMarkdownRemark___children___internal___content',
  childrenMarkdownRemark___children___internal___contentDigest = 'childrenMarkdownRemark___children___internal___contentDigest',
  childrenMarkdownRemark___children___internal___description = 'childrenMarkdownRemark___children___internal___description',
  childrenMarkdownRemark___children___internal___fieldOwners = 'childrenMarkdownRemark___children___internal___fieldOwners',
  childrenMarkdownRemark___children___internal___ignoreType = 'childrenMarkdownRemark___children___internal___ignoreType',
  childrenMarkdownRemark___children___internal___mediaType = 'childrenMarkdownRemark___children___internal___mediaType',
  childrenMarkdownRemark___children___internal___owner = 'childrenMarkdownRemark___children___internal___owner',
  childrenMarkdownRemark___children___internal___type = 'childrenMarkdownRemark___children___internal___type',
  childrenMarkdownRemark___internal___content = 'childrenMarkdownRemark___internal___content',
  childrenMarkdownRemark___internal___contentDigest = 'childrenMarkdownRemark___internal___contentDigest',
  childrenMarkdownRemark___internal___description = 'childrenMarkdownRemark___internal___description',
  childrenMarkdownRemark___internal___fieldOwners = 'childrenMarkdownRemark___internal___fieldOwners',
  childrenMarkdownRemark___internal___ignoreType = 'childrenMarkdownRemark___internal___ignoreType',
  childrenMarkdownRemark___internal___mediaType = 'childrenMarkdownRemark___internal___mediaType',
  childrenMarkdownRemark___internal___owner = 'childrenMarkdownRemark___internal___owner',
  childrenMarkdownRemark___internal___type = 'childrenMarkdownRemark___internal___type',
  childMarkdownRemark___id = 'childMarkdownRemark___id',
  childMarkdownRemark___frontmatter___title = 'childMarkdownRemark___frontmatter___title',
  childMarkdownRemark___frontmatter___cover = 'childMarkdownRemark___frontmatter___cover',
  childMarkdownRemark___frontmatter___date = 'childMarkdownRemark___frontmatter___date',
  childMarkdownRemark___frontmatter___slug = 'childMarkdownRemark___frontmatter___slug',
  childMarkdownRemark___frontmatter___description = 'childMarkdownRemark___frontmatter___description',
  childMarkdownRemark___frontmatter___videoUrl = 'childMarkdownRemark___frontmatter___videoUrl',
  childMarkdownRemark___frontmatter___tags = 'childMarkdownRemark___frontmatter___tags',
  childMarkdownRemark___frontmatter___tableOfContent = 'childMarkdownRemark___frontmatter___tableOfContent',
  childMarkdownRemark___frontmatter___tableOfContent___title = 'childMarkdownRemark___frontmatter___tableOfContent___title',
  childMarkdownRemark___frontmatter___tableOfContent___time = 'childMarkdownRemark___frontmatter___tableOfContent___time',
  childMarkdownRemark___frontmatter___tableOfContent___start = 'childMarkdownRemark___frontmatter___tableOfContent___start',
  childMarkdownRemark___frontmatter___sources = 'childMarkdownRemark___frontmatter___sources',
  childMarkdownRemark___frontmatter___sources___type = 'childMarkdownRemark___frontmatter___sources___type',
  childMarkdownRemark___frontmatter___sources___title = 'childMarkdownRemark___frontmatter___sources___title',
  childMarkdownRemark___frontmatter___sources___url = 'childMarkdownRemark___frontmatter___sources___url',
  childMarkdownRemark___frontmatter___credits = 'childMarkdownRemark___frontmatter___credits',
  childMarkdownRemark___frontmatter___credits___title = 'childMarkdownRemark___frontmatter___credits___title',
  childMarkdownRemark___frontmatter___credits___name = 'childMarkdownRemark___frontmatter___credits___name',
  childMarkdownRemark___excerpt = 'childMarkdownRemark___excerpt',
  childMarkdownRemark___rawMarkdownBody = 'childMarkdownRemark___rawMarkdownBody',
  childMarkdownRemark___fileAbsolutePath = 'childMarkdownRemark___fileAbsolutePath',
  childMarkdownRemark___html = 'childMarkdownRemark___html',
  childMarkdownRemark___htmlAst = 'childMarkdownRemark___htmlAst',
  childMarkdownRemark___excerptAst = 'childMarkdownRemark___excerptAst',
  childMarkdownRemark___headings = 'childMarkdownRemark___headings',
  childMarkdownRemark___headings___id = 'childMarkdownRemark___headings___id',
  childMarkdownRemark___headings___value = 'childMarkdownRemark___headings___value',
  childMarkdownRemark___headings___depth = 'childMarkdownRemark___headings___depth',
  childMarkdownRemark___timeToRead = 'childMarkdownRemark___timeToRead',
  childMarkdownRemark___tableOfContents = 'childMarkdownRemark___tableOfContents',
  childMarkdownRemark___wordCount___paragraphs = 'childMarkdownRemark___wordCount___paragraphs',
  childMarkdownRemark___wordCount___sentences = 'childMarkdownRemark___wordCount___sentences',
  childMarkdownRemark___wordCount___words = 'childMarkdownRemark___wordCount___words',
  childMarkdownRemark___parent___id = 'childMarkdownRemark___parent___id',
  childMarkdownRemark___parent___parent___id = 'childMarkdownRemark___parent___parent___id',
  childMarkdownRemark___parent___parent___children = 'childMarkdownRemark___parent___parent___children',
  childMarkdownRemark___parent___children = 'childMarkdownRemark___parent___children',
  childMarkdownRemark___parent___children___id = 'childMarkdownRemark___parent___children___id',
  childMarkdownRemark___parent___children___children = 'childMarkdownRemark___parent___children___children',
  childMarkdownRemark___parent___internal___content = 'childMarkdownRemark___parent___internal___content',
  childMarkdownRemark___parent___internal___contentDigest = 'childMarkdownRemark___parent___internal___contentDigest',
  childMarkdownRemark___parent___internal___description = 'childMarkdownRemark___parent___internal___description',
  childMarkdownRemark___parent___internal___fieldOwners = 'childMarkdownRemark___parent___internal___fieldOwners',
  childMarkdownRemark___parent___internal___ignoreType = 'childMarkdownRemark___parent___internal___ignoreType',
  childMarkdownRemark___parent___internal___mediaType = 'childMarkdownRemark___parent___internal___mediaType',
  childMarkdownRemark___parent___internal___owner = 'childMarkdownRemark___parent___internal___owner',
  childMarkdownRemark___parent___internal___type = 'childMarkdownRemark___parent___internal___type',
  childMarkdownRemark___children = 'childMarkdownRemark___children',
  childMarkdownRemark___children___id = 'childMarkdownRemark___children___id',
  childMarkdownRemark___children___parent___id = 'childMarkdownRemark___children___parent___id',
  childMarkdownRemark___children___parent___children = 'childMarkdownRemark___children___parent___children',
  childMarkdownRemark___children___children = 'childMarkdownRemark___children___children',
  childMarkdownRemark___children___children___id = 'childMarkdownRemark___children___children___id',
  childMarkdownRemark___children___children___children = 'childMarkdownRemark___children___children___children',
  childMarkdownRemark___children___internal___content = 'childMarkdownRemark___children___internal___content',
  childMarkdownRemark___children___internal___contentDigest = 'childMarkdownRemark___children___internal___contentDigest',
  childMarkdownRemark___children___internal___description = 'childMarkdownRemark___children___internal___description',
  childMarkdownRemark___children___internal___fieldOwners = 'childMarkdownRemark___children___internal___fieldOwners',
  childMarkdownRemark___children___internal___ignoreType = 'childMarkdownRemark___children___internal___ignoreType',
  childMarkdownRemark___children___internal___mediaType = 'childMarkdownRemark___children___internal___mediaType',
  childMarkdownRemark___children___internal___owner = 'childMarkdownRemark___children___internal___owner',
  childMarkdownRemark___children___internal___type = 'childMarkdownRemark___children___internal___type',
  childMarkdownRemark___internal___content = 'childMarkdownRemark___internal___content',
  childMarkdownRemark___internal___contentDigest = 'childMarkdownRemark___internal___contentDigest',
  childMarkdownRemark___internal___description = 'childMarkdownRemark___internal___description',
  childMarkdownRemark___internal___fieldOwners = 'childMarkdownRemark___internal___fieldOwners',
  childMarkdownRemark___internal___ignoreType = 'childMarkdownRemark___internal___ignoreType',
  childMarkdownRemark___internal___mediaType = 'childMarkdownRemark___internal___mediaType',
  childMarkdownRemark___internal___owner = 'childMarkdownRemark___internal___owner',
  childMarkdownRemark___internal___type = 'childMarkdownRemark___internal___type',
  childrenLocale = 'childrenLocale',
  childrenLocale___id = 'childrenLocale___id',
  childrenLocale___parent___id = 'childrenLocale___parent___id',
  childrenLocale___parent___parent___id = 'childrenLocale___parent___parent___id',
  childrenLocale___parent___parent___children = 'childrenLocale___parent___parent___children',
  childrenLocale___parent___children = 'childrenLocale___parent___children',
  childrenLocale___parent___children___id = 'childrenLocale___parent___children___id',
  childrenLocale___parent___children___children = 'childrenLocale___parent___children___children',
  childrenLocale___parent___internal___content = 'childrenLocale___parent___internal___content',
  childrenLocale___parent___internal___contentDigest = 'childrenLocale___parent___internal___contentDigest',
  childrenLocale___parent___internal___description = 'childrenLocale___parent___internal___description',
  childrenLocale___parent___internal___fieldOwners = 'childrenLocale___parent___internal___fieldOwners',
  childrenLocale___parent___internal___ignoreType = 'childrenLocale___parent___internal___ignoreType',
  childrenLocale___parent___internal___mediaType = 'childrenLocale___parent___internal___mediaType',
  childrenLocale___parent___internal___owner = 'childrenLocale___parent___internal___owner',
  childrenLocale___parent___internal___type = 'childrenLocale___parent___internal___type',
  childrenLocale___children = 'childrenLocale___children',
  childrenLocale___children___id = 'childrenLocale___children___id',
  childrenLocale___children___parent___id = 'childrenLocale___children___parent___id',
  childrenLocale___children___parent___children = 'childrenLocale___children___parent___children',
  childrenLocale___children___children = 'childrenLocale___children___children',
  childrenLocale___children___children___id = 'childrenLocale___children___children___id',
  childrenLocale___children___children___children = 'childrenLocale___children___children___children',
  childrenLocale___children___internal___content = 'childrenLocale___children___internal___content',
  childrenLocale___children___internal___contentDigest = 'childrenLocale___children___internal___contentDigest',
  childrenLocale___children___internal___description = 'childrenLocale___children___internal___description',
  childrenLocale___children___internal___fieldOwners = 'childrenLocale___children___internal___fieldOwners',
  childrenLocale___children___internal___ignoreType = 'childrenLocale___children___internal___ignoreType',
  childrenLocale___children___internal___mediaType = 'childrenLocale___children___internal___mediaType',
  childrenLocale___children___internal___owner = 'childrenLocale___children___internal___owner',
  childrenLocale___children___internal___type = 'childrenLocale___children___internal___type',
  childrenLocale___internal___content = 'childrenLocale___internal___content',
  childrenLocale___internal___contentDigest = 'childrenLocale___internal___contentDigest',
  childrenLocale___internal___description = 'childrenLocale___internal___description',
  childrenLocale___internal___fieldOwners = 'childrenLocale___internal___fieldOwners',
  childrenLocale___internal___ignoreType = 'childrenLocale___internal___ignoreType',
  childrenLocale___internal___mediaType = 'childrenLocale___internal___mediaType',
  childrenLocale___internal___owner = 'childrenLocale___internal___owner',
  childrenLocale___internal___type = 'childrenLocale___internal___type',
  childrenLocale___language = 'childrenLocale___language',
  childrenLocale___ns = 'childrenLocale___ns',
  childrenLocale___data = 'childrenLocale___data',
  childrenLocale___fileAbsolutePath = 'childrenLocale___fileAbsolutePath',
  childLocale___id = 'childLocale___id',
  childLocale___parent___id = 'childLocale___parent___id',
  childLocale___parent___parent___id = 'childLocale___parent___parent___id',
  childLocale___parent___parent___children = 'childLocale___parent___parent___children',
  childLocale___parent___children = 'childLocale___parent___children',
  childLocale___parent___children___id = 'childLocale___parent___children___id',
  childLocale___parent___children___children = 'childLocale___parent___children___children',
  childLocale___parent___internal___content = 'childLocale___parent___internal___content',
  childLocale___parent___internal___contentDigest = 'childLocale___parent___internal___contentDigest',
  childLocale___parent___internal___description = 'childLocale___parent___internal___description',
  childLocale___parent___internal___fieldOwners = 'childLocale___parent___internal___fieldOwners',
  childLocale___parent___internal___ignoreType = 'childLocale___parent___internal___ignoreType',
  childLocale___parent___internal___mediaType = 'childLocale___parent___internal___mediaType',
  childLocale___parent___internal___owner = 'childLocale___parent___internal___owner',
  childLocale___parent___internal___type = 'childLocale___parent___internal___type',
  childLocale___children = 'childLocale___children',
  childLocale___children___id = 'childLocale___children___id',
  childLocale___children___parent___id = 'childLocale___children___parent___id',
  childLocale___children___parent___children = 'childLocale___children___parent___children',
  childLocale___children___children = 'childLocale___children___children',
  childLocale___children___children___id = 'childLocale___children___children___id',
  childLocale___children___children___children = 'childLocale___children___children___children',
  childLocale___children___internal___content = 'childLocale___children___internal___content',
  childLocale___children___internal___contentDigest = 'childLocale___children___internal___contentDigest',
  childLocale___children___internal___description = 'childLocale___children___internal___description',
  childLocale___children___internal___fieldOwners = 'childLocale___children___internal___fieldOwners',
  childLocale___children___internal___ignoreType = 'childLocale___children___internal___ignoreType',
  childLocale___children___internal___mediaType = 'childLocale___children___internal___mediaType',
  childLocale___children___internal___owner = 'childLocale___children___internal___owner',
  childLocale___children___internal___type = 'childLocale___children___internal___type',
  childLocale___internal___content = 'childLocale___internal___content',
  childLocale___internal___contentDigest = 'childLocale___internal___contentDigest',
  childLocale___internal___description = 'childLocale___internal___description',
  childLocale___internal___fieldOwners = 'childLocale___internal___fieldOwners',
  childLocale___internal___ignoreType = 'childLocale___internal___ignoreType',
  childLocale___internal___mediaType = 'childLocale___internal___mediaType',
  childLocale___internal___owner = 'childLocale___internal___owner',
  childLocale___internal___type = 'childLocale___internal___type',
  childLocale___language = 'childLocale___language',
  childLocale___ns = 'childLocale___ns',
  childLocale___data = 'childLocale___data',
  childLocale___fileAbsolutePath = 'childLocale___fileAbsolutePath',
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
}

export type FileGroupConnection = {
  __typename?: 'FileGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<FileEdge>
  nodes: Array<File>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<FileGroupConnection>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
}

export type FileGroupConnectionDistinctArgs = {
  field: FileFieldsEnum
}

export type FileGroupConnectionMaxArgs = {
  field: FileFieldsEnum
}

export type FileGroupConnectionMinArgs = {
  field: FileFieldsEnum
}

export type FileGroupConnectionSumArgs = {
  field: FileFieldsEnum
}

export type FileGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: FileFieldsEnum
}

export type FileFilterInput = {
  sourceInstanceName: Maybe<StringQueryOperatorInput>
  absolutePath: Maybe<StringQueryOperatorInput>
  relativePath: Maybe<StringQueryOperatorInput>
  extension: Maybe<StringQueryOperatorInput>
  size: Maybe<IntQueryOperatorInput>
  prettySize: Maybe<StringQueryOperatorInput>
  modifiedTime: Maybe<DateQueryOperatorInput>
  accessTime: Maybe<DateQueryOperatorInput>
  changeTime: Maybe<DateQueryOperatorInput>
  birthTime: Maybe<DateQueryOperatorInput>
  root: Maybe<StringQueryOperatorInput>
  dir: Maybe<StringQueryOperatorInput>
  base: Maybe<StringQueryOperatorInput>
  ext: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  relativeDirectory: Maybe<StringQueryOperatorInput>
  dev: Maybe<IntQueryOperatorInput>
  mode: Maybe<IntQueryOperatorInput>
  nlink: Maybe<IntQueryOperatorInput>
  uid: Maybe<IntQueryOperatorInput>
  gid: Maybe<IntQueryOperatorInput>
  rdev: Maybe<IntQueryOperatorInput>
  ino: Maybe<FloatQueryOperatorInput>
  atimeMs: Maybe<FloatQueryOperatorInput>
  mtimeMs: Maybe<FloatQueryOperatorInput>
  ctimeMs: Maybe<FloatQueryOperatorInput>
  atime: Maybe<DateQueryOperatorInput>
  mtime: Maybe<DateQueryOperatorInput>
  ctime: Maybe<DateQueryOperatorInput>
  birthtime: Maybe<DateQueryOperatorInput>
  birthtimeMs: Maybe<FloatQueryOperatorInput>
  blksize: Maybe<IntQueryOperatorInput>
  blocks: Maybe<IntQueryOperatorInput>
  publicURL: Maybe<StringQueryOperatorInput>
  childrenImageSharp: Maybe<ImageSharpFilterListInput>
  childImageSharp: Maybe<ImageSharpFilterInput>
  childrenMarkdownRemark: Maybe<MarkdownRemarkFilterListInput>
  childMarkdownRemark: Maybe<MarkdownRemarkFilterInput>
  childrenLocale: Maybe<LocaleFilterListInput>
  childLocale: Maybe<LocaleFilterInput>
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
}

export type FileSortInput = {
  fields: Maybe<Array<Maybe<FileFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export enum SortOrderEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type DirectoryConnection = {
  __typename?: 'DirectoryConnection'
  totalCount: Scalars['Int']
  edges: Array<DirectoryEdge>
  nodes: Array<Directory>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<DirectoryGroupConnection>
}

export type DirectoryConnectionDistinctArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryConnectionMaxArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryConnectionMinArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryConnectionSumArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: DirectoryFieldsEnum
}

export type DirectoryEdge = {
  __typename?: 'DirectoryEdge'
  next: Maybe<Directory>
  node: Directory
  previous: Maybe<Directory>
}

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
  internal___type = 'internal___type',
}

export type DirectoryGroupConnection = {
  __typename?: 'DirectoryGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<DirectoryEdge>
  nodes: Array<Directory>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<DirectoryGroupConnection>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
}

export type DirectoryGroupConnectionDistinctArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryGroupConnectionMaxArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryGroupConnectionMinArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryGroupConnectionSumArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: DirectoryFieldsEnum
}

export type DirectoryFilterInput = {
  sourceInstanceName: Maybe<StringQueryOperatorInput>
  absolutePath: Maybe<StringQueryOperatorInput>
  relativePath: Maybe<StringQueryOperatorInput>
  extension: Maybe<StringQueryOperatorInput>
  size: Maybe<IntQueryOperatorInput>
  prettySize: Maybe<StringQueryOperatorInput>
  modifiedTime: Maybe<DateQueryOperatorInput>
  accessTime: Maybe<DateQueryOperatorInput>
  changeTime: Maybe<DateQueryOperatorInput>
  birthTime: Maybe<DateQueryOperatorInput>
  root: Maybe<StringQueryOperatorInput>
  dir: Maybe<StringQueryOperatorInput>
  base: Maybe<StringQueryOperatorInput>
  ext: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  relativeDirectory: Maybe<StringQueryOperatorInput>
  dev: Maybe<IntQueryOperatorInput>
  mode: Maybe<IntQueryOperatorInput>
  nlink: Maybe<IntQueryOperatorInput>
  uid: Maybe<IntQueryOperatorInput>
  gid: Maybe<IntQueryOperatorInput>
  rdev: Maybe<IntQueryOperatorInput>
  ino: Maybe<FloatQueryOperatorInput>
  atimeMs: Maybe<FloatQueryOperatorInput>
  mtimeMs: Maybe<FloatQueryOperatorInput>
  ctimeMs: Maybe<FloatQueryOperatorInput>
  atime: Maybe<DateQueryOperatorInput>
  mtime: Maybe<DateQueryOperatorInput>
  ctime: Maybe<DateQueryOperatorInput>
  birthtime: Maybe<DateQueryOperatorInput>
  birthtimeMs: Maybe<FloatQueryOperatorInput>
  blksize: Maybe<IntQueryOperatorInput>
  blocks: Maybe<IntQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
}

export type DirectorySortInput = {
  fields: Maybe<Array<Maybe<DirectoryFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type SiteSiteMetadataFilterInput = {
  title: Maybe<StringQueryOperatorInput>
  description: Maybe<StringQueryOperatorInput>
}

export type SiteConnection = {
  __typename?: 'SiteConnection'
  totalCount: Scalars['Int']
  edges: Array<SiteEdge>
  nodes: Array<Site>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<SiteGroupConnection>
}

export type SiteConnectionDistinctArgs = {
  field: SiteFieldsEnum
}

export type SiteConnectionMaxArgs = {
  field: SiteFieldsEnum
}

export type SiteConnectionMinArgs = {
  field: SiteFieldsEnum
}

export type SiteConnectionSumArgs = {
  field: SiteFieldsEnum
}

export type SiteConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: SiteFieldsEnum
}

export type SiteEdge = {
  __typename?: 'SiteEdge'
  next: Maybe<Site>
  node: Site
  previous: Maybe<Site>
}

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
  internal___type = 'internal___type',
}

export type SiteGroupConnection = {
  __typename?: 'SiteGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<SiteEdge>
  nodes: Array<Site>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<SiteGroupConnection>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
}

export type SiteGroupConnectionDistinctArgs = {
  field: SiteFieldsEnum
}

export type SiteGroupConnectionMaxArgs = {
  field: SiteFieldsEnum
}

export type SiteGroupConnectionMinArgs = {
  field: SiteFieldsEnum
}

export type SiteGroupConnectionSumArgs = {
  field: SiteFieldsEnum
}

export type SiteGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: SiteFieldsEnum
}

export type SiteFilterInput = {
  buildTime: Maybe<DateQueryOperatorInput>
  siteMetadata: Maybe<SiteSiteMetadataFilterInput>
  port: Maybe<IntQueryOperatorInput>
  host: Maybe<StringQueryOperatorInput>
  polyfill: Maybe<BooleanQueryOperatorInput>
  pathPrefix: Maybe<StringQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
}

export type SiteSortInput = {
  fields: Maybe<Array<Maybe<SiteFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type SiteFunctionConnection = {
  __typename?: 'SiteFunctionConnection'
  totalCount: Scalars['Int']
  edges: Array<SiteFunctionEdge>
  nodes: Array<SiteFunction>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<SiteFunctionGroupConnection>
}

export type SiteFunctionConnectionDistinctArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionConnectionMaxArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionConnectionMinArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionConnectionSumArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionEdge = {
  __typename?: 'SiteFunctionEdge'
  next: Maybe<SiteFunction>
  node: SiteFunction
  previous: Maybe<SiteFunction>
}

export enum SiteFunctionFieldsEnum {
  functionRoute = 'functionRoute',
  pluginName = 'pluginName',
  originalAbsoluteFilePath = 'originalAbsoluteFilePath',
  originalRelativeFilePath = 'originalRelativeFilePath',
  relativeCompiledFilePath = 'relativeCompiledFilePath',
  absoluteCompiledFilePath = 'absoluteCompiledFilePath',
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
}

export type SiteFunctionGroupConnection = {
  __typename?: 'SiteFunctionGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<SiteFunctionEdge>
  nodes: Array<SiteFunction>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<SiteFunctionGroupConnection>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
}

export type SiteFunctionGroupConnectionDistinctArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionGroupConnectionMaxArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionGroupConnectionMinArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionGroupConnectionSumArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionFilterInput = {
  functionRoute: Maybe<StringQueryOperatorInput>
  pluginName: Maybe<StringQueryOperatorInput>
  originalAbsoluteFilePath: Maybe<StringQueryOperatorInput>
  originalRelativeFilePath: Maybe<StringQueryOperatorInput>
  relativeCompiledFilePath: Maybe<StringQueryOperatorInput>
  absoluteCompiledFilePath: Maybe<StringQueryOperatorInput>
  matchPath: Maybe<StringQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
}

export type SiteFunctionSortInput = {
  fields: Maybe<Array<Maybe<SiteFunctionFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type SitePageContextFilterInput = {
  id: Maybe<StringQueryOperatorInput>
  language: Maybe<StringQueryOperatorInput>
  i18n: Maybe<SitePageContextI18nFilterInput>
}

export type SitePageContextI18nFilterInput = {
  language: Maybe<StringQueryOperatorInput>
  languages: Maybe<StringQueryOperatorInput>
  defaultLanguage: Maybe<StringQueryOperatorInput>
  generateDefaultLanguagePage: Maybe<BooleanQueryOperatorInput>
  routed: Maybe<BooleanQueryOperatorInput>
  originalPath: Maybe<StringQueryOperatorInput>
  path: Maybe<StringQueryOperatorInput>
}

export type SitePluginFilterInput = {
  resolve: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  version: Maybe<StringQueryOperatorInput>
  nodeAPIs: Maybe<StringQueryOperatorInput>
  browserAPIs: Maybe<StringQueryOperatorInput>
  ssrAPIs: Maybe<StringQueryOperatorInput>
  pluginFilepath: Maybe<StringQueryOperatorInput>
  pluginOptions: Maybe<SitePluginPluginOptionsFilterInput>
  packageJson: Maybe<SitePluginPackageJsonFilterInput>
  subPluginPaths: Maybe<StringQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
}

export type SitePluginPluginOptionsFilterInput = {
  plugins: Maybe<SitePluginPluginOptionsPluginsFilterListInput>
  name: Maybe<StringQueryOperatorInput>
  path: Maybe<StringQueryOperatorInput>
  base64Width: Maybe<IntQueryOperatorInput>
  stripMetadata: Maybe<BooleanQueryOperatorInput>
  defaultQuality: Maybe<IntQueryOperatorInput>
  failOnError: Maybe<BooleanQueryOperatorInput>
  short_name: Maybe<StringQueryOperatorInput>
  start_url: Maybe<StringQueryOperatorInput>
  background_color: Maybe<StringQueryOperatorInput>
  theme_color: Maybe<StringQueryOperatorInput>
  icon: Maybe<StringQueryOperatorInput>
  legacy: Maybe<BooleanQueryOperatorInput>
  theme_color_in_head: Maybe<BooleanQueryOperatorInput>
  cache_busting_mode: Maybe<StringQueryOperatorInput>
  crossOrigin: Maybe<StringQueryOperatorInput>
  include_favicon: Maybe<BooleanQueryOperatorInput>
  cacheDigest: Maybe<StringQueryOperatorInput>
  displayName: Maybe<BooleanQueryOperatorInput>
  fileName: Maybe<BooleanQueryOperatorInput>
  minify: Maybe<BooleanQueryOperatorInput>
  namespace: Maybe<StringQueryOperatorInput>
  transpileTemplateLiterals: Maybe<BooleanQueryOperatorInput>
  pure: Maybe<BooleanQueryOperatorInput>
  disableVendorPrefixes: Maybe<BooleanQueryOperatorInput>
  isTSX: Maybe<BooleanQueryOperatorInput>
  jsxPragma: Maybe<StringQueryOperatorInput>
  allExtensions: Maybe<BooleanQueryOperatorInput>
  terminal: Maybe<StringQueryOperatorInput>
  theme: Maybe<StringQueryOperatorInput>
  localeJsonSourceName: Maybe<StringQueryOperatorInput>
  siteUrl: Maybe<StringQueryOperatorInput>
  languages: Maybe<StringQueryOperatorInput>
  defaultLanguage: Maybe<StringQueryOperatorInput>
  redirect: Maybe<BooleanQueryOperatorInput>
  pages: Maybe<SitePluginPluginOptionsPagesFilterListInput>
  id: Maybe<StringQueryOperatorInput>
  includeInDevelopment: Maybe<BooleanQueryOperatorInput>
  routeChangeEventName: Maybe<StringQueryOperatorInput>
  enableWebVitalsTracking: Maybe<BooleanQueryOperatorInput>
  selfHostedOrigin: Maybe<StringQueryOperatorInput>
  pathCheck: Maybe<BooleanQueryOperatorInput>
  airtableApiKey: Maybe<StringQueryOperatorInput>
  airtableBaseUrl: Maybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsPluginsFilterListInput = {
  elemMatch: Maybe<SitePluginPluginOptionsPluginsFilterInput>
}

export type SitePluginPluginOptionsPluginsFilterInput = {
  resolve: Maybe<StringQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  version: Maybe<StringQueryOperatorInput>
  pluginOptions: Maybe<SitePluginPluginOptionsPluginsPluginOptionsFilterInput>
  pluginFilepath: Maybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsPluginsPluginOptionsFilterInput = {
  terminal: Maybe<StringQueryOperatorInput>
  theme: Maybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsPagesFilterListInput = {
  elemMatch: Maybe<SitePluginPluginOptionsPagesFilterInput>
}

export type SitePluginPluginOptionsPagesFilterInput = {
  matchPath: Maybe<StringQueryOperatorInput>
  getLanguageFromPath: Maybe<BooleanQueryOperatorInput>
  languages: Maybe<StringQueryOperatorInput>
}

export type SitePluginPackageJsonFilterInput = {
  name: Maybe<StringQueryOperatorInput>
  description: Maybe<StringQueryOperatorInput>
  version: Maybe<StringQueryOperatorInput>
  main: Maybe<StringQueryOperatorInput>
  author: Maybe<StringQueryOperatorInput>
  license: Maybe<StringQueryOperatorInput>
  dependencies: Maybe<SitePluginPackageJsonDependenciesFilterListInput>
  devDependencies: Maybe<SitePluginPackageJsonDevDependenciesFilterListInput>
  peerDependencies: Maybe<SitePluginPackageJsonPeerDependenciesFilterListInput>
  keywords: Maybe<StringQueryOperatorInput>
}

export type SitePluginPackageJsonDependenciesFilterListInput = {
  elemMatch: Maybe<SitePluginPackageJsonDependenciesFilterInput>
}

export type SitePluginPackageJsonDependenciesFilterInput = {
  name: Maybe<StringQueryOperatorInput>
  version: Maybe<StringQueryOperatorInput>
}

export type SitePluginPackageJsonDevDependenciesFilterListInput = {
  elemMatch: Maybe<SitePluginPackageJsonDevDependenciesFilterInput>
}

export type SitePluginPackageJsonDevDependenciesFilterInput = {
  name: Maybe<StringQueryOperatorInput>
  version: Maybe<StringQueryOperatorInput>
}

export type SitePluginPackageJsonPeerDependenciesFilterListInput = {
  elemMatch: Maybe<SitePluginPackageJsonPeerDependenciesFilterInput>
}

export type SitePluginPackageJsonPeerDependenciesFilterInput = {
  name: Maybe<StringQueryOperatorInput>
  version: Maybe<StringQueryOperatorInput>
}

export type SitePageConnection = {
  __typename?: 'SitePageConnection'
  totalCount: Scalars['Int']
  edges: Array<SitePageEdge>
  nodes: Array<SitePage>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<SitePageGroupConnection>
}

export type SitePageConnectionDistinctArgs = {
  field: SitePageFieldsEnum
}

export type SitePageConnectionMaxArgs = {
  field: SitePageFieldsEnum
}

export type SitePageConnectionMinArgs = {
  field: SitePageFieldsEnum
}

export type SitePageConnectionSumArgs = {
  field: SitePageFieldsEnum
}

export type SitePageConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: SitePageFieldsEnum
}

export type SitePageEdge = {
  __typename?: 'SitePageEdge'
  next: Maybe<SitePage>
  node: SitePage
  previous: Maybe<SitePage>
}

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
  context___i18n___generateDefaultLanguagePage = 'context___i18n___generateDefaultLanguagePage',
  context___i18n___routed = 'context___i18n___routed',
  context___i18n___originalPath = 'context___i18n___originalPath',
  context___i18n___path = 'context___i18n___path',
  pluginCreator___resolve = 'pluginCreator___resolve',
  pluginCreator___name = 'pluginCreator___name',
  pluginCreator___version = 'pluginCreator___version',
  pluginCreator___nodeAPIs = 'pluginCreator___nodeAPIs',
  pluginCreator___browserAPIs = 'pluginCreator___browserAPIs',
  pluginCreator___ssrAPIs = 'pluginCreator___ssrAPIs',
  pluginCreator___pluginFilepath = 'pluginCreator___pluginFilepath',
  pluginCreator___pluginOptions___plugins = 'pluginCreator___pluginOptions___plugins',
  pluginCreator___pluginOptions___plugins___resolve = 'pluginCreator___pluginOptions___plugins___resolve',
  pluginCreator___pluginOptions___plugins___id = 'pluginCreator___pluginOptions___plugins___id',
  pluginCreator___pluginOptions___plugins___name = 'pluginCreator___pluginOptions___plugins___name',
  pluginCreator___pluginOptions___plugins___version = 'pluginCreator___pluginOptions___plugins___version',
  pluginCreator___pluginOptions___plugins___pluginFilepath = 'pluginCreator___pluginOptions___plugins___pluginFilepath',
  pluginCreator___pluginOptions___name = 'pluginCreator___pluginOptions___name',
  pluginCreator___pluginOptions___path = 'pluginCreator___pluginOptions___path',
  pluginCreator___pluginOptions___base64Width = 'pluginCreator___pluginOptions___base64Width',
  pluginCreator___pluginOptions___stripMetadata = 'pluginCreator___pluginOptions___stripMetadata',
  pluginCreator___pluginOptions___defaultQuality = 'pluginCreator___pluginOptions___defaultQuality',
  pluginCreator___pluginOptions___failOnError = 'pluginCreator___pluginOptions___failOnError',
  pluginCreator___pluginOptions___short_name = 'pluginCreator___pluginOptions___short_name',
  pluginCreator___pluginOptions___start_url = 'pluginCreator___pluginOptions___start_url',
  pluginCreator___pluginOptions___background_color = 'pluginCreator___pluginOptions___background_color',
  pluginCreator___pluginOptions___theme_color = 'pluginCreator___pluginOptions___theme_color',
  pluginCreator___pluginOptions___icon = 'pluginCreator___pluginOptions___icon',
  pluginCreator___pluginOptions___legacy = 'pluginCreator___pluginOptions___legacy',
  pluginCreator___pluginOptions___theme_color_in_head = 'pluginCreator___pluginOptions___theme_color_in_head',
  pluginCreator___pluginOptions___cache_busting_mode = 'pluginCreator___pluginOptions___cache_busting_mode',
  pluginCreator___pluginOptions___crossOrigin = 'pluginCreator___pluginOptions___crossOrigin',
  pluginCreator___pluginOptions___include_favicon = 'pluginCreator___pluginOptions___include_favicon',
  pluginCreator___pluginOptions___cacheDigest = 'pluginCreator___pluginOptions___cacheDigest',
  pluginCreator___pluginOptions___displayName = 'pluginCreator___pluginOptions___displayName',
  pluginCreator___pluginOptions___fileName = 'pluginCreator___pluginOptions___fileName',
  pluginCreator___pluginOptions___minify = 'pluginCreator___pluginOptions___minify',
  pluginCreator___pluginOptions___namespace = 'pluginCreator___pluginOptions___namespace',
  pluginCreator___pluginOptions___transpileTemplateLiterals = 'pluginCreator___pluginOptions___transpileTemplateLiterals',
  pluginCreator___pluginOptions___pure = 'pluginCreator___pluginOptions___pure',
  pluginCreator___pluginOptions___disableVendorPrefixes = 'pluginCreator___pluginOptions___disableVendorPrefixes',
  pluginCreator___pluginOptions___isTSX = 'pluginCreator___pluginOptions___isTSX',
  pluginCreator___pluginOptions___jsxPragma = 'pluginCreator___pluginOptions___jsxPragma',
  pluginCreator___pluginOptions___allExtensions = 'pluginCreator___pluginOptions___allExtensions',
  pluginCreator___pluginOptions___terminal = 'pluginCreator___pluginOptions___terminal',
  pluginCreator___pluginOptions___theme = 'pluginCreator___pluginOptions___theme',
  pluginCreator___pluginOptions___localeJsonSourceName = 'pluginCreator___pluginOptions___localeJsonSourceName',
  pluginCreator___pluginOptions___siteUrl = 'pluginCreator___pluginOptions___siteUrl',
  pluginCreator___pluginOptions___languages = 'pluginCreator___pluginOptions___languages',
  pluginCreator___pluginOptions___defaultLanguage = 'pluginCreator___pluginOptions___defaultLanguage',
  pluginCreator___pluginOptions___redirect = 'pluginCreator___pluginOptions___redirect',
  pluginCreator___pluginOptions___pages = 'pluginCreator___pluginOptions___pages',
  pluginCreator___pluginOptions___pages___matchPath = 'pluginCreator___pluginOptions___pages___matchPath',
  pluginCreator___pluginOptions___pages___getLanguageFromPath = 'pluginCreator___pluginOptions___pages___getLanguageFromPath',
  pluginCreator___pluginOptions___pages___languages = 'pluginCreator___pluginOptions___pages___languages',
  pluginCreator___pluginOptions___id = 'pluginCreator___pluginOptions___id',
  pluginCreator___pluginOptions___includeInDevelopment = 'pluginCreator___pluginOptions___includeInDevelopment',
  pluginCreator___pluginOptions___routeChangeEventName = 'pluginCreator___pluginOptions___routeChangeEventName',
  pluginCreator___pluginOptions___enableWebVitalsTracking = 'pluginCreator___pluginOptions___enableWebVitalsTracking',
  pluginCreator___pluginOptions___selfHostedOrigin = 'pluginCreator___pluginOptions___selfHostedOrigin',
  pluginCreator___pluginOptions___pathCheck = 'pluginCreator___pluginOptions___pathCheck',
  pluginCreator___pluginOptions___airtableApiKey = 'pluginCreator___pluginOptions___airtableApiKey',
  pluginCreator___pluginOptions___airtableBaseUrl = 'pluginCreator___pluginOptions___airtableBaseUrl',
  pluginCreator___packageJson___name = 'pluginCreator___packageJson___name',
  pluginCreator___packageJson___description = 'pluginCreator___packageJson___description',
  pluginCreator___packageJson___version = 'pluginCreator___packageJson___version',
  pluginCreator___packageJson___main = 'pluginCreator___packageJson___main',
  pluginCreator___packageJson___author = 'pluginCreator___packageJson___author',
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
  pluginCreator___subPluginPaths = 'pluginCreator___subPluginPaths',
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
  pluginCreatorId = 'pluginCreatorId',
}

export type SitePageGroupConnection = {
  __typename?: 'SitePageGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<SitePageEdge>
  nodes: Array<SitePage>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<SitePageGroupConnection>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
}

export type SitePageGroupConnectionDistinctArgs = {
  field: SitePageFieldsEnum
}

export type SitePageGroupConnectionMaxArgs = {
  field: SitePageFieldsEnum
}

export type SitePageGroupConnectionMinArgs = {
  field: SitePageFieldsEnum
}

export type SitePageGroupConnectionSumArgs = {
  field: SitePageFieldsEnum
}

export type SitePageGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: SitePageFieldsEnum
}

export type SitePageFilterInput = {
  path: Maybe<StringQueryOperatorInput>
  component: Maybe<StringQueryOperatorInput>
  internalComponentName: Maybe<StringQueryOperatorInput>
  componentChunkName: Maybe<StringQueryOperatorInput>
  matchPath: Maybe<StringQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
  isCreatedByStatefulCreatePages: Maybe<BooleanQueryOperatorInput>
  context: Maybe<SitePageContextFilterInput>
  pluginCreator: Maybe<SitePluginFilterInput>
  pluginCreatorId: Maybe<StringQueryOperatorInput>
}

export type SitePageSortInput = {
  fields: Maybe<Array<Maybe<SitePageFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type SitePluginConnection = {
  __typename?: 'SitePluginConnection'
  totalCount: Scalars['Int']
  edges: Array<SitePluginEdge>
  nodes: Array<SitePlugin>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<SitePluginGroupConnection>
}

export type SitePluginConnectionDistinctArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginConnectionMaxArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginConnectionMinArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginConnectionSumArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: SitePluginFieldsEnum
}

export type SitePluginEdge = {
  __typename?: 'SitePluginEdge'
  next: Maybe<SitePlugin>
  node: SitePlugin
  previous: Maybe<SitePlugin>
}

export enum SitePluginFieldsEnum {
  resolve = 'resolve',
  name = 'name',
  version = 'version',
  nodeAPIs = 'nodeAPIs',
  browserAPIs = 'browserAPIs',
  ssrAPIs = 'ssrAPIs',
  pluginFilepath = 'pluginFilepath',
  pluginOptions___plugins = 'pluginOptions___plugins',
  pluginOptions___plugins___resolve = 'pluginOptions___plugins___resolve',
  pluginOptions___plugins___id = 'pluginOptions___plugins___id',
  pluginOptions___plugins___name = 'pluginOptions___plugins___name',
  pluginOptions___plugins___version = 'pluginOptions___plugins___version',
  pluginOptions___plugins___pluginOptions___terminal = 'pluginOptions___plugins___pluginOptions___terminal',
  pluginOptions___plugins___pluginOptions___theme = 'pluginOptions___plugins___pluginOptions___theme',
  pluginOptions___plugins___pluginFilepath = 'pluginOptions___plugins___pluginFilepath',
  pluginOptions___name = 'pluginOptions___name',
  pluginOptions___path = 'pluginOptions___path',
  pluginOptions___base64Width = 'pluginOptions___base64Width',
  pluginOptions___stripMetadata = 'pluginOptions___stripMetadata',
  pluginOptions___defaultQuality = 'pluginOptions___defaultQuality',
  pluginOptions___failOnError = 'pluginOptions___failOnError',
  pluginOptions___short_name = 'pluginOptions___short_name',
  pluginOptions___start_url = 'pluginOptions___start_url',
  pluginOptions___background_color = 'pluginOptions___background_color',
  pluginOptions___theme_color = 'pluginOptions___theme_color',
  pluginOptions___icon = 'pluginOptions___icon',
  pluginOptions___legacy = 'pluginOptions___legacy',
  pluginOptions___theme_color_in_head = 'pluginOptions___theme_color_in_head',
  pluginOptions___cache_busting_mode = 'pluginOptions___cache_busting_mode',
  pluginOptions___crossOrigin = 'pluginOptions___crossOrigin',
  pluginOptions___include_favicon = 'pluginOptions___include_favicon',
  pluginOptions___cacheDigest = 'pluginOptions___cacheDigest',
  pluginOptions___displayName = 'pluginOptions___displayName',
  pluginOptions___fileName = 'pluginOptions___fileName',
  pluginOptions___minify = 'pluginOptions___minify',
  pluginOptions___namespace = 'pluginOptions___namespace',
  pluginOptions___transpileTemplateLiterals = 'pluginOptions___transpileTemplateLiterals',
  pluginOptions___pure = 'pluginOptions___pure',
  pluginOptions___disableVendorPrefixes = 'pluginOptions___disableVendorPrefixes',
  pluginOptions___isTSX = 'pluginOptions___isTSX',
  pluginOptions___jsxPragma = 'pluginOptions___jsxPragma',
  pluginOptions___allExtensions = 'pluginOptions___allExtensions',
  pluginOptions___terminal = 'pluginOptions___terminal',
  pluginOptions___theme = 'pluginOptions___theme',
  pluginOptions___localeJsonSourceName = 'pluginOptions___localeJsonSourceName',
  pluginOptions___siteUrl = 'pluginOptions___siteUrl',
  pluginOptions___languages = 'pluginOptions___languages',
  pluginOptions___defaultLanguage = 'pluginOptions___defaultLanguage',
  pluginOptions___redirect = 'pluginOptions___redirect',
  pluginOptions___pages = 'pluginOptions___pages',
  pluginOptions___pages___matchPath = 'pluginOptions___pages___matchPath',
  pluginOptions___pages___getLanguageFromPath = 'pluginOptions___pages___getLanguageFromPath',
  pluginOptions___pages___languages = 'pluginOptions___pages___languages',
  pluginOptions___id = 'pluginOptions___id',
  pluginOptions___includeInDevelopment = 'pluginOptions___includeInDevelopment',
  pluginOptions___routeChangeEventName = 'pluginOptions___routeChangeEventName',
  pluginOptions___enableWebVitalsTracking = 'pluginOptions___enableWebVitalsTracking',
  pluginOptions___selfHostedOrigin = 'pluginOptions___selfHostedOrigin',
  pluginOptions___pathCheck = 'pluginOptions___pathCheck',
  pluginOptions___airtableApiKey = 'pluginOptions___airtableApiKey',
  pluginOptions___airtableBaseUrl = 'pluginOptions___airtableBaseUrl',
  packageJson___name = 'packageJson___name',
  packageJson___description = 'packageJson___description',
  packageJson___version = 'packageJson___version',
  packageJson___main = 'packageJson___main',
  packageJson___author = 'packageJson___author',
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
  packageJson___keywords = 'packageJson___keywords',
  subPluginPaths = 'subPluginPaths',
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
}

export type SitePluginGroupConnection = {
  __typename?: 'SitePluginGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<SitePluginEdge>
  nodes: Array<SitePlugin>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<SitePluginGroupConnection>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
}

export type SitePluginGroupConnectionDistinctArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginGroupConnectionMaxArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginGroupConnectionMinArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginGroupConnectionSumArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: SitePluginFieldsEnum
}

export type SitePluginSortInput = {
  fields: Maybe<Array<Maybe<SitePluginFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type SiteBuildMetadataConnection = {
  __typename?: 'SiteBuildMetadataConnection'
  totalCount: Scalars['Int']
  edges: Array<SiteBuildMetadataEdge>
  nodes: Array<SiteBuildMetadata>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<SiteBuildMetadataGroupConnection>
}

export type SiteBuildMetadataConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataConnectionMaxArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataConnectionMinArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataConnectionSumArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataEdge = {
  __typename?: 'SiteBuildMetadataEdge'
  next: Maybe<SiteBuildMetadata>
  node: SiteBuildMetadata
  previous: Maybe<SiteBuildMetadata>
}

export enum SiteBuildMetadataFieldsEnum {
  buildTime = 'buildTime',
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
}

export type SiteBuildMetadataGroupConnection = {
  __typename?: 'SiteBuildMetadataGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<SiteBuildMetadataEdge>
  nodes: Array<SiteBuildMetadata>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<SiteBuildMetadataGroupConnection>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
}

export type SiteBuildMetadataGroupConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataGroupConnectionMaxArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataGroupConnectionMinArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataGroupConnectionSumArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataFilterInput = {
  buildTime: Maybe<DateQueryOperatorInput>
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
}

export type SiteBuildMetadataSortInput = {
  fields: Maybe<Array<Maybe<SiteBuildMetadataFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type ImageSharpConnection = {
  __typename?: 'ImageSharpConnection'
  totalCount: Scalars['Int']
  edges: Array<ImageSharpEdge>
  nodes: Array<ImageSharp>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<ImageSharpGroupConnection>
}

export type ImageSharpConnectionDistinctArgs = {
  field: ImageSharpFieldsEnum
}

export type ImageSharpConnectionMaxArgs = {
  field: ImageSharpFieldsEnum
}

export type ImageSharpConnectionMinArgs = {
  field: ImageSharpFieldsEnum
}

export type ImageSharpConnectionSumArgs = {
  field: ImageSharpFieldsEnum
}

export type ImageSharpConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: ImageSharpFieldsEnum
}

export type ImageSharpEdge = {
  __typename?: 'ImageSharpEdge'
  next: Maybe<ImageSharp>
  node: ImageSharp
  previous: Maybe<ImageSharp>
}

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
  gatsbyImageData = 'gatsbyImageData',
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
  internal___type = 'internal___type',
}

export type ImageSharpGroupConnection = {
  __typename?: 'ImageSharpGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<ImageSharpEdge>
  nodes: Array<ImageSharp>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<ImageSharpGroupConnection>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
}

export type ImageSharpGroupConnectionDistinctArgs = {
  field: ImageSharpFieldsEnum
}

export type ImageSharpGroupConnectionMaxArgs = {
  field: ImageSharpFieldsEnum
}

export type ImageSharpGroupConnectionMinArgs = {
  field: ImageSharpFieldsEnum
}

export type ImageSharpGroupConnectionSumArgs = {
  field: ImageSharpFieldsEnum
}

export type ImageSharpGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: ImageSharpFieldsEnum
}

export type ImageSharpSortInput = {
  fields: Maybe<Array<Maybe<ImageSharpFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type MarkdownRemarkConnection = {
  __typename?: 'MarkdownRemarkConnection'
  totalCount: Scalars['Int']
  edges: Array<MarkdownRemarkEdge>
  nodes: Array<MarkdownRemark>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<MarkdownRemarkGroupConnection>
}

export type MarkdownRemarkConnectionDistinctArgs = {
  field: MarkdownRemarkFieldsEnum
}

export type MarkdownRemarkConnectionMaxArgs = {
  field: MarkdownRemarkFieldsEnum
}

export type MarkdownRemarkConnectionMinArgs = {
  field: MarkdownRemarkFieldsEnum
}

export type MarkdownRemarkConnectionSumArgs = {
  field: MarkdownRemarkFieldsEnum
}

export type MarkdownRemarkConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: MarkdownRemarkFieldsEnum
}

export type MarkdownRemarkEdge = {
  __typename?: 'MarkdownRemarkEdge'
  next: Maybe<MarkdownRemark>
  node: MarkdownRemark
  previous: Maybe<MarkdownRemark>
}

export enum MarkdownRemarkFieldsEnum {
  id = 'id',
  frontmatter___title = 'frontmatter___title',
  frontmatter___cover = 'frontmatter___cover',
  frontmatter___date = 'frontmatter___date',
  frontmatter___slug = 'frontmatter___slug',
  frontmatter___description = 'frontmatter___description',
  frontmatter___videoUrl = 'frontmatter___videoUrl',
  frontmatter___tags = 'frontmatter___tags',
  frontmatter___tableOfContent = 'frontmatter___tableOfContent',
  frontmatter___tableOfContent___title = 'frontmatter___tableOfContent___title',
  frontmatter___tableOfContent___time = 'frontmatter___tableOfContent___time',
  frontmatter___tableOfContent___start = 'frontmatter___tableOfContent___start',
  frontmatter___sources = 'frontmatter___sources',
  frontmatter___sources___type = 'frontmatter___sources___type',
  frontmatter___sources___title = 'frontmatter___sources___title',
  frontmatter___sources___url = 'frontmatter___sources___url',
  frontmatter___credits = 'frontmatter___credits',
  frontmatter___credits___title = 'frontmatter___credits___title',
  frontmatter___credits___name = 'frontmatter___credits___name',
  excerpt = 'excerpt',
  rawMarkdownBody = 'rawMarkdownBody',
  fileAbsolutePath = 'fileAbsolutePath',
  html = 'html',
  htmlAst = 'htmlAst',
  excerptAst = 'excerptAst',
  headings = 'headings',
  headings___id = 'headings___id',
  headings___value = 'headings___value',
  headings___depth = 'headings___depth',
  timeToRead = 'timeToRead',
  tableOfContents = 'tableOfContents',
  wordCount___paragraphs = 'wordCount___paragraphs',
  wordCount___sentences = 'wordCount___sentences',
  wordCount___words = 'wordCount___words',
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
}

export type MarkdownRemarkGroupConnection = {
  __typename?: 'MarkdownRemarkGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<MarkdownRemarkEdge>
  nodes: Array<MarkdownRemark>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<MarkdownRemarkGroupConnection>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
}

export type MarkdownRemarkGroupConnectionDistinctArgs = {
  field: MarkdownRemarkFieldsEnum
}

export type MarkdownRemarkGroupConnectionMaxArgs = {
  field: MarkdownRemarkFieldsEnum
}

export type MarkdownRemarkGroupConnectionMinArgs = {
  field: MarkdownRemarkFieldsEnum
}

export type MarkdownRemarkGroupConnectionSumArgs = {
  field: MarkdownRemarkFieldsEnum
}

export type MarkdownRemarkGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: MarkdownRemarkFieldsEnum
}

export type MarkdownRemarkSortInput = {
  fields: Maybe<Array<Maybe<MarkdownRemarkFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type VolunteerConnection = {
  __typename?: 'VolunteerConnection'
  totalCount: Scalars['Int']
  edges: Array<VolunteerEdge>
  nodes: Array<Volunteer>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<VolunteerGroupConnection>
}

export type VolunteerConnectionDistinctArgs = {
  field: VolunteerFieldsEnum
}

export type VolunteerConnectionMaxArgs = {
  field: VolunteerFieldsEnum
}

export type VolunteerConnectionMinArgs = {
  field: VolunteerFieldsEnum
}

export type VolunteerConnectionSumArgs = {
  field: VolunteerFieldsEnum
}

export type VolunteerConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: VolunteerFieldsEnum
}

export type VolunteerEdge = {
  __typename?: 'VolunteerEdge'
  next: Maybe<Volunteer>
  node: Volunteer
  previous: Maybe<Volunteer>
}

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
  ID = 'ID',
  Owned_Events = 'Owned_Events',
  Opportunities = 'Opportunities',
  company = 'company',
}

export type VolunteerGroupConnection = {
  __typename?: 'VolunteerGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<VolunteerEdge>
  nodes: Array<Volunteer>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<VolunteerGroupConnection>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
}

export type VolunteerGroupConnectionDistinctArgs = {
  field: VolunteerFieldsEnum
}

export type VolunteerGroupConnectionMaxArgs = {
  field: VolunteerFieldsEnum
}

export type VolunteerGroupConnectionMinArgs = {
  field: VolunteerFieldsEnum
}

export type VolunteerGroupConnectionSumArgs = {
  field: VolunteerFieldsEnum
}

export type VolunteerGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: VolunteerFieldsEnum
}

export type VolunteerFilterInput = {
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
  rowId: Maybe<StringQueryOperatorInput>
  email: Maybe<StringQueryOperatorInput>
  profilePictureUrl: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  Projects: Maybe<StringQueryOperatorInput>
  ID: Maybe<StringQueryOperatorInput>
  Owned_Events: Maybe<StringQueryOperatorInput>
  Opportunities: Maybe<StringQueryOperatorInput>
  company: Maybe<StringQueryOperatorInput>
}

export type VolunteerSortInput = {
  fields: Maybe<Array<Maybe<VolunteerFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type TagConnection = {
  __typename?: 'TagConnection'
  totalCount: Scalars['Int']
  edges: Array<TagEdge>
  nodes: Array<Tag>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<TagGroupConnection>
}

export type TagConnectionDistinctArgs = {
  field: TagFieldsEnum
}

export type TagConnectionMaxArgs = {
  field: TagFieldsEnum
}

export type TagConnectionMinArgs = {
  field: TagFieldsEnum
}

export type TagConnectionSumArgs = {
  field: TagFieldsEnum
}

export type TagConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: TagFieldsEnum
}

export type TagEdge = {
  __typename?: 'TagEdge'
  next: Maybe<Tag>
  node: Tag
  previous: Maybe<Tag>
}

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
}

export type TagGroupConnection = {
  __typename?: 'TagGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<TagEdge>
  nodes: Array<Tag>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<TagGroupConnection>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
}

export type TagGroupConnectionDistinctArgs = {
  field: TagFieldsEnum
}

export type TagGroupConnectionMaxArgs = {
  field: TagFieldsEnum
}

export type TagGroupConnectionMinArgs = {
  field: TagFieldsEnum
}

export type TagGroupConnectionSumArgs = {
  field: TagFieldsEnum
}

export type TagGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: TagFieldsEnum
}

export type TagFilterInput = {
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
  rowId: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  slug: Maybe<StringQueryOperatorInput>
}

export type TagSortInput = {
  fields: Maybe<Array<Maybe<TagFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type TagFilterListInput = {
  elemMatch: Maybe<TagFilterInput>
}

export type VolunteerFilterListInput = {
  elemMatch: Maybe<VolunteerFilterInput>
}

export type ProjectConnection = {
  __typename?: 'ProjectConnection'
  totalCount: Scalars['Int']
  edges: Array<ProjectEdge>
  nodes: Array<Project>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<ProjectGroupConnection>
}

export type ProjectConnectionDistinctArgs = {
  field: ProjectFieldsEnum
}

export type ProjectConnectionMaxArgs = {
  field: ProjectFieldsEnum
}

export type ProjectConnectionMinArgs = {
  field: ProjectFieldsEnum
}

export type ProjectConnectionSumArgs = {
  field: ProjectFieldsEnum
}

export type ProjectConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: ProjectFieldsEnum
}

export type ProjectEdge = {
  __typename?: 'ProjectEdge'
  next: Maybe<Project>
  node: Project
  previous: Maybe<Project>
}

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
  silent = 'silent',
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
  coordinators___ID = 'coordinators___ID',
  coordinators___Owned_Events = 'coordinators___Owned_Events',
  coordinators___Opportunities = 'coordinators___Opportunities',
  coordinators___company = 'coordinators___company',
}

export type ProjectGroupConnection = {
  __typename?: 'ProjectGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<ProjectEdge>
  nodes: Array<Project>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<ProjectGroupConnection>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
}

export type ProjectGroupConnectionDistinctArgs = {
  field: ProjectFieldsEnum
}

export type ProjectGroupConnectionMaxArgs = {
  field: ProjectFieldsEnum
}

export type ProjectGroupConnectionMinArgs = {
  field: ProjectFieldsEnum
}

export type ProjectGroupConnectionSumArgs = {
  field: ProjectFieldsEnum
}

export type ProjectGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: ProjectFieldsEnum
}

export type ProjectFilterInput = {
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
  highlighted: Maybe<BooleanQueryOperatorInput>
  finished: Maybe<BooleanQueryOperatorInput>
  silent: Maybe<BooleanQueryOperatorInput>
  coverUrl: Maybe<StringQueryOperatorInput>
  logoUrl: Maybe<StringQueryOperatorInput>
  trelloUrl: Maybe<StringQueryOperatorInput>
  githubUrl: Maybe<StringQueryOperatorInput>
  slackChannelUrl: Maybe<StringQueryOperatorInput>
  slackChannelName: Maybe<StringQueryOperatorInput>
  url: Maybe<StringQueryOperatorInput>
  rowId: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  tagline: Maybe<StringQueryOperatorInput>
  slug: Maybe<StringQueryOperatorInput>
  description: Maybe<StringQueryOperatorInput>
  contributeText: Maybe<StringQueryOperatorInput>
  tags: Maybe<TagFilterListInput>
  coordinators: Maybe<VolunteerFilterListInput>
}

export type ProjectSortInput = {
  fields: Maybe<Array<Maybe<ProjectFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type PartnerConnection = {
  __typename?: 'PartnerConnection'
  totalCount: Scalars['Int']
  edges: Array<PartnerEdge>
  nodes: Array<Partner>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<PartnerGroupConnection>
}

export type PartnerConnectionDistinctArgs = {
  field: PartnerFieldsEnum
}

export type PartnerConnectionMaxArgs = {
  field: PartnerFieldsEnum
}

export type PartnerConnectionMinArgs = {
  field: PartnerFieldsEnum
}

export type PartnerConnectionSumArgs = {
  field: PartnerFieldsEnum
}

export type PartnerConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: PartnerFieldsEnum
}

export type PartnerEdge = {
  __typename?: 'PartnerEdge'
  next: Maybe<Partner>
  node: Partner
  previous: Maybe<Partner>
}

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
  url = 'url',
  category = 'category',
}

export type PartnerGroupConnection = {
  __typename?: 'PartnerGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<PartnerEdge>
  nodes: Array<Partner>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<PartnerGroupConnection>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
}

export type PartnerGroupConnectionDistinctArgs = {
  field: PartnerFieldsEnum
}

export type PartnerGroupConnectionMaxArgs = {
  field: PartnerFieldsEnum
}

export type PartnerGroupConnectionMinArgs = {
  field: PartnerFieldsEnum
}

export type PartnerGroupConnectionSumArgs = {
  field: PartnerFieldsEnum
}

export type PartnerGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: PartnerFieldsEnum
}

export type PartnerFilterInput = {
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
  rowId: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  logoUrl: Maybe<StringQueryOperatorInput>
  url: Maybe<StringQueryOperatorInput>
  category: Maybe<StringQueryOperatorInput>
}

export type PartnerSortInput = {
  fields: Maybe<Array<Maybe<PartnerFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type OpportunityConnection = {
  __typename?: 'OpportunityConnection'
  totalCount: Scalars['Int']
  edges: Array<OpportunityEdge>
  nodes: Array<Opportunity>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<OpportunityGroupConnection>
}

export type OpportunityConnectionDistinctArgs = {
  field: OpportunityFieldsEnum
}

export type OpportunityConnectionMaxArgs = {
  field: OpportunityFieldsEnum
}

export type OpportunityConnectionMinArgs = {
  field: OpportunityFieldsEnum
}

export type OpportunityConnectionSumArgs = {
  field: OpportunityFieldsEnum
}

export type OpportunityConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: OpportunityFieldsEnum
}

export type OpportunityEdge = {
  __typename?: 'OpportunityEdge'
  next: Maybe<Opportunity>
  node: Opportunity
  previous: Maybe<Opportunity>
}

export enum OpportunityFieldsEnum {
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
  slug = 'slug',
  name = 'name',
  coverUrl = 'coverUrl',
  summary = 'summary',
  timeRequirements = 'timeRequirements',
  skills = 'skills',
  starred = 'starred',
  juniorFriendly = 'juniorFriendly',
  contactUrl = 'contactUrl',
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
  owner___ID = 'owner___ID',
  owner___Owned_Events = 'owner___Owned_Events',
  owner___Opportunities = 'owner___Opportunities',
  owner___company = 'owner___company',
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
  project___silent = 'project___silent',
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
  project___coordinators___ID = 'project___coordinators___ID',
  project___coordinators___Owned_Events = 'project___coordinators___Owned_Events',
  project___coordinators___Opportunities = 'project___coordinators___Opportunities',
  project___coordinators___company = 'project___coordinators___company',
}

export type OpportunityGroupConnection = {
  __typename?: 'OpportunityGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<OpportunityEdge>
  nodes: Array<Opportunity>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<OpportunityGroupConnection>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
}

export type OpportunityGroupConnectionDistinctArgs = {
  field: OpportunityFieldsEnum
}

export type OpportunityGroupConnectionMaxArgs = {
  field: OpportunityFieldsEnum
}

export type OpportunityGroupConnectionMinArgs = {
  field: OpportunityFieldsEnum
}

export type OpportunityGroupConnectionSumArgs = {
  field: OpportunityFieldsEnum
}

export type OpportunityGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: OpportunityFieldsEnum
}

export type OpportunityFilterInput = {
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
  rowId: Maybe<StringQueryOperatorInput>
  slug: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  coverUrl: Maybe<StringQueryOperatorInput>
  summary: Maybe<StringQueryOperatorInput>
  timeRequirements: Maybe<StringQueryOperatorInput>
  skills: Maybe<StringQueryOperatorInput>
  starred: Maybe<BooleanQueryOperatorInput>
  juniorFriendly: Maybe<BooleanQueryOperatorInput>
  contactUrl: Maybe<StringQueryOperatorInput>
  status: Maybe<StringQueryOperatorInput>
  owner: Maybe<VolunteerFilterInput>
  project: Maybe<ProjectFilterInput>
}

export type OpportunitySortInput = {
  fields: Maybe<Array<Maybe<OpportunityFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type LocaleConnection = {
  __typename?: 'LocaleConnection'
  totalCount: Scalars['Int']
  edges: Array<LocaleEdge>
  nodes: Array<Locale>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<LocaleGroupConnection>
}

export type LocaleConnectionDistinctArgs = {
  field: LocaleFieldsEnum
}

export type LocaleConnectionMaxArgs = {
  field: LocaleFieldsEnum
}

export type LocaleConnectionMinArgs = {
  field: LocaleFieldsEnum
}

export type LocaleConnectionSumArgs = {
  field: LocaleFieldsEnum
}

export type LocaleConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: LocaleFieldsEnum
}

export type LocaleEdge = {
  __typename?: 'LocaleEdge'
  next: Maybe<Locale>
  node: Locale
  previous: Maybe<Locale>
}

export enum LocaleFieldsEnum {
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
  language = 'language',
  ns = 'ns',
  data = 'data',
  fileAbsolutePath = 'fileAbsolutePath',
}

export type LocaleGroupConnection = {
  __typename?: 'LocaleGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<LocaleEdge>
  nodes: Array<Locale>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<LocaleGroupConnection>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
}

export type LocaleGroupConnectionDistinctArgs = {
  field: LocaleFieldsEnum
}

export type LocaleGroupConnectionMaxArgs = {
  field: LocaleFieldsEnum
}

export type LocaleGroupConnectionMinArgs = {
  field: LocaleFieldsEnum
}

export type LocaleGroupConnectionSumArgs = {
  field: LocaleFieldsEnum
}

export type LocaleGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: LocaleFieldsEnum
}

export type LocaleSortInput = {
  fields: Maybe<Array<Maybe<LocaleFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type EventConnection = {
  __typename?: 'EventConnection'
  totalCount: Scalars['Int']
  edges: Array<EventEdge>
  nodes: Array<Event>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<EventGroupConnection>
}

export type EventConnectionDistinctArgs = {
  field: EventFieldsEnum
}

export type EventConnectionMaxArgs = {
  field: EventFieldsEnum
}

export type EventConnectionMinArgs = {
  field: EventFieldsEnum
}

export type EventConnectionSumArgs = {
  field: EventFieldsEnum
}

export type EventConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: EventFieldsEnum
}

export type EventEdge = {
  __typename?: 'EventEdge'
  next: Maybe<Event>
  node: Event
  previous: Maybe<Event>
}

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
  competenceMap = 'competenceMap',
  startTime = 'startTime',
  endTime = 'endTime',
  status = 'status',
  slug = 'slug',
  rsvpUrl = 'rsvpUrl',
  rsvpTitle = 'rsvpTitle',
  coverUrl = 'coverUrl',
  locationTitle = 'locationTitle',
  locationUrl = 'locationUrl',
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
  owner___ID = 'owner___ID',
  owner___Owned_Events = 'owner___Owned_Events',
  owner___Opportunities = 'owner___Opportunities',
  owner___company = 'owner___company',
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
  project___silent = 'project___silent',
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
  project___coordinators___ID = 'project___coordinators___ID',
  project___coordinators___Owned_Events = 'project___coordinators___Owned_Events',
  project___coordinators___Opportunities = 'project___coordinators___Opportunities',
  project___coordinators___company = 'project___coordinators___company',
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
}

export type EventGroupConnection = {
  __typename?: 'EventGroupConnection'
  totalCount: Scalars['Int']
  edges: Array<EventEdge>
  nodes: Array<Event>
  pageInfo: PageInfo
  distinct: Array<Scalars['String']>
  max: Maybe<Scalars['Float']>
  min: Maybe<Scalars['Float']>
  sum: Maybe<Scalars['Float']>
  group: Array<EventGroupConnection>
  field: Scalars['String']
  fieldValue: Maybe<Scalars['String']>
}

export type EventGroupConnectionDistinctArgs = {
  field: EventFieldsEnum
}

export type EventGroupConnectionMaxArgs = {
  field: EventFieldsEnum
}

export type EventGroupConnectionMinArgs = {
  field: EventFieldsEnum
}

export type EventGroupConnectionSumArgs = {
  field: EventFieldsEnum
}

export type EventGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>
  limit: Maybe<Scalars['Int']>
  field: EventFieldsEnum
}

export type EventFilterInput = {
  id: Maybe<StringQueryOperatorInput>
  parent: Maybe<NodeFilterInput>
  children: Maybe<NodeFilterListInput>
  internal: Maybe<InternalFilterInput>
  rowId: Maybe<StringQueryOperatorInput>
  name: Maybe<StringQueryOperatorInput>
  summary: Maybe<StringQueryOperatorInput>
  description: Maybe<StringQueryOperatorInput>
  competenceMap: Maybe<StringQueryOperatorInput>
  startTime: Maybe<DateQueryOperatorInput>
  endTime: Maybe<DateQueryOperatorInput>
  status: Maybe<StringQueryOperatorInput>
  slug: Maybe<StringQueryOperatorInput>
  rsvpUrl: Maybe<StringQueryOperatorInput>
  rsvpTitle: Maybe<StringQueryOperatorInput>
  coverUrl: Maybe<StringQueryOperatorInput>
  locationTitle: Maybe<StringQueryOperatorInput>
  locationUrl: Maybe<StringQueryOperatorInput>
  owner: Maybe<VolunteerFilterInput>
  project: Maybe<ProjectFilterInput>
  tags: Maybe<TagFilterListInput>
}

export type EventSortInput = {
  fields: Maybe<Array<Maybe<EventFieldsEnum>>>
  order: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type ExpertPartnersFragment = { __typename?: 'Query' } & {
  submitters: { __typename?: 'PartnerConnection' } & {
    nodes: Array<
      { __typename?: 'Partner' } & Pick<Partner, 'name' | 'url' | 'logoUrl'>
    >
  }
  experts: { __typename?: 'PartnerConnection' } & {
    nodes: Array<
      { __typename?: 'Partner' } & Pick<Partner, 'name' | 'url' | 'logoUrl'>
    >
  }
  supporters: { __typename?: 'PartnerConnection' } & {
    nodes: Array<
      { __typename?: 'Partner' } & Pick<Partner, 'name' | 'url' | 'logoUrl'>
    >
  }
}

export type FinancialPartnersFragment = { __typename?: 'Query' } & {
  main: { __typename?: 'PartnerConnection' } & {
    nodes: Array<
      { __typename?: 'Partner' } & Pick<Partner, 'name' | 'url' | 'logoUrl'>
    >
  }
  regular: { __typename?: 'PartnerConnection' } & {
    nodes: Array<
      { __typename?: 'Partner' } & Pick<Partner, 'name' | 'url' | 'logoUrl'>
    >
  }
  grants: { __typename?: 'PartnerConnection' } & {
    nodes: Array<
      { __typename?: 'Partner' } & Pick<Partner, 'name' | 'url' | 'logoUrl'>
    >
  }
}

export type GenerateProjectPagesQueryVariables = Exact<{ [key: string]: never }>

export type GenerateProjectPagesQuery = { __typename?: 'Query' } & {
  allProject: { __typename?: 'ProjectConnection' } & {
    nodes: Array<{ __typename?: 'Project' } & Pick<Project, 'slug' | 'id'>>
  }
}

export type GenerateEventPagesQueryVariables = Exact<{ [key: string]: never }>

export type GenerateEventPagesQuery = { __typename?: 'Query' } & {
  allEvent: { __typename?: 'EventConnection' } & {
    nodes: Array<{ __typename?: 'Event' } & Pick<Event, 'id' | 'name' | 'slug'>>
  }
}

export type GenerateOpportunityPagesQueryVariables = Exact<{
  [key: string]: never
}>

export type GenerateOpportunityPagesQuery = { __typename?: 'Query' } & {
  allOpportunity: { __typename?: 'OpportunityConnection' } & {
    nodes: Array<
      { __typename?: 'Opportunity' } & Pick<Opportunity, 'id' | 'name' | 'slug'>
    >
  }
}

export type GenerateContentPagesQueryVariables = Exact<{ [key: string]: never }>

export type GenerateContentPagesQuery = { __typename?: 'Query' } & {
  allMarkdownRemark: { __typename?: 'MarkdownRemarkConnection' } & {
    nodes: Array<
      { __typename?: 'MarkdownRemark' } & Pick<
        MarkdownRemark,
        'html' | 'id'
      > & {
          frontmatter: Maybe<
            { __typename?: 'MarkdownRemarkFrontmatter' } & Pick<
              MarkdownRemarkFrontmatter,
              'cover' | 'date' | 'description' | 'slug' | 'title'
            > & {
                sources: Maybe<
                  Array<
                    Maybe<
                      {
                        __typename?: 'MarkdownRemarkFrontmatterSources'
                      } & Pick<
                        MarkdownRemarkFrontmatterSources,
                        'title' | 'type' | 'url'
                      >
                    >
                  >
                >
                tableOfContent: Maybe<
                  Array<
                    Maybe<
                      {
                        __typename?: 'MarkdownRemarkFrontmatterTableOfContent'
                      } & Pick<
                        MarkdownRemarkFrontmatterTableOfContent,
                        'time' | 'title'
                      >
                    >
                  >
                >
              }
          >
        }
    >
  }
}

export type NotFoundQueryVariables = Exact<{ [key: string]: never }>

export type NotFoundQuery = { __typename?: 'Query' } & {
  locales: { __typename?: 'LocaleConnection' } & {
    edges: Array<
      { __typename?: 'LocaleEdge' } & {
        node: { __typename?: 'Locale' } & Pick<
          Locale,
          'ns' | 'data' | 'language'
        >
      }
    >
  }
}

export type HomepageQueryVariables = Exact<{
  language: Scalars['String']
}>

export type HomepageQuery = { __typename?: 'Query' } & {
  projects: { __typename?: 'ProjectConnection' } & {
    nodes: Array<
      { __typename?: 'Project' } & Pick<
        Project,
        'name' | 'slug' | 'tagline' | 'coverUrl' | 'logoUrl'
      > & {
          tags: Maybe<
            Array<
              Maybe<
                { __typename?: 'Tag' } & Pick<Tag, 'rowId' | 'slug' | 'name'>
              >
            >
          >
        }
    >
  }
  partners: { __typename?: 'PartnerConnection' } & {
    nodes: Array<
      { __typename?: 'Partner' } & Pick<Partner, 'name' | 'url' | 'logoUrl'>
    >
  }
  locales: { __typename?: 'LocaleConnection' } & {
    edges: Array<
      { __typename?: 'LocaleEdge' } & {
        node: { __typename?: 'Locale' } & Pick<
          Locale,
          'ns' | 'data' | 'language'
        >
      }
    >
  }
}

export type OpportunitiesQueryVariables = Exact<{
  language: Scalars['String']
}>

export type OpportunitiesQuery = { __typename?: 'Query' } & {
  opportunities: { __typename?: 'OpportunityConnection' } & {
    nodes: Array<
      { __typename?: 'Opportunity' } & Pick<
        Opportunity,
        'id' | 'name' | 'timeRequirements' | 'skills' | 'slug'
      > & {
          project: Maybe<
            { __typename?: 'Project' } & Pick<
              Project,
              'name' | 'logoUrl' | 'url'
            >
          >
        }
    >
  }
  locales: { __typename?: 'LocaleConnection' } & {
    edges: Array<
      { __typename?: 'LocaleEdge' } & {
        node: { __typename?: 'Locale' } & Pick<
          Locale,
          'ns' | 'data' | 'language'
        >
      }
    >
  }
}

export type PartnersQueryVariables = Exact<{
  language: Scalars['String']
}>

export type PartnersQuery = { __typename?: 'Query' } & {
  locales: { __typename?: 'LocaleConnection' } & {
    edges: Array<
      { __typename?: 'LocaleEdge' } & {
        node: { __typename?: 'Locale' } & Pick<
          Locale,
          'ns' | 'data' | 'language'
        >
      }
    >
  }
} & FinancialPartnersFragment &
  ExpertPartnersFragment

export type PortalDobrovolnikaPageQueryVariables = Exact<{
  language: Scalars['String']
}>

export type PortalDobrovolnikaPageQuery = { __typename?: 'Query' } & {
  events: { __typename?: 'EventConnection' } & {
    nodes: Array<
      { __typename?: 'Event' } & Pick<
        Event,
        | 'competenceMap'
        | 'description'
        | 'endTime'
        | 'id'
        | 'name'
        | 'rowId'
        | 'startTime'
        | 'locationTitle'
        | 'status'
        | 'summary'
        | 'rsvpUrl'
        | 'rsvpTitle'
        | 'slug'
        | 'coverUrl'
      > & {
          project: Maybe<
            { __typename?: 'Project' } & Pick<
              Project,
              'logoUrl' | 'name' | 'id' | 'coverUrl' | 'url' | 'rowId'
            >
          >
          owner: Maybe<
            { __typename?: 'Volunteer' } & Pick<
              Volunteer,
              'id' | 'name' | 'rowId'
            >
          >
          tags: Maybe<
            Array<
              Maybe<
                { __typename?: 'Tag' } & Pick<
                  Tag,
                  'id' | 'name' | 'rowId' | 'slug'
                >
              >
            >
          >
        }
    >
  }
  opportunities: { __typename?: 'OpportunityConnection' } & {
    nodes: Array<
      { __typename?: 'Opportunity' } & Pick<
        Opportunity,
        'id' | 'name' | 'timeRequirements' | 'skills' | 'slug'
      > & {
          project: Maybe<
            { __typename?: 'Project' } & Pick<
              Project,
              'name' | 'logoUrl' | 'url'
            >
          >
        }
    >
  }
  cedu: { __typename?: 'MarkdownRemarkConnection' } & {
    nodes: Array<
      { __typename?: 'MarkdownRemark' } & {
        frontmatter: Maybe<
          { __typename?: 'MarkdownRemarkFrontmatter' } & Pick<
            MarkdownRemarkFrontmatter,
            | 'cover'
            | 'description'
            | 'date'
            | 'slug'
            | 'title'
            | 'videoUrl'
            | 'tags'
          > & {
              tableOfContent: Maybe<
                Array<
                  Maybe<
                    {
                      __typename?: 'MarkdownRemarkFrontmatterTableOfContent'
                    } & Pick<
                      MarkdownRemarkFrontmatterTableOfContent,
                      'time' | 'title' | 'start'
                    >
                  >
                >
              >
              sources: Maybe<
                Array<
                  Maybe<
                    { __typename?: 'MarkdownRemarkFrontmatterSources' } & Pick<
                      MarkdownRemarkFrontmatterSources,
                      'title' | 'type' | 'url'
                    >
                  >
                >
              >
              credits: Maybe<
                Array<
                  Maybe<
                    { __typename?: 'MarkdownRemarkFrontmatterCredits' } & Pick<
                      MarkdownRemarkFrontmatterCredits,
                      'title' | 'name'
                    >
                  >
                >
              >
            }
        >
      }
    >
  }
  locales: { __typename?: 'LocaleConnection' } & {
    edges: Array<
      { __typename?: 'LocaleEdge' } & {
        node: { __typename?: 'Locale' } & Pick<
          Locale,
          'ns' | 'data' | 'language'
        >
      }
    >
  }
}

export type ProjectsPageQueryVariables = Exact<{
  language: Scalars['String']
}>

export type ProjectsPageQuery = { __typename?: 'Query' } & {
  highlightedProject: Maybe<
    { __typename?: 'Project' } & Pick<
      Project,
      'name' | 'slug' | 'tagline' | 'coverUrl' | 'logoUrl' | 'highlighted'
    > & {
        tags: Maybe<
          Array<
            Maybe<{ __typename?: 'Tag' } & Pick<Tag, 'rowId' | 'slug' | 'name'>>
          >
        >
      }
  >
  otherProjects: { __typename?: 'ProjectConnection' } & {
    nodes: Array<
      { __typename?: 'Project' } & Pick<
        Project,
        | 'name'
        | 'slug'
        | 'silent'
        | 'tagline'
        | 'coverUrl'
        | 'logoUrl'
        | 'highlighted'
      > & {
          tags: Maybe<
            Array<
              Maybe<
                { __typename?: 'Tag' } & Pick<Tag, 'rowId' | 'slug' | 'name'>
              >
            >
          >
        }
    >
  }
  locales: { __typename?: 'LocaleConnection' } & {
    edges: Array<
      { __typename?: 'LocaleEdge' } & {
        node: { __typename?: 'Locale' } & Pick<
          Locale,
          'ns' | 'data' | 'language'
        >
      }
    >
  }
}

export type ContentPageQueryVariables = Exact<{
  id: Scalars['String']
  language: Scalars['String']
}>

export type ContentPageQuery = { __typename?: 'Query' } & {
  markdownRemark: Maybe<
    { __typename?: 'MarkdownRemark' } & Pick<MarkdownRemark, 'html'> & {
        frontmatter: Maybe<
          { __typename?: 'MarkdownRemarkFrontmatter' } & Pick<
            MarkdownRemarkFrontmatter,
            | 'cover'
            | 'date'
            | 'description'
            | 'slug'
            | 'tags'
            | 'title'
            | 'videoUrl'
          > & {
              credits: Maybe<
                Array<
                  Maybe<
                    { __typename?: 'MarkdownRemarkFrontmatterCredits' } & Pick<
                      MarkdownRemarkFrontmatterCredits,
                      'title' | 'name'
                    >
                  >
                >
              >
              sources: Maybe<
                Array<
                  Maybe<
                    { __typename?: 'MarkdownRemarkFrontmatterSources' } & Pick<
                      MarkdownRemarkFrontmatterSources,
                      'title' | 'type' | 'url'
                    >
                  >
                >
              >
              tableOfContent: Maybe<
                Array<
                  Maybe<
                    {
                      __typename?: 'MarkdownRemarkFrontmatterTableOfContent'
                    } & Pick<
                      MarkdownRemarkFrontmatterTableOfContent,
                      'start' | 'time' | 'title'
                    >
                  >
                >
              >
            }
        >
      }
  >
  locales: { __typename?: 'LocaleConnection' } & {
    edges: Array<
      { __typename?: 'LocaleEdge' } & {
        node: { __typename?: 'Locale' } & Pick<
          Locale,
          'ns' | 'data' | 'language'
        >
      }
    >
  }
}

export type EventPageQueryVariables = Exact<{
  id: Scalars['String']
  language: Scalars['String']
}>

export type EventPageQuery = { __typename?: 'Query' } & {
  event: Maybe<
    { __typename?: 'Event' } & Pick<
      Event,
      | 'competenceMap'
      | 'description'
      | 'endTime'
      | 'id'
      | 'name'
      | 'rowId'
      | 'rsvpUrl'
      | 'rsvpTitle'
      | 'slug'
      | 'startTime'
      | 'status'
      | 'summary'
      | 'coverUrl'
      | 'locationTitle'
      | 'locationUrl'
    > & {
        owner: Maybe<
          { __typename?: 'Volunteer' } & Pick<
            Volunteer,
            'id' | 'name' | 'rowId' | 'profilePictureUrl' | 'email'
          >
        >
        project: Maybe<
          { __typename?: 'Project' } & Pick<
            Project,
            | 'coverUrl'
            | 'description'
            | 'finished'
            | 'githubUrl'
            | 'id'
            | 'logoUrl'
            | 'name'
            | 'rowId'
            | 'slackChannelName'
            | 'slackChannelUrl'
            | 'slug'
            | 'tagline'
            | 'trelloUrl'
            | 'url'
            | 'silent'
          > & {
              tags: Maybe<
                Array<
                  Maybe<
                    { __typename?: 'Tag' } & Pick<
                      Tag,
                      'name' | 'rowId' | 'slug' | 'id'
                    >
                  >
                >
              >
            }
        >
        tags: Maybe<
          Array<
            Maybe<
              { __typename?: 'Tag' } & Pick<
                Tag,
                'id' | 'name' | 'rowId' | 'slug'
              >
            >
          >
        >
      }
  >
  otherEvents: { __typename?: 'EventConnection' } & {
    nodes: Array<
      { __typename?: 'Event' } & Pick<
        Event,
        | 'competenceMap'
        | 'description'
        | 'endTime'
        | 'id'
        | 'name'
        | 'rowId'
        | 'startTime'
        | 'locationTitle'
        | 'status'
        | 'summary'
        | 'rsvpUrl'
        | 'slug'
        | 'coverUrl'
      > & {
          project: Maybe<
            { __typename?: 'Project' } & Pick<
              Project,
              'logoUrl' | 'name' | 'id' | 'coverUrl' | 'url' | 'rowId'
            >
          >
          owner: Maybe<
            { __typename?: 'Volunteer' } & Pick<
              Volunteer,
              'id' | 'name' | 'rowId' | 'profilePictureUrl'
            >
          >
          tags: Maybe<
            Array<
              Maybe<
                { __typename?: 'Tag' } & Pick<
                  Tag,
                  'id' | 'name' | 'rowId' | 'slug'
                >
              >
            >
          >
        }
    >
  }
  locales: { __typename?: 'LocaleConnection' } & {
    edges: Array<
      { __typename?: 'LocaleEdge' } & {
        node: { __typename?: 'Locale' } & Pick<
          Locale,
          'ns' | 'data' | 'language'
        >
      }
    >
  }
}

export type OpportunityPageQueryVariables = Exact<{
  id: Scalars['String']
  language: Scalars['String']
}>

export type OpportunityPageQuery = { __typename?: 'Query' } & {
  opportunity: Maybe<
    { __typename?: 'Opportunity' } & Pick<
      Opportunity,
      | 'id'
      | 'name'
      | 'slug'
      | 'summary'
      | 'timeRequirements'
      | 'contactUrl'
      | 'coverUrl'
      | 'juniorFriendly'
    > & {
        owner: Maybe<
          { __typename?: 'Volunteer' } & Pick<
            Volunteer,
            'email' | 'name' | 'profilePictureUrl'
          >
        >
        project: Maybe<
          { __typename?: 'Project' } & Pick<
            Project,
            | 'coverUrl'
            | 'description'
            | 'finished'
            | 'githubUrl'
            | 'id'
            | 'logoUrl'
            | 'name'
            | 'rowId'
            | 'slackChannelName'
            | 'slackChannelUrl'
            | 'slug'
            | 'tagline'
            | 'trelloUrl'
            | 'url'
            | 'silent'
          > & {
              tags: Maybe<
                Array<
                  Maybe<
                    { __typename?: 'Tag' } & Pick<
                      Tag,
                      'name' | 'rowId' | 'slug' | 'id'
                    >
                  >
                >
              >
            }
        >
      }
  >
  opportunities: { __typename?: 'OpportunityConnection' } & {
    nodes: Array<
      { __typename?: 'Opportunity' } & Pick<
        Opportunity,
        'id' | 'name' | 'timeRequirements' | 'skills' | 'slug'
      > & {
          project: Maybe<
            { __typename?: 'Project' } & Pick<
              Project,
              'name' | 'logoUrl' | 'url'
            >
          >
        }
    >
  }
  locales: { __typename?: 'LocaleConnection' } & {
    edges: Array<
      { __typename?: 'LocaleEdge' } & {
        node: { __typename?: 'Locale' } & Pick<
          Locale,
          'ns' | 'data' | 'language'
        >
      }
    >
  }
}

export type ProjectPageQueryVariables = Exact<{
  id: Scalars['String']
  language: Scalars['String']
}>

export type ProjectPageQuery = { __typename?: 'Query' } & {
  project: Maybe<
    { __typename?: 'Project' } & Pick<
      Project,
      | 'name'
      | 'description'
      | 'slackChannelName'
      | 'slackChannelUrl'
      | 'finished'
      | 'tagline'
      | 'coverUrl'
      | 'githubUrl'
      | 'trelloUrl'
      | 'url'
      | 'contributeText'
    > & {
        coordinators: Maybe<
          Array<
            Maybe<
              { __typename?: 'Volunteer' } & Pick<
                Volunteer,
                'name' | 'company' | 'profilePictureUrl'
              >
            >
          >
        >
      }
  >
  otherProjects: { __typename?: 'ProjectConnection' } & {
    nodes: Array<
      { __typename?: 'Project' } & Pick<
        Project,
        'name' | 'tagline' | 'coverUrl' | 'logoUrl' | 'slug'
      > & {
          tags: Maybe<
            Array<Maybe<{ __typename?: 'Tag' } & Pick<Tag, 'name' | 'slug'>>>
          >
        }
    >
  }
  locales: { __typename?: 'LocaleConnection' } & {
    edges: Array<
      { __typename?: 'LocaleEdge' } & {
        node: { __typename?: 'Locale' } & Pick<
          Locale,
          'ns' | 'data' | 'language'
        >
      }
    >
  }
}
