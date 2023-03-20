const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    unique_id: {
        type: Number,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true 
    },
    address: {
        type: String,
        required: true
    }
});

const Organization = mongoose.model("Organizations", OrganizationSchema);

module.exports = Organization;