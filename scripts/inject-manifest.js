import { ensureDir } from 'fs-extra'
import { writeFile } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { watch } from 'chokidar'
import { success, error } from './colorful-log.js'

// Paths
const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const dist = resolve(root, 'dist')
const manifestJson = resolve(dist, 'manifest.json')
const manifestJs = resolve(root, 'manifest.js')

function injectManifest() {
  ensureDir(dist)
    .then(() => {
      import(`../manifest.js?${Date.now()}`)
        .then(({ default: manifest }) => {
          const json = JSON.stringify(manifest, null, 2)
          writeFile(manifestJson, json, { flag: 'w' }, (err) => {
            if (err) error(err)
            else success(`Manifest file generated: ${manifestJson}`)
          })
        })
        .catch(error)
    })
    .catch(error)
}

const watchMode = process.argv.includes('--watch')

const watcher = watch(manifestJs)
  .on('add', injectManifest)
  .on('change', injectManifest)
  .on('ready', () => {
    if (!watchMode) watcher.close()
  })
