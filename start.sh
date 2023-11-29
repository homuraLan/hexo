#!/bin/bash
gitclone() {
    echo "git clone...."
    git config --global user.email $email
    git config --global user.name $name
    git clone $repo_url .
}
if [ -z "$(ls -A)" ]; then
    gitclone
fi
node web_hook.js &
npm i && hexo cl; hexo g; hexo s