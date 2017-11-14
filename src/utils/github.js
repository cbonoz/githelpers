'use strict';
const library = (function () {
    
    // reduces the full rawIssue from the github api response into a smaller stored object for the githelpers db,
    // using the id index to detect duplicates.
    function createIssueObject(rawIssue) {
        // TODO: reduce rawIssue (remove extra components).
        return rawIssue;
    }

    function isGithelperIssue(issue) {
        var hasLabel = false;
        console.log(issue.labels);
        return true;
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
        createIssueObject: createIssueObject
    }

})();
module.exports = library;

