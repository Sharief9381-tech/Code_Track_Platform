export interface CodeChefStats {
  username: string
  name: string
  currentRating: number
  highestRating: number
  stars: string
  countryRank: number
  globalRank: number
  problemsSolved: number
  contests: {
    name: string
    code: string
    rank: number
    rating: number
    ratingChange: number
  }[]
}

export async function fetchCodeChefStats(username: string): Promise<CodeChefStats | null> {
  try {
    // Clean the username (remove any URL parts)
    const cleanUsername = username.replace(/^https?:\/\/codechef\.com\/users\//, '').replace(/\/$/, '')
    
    // Basic username validation - CodeChef usernames are typically alphanumeric with underscores
    if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
      console.log(`Invalid CodeChef username format: ${cleanUsername}`)
      return null
    }
    
    // Try web scraping approach first (more reliable)
    try {
      const profileUrl = `https://www.codechef.com/users/${cleanUsername}`
      const response = await fetch(profileUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        },
        signal: AbortSignal.timeout(10000),
      })

      if (response.ok) {
        const html = await response.text()
        
        // Extract data from HTML using regex patterns
        const ratingMatch = html.match(/rating["\s]*:[\s]*(\d+)/i)
        const problemsMatch = html.match(/problems["\s]*solved["\s]*:[\s]*(\d+)/i) || 
                             html.match(/fully["\s]*solved["\s]*:[\s]*(\d+)/i) ||
                             html.match(/"solved"["\s]*:[\s]*(\d+)/i)
        const starsMatch = html.match(/(\d+)\*/) || html.match(/stars["\s]*:[\s]*"?(\d+\*)"?/i)
        
        const currentRating = ratingMatch ? parseInt(ratingMatch[1]) : 0
        const problemsSolved = problemsMatch ? parseInt(problemsMatch[1]) : 0
        const stars = starsMatch ? starsMatch[1] + (starsMatch[1].includes('*') ? '' : '*') : getStarsFromRating(currentRating)
        
        console.log(`CodeChef web scraping successful for ${cleanUsername}: ${problemsSolved} problems, ${currentRating} rating`)
        
        return {
          username: cleanUsername,
          name: cleanUsername,
          currentRating,
          highestRating: currentRating,
          stars,
          countryRank: 0,
          globalRank: 0,
          problemsSolved,
          contests: [],
        }
      }
    } catch (scrapingError: any) {
      console.log(`CodeChef web scraping failed: ${scrapingError.message}`)
    }
    
    // Fallback to third-party APIs
    const apis = [
      `https://codechef-api.vercel.app/handle/${cleanUsername}`,
      `https://competitive-coding-api.herokuapp.com/api/codechef/${cleanUsername}`,
    ]

    for (const apiUrl of apis) {
      try {
        console.log(`Trying CodeChef API: ${apiUrl}`)
        const response = await fetch(apiUrl, {
          headers: {
            Accept: "application/json",
            "User-Agent": "Mozilla/5.0 (compatible; CodeTrack/1.0)",
          },
          signal: AbortSignal.timeout(8000),
        })

        console.log(`CodeChef API response status: ${response.status}`)

        if (response.ok) {
          const data = await response.json()
          console.log(`CodeChef API response data:`, data)
          
          if (data.success === false || data.error) {
            console.log(`CodeChef API returned error:`, data.error || 'Unknown error')
            continue
          }

          const problemsSolved = data.problemsSolved || 
                               data.fullySolved?.count || 
                               data.solved || 
                               data.totalSolved ||
                               data.problems_solved ||
                               0

          console.log(`CodeChef API problems solved found: ${problemsSolved}`)

          return {
            username: cleanUsername,
            name: data.name || data.fullName || data.displayName || cleanUsername,
            currentRating: data.currentRating || data.rating || data.current_rating || 0,
            highestRating: data.highestRating || data.maxRating || data.max_rating || data.rating || 0,
            stars: data.stars || getStarsFromRating(data.currentRating || data.rating || 0),
            countryRank: data.countryRank || data.country_rank || 0,
            globalRank: data.globalRank || data.global_rank || 0,
            problemsSolved: problemsSolved,
            contests: data.contests || [],
          }
        }
      } catch (apiError: any) {
        console.log(`CodeChef API ${apiUrl} failed:`, apiError.message)
        continue
      }
    }

    // If all methods fail, return a basic profile to allow platform linking
    // This ensures the platform can still be connected even if stats aren't available
    console.log(`All CodeChef data sources failed for "${cleanUsername}", returning basic profile`)
    
    return {
      username: cleanUsername,
      name: cleanUsername,
      currentRating: 0,
      highestRating: 0,
      stars: "N/A",
      countryRank: 0,
      globalRank: 0,
      problemsSolved: 0,
      contests: [],
      _apiLimited: true,
    } as CodeChefStats & { _apiLimited?: boolean }
  } catch (error) {
    console.error("Error fetching CodeChef stats:", error)
    return null
  }
}

function getStarsFromRating(rating: number): string {
  if (rating >= 2500) return "7*"
  if (rating >= 2200) return "6*"
  if (rating >= 2000) return "5*"
  if (rating >= 1800) return "4*"
  if (rating >= 1600) return "3*"
  if (rating >= 1400) return "2*"
  return "1*"
}
