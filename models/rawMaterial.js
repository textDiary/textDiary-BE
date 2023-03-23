const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create ProductsList Schema & Models
const ProductsListSchema = new Schema({

    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    orderedUnits: Number
})

// create RawMaterial Schema & Models
const RawMaterialSchema = new Schema({

    orderTakenCompanyId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    productsList: [ ProductsListSchema ],
    status: String,
    deliveryDate: Date,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const RawMaterial = mongoose.model('RawMaterial', RawMaterialSchema);
module.exports = RawMaterial;