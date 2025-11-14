/**
 * Firebase Data Seeder for VenueIQ Demo
 * 
 * This script uploads seed-firebase.json to your Firebase Realtime Database
 * 
 * Usage:
 * 1. Install dependencies: npm install firebase-admin
 * 2. Set your Firebase credentials as environment variables OR update config below
 * 3. Run: node demo-data/seed-to-firebase.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURATION - Update these values
// ============================================
const FIREBASE_CONFIG = {
  databaseURL: process.env.DEMO_FIREBASE_DATABASE_URL || 'https://YOUR-PROJECT-ID.firebaseio.com',
  // If using service account (recommended):
  // serviceAccountPath: './path-to-service-account-key.json'
};

// For simple auth token approach (alternative):
const DATABASE_SECRET = process.env.FIREBASE_DATABASE_SECRET || null;

// ============================================
// Load seed data
// ============================================
const seedDataPath = path.join(__dirname, 'seed-firebase.json');
const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf8'));

console.log('🔥 VenueIQ Firebase Seeder');
console.log('================================');
console.log('📁 Loaded seed data from:', seedDataPath);
console.log('🎯 Target database:', FIREBASE_CONFIG.databaseURL);
console.log('');

// ============================================
// Upload to Firebase
// ============================================
function uploadToFirebase() {
  const url = new URL('/.json', FIREBASE_CONFIG.databaseURL);
  if (DATABASE_SECRET) {
    url.searchParams.set('auth', DATABASE_SECRET);
  }

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const data = JSON.stringify(seedData);

  console.log('📤 Uploading data to Firebase...');
  console.log('');

  const req = https.request(url, options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('✅ SUCCESS! Data uploaded to Firebase');
        console.log('');
        console.log('📊 Summary:');
        console.log('   - Ingredients:', Object.keys(seedData['restaurant-demo-v1'].ingredients).length);
        console.log('   - Recipes:', Object.keys(seedData['restaurant-demo-v1'].recipes).length);
        console.log('   - Sales days:', Object.keys(seedData['restaurant-demo-v1'].sales).length);
        console.log('   - Suppliers:', Object.keys(seedData['restaurant-demo-v1'].suppliers).length);
        console.log('');
        console.log('🎉 Your demo is now ready!');
        console.log('   Visit: https://venueiq.pro/pages/demo.html');
        console.log('');
        
        // Calculate loss info
        const recipes = seedData['restaurant-demo-v1'].recipes;
        const totalMonthlyLoss = Object.values(recipes)
          .filter(r => r.monthlyImpact)
          .reduce((sum, r) => sum + Math.abs(r.monthlyImpact), 0);
        
        console.log('💰 Demo shows $' + totalMonthlyLoss.toFixed(0) + '/month in losses across 4 items');
        
      } else {
        console.error('❌ Error uploading to Firebase');
        console.error('Status:', res.statusCode);
        console.error('Response:', responseData);
        console.error('');
        console.error('💡 Troubleshooting:');
        console.error('   1. Check your databaseURL is correct');
        console.error('   2. Verify your Firebase rules allow writes');
        console.error('   3. Make sure you have DATABASE_SECRET or service account configured');
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Request failed:', error.message);
    console.error('');
    console.error('💡 Check your internet connection and Firebase URL');
  });

  req.write(data);
  req.end();
}

// ============================================
// Instructions if config is missing
// ============================================
if (FIREBASE_CONFIG.databaseURL.includes('YOUR-PROJECT-ID')) {
  console.log('⚠️  Configuration Required!');
  console.log('');
  console.log('Please update the configuration in this file:');
  console.log('');
  console.log('Option 1: Environment Variables (recommended)');
  console.log('   set DEMO_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com');
  console.log('   set FIREBASE_DATABASE_SECRET=your-database-secret');
  console.log('   node demo-data/seed-to-firebase.js');
  console.log('');
  console.log('Option 2: Edit this file');
  console.log('   Update FIREBASE_CONFIG.databaseURL at the top of seed-to-firebase.js');
  console.log('   Update DATABASE_SECRET with your Firebase database secret');
  console.log('');
  console.log('Option 3: Use Firebase Console (easiest!)');
  console.log('   1. Go to https://console.firebase.google.com/');
  console.log('   2. Select your project → Realtime Database');
  console.log('   3. Click ⋮ menu → Import JSON');
  console.log('   4. Upload: demo-data/seed-firebase.json');
  console.log('');
  process.exit(1);
}

// Run the upload
uploadToFirebase();
