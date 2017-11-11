'use strict';
const library = (function () {
    var GitHub = require('github-api');

    // Github api object.
    // https://github.com/github-tools/github
    var gh;

    const initializeWithToken = (token) => {
        gh = new GitHub({
            token: token
        });
    }

    const initialize = (user, pass) => {
        gh = new GitHub({
            username: user,
            password: pass
            /* also acceptable:
               token: 'MY_OAUTH_TOKEN'
             */
        });
    }

    return {
        initialize: initialize,
        initializeWithToken: initializeWithToken,
        gh: gh
    }

})();
module.exports = library;

