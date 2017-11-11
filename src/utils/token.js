'use strict';
const library = (function () {

    const githubClientId = process.env.REACT_APP_GIT_CLIENT_ID
    const githubSecret = process.env.REACT_APP_GIT_SECRET
    const githubRedirectUrl = "/dashboard";

    console.log('clientId', githubClientId)
    console.log('secret', githubSecret)

    return {
        githubClientId: githubClientId,
        githubSecret: githubSecret,
        githubRedirectUrl: githubRedirectUrl
    };

})();
module.exports = library;

