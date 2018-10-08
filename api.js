const api = (function (rest, cookieBakery) {

    let vars = {
        apiUrl: 'api.angelhernandez.net',
        authToken: cookieBakery.getCookieVal('Authorization')
    }


    /**
     * USER MANAGEMENT 
     */

    let user = {
        login: function (data) {
            var url = vars.apiUrl + '/login';
            return rest.POST(url, data);
        },
        info: function (data) {
            var url = vars.apiUrl + '/login/user';
            return rest.PUT(url, data);
        },
        forgotPassword: function (data) {
            var url = vars.apiUrl + '/login/password-reset';
            return rest.POST(url, data);
        }
    };


    /**
     * DOMAIN MANAGEMENT
     */

    let domain = {
        get: function (domainId) {
            return rest.GET(vars.apiUrl + '/domain/' + domainId);
        },
        create: function (data) {
            var url = vars.apiUrl + '/domain/';
            return rest.POST(url, data);
        },
        edit: function (domainId, data) {
            var url = vars.apiUrl + '/domain/edit' + domainId;
            return rest.PUT(url, data);
        },
        assign: function(domainId, data) {
            var url = vars.apiUrl + '/domain/assign' + domainId;
            return rest.PUT(url, data);
        },
        delete: function (domainId) {
            return rest.DEL(vars.apiUrl + '/domain/' + domainId);
        }
    };


    /**
     * CONTENT MANAGEMENT
     */

    let content = {
        get: function (contentId) {
            return rest.GET(vars.apiUrl + '/content/' + contentId);
        },
        create: function (data) {
            var url = vars.apiUrl + '/content';
            return rest.POST(url, data)
        },
        edit: function (data, contentId) {
            var url = vars.apiUrl + '/content/' + contentId;
            return rest.PUT(url, data);
        },
        delete: function (contentId) {
            var url = vars.apiUrl + '/content';
            return rest.DEL(url, contentId);
        }
    };



    /**
     * PRODUCT MANAGEMENT
     */

    let product = {
        get: function (productId) {
            return rest.GET(vars.apiUrl + '/product/' + productId);
        },
        create: function (data) {
            var url = vars.apiUrl + '/product/';
            return rest.POST(url, data)
        },
        assign: function(arr) {
            var url = vars.apiUrl + '/product/assign';
            return rest.POST(url, arr);
        },
        update: function (data, productId) {
            var url = vars.apiUrl + '/product/update/' + productId;
            return rest.PUT(url, data);
        },
        delete: function (productId) {
            return rest.DEL(vars.apiUrl + '/product/' + productId);
        },
    };


    return {
        vars: vars,
        user: user,
        domain: domain,
        content: content,
        product: product,
    };

})(rest, cookieBakery);
