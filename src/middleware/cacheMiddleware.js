const path = require('path');
const pathToFile = path.join(__dirname, './cache')
const { cache } = require(pathToFile);

const TTL = 60 * 1000;

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;
    const value = cache[key];

    if (value) {
        const age = Date.now() - value.createdAt;

        if (age < TTL) {
            res.setHeader('X-Cache', 'HIT');
            return res.json(value.data);
        }

        delete cache[key];
    }

    res.setHeader('X-Cache', 'MISS');

    res.locals.cacheKey = key;

    next();
}

module.exports = cacheMiddleware;
