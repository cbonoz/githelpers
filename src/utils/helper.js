'use strict';
const library = (function () {
    const getRandom = (items) => {
        return items[Math.floor(Math.random()*items.length)];
    }

    return {
        getRandom: getRandom
    }

})();
module.exports = library;

