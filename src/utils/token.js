'use strict';
const library = (function () {

    const githubClientId = process.env.REACT_APP_GIT_CLIENT_ID
    const githubSecret = process.env.REACT_APP_GIT_SECRET
    const githubRedirectUrl = "/dashboard";
    const githubScope = "user:email,read:user,notifications,read:repo_hook,repo"

    console.log('clientId', githubClientId)
    console.log('secret', githubSecret)
    console.log('scope', githubScope)

    return {
        githubClientId: githubClientId,
        githubSecret: githubSecret,
        githubRedirectUrl: githubRedirectUrl,
        githubScope: githubScope
    };

})();
module.exports = library;

