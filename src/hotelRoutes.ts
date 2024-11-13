import { Router } from 'express';
import { getAllHotels, createHotel, getHotelById,updateHotel} from './hotelController'; // Adjusted to import from src folder

const router = Router();

// Route for getting all hotels
router.get('/hotels', getAllHotels);

// Route for creating a new hotel
router.post('/hotels', createHotel);

// to get specefic hotel
router.get('/hotels/:id',getHotelById);

// to update the hotel data
router.put('/hotels/:id',updateHotel);

export default router;
