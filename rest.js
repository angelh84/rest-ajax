const rest = (function ($, cookieBakery) {

    let authToken = cookieBakery.getCookieVal('Authorization');

    /**
     * AJAX CALL
     * @param {string} url 
     * @param {object} data 
     * @param {string} type 
     */


    let _call = function (url, data, type) {
        return $.ajax({
            url: url,
            data: JSON.stringify(data),
            type: type,
            beforeSend: function(xhr) {
                if (window.location.pathname !== '/login.html') {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
                }
            }
        });
    };


    /**
     * GET
     * @param {string} url
     */

    let GET = function (url) {
        return _call(url, {}, 'GET')
    };


    /**
     * POST
     * @param {string} url
     * @param {object} data 
     */

    let POST = function (url, data) {
        return _call(url, data, 'POST')
    };


    /**
     * DELETE
     * @param {string} url
     */

    let DEL = function (url, data) {
        return _call(url, data, 'DELETE');
    };


    /**
     * UPDATE
     * @param {string} url
     * @param {object} data
     */

    let PUT = function (url, data) {
        return _call(url, data, 'PUT');
    };

    return {
        GET: GET,
        POST: POST,
        DEL: DEL,
        PUT: PUT
    };

})(jQuery, cookieBakery);
