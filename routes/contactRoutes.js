const express = require('express');
const User = require('../models/user');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
require('dotenv').config();

// Add to company contacts
router.post('/addToCompanyContacts/:contactId', checkAuth, async (req,res,next) => {
    try{

        let user = await User.findById(req.userData.id);

        user.companyContacts.push(req.params.contactId);
        const updatedUser = await user.save();

        console.log({updatedUser});
        if (updatedUser) {

            res.status(201).json({
                message: 'Contact added succesfully.',
                updatedUser
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

// Remove Company Contacts
router.post('/removeCompanyContact/:contactId', checkAuth, async(req,res,next) => {

    // console.log('User Id:::',req.params.userId);

    try{
        let user = await User.findById( req.userData.id );
        console.log(user);

        let contactIndex = user.companyContacts.indexOf(req.params.contactId);

        if(contactIndex === -1){

            return res.status(202).json({
                message: "Contact not found",
            });
        }
        else{

            user.companyContacts.splice(contactIndex,1);
            const updatedUser = await user.save();
            console.log(updatedUser);

            if(updatedUser){
                return res.status(202).json({
                    message: "Contact removed successfully",
                    updatedUser
                });   
            }
        }
    }
    catch(err) {
        console.log({err});
        res.status(500).json({
        message: err
        });
    }
})

// Remove Service Contacts
router.post('/removeServiceContact/:contactId', checkAuth, async(req,res,next) => {

    // console.log('User Id:::',req.params.userId);

    try{
        let user = await User.findById( req.userData.id );
        console.log(user);

        let contactIndex = user.serviceContacts.indexOf(req.params.contactId);

        console.log(contactIndex);

        if(contactIndex === -1){

            console.log("Contact not found");
            return res.status(202).json({
                message: "Contact not found",
            });   
        }
        else{
            user.serviceContacts.splice(contactIndex,1);
            const updatedUser = await user.save();
            console.log(updatedUser);

            if(updatedUser){
                return res.status(202).json({
                    message: "Contact removed successfully",
                    updatedUser
                });   
            }
        }
    }
    catch(err) {
        console.log({err});
        res.status(500).json({
        message: err
        });
    }
})

// Get Contact
router.get('/getContact/:contactId', checkAuth, async(req,res,next) => {

    try{
        let contactUser = await User.findById( {_id:req.params.contactId} )
        console.log(contactUser);

        if(contactUser){
            return res.status(200).json({
                message: "Contact fetched successfully",
                contactUser
            });   
        }
        else{
            return res.status(503).json({
                message: "Contact not found!!!",
                
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

// Get all Company Contacts
// router.get('/getCompanyContacts/:contactId', checkAuth, async(req,res,next) => {

//     try{
//         let contactUser = await User.find( {_id: {"$in": contactList} } )
//         console.log(contactUser);

//         if(contactUser){
//             return res.status(200).json({
//                 message: "Contact fetched successfully",
//                 contactUser
//             });   
//         }
//         else{
//             return res.status(503).json({
//                 message: "Contact not found!!!",
                
//             });
//         }
//     }
//     catch(err) {
//         console.log({err});
//         res.status(500).json({
//         message: err
//         });
//     }
// })

// Add Service Contacts to Contact list
router.post('/addToServiceContacts/:contactId', checkAuth, async (req,res,next) => {
    try{

        let user = await User.findById(req.userData.id);

        user.serviceContacts.push(req.params.contactId);
        const updatedUser = await user.save();

        console.log({updatedUser});
        if (updatedUser) {

            res.status(201).json({
                message: 'Contact added succesfully.',
                updatedUser
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

module.exports = router;