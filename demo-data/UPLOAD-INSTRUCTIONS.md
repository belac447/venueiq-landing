# 🔥 Firestore Data Upload Instructions

## Quick Summary
Your demo data is ready! It shows:
- **$2M annual revenue** (14-day sample period)
- **$2,800/month in losses** across 4 items with outdated costs
- Perfect for demonstrating VenueIQ's value proposition in the BCG matrix

---

## 📤 Option 1: Using Node.js Script (RECOMMENDED - 1 minute)

1. **Install Firebase Admin SDK**
   ```powershell
   cd demo-data
   npm install firebase-admin
   ```

2. **Get Service Account Key**
   - Go to https://console.firebase.google.com/
   - Select your project → Project Settings (⚙️) → Service Accounts
   - Click "Generate New Private Key"
   - Save as `demo-data/serviceAccountKey.json`

3. **Set Environment Variable**
   ```powershell
   $env:GOOGLE_APPLICATION_CREDENTIALS="$PWD\serviceAccountKey.json"
   ```

4. **Run the Seeder**
   ```powershell
   node seed-firestore.js
   ```
   
   ✅ Done! All data uploaded to Firestore collections.

5. **Test Your Demo**
   - Visit: https://venueiq.pro/pages/demo.html
   - You should see all data populated!

---

## 📤 Option 2: Firebase Console (Manual)

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Select your VenueIQ project

2. **Navigate to Firestore**
   - Left sidebar → Build → Firestore Database
   - If not created yet, click "Create Database"
   - Choose region closest to you
   - Start in **test mode** for now

3. **Set Firestore Rules** (important for demo to work)
   - Click "Rules" tab
   - Update to:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```
   - Click "Publish"
   - ⚠️ NOTE: These are permissive rules for demo only. Secure them for production!

4. **Manually Create Collections**
   You'll need to create these collections and add documents:
   
   **Collection: `ingredients`**
   - Add 10 documents (ing_001 through ing_010)
   - Use data from `seed-firestore.js`
   
   **Collection: `recipes`**
   - Add 6 documents (rec_001 through rec_006)
   
   **Collection: `sales`**
   - Add 14 documents (dates 2025-11-01 through 2025-11-14)
   
   **Collection: `suppliers`**
   - Add 5 documents (sup_001 through sup_005)
   
   **Collection: `settings`**
   - Add document `restaurant` with restaurant info

   💡 **This is tedious** - Use Option 1 instead!

---

## 📊 What's in the Data?

### Firestore Collections

**Collection: `ingredients` (10 documents)**
- Includes price history for pepperoni (+21%), chicken (+25%), parmesan (+27%)
- Shows recent price increases that aren't reflected in recipes

**Collection: `recipes` (6 documents)**
- ✅ **Margherita Pizza** - Accurate costing (28.5%)
- ❌ **Pepperoni Pizza** - Outdated cost, losing $837/month
- ❌ **Chicken Caesar Salad** - Outdated cost, losing $660/month  
- ❌ **Quattro Formaggi** - Outdated cost, losing $666/month (needs repricing)
- ✅ **Garden Salad** - Accurate costing (25.8%)
- ❌ **BBQ Chicken Pizza** - Outdated cost, losing $637/month

**Total Monthly Loss: $2,800**  
**Weekly Loss: ~$646**

**Collection: `sales` (14 documents)**
- November 1-14, 2025 (current month)
- Each document ID is a date (e.g., "2025-11-01")
- Contains sales by recipe ID
- 14-day revenue: ~$76,700
- **Projected Annual: $2.0M**

**Collection: `suppliers` (5 documents)**
- sup_001 through sup_005
- Contact info, ratings, categories

**Collection: `settings` (1 document)**
- Document ID: "restaurant"
- Restaurant name, address, target food cost %

### BCG Matrix Distribution
- **Stars** (High sales, good margins): Margherita, Garden Salad
- **Cash Cows** (High sales, profit issues): Pepperoni Pizza, BBQ Chicken Pizza
- **Question Marks** (Medium sales, needs attention): Caesar Salad, Quattro Formaggi
- **Dogs**: None (removed from menu)

---

## 🔍 Troubleshooting

### "Permission Denied" Error
- Make sure your Firestore rules allow reads/writes (see Option 2, step 3)
- For demo purposes, allow all reads/writes
- Secure them properly for production

### "GOOGLE_APPLICATION_CREDENTIALS not found"
- Download service account key from Firebase Console
- Set environment variable to point to the JSON file
- Make sure the path is correct

### "Firestore doesn't exist"
- Create a Firestore Database first in Firebase Console
- Choose any region (US Central recommended)
- Start in test mode

### Demo shows no data
- Verify data uploaded by checking Firebase Console → Firestore → Data tab
- Should see collections: ingredients, recipes, sales, suppliers, settings
- Check that your Flutter app is configured to use Firestore (not Realtime Database)
- Update Firebase config in your demo app if needed

### Need to delete and re-upload?
```powershell
# Delete all data (careful!)
# Run seed-firestore.js again to re-upload
```

---

## 🎯 Next Steps

1. Upload the data using Option 1 (Firebase Console)
2. Test your demo at https://venueiq.pro/pages/demo.html
3. Verify all 6 recipes show up in CostIQ
4. Check that RevenueIQ shows November 2025 sales trends
5. Confirm BCG matrix displays items in correct quadrants

---

## 💡 Tips

- The demo is configured to show realistic costing problems
- Pepperoni Pizza is your bestseller but has biggest profit leak ($837/mo)
- Quattro Formaggi shows why premium items need careful monitoring
- Caesar Salad demonstrates ingredient price spike issues
- BCG matrix will show which items need immediate attention

**Your demo now tells a compelling story about hidden profit leaks!** 🎉
