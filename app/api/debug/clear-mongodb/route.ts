import { NextResponse } from "next/server"
import { isDatabaseAvailable } from "@/lib/database"

export async function POST() {
  try {
    console.log("=== CLEAR MONGODB API CALLED ===")
    
    if (!isDatabaseAvailable()) {
      return NextResponse.json({
        success: false,
        message: "MongoDB is not available or configured"
      }, { status: 400 })
    }
    
    // Clear MongoDB collections
    const { getDatabase } = await import("@/lib/database")
    const db = await getDatabase()
    
    // Get all collections
    const collections = await db.listCollections().toArray()
    let totalDeleted = 0
    const results: any[] = []
    
    for (const collection of collections) {
      const collectionName = collection.name
      const result = await db.collection(collectionName).deleteMany({})
      totalDeleted += result.deletedCount
      results.push({
        collection: collectionName,
        deleted: result.deletedCount
      })
    }
    
    console.log(`MongoDB cleared: ${totalDeleted} documents from ${collections.length} collections`)
    
    return NextResponse.json({
      success: true,
      message: `Cleared ${totalDeleted} documents from ${collections.length} collections`,
      collections: results,
      totalDeleted
    })
  } catch (error) {
    console.error("Clear MongoDB error:", error)
    return NextResponse.json(
      { 
        error: "Failed to clear MongoDB",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Use POST method to clear MongoDB",
    warning: "This will delete ALL data permanently from MongoDB"
  })
}