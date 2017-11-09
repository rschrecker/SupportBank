const log4js = require('log4js');
const logger = log4js.getLogger('parse.js');
const parsecsv = require('csv-parse/lib/sync');
const fs = require('fs');
const parsexml = require('pixl-xml').parse;

function fix_headers (item) {
    if (item.FromAccount !== undefined) {
        item.From = item.FromAccount;
        item.To = item.ToAccount;
        delete item.FromAccount
        delete item.ToAccount
    }
    if (item.Parties !== undefined) {
        item.To = item.Parties.To;
        item.From = item.Parties.From;
        delete item.Parties
    }
    if (item.Value !== undefined) {
        item.Amount = item.Value
        delete item.Value
    }
}


function parse (file) {
    const file_parts = file.split('.');
    const extension = file_parts[file_parts.length - 1];
    const data = fs.readFileSync(file, 'UTF-8');
    if (extension === 'csv') {
        res =  parsecsv(data, {columns: true})
    }
    else if (extension === 'json') {
        res = JSON.parse(data)
    }
    else if (extension === 'xml') {
        res = parsexml(data).SupportTransaction
    }
    else {
        logger.error('Unexpected file extension: filename was ' + file)
    }
    res.forEach(function(item, index, srray) {
        fix_headers(item)
    });
    return res
}

module.exports = parse;