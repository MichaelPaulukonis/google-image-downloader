const { ImageDownloader } = require('../')
const path = require('path')
const fs = require('fs')
const program = require('commander');
program.version('0.0.1');


const core = (terms, limit, target) => {
    const outpath = path.join(__dirname, target)
    if (!fs.existsSync(outpath)) {
        fs.mkdirSync(outpath)
    }

    const downloader = new ImageDownloader(outpath, true)

    downloader.downloadImages(terms, limit)
}

function myParseInt(value, dummyPrevious) {
    // parseInt takes a string and an optional radix
    return parseInt(value, 10);
  }

program
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --search <string>', 'search and download')
    .option('-t, --target <string>', 'sub-folder in output to save in', 'sources')
    .option('-l, --limit <number>', 'number to download', '100', myParseInt)

program.parse(process.argv)

if (program.search) {
    core(program.search, program.limit, program.target)
}