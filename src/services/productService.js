const path = require('path');
const pathToProdRepo = path.join(__dirname, '../database/productRepository.js')
const { readData } = require(pathToProdRepo)

async function delayfor(time){
    return new Promise ((res, rej) =>{
        setTimeout(res, time)
    })
}

async function getAllProducts(){
    await delayfor(1500);
    return await readData()
}

async function getProductsByID(id){
    await delayfor(1500)
    const products = await readData()
    return products.find((item)=>item.id===id);

}

module.exports = {
    getAllProducts,
    getProductsByID
}
