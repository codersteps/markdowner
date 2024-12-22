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
  minify: process.env.NODE_ENV === 'production',
  sourcemap: process.env.NODE_ENV === 'development',
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
