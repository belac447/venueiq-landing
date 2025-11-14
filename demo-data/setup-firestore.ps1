# VenueIQ Firestore Setup Script
# This script helps you upload demo data to Firestore

Write-Host "🔥 VenueIQ Firestore Demo Seeder" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "seed-firestore.js")) {
    Write-Host "❌ Error: Please run this script from the demo-data folder" -ForegroundColor Red
    Write-Host "   cd demo-data" -ForegroundColor Gray
    Write-Host "   .\setup-firestore.ps1" -ForegroundColor Gray
    exit 1
}

# Check for service account key
if (-not (Test-Path "serviceAccountKey.json")) {
    Write-Host "⚠️  Service Account Key Not Found" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To get your service account key:" -ForegroundColor White
    Write-Host "1. Go to https://console.firebase.google.com/" -ForegroundColor Gray
    Write-Host "2. Select your project" -ForegroundColor Gray
    Write-Host "3. Project Settings (⚙️) → Service Accounts" -ForegroundColor Gray
    Write-Host "4. Click 'Generate New Private Key'" -ForegroundColor Gray
    Write-Host "5. Save the file as 'serviceAccountKey.json' in this folder" -ForegroundColor Gray
    Write-Host ""
    $continue = Read-Host "Do you have the service account key ready? (y/n)"
    
    if ($continue -ne "y") {
        Write-Host "❌ Setup cancelled. Get your service account key first." -ForegroundColor Red
        exit 1
    }
    
    if (-not (Test-Path "serviceAccountKey.json")) {
        Write-Host "❌ Still can't find serviceAccountKey.json" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Found service account key" -ForegroundColor Green
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
    Write-Host ""
}

# Set environment variable
$env:GOOGLE_APPLICATION_CREDENTIALS = Join-Path $PWD "serviceAccountKey.json"
Write-Host "🔑 Credentials configured" -ForegroundColor Green
Write-Host ""

# Confirm before upload
Write-Host "⚠️  WARNING: This will upload data to your Firestore database!" -ForegroundColor Yellow
Write-Host "   Collections that will be created/overwritten:" -ForegroundColor Gray
Write-Host "   - ingredients (10 documents)" -ForegroundColor Gray
Write-Host "   - recipes (6 documents)" -ForegroundColor Gray
Write-Host "   - sales (14 documents)" -ForegroundColor Gray
Write-Host "   - suppliers (5 documents)" -ForegroundColor Gray
Write-Host "   - settings (1 document)" -ForegroundColor Gray
Write-Host ""

$confirm = Read-Host "Continue with upload? (y/n)"
if ($confirm -ne "y") {
    Write-Host "❌ Upload cancelled" -ForegroundColor Red
    exit 0
}

Write-Host ""
Write-Host "🚀 Starting upload..." -ForegroundColor Cyan
Write-Host ""

# Run the seeder
node seed-firestore.js

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "════════════════════════════════════════" -ForegroundColor Green
    Write-Host "✅ SUCCESS! Your demo is ready!" -ForegroundColor Green
    Write-Host "════════════════════════════════════════" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Visit https://venueiq.pro/pages/demo.html" -ForegroundColor White
    Write-Host "2. Your demo should now show all data" -ForegroundColor White
    Write-Host "3. Check Firestore rules are set to allow reads" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Upload failed. Check the error messages above." -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Common issues:" -ForegroundColor Yellow
    Write-Host "   - Service account doesn't have Firestore permissions" -ForegroundColor Gray
    Write-Host "   - Firestore not enabled in your Firebase project" -ForegroundColor Gray
    Write-Host "   - Wrong project ID in service account key" -ForegroundColor Gray
    Write-Host ""
}
