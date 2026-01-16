'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Shield, Eye, EyeOff, Lock, User, Sparkles } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isFocused, setIsFocused] = useState({
    username: false,
    password: false
  })

  // Static admin credentials
  const ADMIN_CREDENTIALS = {
    username: 'mayocodes',
    password: 'Piyukomal2107@'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate authentication delay with animation
    setTimeout(() => {
      if (credentials.username === ADMIN_CREDENTIALS.username && 
          credentials.password === ADMIN_CREDENTIALS.password) {
        // Set admin session in localStorage
        localStorage.setItem('adminAuthenticated', 'true')
        localStorage.setItem('adminAuthTime', new Date().toISOString())
        router.push('/admin')
      } else {
        setError('Invalid username or password')
      }
      setLoading(false)
    }, 1500)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
    setError('') // Clear error on input change
  }

  const handleFocus = (field: 'username' | 'password') => {
    setIsFocused(prev => ({ ...prev, [field]: true }))
  }

  const handleBlur = (field: 'username' | 'password') => {
    setIsFocused(prev => ({ ...prev, [field]: false }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute top-20 left-20 text-blue-400/30 animate-bounce delay-300">
        <Shield className="h-8 w-8" />
      </div>
      <div className="absolute top-32 right-32 text-purple-400/30 animate-bounce delay-700">
        <Lock className="h-6 w-6" />
      </div>
      <div className="absolute bottom-32 left-32 text-indigo-400/30 animate-bounce delay-1000">
        <User className="h-6 w-6" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Lstatic Admin</h1>
          <p className="text-blue-200 text-lg">Secure access to Lstatic management system</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm animate-shake">
                {error}
              </div>
            )}

            {/* Username Field */}
            <div className="relative">
              <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                isFocused.username ? 'text-blue-400' : 'text-gray-400'
              }`}>
                <User className="h-5 w-5" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={credentials.username}
                onChange={handleInputChange}
                onFocus={() => handleFocus('username')}
                onBlur={() => handleBlur('username')}
                className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 ${
                  isFocused.username ? 'border-blue-500/50 bg-white/20' : 'border-white/20'
                }`}
                placeholder="Enter username"
              />
              <div className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ${
                isFocused.username ? 'w-full' : 'w-0'
              }`}></div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                isFocused.password ? 'text-blue-400' : 'text-gray-400'
              }`}>
                <Lock className="h-5 w-5" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={credentials.password}
                onChange={handleInputChange}
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password')}
                className={`w-full pl-12 pr-12 py-4 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 ${
                  isFocused.password ? 'border-blue-500/50 bg-white/20' : 'border-white/20'
                }`}
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              <div className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ${
                isFocused.password ? 'w-full' : 'w-0'
              }`}></div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Sign In</span>
                </div>
              )}
            </Button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-200 text-sm font-medium">Secure Access</p>
                <p className="text-blue-300 text-xs mt-1">
                  This is a restricted area. Unauthorized access is prohibited and will be logged.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="text-blue-200 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-200"
          >
            ← Back to Site
          </Button>
        </div>
      </div>
    </div>
  )
}
