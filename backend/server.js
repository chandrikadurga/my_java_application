const express = require('express');
const cors = require('cors');
const icecreamRoutes = require('./routes/icecream');
const icecreamController = require('./controllers/icecreamController');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/icecream', icecreamRoutes);

// Backward-compatible aliases expected by existing clients.
app.get('/api/icecream-total', icecreamController.getTotalCalories);
app.get('/api/stats', icecreamController.getStats);
app.post('/api/calculate-calories', icecreamController.calculateCalories);

// Root route
app.get('/', (req, res) => {
  res.send('IceCream Backend is running 🚀');
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server running' });
});

// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Centralized error middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🍦 IceCream Tracker Backend running on http://localhost:${PORT}`);
});
