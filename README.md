# web

## Project setup
yarn install

### Compiles and hot-reloads for development
yarn serve

### Compiles and minifies for production
yarn build

### Lints and fixes files

### Deploy steps:
- deployed on Netlify
- build: Netlify > Nodegy > Site Settings > Build & Deploy > Build Settings > Build Command (with api file creation):
```
cd src/config && echo -e "const API_URL = '/api/';\n\nconst DEPLOY_ENV = 'beta';\n\nexport { API_URL, DEPLOY_ENV }; " > deploy-config.js; yarn build
```
- Netlify _reroutes are in Public folder
- Merge dev build to Main for auto deploy