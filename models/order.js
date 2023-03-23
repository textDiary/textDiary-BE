const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create ProductsList Schema & Models
const ProductsListSchema = new Schema({

    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    orderedUnits: Number
})

// create Order Schema & Models
const OrderSchema = new Schema({

    orderFromCompanyId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    productsList: [ ProductsListSchema ],
    status: String,
    deliveryDate: Date,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order; 