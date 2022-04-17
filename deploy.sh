#!/usr/bin/env sh

# 當發生錯誤時終止腳本
set -e

# 建構
npm run build

# cd 到建構輸出的目錄下
cd dist

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/Kai1219/Reverie.git master:gh-pages

cd -