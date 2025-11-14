/**
 * Firestore Data Seeder for VenueIQ Demo
 * 
 * This script uploads demo data to your Firestore database
 * 
 * Prerequisites:
 * 1. Install Firebase Admin SDK: npm install firebase-admin
 * 2. Download service account key from Firebase Console
 * 3. Set GOOGLE_APPLICATION_CREDENTIALS environment variable
 * 
 * Usage:
 *   node demo-data/seed-firestore.js
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// ============================================
// Initialize Firebase Admin
// ============================================
let serviceAccount;

// Try to load service account key
try {
  serviceAccount = require('./serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('✅ Firebase Admin initialized with service account');
} catch (error) {
  console.error('❌ Error: Could not find serviceAccountKey.json');
  console.error('');
  console.error('Please download your service account key:');
  console.error('1. Go to https://console.firebase.google.com/');
  console.error('2. Select your project → Project Settings → Service Accounts');
  console.error('3. Click "Generate New Private Key"');
  console.error('4. Save as: demo-data/serviceAccountKey.json');
  console.error('');
  process.exit(1);
}

const db = admin.firestore();

// ============================================
// Demo Data
// ============================================
const ingredients = [
  {
    id: 'ing_001',
    name: 'Mozzarella Cheese',
    category: 'Dairy',
    unit: 'kg',
    currentPrice: 12.50,
    supplier: 'Dairy Delights Co.',
    lastUpdated: '2025-11-10',
    stockLevel: 25,
    priceHistory: [
      { date: '2025-09-01', price: 11.80 },
      { date: '2025-10-15', price: 12.20 },
      { date: '2025-11-10', price: 12.50 }
    ]
  },
  {
    id: 'ing_002',
    name: 'Tomato Sauce',
    category: 'Sauces',
    unit: 'L',
    currentPrice: 4.80,
    supplier: 'Italian Imports',
    lastUpdated: '2025-11-10',
    stockLevel: 15
  },
  {
    id: 'ing_003',
    name: 'Pizza Dough',
    category: 'Bakery',
    unit: 'kg',
    currentPrice: 3.20,
    supplier: 'Fresh Bakers Inc.',
    lastUpdated: '2025-11-10',
    stockLevel: 40
  },
  {
    id: 'ing_004',
    name: 'Pepperoni',
    category: 'Meat',
    unit: 'kg',
    currentPrice: 22.50,
    supplier: 'Premium Meats Ltd.',
    lastUpdated: '2025-11-10',
    stockLevel: 12,
    priceHistory: [
      { date: '2025-09-01', price: 18.50 },
      { date: '2025-10-01', price: 20.00 },
      { date: '2025-11-10', price: 22.50 }
    ],
    note: 'Price increased 21% - recipe costs not updated!'
  },
  {
    id: 'ing_005',
    name: 'Basil',
    category: 'Herbs',
    unit: 'bunch',
    currentPrice: 2.50,
    supplier: 'Fresh Herbs Direct',
    lastUpdated: '2025-11-10',
    stockLevel: 8
  },
  {
    id: 'ing_006',
    name: 'Olive Oil',
    category: 'Oils',
    unit: 'L',
    currentPrice: 15.00,
    supplier: 'Mediterranean Oils',
    lastUpdated: '2025-11-10',
    stockLevel: 10
  },
  {
    id: 'ing_007',
    name: 'Chicken Breast',
    category: 'Meat',
    unit: 'kg',
    currentPrice: 17.50,
    supplier: 'Fresh Poultry Co.',
    lastUpdated: '2025-11-10',
    stockLevel: 18,
    priceHistory: [
      { date: '2025-09-01', price: 14.00 },
      { date: '2025-11-10', price: 17.50 }
    ],
    note: 'Price jumped 25% - salad costs outdated!'
  },
  {
    id: 'ing_008',
    name: 'Parmesan Cheese',
    category: 'Dairy',
    unit: 'kg',
    currentPrice: 28.00,
    supplier: 'Dairy Delights Co.',
    lastUpdated: '2025-11-10',
    stockLevel: 8,
    priceHistory: [
      { date: '2025-09-01', price: 22.00 },
      { date: '2025-11-10', price: 28.00 }
    ],
    note: 'Price up 27% - quattro formaggi needs repricing!'
  },
  {
    id: 'ing_009',
    name: 'Lettuce',
    category: 'Vegetables',
    unit: 'head',
    currentPrice: 1.80,
    supplier: 'Fresh Farms',
    lastUpdated: '2025-11-10',
    stockLevel: 30
  },
  {
    id: 'ing_010',
    name: 'Caesar Dressing',
    category: 'Sauces',
    unit: 'L',
    currentPrice: 8.50,
    supplier: 'Gourmet Sauces Inc.',
    lastUpdated: '2025-11-10',
    stockLevel: 6
  }
];

const recipes = [
  {
    id: 'rec_001',
    name: 'Margherita Pizza',
    category: 'Pizza',
    servings: 1,
    sellingPrice: 14.99,
    ingredients: {
      ing_001: { quantity: 0.15, unit: 'kg' },
      ing_002: { quantity: 0.12, unit: 'L' },
      ing_003: { quantity: 0.25, unit: 'kg' },
      ing_005: { quantity: 0.1, unit: 'bunch' },
      ing_006: { quantity: 0.02, unit: 'L' }
    },
    actualCost: 4.27,
    outdatedCost: 4.27,
    foodCostPercentage: 28.5,
    grossProfit: 10.72,
    popularity: 'high',
    lastUpdated: '2025-11-10',
    lastCostUpdate: '2025-11-10',
    costingStatus: 'accurate'
  },
  {
    id: 'rec_002',
    name: 'Pepperoni Pizza',
    category: 'Pizza',
    servings: 1,
    sellingPrice: 16.99,
    ingredients: {
      ing_001: { quantity: 0.15, unit: 'kg' },
      ing_002: { quantity: 0.12, unit: 'L' },
      ing_003: { quantity: 0.25, unit: 'kg' },
      ing_004: { quantity: 0.13, unit: 'kg' }
    },
    actualCost: 7.43,
    outdatedCost: 5.57,
    foodCostPercentage: 43.7,
    outdatedFoodCostPercentage: 32.8,
    grossProfit: 9.56,
    outdatedGrossProfit: 11.42,
    popularity: 'very-high',
    lastUpdated: '2025-09-15',
    lastCostUpdate: '2025-09-15',
    costingStatus: 'outdated',
    costingIssue: 'Pepperoni price increased 21% but recipe cost not updated - losing $1.86 profit per pizza!',
    monthlyImpact: -837.00,
    weeklyImpact: -193.00
  },
  {
    id: 'rec_003',
    name: 'Chicken Caesar Salad',
    category: 'Salads',
    servings: 1,
    sellingPrice: 12.99,
    ingredients: {
      ing_007: { quantity: 0.18, unit: 'kg' },
      ing_008: { quantity: 0.04, unit: 'kg' },
      ing_009: { quantity: 1, unit: 'head' },
      ing_010: { quantity: 0.05, unit: 'L' }
    },
    actualCost: 5.47,
    outdatedCost: 3.82,
    foodCostPercentage: 42.1,
    outdatedFoodCostPercentage: 29.4,
    grossProfit: 7.52,
    outdatedGrossProfit: 9.17,
    popularity: 'medium',
    lastUpdated: '2025-09-01',
    lastCostUpdate: '2025-09-01',
    costingStatus: 'outdated',
    costingIssue: 'Chicken price up 25%, Parmesan up 27% - recipe showing 29% cost but actually 42%!',
    monthlyImpact: -660.00,
    weeklyImpact: -152.00
  },
  {
    id: 'rec_004',
    name: 'Quattro Formaggi Pizza',
    category: 'Pizza',
    servings: 1,
    sellingPrice: 18.99,
    ingredients: {
      ing_001: { quantity: 0.12, unit: 'kg' },
      ing_002: { quantity: 0.10, unit: 'L' },
      ing_003: { quantity: 0.25, unit: 'kg' },
      ing_008: { quantity: 0.11, unit: 'kg' }
    },
    actualCost: 8.59,
    outdatedCost: 6.37,
    foodCostPercentage: 45.2,
    outdatedFoodCostPercentage: 33.5,
    grossProfit: 10.40,
    outdatedGrossProfit: 12.62,
    popularity: 'medium',
    lastUpdated: '2025-09-01',
    lastCostUpdate: '2025-09-01',
    costingStatus: 'outdated',
    costingIssue: 'Parmesan up 27% - this premium pizza now costs 45% to make, needs immediate repricing to $21.99',
    monthlyImpact: -666.00,
    weeklyImpact: -154.00,
    recommendedPrice: 21.99
  },
  {
    id: 'rec_005',
    name: 'Garden Salad',
    category: 'Salads',
    servings: 1,
    sellingPrice: 8.99,
    ingredients: {
      ing_009: { quantity: 1, unit: 'head' },
      ing_005: { quantity: 0.05, unit: 'bunch' },
      ing_006: { quantity: 0.02, unit: 'L' }
    },
    actualCost: 2.32,
    outdatedCost: 2.32,
    foodCostPercentage: 25.8,
    grossProfit: 6.67,
    popularity: 'medium',
    lastUpdated: '2025-11-10',
    lastCostUpdate: '2025-11-10',
    costingStatus: 'accurate'
  },
  {
    id: 'rec_006',
    name: 'BBQ Chicken Pizza',
    category: 'Pizza',
    servings: 1,
    sellingPrice: 17.99,
    ingredients: {
      ing_001: { quantity: 0.15, unit: 'kg' },
      ing_007: { quantity: 0.14, unit: 'kg' },
      ing_003: { quantity: 0.25, unit: 'kg' }
    },
    actualCost: 5.53,
    outdatedCost: 4.18,
    foodCostPercentage: 30.7,
    outdatedFoodCostPercentage: 23.2,
    grossProfit: 12.46,
    outdatedGrossProfit: 13.81,
    popularity: 'high',
    lastUpdated: '2025-09-01',
    lastCostUpdate: '2025-09-01',
    costingStatus: 'outdated',
    costingIssue: 'Chicken price increased 25% - losing $1.35 per pizza on bestseller!',
    monthlyImpact: -637.00,
    weeklyImpact: -147.00
  }
];

const sales = {
  '2025-11-01': {
    rec_001: { quantity: 32, revenue: 479.68 },
    rec_002: { quantity: 45, revenue: 764.55 },
    rec_003: { quantity: 40, revenue: 519.60 },
    rec_004: { quantity: 30, revenue: 569.70 },
    rec_005: { quantity: 18, revenue: 161.82 },
    rec_006: { quantity: 47, revenue: 845.53 }
  },
  '2025-11-02': {
    rec_001: { quantity: 35, revenue: 524.65 },
    rec_002: { quantity: 48, revenue: 815.52 },
    rec_003: { quantity: 38, revenue: 493.62 },
    rec_004: { quantity: 28, revenue: 531.72 },
    rec_005: { quantity: 20, revenue: 179.80 },
    rec_006: { quantity: 45, revenue: 809.55 }
  },
  '2025-11-03': {
    rec_001: { quantity: 38, revenue: 569.62 },
    rec_002: { quantity: 52, revenue: 883.48 },
    rec_003: { quantity: 42, revenue: 545.58 },
    rec_004: { quantity: 32, revenue: 607.68 },
    rec_005: { quantity: 22, revenue: 197.78 },
    rec_006: { quantity: 50, revenue: 899.50 }
  },
  '2025-11-04': {
    rec_001: { quantity: 30, revenue: 449.70 },
    rec_002: { quantity: 42, revenue: 713.58 },
    rec_003: { quantity: 35, revenue: 454.65 },
    rec_004: { quantity: 26, revenue: 493.74 },
    rec_005: { quantity: 16, revenue: 143.84 },
    rec_006: { quantity: 40, revenue: 719.60 }
  },
  '2025-11-05': {
    rec_001: { quantity: 40, revenue: 599.60 },
    rec_002: { quantity: 55, revenue: 934.45 },
    rec_003: { quantity: 45, revenue: 584.55 },
    rec_004: { quantity: 35, revenue: 664.65 },
    rec_005: { quantity: 24, revenue: 215.76 },
    rec_006: { quantity: 52, revenue: 935.48 }
  },
  '2025-11-06': {
    rec_001: { quantity: 42, revenue: 629.58 },
    rec_002: { quantity: 58, revenue: 985.42 },
    rec_003: { quantity: 48, revenue: 623.52 },
    rec_004: { quantity: 38, revenue: 721.62 },
    rec_005: { quantity: 26, revenue: 233.74 },
    rec_006: { quantity: 55, revenue: 989.45 }
  },
  '2025-11-07': {
    rec_001: { quantity: 36, revenue: 539.64 },
    rec_002: { quantity: 50, revenue: 849.50 },
    rec_003: { quantity: 42, revenue: 545.58 },
    rec_004: { quantity: 32, revenue: 607.68 },
    rec_005: { quantity: 22, revenue: 197.78 },
    rec_006: { quantity: 48, revenue: 863.52 }
  },
  '2025-11-08': {
    rec_001: { quantity: 34, revenue: 509.66 },
    rec_002: { quantity: 46, revenue: 781.54 },
    rec_003: { quantity: 40, revenue: 519.60 },
    rec_004: { quantity: 30, revenue: 569.70 },
    rec_005: { quantity: 20, revenue: 179.80 },
    rec_006: { quantity: 44, revenue: 791.56 }
  },
  '2025-11-09': {
    rec_001: { quantity: 32, revenue: 479.68 },
    rec_002: { quantity: 44, revenue: 747.56 },
    rec_003: { quantity: 38, revenue: 493.62 },
    rec_004: { quantity: 28, revenue: 531.72 },
    rec_005: { quantity: 18, revenue: 161.82 },
    rec_006: { quantity: 42, revenue: 755.58 }
  },
  '2025-11-10': {
    rec_001: { quantity: 38, revenue: 569.62 },
    rec_002: { quantity: 52, revenue: 883.48 },
    rec_003: { quantity: 44, revenue: 571.56 },
    rec_004: { quantity: 34, revenue: 645.66 },
    rec_005: { quantity: 24, revenue: 215.76 },
    rec_006: { quantity: 50, revenue: 899.50 }
  },
  '2025-11-11': {
    rec_001: { quantity: 36, revenue: 539.64 },
    rec_002: { quantity: 48, revenue: 815.52 },
    rec_003: { quantity: 42, revenue: 545.58 },
    rec_004: { quantity: 32, revenue: 607.68 },
    rec_005: { quantity: 22, revenue: 197.78 },
    rec_006: { quantity: 46, revenue: 827.54 }
  },
  '2025-11-12': {
    rec_001: { quantity: 40, revenue: 599.60 },
    rec_002: { quantity: 54, revenue: 917.46 },
    rec_003: { quantity: 46, revenue: 597.54 },
    rec_004: { quantity: 36, revenue: 683.64 },
    rec_005: { quantity: 26, revenue: 233.74 },
    rec_006: { quantity: 52, revenue: 935.48 }
  },
  '2025-11-13': {
    rec_001: { quantity: 42, revenue: 629.58 },
    rec_002: { quantity: 56, revenue: 951.44 },
    rec_003: { quantity: 48, revenue: 623.52 },
    rec_004: { quantity: 38, revenue: 721.62 },
    rec_005: { quantity: 28, revenue: 251.72 },
    rec_006: { quantity: 54, revenue: 971.46 }
  },
  '2025-11-14': {
    rec_001: { quantity: 34, revenue: 509.66 },
    rec_002: { quantity: 46, revenue: 781.54 },
    rec_003: { quantity: 40, revenue: 519.60 },
    rec_004: { quantity: 30, revenue: 569.70 },
    rec_005: { quantity: 20, revenue: 179.80 },
    rec_006: { quantity: 44, revenue: 791.56 }
  }
};

const suppliers = [
  {
    id: 'sup_001',
    name: 'Dairy Delights Co.',
    contact: 'John Smith',
    email: 'orders@dairydelights.com',
    phone: '+1-555-0101',
    category: 'Dairy Products',
    rating: 4.5
  },
  {
    id: 'sup_002',
    name: 'Italian Imports',
    contact: 'Maria Romano',
    email: 'sales@italianimpports.com',
    phone: '+1-555-0102',
    category: 'Sauces & Condiments',
    rating: 4.8
  },
  {
    id: 'sup_003',
    name: 'Fresh Bakers Inc.',
    contact: 'David Chen',
    email: 'orders@freshbakers.com',
    phone: '+1-555-0103',
    category: 'Bakery',
    rating: 4.6
  },
  {
    id: 'sup_004',
    name: 'Premium Meats Ltd.',
    contact: 'Robert Johnson',
    email: 'info@premiummeats.com',
    phone: '+1-555-0104',
    category: 'Meat & Poultry',
    rating: 4.7
  },
  {
    id: 'sup_005',
    name: 'Fresh Farms',
    contact: 'Sarah Green',
    email: 'contact@freshfarms.com',
    phone: '+1-555-0105',
    category: 'Produce',
    rating: 4.4
  }
];

// ============================================
// Upload Functions
// ============================================
async function seedFirestore() {
  console.log('');
  console.log('🔥 VenueIQ Firestore Seeder');
  console.log('================================');
  console.log('');

  const batch = db.batch();
  let operationCount = 0;

  try {
    // Upload Ingredients
    console.log('📦 Uploading ingredients...');
    for (const ingredient of ingredients) {
      const { id, ...data } = ingredient;
      const ref = db.collection('ingredients').doc(id);
      batch.set(ref, data);
      operationCount++;
    }
    console.log(`   ✅ ${ingredients.length} ingredients queued`);

    // Upload Recipes
    console.log('📋 Uploading recipes...');
    for (const recipe of recipes) {
      const { id, ...data } = recipe;
      const ref = db.collection('recipes').doc(id);
      batch.set(ref, data);
      operationCount++;
    }
    console.log(`   ✅ ${recipes.length} recipes queued`);

    // Upload Sales
    console.log('💰 Uploading sales data...');
    for (const [date, salesData] of Object.entries(sales)) {
      const ref = db.collection('sales').doc(date);
      batch.set(ref, salesData);
      operationCount++;
    }
    console.log(`   ✅ ${Object.keys(sales).length} days of sales queued`);

    // Upload Suppliers
    console.log('🚚 Uploading suppliers...');
    for (const supplier of suppliers) {
      const { id, ...data } = supplier;
      const ref = db.collection('suppliers').doc(id);
      batch.set(ref, data);
      operationCount++;
    }
    console.log(`   ✅ ${suppliers.length} suppliers queued`);

    // Upload Restaurant Info
    console.log('🏪 Uploading restaurant info...');
    const restaurantRef = db.collection('settings').doc('restaurant');
    batch.set(restaurantRef, {
      name: 'Demo Pizzeria',
      address: '123 Main Street, Demo City',
      phone: '+1-555-DEMO',
      email: 'info@demopizzeria.com',
      currency: 'USD',
      timezone: 'America/New_York',
      targetFoodCostPercentage: 30.0
    });
    operationCount++;
    console.log('   ✅ Restaurant info queued');

    // Commit batch
    console.log('');
    console.log(`⏳ Committing ${operationCount} operations...`);
    await batch.commit();

    console.log('');
    console.log('✅ SUCCESS! All data uploaded to Firestore');
    console.log('');
    console.log('📊 Summary:');
    console.log(`   - Ingredients: ${ingredients.length}`);
    console.log(`   - Recipes: ${recipes.length}`);
    console.log(`   - Sales days: ${Object.keys(sales).length}`);
    console.log(`   - Suppliers: ${suppliers.length}`);
    console.log('');
    console.log('🎉 Your demo is now ready!');
    console.log('   Visit: https://venueiq.pro/pages/demo.html');
    console.log('');

    // Calculate loss info
    const totalMonthlyLoss = recipes
      .filter(r => r.monthlyImpact)
      .reduce((sum, r) => sum + Math.abs(r.monthlyImpact), 0);

    console.log(`💰 Demo shows $${totalMonthlyLoss.toFixed(0)}/month in losses across 4 items`);
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('');
    console.error('❌ Error uploading to Firestore:', error.message);
    console.error('');
    console.error('💡 Troubleshooting:');
    console.error('   1. Make sure GOOGLE_APPLICATION_CREDENTIALS is set');
    console.error('   2. Verify your service account has Firestore permissions');
    console.error('   3. Check that Firestore is enabled in your project');
    console.error('');
    process.exit(1);
  }
}

// Run the seeder
seedFirestore();
