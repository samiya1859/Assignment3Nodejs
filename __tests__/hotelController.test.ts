import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { getAllHotels, createHotel, getHotelById, updateHotel } from '../src/hotelController';

jest.mock('fs');

const mockHotelsData = {
  hotels: [
    {
      hotel_id: 1,
      slug: 'hotel-california',
      title: 'Hotel California',
      description: 'A beautiful hotel located in the heart of California.',
      guest_count: 200,
      bedroom_count: 100,
      bathroom_count: 120,
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Fitness Center', 'Restaurant', 'Spa'],
      host_information: {
        name: 'John Doe',
        contact: 'john@example.com',
        phone: '+1234567890'
      },
      address: '123 California St, Los Angeles, CA, USA',
      latitude: 34.0522,
      longitude: -118.2437,
      rooms: [
        { hotel_slug: 'hotel-california', room_slug: 'room-101', room_title: 'Ocean View Suite', bedroom_count: 2 }
      ]
    }
  ]
};

// Mocked file path
const hotelsFilePath = path.join(__dirname, '..', 'hotels.json');

// Define mock responses for readFileSync and writeFileSync
(fs.readFileSync as jest.Mock).mockImplementation(() => JSON.stringify(mockHotelsData));
(fs.writeFileSync as jest.Mock).mockImplementation(() => {});

describe('Hotel Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('getAllHotels', () => {
    it('should return all hotels', () => {
      getAllHotels(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockHotelsData.hotels);
    });

    it('should handle file read errors', () => {
      (fs.readFileSync as jest.Mock).mockImplementationOnce(() => { throw new Error('File read error'); });
      getAllHotels(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unable to read hotels data' });
    });
  });

  describe('createHotel', () => {
    it('should create a new hotel and return it', () => {
      req.body = {
        slug: 'new-hotel',
        title: 'New Hotel',
        description: 'A brand new hotel',
        guest_count: 100,
        bedroom_count: 50,
        bathroom_count: 50,
        amenities: ['Free Wi-Fi', 'Restaurant'],
        host_information: { name: 'Alice', contact: 'alice@example.com', phone: '+9876543210' },
        address: '456 New St, New York, NY, USA',
        latitude: 40.7128,
        longitude: -74.006,
        rooms: []
      };

      createHotel(req as Request, res as Response);

      const expectedNewHotel = { ...req.body, hotel_id: 2 };
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expectedNewHotel);
      expect(fs.writeFileSync).toHaveBeenCalledWith(hotelsFilePath, expect.any(String));
    });

    it('should handle file write errors', () => {
      (fs.writeFileSync as jest.Mock).mockImplementationOnce(() => { throw new Error('File write error'); });
      createHotel(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unable to create a new hotel' });
    });
  });

  describe('getHotelById', () => {
    it('should return a hotel by ID', () => {
      req.params = { id: '1' };
      getHotelById(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockHotelsData.hotels[0]);
    });

    it('should return 404 if hotel is not found', () => {
      req.params = { id: '99' };
      getHotelById(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Hotel with ID 99 not found' });
    });
  });

  describe('updateHotel', () => {
    it('should update a hotel and return the updated data', () => {
      req.params = { id: '1' };
      req.body = { title: 'Updated Hotel Title' };

      updateHotel(req as Request, res as Response);

      const updatedHotel = { ...mockHotelsData.hotels[0], title: 'Updated Hotel Title' };
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedHotel);
      expect(fs.writeFileSync).toHaveBeenCalledWith(hotelsFilePath, expect.any(String));
    });

    it('should return 404 if hotel to update is not found', () => {
      req.params = { id: '99' };
      updateHotel(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Hotel with ID 99 not found' });
    });

    it('should handle file write errors on update', () => {
      (fs.writeFileSync as jest.Mock).mockImplementationOnce(() => { throw new Error('File write error'); });
      req.params = { id: '1' };
      updateHotel(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unable to update the hotel data' });
    });
  });
});
