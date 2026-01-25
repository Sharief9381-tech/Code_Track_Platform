# Troubleshooting Guide

## Common Errors & Solutions

### 1. "Unexpected token '<', "<!DOCTYPE "... is not valid JSON"

This error occurs when an API endpoint returns HTML (usually an error page) instead of JSON. Here's how to fix it:

#### 🔍 **Step 1: Check API Health**
Visit: `http://localhost:3000/api/health`

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-23T10:30:00.000Z",
  "message": "API is working correctly"
}
```

**If you get HTML instead:** The Next.js server isn't running properly.

#### 🔍 **Step 2: Test Database Connection**
Visit: `http://localhost:3000/api/test-db`

**Expected Response:**
```json
{
  "status": "success",
  "message": "Database connection successful",
  "database": "codetrack",
  "collections": [],
  "timestamp": "2024-01-23T10:30:00.000Z"
}
```

**If you get an error:** Database connection is failing.

### 2. "window is not defined" (SSR Error)

This error occurs when client-side code tries to access browser APIs during server-side rendering.

#### 🔧 **Common Causes:**
- Using `window.location` in components
- Accessing `localStorage` or `sessionStorage`
- Using browser-only APIs during SSR

#### 🔧 **Solutions:**
1. **Use Next.js hooks properly:**
   ```typescript
   // ❌ Wrong - causes SSR error
   const searchParams = new URLSearchParams(window.location.search)
   
   // ✅ Correct - SSR safe
   import { useSearchParams } from 'next/navigation'
   const searchParams = useSearchParams()
   ```

2. **Use ClientOnly wrapper:**
   ```typescript
   import { ClientOnly } from '@/components/client-only'
   
   <ClientOnly fallback={<Loading />}>
     <ComponentThatUsesWindow />
   </ClientOnly>
   ```

3. **Use useEffect for browser APIs:**
   ```typescript
   useEffect(() => {
     // Browser-only code here
     const url = window.location.href
   }, [])
   ```

### 🔧 **Common Fixes**

#### **1. Environment Variables Missing**
```bash
# Check if .env.local exists
ls -la .env.local

# If missing, run:
npm run setup
```

#### **2. MongoDB Not Running**
```bash
# For local MongoDB:
mongod --version  # Check if installed
brew services start mongodb-community  # macOS
sudo systemctl start mongod  # Linux

# For MongoDB Atlas:
# Check your connection string in .env.local
```

#### **3. Wrong MongoDB URI**
Check `.env.local`:
```env
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/codetrack

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codetrack
```

#### **4. Next.js Server Issues**
```bash
# Stop and restart the server
Ctrl+C
npm run dev

# Clear Next.js cache
rm -rf .next
npm run dev
```

#### **5. Port Conflicts**
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill process if needed
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

### 🧪 **Testing Steps**

#### **1. Use the Test Page**
Visit: `http://localhost:3000/test-auth`

1. Click **"Test API Health"** - Should return success
2. Click **"Test Database"** - Should connect to MongoDB
3. Click **"Create Test Users"** - Should create users in database
4. Click **"Test Student Login"** - Should authenticate successfully

#### **2. Check Browser Console**
Open Developer Tools (F12) and check:
- **Console tab** - Look for JavaScript errors
- **Network tab** - Check API request/response details

#### **3. Check Server Logs**
In your terminal running `npm run dev`, look for:
- Database connection messages
- API request logs
- Error stack traces

### 🔍 **Debugging API Calls**

#### **Manual API Testing**
```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test database
curl http://localhost:3000/api/test-db

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

#### **Check Response Headers**
```javascript
// In browser console
fetch('/api/health')
  .then(response => {
    console.log('Status:', response.status)
    console.log('Headers:', response.headers)
    return response.text()
  })
  .then(text => console.log('Response:', text))
```

### 🚨 **Emergency Reset**

If nothing works, try a complete reset:

```bash
# 1. Stop the server
Ctrl+C

# 2. Clear all caches
rm -rf .next
rm -rf node_modules
rm package-lock.json

# 3. Reinstall dependencies
npm install

# 4. Reset environment
rm .env.local
npm run setup

# 5. Start fresh
npm run dev
```

### 📞 **Getting Help**

If you're still having issues:

1. **Check the exact error message** in browser console
2. **Check server logs** in terminal
3. **Test individual endpoints** using the test page
4. **Verify environment variables** are set correctly
5. **Ensure MongoDB is accessible**

### 🎯 **Quick Checklist**

- [ ] Next.js server running (`npm run dev`)
- [ ] MongoDB running (local) or accessible (Atlas)
- [ ] `.env.local` file exists with correct `MONGODB_URI`
- [ ] Port 3000 is available
- [ ] No JavaScript errors in browser console
- [ ] API health endpoint returns JSON
- [ ] Database test endpoint connects successfully
- [ ] No SSR errors (window/document access)

### 📋 **Environment Setup Verification**

```bash
# Run verification script
npm run verify

# Should show all green checkmarks
```

This should resolve common errors and get your dynamic platform working correctly!