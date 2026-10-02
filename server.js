const express = require('express');

const app = express();
const port = 3000;

const productRoutes = require('./src/routes/productRoutes');

app.use(express.json());

app.use('/products', productRoutes);

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        message: 'Internal Server Error'
    });
});

app.listen(port, () => {
    console.log(`server is running on localhost:${port}`);
});
