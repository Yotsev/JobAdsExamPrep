const Ad = require('../models/Ad');

exports.getAll = () => Ad.find({}).lean();

exports.getOne = (adId)=> Ad.findById(adId).populate('author', 'applicants').lean();

exports.create = (userId, adData)=> Ad.create({...adData, author: userId});