var express = require('express');
var router = express.Router();
var productController = require('../controllers/product-controller');

// GET All Products
router.get('/', productController.getAllProduct);

// GET All Categories
router.get('/category', productController.getAllCategory);

// GET Products by Category

// // CREATE USER
// router.post('/', userController.postUser);

// // UPDATE USER
// router.patch('/:id', userController.patchUser);

// // DELETE USER
// router.delete('/:id', userController.deleteUser);

// router.get('/login', userController.getUserByEmailAndPassword);

module.exports = router;
