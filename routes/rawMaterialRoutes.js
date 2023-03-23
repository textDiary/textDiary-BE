const express = require('express');
const RawMaterial = require('../models/rawMaterial');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
require('dotenv').config();

//add a new rawMaterial to the db
router.post('/newRawMaterial/:orderTakenCompanyId', checkAuth, async (req,res,next) => {
    try{

        const rawMaterial = await new RawMaterial({
            orderTakenCompanyId: req.params.orderTakenCompanyId,
            productsList: req.body.productList,
            status: req.body.status,
            deliveryDate: req.body.deliveryDate,
            userId: req.userData.id
        }).save();

        console.log({rawMaterial});
        if (rawMaterial) {

            res.status(201).json({
                message: 'RawMaterial added successfully.',
                rawMaterial
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

/*
// Update RawMaterial
router.post('/updateRawMaterial/:id', async(req,res,next) => {

    // console.log('User Id:::',req.params.userId);

    try{
        let updatedRawMaterial = await RawMaterial.findByIdAndUpdate( req.params.id, {status: req.body.status}, {new:true});
        console.log(updatedRawMaterial);
        if(updatedRawMaterial){
            return res.status(201).json({
                message: "Status updated successfully",
                updatedRawMaterial
            });   
        }
    }
    catch(err) {
        console.log({err});
        res.status(500).json({
        message: err
        });
    }
}) */

// Get RawMaterials
router.get('/getRawMaterials', checkAuth, async(req,res,next) => {

    // console.log('User Id:::',req.params.userId);

    try{
        let rawMaterialList = await RawMaterial.find( {userId:req.userData.id} )
        console.log(rawMaterialList);
        if(rawMaterialList.length === 0 ){

            return res.status(503).json({
                message: "No Raw Materials for the Company",
            });
        }
        else if(rawMaterialList){
            return res.status(200).json({
                message: "Raw Materials fetched successfully",
                rawMaterialList
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

// Get particular RawMaterial
router.get('/getOneRawMaterial/:rawMaterialId', checkAuth, async(req,res,next) => {

    // console.log('User Id:::',req.params.userId);

    try{
        let rawMaterial = await RawMaterial.findById( req.params.rawMaterialId )
        console.log(rawMaterial);
        if(rawMaterial === null){

            return res.status(503).json({
                message: "Raw Material not found",
            });
        }
        else if(rawMaterial){
            return res.status(200).json({
                message: "Raw Material fetched successfully",
                rawMaterial
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