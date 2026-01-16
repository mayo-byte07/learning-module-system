'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  faculty?: string
  course?: string
  picture?: string
  provider?: 'email' | 'google'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    
    // Simulate authentication
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const mockUser: User = {
            id: 'user-1',
            name: 'John Doe',
            email: email,
            faculty: 'Engineering',
            course: 'Computer Science'
          }
          
          setUser(mockUser)
          localStorage.setItem('user', JSON.stringify(mockUser))
          setIsLoading(false)
          resolve()
        } else {
          setIsLoading(false)
          reject(new Error('Invalid credentials'))
        }
      }, 1500)
    })
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    
    try {
      // Load Google API
      await new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client'
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })

      // Initialize Google Sign-In
      const google = (window as any).google
      if (!google) {
        throw new Error('Google API not loaded')
      }

      // Trigger Google OAuth flow
      const tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '7329025228-q8u70qbfjb75c3d3o16lo6nj605npots.apps.googleusercontent.com',
        scope: 'openid email profile',
        callback: async (tokenResponse: any) => {
          if (tokenResponse.access_token) {
            try {
              // Send token to your backend for verification
              const response = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: tokenResponse.access_token }),
              })

              if (!response.ok) {
                throw new Error('Google authentication failed')
              }

              const { user } = await response.json()
              
              const appUser: User = {
                id: user.id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                provider: 'google',
                faculty: 'Not specified',
                course: 'Not specified'
              }
              
              setUser(appUser)
              localStorage.setItem('user', JSON.stringify(appUser))
              setIsLoading(false)
            } catch (error) {
              console.error('Google auth error:', error)
              setIsLoading(false)
              throw error
            }
          } else {
            setIsLoading(false)
            throw new Error('No access token received')
          }
        },
      })

      tokenClient.requestAccessToken()
    } catch (error) {
      setIsLoading(false)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    router.push('/auth')
  }

  const value: AuthContextType = {
    user,
    login,
    loginWithGoogle,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
