Handlebars.registerHelper('formatDate', function (date, format) {
    let momentData = moment(date);
    return momentData.format(format);
});

// Check whether checkbox should be marked as checked or not
Handlebars.registerHelper('checkIfChecked', function(currentValue) {
    return currentValue === true ? ' checked=&quot;checked&quot;' : '';
});

Handlebars.registerHelper('if', function(showFinishedNotesOnly, options) {
    if (!showFinishedNotesOnly) {
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