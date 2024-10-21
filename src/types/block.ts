export enum Level {
  H2 = 2,
  H3 = 3,
  H4 = 4,
  H5 = 5,
  H6 = 6,
}

export type Heading = {
  id: string
  type: 'heading'
  level: Level
  text: string
}

export type Paragraph = {
  id: string
  type: 'paragraph'
  text: string
  html?: string
}

export type Lang =
  | 'c'
  | 'md'
  | 'js'
  | 'ts'
  | 'jsx'
  | 'tsx'
  | 'sql'
  | 'css'
  | 'ini'
  | 'xml'
  | 'yml'
  | 'cpp'
  | 'csv'
  | 'php'
  | 'html'
  | 'scss'
  | 'json'
  | 'twig'
  | 'java'
  | 'blade'

export interface Code {
  id: string
  type: 'code'
  lang: Lang
  text: string
  html?: string
  filename: string
}

export type Picture = {
  id: string
  type: 'picture'
  alt: string
  src: string
  caption: string
}

export type Block = Code | Paragraph | Picture | Heading
