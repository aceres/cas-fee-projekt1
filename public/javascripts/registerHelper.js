Handlebars.registerHelper('formatDate', function (date) {

    let timestamp = parseInt(date);
    let formatted = moment(timestamp).format("DD.MM.YYYY");

    return formatted;
});

Handlebars.registerHelper('checkIfChecked', function(currentValue) {

    let value = convertToBoolean(currentValue)
    return value === true ? ' checked=&quot;checked&quot;' : '';
});

Handlebars.registerHelper('if', function(showFinishedNotesOnly, options) {

    let value = convertToBoolean(showFinishedNotesOnly)
    if (value === false) {
        return options.fn(this);
    }
});

Handlebars.registerHelper('countStars', function(stars, block) {

    var count = '',
        i = 0;

    while(++i <= stars) {
        count += block.fn(i);
    }
    return count;
});

function convertToBoolean(value) {

    let booleanValue = null;
    if (typeof(value) === "string") {
        booleanValue = JSON.parse(value);
    } else {
        booleanValue = value;
    }
    return booleanValue;
}