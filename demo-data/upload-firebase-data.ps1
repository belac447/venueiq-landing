# VenueIQ Firebase Data Uploader
# This PowerShell script uploads seed-firebase.json to your Firebase Realtime Database

Write-Host "🔥 VenueIQ Firebase Data Uploader" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$FIREBASE_PROJECT_ID = Read-Host "Enter your Firebase Project ID (e.g. venueiq-demo)"
$DATABASE_URL = "https://$FIREBASE_PROJECT_ID-default-rtdb.firebaseio.com"

Write-Host ""
Write-Host "🎯 Target: $DATABASE_URL" -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  IMPORTANT: Make sure your Firebase Realtime Database rules allow writes!" -ForegroundColor Yellow
Write-Host "   Go to: https://console.firebase.google.com/project/$FIREBASE_PROJECT_ID/database/$FIREBASE_PROJECT_ID-default-rtdb/rules" -ForegroundColor Gray
Write-Host "   Set rules to:" -ForegroundColor Gray
Write-Host '   {' -ForegroundColor Gray
Write-Host '     "rules": {' -ForegroundColor Gray
Write-Host '       ".read": true,' -ForegroundColor Gray
Write-Host '       ".write": true' -ForegroundColor Gray
Write-Host '     }' -ForegroundColor Gray
Write-Host '   }' -ForegroundColor Gray
Write-Host ""

$confirm = Read-Host "Continue with upload? (y/n)"
if ($confirm -ne "y") {
    Write-Host "❌ Upload cancelled" -ForegroundColor Red
    exit
}

# Load seed data
$seedDataPath = Join-Path $PSScriptRoot "seed-firebase.json"
if (-not (Test-Path $seedDataPath)) {
    Write-Host "❌ Error: seed-firebase.json not found at $seedDataPath" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📁 Loading seed data..." -ForegroundColor Green
$seedData = Get-Content $seedDataPath -Raw

try {
    Write-Host "📤 Uploading to Firebase..." -ForegroundColor Green
    
    $response = Invoke-RestMethod -Uri "$DATABASE_URL/.json" `
                                  -Method Put `
                                  -Body $seedData `
                                  -ContentType "application/json" `
                                  -ErrorAction Stop
    
    Write-Host ""
    Write-Host "✅ SUCCESS! Data uploaded to Firebase" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Summary:" -ForegroundColor Cyan
    
    $data = $seedData | ConvertFrom-Json
    $demoData = $data.'restaurant-demo-v1'
    
    Write-Host "   - Ingredients: $($demoData.ingredients.PSObject.Properties.Count)" -ForegroundColor White
    Write-Host "   - Recipes: $($demoData.recipes.PSObject.Properties.Count)" -ForegroundColor White
    Write-Host "   - Sales days: $($demoData.sales.PSObject.Properties.Count)" -ForegroundColor White
    Write-Host "   - Suppliers: $($demoData.suppliers.PSObject.Properties.Count)" -ForegroundColor White
    Write-Host ""
    Write-Host "🎉 Your demo is now ready!" -ForegroundColor Green
    Write-Host "   Visit: https://venueiq.pro/pages/demo.html" -ForegroundColor Cyan
    Write-Host ""
    
    # Calculate losses
    $totalLoss = 0
    $demoData.recipes.PSObject.Properties | ForEach-Object {
        if ($_.Value.monthlyImpact) {
            $totalLoss += [Math]::Abs($_.Value.monthlyImpact)
        }
    }
    
    Write-Host "💰 Demo shows `$$($totalLoss.ToString('N0'))/month in losses across 4 items" -ForegroundColor Yellow
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "❌ Error uploading to Firebase" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Troubleshooting:" -ForegroundColor Yellow
    Write-Host "   1. Verify project ID is correct: $FIREBASE_PROJECT_ID" -ForegroundColor Gray
    Write-Host "   2. Check Firebase Realtime Database is created" -ForegroundColor Gray
    Write-Host "   3. Verify database rules allow writes (see instructions above)" -ForegroundColor Gray
    Write-Host "   4. Try uploading manually via Firebase Console:" -ForegroundColor Gray
    Write-Host "      https://console.firebase.google.com/project/$FIREBASE_PROJECT_ID/database/$FIREBASE_PROJECT_ID-default-rtdb/data" -ForegroundColor Gray
    Write-Host ""
    exit 1
}
