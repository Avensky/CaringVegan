const productRepository = require('../repository')
exports.createProduct = async (req, res) => {
    console.log(req.file)
    // var ab = req.body.avatar.replace('C:\\fakepath\\','');
    try {
        let payload = {
            name        : req.body.name,
            desc        : req.body.desc,
            price       : req.body.price,
            priceid     : req.body.priceId,
            quantity    : req.body.quantity,
            //image       : req.file.path,
            //imageName   : req.body.imageName,
            imageData   : req.file.path,
        }
       
        let product = await productRepository.createProduct({
            ...payload
        });
        //res.json({status: true,data: product,})
        res.redirect('/shop')
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
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