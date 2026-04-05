const express = require('express');
const router = express.Router();
const icecreamController = require('../controllers/icecreamController');

// Routes
router.post('/icecream', icecreamController.addIceCream);
router.get('/icecream', icecreamController.getAllIceCreams);
router.get('/icecream/:id', icecreamController.getIceCreamById);
router.delete('/icecream/:id', icecreamController.deleteIceCream);
router.get('/icecream-total', icecreamController.getTotalCalories);
router.get('/stats', icecreamController.getStats);
router.post('/calculate-calories', icecreamController.calculateCalories);

module.exports = router;
