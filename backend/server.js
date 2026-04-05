const express = require('express');
const cors = require('cors');
const icecreamRoutes = require('./routes/icecream');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', icecreamRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'IceCream Calorie Tracker backend is running',
    health: '/health',
    api: '/api/icecream'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🍦 IceCream Tracker Backend running on http://localhost:${PORT}`);
});
