# 🚀 Complete Setup Instructions - AI Chatbot Integration

## ✅ What Was Fixed

1. **Endpoint URL**: Changed from absolute URL to relative path `/api/chat` so Vite proxy works
2. **Enhanced Logging**: Added detailed logging in Flask to see all incoming requests
3. **Connection Status**: Added visual indicator in UI to show backend connection status
4. **Error Handling**: Improved error messages and debugging

## 📋 Step-by-Step Setup

### Step 1: Start Flask Backend Server

1. Open a **new terminal/PowerShell window**
2. Navigate to the `bo` folder:
   ```bash
   cd C:\Users\kavya\zenspace_final\bo
   ```
3. Start the Flask server:
   ```bash
   python app.py
   ```

**✅ What you should see:**
```
============================================================
🚀 STARTING FLASK SERVER
============================================================
📍 Server will run on: http://0.0.0.0:5000
📍 Accessible at: http://127.0.0.1:5000
📍 Health check: http://127.0.0.1:5000/api/health
📍 Chat endpoint: http://127.0.0.1:5000/api/chat
============================================================
✅ Waiting for requests...
   (When you type in the UI, you should see logs here)
============================================================

✅ MongoDB Connected!  (or ⚠️ MongoDB not found - that's OK)
 * Running on http://0.0.0.0:5000
 * Debug mode: on
```

**⚠️ IMPORTANT:** Keep this terminal window open! The Flask server must be running.

---

### Step 2: Test Flask Server (Optional but Recommended)

In a **new terminal window**, test if Flask is working:

```bash
cd C:\Users\kavya\zenspace_final\bo
python test_server.py
```

**✅ Expected output:**
```
🧪 TESTING FLASK SERVER
1️⃣ Testing health endpoint...
   Status: 200
   Response: {'status': 'ok', 'message': 'Flask server is running!'}
   ✅ Health check passed!

2️⃣ Testing chat endpoint...
   Status: 200
   Response: {'reply': '...'}
   ✅ Chat endpoint working! AI replied: ...
```

If this works, your Flask server is ready! ✅

---

### Step 3: Start UI (Vite Dev Server)

1. Open a **new terminal/PowerShell window** (keep Flask terminal open!)
2. Navigate to the `zenui` folder:
   ```bash
   cd C:\Users\kavya\zenspace_final\zenui
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```

**✅ What you should see:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
  ➜  press h + enter to show help
```

**⚠️ IMPORTANT:** Keep this terminal window open too!

---

### Step 4: Open UI in Browser

1. Open your browser
2. Go to: **http://localhost:5173** or **http://127.0.0.1:5173**
3. Navigate to: **Zen Tools** → **AI Chatbot Assistance**

---

### Step 5: Test the Chatbot

1. **Check the status indicator** (top of chat screen):
   - 🟢 **Green "Online"** = Backend connected ✅
   - 🔴 **Red "Backend Offline"** = Flask not running ❌
   - 🟡 **Yellow "Checking..."** = Still checking

2. **Type a message** (e.g., "hello") and press Send

3. **Check Flask terminal** - You should see:
   ```
   ============================================================
   🔵 INCOMING REQUEST:
      Method: POST
      URL: http://127.0.0.1:5000/api/chat
      Path: /api/chat
      JSON Body: {'message': 'hello'}
   ============================================================

   ============================================================
   🤖 CHAT ENDPOINT HIT!
   ============================================================

   📩 RECEIVED MESSAGE: 'hello'
      (This should appear in your Flask terminal when you type in UI)
   📤 Sending Reply: [AI response]
   ```

4. **Check browser console** (F12 → Console tab):
   ```
   🤖 Sending message to: /api/chat
   📤 Message: hello
   📥 Response status: 200 OK
   📦 Response data: {reply: "..."}
   ✅ Got reply: ...
   ```

5. **Check MongoDB** (if running):
   - Your message and AI reply should be saved in MongoDB
   - Database: `zenspace_db`
   - Collection: `chats`

---

## 🔍 Troubleshooting

### Problem: "Backend Offline" in UI

**Solution:**
1. Check if Flask server is running (Step 1)
2. Check Flask terminal for errors
3. Try accessing: http://127.0.0.1:5000/api/health in browser
   - Should show: `{"status":"ok","message":"Flask server is running!"}`

### Problem: No logs in Flask terminal when typing

**Possible causes:**
1. **Flask server not running** - Start it (Step 1)
2. **Wrong port** - Make sure Flask is on port 5000
3. **Vite proxy not working** - Check Vite terminal for proxy errors
4. **Browser cache** - Hard refresh (Ctrl+Shift+R)

**Debug steps:**
1. Open browser DevTools (F12) → Network tab
2. Type a message and send
3. Look for a request to `/api/chat`
4. Check the request details:
   - Status should be 200
   - Response should have `{"reply": "..."}`

### Problem: CORS errors in browser console

**Solution:**
- Flask already has CORS enabled
- If still seeing errors, make sure Flask is running on port 5000
- Check that Vite proxy is configured correctly (it should be)

### Problem: "Cannot connect to AI server" error

**Solution:**
1. Verify Flask is running: http://127.0.0.1:5000/api/health
2. Check if port 5000 is already in use:
   ```bash
   netstat -ano | findstr :5000
   ```
3. Make sure no firewall is blocking port 5000

---

## 📊 What Should Happen When You Type "hello"

### In Flask Terminal:
```
============================================================
🔵 INCOMING REQUEST:
   Method: POST
   URL: http://127.0.0.1:5000/api/chat
   Path: /api/chat
   Headers: {...}
   JSON Body: {'message': 'hello'}
============================================================

============================================================
🤖 CHAT ENDPOINT HIT!
============================================================

📩 RECEIVED MESSAGE: 'hello'
   (This should appear in your Flask terminal when you type in UI)
📤 Sending Reply: [AI's response here]
```

### In Browser Console:
```
🤖 Sending message to: /api/chat
📤 Message: hello
📥 Response status: 200 OK
📦 Response data: {reply: "..."}
✅ Got reply: ...
```

### In MongoDB (if running):
- New document in `zenspace_db.chats` collection:
  ```json
  {
    "user": "hello",
    "bot": "[AI response]",
    "time": ISODate("2025-...")
  }
  ```

---

## ✅ Final Checklist

Before testing, make sure:

- [ ] Flask server is running (Step 1) - **MUST BE RUNNING**
- [ ] Vite dev server is running (Step 3) - **MUST BE RUNNING**
- [ ] Both terminal windows are open and showing no errors
- [ ] Browser is open to http://localhost:5173
- [ ] You're on the "AI Chatbot Assistance" screen
- [ ] Status shows "Online" (green)

---

## 🎯 Quick Test Command

To quickly verify everything is working, run this in a new terminal:

```bash
# Test Flask directly
curl -X POST http://127.0.0.1:5000/api/chat -H "Content-Type: application/json" -d "{\"message\":\"test\"}"
```

Or use the test script:
```bash
cd bo
python test_server.py
```

---

## 📝 Summary

**The flow is:**
1. User types in UI → 
2. UI sends POST to `/api/chat` (relative path) → 
3. Vite proxy intercepts and forwards to `http://127.0.0.1:5000/api/chat` → 
4. Flask receives request and logs it → 
5. Flask calls AI (Gemini) → 
6. Flask saves to MongoDB → 
7. Flask returns response → 
8. UI displays AI reply

**If you don't see logs in Flask terminal, the request isn't reaching Flask!**
- Check Flask is running
- Check Vite proxy is working
- Check browser Network tab for errors

