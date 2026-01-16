'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Filter, Grid, List, FileText, Clock, BookOpen, ArrowLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'

interface Faculty {
  id: string
  name: string
  description?: string
}

interface Course {
  id: string
  name: string
  code: string
  description?: string
}

interface Year {
  id: string
  year: number
  semester?: string
}

interface Subject {
  id: string
  name: string
  code: string
  description?: string
}

interface Paper {
  id: string
  title: string
  paper_type: string
  created_at: string
  file_size: number
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

function BrowsePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [selectedYear, setSelectedYear] = useState<Year | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [years, setYears] = useState<Year[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [papers, setPapers] = useState<Paper[]>([])
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize from URL params
  useEffect(() => {
    const facultyId = searchParams.get('faculty')
    if (facultyId) {
      fetchFacultyData(facultyId)
    } else {
      fetchFaculties()
    }
  }, [searchParams])

  const fetchFaculties = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/hierarchy?type=faculties')
      const data = await response.json()
      setFaculties(data.data || [])
    } catch (err) {
      setError('Failed to fetch faculties')
    } finally {
      setLoading(false)
    }
  }

  const fetchFacultyData = async (facultyId: string) => {
    try {
      setLoading(true)
      
      // Get faculty info
      const facultyResponse = await fetch('/api/hierarchy?type=faculties')
      const facultyData = await facultyResponse.json()
      const faculty = facultyData.data.find((f: Faculty) => f.id === facultyId)
      setSelectedFaculty(faculty)

      // Get courses for this faculty
      const coursesResponse = await fetch(`/api/hierarchy?type=courses&parent_id=${facultyId}`)
      const coursesData = await coursesResponse.json()
      setCourses(coursesData.data || [])
    } catch (err) {
      setError('Failed to fetch faculty data')
    } finally {
      setLoading(false)
    }
  }

  const fetchCourses = async (facultyId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/hierarchy?type=courses&parent_id=${facultyId}`)
      const data = await response.json()
      setCourses(data.data || [])
    } catch (err) {
      setError('Failed to fetch courses')
    } finally {
      setLoading(false)
    }
  }

  const fetchYears = async (courseId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/hierarchy?type=years&parent_id=${courseId}`)
      const data = await response.json()
      setYears(data.data || [])
    } catch (err) {
      setError('Failed to fetch years')
    } finally {
      setLoading(false)
    }
  }

  const fetchSubjects = async (yearId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/hierarchy?type=subjects&parent_id=${yearId}`)
      const data = await response.json()
      setSubjects(data.data || [])
    } catch (err) {
      setError('Failed to fetch subjects')
    } finally {
      setLoading(false)
    }
  }

  const fetchPapers = async (subjectId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/papers?subject_id=${subjectId}`)
      const data = await response.json()
      setPapers(data.papers || [])
    } catch (err) {
      setError('Failed to fetch papers')
    } finally {
      setLoading(false)
    }
  }

  const handleFacultySelect = (faculty: Faculty) => {
    setSelectedFaculty(faculty)
    setSelectedCourse(null)
    setSelectedYear(null)
    setSelectedSubject(null)
    setPapers([])
    fetchCourses(faculty.id)
    // Update URL
    router.push(`/browse?faculty=${faculty.id}`)
  }

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course)
    setSelectedYear(null)
    setSelectedSubject(null)
    setPapers([])
    fetchYears(course.id)
  }

  const handleYearSelect = (year: Year) => {
    setSelectedYear(year)
    setSelectedSubject(null)
    setPapers([])
    fetchSubjects(year.id)
  }

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject)
    fetchPapers(subject.id)
  }

  const handlePaperClick = (paperId: string) => {
    router.push(`/papers/${paperId}`)
  }

  const resetSelection = () => {
    setSelectedFaculty(null)
    setSelectedCourse(null)
    setSelectedYear(null)
    setSelectedSubject(null)
    setCourses([])
    setYears([])
    setSubjects([])
    setPapers([])
    router.push('/browse')
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  onClick={resetSelection}
                  className="hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </Button>
                <div className="flex items-center space-x-4">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                    {selectedSubject ? selectedSubject.name : selectedYear ? `${selectedYear.year} Year` : selectedCourse ? selectedCourse.name : selectedFaculty ? selectedFaculty.name : 'Browse Materials'}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Browse</span>
              {selectedFaculty && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span>{selectedFaculty.name}</span>
                </>
              )}
              {selectedCourse && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span>{selectedCourse.name}</span>
                </>
              )}
              {selectedYear && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span>Year {selectedYear.year} - {selectedYear.semester}</span>
                </>
              )}
              {selectedSubject && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span>{selectedSubject.name}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="bg-red-50 border border-red-200 rounded-xl p-8">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={resetSelection} className="mt-4">Try Again</Button>
              </div>
            </div>
          ) : (
            <>
              {/* Papers View */}
              {selectedSubject && papers.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {papers.length} Study Materials
                      </h2>
                      <p className="text-gray-600">Browse and filter available resources</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search papers..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200"
                        />
                      </div>
                      <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                        <Button
                          variant={viewMode === 'grid' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setViewMode('grid')}
                          className="rounded-none"
                        >
                          <Grid className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={viewMode === 'list' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setViewMode('list')}
                          className="rounded-none"
                        >
                          <List className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {papers
                        .filter(paper => 
                          searchQuery === '' || 
                          paper.title.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((paper) => (
                          <div key={paper.id} className="group bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer" onClick={() => handlePaperClick(paper.id)}>
                            <div className="p-6">
                              <div className="flex justify-between items-start mb-4">
                                <h3 className="font-semibold text-gray-900 flex-1 line-clamp-2 group-hover:text-blue-600 transition-colors">{paper.title}</h3>
                                <span className={`text-xs px-3 py-1 rounded-full ml-2 flex-shrink-0 font-medium ${
                                  paper.paper_type === 'past_paper' 
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                                    : paper.paper_type === 'mock_test'
                                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                                    : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                                }`}>
                                  {paper.paper_type.replace('_', ' ')}
                                </span>
                              </div>
                              <div className="space-y-3 text-sm text-gray-600 mb-4">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-2 text-blue-500" />
                                  <span>{formatFileSize(paper.file_size)}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2 text-green-500" />
                                  <span>{new Date(paper.created_at).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <Button className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all duration-300">
                                View Paper
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                      <div className="divide-y divide-gray-200">
                        {papers
                          .filter(paper => 
                            searchQuery === '' || 
                            paper.title.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((paper) => (
                            <div key={paper.id} className="p-6 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => handlePaperClick(paper.id)}>
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900 mb-2">{paper.title}</h3>
                                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                                    <div className="flex items-center">
                                      <FileText className="h-4 w-4 mr-1 text-blue-500" />
                                      <span>{formatFileSize(paper.file_size)}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 mr-1 text-green-500" />
                                      <span>{new Date(paper.created_at).toLocaleDateString()}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                                    paper.paper_type === 'past_paper' 
                                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                                      : paper.paper_type === 'mock_test'
                                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                                      : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                                  }`}>
                                    {paper.paper_type.replace('_', ' ')}
                                  </span>
                                  <Button>
                                    View
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Faculties Grid */}
              {!selectedFaculty && faculties.length > 0 && (
                <div>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Faculty</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                      Select your faculty to explore available courses and study materials
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {faculties.map((faculty) => (
                      <div
                        key={faculty.id}
                        onClick={() => handleFacultySelect(faculty)}
                        className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <BookOpen className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 text-center mb-3 group-hover:text-blue-600 transition-colors">{faculty.name}</h3>
                        <p className="text-gray-600 text-center text-sm mb-4">{faculty.description}</p>
                        <div className="flex justify-center">
                          <span className="text-blue-600 text-sm font-medium flex items-center group-hover:text-blue-700">
                            Explore courses
                            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses List */}
              {selectedFaculty && !selectedCourse && courses.length > 0 && (
                <div>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Courses in {selectedFaculty.name}</h2>
                    <p className="text-xl text-gray-600">Select a course to continue browsing</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                      <div
                        key={course.id}
                        onClick={() => handleCourseSelect(course)}
                        className="group bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{course.name}</h3>
                            <p className="text-gray-600 text-sm">{course.code}</p>
                          </div>
                          <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                        <div className="flex justify-center">
                          <span className="text-blue-600 text-sm font-medium flex items-center group-hover:text-blue-700">
                            View years
                            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Years List */}
              {selectedCourse && !selectedYear && years.length > 0 && (
                <div>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic Years</h2>
                    <p className="text-xl text-gray-600">Choose your academic year</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {years.map((year) => (
                      <div
                        key={year.id}
                        onClick={() => handleYearSelect(year)}
                        className="group bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer text-center"
                      >
                        <div className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          Year {year.year}
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{year.semester}</p>
                        <div className="flex justify-center">
                          <span className="text-blue-600 text-sm font-medium flex items-center group-hover:text-blue-700">
                            View subjects
                            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Subjects List */}
              {selectedYear && !selectedSubject && subjects.length > 0 && (
                <div>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Subjects</h2>
                    <p className="text-xl text-gray-600">Select a subject to view available papers</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subjects.map((subject) => (
                      <div
                        key={subject.id}
                        onClick={() => handleSubjectSelect(subject)}
                        className="group bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{subject.name}</h3>
                            <p className="text-gray-600 text-sm">{subject.code}</p>
                          </div>
                          <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                            <FileText className="h-5 w-5 text-green-600" />
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{subject.description}</p>
                        <div className="flex justify-center">
                          <span className="text-blue-600 text-sm font-medium flex items-center group-hover:text-blue-700">
                            View papers
                            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowsePageContent />
    </Suspense>
  )
}
