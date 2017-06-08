// Format the date
Handlebars.registerHelper('formatDate', function (date, format) {
    let momentData = moment(date);
    return momentData.format(format);
});

// Check whether checkbox should be marked as checked or not
Handlebars.registerHelper('checkIfChecked', function(currentValue) {
    return currentValue === true ? ' checked=&quot;checked&quot;' : '';
});

// Show all notes and hide unfinished notes
Handlebars.registerHelper('if', function(showFinishedNotesOnly, options) {
    if (!showFinishedNotesOnly) {
        return options.fn(this);
    }
});