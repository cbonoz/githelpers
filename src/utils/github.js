'use strict';
import { Github } from 'github-api';

const library = (function () {

    // Github api object.
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

