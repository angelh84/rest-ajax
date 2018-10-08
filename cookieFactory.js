/* --------------- COOKIE BAKERY CLASS ------------------ */

var cookieBakery = (function () {

    var bake = function (cookie, expiryDays) {
        var dateFunc = new Date();
        dateFunc.setTime(dateFunc.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + dateFunc.toUTCString();
        document.cookie = cookie + ";" + expires + ";path=/";
    };

    var eat = function (cookie) {
        var expires = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
        document.cookie = cookie + "=;" + expires + ";path=/";
    };

    var check = function (name) {
        var cookie = document.cookie;
        var prefix = name + "=";
        var begin = cookie.indexOf("; " + prefix);
        if (begin == -1) {
            begin = cookie.indexOf(prefix);
            if (begin != 0) return null;
        } else {
            begin += 2;
            var end = document.cookie.indexOf(";", begin);
            if (end == -1) {
                end = cookie.length;
            }
        }
        return unescape(cookie.substring(begin + prefix.length, end));
    } 

    var getCookieVal = function (cookieName) {
        var cookieJar = [];
        var temp = document.cookie.split(";");
        var key = "";
        var val = "";
        for (i = 0; i < temp.length; i++) {
            key = temp[i].split("=")[0].trim();
            val = temp[i].split("=")[1];
            cookieJar[key] = val;
        }
        return cookieJar[cookieName];
    };

    return {
        bake: bake,
        eat: eat,
        check: check,
        getCookieVal: getCookieVal
    }

})();


/* -------------------- COOKIE AUTH MANAGEMENT --------------------- */



(function(){
    var userCookie = cookieBakery.check('uid');
    var noRedirect = [
        '/login.html',
        '/login_password_recover.html',
        '/login_password_confirm.html'
    ].filter(url => url === window.location.pathname)

    if (userCookie === null && noRedirect.length === 0) {
        window.location.href = '/login.html';
    };
    
    // Adds display name from cookie info to top right account name
    document.addEventListener("DOMContentLoaded", function() {
        if ( document.querySelector('.displayName') !== null && userCookie !== null ) {
            document.querySelector('.displayName').innerHTML = cookieBakery.getCookieVal('display_name');
        }
    });
})();