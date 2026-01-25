# Dynamic CodeTrack Platform Setup

## 🚀 **Now Fully Dynamic!**

The platform has been upgraded to be completely dynamic with:
- **MongoDB Database** - Real persistent data storage
- **Live Platform Integration** - Real-time sync with LeetCode, Codeforces, GitHub, etc.
- **Dynamic Analytics** - Real-time statistics and insights
- **Auto-sync Platform Data** - Automatic updates from connected accounts

## 📋 **Setup Instructions**

### 1. **Database Setup**
```bash
# Option 1: Local MongoDB
# Install MongoDB locally and start the service

# Option 2: MongoDB Atlas (Recommended)
# 1. Create account at https://mongodb.com/atlas
# 2. Create a new cluster
# 3. Get connection string
```

### 2. **Environment Variables**
Create `.env.local` file:
```env
# Required
MONGODB_URI=mongodb://localhost:27017/codetrack
# Or for Atlas: mongodb+srv://username:password@cluster.mongodb.net/codetrack

# Optional (for enhanced features)
GITHUB_TOKEN=your_github_personal_access_token
LEETCODE_SESSION=your_leetcode_session_cookie
```

### 3. **Install Dependencies**
```bash
npm install
# MongoDB is already included in package.json
```

### 4. **Start the Application**
```bash
npm run dev
```

## 🔄 **Dynamic Features**

### **For Students:**
- **Real Platform Sync**: Connect LeetCode, Codeforces, GitHub, CodeChef accounts
- **Live Statistics**: Real-time problem counts, ratings, contributions
- **Auto-refresh**: Platform data syncs automatically
- **Progress Tracking**: Historical data and growth analytics

### **For Colleges:**
- **Student Analytics**: Real-time department-wise performance
- **Placement Tracking**: Dynamic job matching and placement rates
- **Batch Comparisons**: Year-over-year performance analysis
- **Skills Gap Analysis**: Identify areas needing improvement

### **For Recruiters:**
- **Live Candidate Pool**: Real-time student data and availability
- **AI Matching**: Dynamic skill-based candidate recommendations
- **Market Analytics**: Salary insights and hiring trends
- **Real-time Filters**: Search by skills, college, experience level

## 🧪 **Testing the Dynamic System**

### 1. **Create Accounts**
- Go to `/signup` and create accounts for each role
- Data is now stored in MongoDB permanently

### 2. **Connect Platforms (Students)**
- Login as student
- Go to Platforms section
- Connect your real LeetCode/GitHub/Codeforces accounts
- Click "Sync All" to fetch live data

### 3. **View Analytics**
- **Students**: See personal progress and platform comparisons
- **Colleges**: View department analytics and top performers
- **Recruiters**: Browse candidate pool and market insights

## 🔧 **API Endpoints**

### **Platform Management**
- `POST /api/platforms/link` - Connect platform account
- `DELETE /api/platforms/link` - Disconnect platform
- `POST /api/platforms/sync` - Sync all platforms
- `GET /api/platforms/sync` - Get platform data

### **Analytics**
- `GET /api/analytics/student` - Student performance data
- `GET /api/analytics/college` - College-wide analytics
- `GET /api/analytics/recruiter` - Recruitment insights

## 🎯 **Real Platform Integration**

### **Supported Platforms:**
- **LeetCode**: Problems solved, difficulty breakdown, ranking
- **Codeforces**: Rating, problems solved, contest participation
- **GitHub**: Repositories, contributions, activity
- **CodeChef**: Contest ratings and problem statistics
- **HackerRank**: Skill assessments and certifications

### **Data Sync:**
- **Manual Sync**: Click "Sync All" button
- **Auto Sync**: Scheduled background updates
- **Real-time**: Live data from platform APIs

## 🔒 **Security & Privacy**

- **Secure Authentication**: MongoDB-based sessions
- **Data Encryption**: Passwords hashed with SHA-256
- **API Rate Limiting**: Prevents platform API abuse
- **Privacy Controls**: Users control what data to share

## 📈 **Scalability**

- **Database Indexing**: Optimized queries for large datasets
- **Caching**: Redis integration ready for high traffic
- **Background Jobs**: Queue system for platform syncing
- **Load Balancing**: Ready for horizontal scaling

The platform is now production-ready with real data integration and dynamic content!