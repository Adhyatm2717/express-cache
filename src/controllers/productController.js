
const {
    getAllProducts,
    getProductsByID
} = require('../services/productService');

const { cache } = require('../middleware/cache');

async function getAllProductsController(req, res, next) {
    try {
        const products = await getAllProducts();

        const key = res.locals.cacheKey;

        cache[key] = {
            data: products,
            createdAt: Date.now()
        };

        res.json(products);
    } catch (err) {
        next(err);
    }
}

async function getAllProductsControllerById(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'Invalid Product ID'
            });
        }

        const product = await getProductsByID(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product Not Found'
            });
        }

        const key = res.locals.cacheKey;

        cache[key] = {
            data: product,
            createdAt: Date.now()
        };

        res.json(product);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllProductsController,
    getAllProductsControllerById
};
