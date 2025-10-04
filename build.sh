#!/bin/bash

# Production Build Script
# This script builds both frontend and backend for production deployment

echo "🏗️  Building Portfolio for Production..."
echo "======================================="

# Build Frontend
echo "📦 Building Frontend..."
if command -v bun &> /dev/null; then
    bun run build
else
    npm run build
fi

if [ $? -eq 0 ]; then
    echo "✅ Frontend build completed successfully!"
    echo "📁 Build files are in: ./dist"
else
    echo "❌ Frontend build failed!"
    exit 1
fi

echo ""

# Build Backend
echo "🔧 Building Backend..."
cd backend

if [ -x "./mvnw" ]; then
    ./mvnw clean package -DskipTests
elif command -v mvn &> /dev/null; then
    mvn clean package -DskipTests
else
    echo "❌ Maven is not available. Please install Maven or ensure mvnw is executable."
    exit 1
fi

if [ $? -eq 0 ]; then
    echo "✅ Backend build completed successfully!"
    echo "📁 JAR file is in: ./backend/target"
else
    echo "❌ Backend build failed!"
    exit 1
fi

cd ..

echo ""
echo "======================================="
echo "🎉 Production build completed!"
echo ""
echo "📋 Deployment Instructions:"
echo "Frontend: Deploy ./dist folder to your static hosting service"
echo "Backend:  Deploy ./backend/target/*.jar to your Java hosting service"
echo ""
echo "🌐 Don't forget to:"
echo "1. Set VITE_API_URL in frontend environment"
echo "2. Configure database connection in backend"
echo "3. Set SPRING_PROFILES_ACTIVE=prod for backend"
echo "======================================="