const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const contactRoutes = require('./routes/contactRoutes');
const rawMaterialRoutes = require('./routes/rawMaterialRoutes');
const orderRoutes = require('./routes/orderRoutes');

// set up express app
const app = express();

mongoose.set('strictQuery', true);

const url = "mongodb+srv://tex_admin:admin123@cluster0.0jfuvdu.mongodb.net/?retryWrites=true&w=majority";

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true 
}

mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

// mongoose.connection.close()
//     .then( () => {
//         console.log('Disconnected from the database ')
//     })
//     .catch( (err) => {
//         console.error(`Error disconnecting from the database. n${err}`);
//     })

// use body-parser
app.use(bodyParser.json());

//initialize routes
app.use('/api/user/', userRoutes);
app.use('/api/product/',productRoutes);
app.use('/api/contact/',contactRoutes);
app.use('/api/rawMaterial/',rawMaterialRoutes);
app.use('/api/order/',orderRoutes);


//listen for request
app.listen(process.env.port||4000,function(){
    console.log('Now listening for requests');
});