const IceCreamModel = require('../models/IceCream');

exports.addIceCream = (req, res) => {
  try {
    const { name, type, scoops } = req.body;
    const newIceCream = IceCreamModel.addIceCream(name, type, scoops);
    res.status(201).json({
      success: true,
      message: 'Ice cream entry added successfully',
      data: newIceCream
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getAllIceCreams = (req, res) => {
  try {
    const icecreams = IceCreamModel.getAll();
    res.json({
      success: true,
      data: icecreams,
      count: icecreams.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getIceCreamById = (req, res) => {
  try {
    const { id } = req.params;
    const icecream = IceCreamModel.getById(id);
    if (!icecream) {
      return res.status(404).json({
        success: false,
        error: 'Ice cream not found'
      });
    }
    res.json({
      success: true,
      data: icecream
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.deleteIceCream = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = IceCreamModel.deleteById(id);
    res.json({
      success: true,
      message: 'Ice cream entry deleted successfully',
      data: deleted
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
};

exports.getTotalCalories = (req, res) => {
  try {
    const totalCalories = IceCreamModel.getTotalCalories();
    res.json({
      success: true,
      totalCalories: totalCalories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getStats = (req, res) => {
  try {
    const stats = IceCreamModel.getStats();
    res.json({
      success: true,
      stats: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.calculateCalories = (req, res) => {
  try {
    const { type, scoops } = req.body;
    const calories = IceCreamModel.calculateCalories(type, scoops);
    res.json({
      success: true,
      type: type,
      scoops: scoops,
      calories: calories
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
