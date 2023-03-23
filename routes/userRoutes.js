const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
// require('dotenv').config();
JWT_SECRET_KEY='testing';
JWT_SECRET_KEY_RESETPASSWORD='pleaseResetPassword';
JWT_SECRET_KEY_EMAILVERIFY = 'emailVerified';
SENDGRID_API_KEY='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';
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

//add a new student to the db
router.post('/register', async (req,res,next) => {
    try{
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await new User({
            companyName: req.body.companyName,
            mailId: req.body.mailId,
            password: hashedPassword,
            contact: req.body.contact,
            category: req.body.category,
            location: req.body.location
        }).save();

        console.log({user});

        if (user) {
            const token = jwt.sign({
                mailId: user.mailId,
                id: user._id},
                process.env.JWT_SECRET_KEY,
                {expiresIn: 600}
            )

            const url = `http://localhost:4000/confirmation/${token}`
            const msg = {
                from: 'texdiary@gmail.com',
                to: `${req.body.mailId}`,
                subject: "Confirmation Mail: ",
                html: `<b>Hello ${req.body.companyName}, you have registered at Textile Diary.<br> Click on the following URL link to confirm your Mail Id: <a href = ${url}> ${url} </a> <br> <b>THIS URL EXPIRES IN 10 MINUTES.</b></b>`
            };
            const sendMail = await sgMail.send(msg);
            if (sendMail) {
                // await sgMail.send(msg);
                console.log({sendMail});
            }

            res.status(200).json({
                message: 'Registered Successfully',
                token
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


//User login post request
router.post('/login', async (req,res,next) => {
    User.findOne({mailId: req.body.mailId}, function(err, userData){
        try{
            if(userData === null)
            {
                console.log("Invalid E-mail ID");
                return res.status(401).json({
                    message: "Invalid E-mail ID" 
                });
            }
            else if(!userData.isVerified){
                console.log("Email Id not verified");
                return res.status(401).json({ message: "Email Id not verified"});
            }
            else{
                // try {
                    if ( bcrypt.compareSync(req.body.password, userData.password)) {
                        const token = jwt.sign(
                            {mailId: userData.mailId, id: userData._id},    
                            process.env.JWT_SECRET_KEY, 
                            {expiresIn: '1h'})  
                        console.log(userData);
                        return res.status(200).json({ 
                            message: "LOGIN SUCCESSFUL",
                            token: token,
                            expiresIn: 3600,
                            user: userData
                        })
                    }
                    else {
                        return res.status(401).json({ message: 'Invalid Password'})
                    }
                // }
                // catch{
                //     console.log(err)
                // }
            }
        }   catch{
                console.log(err);
                return res.status(500).send(err)
            }
    });
});

// EMail verification
router.post('/confirmation/:token', async(req,res,next) => {
    
    try{
        // const token = req.headers.authorization.split(' ')[1];
        const token = req.params.token;
        console.log(token);
        const decodedToken = jwt.verify(token , JWT_SECRET_KEY_EMAILVERIFY);

        let updatedUser = await User.findOneAndUpdate({mailId: decodedToken.mailId}, {isVerified:true}, {new:true});
            return res.status(200).json({
                message: "Email Confirmed",
                updatedUser
            })            
    }
    catch(err){

        console.log({err});
        res.status(500).json({
        message: err
        });
    }
})

// Forgot password
router.post('/forgotPassword', async (req,res,next) => {
    try{

        User.findOne({mailId: req.body.mailId}, async function(err, userData){
            if(userData === null)
            {
                console.log("No account with that email address exists.");
                return res.status(401).json({
                    message: "No account with that email address exists." 
                });
            }
            else if(!userData.isVerified){
                console.log("Email Id not verified");
                return res.status(401).json({ message: "Email Id not verified"});
            }
            else{
                if (userData) {
                    const token = jwt.sign({
                        mailId: userData.mailId,
                        id: userData._id},
                        process.env.JWT_SECRET_KEY_RESETPASSWORD,
                        {expiresIn: 600}
                    )
        
                    const url = `http://localhost:4000/resetPassword/${token}`
                    const msg = {
                        from: 'texdiary@gmail.com',
                        to: `${req.body.mailId}`,
                        subject: "Reset Password: ",
                        html: `<b>Hello ${req.body.firstName},<br> Click on the following URL link to reset your password: <a href = ${url}> ${url} </a> <br> <b>THIS URL EXPIRES IN 10 MINUTES.</b></b>`
                    };
                    const sendMail = await sgMail.send(msg);
                    if (sendMail) {
                        // await sgMail.send(msg);
                        console.log({sendMail});
                    }
                    
                    return res.status(201).json({ 
                        message: "A link is sent your email to reset password.",
                        token 
                    });
                }
            }
        });
    }
    catch(err) {
        console.log({err});
        res.status(500).json({
        message: err
        });
    }
});

// Reset password
router.post('/resetPassword/:token', async(req,res,next) => {
    // console.log(req.params.token);

    // const token = req.headers.authorization.split(' ')[1];
    const token = req.params.token;
        // console.log(token);
    const decodedToken = jwt.verify(token , JWT_SECRET_KEY_RESETPASSWORD);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try{

        let updatedUser = await User.findOneAndUpdate( {mailId:decodedToken.mailId}, {password:hashedPassword}, {new:true});
        return res.status(201).json({
                message: "Password changed successfully",
                updatedUser
            }
        );
    }
    catch(err) {
        console.log({err});
        res.status(500).json({
        message: err
        });
    }
    
})

// Get my Profile
router.post('/editProfile/:id', checkAuth, async(req,res,next) => {
    
    try{
        let updatedUser = await User.findByIdAndUpdate( req.userData.id, req.body, {new:true});
        return res.status(201).json({
                message: "Profile updated successfully",
                updatedUser
            }
        );
    }
    catch(err) {
        console.log({err});
        res.status(500).json({
        message: err
        });
    }
})


module.exports = router;