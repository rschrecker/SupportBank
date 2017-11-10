const log4js = require('log4js');
const logger = log4js.getLogger('parse.js');
const parsecsv = require('csv-parse/lib/sync');
const fs = require('fs');
const parsexml = require('pixl-xml').parse;

function add_transaction(list, item, extension) {
    if (extension === 'csv') {
        t = new Transaction(item.Date, item.From, item.To, item.Narrative, item.Amount)
    }
    if (extension === 'json') {
        t = new Transaction(item.Date, item.FromAccount, item.ToAccount, item.Narrative, item.Amount)
    }
    if (extension === 'xml') {
        t = new Transaction(item.Date, item.Parties.From, item.Parties.To, item.Description, item.Value)

    }
    list.push(t)
}


class Transaction {
    constructor(date, from, to, narrative, amount) {
        this.Date = date;
        this.From = from;
        this.To = to;
        this.Narrative = narrative;
        this.Amount = amount
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
    transactions = [];
    res.forEach(function(item, index, srray) {
        add_transaction(transactions, item, extension)
    });
    return transactions
}

module.exports = parse;