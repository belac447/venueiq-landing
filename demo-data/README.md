# VenueIQ Demo Data - Setup Instructions

## 📊 Populating Demo Data in Firebase

Your interactive demo needs data in Firebase Realtime Database to display recipes, ingredients, sales, and menu information.

### Method 1: Import JSON Data (Recommended - Quick)

1. **Go to Firebase Console:**
   - Visit https://console.firebase.google.com/
   - Select your demo project

2. **Navigate to Realtime Database:**
   - Click "Realtime Database" in the left sidebar
   - If you haven't created a database yet, click "Create Database"
   - Choose location (e.g., us-central1)
   - Start in **test mode** for demo purposes

3. **Import the Seed Data:**
   - Click the ⋮ (three dots) menu in the top right
   - Select "Import JSON"
   - Upload the `seed-firebase.json` file from this folder
   - Click "Import"

4. **Verify the Data:**
   - You should see a `restaurant-demo-v1` node with:
     - `ingredients` - 10 sample ingredients
     - `recipes` - 5 sample recipes (pizzas and salads)
     - `sales` - 10 days of sales data
     - `suppliers` - 5 supplier contacts
     - `menuCategories` - 4 menu categories
     - `restaurantInfo` - Basic restaurant details

### Method 2: Manual Entry (Alternative)

If you prefer to enter data manually or want to customize:

1. Open Firebase Console → Realtime Database
2. Click the `+` icon to add child nodes
3. Follow the structure in `seed-firebase.json`

### Method 3: Using Firebase Admin SDK (Advanced)

If you want to programmatically seed data:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./path-to-service-account.json');
const seedData = require('./seed-firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com'
});

const db = admin.database();
const ref = db.ref('/');

ref.set(seedData)
  .then(() => {
    console.log('✅ Demo data imported successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  });
```

---

## 🔒 Security Rules for Demo Database

After importing data, set up security rules:

1. Go to Firebase Console → Realtime Database → Rules
2. Use these rules for demo/testing:

```json
{
  "rules": {
    "restaurant-demo-v1": {
      ".read": true,
      ".write": true
    }
  }
}
```

**⚠️ IMPORTANT:** These rules allow public read/write access. This is fine for a demo, but:
- Use a separate Firebase project for demo vs production
- Don't store any real/sensitive data in the demo database
- Consider more restrictive rules if deployed publicly

**Production-ready rules example:**
```json
{
  "rules": {
    "restaurant-demo-v1": {
      ".read": "auth != null",
      ".write": "auth != null && auth.uid == 'specific-user-id'"
    }
  }
}
```

---

## 🎯 What the Demo Data Includes

### Ingredients (10 items)
- Mozzarella Cheese, Tomato Sauce, Pizza Dough
- Pepperoni, Basil, Olive Oil
- Chicken Breast, Parmesan, Lettuce, Caesar Dressing
- Each with pricing, supplier, stock levels

### Recipes (5 items)
1. **Margherita Pizza** - $14.99, 28.5% food cost, HIGH popularity
2. **Pepperoni Pizza** - $16.99, 32.8% food cost, VERY HIGH popularity (Star)
3. **Chicken Caesar Salad** - $12.99, 30.2% food cost, MEDIUM popularity
4. **Quattro Formaggi Pizza** - $18.99, 35.1% food cost, LOW popularity (Dog)
5. **Garden Salad** - $8.99, 25.8% food cost, MEDIUM popularity

### Sales Data (10 days)
- November 1-10, 2024
- Realistic daily volumes per recipe
- Shows trends and patterns for analytics

### Suppliers (5 companies)
- Complete contact information
- Categories and ratings
- Ready for inventory management

---

## 🧪 Testing the Demo

After importing data:

1. **Open your demo page:**
   - Navigate to https://your-site.netlify.app/pages/demo.html
   - Or locally: http://localhost:8000/pages/demo.html

2. **The demo should show:**
   - ✅ CostIQ: 5 recipes with calculated costs
   - ✅ RevenueIQ: Sales trends and charts
   - ✅ MenuIQ: BCG matrix with Stars/Dogs classification
   - ✅ StockIQ: 10 ingredients with stock levels

3. **If data doesn't appear:**
   - Check browser console for errors
   - Verify Firebase config in Netlify environment variables
   - Ensure database rules allow read access
   - Check the `__app_id` in demo/index.html matches "restaurant-demo-v1"

---

## 🔄 Updating Demo Data

To update data after initial import:

1. **Edit `seed-firebase.json`** with your changes
2. **Re-import in Firebase Console** (overwrites existing data)
3. Or **manually edit** specific nodes in Firebase Console

**Useful updates:**
- Add more recipes for variety
- Extend sales data for longer trends
- Adjust food cost percentages to show different scenarios
- Add seasonal ingredients

---

## 📈 BCG Matrix Classification

The demo data is designed to show all BCG matrix quadrants:

| Recipe | Popularity | Profitability | Classification |
|--------|-----------|---------------|----------------|
| Pepperoni Pizza | Very High | High | ⭐ **Star** - Promote! |
| Margherita Pizza | High | High | ⭐ **Star** - Keep! |
| Chicken Caesar Salad | Medium | Medium | 💰 **Cash Cow** |
| Garden Salad | Medium | Medium | 💰 **Cash Cow** |
| Quattro Formaggi | Low | Low | 🐕 **Dog** - Consider removing |

This gives users a realistic view of menu engineering in action.

---

## 🎨 Customizing for Your Brand

Want to make the demo more specific to your venue type?

**For Italian Restaurant:**
- Keep pizza-focused recipes
- Add pasta dishes
- Include Italian suppliers

**For Cafe/Coffee Shop:**
- Replace recipes with coffee drinks, pastries
- Adjust ingredients to coffee beans, milk, syrups
- Update supplier names

**For Fine Dining:**
- Premium ingredients with higher prices
- Complex recipes with more components
- Lower volumes, higher margins

Just edit `seed-firebase.json` and re-import!

---

## 🆘 Troubleshooting

**Problem: "No data" or blank screens**
- ✅ Verify data imported successfully in Firebase Console
- ✅ Check database rules allow `.read: true`
- ✅ Confirm `__app_id` matches your database path
- ✅ Check browser console for Firebase errors

**Problem: "Permission denied" errors**
- ✅ Update security rules to allow read access
- ✅ Check Firebase project is correctly configured

**Problem: Some modules show data, others don't**
- ✅ Ensure all required nodes exist (ingredients, recipes, sales)
- ✅ Check for typos in field names
- ✅ Verify data structure matches Flutter app expectations

---

## 📚 Data Structure Reference

```
restaurant-demo-v1/
├── ingredients/
│   └── ing_XXX/
│       ├── name: string
│       ├── category: string
│       ├── unit: string
│       ├── currentPrice: number
│       ├── supplier: string
│       ├── lastUpdated: string
│       └── stockLevel: number
│
├── recipes/
│   └── rec_XXX/
│       ├── name: string
│       ├── category: string
│       ├── servings: number
│       ├── sellingPrice: number
│       ├── ingredients: map
│       ├── foodCostPercentage: number
│       ├── totalCost: number
│       ├── grossProfit: number
│       ├── popularity: string
│       └── lastUpdated: string
│
├── sales/
│   └── YYYY-MM-DD/
│       └── rec_XXX/
│           ├── quantity: number
│           └── revenue: number
│
├── suppliers/
│   └── sup_XXX/
│       ├── name: string
│       ├── contact: string
│       ├── email: string
│       ├── phone: string
│       ├── category: string
│       └── rating: number
│
├── menuCategories/
│   └── cat_XXX/
│       ├── name: string
│       ├── displayOrder: number
│       └── active: boolean
│
└── restaurantInfo/
    ├── name: string
    ├── address: string
    ├── phone: string
    ├── email: string
    ├── currency: string
    ├── timezone: string
    └── targetFoodCostPercentage: number
```

---

Need help? Check the main [SETUP-INSTRUCTIONS.md](../SETUP-INSTRUCTIONS.md) or contact support.
