const log4js = require('log4js');
const logger = log4js.getLogger('index.js');
log4js.configure({
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'debug'}
    }
});
logger.debug('starting up')

const Account = require('./account.js');
const parse = require('./parse.js');
const readlineSync = require('readline-sync');
const _ = require('underscore');


const command = 'List All';//readlineSync.prompt();
const data = parse('Transactions2014.csv').concat(parse('DodgyTransactions2015.csv'));


function update_amounts(item, dict) {
    const expected_headers = ['Date','From','To','Narrative','Amount']
    if (_(Object.keys(item)).difference(expected_headers).length !== 0) {
        logger.debug('Unexpected headers: headers were' + Object.keys(item).join())
    }
    if (dict[item.From] === undefined) {
        dict[item.From] = new Account(item.From)
    }
    if (dict[item.To] === undefined) {
        dict[item.To] = new Account(item.To)
    }
    if (isNaN(parseFloat(item.Amount))) {
        logger.debug('Amount was not a number: ' + item.Amount)
    }
    else {
        dict[item.From].amount -= parseFloat(item.Amount);
        dict[item.To].amount += parseFloat(item.Amount);
    }
}


function _print_if(item) {
    if (item.To === name || item.From === name) {
        console.log(item)
    }
}


if (command === 'List All') {
    Accounts = {};
    data.forEach(function(item, index, array) {update_amounts(item, Accounts)})
    console.log(Accounts)
}
else if (command.slice(0,5) === 'List ') {
    name = command.slice(5)
    data.forEach(function(item, index, array) {_print_if(item, name)})
}
else {
    logger.debug('Unexpected user input: ' + command)
}