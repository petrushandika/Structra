# Structra Setup Script for Windows
# This script helps setup the development environment

Write-Host "🚀 Structra Setup Script" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js 20.9+ from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check Bun
try {
    $bunVersion = bun --version
    Write-Host "✅ Bun: $bunVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Bun not found. Installing Bun..." -ForegroundColor Yellow
    try {
        npm install -g bun
        Write-Host "✅ Bun installed" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to install Bun. Please install manually from https://bun.sh/" -ForegroundColor Red
        exit 1
    }
}

# Check Docker
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker not found. Please install Docker Desktop from https://www.docker.com/get-started" -ForegroundColor Red
    exit 1
}

# Check Docker Compose
try {
    $composeVersion = docker-compose --version
    Write-Host "✅ Docker Compose: $composeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Compose not found. Please install Docker Desktop which includes Docker Compose" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Setting up environment files..." -ForegroundColor Yellow

# Setup frontend .env
if (-not (Test-Path "frontend\.env.local")) {
    Copy-Item "frontend\env.example" "frontend\.env.local"
    Write-Host "✅ Created frontend/.env.local" -ForegroundColor Green
} else {
    Write-Host "⚠️  frontend/.env.local already exists, skipping..." -ForegroundColor Yellow
}

# Setup backend .env
if (-not (Test-Path "backend\.env")) {
    Copy-Item "backend\env.example" "backend\.env"
    Write-Host "✅ Created backend/.env" -ForegroundColor Green
    Write-Host "⚠️  Please edit backend/.env and add your GEMINI_API_KEY" -ForegroundColor Yellow
} else {
    Write-Host "⚠️  backend/.env already exists, skipping..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🐳 Starting Docker services..." -ForegroundColor Yellow
docker-compose up -d

Write-Host ""
Write-Host "⏳ Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
Set-Location frontend
npm install
Set-Location ..

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
Set-Location backend
bun install
Set-Location ..

Write-Host ""
Write-Host "🗄️  Setting up database..." -ForegroundColor Yellow
Set-Location backend

# Generate Prisma Client
Write-Host "Generating Prisma Client..." -ForegroundColor Cyan
bunx prisma generate

# Run migrations
Write-Host "Running database migrations..." -ForegroundColor Cyan
bunx prisma migrate dev --name init

Set-Location ..

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "1. Edit backend/.env and add your GEMINI_API_KEY" -ForegroundColor White
Write-Host "2. (Optional) Install Ollama for local LLM: https://ollama.ai/" -ForegroundColor White
Write-Host "3. Start development servers:" -ForegroundColor White
Write-Host "   - Backend: cd backend && bun run dev" -ForegroundColor White
Write-Host "   - Frontend: cd frontend && npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Access:" -ForegroundColor Cyan
Write-Host "   - Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   - Backend API: http://localhost:8000" -ForegroundColor White
Write-Host "   - MinIO Console: http://localhost:9001" -ForegroundColor White
Write-Host "   - Qdrant Dashboard: http://localhost:6333/dashboard" -ForegroundColor White
Write-Host ""

