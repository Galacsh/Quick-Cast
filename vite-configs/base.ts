import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

import { type PluginOption, type UserConfig, type BuildOptions } from 'vite'

const isDev = process.env.__DEV__ === 'true'
const isProd = !isDev

// Paths
export const dist = resolve(__dirname, '..', 'dist')
export const src = resolve(__dirname, '..', 'src')

export const withBase = (
  buildOptions: BuildOptions,
  plugins?: PluginOption[]
): UserConfig => {
  return {
    resolve: {
      alias: { '@': src },
    },
    define: {
      'process.env.NODE_ENV': isDev ? '"development"' : '"production"',
    },
    plugins: plugins ? [react(), ...plugins] : [react()],
    build: {
      outDir: dist,
      emptyOutDir: false,
      sourcemap: isDev,
      minify: isProd,
      reportCompressedSize: isProd,
      copyPublicDir: false,
      ...buildOptions,
    },
  }
}
