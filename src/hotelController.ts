import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express'; // Import the required types from Express

// Path to the hotels.json file
const hotelsFilePath = path.join(__dirname, '..', 'hotels.json');
console.log(hotelsFilePath);


// Get all hotels
export const getAllHotels = (req: Request, res: Response): void => {
    console.log('GET /hotels route hit');  // Log to ensure the route is triggered
    try {
      const data = fs.readFileSync(hotelsFilePath, 'utf-8');
      const hotels = JSON.parse(data).hotels;
      res.status(200).json(hotels);  // Return all hotels in JSON format
    } catch (error) {
      res.status(500).json({ error: 'Unable to read hotels data' });
    }
  };

// Create a new hotel
// Create a new hotel
export const createHotel = (req: Request, res: Response): void => {  
    try {
      const newHotel = req.body; 
      const data = fs.readFileSync(hotelsFilePath, 'utf-8');
      const hotelsData = JSON.parse(data);
  
      // Generate a unique hotel_id by incrementing the highest existing hotel_id
      const newHotelId = hotelsData.hotels.length > 0 ? Math.max(...hotelsData.hotels.map((hotel: { hotel_id: number }) => hotel.hotel_id)) + 1 : 1;
      newHotel.hotel_id = newHotelId;  // Assign the new unique hotel_id
  
      hotelsData.hotels.push(newHotel); // Add the new hotel to the array
  
      // Save the updated hotels data back to the JSON file
      fs.writeFileSync(hotelsFilePath, JSON.stringify(hotelsData, null, 2));
      res.status(201).json(newHotel); // Return the newly created hotel
    } catch (error) {
      res.status(500).json({ error: 'Unable to create a new hotel' });
    }
  };
  


// Function to get hotel by ID
export const getHotelById = (req: Request, res: Response): void => {
    const hotelId = parseInt(req.params.id, 10);  // Get the hotel ID from the URL parameter
    console.log(`Looking for hotel with ID: ${hotelId}`);
  
    try {
      const data = fs.readFileSync(hotelsFilePath, 'utf-8');
      const hotels = JSON.parse(data).hotels;
      
      // Find the hotel by ID
      const hotel = hotels.find((hotel: { hotel_id: number }) => hotel.hotel_id === hotelId);
  
      if (!hotel) {
        res.status(404).json({ message: `Hotel with ID ${hotelId} not found` });
      } else {
        res.status(200).json(hotel);  // Return the hotel details as response
      }
    } catch (error) {
      console.error('Error reading the file:', error);
      res.status(500).json({ error: 'Unable to fetch hotel data' });
    }
  };
  

// update the hotel data
export const updateHotel = (req: Request, res: Response): void => {
    const hotelId = parseInt(req.params.id, 10);  // Get hotelId from URL parameter
    console.log(`Update the hotel with id: ${hotelId}`);  
    

    const updatedHotelData = req.body;  // Get the updated data from the request body
  
    try {
      // Read the current hotels data
      const data = fs.readFileSync(hotelsFilePath, 'utf-8');
      const hotelsData = JSON.parse(data);
      
      // Find the hotel to update
      const hotelIndex = hotelsData.hotels.findIndex((hotel: { hotel_id: number }) => hotel.hotel_id === hotelId);
  
      if (hotelIndex === -1) {
        // Hotel not found, send a 404 error response
        res.status(404).json({ message: `Hotel with ID ${hotelId} not found` });
        return;  // End the function execution after sending the response
      }
  
      // Update the hotel data by merging existing data with the new data
      hotelsData.hotels[hotelIndex] = { ...hotelsData.hotels[hotelIndex], ...updatedHotelData };
  
      // Save the updated hotels data to the JSON file
      fs.writeFileSync(hotelsFilePath, JSON.stringify(hotelsData, null, 2));
  
      // Respond with the updated hotel data
      res.status(200).json(hotelsData.hotels[hotelIndex]);
    } catch (error) {
      // Handle errors by sending a 500 error response
      res.status(500).json({ error: 'Unable to update the hotel data' });
    }
  };