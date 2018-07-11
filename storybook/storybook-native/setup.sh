#!/bin/bash

#yarn install
#react-native run-ios

cp -r ../../fonts ./node_modules/bappo-components/fonts
cp ../../fonts.gradle ./node_modules/bappo-components/
cp -r ../../glyphmaps ./node_modules/bappo-components/glyphmaps
cp ../../package.json ./node_modules/bappo-components/
cp -r ../../node_modules/downshift ./node_modules/downshift
cp -r ../../node_modules/es6-error ./node_modules/es6-error
cp -r ../../node_modules/react-recomponent ./node_modules/react-recomponent

cd ../../
npm run build
