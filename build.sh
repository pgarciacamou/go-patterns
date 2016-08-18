#!/bin/bash

rm -rf temp
rm -rf dist
mkdir temp
mkdir dist

MODULE=${MODULE:=4}

# Build patterns.module.min.js
./node_modules/browserify/bin/cmd.js ./src/index.js -o ./temp/patterns.js -t [ babelify --presets [ es2015 ] ]
echo "var f = $(cat temp/patterns.js) module.exports = f($MODULE);" > ./temp/patterns.module.js
node_modules/.bin/uglifyjs --compress --screw-ie-8 --comments --mangle --mangle-props --mangle-regex='/^_/' ./temp/patterns.module.js -o ./dist/patterns.module.js

#Build stand alone version
./node_modules/browserify/bin/cmd.js ./src/index.js --standalone patterns -o ./dist/patterns.js -t [ babelify --presets [ es2015 ] ]
./node_modules/.bin/uglifyjs --compress --screw-ie-8 --comments --mangle --mangle-props --mangle-regex='/^_/' ./dist/patterns.js -o ./dist/patterns.min.js

rm -rf temp