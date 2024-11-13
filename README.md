

# Coral Beach Hotel API

A Node.js, Express.js, and TypeScript-based API for managing hotel data. This project provides RESTful endpoints to create, read, update, and manage hotel information stored in a JSON file.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [License](#license)

## Features
- **CRUD Operations**: Create, read, update, and delete hotel data.
- **JSON Storage**: Data is stored in a JSON file for simplicity.
- **TypeScript Support**: Ensures type safety and structured data.
- **Modular Structure**: Clear and organized project structure.
- **Unit Testing**: Includes tests for key functions using Jest.

## Technologies Used
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **TypeScript**: Adds static typing
- **Jest**: JavaScript testing framework


### Explanation of Key Files

- **__tests__/**: Contains Jest test files to verify the functionality of controllers.
- **src/controllers/hotelController.ts**: Houses the main logic for handling requests related to hotels (e.g., fetching, updating).
- **src/models/hotel.d.ts**: TypeScript type definitions, ensuring structured and type-safe data for hotels.
- **src/hotels.json**: JSON file that acts as the database, storing hotel data in a structured format.
- **src/server.ts**: Entry point for starting the Express server, setting up routes and middleware.
- **types/hotel.d.ts**: Custom TypeScript types, which can include additional interface definitions for data structures used in the app.
- **tsconfig.json**: Configures TypeScript settings, specifying compiler options.
- **jest.config.js**: Configuration for Jest to run tests in the project.
  
This structure provides a clean separation of concerns, making the project modular, scalable, and easy to maintain.


## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/samiya1859/Assignment3Nodejs.git
   cd Assignment3Nodejs
