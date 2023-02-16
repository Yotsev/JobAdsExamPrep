const adRouter = require('express').Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');
const adService = require('../services/adService');
const { getErrorMessage } = require('../utils/errorParser');

adRouter.get('/all', async (req, res) => {
    const ads = await adService.getAll();

    res.render('ad/all-ads', { ads });
});

adRouter.get('/create', isAuthenticated, (req, res) => {
    res.render('ad/create');
});

adRouter.post('/create', isAuthenticated, async (req, res) => {
    const adData = req.body;

    try {
        await adService.create(req.user._id, adData);
    } catch (err) {
        console.log(err);
        return res.status(400).render('ad/create', { adData, error: getErrorMessage(err) });
    }

    res.redirect('/ads/all');
});

module.exports = adRouter;