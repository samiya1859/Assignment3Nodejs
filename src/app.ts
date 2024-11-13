import express from 'express';
import path from 'path';
import multer from 'multer';
import hotelRoutes from './hotelRoutes'; // Import the hotel routes

const app = express();

// Serve static files from the 'public' directory
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));



// Middleware to parse JSON request bodies
app.use(express.json());

// Welcome route for initial request
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Hotel API! Use /api/hotels to interact with the hotel data.');
});

// Use hotel routes
app.use('/api', hotelRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
