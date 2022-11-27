const shopController    = require("../controllers/shopController");
const uploadController  = require("../controllers/uploadController");
const mongoose          = require('mongoose')
const Product           = mongoose.model('Product')

module.exports = function(app) {
    app.post("/api/addImage", 
    uploadController.upload.single('avatar'), 
    shopController.createProduct);

   // app.post('/api/getProductById:id', shopController.getProduct)

    app.get("/api/getProducts", shopController.getProducts);

    // app.get("/:id", shopController.getProductById);
    // app.delete("/:id", shopController.removeProduct);

    app.get('/api/items', (req,res) =>{          //get all items info from db
        Product.find({},(err,doc)=>{
            if(doc)
                res.json(doc);
            else {
                res.status(404).send('Ops!'+err)
            }
        })
    });

    app.post('/api/addProduct',(req,res) => {        //add a new item
        // const { title, author, content} = req.body;
        const itemObj = new Product({
            name        : req.body.name,
            desc        : req.body.desc,
        //        itemId : req.body.itemid,
            price       : req.body.price,
            image       : req.body.image,
            quantity    : req.body.quantity,
            type        : req.body.type,
            featured    : req.body.featured,
            date        : new Date()
        })
        // itemObj.save((err)=>{
        //     if(err){
        //     console.log(err);
        //     res.send('Unable to save item data!');
        //     }
        //     else
        //     res.send('item data saved successfully!');
        // })
    });

    app.get('/api/getitemDetails/:itemid',(req,res)=>{              //get a item details
    Product.find({_id : req.params.itemid},{},(err,doc)=>{
        if(doc)
            res.json(doc);
        else {
            res.status(404).send('Ops!Detail not found');
        }
    })
    });   

    app.get('/api/getitemsbytype/:type',(req,res)=>{              //get a item details
    Product.find({type : req.params.type},{},(err,doc)=>{
        if(doc)
            res.json(doc);
        else {
            res.status(404).send('Ops! Items not found');
        }
    })
    });   


    app.get('/api/getitemSearch/',(req,res)=>{              //get a item details
    Product.find({},(err,doc)=>{
        if(doc)
            res.json(doc);
        else {
            res.status(404).send('Ops!Detail not found');
        }
    })
    });   


    app.post('/api/updateitem',(req,res)=>{          //update a item data
        Product.findOneAndUpdate({
            itemId : req.body.id
        },{
            $set:{
                name : req.body.name,
                age : req.body.age,
                relatives : req.body.relatives,
                bio : req.body.bio
            }
        },(err,doc)=>{
            if(doc)
                res.send('Product updated successfully!');
            else {
                res.err(err.message);
            }
        })
    });

    app.delete('/api/deleteitem/:itemid',(req,res)=>{           //delete a perticular item
        Product.findOneAndRemove({_id : req.params.itemid},{},(err,doc)=>{
            if(doc)
                res.json(doc);
            else {
                res.status(404).send('Ops! Product not found');
            }
        })
    });
}



