const express = require('express');
const Product = require('../models/product');
const User = require('../models/user');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
require('dotenv').config();

const products = {
    ginning: [
        'https://www.heddels.com/wp-content/uploads/2011/06/Ginning2.jpg',
        'https://i0.wp.com/textiletutorials.com/wp-content/uploads/2016/12/Ginning-Process-in-Textile.jpg?fit=450%2C300&ssl=1',
        'https://acmeyarns.com/wp-content/uploads/2020/07/gn-2.jpg',
        'https://www.shutterstock.com/image-photo/cotton-lint-after-ginning-raw-260nw-2199856991.jpg',
        'https://www.shutterstock.com/image-photo/komotini-greece-october-12-2018-260nw-1214358145.jpg'
    ],
    spinning: [
        'https://indiantextilejournal.com/wp-content/uploads/2022/04/roter-spining.jpg',
        'https://assets.thehansindia.com/h-upload/2022/10/10/1600x960_1315787-spinning-mills.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM5bqiKxCk0STVXlj3J3l6bS7LGcqC2AMzXs5p8vyfX_dE3BmTDmcl45HAmB7_RsX2618&usqp=CAU',
        'https://cdn.textileschool.com/wp-content/uploads/2011/09/ring-spinning-machines.jpg',
        'https://static.fibre2fashion.com/Newsresource/images/282/20029363-m_294200.jpg'
    ],
    weaving: [
        'https://img.etimg.com/thumb/width-1200,height-900,imgsize-961164,resizemode-1,msid-68716260/magazines/panache/how-handloom-sarees-are-weaving-a-storm-in-bengaluru.jpg',
        'https://st2.depositphotos.com/2166105/8175/i/600/depositphotos_81751186-stock-photo-traditional-weaving-hand-loom.jpg',
        'https://images.unsplash.com/photo-1569909115134-a0426936c879?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2VhdmluZyUyMGxvb218ZW58MHx8MHx8&w=1000&q=80',
        'https://media.istockphoto.com/id/183425266/photo/rainbow-colored-threads-on-a-loom.jpg?b=1&s=170667a&w=0&k=20&c=1Q3ShcGkAT1lYrkamSzDrujbtLexFuQ3254DP_56JI4=',
        'https://media.istockphoto.com/id/183425266/photo/rainbow-colored-threads-on-a-loom.jpg?b=1&s=170667a&w=0&k=20&c=1Q3ShcGkAT1lYrkamSzDrujbtLexFuQ3254DP_56JI4='
    ],
    fabric: [
        'https://cdn.textileschool.com/wp-content/uploads/2011/06/9528885740_0d0f6b2e30_k.jpg',
        'https://textilevaluechain.in/wp-content/uploads/2021/08/Sustainability-in-Textile-Finishing-Techniques.jpg',
        'https://fashinza.com/textile/wp-content/uploads/2022/04/shutterstock_1672948954.jpg',
        'https://fashinza.com/textile/wp-content/uploads/2022/03/shutterstock_1961147416-1280x720.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxq1qE_2s8q0mQHGvgxl8hDu90SNlwf9rOfOjxdYixQCvzQoQqtBMH5LbSQVzkZzMw6VM&usqp=CAU'
    ],
    apparelMaking: [
        'https://cdn.textileschool.com/wp-content/uploads/2011/06/9528885740_0d0f6b2e30_k.jpg',
        'https://textilevaluechain.in/wp-content/uploads/2021/08/Sustainability-in-Textile-Finishing-Techniques.jpg',
        'https://fashinza.com/textile/wp-content/uploads/2022/04/shutterstock_1672948954.jpg',
        'https://fashinza.com/textile/wp-content/uploads/2022/03/shutterstock_1961147416-1280x720.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxq1qE_2s8q0mQHGvgxl8hDu90SNlwf9rOfOjxdYixQCvzQoQqtBMH5LbSQVzkZzMw6VM&usqp=CAU'
    ],
    serviceProvider: [
        'https://cdn.textileschool.com/wp-content/uploads/2011/06/9528885740_0d0f6b2e30_k.jpg',
        'https://textilevaluechain.in/wp-content/uploads/2021/08/Sustainability-in-Textile-Finishing-Techniques.jpg',
        'https://fashinza.com/textile/wp-content/uploads/2022/04/shutterstock_1672948954.jpg',
        'https://fashinza.com/textile/wp-content/uploads/2022/03/shutterstock_1961147416-1280x720.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxq1qE_2s8q0mQHGvgxl8hDu90SNlwf9rOfOjxdYixQCvzQoQqtBMH5LbSQVzkZzMw6VM&usqp=CAU'   
    ],
    accessoriesProvider: [
        'https://cdn.textileschool.com/wp-content/uploads/2011/06/9528885740_0d0f6b2e30_k.jpg',
        'https://textilevaluechain.in/wp-content/uploads/2021/08/Sustainability-in-Textile-Finishing-Techniques.jpg',
        'https://fashinza.com/textile/wp-content/uploads/2022/04/shutterstock_1672948954.jpg',
        'https://fashinza.com/textile/wp-content/uploads/2022/03/shutterstock_1961147416-1280x720.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxq1qE_2s8q0mQHGvgxl8hDu90SNlwf9rOfOjxdYixQCvzQoQqtBMH5LbSQVzkZzMw6VM&usqp=CAU'
    ]
}
//add a new product to the db
router.post('/newProduct', checkAuth, async (req,res,next) => {
    try{
        const user = await User.findById(req.userData.id);
        const product = await new Product({
            name: req.body.name,
            availability: req.body.availability,
            unit: req.body.unit,
            userId: req.userData.id,
            image: products[user.category][Math.floor(Math.random() * 4)],
            category: req.body.category
            // image: 
        }).save();

        console.log({product});
        if (product) {

            res.status(201).json({
                message: 'Product added successfully.',
                product
            })
        }
    }
    catch(err) {
        console.log({err});
        res.status(500).json({
        message: err
        });
    }
});

// Update Product
router.post('/updateProduct/:productId', checkAuth, async(req,res,next) => {

    // console.log('User Id:::',req.params.userId);

    try{
        let updatedProduct = await Product.findByIdAndUpdate( req.params.productId, {
                                                                name: req.body.name,
                                                                availability: req.body.availability,
                                                                unit: req.body.unit
                                                                },
                                                                {new:true}
                                                            );
        console.log(updatedProduct);
        if(updatedProduct){
            return res.status(201).json({
                message: "Product updated successfully",
                updatedProduct
            });   
        }
    }
    catch(err) {
        console.log({err});
        res.status(500).json({
        message: err
        });
    }
})

// Delete Product
router.delete('/deleteProduct/:productId', checkAuth, async(req,res,next) => {

    // console.log('User Id:::',req.params.userId);

    try{
        let deletedProduct = await Product.findByIdAndDelete( req.params.productId );
        console.log(deletedProduct);
        if(deletedProduct){
            return res.status(202).json({
                message: "Product deleted successfully",
                deletedProduct
            });   
        }
    }
    catch(err) {
        console.log({err});
        res.status(500).json({
        message: err
        });
    }
})

// Get Products
router.get('/getProducts', checkAuth, async(req,res,next) => {

    // console.log('User Id:::',req.params.userId);

    try{
        let productList = await Product.find( {userId:req.userData.id} )
        console.log(productList);
        if(productList === null){

            return res.status(200).json({
                message: "No products created for the Company",
            });
        }
        else if(productList){
            return res.status(200).json({
                message: "Products fetched successfully",
                productList
            });   
        }
    }
    catch(err) {
        console.log({err});
        res.status(500).json({
        message: err
        });
    }
})


router.get('/getAllProducts', checkAuth, async(req,res,next) => {

    // console.log('User Id:::',req.params.userId);

    try{
        console.log('userId', req.userData)
        let productList = await Product.find({ userId: {$ne: req.userData.id} }).populate('userId')
        console.log({productList});
        console.log(productList[0].userId)
        if(productList === null){   

            return res.status(200).json({
                message: "No products created for the Company",
            });
        }
        else if(productList){
            return res.status(200).json({
                message: "Products fetched successfully",
                productList
            });   
        }
    }
    catch(err) {
        console.log({err});
        res.status(500).json({
        message: err
        });
    }
})


router.put('/assignTo', checkAuth, async (req, res, next) => {
    try {
        const updatedProduct = await Product.updateOne({ _id: req.body.productId}, {
            orderUserId: req.userData.id,
            status: 'in_progress'
        })
        console.log({updatedProduct});
        return res.status(200).json({
            message: 'Order placed'
        })
    } catch(err) {
        res.status(500).json({
            message: err
        });
    }
})


router.get('/placedOrder', checkAuth, async(req, res, next) => {
    try {
        const placedOrder = await Product.find({ orderUserId: req.userData.id });
        console.log({placedOrder});
        return res.status(200).json({
            message: 'order Placed Successfully',
            data: placedOrder
        })
    } catch(err) {
        res.status(500).json({
            message: err
        });
    }
})


router.get('/requestedOrder', checkAuth, async(req, res, next) => {
    try {
        const requestedOrder = await Product.find({ userId: req.userData.id, status: 'in_progress' }).populate('userId') ;
        console.log({requestedOrder});
        return res.status(200).json({
            message: 'Requested order fetched Successfully',
            data: requestedOrder
        })
    } catch(err) {
        res.status(500).json({
            message: err
        });
    }
})


router.post('/acceptOrder', checkAuth, async(req, res, next) => {
    try {
        console.log(req.body);
        const updatedProduct = await Product.updateOne({ _id: req.body.productId}, {
            status: 'accepted',
            deliveryDate: req.body.deliveryDate
        })
        console.log({updatedProduct});
        return res.status(200).json({
            message: 'Order Accepted'
        })
    } catch(err) {
        res.status(500).json({
            message: err
        });
    }
})

router.get('/getAcceptedProducts', checkAuth, async(req, res, next) => {
    try {
        const product = await Product.find({ userId: req.userData.id, status: 'accepted'})
        return res.status(200).json({
            data: product,
            message: 'Product Fetched Successfully'
        })
    } catch(err) {
        res.status(500).json({
            message: err
        });
    }
})


router.post('/addContact', checkAuth, async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.userData.id});
        user.companyContacts.push(req.body.companyId);
        console.log('companyContact', user.companyContacts);
        const updateUser = await User.updateOne({ _id: req.userData.id}, {
            companyContacts: user.companyContacts
        })
        return res.status(200).json({
            data: product,
            message: 'Product Fetched Successfully'
        })
    } catch(err) {

    }
});


router.get('/serviceProvider', checkAuth, async (req, res, next) => {
    try {
        const user = await User.find({ category: 'serviceProvider' });
        return res.status(200).json({
            data: user,
            message: 'Product Fetched Successfully'
        })
    } catch(err) {

    }
});


module.exports = router;