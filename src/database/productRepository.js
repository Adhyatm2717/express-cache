const fs = require('fs/promises');
const path = require('path');

const pathToFile = path.join(__dirname, './db.json')

async function readData() {
    const data = await fs.readFile(pathToFile, 'utf-8')
    return JSON.parse(data);

}

async function writeData(products) {
    await fs.writeFile(pathToFile,JSON.stringify(products, null, 2))
}

module.exports = {readData, writeData}