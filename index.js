const readlineSync = require('readline-sync');
const command = 'List Jon A';//readlineSync.prompt();
const parse = require('csv-parse/lib/sync');
fs = require('fs');
let csvdata = fs.readFileSync('Transactions2014.csv', 'UTF-8');
const data = parse(csvdata, {columns:true});


class Account {
    constructor(name) {
        this.name = name;
        this.amount = 0
    }
}


function update_amounts(item, dict) {
    if (dict[item.From] === undefined) {
        dict[item.From] = new Account(item.From)
    }
    if (dict[item.To] === undefined) {
        dict[item.To] = new Account(item.To)
    }
    dict[item.From].amount -= parseFloat(item.Amount);
    dict[item.To].amount += parseFloat(item.Amount);
}


if (command === 'List All') {
    Accounts = {};
    data.forEach(function(item, index, array) {update_amounts(item, Accounts)})
    console.log(Accounts)
}


function _print_if(item) {
    if (item.To === name || item.From === name) {
        console.log(item)
    }
}


if (command.slice(0,5) === 'List ') {
    name = command.slice(5)
    data.forEach(function(item, index, array) {_print_if(item, name)})
}