const mongoose  = require('mongoose');
const Product   = mongoose.model('Product');

// exports.getProducts = async () => {
//     const products = await Product.find();
//     return products;
// };
// exports.productById = async id => {
//     const product = await Product.findById(id);
//     return product;
// }
// exports.removeProduct = async id => {
//     const product = await Product.findByIdAndRemove(id);
//     return product
// }

//const Product = require("../models/shop");

exports.createProduct = async (req, res) => {
    console.log('createProduct : ', req.body);
    const productObj = {
        name        : req.body.name,
        desc        : req.body.desc,
        price       : req.body.price,
        priceid     : req.body.priceId,
        quantity    : req.body.quantity,
        featured    : req.body.featured,
        type        : req.body.type,
        imageData   : req.file.key,
    }   
    const newProduct = await Product.create(productObj);
    return res.json(newProduct)
}

exports.getProducts = async (req, res) => {
    try {
        let products = await productRepository.getProducts();
        res.status(200).json({status: true, data: products,})
        //res.status(200).json({products})
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err, status: false,})
    }
}

exports.getProductById = async (req, res) => {
    try {
        let id = req.params.id
        let productDetails = await productRepository.productById(id);
        res.status(200).json({
            status: true,
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}
exports.removeProduct = async (req, res) => {
    try {
        let id = req.params.id
        let productDetails = await productRepository.removeProduct(id)
        res.status(200).json({
            status: true,
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}