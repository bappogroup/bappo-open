#!/usr/bin/env node

// https://github.com/oblador/react-native-vector-icons/blob/master/bin/generate-material-icons.js
const fs = require('fs');
const yargs = require('yargs');

const { argv } = yargs
  .option('path', {
    alias: 'p',
    describe: 'Path to codepoints',
  })
  .option('output', {
    alias: 'o',
    describe: 'Save glyphmap JSON to file',
  })
  .demandOption('path')
  .help();

function extractGlyphMapFromCodepoints(fileName) {
  const codepoints = fs
    .readFileSync(fileName, { encoding: 'utf8' })
    .split('\n');
  const glyphMap = {};
  codepoints.forEach(point => {
    const parts = point.split(' ');
    if (parts.length === 2) {
      glyphMap[parts[0].replace(/_/g, '-')] = parseInt(parts[1], 16);
    }
  });

  return glyphMap;
}

const glyphMap = extractGlyphMapFromCodepoints(argv.path);

let content = JSON.stringify(glyphMap, null, '  ');

if (argv.output) {
  fs.writeFileSync(argv.output, content);
} else {
  console.log(content);
}
