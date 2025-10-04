#!/bin/bash

# Portfolio Full Stack Startup Script
# This script starts both the frontend and backend services

echo "🚀 Starting Portfolio Full Stack Application..."
echo "=================================="

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17+ and try again."
    exit 1
fi

# Check if Node.js or Bun is installed
if ! command -v node &> /dev/null && ! command -v bun &> /dev/null; then
    echo "❌ Node.js or Bun is not installed. Please install one of them and try again."
    exit 1
fi

# Function to start backend
start_backend() {
    echo "📦 Starting Spring Boot Backend..."
    cd backend
    
    # Check if mvnw exists and is executable
    if [ -x "./mvnw" ]; then
        ./mvnw spring-boot:run &
    elif command -v mvn &> /dev/null; then
        mvn spring-boot:run &
    else
        echo "❌ Maven is not available. Please install Maven or ensure mvnw is executable."
        exit 1
    fi
    
    BACKEND_PID=$!
    echo "✅ Backend started with PID: $BACKEND_PID"
    cd ..
}

# Function to start frontend
start_frontend() {
    echo "🎨 Starting React Frontend..."
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        echo "📥 Installing frontend dependencies..."
        if command -v bun &> /dev/null; then
            bun install
        else
            npm install
        fi
    fi
    
    # Start the frontend
    if command -v bun &> /dev/null; then
        bun dev &
    else
        npm run dev &
    fi
    
    FRONTEND_PID=$!
    echo "✅ Frontend started with PID: $FRONTEND_PID"
}

# Function to cleanup processes on exit
cleanup() {
    echo "🛑 Shutting down services..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        echo "🔧 Backend stopped"
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        echo "🎨 Frontend stopped"
    fi
    echo "👋 Goodbye!"
}

# Set up cleanup on script exit
trap cleanup EXIT INT TERM

# Start services
start_backend
sleep 5  # Give backend time to start
start_frontend

echo "=================================="
echo "🎉 Portfolio Application is starting!"
echo ""
echo "📍 Frontend: http://localhost:5173"
echo "📍 Backend:  http://localhost:8080"
echo "📍 H2 Console: http://localhost:8080/h2-console"
echo ""
echo "Press Ctrl+C to stop all services"
echo "=================================="

# Wait for user to stop the services
wait