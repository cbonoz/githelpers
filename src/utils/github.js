const library = (function () {
    const github = require('octonode');
    // reduces the full rawIssue from the github api response into a smaller stored object for the githelpers db,
    // using the id index to detect duplicates.
    function createIssueObject(rawIssue) {
        // TODO: reduce rawIssue (remove extra components).
        return rawIssue;
    }

    const client = github.client();

    function isGithelperIssue(issue) {
        var hasLabel = false;
        for (var i = 0; i < issue.labels.length; i++) {
            if (issue.labels[i]['name'] && issue.labels[i]['name'].toLowerCase() === 'githelpers') {
                hasLabel = true;
                break;
            }
        }

        return hasLabel && issue.state.lower() === 'open';
    }

    return {
        isGithelperIssue: isGithelperIssue,
        createIssueObject: createIssueObject,
        client: client
    }

})();
module.exports = library;

