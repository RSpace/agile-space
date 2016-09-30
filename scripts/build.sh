#!/usr/bin/env bash

# Run webpack build
npm run build-js

# Copy html files to build folder
cp ./src/html/production/* ./build/

# Copy images and sounds to build folder
cp -r ./src/images/ ./build/images
cp -r ./src/sounds/ ./build/sounds
