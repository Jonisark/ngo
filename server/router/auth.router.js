


// const express = require('express');
// const router = express.Router();
// const {home, registration, login, contact} = require('../controllers/auth.controller')

// router.route('/').get(home);
// router.route('/registration').post(registration);
// router.route('/login').post(login);
// router.route('/contact').post(contact)

// module.exports = router;

const express = require('express');
const { home, registration, login, contact, user, service } = require('../controllers/auth.controller');
const router = express.Router();
const authMiddlewere = require('../middlewere/auth_middlewere')


router.route('/').get(home)
router.route('/registration').post(registration)
router.route('/login').post(login)
router.route('/contact').post(contact)
router.route('/user').get(authMiddlewere,user)
router.route('/service').get(service)

module.exports = router;

