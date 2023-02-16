const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    headline: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    company_name: {
        type: String,
        required: true,
    },
    company_description: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    applicants: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }]
});

const Ad = mongoose.model('Ad',adSchema);

module.exports = Ad;