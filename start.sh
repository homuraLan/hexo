#!/bin/bash
if [ ! -f "hexoInit" ]; then
    touch 'hexoInit'
    cp -r /hexo1/* .
fi
node web_hook.js &
npm i && hexo cl; hexo g; hexo s