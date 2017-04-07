#!/bin/bash

rm -rf temp
rm -rf dist
mkdir temp
mkdir dist

MODULE=${MODULE:=4}

# Build go-patterns.module.min.js
./node_modules/browserify/bin/cmd.js ./src/index.js -o ./temp/go-patterns.js -t [ babelify --presets [ es2015 ] ]
echo "var f = $(cat temp/go-patterns.js) module.exports = f($MODULE);" > ./temp/go-patterns.module.js
node_modules/.bin/uglifyjs --compress --screw-ie-8 --comments --mangle --mangle-props --mangle-regex='/^_/' ./temp/go-patterns.module.js -o ./dist/go-patterns.module.js

#Build stand alone version
./node_modules/browserify/bin/cmd.js ./src/index.js --standalone go-patterns -o ./dist/go-patterns.js -t [ babelify --presets [ es2015 ] ]
./node_modules/.bin/uglifyjs --compress --screw-ie-8 --comments --mangle --mangle-props --mangle-regex='/^_/' ./dist/go-patterns.js -o ./dist/go-patterns.min.js

rm -rf temp