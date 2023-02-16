const router = require('express').Router();

const { authentication } = require('./middlewares/authMiddleware');

const authController = require('./controllers/authController');
const homeController = require('./controllers/homeController');
const adController = require('./controllers/adController');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/ads', adController);

// router.get('*', (req, res)=> {
//     res.render('home/404');
// });

module.exports = router;