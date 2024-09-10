# QuickCast

TBD

# Dev History

```shell
npm create vite@latest quick-cast -- --template react-swc-ts
cd quick-cast
npm install

git init
git add --all
git commit -m "Initial commit"

npm install -D \
  husky lint-staged \
  prettier eslint-plugin-react eslint-config-prettier \
  fs-extra rimraf chokidar concurrently \
  @types/node @types/chrome

npx husky init
node --eval "fs.writeFileSync('.husky/pre-commit','npx lint-staged\n')"
```
