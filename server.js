const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const port = 3000;
const pathToFile = path.join(__dirname, './db.json');

let cache = {}

const app = express();
async function readData(){
    let data = await fs.readFile(pathToFile, 'utf-8')
    return JSON.parse(data)
}

async function delayReadData(){
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 1500)
    })
    return await readData();
}

app.get('/products', async(req, res)=>{
    let key = req.url
    let value = cache[key]
    try {
        if (value){
            return res.json(value)
        } else {
            let products = await delayReadData()
            cache[key] = products;
            res.json(products)
        }

    } catch (err) {
        console.log(err)
    }
});

app.get('/products/:id', async(req, res)=>{
    let key =req.url
    let value = cache[key]
    try{
        if (value){
            return res.json(value)
        } else {
            let id = Number(req.params.id)
            let products = await delayReadData()
            let data = products.find(item => item.id === id)
            cache[key]= data;
            res.json(data)
        }
    } catch(err){
        console.log(err)
    }
});

app.listen(port, ()=>{
    console.log(`server is running on localhost:${port}`)
});