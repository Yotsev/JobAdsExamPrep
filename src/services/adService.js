const Ad = require('../models/Ad');

exports.getAll = () => Ad.find({}).lean();

exports.create = (userId, adData)=> Ad.create({...adData, author: userId});