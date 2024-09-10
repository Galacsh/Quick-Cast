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
npm install -D eslint-plugin-react
npm install -D husky lint-staged
npx husky init
node --eval "fs.writeFileSync('.husky/pre-commit','npx lint-staged\n')"
npm install -D prettier eslint-config-prettier
npm run lint:fix
```
