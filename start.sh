#!/bin/bash
gitclone() {
    echo "git clone...."
    git clone $repo_url .
}
if [ -z "$(ls -A)" ]; then
    gitclone
fi
service hexo.webhook start
service hexo start