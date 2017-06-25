Handlebars.registerHelper('formatDate', function (date) {

    let timestamp = parseInt(date);
    let formatted = moment(timestamp).format("DD.MM.YYYY");

    return formatted;
});

Handlebars.registerHelper('checkIfChecked', function(currentValue) {

    console.log("typeof(currentValue): ", typeof(currentValue));

    let booleanValue = "";
    if (typeof(currentValue) === "string") {
        booleanValue = JSON.parse(currentValue);
    } else {
        booleanValue = currentValue;
    }

    return booleanValue === true ? ' checked=&quot;checked&quot;' : '';
});

Handlebars.registerHelper('if', function(showFinishedNotesOnly, options) {

    let booleanValue = "";
    if (typeof(showFinishedNotesOnly) === "string") {
        booleanValue = JSON.parse(showFinishedNotesOnly);
    } else {
        booleanValue = showFinishedNotesOnly;
    }

    if (booleanValue === false) {
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