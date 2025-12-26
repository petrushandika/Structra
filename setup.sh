#!/bin/bash
# Structra Setup Script for Linux/Mac
# This script helps setup the development environment

echo "🚀 Structra Setup Script"
echo "========================"
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js: $NODE_VERSION"
else
    echo "❌ Node.js not found. Please install Node.js 20.9+ from https://nodejs.org/"
    exit 1
fi

# Check Bun
if command -v bun &> /dev/null; then
    BUN_VERSION=$(bun --version)
    echo "✅ Bun: $BUN_VERSION"
else
    echo "⚠️  Bun not found. Installing Bun..."
    curl -fsSL https://bun.sh/install | bash
    if [ $? -eq 0 ]; then
        echo "✅ Bun installed"
        export PATH="$HOME/.bun/bin:$PATH"
    else
        echo "❌ Failed to install Bun. Please install manually from https://bun.sh/"
        exit 1
    fi
fi

# Check Docker
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    echo "✅ Docker: $DOCKER_VERSION"
else
    echo "❌ Docker not found. Please install Docker from https://www.docker.com/get-started"
    exit 1
fi

# Check Docker Compose
if command -v docker-compose &> /dev/null; then
    COMPOSE_VERSION=$(docker-compose --version)
    echo "✅ Docker Compose: $COMPOSE_VERSION"
else
    echo "❌ Docker Compose not found. Please install Docker Compose"
    exit 1
fi

echo ""
echo "📦 Setting up environment files..."

# Setup frontend .env
if [ ! -f "frontend/.env.local" ]; then
    cp frontend/env.example frontend/.env.local
    echo "✅ Created frontend/.env.local"
else
    echo "⚠️  frontend/.env.local already exists, skipping..."
fi

# Setup backend .env
if [ ! -f "backend/.env" ]; then
    cp backend/env.example backend/.env
    echo "✅ Created backend/.env"
    echo "⚠️  Please edit backend/.env and add your GEMINI_API_KEY"
else
    echo "⚠️  backend/.env already exists, skipping..."
fi

echo ""
echo "🐳 Starting Docker services..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

echo ""
echo "📦 Installing dependencies..."

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
bun install
cd ..

echo ""
echo "🗄️  Setting up database..."
cd backend

# Generate Prisma Client
echo "Generating Prisma Client..."
bunx prisma generate

# Run migrations
echo "Running database migrations..."
bunx prisma migrate dev --name init

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Edit backend/.env and add your GEMINI_API_KEY"
echo "2. (Optional) Install Ollama for local LLM: https://ollama.ai/"
echo "3. Start development servers:"
echo "   - Backend: cd backend && bun run dev"
echo "   - Frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Access:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:8000"
echo "   - MinIO Console: http://localhost:9001"
echo "   - Qdrant Dashboard: http://localhost:6333/dashboard"
echo ""

