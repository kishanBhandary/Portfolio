#!/bin/bash

# Portfolio Full Stack Startup Script with MongoDB Atlas
# This script starts both the frontend and backend services

echo "🚀 Starting Portfolio Full Stack Application with MongoDB Atlas..."
echo "=================================================================="

# Java configuration
export JAVA_HOME=/home/kishan/.sdkman/candidates/java/17.0.2-open
export PATH=$JAVA_HOME/bin:$PATH

# Bun configuration  
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# Function to start backend
start_backend() {
    echo "📦 Starting Spring Boot Backend with MongoDB Atlas..."
    cd backend
    
    # Start the backend
    ./mvnw spring-boot:run &
    BACKEND_PID=$!
    echo "✅ Backend started with PID: $BACKEND_PID"
    cd ..
}

# Function to start frontend
start_frontend() {
    echo "🎨 Starting React Frontend..."
    
    # Start the frontend with Bun
    ~/.bun/bin/bun run dev &
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
sleep 10  # Give backend time to start and connect to MongoDB Atlas
start_frontend

echo "=================================================================="
echo "🎉 Portfolio Application is starting!"
echo ""
echo "📍 Frontend:     http://localhost:5173"
echo "📍 Backend:      http://localhost:8080"
echo "📍 MongoDB:      Atlas Cloud Database"
echo ""
echo "Press Ctrl+C to stop all services"
echo "=================================================================="

# Wait for user to stop the services
wait