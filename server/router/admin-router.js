const express = require('express');
const {getAllUsers,getAllContacts} = require('../controllers/admin-controler');
const router = express.Router();
const authMiddlewere = require('../middlewere/auth_middlewere');
const adminMiddlewere = require('../middlewere/admin-middlewere');
const adminController = require('../controllers/admin-controler')


router.route('/users').get(authMiddlewere,adminMiddlewere,getAllUsers);
router.route('/contacts').get(authMiddlewere,getAllContacts);
router.route('/users/delete/:id').delete(authMiddlewere,adminController.deleteUser);
router.route('/users/:id').get(authMiddlewere,adminController.getUserById);
router.route('/users/update/:id').patch(authMiddlewere,adminMiddlewere,adminController.updateUserById);
router.route('/contacts/delete/:id').delete(authMiddlewere,adminMiddlewere,adminController.deleteContactById);

module.exports = router;