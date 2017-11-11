'use strict';
const library = (function () {
    const getRandom = (items) => {
        return items[Math.floor(Math.random()*items.length)];
    }

    const formatDateTimeMs = (timeMs) => {
        const date = new Date(timeMs);
        return `${date.toDateString()} ${date.toLocaleTimeString()}`;
    }

    const exampleEvent = {name: "John Doe registered a new account.", time: formatDateTimeMs(Date.now())};

    return {
        getRandom: getRandom,
        exampleEvent: exampleEvent,
        formatDateTimeMs: formatDateTimeMs
    }

})();
module.exports = library;

