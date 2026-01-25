# CodeTrack - Dynamic Student Performance & AI Recruitment Platform

A comprehensive platform that dynamically integrates with coding platforms (LeetCode, GitHub, Codeforces, etc.) to track student performance and enable AI-powered recruitment.

## 🚀 Features

### **Dynamic Platform Integration**
- **Real-time sync** with LeetCode, Codeforces, GitHub, CodeChef, HackerRank
- **Live statistics** - problem counts, ratings, contributions
- **Auto-refresh** platform data with one-click sync
- **Smart analytics** across all connected platforms

### **Role-Based Dashboards**
- **Students**: Personal progress tracking, platform management, job matching
- **Colleges**: Department analytics, placement tracking, student performance
- **Recruiters**: Candidate search, AI matching, market insights

### **AI-Powered Analytics**
- **Performance insights** across coding platforms
- **Skill gap analysis** for students and departments
- **Predictive placement** success rates
- **Market trend analysis** for recruiters

### **Smart Database Management**
- **Auto-fallback system**: Works with or without MongoDB
- **In-memory storage**: Instant setup for testing and development
- **Seamless migration**: Easy transition from fallback to persistent storage

## 🛠️ Quick Setup

### **Option 1: Instant Setup (No Database Required)**
```bash
git clone <repository-url>
cd codetrack
npm install
npm run setup-env
npm run dev
```

✅ **Ready to use!** The platform automatically uses in-memory storage if MongoDB isn't available.

### **Option 2: Full Setup with Database**
```bash
git clone <repository-url>
cd codetrack
npm install
npm run setup-env

# Configure MongoDB in .env.local:
# MONGODB_URI=mongodb://localhost:27017/codetrack
# OR
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/codetrack

npm run dev
```

## 📱 Getting Started

### **1. Choose Your Setup**
- **🚀 Quick Start**: Use `/signup-demo` - works immediately without database setup
- **💾 Full Setup**: Use `/signup` - requires MongoDB for persistent data
- **🔧 Debug Mode**: Use `/test-auth` - comprehensive testing tools

### **2. Create Account**
Visit `http://localhost:3000/signup-demo` and:
1. **Select role**: Student, College, or Recruiter
2. **Fill details**: Name, email, role-specific information
3. **Create account**: Instant access to your dashboard

### **3. Explore Features**
- **Students**: Connect platforms, sync data, view analytics
- **Colleges**: Monitor student performance, track placements
- **Recruiters**: Search candidates, view market insights

## 🔧 System Status & Debugging

### **Check System Health**
Visit `http://localhost:3000/status` to see:
- ✅ API status
- 🗄️ Database connection
- ⚙️ Environment configuration
- 🔄 Fallback mode status

### **Debug Tools**
Visit `http://localhost:3000/test-auth` for:
- API health checks
- Database connection tests
- User creation and authentication
- Comprehensive system diagnostics

### **Common Issues & Solutions**

#### **"Unexpected token '<', "<!DOCTYPE "... is not valid JSON"**
✅ **Fixed!** The system now automatically detects database availability and uses fallback storage.

#### **"window is not defined" (SSR Error)**
✅ **Fixed!** All client-side code properly handles server-side rendering.

#### **Database Connection Failed**
✅ **No Problem!** The system works perfectly without a database using in-memory storage.

## 🌐 Usage Examples

### **For Students**
```bash
# 1. Sign up at /signup-demo
# 2. Go to /student/platforms
# 3. Connect your coding accounts
# 4. Click "Sync All" to fetch data
# 5. View analytics at /student/analytics
```

### **For Colleges**
```bash
# 1. Sign up as college at /signup-demo
# 2. Access /college/dashboard
# 3. View student performance analytics
# 4. Monitor placement statistics
# 5. Generate reports
```

### **For Recruiters**
```bash
# 1. Sign up as recruiter at /signup-demo
# 2. Access /recruiter/search
# 3. Filter candidates by skills
# 4. View AI-powered recommendations
# 5. Track hiring pipeline
```

## 🏗️ Architecture

### **Smart Database Layer**
- **Primary**: MongoDB for persistent storage
- **Fallback**: In-memory storage for instant setup
- **Auto-detection**: Seamless switching between modes
- **Migration**: Easy upgrade from fallback to persistent

### **API Layer**
- **Auto-routing**: Requests automatically use available storage
- **Error handling**: Graceful fallbacks and clear error messages
- **Rate limiting**: Platform API compliance
- **Real-time sync**: Live data updates

### **Frontend Layer**
- **Next.js 14**: Modern React with App Router
- **TypeScript**: Full type safety
- **Responsive design**: Works on all devices
- **Real-time updates**: Dynamic data refresh

## 📊 Platform Integrations

### **Supported Platforms**
- **LeetCode**: Problems, contests, difficulty breakdown
- **Codeforces**: Rating, contests, problem statistics
- **GitHub**: Repositories, contributions, activity
- **CodeChef**: Contests, ratings, achievements
- **HackerRank**: Skills, certifications, assessments

### **Data Synchronization**
- **One-click sync**: Fetch all platform data instantly
- **Smart caching**: Efficient API usage
- **Real-time updates**: Live statistics
- **Error handling**: Graceful failure recovery

## 🔒 Security & Privacy

- **Secure authentication**: Hashed passwords, secure sessions
- **Data protection**: Encrypted sensitive information
- **Privacy controls**: User-controlled data sharing
- **API security**: Rate limiting and abuse prevention
- **Session management**: Secure token-based authentication

## 🚀 Deployment Options

### **Development**
```bash
npm run dev
# Instant setup with fallback storage
```

### **Production with Database**
```bash
# Set environment variables:
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=your_domain

npm run build
npm start
```

### **Production without Database**
```bash
# Works with just:
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=your_domain

npm run build
npm start
# Uses in-memory storage (data resets on restart)
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run setup-env` - Setup environment variables
- `npm run verify` - Verify system configuration

## 🔍 Testing & Debugging

### **Quick Tests**
```bash
# Test API health
curl http://localhost:3000/api/health

# Test database
curl http://localhost:3000/api/test-db

# Test signup (fallback)
curl -X POST http://localhost:3000/api/auth/signup-fallback \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123","role":"student"}'
```

### **Web Interface Testing**
- **Status Page**: `/status` - System health overview
- **Debug Tools**: `/test-auth` - Comprehensive testing
- **Demo Signup**: `/signup-demo` - Works without database
- **Regular Signup**: `/signup` - Uses database when available

## 📋 Environment Variables

### **Required**
```env
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

### **Optional (for persistent storage)**
```env
MONGODB_URI=mongodb://localhost:27017/codetrack
# OR
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/codetrack
```

### **Optional (for platform integrations)**
```env
GITHUB_TOKEN=your_github_token
LEETCODE_SESSION=your_leetcode_session
```

## 🎯 Current Status

✅ **Working Features**:
- Complete role-based authentication system
- Dynamic platform integrations (LeetCode, GitHub, etc.)
- Real-time data synchronization
- Comprehensive analytics dashboards
- Auto-fallback database system
- Responsive UI with dark/light themes

✅ **Database Flexibility**:
- Works with MongoDB for persistent storage
- Falls back to in-memory storage automatically
- No setup required for immediate testing
- Easy migration between storage modes

✅ **Error Handling**:
- Graceful API error handling
- Clear user feedback
- Comprehensive debugging tools
- Automatic fallback systems

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Test with: `npm run dev` and visit `/test-auth`
4. Commit changes: `git commit -m 'Add amazing feature'`
5. Push to branch: `git push origin feature/amazing-feature`
6. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**🎉 Ready to use immediately - no complex setup required!**

**Built with ❤️ for the coding community**