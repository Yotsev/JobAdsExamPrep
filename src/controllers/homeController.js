const homeRouter = require('express').Router();
const adService = require('../services/adService');

homeRouter.get('/', async (req, res) => {
    const firstThree = await adService.getThreeAds();

    res.render('home/home', { firstThree });
});

homeRouter.get('/404', (req, res) => {
    res.render('home/404');
});

module.exports = homeRouter;