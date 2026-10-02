const cache = {};

function invalidateCache() {
    for (const key in cache) {
        delete cache[key];
    }
}

module.exports = {
    cache,
    invalidateCache
};
