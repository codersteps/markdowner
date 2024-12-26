import { Lang } from '../types'
import c from 'shiki/langs/c.mjs'
import md from 'shiki/langs/md.mjs'
import js from 'shiki/langs/js.mjs'
import ts from 'shiki/langs/ts.mjs'
import jsx from 'shiki/langs/jsx.mjs'
import tsx from 'shiki/langs/tsx.mjs'
import sql from 'shiki/langs/sql.mjs'
import css from 'shiki/langs/css.mjs'
import ini from 'shiki/langs/ini.mjs'
import xml from 'shiki/langs/xml.mjs'
import yml from 'shiki/langs/yml.mjs'
import cpp from 'shiki/langs/cpp.mjs'
import csv from 'shiki/langs/csv.mjs'
import php from 'shiki/langs/php.mjs'
import html from 'shiki/langs/html.mjs'
import bash from 'shiki/langs/bash.mjs'
import scss from 'shiki/langs/scss.mjs'
import json from 'shiki/langs/json.mjs'
import twig from 'shiki/langs/twig.mjs'
import java from 'shiki/langs/java.mjs'
import blade from 'shiki/langs/blade.mjs'
import dark from 'shiki/themes/github-dark-default.mjs'
import light from 'shiki/themes/github-light-default.mjs'
import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

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
  'bash',
  'scss',
  'json',
  'twig',
  'java',
  'blade',
]

const highlighter = createHighlighterCoreSync({
  themes: [dark, light],
  langs: [
    c,
    md,
    js,
    ts,
    jsx,
    tsx,
    sql,
    css,
    ini,
    xml,
    yml,
    cpp,
    csv,
    php,
    html,
    bash,
    scss,
    json,
    twig,
    java,
    blade,
  ],
  engine: createJavaScriptRegexEngine(),
})

export function codeToHtml(value: { text: string; lang: Lang }) {
  return highlighter.codeToHtml(value.text, {
    lang: value.lang,
    themes: { dark, light },
  })
}
