import { Lang } from '@/types'
import hljs from 'highlight.js/lib/core'
import c from 'highlight.js/lib/languages/c'
import md from 'highlight.js/lib/languages/markdown'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import jsx from 'highlight.js/lib/languages/javascript'
import tsx from 'highlight.js/lib/languages/typescript'
import sql from 'highlight.js/lib/languages/sql'
import css from 'highlight.js/lib/languages/css'
import ini from 'highlight.js/lib/languages/ini'
import xml from 'highlight.js/lib/languages/xml'
import yml from 'highlight.js/lib/languages/yaml'
import cpp from 'highlight.js/lib/languages/cpp'
import php from 'highlight.js/lib/languages/php'
import bash from 'highlight.js/lib/languages/bash'
import scss from 'highlight.js/lib/languages/scss'
import json from 'highlight.js/lib/languages/json'
import twig from 'highlight.js/lib/languages/twig'
import java from 'highlight.js/lib/languages/java'

export const langs: Lang[] = [
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
]

hljs.registerLanguage('c', c)
hljs.registerLanguage('md', md)
hljs.registerLanguage('js', js)
hljs.registerLanguage('ts', ts)
hljs.registerLanguage('jsx', jsx)
hljs.registerLanguage('tsx', tsx)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('css', css)
hljs.registerLanguage('ini', ini)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('yml', yml)
hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('php', php)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('json', json)
hljs.registerLanguage('twig', twig)
hljs.registerLanguage('java', java)
hljs.registerLanguage('blade', xml)

export function highlighter({ text, lang }: { text: string; lang: Lang }) {
  return hljs.highlight(text, {
    language: lang,
  }).value
}
