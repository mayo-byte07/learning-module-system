'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface AdminProtectedRouteProps {
  children: React.ReactNode
}

export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if admin is authenticated
    const checkAuth = () => {
      const adminAuth = localStorage.getItem('adminAuthenticated')
      const authTime = localStorage.getItem('adminAuthTime')
      
      if (adminAuth === 'true' && authTime) {
        const authDate = new Date(authTime)
        const now = new Date()
        const hoursDiff = (now.getTime() - authDate.getTime()) / (1000 * 60 * 60)
        
        // Session expires after 24 hours
        if (hoursDiff < 24) {
          setIsAuthenticated(true)
          return
        }
      }
      
      // Clear expired or invalid session
      localStorage.removeItem('adminAuthenticated')
      localStorage.removeItem('adminAuthTime')
      setIsAuthenticated(false)
      router.push('/admin/login')
    }

    checkAuth()
  }, [router])

  if (isAuthenticated === null) {
    // Loading state
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Will redirect to login
    return null
  }

  return <>{children}</>
}
