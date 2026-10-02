const path = require('path');
const pathToFile = path.join(__dirname, '../services/productService.js')

const {
    getAllProducts,
    getProductsByID
} = require(pathToFile);

async function getAllProductsController(req, res, next){
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch(err){
        next(err)
    }
}

async function getAllProductsControllerById(req, res, next){
    try{
        const id = Number(req.params.id)
        if(!Number.isInteger(id)){
            return res.status(400).json({
                'message': "Invalid Product ID"
            });
        }
        const product = await getProductsByID(id);

        if(!product) {
            return res.status(404).json({
                'message': 'Product Not Found'
            });
        }
        res.json(product)
    } catch(err){
        next(err);
    }
}

module.exports = {
    getAllProductsController,
    getAllProductsControllerById
}
