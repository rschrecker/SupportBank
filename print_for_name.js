function _print_if(item, name) {
    if (item.To === name || item.From === name) {
        console.log(item)
    }
}


function print_for_name(data, name) {
    data.forEach(function (item, index, array) {
        _print_if(item, name)
    })
}


module.exports = print_for_name