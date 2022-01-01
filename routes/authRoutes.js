const { Router } = require('express');
const authController = require('../controllers/authControllers')
const router = Router();

router.get('/signup', authController.signupGet);
router.post('/signup', authController.signupPost);
router.get('/login', authController.loginGet);
router.post('/login', authController.loginPost);
router.get('/logout', authController.logoutGet);
// logout_get
module.exports = router;