const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Email is rerequired'],
        validate: [/^[A-Za-z]+@[A-Za-z]+.[A-Za-z]+$/,'Email must contain only latin letters'],
    },
    description: {
        type: String,
        required: [true,'Last name is rerequired'],
    },
    password: {
        type: String,
        required: [true,'Password is rerequired'],
    },
    my_ads: [{
        type: mongoose.Types.ObjectId,
        ref: 'Ad',
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;