import { defineConfig } from 'vite'
import { resolve } from 'path'
import { src, withBase } from './base'
import type { BuildOptions } from 'vite'

const plugins = undefined
const buildOptions: BuildOptions = {
  lib: {
    name: 'background',
    entry: resolve(src, 'background', 'index.ts'),
    formats: ['iife'],
    fileName: () => 'background.js',
  },
}

export default defineConfig(withBase(buildOptions, plugins))
