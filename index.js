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
const print_for_name = require('./print_for_name.js')


let command = '';
let data = [];
while (command !== 'exit') {
    command = readlineSync.prompt();
    if (command.slice(0, 12) === 'Import File ') {
        file = command.slice(12);
        try {
            data = data.concat(parse(file))
        }
        catch (err) {
            console.log(err.message)
            logger.error('Error opening file: ' + err.message)
        }
    }
    else if (command === 'List All') {
        let Accounts = {};
        data.forEach(function (item, index, array) {
            update_amounts(item, Accounts)
        });
        console.log(Accounts)
    }
    else if (command.slice(0, 5) === 'List ') {
        let name = command.slice(5);
        print_for_name(data, name)

    }
    else if (command.slice(0,12) === 'Export File ') {
        let file = command.slice(12)
        //let string = export.to_string(data)
        //export.write(string, file)

    }
    else if (command !== 'exit') {
        console.log('invalid command')
        logger.error('Unexpected user input: ' + command)
    }
    if (data === []) {
        logger.warn('No data imported')
    }
}