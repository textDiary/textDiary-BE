const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Location Schema & Models
const LocationSchema = new Schema({

    latitude: {
        type: Number,
        required: [true, 'Latitude is required']
    },
    longitude: {
        type: Number,
        required: [true, 'Longitude is required']
    }
})


// create User Schema & Models
const UserSchema = new Schema({
    
    companyName: {
        type: String,
        required: [true,'Company name is required']
    },
    mailId: {
        type: String,
        required: [true, 'E Mail-ID is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    category: String,
    contact: Number,
    location: { type: LocationSchema },
    isVerified: {type: Boolean, default: true},
    companyContacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false,  unique: false }],
    serviceContacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false,  unique: false }]
})


const User = mongoose.model('User',UserSchema);
module.exports = User; 