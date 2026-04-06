const express = require('express');
const router = express.Router();
const icecreamController = require('../controllers/icecreamController');

// Core CRUD routes under /api/icecream
router.post('/', icecreamController.addIceCream);
router.get('/', icecreamController.getAllIceCreams);
router.get('/:id', icecreamController.getIceCreamById);
router.delete('/:id', icecreamController.deleteIceCream);

// Feature routes under /api/icecream/*
router.get('/total', icecreamController.getTotalCalories);
router.get('/stats', icecreamController.getStats);
router.post('/calculate-calories', icecreamController.calculateCalories);

module.exports = router;
