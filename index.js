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
logger.debug('starting up');


const Account = require('./account.js');
const parse = require('./parse.js');
const readlineSync = require('readline-sync');
const update_amounts = require('./update_amounts.js')


function _print_if(item, name) {
    if (item.To === name || item.From === name) {
        console.log(item)
    }
}


let command = '';
let data = [];
while (command !== 'exit') {
    command = readlineSync.prompt();
    if (command.slice(0, 12) === 'Import File ') {
        file = 'Transactions2013.json'//command.slice(12);
        data = data.concat(parse(file))
    }
    else if (command === 'List All') {
        Accounts = {};
        data.forEach(function (item, index, array) {
            update_amounts(item, Accounts)
        });
        console.log(Accounts)
    }
    else if (command.slice(0, 5) === 'List ') {
        console.log('at list [name]')
        name = command.slice(5);
        data.forEach(function (item, index, array) {
            _print_if(item, name)
        })
    }
    else if (command !== 'exit') {
        console.log('bad command')
        logger.error('Unexpected user input: ' + command)
    }
    if (data === []) {
        logger.warn('No data imported')
    }
}