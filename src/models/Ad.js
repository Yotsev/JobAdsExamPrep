const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    headline: {
        type: String,
        required: true,
        minLength: [4, 'Headline must be at least 4 characters long'],
    },
    location: {
        type: String,
        required: true,
        minLength: [8, 'Location must be at least 8 characters long'],
    },
    company_name: {
        type: String,
        required: true,
        minLength: [3, 'Company name must be at least 3 characters long'],
    },
    company_description: {
        type: String,
        required: true,
        maxLength: [40, 'Company description must be no longer than 40 characters'],
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