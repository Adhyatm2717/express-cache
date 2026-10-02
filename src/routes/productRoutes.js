const express = require('express');
const router = express.Router();

const cacheMiddleware = require('../middleware/cacheMiddleware');

const {
    getAllProductsController,
    getAllProductsControllerById
} = require('../controllers/productController');

router.get('/', cacheMiddleware, getAllProductsController);
router.get('/:id', cacheMiddleware, getAllProductsControllerById);

module.exports = router;


