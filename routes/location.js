var express = require('express');
var router = express.Router();
var locationController = require('../controllers/location-controller');

// GET All States, Areas, Postcodes
router.get('/states', locationController.getAllStates);
router.get('/areas', locationController.getAllAreas);
router.get('/postcodes', locationController.getAllPostcodes);

// GET States, Areas, Postcodes by ID
router.get('/states/:id', locationController.getStatesByID);
router.get('/areas/:id', locationController.getAreasByID);
router.get('/postcodes:id', locationController.getPostcodesByID);

// // CREATE USER
// router.post('/', userController.postUser);

// // UPDATE USER
// router.patch('/:id', userController.patchUser);

// // DELETE USER
// router.delete('/:id', userController.deleteUser);

// router.get('/login', userController.getUserByEmailAndPassword);

module.exports = router;
