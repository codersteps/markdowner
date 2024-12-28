import { z } from 'zod'
import { Level, ListContent, ListItem } from '@/types'

export const zCode = z.object({
  id: z.string(),
  type: z.literal('code'),
  text: z.string(),
  filename: z.string(),
  lang: z
    .string()
    .toLowerCase()
    .pipe(
      z.enum([
        'c',
        'md',
        'js',
        'ts',
        'jsx',
        'tsx',
        'sql',
        'css',
        'ini',
        'xml',
        'yml',
        'cpp',
        'php',
        'html',
        'bash',
        'scss',
        'json',
        'twig',
        'java',
        'blade',
      ]),
    ),
})

export const zHeading = z.object({
  id: z.string(),
  type: z.literal('heading'),
  level: z.nativeEnum(Level),
  text: z.string(),
})

export const zParagraph = z.object({
  id: z.string(),
  type: z.literal('paragraph'),
  text: z.string(),
})

export const zPicture = z.object({
  id: z.string(),
  type: z.literal('picture'),
  alt: z.string(),
  src: z.string(),
  caption: z.string(),
})

const zListItem: z.ZodType<ListItem> = z.lazy(() =>
  z.object({
    id: z.string(),
    text: z.string(),
    subItems: zListContent.optional(),
  }),
)

const zListContent: z.ZodType<ListContent> = z.object({
  type: z.enum(['ordered', 'unordered']),
  items: z.array(zListItem),
})

export const zList = z.object({
  id: z.string(),
  type: z.literal('list'),
  content: zListContent,
})

export const zBlock = z.union([zCode, zHeading, zPicture, zParagraph, zList])
