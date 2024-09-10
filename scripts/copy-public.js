import { copy, remove, ensureDir } from 'fs-extra'
import { resolve, relative, join } from 'path'
import { fileURLToPath } from 'url'
import { watch } from 'chokidar'
import { success, error } from './colorful-log.js'

// Paths
const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const dist = resolve(root, 'dist')
const publicDir = resolve(root, 'public')

function copyFile(file) {
  const relativePath = relative(publicDir, file)
  const distFilePath = join(dist, relativePath)

  copy(file, distFilePath)
    .then(() => success(`Copied: ${relativePath}`))
    .catch((err) => error(`Error copying ${relativePath}:`, err))
}

function createDir(dir) {
  const relativePath = relative(publicDir, dir)
  const distDirPath = join(dist, relativePath)
  ensureDir(distDirPath)
    .then(() => success(`Directory created: ${relativePath}`))
    .catch((err) => error(`Error creating directory ${relativePath}:`, err))
}

function deleteFile(file) {
  const relativePath = relative(publicDir, file)
  const distFilePath = join(dist, relativePath)

  remove(distFilePath)
    .then(() => success(`Deleted: ${relativePath}`))
    .catch((err) => error(`Error deleting ${relativePath}:`, err))
}

function deleteDir(dir) {
  const relativePath = relative(publicDir, dir)
  const distDirPath = join(dist, relativePath)
  remove(distDirPath)
    .then(() => success(`Directory deleted: ${relativePath}`))
    .catch((err) => error(`Error deleting directory ${relativePath}:`, err))
}

const watchMode = process.argv.includes('--watch')

const watcher = watch(publicDir, { ignored: /(^|[\/\\])\../ })
  .on('add', copyFile)
  .on('change', copyFile)
  .on('unlink', deleteFile)
  .on('addDir', createDir)
  .on('unlinkDir', deleteDir)
  .on('error', error)
  .on('ready', () => {
    if (!watchMode) watcher.close()
  })
