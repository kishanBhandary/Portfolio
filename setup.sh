#!/bin/bash

# Development Environment Setup Script
# This script sets up the required dependencies for the Portfolio project

echo "🔧 Setting up Portfolio Development Environment..."
echo "================================================"

# Function to detect OS
detect_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if [ -f /etc/debian_version ]; then
            echo "debian"
        elif [ -f /etc/redhat-release ]; then
            echo "redhat"
        elif [ -f /etc/arch-release ]; then
            echo "arch"
        else
            echo "linux"
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        echo "macos"
    else
        echo "unknown"
    fi
}

OS=$(detect_os)
echo "📋 Detected OS: $OS"

# Install Java 17
install_java() {
    echo "☕ Installing Java 17..."
    
    case $OS in
        "debian")
            sudo apt update
            sudo apt install -y openjdk-17-jdk
            ;;
        "redhat")
            sudo yum install -y java-17-openjdk-devel
            ;;
        "arch")
            sudo pacman -S jdk17-openjdk
            ;;
        "macos")
            if command -v brew &> /dev/null; then
                brew install openjdk@17
                echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
                echo 'export JAVA_HOME="/opt/homebrew/opt/openjdk@17"' >> ~/.zshrc
            else
                echo "❌ Homebrew not found. Please install Homebrew first or install Java manually."
                exit 1
            fi
            ;;
        *)
            echo "❌ Unsupported OS for automatic Java installation."
            echo "Please install Java 17 manually from: https://adoptium.net/"
            exit 1
            ;;
    esac
}

# Install Node.js/Bun
install_node() {
    echo "📦 Installing Node.js and Bun..."
    
    # Install Node.js via NodeSource (works on most Linux distros)
    if [[ "$OS" == "debian" ]] || [[ "$OS" == "redhat" ]]; then
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        if [[ "$OS" == "debian" ]]; then
            sudo apt-get install -y nodejs
        else
            sudo yum install -y nodejs npm
        fi
    elif [[ "$OS" == "arch" ]]; then
        sudo pacman -S nodejs npm
    elif [[ "$OS" == "macos" ]]; then
        if command -v brew &> /dev/null; then
            brew install node
        fi
    fi
    
    # Install Bun
    curl -fsSL https://bun.sh/install | bash
    echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.bashrc
    echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.zshrc
}

# Check and install Java
if ! command -v java &> /dev/null; then
    install_java
else
    echo "✅ Java is already installed: $(java -version 2>&1 | head -n 1)"
fi

# Check and install Node.js
if ! command -v node &> /dev/null; then
    install_node
else
    echo "✅ Node.js is already installed: $(node -v)"
fi

# Check and install Bun
if ! command -v bun &> /dev/null; then
    echo "📦 Installing Bun..."
    curl -fsSL https://bun.sh/install | bash
    echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.bashrc
    echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.zshrc
else
    echo "✅ Bun is already installed: $(bun -v)"
fi

# Install frontend dependencies
echo "📥 Installing frontend dependencies..."
if command -v bun &> /dev/null; then
    bun install
else
    npm install
fi

echo ""
echo "================================================"
echo "🎉 Development environment setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Restart your terminal or run: source ~/.bashrc"
echo "2. Verify Java installation: java -version"
echo "3. Run the application: ./start.sh"
echo ""
echo "🔧 Troubleshooting:"
echo "- If Java is not found, you may need to set JAVA_HOME manually"
echo "- If Bun is not found, restart your terminal and try again"
echo "================================================"