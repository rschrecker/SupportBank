const log4js = require('log4js');
const logger = log4js.getLogger('prase.js');
const parse = require('csv-parse/lib/sync');
const fs = require('fs');
function parsecsv (file) {
    const csvdata = fs.readFileSync(file, 'UTF-8');
    return parse(csvdata, {columns:true})
}

module.exports = parsecsv;