@echo off
echo.
echo ========================================
echo    Books REST API - Setup Script
echo ========================================
echo.

echo Installing dependencies...
npm install

echo.
echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo To start the server:
echo   npm start
echo.
echo To start in development mode:
echo   npm run dev
echo.
echo To run tests:
echo   npm test
echo.
echo To test with Postman:
echo   1. Import postman_collection.json
echo   2. Start the server
echo   3. Run the collection
echo.
pause
