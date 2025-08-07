const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files from public directory
app.use(express.static('public'));

// In-memory storage for books
let books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    genre: "Fiction"
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    genre: "Fiction"
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    genre: "Dystopian"
  }
];

let nextId = 4; // For generating unique IDs

// Helper function to find book by ID
const findBookById = (id) => {
  return books.find(book => book.id === parseInt(id));
};

// Helper function to validate book data
const validateBookData = (bookData) => {
  const errors = [];
  
  if (!bookData.title || bookData.title.trim() === '') {
    errors.push('Title is required');
  }
  
  if (!bookData.author || bookData.author.trim() === '') {
    errors.push('Author is required');
  }
  
  if (bookData.year && (isNaN(bookData.year) || bookData.year < 1000 || bookData.year > new Date().getFullYear())) {
    errors.push('Year must be a valid year');
  }
  
  return errors;
};

// Routes

// GET / - Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// GET /api - API information
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Books REST API',
    version: '1.0.0',
    endpoints: {
      'GET /books': 'Get all books',
      'GET /books/:id': 'Get a specific book',
      'POST /books': 'Create a new book',
      'PUT /books/:id': 'Update a book',
      'DELETE /books/:id': 'Delete a book'
    }
  });
});

// GET /books - Get all books
app.get('/books', (req, res) => {
  try {
    const { search, genre, author } = req.query;
    let filteredBooks = [...books];
    
    // Search functionality
    if (search) {
      const searchLower = search.toLowerCase();
      filteredBooks = filteredBooks.filter(book => 
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by genre
    if (genre) {
      filteredBooks = filteredBooks.filter(book => 
        book.genre && book.genre.toLowerCase() === genre.toLowerCase()
      );
    }
    
    // Filter by author
    if (author) {
      filteredBooks = filteredBooks.filter(book => 
        book.author.toLowerCase().includes(author.toLowerCase())
      );
    }
    
    res.json({
      success: true,
      count: filteredBooks.length,
      data: filteredBooks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// GET /books/:id - Get a specific book
app.get('/books/:id', (req, res) => {
  try {
    const book = findBookById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// POST /books - Create a new book
app.post('/books', (req, res) => {
  try {
    const bookData = req.body;
    
    // Validate book data
    const errors = validateBookData(bookData);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
    
    // Create new book
    const newBook = {
      id: nextId++,
      title: bookData.title.trim(),
      author: bookData.author.trim(),
      year: bookData.year || null,
      genre: bookData.genre || null
    };
    
    books.push(newBook);
    
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: newBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// PUT /books/:id - Update a book
app.put('/books/:id', (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === bookId);
    
    if (bookIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    const bookData = req.body;
    
    // Validate book data
    const errors = validateBookData(bookData);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
    
    // Update book
    const updatedBook = {
      ...books[bookIndex],
      title: bookData.title.trim(),
      author: bookData.author.trim(),
      year: bookData.year || null,
      genre: bookData.genre || null
    };
    
    books[bookIndex] = updatedBook;
    
    res.json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// DELETE /books/:id - Delete a book
app.delete('/books/:id', (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === bookId);
    
    if (bookIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    const deletedBook = books.splice(bookIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'Book deleted successfully',
      data: deletedBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📚 Books API is ready!`);
  console.log(`🌐 Frontend: http://localhost:${PORT}`);
  console.log(`🔗 API Info: http://localhost:${PORT}/api`);
  console.log(`📖 Available endpoints:`);
  console.log(`   GET    /books - Get all books`);
  console.log(`   GET    /books/:id - Get a specific book`);
  console.log(`   POST   /books - Create a new book`);
  console.log(`   PUT    /books/:id - Update a book`);
  console.log(`   DELETE /books/:id - Delete a book`);
});

module.exports = app;
