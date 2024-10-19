import { Lang } from '../types'
import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'
import dark from 'shiki/themes/github-dark-default.mjs'
import light from 'shiki/themes/github-light-default.mjs'

export type CreateShiki = {
  codeToHtml: (value: { text: string; lang: Lang }) => string
}

export const langs = [
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
  'csv',
  'php',
  'html',
  'scss',
  'json',
  'twig',
  'java',
  'blade',
]

export async function createShiki(): Promise<CreateShiki> {
  const highlighter = await createHighlighterCore({
    themes: [dark, light],
    langs: [import('shiki/langs/typescript.mjs')],
    engine: createOnigurumaEngine(import('shiki/wasm')),
  })

  function codeToHtml(value: { text: string; lang: Lang }) {
    return highlighter.codeToHtml(value.text, {
      lang: value.lang,
      themes: { dark, light },
    })
  }

  return { codeToHtml }
}
