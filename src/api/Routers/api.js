const express = require('express');
const router = express.Router();
const loginController = require('../controllers/signupController');
const signinController = require('../controllers/signinController');
const productController = require("../controllers/productController");
const {upload} = require("../../helpers/helper");

//login Route
router.post('/signup', loginController.signup);
router.post('/signin',signinController.signin);

//Product CRUD

router.post('/product',upload.single('image'),productController.create);
router.get('/product', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);
router.put('/product/:id',upload.single('image'), productController.updateProductById);
router.delete('/product/:id', productController.delete);
module.exports = router
