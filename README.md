# Movie Management Backend System

The Movie Management Backend System is a RESTful API built with Express.js and MongoDB. It provides endpoints for user authentication, movie creation, updating, deletion, and rating. This project uses JWT for authentication and Multer for handling image uploads.

## Features

- **User registration and login**
- **CRUD operations for movies**
- **Movie rating system**
- **Image upload and storage using Multer and Cloudinary**

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JSON Web Token (JWT)**
- **Multer**
- **Cloudinary**
- **dotenv**
- **CORS**

## Prerequisites

- Node.js installed
- MongoDB instance running
- Cloudinary account for image storage

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/movie-management-backend.git
```

2. Navigate to the project directory:

```bash
cd movie-management-backend
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

5. Start the server:

```bash
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints

### User Endpoints

- **POST /api/users/register**
  - Register a new user.
- **POST /api/users/login**
  - Log in an existing user.

### Movie Endpoints

- **POST /api/movies**
  - Create a new movie (requires authentication).
- **GET /api/movies**
  - Get a list of all movies.
- **GET /api/movies/:id**
  - Get a specific movie by ID.
- **PUT /api/movies/:id**
  - Update a movie by ID (requires authentication).
- **DELETE /api/movies/:id**
  - Delete a movie by ID (requires authentication).

### Rating Endpoints

- **POST /api/movies/:id/rate**
  - Rate a movie by ID (requires authentication).

### Image Upload

- **POST /api/movies/:id/image**
  - Upload an image for a movie (requires authentication).

## Usage

1. Register a new user:

```bash
curl -X POST http://localhost:3000/api/users/register -H "Content-Type: application/json" -d '{"username": "yourusername", "password": "yourpassword"}'
```

2. Log in:

```bash
curl -X POST http://localhost:3000/api/users/login -H "Content-Type: application/json" -d '{"username": "yourusername", "password": "yourpassword"}'
```

3. Use the received token to access protected routes by adding it to the `Authorization` header:

```bash
Authorization: Bearer your_jwt_token
```

4. Create a new movie:

```bash
curl -X POST http://localhost:3000/api/movies -H "Authorization: Bearer your_jwt_token" -H "Content-Type: application/json" -d '{"title": "Movie Title", "description": "Movie Description", "releaseDate": "2023-01-01"}'
```

5. Upload an image for a movie:

```bash
curl -X POST http://localhost:3000/api/movies/movie_id/image -H "Authorization: Bearer your_jwt_token" -F "image=@path_to_your_image.jpg"
```

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)
