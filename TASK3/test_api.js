const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Helper function to make HTTP requests
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({ status: res.statusCode, data: response });
        } catch (error) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Test functions
async function testWelcome() {
  console.log('\n🧪 Testing Welcome Endpoint...');
  try {
    const response = await makeRequest('GET', '/api');
    console.log('✅ API info endpoint:', response.status === 200 ? 'PASS' : 'FAIL');
    console.log('   Response:', response.data.message);
  } catch (error) {
    console.log('❌ API info endpoint: FAIL');
    console.log('   Error:', error.message);
  }
}

async function testGetAllBooks() {
  console.log('\n🧪 Testing Get All Books...');
  try {
    const response = await makeRequest('GET', '/books');
    console.log('✅ Get all books:', response.status === 200 ? 'PASS' : 'FAIL');
    console.log(`   Found ${response.data.count} books`);
  } catch (error) {
    console.log('❌ Get all books: FAIL');
    console.log('   Error:', error.message);
  }
}

async function testCreateBook() {
  console.log('\n🧪 Testing Create Book...');
  try {
    const newBook = {
      title: "Test Book",
      author: "Test Author",
      year: 2023,
      genre: "Test"
    };
    const response = await makeRequest('POST', '/books', newBook);
    console.log('✅ Create book:', response.status === 201 ? 'PASS' : 'FAIL');
    console.log('   Created book ID:', response.data.data.id);
    return response.data.data.id;
  } catch (error) {
    console.log('❌ Create book: FAIL');
    console.log('   Error:', error.message);
    return null;
  }
}

async function testGetBookById(bookId) {
  console.log('\n🧪 Testing Get Book by ID...');
  try {
    const response = await makeRequest('GET', `/books/${bookId}`);
    console.log('✅ Get book by ID:', response.status === 200 ? 'PASS' : 'FAIL');
    console.log('   Book title:', response.data.data.title);
  } catch (error) {
    console.log('❌ Get book by ID: FAIL');
    console.log('   Error:', error.message);
  }
}

async function testUpdateBook(bookId) {
  console.log('\n🧪 Testing Update Book...');
  try {
    const updatedBook = {
      title: "Updated Test Book",
      author: "Updated Test Author",
      year: 2024,
      genre: "Updated Test"
    };
    const response = await makeRequest('PUT', `/books/${bookId}`, updatedBook);
    console.log('✅ Update book:', response.status === 200 ? 'PASS' : 'FAIL');
    console.log('   Updated title:', response.data.data.title);
  } catch (error) {
    console.log('❌ Update book: FAIL');
    console.log('   Error:', error.message);
  }
}

async function testDeleteBook(bookId) {
  console.log('\n🧪 Testing Delete Book...');
  try {
    const response = await makeRequest('DELETE', `/books/${bookId}`);
    console.log('✅ Delete book:', response.status === 200 ? 'PASS' : 'FAIL');
    console.log('   Deleted book ID:', response.data.data.id);
  } catch (error) {
    console.log('❌ Delete book: FAIL');
    console.log('   Error:', error.message);
  }
}

async function testErrorHandling() {
  console.log('\n🧪 Testing Error Handling...');
  
  // Test getting non-existent book
  try {
    const response = await makeRequest('GET', '/books/999');
    console.log('✅ Non-existent book:', response.status === 404 ? 'PASS' : 'FAIL');
  } catch (error) {
    console.log('❌ Non-existent book: FAIL');
  }
  
  // Test creating book with invalid data
  try {
    const invalidBook = { title: "", author: "" };
    const response = await makeRequest('POST', '/books', invalidBook);
    console.log('✅ Invalid data validation:', response.status === 400 ? 'PASS' : 'FAIL');
  } catch (error) {
    console.log('❌ Invalid data validation: FAIL');
  }
}

async function testSearchAndFilter() {
  console.log('\n🧪 Testing Search and Filter...');
  
  try {
    const response = await makeRequest('GET', '/books?search=gatsby');
    console.log('✅ Search functionality:', response.status === 200 ? 'PASS' : 'FAIL');
    console.log(`   Found ${response.data.count} books matching 'gatsby'`);
  } catch (error) {
    console.log('❌ Search functionality: FAIL');
  }
  
  try {
    const response = await makeRequest('GET', '/books?genre=fiction');
    console.log('✅ Genre filter:', response.status === 200 ? 'PASS' : 'FAIL');
    console.log(`   Found ${response.data.count} fiction books`);
  } catch (error) {
    console.log('❌ Genre filter: FAIL');
  }
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting API Tests...');
  console.log('📚 Testing Books REST API');
  console.log('=' * 50);
  
  // Test basic functionality
  await testWelcome();
  await testGetAllBooks();
  await testSearchAndFilter();
  
  // Test CRUD operations
  const bookId = await testCreateBook();
  if (bookId) {
    await testGetBookById(bookId);
    await testUpdateBook(bookId);
    await testDeleteBook(bookId);
  }
  
  // Test error handling
  await testErrorHandling();
  
  console.log('\n🎉 All tests completed!');
  console.log('📖 Check the results above to verify API functionality.');
  console.log('\n💡 To test manually:');
  console.log('   1. Start the server: npm start');
  console.log('   2. Import postman_collection.json into Postman');
  console.log('   3. Test all endpoints manually');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests };
