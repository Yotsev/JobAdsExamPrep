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

adRouter.get('/:adId/details', async (req, res) => {
    const ad = await adService.getOne(req.params.adId);
    const isAuthor = ad.author._id == req.user?._id;
    const hasNotApplied = !ad.applicants.some(x => x._id == req.params._id);
    const applicants = ad.applicants;

    res.render('ad/details', { ad, isAuthor, hasNotApplied, applicants });
});

adRouter.get('/:adId/apply', isAuthenticated, async (req, res) => {
    const ad = await adService.getOne(req.params.adId);

    const isAuthor = ad.author._id == req.user?._id;
    const hasNotApplied = !ad.applicants.some(x => x._id == req.params._id);
    const applicants = ad.applicants;

    try {
        if (ad.author._id == req.user._id) {

            throw new Error(`You can't apply to own ad`);
        }

        if (ad.applicants.some(x => x._id == req.user._id)) {
            throw new Error(`You have already applyed to the ad`);
        }

        await adService.apply(req.params.adId, req.user._id);
    } catch (err) {
        return res.status(403).render(`ad/details`, { ad, isAuthor, hasNotApplied, applicants, error: getErrorMessage(err) });
    }

    res.redirect(`/ads/${req.params.adId}/details`);
});

adRouter.get('/:adid/edit', isAuthenticated, async (req, res) => {
    const ad = await adService.getOne(req.params.adid);

    if (ad.author._id != req.user?._id) {
        return res.redirect('/404');
    }

    res.render('ad/edit', { ad });
});

adRouter.post('/:adId/edit', isAuthenticated, async (req, res) => {
    ad = req.body;

    try {

        await adService.edit(req.params.adId, ad);
    } catch (err) {
        return res.status(400).render('ad/edit', { ad, error: getErrorMessage(err) });
    }

    res.redirect(`/ads/${req.params.adId}/details`);
});

adRouter.get('/:adId/delete', isAuthenticated, async (req, res) => {
    const ad = await adService.getOne(req.params.adId);

    if (ad.author._id != req.user._id) {
        return res.redirect('/404');
    }

    await adService.delete(req.params.adId);

    res.redirect('/ads/all');
});

adRouter.get('/search', isAuthenticated, async (req, res) => {
    const { search } = req.query;

    const result = await adService.search(search);

    res.render('ad/search', { result });
});

module.exports = adRouter;