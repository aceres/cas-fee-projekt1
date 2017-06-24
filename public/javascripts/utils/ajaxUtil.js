;(function(util, $) {
    function ajax(method, url, data) {
        return $.ajax({
            dataType: "json",
            contentType: "application/json",
            method: method,
            url: url,
            data: data ? JSON.stringify(data) : undefined
        });
    }
    util.ajax = { ajax : ajax };

}(window.util = window.util || { }, jQuery));