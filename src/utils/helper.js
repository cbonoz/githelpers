module.exports = {
    getRandom: (items) => {
        return items[Math.floor(Math.random()*items.length)];
    }
}