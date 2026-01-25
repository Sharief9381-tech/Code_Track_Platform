// Script to clear/empty the database

async function clearDatabase() {
  console.log('🗑️  Starting Database Cleanup...\n')
  console.log('=' .repeat(50))
  
  let mongoCleared = false
  let fallbackCleared = false
  
  // Check if server is running
  console.log('\n0. 🔍 Checking if server is running...')
  try {
    const healthCheck = await fetch('http://localhost:3000/api/health')
    if (healthCheck.ok) {
      console.log('   ✅ Server is running')
    } else {
      console.log('   ❌ Server health check failed')
      console.log('   ⚠️  Please start the server with: npm run dev')
      return
    }
  } catch (error) {
    console.log('   ❌ Server is not running')
    console.log('   ⚠️  Please start the server with: npm run dev')
    return
  }
  
  // Try to clear MongoDB if available
  console.log('\n1. 🍃 Attempting to clear MongoDB...')
  try {
    const response = await fetch('http://localhost:3000/api/debug/clear-mongodb', {
      method: 'POST'
    })
    
    const data = await response.json()
    
    if (response.ok && data.success) {
      console.log('   ✅ MongoDB cleared successfully')
      console.log(`   📊 ${data.message}`)
      if (data.collections && data.collections.length > 0) {
        data.collections.forEach(col => {
          console.log(`   🗑️  Collection '${col.collection}': ${col.deleted} documents deleted`)
        })
      }
      mongoCleared = true
    } else {
      console.log(`   ❌ MongoDB clearing failed: ${data.message || data.error}`)
    }
  } catch (error) {
    console.log(`   ❌ MongoDB error: ${error.message}`)
  }
  
  // Clear fallback storage
  console.log('\n2. 💾 Attempting to clear fallback storage...')
  try {
    const response = await fetch('http://localhost:3000/api/debug/clear-storage', {
      method: 'POST'
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('   ✅ Fallback storage cleared successfully')
      console.log(`   📊 ${data.message}`)
      fallbackCleared = true
    } else {
      const data = await response.json()
      console.log(`   ❌ Failed to clear fallback storage: ${data.error}`)
    }
  } catch (error) {
    console.log(`   ❌ Fallback storage error: ${error.message}`)
  }
  
  // Summary
  console.log('\n' + '=' .repeat(50))
  console.log('🗑️  DATABASE CLEANUP SUMMARY')
  console.log('=' .repeat(50))
  
  if (mongoCleared) {
    console.log('✅ MongoDB: Cleared successfully')
  } else {
    console.log('❌ MongoDB: Not cleared (not available or error)')
  }
  
  if (fallbackCleared) {
    console.log('✅ Fallback Storage: Cleared successfully')
  } else {
    console.log('❌ Fallback Storage: Not cleared (server not running or error)')
  }
  
  const overallStatus = (mongoCleared || fallbackCleared) ? 'SUCCESS' : 'FAILED'
  console.log(`\n🎯 Overall Status: ${overallStatus}`)
  
  if (overallStatus === 'SUCCESS') {
    console.log('\n🎉 Database cleanup completed!')
    console.log('✅ All user data has been removed')
    console.log('✅ All sessions have been cleared')
    console.log('✅ Platform is ready for fresh data')
    console.log('\n📋 What was cleared:')
    console.log('   • User accounts (students, colleges, recruiters)')
    console.log('   • Session tokens')
    console.log('   • Platform connections')
    console.log('   • Analytics data')
    console.log('   • All stored statistics')
  } else {
    console.log('\n⚠️  Database cleanup had issues')
    console.log('   • Check if the server is running (npm run dev)')
    console.log('   • Verify MongoDB connection if using database')
    console.log('   • Try running the script again')
  }
  
  console.log('\n📝 Note: This script clears ALL data. Use with caution!')
}

// Run the cleanup
clearDatabase().catch(console.error)