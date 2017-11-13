'use strict';
const library = (function () {
    var GitHub = require('github-api');

    // Github api object.
    // https://github.com/github-tools/github
    const gh = new GitHub();

    function logout() {
        gh.__auth.token = null;
    }

    return {
        gh: gh
    }

})();
module.exports = library;

