# Books REST API

A comprehensive REST API for managing a list of books built with Node.js and Express, featuring a beautiful frontend interface.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   ```
   http://localhost:3000
   ```

4. **Enjoy the full-stack application!** 🎉

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, Delete books
- **Beautiful Frontend**: Modern, responsive web interface
- **Search & Filter**: Search books by title/author, filter by genre
- **Data Validation**: Comprehensive input validation
- **Error Handling**: Proper HTTP status codes and error messages
- **Security**: Helmet.js for security headers
- **CORS Support**: Cross-origin resource sharing enabled
- **Logging**: Request logging with Morgan
- **In-Memory Storage**: No database required (stores data in memory)

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## 🛠️ Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd TASK3
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

4. **The server will start on port 3000:**
   ```
   🚀 Server is running on port 3000
   📚 Books API is ready!
   🌐 Frontend: http://localhost:3000
   🔗 API Info: http://localhost:3000/api
   ```

## 🌐 Frontend Interface

The application includes a beautiful, responsive web interface for managing books:

- **URL**: `http://localhost:3000`
- **Features**: 
  - Add, edit, and delete books
  - Search books by title or author
  - Filter books by genre
  - Modern, responsive design
  - Real-time updates

## 📚 API Endpoints

### Base URL
```
http://localhost:3000
```

### 1. Frontend Interface
- **GET** `/`
- Serves the web interface

### 2. API Information
- **GET** `/api`
- Returns API information and available endpoints

### 3. Get All Books
- **GET** `/books`
- **Query Parameters:**
  - `search`: Search in title and author
  - `genre`: Filter by genre
  - `author`: Filter by author

**Example:**
```bash
GET /books
GET /books?search=gatsby
GET /books?genre=fiction
GET /books?author=orwell
```

### 4. Get Book by ID
- **GET** `/books/:id`
- Returns a specific book by its ID

**Example:**
```bash
GET /books/1
```

### 5. Create New Book
- **POST** `/books`
- **Required Fields:** `title`, `author`
- **Optional Fields:** `year`, `genre`

**Example Request Body:**
```json
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "year": 1937,
  "genre": "Fantasy"
}
```

### 6. Update Book
- **PUT** `/books/:id`
- Updates an existing book by ID

**Example Request Body:**
```json
{
  "title": "The Hobbit: An Unexpected Journey",
  "author": "J.R.R. Tolkien",
  "year": 1937,
  "genre": "Fantasy"
}
```

### 7. Delete Book
- **DELETE** `/books/:id`
- Removes a book by ID

**Example:**
```bash
DELETE /books/1
```

## 🧪 Testing

### Automated Tests
```bash
npm test
```

### Manual Testing with Postman
1. Import `postman_collection.json` into Postman
2. Start the server: `npm start`
3. Run the collection

### Frontend Testing
1. Start the server: `npm start`
2. Open `http://localhost:3000` in your browser
3. Test all CRUD operations through the web interface

## 📊 Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "year": 1925,
      "genre": "Fiction"
    }
  ]
}
```

### Error Response
```json
{
  "success": false,
  "message": "Book not found"
}
```

## 🔧 Project Structure

```
TASK3/
├── package.json              # Project dependencies and scripts
├── server.js                # Main server file with all routes
├── public/                  # Frontend files
│   ├── index.html          # Main HTML file
│   ├── styles.css          # CSS styles
│   └── script.js           # Frontend JavaScript
├── test_api.js             # API test suite
├── postman_collection.json # Postman collection
├── setup.bat               # Windows setup script
├── setup.sh                # Unix setup script
├── .gitignore              # Git ignore file
├── INTERVIEW_QUESTIONS.md  # Learning outcomes
└── README.md               # This documentation file
```

## 🛡️ Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Comprehensive data validation
- **Error Handling**: Proper error responses

## 📝 Sample Data

The API comes pre-loaded with sample books:
- The Great Gatsby (F. Scott Fitzgerald)
- To Kill a Mockingbird (Harper Lee)
- 1984 (George Orwell)

## 🚨 Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `404`: Not Found
- `500`: Internal Server Error

## 🔍 Advanced Features

### Search Functionality
```bash
GET /books?search=gatsby
```

### Filter by Genre
```bash
GET /books?genre=fiction
```

### Filter by Author
```bash
GET /books?author=orwell
```

## 📚 Learning Outcomes

This project demonstrates:
- **REST API Design**: Proper HTTP methods and status codes
- **Express.js Routing**: Route handling and middleware
- **JSON Handling**: Request/response JSON processing
- **Error Handling**: Comprehensive error management
- **Data Validation**: Input validation and sanitization
- **API Documentation**: Clear endpoint documentation
- **Frontend Development**: Modern web interface
- **Full-Stack Integration**: API + Frontend

## 🎯 Interview Questions Covered

1. **REST API Basics**: HTTP methods, status codes, resource naming
2. **Express Routing**: Route parameters, query strings, middleware
3. **HTTP Methods**: GET, POST, PUT, DELETE implementation
4. **JSON Handling**: Request body parsing and response formatting
5. **Error Handling**: Proper error responses and status codes
6. **Data Validation**: Input validation and error messages
7. **Frontend Development**: HTML, CSS, JavaScript integration
8. **Full-Stack Development**: Backend API + Frontend UI

## 🚀 Next Steps

To extend this API, consider:
- Adding a database (MongoDB, PostgreSQL)
- Implementing authentication
- Adding pagination
- Creating a mobile app
- Adding unit tests
- Implementing rate limiting
- Adding real-time features with WebSockets

## 📞 Support

For questions or issues, please refer to the code comments or create an issue in the repository.
