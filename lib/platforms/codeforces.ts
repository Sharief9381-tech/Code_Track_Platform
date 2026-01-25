export interface CodeforcesStats {
  username: string
  rating: number
  maxRating: number
  rank: string
  maxRank: string
  contribution: number
  friendOfCount: number
  avatar: string
  problemsSolved: number
  contests: {
    contestId: number
    contestName: string
    rank: number
    oldRating: number
    newRating: number
    ratingChange: number
  }[]
  submissions: {
    problem: {
      name: string
      rating: number
      tags: string[]
    }
    verdict: string
    language: string
    creationTimeSeconds: number
  }[]
}

export async function fetchCodeforcesStats(username: string): Promise<CodeforcesStats | null> {
  try {
    // Clean the username (remove any URL parts)
    const cleanUsername = username.replace(/^https?:\/\/codeforces\.com\/profile\//, '').replace(/\/$/, '')
    
    // Fetch user info
    const userResponse = await fetch(
      `https://codeforces.com/api/user.info?handles=${cleanUsername}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; CodeTrack/1.0)",
        },
      }
    )

    if (!userResponse.ok) {
      console.error("Codeforces user API error:", userResponse.status)
      return null
    }

    const userData = await userResponse.json()
    
    if (userData.status !== "OK" || !userData.result?.[0]) {
      console.log(`Codeforces user "${cleanUsername}" not found`)
      return null
    }

    const user = userData.result[0]

    // Fetch rating history
    const ratingResponse = await fetch(
      `https://codeforces.com/api/user.rating?handle=${cleanUsername}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; CodeTrack/1.0)",
        },
      }
    )
    
    let contests: CodeforcesStats["contests"] = []
    if (ratingResponse.ok) {
      const ratingData = await ratingResponse.json()
      if (ratingData.status === "OK") {
        contests = ratingData.result
          .slice(-10)
          .reverse()
          .map((contest: {
            contestId: number
            contestName: string
            rank: number
            oldRating: number
            newRating: number
          }) => ({
            contestId: contest.contestId,
            contestName: contest.contestName,
            rank: contest.rank,
            oldRating: contest.oldRating,
            newRating: contest.newRating,
            ratingChange: contest.newRating - contest.oldRating,
          }))
      }
    }

    // Fetch submissions
    const submissionsResponse = await fetch(
      `https://codeforces.com/api/user.status?handle=${cleanUsername}&from=1&count=100`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; CodeTrack/1.0)",
        },
      }
    )

    let submissions: CodeforcesStats["submissions"] = []
    let problemsSolved = 0
    const solvedSet = new Set<string>()

    if (submissionsResponse.ok) {
      const submissionsData = await submissionsResponse.json()
      if (submissionsData.status === "OK") {
        for (const sub of submissionsData.result) {
          if (sub.verdict === "OK") {
            const problemKey = `${sub.problem.contestId}-${sub.problem.index}`
            solvedSet.add(problemKey)
          }
        }
        problemsSolved = solvedSet.size

        submissions = submissionsData.result
          .slice(0, 10)
          .map((sub: {
            problem: { name: string; rating: number; tags: string[] }
            verdict: string
            programmingLanguage: string
            creationTimeSeconds: number
          }) => ({
            problem: {
              name: sub.problem.name,
              rating: sub.problem.rating || 0,
              tags: sub.problem.tags || [],
            },
            verdict: sub.verdict,
            language: sub.programmingLanguage,
            creationTimeSeconds: sub.creationTimeSeconds,
          }))
      }
    }

    return {
      username: cleanUsername,
      rating: user.rating || 0,
      maxRating: user.maxRating || 0,
      rank: user.rank || "unrated",
      maxRank: user.maxRank || "unrated",
      contribution: user.contribution || 0,
      friendOfCount: user.friendOfCount || 0,
      avatar: user.avatar || user.titlePhoto || "",
      problemsSolved,
      contests,
      submissions,
    }
  } catch (error) {
    console.error("Error fetching Codeforces stats:", error)
    return null
  }
}
