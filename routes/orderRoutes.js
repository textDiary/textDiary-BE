const express = require('express');
const Order = require('../models/order');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
require('dotenv').config();

//add a new Order to the db
router.post('/newOrder/:orderFromCompanyId', checkAuth, async (req,res,next) => {
    try{

        const order = await new Order({
            orderFromCompanyId: req.params.orderFromCompanyId,
            productsList: req.body.productList,
            status: req.body.status,
            deliveryDate: req.body.deliveryDate,
            userId: req.userData.id
        }).save();

        console.log({order});
        if (order) {

            res.status(201).json({
                message: 'Order added successfully.',
                order
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

// Update Order
router.post('/updateOrder/:orderId', checkAuth, async(req,res,next) => {

    // console.log('User Id:::',req.params.userId);

    try{
        let updatedOrder = await Order.findByIdAndUpdate( req.params.orderId, {status: req.body.status}, {new:true});
        console.log(updatedOrder);
        if(updatedOrder){
            return res.status(201).json({
                message: "Status updated successfully",
                updatedOrder
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

// Get All Orders
router.get('/getOrders', checkAuth, async(req,res,next) => {

    // console.log('User Id:::',req.params.userId);

    try{
        let orderList = await Order.find( {userId:req.userData.id} )
        console.log(orderList);
        if(orderList.length === 0){

            return res.status(200).json({
                message: "No Orders for the Company",
            });
        }
        else if(orderList){
            return res.status(200).json({
                message: "Orders fetched successfully",
                orderList
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

// Get particular Order
router.get('/getOneOrder/:orderId', checkAuth, async(req,res,next) => {

    // console.log('User Id:::',req.params.userId);

    try{
        let order = await Order.findById( req.params.orderId )
        console.log(order);
        if(order === null){

            return res.status(503).json({
                message: "Order not found",
            });
        }
        else if(order){
            return res.status(200).json({
                message: "Order fetched successfully",
                order
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

module.exports = router;