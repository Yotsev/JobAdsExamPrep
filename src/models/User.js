const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Email is rerequired'],
        validate: [/^[A-Za-z]+@[A-Za-z]+.[A-Za-z]+$/,'Email must contain only latin letters and be a valid email'],
    },
    password: {
        type: String,
        required: [true,'Password is rerequired'],
        minLength: [5, 'Password must be at least 5 characters long'],
    },
    description: {
        type: String,
        required: [true,'Description is rerequired'],
        maxLength: [40, 'Description must be no longer than 40 characters'],
    },
    my_ads: [{
        type: mongoose.Types.ObjectId,
        ref: 'Ad',
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;