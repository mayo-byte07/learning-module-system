'use client'

import { useRouter } from 'next/navigation'
import { BookOpen, Users, BarChart3, Loader2, FileText, Clock, Sparkles, TrendingUp, Award, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStats } from '@/hooks/useData'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function HomePage() {
  const router = useRouter()
  const { user } = useAuth()
  const { stats, loading, error } = useStats()

  const handlePaperClick = (paperId: string) => {
    if (user) {
      router.push(`/papers/${paperId}`)
    } else {
      router.push('/auth')
    }
  }

  const handleFacultyClick = (facultyId: string) => {
    router.push(`/browse?faculty=${facultyId}`)
  }

  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Comprehensive Library",
      description: "Access past papers, mock tests, and study notes across all faculties",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Smart Search",
      description: "Find exactly what you need with intelligent filtering and search",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Quality Content",
      description: "Curated materials verified by academic professionals",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Track Progress",
      description: "Monitor your learning journey and improve performance",
      gradient: "from-orange-500 to-red-500"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
              Learn Without Limits
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your academic journey with comprehensive study materials, 
              intelligent search, and personalized learning across 8 major faculties
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                onClick={() => router.push('/dashboard')}
                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Learning
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => router.push('/browse')}
                className="px-8 py-4 text-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transition-all duration-300"
              >
                Browse Materials
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Lstatic?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to excel academically, all in one place
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Icon container with enhanced animation */}
                <div className={`relative flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-full mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                  <div className="text-white transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-gradient-to-r from-white to-transparent"></div>
                </div>
                
                {/* Content with animation */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-blue-600 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{feature.description}</p>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Lstatic Impact</h2>
            <p className="text-xl text-blue-100">Join thousands of students already learning with us</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-white mx-auto mb-4" />
                <p className="text-blue-100 animate-pulse">Loading Lstatic statistics...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6">
                <p className="text-red-200">{error}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="group text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-5xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 transition-all duration-300">
                  {stats?.papersCount || '1,200+'}
                </div>
                <p className="text-blue-100 group-hover:text-white transition-colors duration-300">Study Materials</p>
                <div className="mt-2 h-1 w-0 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
              </div>
              <div className="group text-center transform hover:scale-105 transition-all duration-300" style={{ animationDelay: '100ms' }}>
                <div className="text-5xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 transition-all duration-300">
                  {stats?.facultiesCount || '5,000+'}
                </div>
                <p className="text-blue-100 group-hover:text-white transition-colors duration-300">Active Students</p>
                <div className="mt-2 h-1 w-0 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
              </div>
              <div className="group text-center transform hover:scale-105 transition-all duration-300" style={{ animationDelay: '200ms' }}>
                <div className="text-5xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-green-200 transition-all duration-300">{stats?.facultiesCount || '8'}</div>
                <p className="text-blue-100 group-hover:text-white transition-colors duration-300">Major Faculties</p>
                <div className="mt-2 h-1 w-0 bg-gradient-to-r from-green-400 to-emerald-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
              </div>
              <div className="group text-center transform hover:scale-105 transition-all duration-300" style={{ animationDelay: '300ms' }}>
                <div className="text-5xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-orange-200 transition-all duration-300">{stats?.coursesCount || '40+'}</div>
                <p className="text-blue-100 group-hover:text-white transition-colors duration-300">Specialized Courses</p>
                <div className="mt-2 h-1 w-0 bg-gradient-to-r from-orange-400 to-red-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recent Papers Preview */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Study Materials</h2>
            <p className="text-xl text-gray-600">Fresh content added regularly</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <FileText className="h-16 w-16 text-white" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {item === 1 ? 'Exam Paper' : item === 2 ? 'Mock Test' : 'Notes'}
                    </span>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item === 1 ? 'Advanced Mathematics Final Exam' : item === 2 ? 'Physics Mock Test Series' : 'Computer Science Study Notes'}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>{item === 1 ? 'Engineering' : item === 2 ? 'Science' : 'Computer Science'}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
                    onClick={() => router.push('/dashboard')}
                  >
                    View Material
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Excel?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of students who are already achieving better results
          </p>
          <Button 
            size="lg"
            onClick={() => router.push('/dashboard')}
            className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  )
}
