import { useState, useEffect } from 'react'

interface Faculty {
  id: string
  name: string
  description?: string
}

interface Paper {
  id: string
  title: string
  paper_type: string
  created_at: string
  subjects: {
    name: string
    code: string
    years: {
      year: number
      semester: string
      courses: {
        name: string
        code: string
        faculties: {
          name: string
        }
      }
    }
  }
}

interface Stats {
  papersCount: number
  facultiesCount: number
  coursesCount: number
  recentPapers: Paper[]
  faculties: Faculty[]
}

export function useStats() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true)
        const response = await fetch('/api/stats')
        
        if (!response.ok) {
          throw new Error('Failed to fetch statistics')
        }
        
        const data = await response.json()
        setStats(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading, error }
}

export function useSearch(query: string) {
  const [results, setResults] = useState<Paper[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    async function searchPapers() {
      try {
        setLoading(true)
        const response = await fetch(`/api/papers?search=${encodeURIComponent(query)}`)
        
        if (!response.ok) {
          throw new Error('Failed to search papers')
        }
        
        const data = await response.json()
        setResults(data.papers || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed')
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchPapers, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  return { results, loading, error }
}
