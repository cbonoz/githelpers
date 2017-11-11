'use strict';
const library = (function () {
    var GitHub = require('github-api');

    // Github api object.
    // https://github.com/github-tools/github
    var gh = null;
    // authToken of the current user.
    var authToken = null;

    const initializeWithToken = (token) => {
        console.log('initWithToken', token);
        authToken = token;
        gh = new GitHub({
            token: token
        });
    }

    function logout() {
        gh = null;
        authToken = null;
    }

    const initialize = (user, pass) => {
        gh = new GitHub({
            username: user,
            password: pass
        });
    }

    return {
        initialize: initialize,
        initializeWithToken: initializeWithToken,
        authToken: authToken,
        gh: gh
    }

})();
module.exports = library;

