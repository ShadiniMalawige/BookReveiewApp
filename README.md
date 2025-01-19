# Book Review Application

This is a full-stack web application for managing book reviews. Users can post reviews, edit them, delete them, and view existing reviews. The project is structured into two main parts:

1. **Frontend** - A React application for the user interface.
2. **Backend** - A Node.js application with Express for handling API requests and MongoDB as the database.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [MongoDB](https://www.mongodb.com/) (either local or cloud-based)

## Backend Environment Variables

The backend requires a `.env` file to run. Create a `.env` file in the `backend` folder with the following content:

```plaintext
MONGO_URI=<your_mongodb_connection_string>
```

Replace `<your_mongodb_connection_string>` with your MongoDB URI.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ShadiniMalawige/BookReveiewApp.git
   cd BookReveiewApp
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd frontend
   npm install

   cd ../backend
   npm install
   ```

## Running the Application

### Run Frontend

1. Navigate to the `frontend` folder:

   ```bash
   cd frontend
   ```

2. Start the React development server:

   ```bash
   npm start
   ```

### Run Backend

1. Navigate to the `backend` folder:

   ```bash
   cd backend
   ```

2. Start the Node.js server:

   ```bash
   npm start
   ```

## Features

- **Post Reviews**: Users can add reviews for books.
- **Edit Reviews**: Modify existing reviews.
- **Delete Reviews**: Remove reviews from the system.
- **View Reviews**: Browse all existing reviews.

## Technologies Used

### Frontend

- React
- Axios (for API requests)

### Backend

- Node.js
- Express.js
- MongoDB

## Contributing

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Description of changes"
   ```

4. Push to the branch:

   ```bash
   git push origin feature-name
   ```

5. Create a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).
