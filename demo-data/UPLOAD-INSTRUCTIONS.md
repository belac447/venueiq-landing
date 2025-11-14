# 🔥 Firebase Data Upload Instructions

## Quick Summary
Your demo data is ready! It shows:
- **$2M annual revenue** (14-day sample period)
- **$2,800/month in losses** across 4 items with outdated costs
- Perfect for demonstrating VenueIQ's value proposition in the BCG matrix

---

## 📤 Option 1: Firebase Console (EASIEST - 2 minutes)

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Select your VenueIQ project

2. **Navigate to Realtime Database**
   - Left sidebar → Build → Realtime Database
   - If not created yet, click "Create Database"
   - Choose region closest to you
   - Start in **test mode** for now

3. **Upload the JSON**
   - Click the three-dots menu (⋮) in the top right
   - Select "Import JSON"
   - Choose: `demo-data/seed-firebase.json`
   - Click "Import"
   - ✅ Done!

4. **Set Database Rules** (important for demo to work)
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
   - Click "Rules" tab
   - Paste the above rules
   - Click "Publish"

5. **Test Your Demo**
   - Visit: https://venueiq.pro/pages/demo.html
   - You should now see all the data populated!

---

## 📤 Option 2: Using REST API (for automation)

### Using PowerShell:
```powershell
# Set your Firebase project ID
$PROJECT_ID = "your-project-id"

# Upload the data
$seedData = Get-Content "demo-data/seed-firebase.json" -Raw
Invoke-RestMethod -Uri "https://$PROJECT_ID-default-rtdb.firebaseio.com/.json" `
                  -Method Put `
                  -Body $seedData `
                  -ContentType "application/json"
```

### Using curl:
```bash
curl -X PUT \
  -d @demo-data/seed-firebase.json \
  https://YOUR-PROJECT-ID-default-rtdb.firebaseio.com/.json
```

---

## 📊 What's in the Data?

### Ingredients (10 items)
- Includes price history for pepperoni (+21%), chicken (+25%), parmesan (+27%)
- Shows recent price increases that aren't reflected in recipes

### Recipes (6 items)
- ✅ **Margherita Pizza** - Accurate costing (28.5%)
- ❌ **Pepperoni Pizza** - Outdated cost, losing $837/month
- ❌ **Chicken Caesar Salad** - Outdated cost, losing $660/month  
- ❌ **Quattro Formaggi** - Outdated cost, losing $666/month (needs repricing)
- ✅ **Garden Salad** - Accurate costing (25.8%)
- ❌ **BBQ Chicken Pizza** - Outdated cost, losing $637/month

**Total Monthly Loss: $2,800**  
**Weekly Loss: ~$646**

### Sales Data (14 days)
- November 1-14, 2025 (current month)
- 14-day revenue: ~$76,700
- **Projected Annual: $2.0M**

### BCG Matrix Distribution
- **Stars** (High sales, good margins): Margherita, Garden Salad
- **Cash Cows** (High sales, profit issues): Pepperoni Pizza, BBQ Chicken Pizza
- **Question Marks** (Medium sales, needs attention): Caesar Salad, Quattro Formaggi
- **Dogs**: None (removed from menu)

---

## 🔍 Troubleshooting

### "Permission Denied" Error
- Make sure your database rules allow reads/writes (see Option 1, step 4)
- Database rules should have `.read: true` and `.write: true`

### "Database doesn't exist"
- Create a Realtime Database first in Firebase Console
- Choose any region (US Central recommended)
- Start in test mode

### Demo shows no data
- Verify data uploaded by checking Firebase Console → Realtime Database → Data tab
- Should see `restaurant-demo-v1` at the root
- Check that your site's Firebase config matches your project
- Update environment variables in Netlify if needed

### Need to update just sales data?
- You can upload individual sections by targeting specific paths:
  ```
  https://YOUR-PROJECT.firebaseio.com/restaurant-demo-v1/sales.json
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
