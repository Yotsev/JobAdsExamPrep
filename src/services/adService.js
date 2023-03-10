const Ad = require('../models/Ad');

exports.getAll = () => Ad.find({}).populate('author').lean();

exports.getThreeAds = ()=> Ad.find({}).limit(3).lean();

exports.getOne = (adId) => Ad.findById(adId).populate('author applicants').lean();

exports.create = (userId, adData) => Ad.create({ ...adData, author: userId });

exports.delete = (adId) => Ad.findByIdAndDelete(adId);

exports.edit = (adId, adData)=> Ad.findByIdAndUpdate(adId, adData, {runValidators:true});

exports.apply = async (adid, userId) => {
    const ad = await Ad.findById(adid);

    ad.applicants.push(userId);
    await ad.save();
};

exports.search = async (email)=> {
    const ads = (await this.getAll()).filter(x=>x.author.email.toLowerCase() == email?.toLowerCase());

    return ads;
}