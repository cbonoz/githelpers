const library = (function () {

    const githubClientId = process.env.REACT_APP_GIT_CLIENT_ID
    const githubSecret = process.env.REACT_APP_GIT_SECRET
    const githubTestToken = process.env.REACT_APP_GIT_AUTH_TEST;
    const githubRedirectUrl = "/dashboard";
    const githubScope = "user:email,read:user,read:repo_hook,public_repo"

    // console.log('clientId', githubClientId)
    // console.log('secret', githubSecret)
    // console.log('scope', githubScope)
    // console.log('testToken', githubTestToken);

    return {
        githubClientId: githubClientId,
        githubSecret: githubSecret,
        githubRedirectUrl: githubRedirectUrl,
        githubScope: githubScope,
        githubTestToken: githubTestToken
    };

})();
module.exports = library;

