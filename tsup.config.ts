import postcss from 'postcss'
import { defineConfig } from 'tsup'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { sassPlugin } from 'esbuild-sass-plugin'

export default defineConfig({
  dts: true,
  clean: true,
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  minify: true,
  sourcemap: true,
  esbuildPlugins: [
    sassPlugin({
      async transform(source) {
        return (
          await postcss([tailwindcss, autoprefixer]).process(source, {
            from: 'src/index.scss',
          })
        ).css
      },
    }),
  ],
})
