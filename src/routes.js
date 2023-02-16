const router = require('express').Router();

const { authentication } = require('./middlewares/authMiddleware');

const authController = require('./controllers/authController');
const homeController = require('./controllers/homeController');

router.use('/', homeController);
router.use('/auth', authController);

// router.get('*', (req, res)=> {
//     res.render('home/404');
// });

module.exports = router;