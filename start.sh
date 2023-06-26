#!/bin/bash
gitclone() {
    echo "git clone...."
    # chmod 700 ~/.ssh
    # chmod 600 ~/.ssh/*
    git clone $repo_url
    folder_name=$(basename "$repo_url" .git)
    folder_name=${folder_name##*/}
    echo "$folder_name"
    cp -r $folder_name/* .
    cp -r $folder_name/.* .
    rm -rf $folder_name
}
if [[ ! -d $hexoInit ]]; then
    touch 'hexoInit'
    gitclone
fi
node web_hook.js &
npm i && hexo cl; hexo g; hexo s