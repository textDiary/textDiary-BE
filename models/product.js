const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Product Schema & Models
const ProductSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is required']
    },
    availability: Number,
    unit: String,
    image: String,
    descriptions: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderUserId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, defaultValue: 'Not Yet Assinged'},
    deliveryDate: { type: Date },
    category: String,
},  { timestamps: true })

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product; 