'use strict';
const library = (function () {
    const fire = require('./fire');

    const firebaseAuth = fire.firebaseAuth;
    const APP_ID = process.env.REACT_APP_FB_APP_ID;
    const DASHBOARD_URL = "https://www.githelpers.com/dashboard";

    const _getRoute = function(route) {
        return `${graphUrl}${route}&access_token=${accessToken}`
    }

    function getFacebookId() {
        const route = '/me?fields=id,name'
        return axios.get(_getRoute(route)).then(response => response.data);
    }

    function getFriendsList(userId) {
        const route = `/${userId}/friends`;
        return axios.get(_getRoute(route)).then(response => response.data);
    }

    function shareIssueDialog(issue) {
        const title = issue.title;
        const issueUrl = issue.html_url;
        const route = `http://www.facebook.com/dialog/send?app_id=${APP_ID}&amp;link=${issueUrl}&amp;redirect_uri=${DASHBOARD_URL}`;
        return axios.get(route).then(response => response.data);
    }


    // TODO: add facebook graph api object using token (or api calls).

    return {
        getFacebookId: getFacebookId,
        getFriendsList: getFriendsList,
        shareIssueDialog: shareIssueDialog
    }

})();
module.exports = library;

