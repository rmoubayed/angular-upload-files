#!/bin/sh

npm install
PATH="~/.npm-global/bin:$PATH"
gulp build --build_env staging --build_type compressed