const log4js = require('log4js');
const logger = log4js.getLogger('update_amounts.js');
const _ = require('underscore');
const Account = require('./account.js')


function update_amounts(item, dict) {
    const expected_headers = ['Date','From','To','Narrative','Amount']
    if (_(Object.keys(item)).difference(expected_headers).length !== 0) {
        logger.error('Unexpected headers: headers were ' + Object.keys(item).join())
    }
    if (dict[item.From] === undefined) {
        dict[item.From] = new Account(item.From)
    }
    if (dict[item.To] === undefined) {
        dict[item.To] = new Account(item.To)
    }
    if (isNaN(parseFloat(item.Amount))) {
        logger.error('Amount was not a number: ' + item.Amount)
    }
    else {
        dict[item.From].amount -= parseFloat(item.Amount);
        dict[item.To].amount += parseFloat(item.Amount);
    }
}

module.exports = update_amounts;