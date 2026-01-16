'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, BookOpen, FileText, Clock, Users, User, Loader2, ArrowLeft, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProtectedRoute from '@/components/ProtectedRoute'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useAuth } from '@/contexts/AuthContext'

interface Faculty {
  id: number
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

export default function DashboardPage() {
  const router = useRouter()
  const { user: currentUser } = useAuth()
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [selectedYear, setSelectedYear] = useState<Year | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [years, setYears] = useState<Year[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [papers, setPapers] = useState<Paper[]>([])
  const [allPapers, setAllPapers] = useState<Paper[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    paper_type: '',
    faculty: '',
    course: '',
    year: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load initial data
  useEffect(() => {
    fetchFaculties()
    fetchAllPapers()
  }, [])

  const fetchFaculties = async () => {
    try {
      setLoading(true)
      // Use static faculties data
      const facultiesData = [
        { id: 1, name: 'Engineering', description: 'Engineering and Technology Programs' },
        { id: 2, name: 'Science', description: 'Science and Research Programs' },
        { id: 3, name: 'Commerce', description: 'Commerce and Business Programs' },
        { id: 4, name: 'Arts', description: 'Arts and Humanities Programs' },
        { id: 5, name: 'Medical', description: 'Medical and Health Sciences' },
        { id: 6, name: 'Law', description: 'Legal Studies Programs' },
        { id: 7, name: 'Management', description: 'Management and Business Administration' },
        { id: 8, name: 'Agriculture', description: 'Agricultural Sciences Programs' }
      ]
      setFaculties(facultiesData)
    } catch (err) {
      setError('Failed to fetch faculties')
      setFaculties([])
    } finally {
      setLoading(false)
    }
  }

  const fetchCourses = async (facultyId: number) => {
    try {
      setLoading(true)
      // Use static courses data based on faculty
      const coursesData = getStaticCourses(facultyId)
      setCourses(coursesData)
    } catch (err) {
      setError('Failed to fetch courses')
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

  const getStaticCourses = (facultyId: number): Course[] => {
    const coursesMap: { [key: number]: Course[] } = {
      1: [ // Engineering
        { id: '1', name: 'Computer Science', code: 'CS101', description: 'Computer Science and Engineering' },
        { id: '2', name: 'Mechanical Engineering', code: 'ME101', description: 'Mechanical Engineering' },
        { id: '3', name: 'Civil Engineering', code: 'CE101', description: 'Civil Engineering' },
        { id: '4', name: 'Electrical Engineering', code: 'EE101', description: 'Electrical Engineering' },
        { id: '5', name: 'Chemical Engineering', code: 'CH101', description: 'Chemical Engineering' }
      ],
      2: [ // Science
        { id: '6', name: 'Physics', code: 'PH101', description: 'Physics and Applied Sciences' },
        { id: '7', name: 'Chemistry', code: 'CH101', description: 'Chemistry and Chemical Sciences' },
        { id: '8', name: 'Mathematics', code: 'MA101', description: 'Mathematics and Statistics' },
        { id: '9', name: 'Biology', code: 'BI101', description: 'Biology and Life Sciences' },
        { id: '10', name: 'Computer Science', code: 'CS102', description: 'Computer Science Fundamentals' }
      ],
      3: [ // Commerce
        { id: '11', name: 'Accounting', code: 'AC101', description: 'Accounting and Finance' },
        { id: '12', name: 'Finance', code: 'FN101', description: 'Finance and Banking' },
        { id: '13', name: 'Management', code: 'MG101', description: 'Business Management' },
        { id: '14', name: 'Economics', code: 'EC101', description: 'Economics and Commerce' }
      ],
      4: [ // Arts
        { id: '15', name: 'English', code: 'EN101', description: 'English Literature' },
        { id: '16', name: 'History', code: 'HI101', description: 'History and Civilization' },
        { id: '17', name: 'Political Science', code: 'PS101', description: 'Political Science and Governance' },
        { id: '18', name: 'Sociology', code: 'SO101', description: 'Sociology and Social Studies' }
      ],
      5: [ // Medical
        { id: '19', name: 'MBBS', code: 'MB101', description: 'Bachelor of Medicine and Surgery' },
        { id: '20', name: 'BDS', code: 'BD101', description: 'Bachelor of Dental Surgery' },
        { id: '21', name: 'Nursing', code: 'NU101', description: 'Nursing and Healthcare' },
        { id: '22', name: 'Pharmacy', code: 'PH101', description: 'Pharmacy and Pharmaceutical Sciences' }
      ],
      6: [ // Law
        { id: '23', name: 'LLB', code: 'LB101', description: 'Bachelor of Laws' },
        { id: '24', name: 'LLM', code: 'LM101', description: 'Master of Laws' },
        { id: '25', name: 'Corporate Law', code: 'CL101', description: 'Corporate and Business Law' }
      ],
      7: [ // Management
        { id: '26', name: 'MBA', code: 'MBA1', description: 'Master of Business Administration' },
        { id: '27', name: 'BBA', code: 'BBA1', description: 'Bachelor of Business Administration' },
        { id: '28', name: 'HR Management', code: 'HR101', description: 'Human Resource Management' }
      ],
      8: [ // Agriculture
        { id: '29', name: 'Agronomy', code: 'AG101', description: 'Agronomy and Crop Science' },
        { id: '30', name: 'Horticulture', code: 'HO101', description: 'Horticulture and Gardening' },
        { id: '31', name: 'Forestry', code: 'FO101', description: 'Forestry and Environmental Science' }
      ]
    }
    return coursesMap[facultyId] || []
  }

  const fetchYears = async (courseId: string) => {
    try {
      setLoading(true)
      // Use static years data
      const yearsData = [
        { id: '1', year: 1, semester: 'First Semester' },
        { id: '2', year: 1, semester: 'Second Semester' },
        { id: '3', year: 2, semester: 'First Semester' },
        { id: '4', year: 2, semester: 'Second Semester' },
        { id: '5', year: 3, semester: 'First Semester' },
        { id: '6', year: 3, semester: 'Second Semester' },
        { id: '7', year: 4, semester: 'First Semester' },
        { id: '8', year: 4, semester: 'Second Semester' }
      ]
      setYears(yearsData)
    } catch (err) {
      setError('Failed to fetch years')
      setYears([])
    } finally {
      setLoading(false)
    }
  }

  const fetchSubjects = async (yearId: string) => {
    try {
      setLoading(true)
      // Use static subjects data
      const subjectsData = [
        { id: '1', name: 'Mathematics I', code: 'MATH101', description: 'Advanced Mathematics' },
        { id: '2', name: 'Physics I', code: 'PHY101', description: 'General Physics' },
        { id: '3', name: 'Chemistry I', code: 'CHEM101', description: 'Organic Chemistry' },
        { id: '4', name: 'Computer Programming', code: 'CS101', description: 'Programming Fundamentals' },
        { id: '5', name: 'English Communication', code: 'ENG101', description: 'Technical English' },
        { id: '6', name: 'Engineering Mechanics', code: 'EM101', description: 'Applied Mechanics' },
        { id: '7', name: 'Digital Logic', code: 'DL101', description: 'Digital Electronics' },
        { id: '8', name: 'Data Structures', code: 'DS101', description: 'Data Structures and Algorithms' }
      ]
      setSubjects(subjectsData)
    } catch (err) {
      setError('Failed to fetch subjects')
      setSubjects([])
    } finally {
      setLoading(false)
    }
  }

  const fetchPapers = async (subjectId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/papers?subject_id=${subjectId}`)
      const data = await response.json()
      setPapers(Array.isArray(data.papers) ? data.papers as Paper[] : [])
    } catch (err) {
      setError('Failed to fetch papers')
      setPapers([])
    } finally {
      setLoading(false)
    }
  }

  const fetchAllPapers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/papers')
      const data = await response.json()
      const papersData = Array.isArray(data.papers) ? data.papers as Paper[] : []
      setAllPapers(papersData)
      setPapers(papersData)
    } catch (err) {
      setError('Failed to fetch papers')
      setAllPapers([])
      setPapers([])
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
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const filterPapers = () => {
    let filtered = [...allPapers]

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(paper =>
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.subjects.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.subjects.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by paper type
    if (filters.paper_type) {
      filtered = filtered.filter(paper => paper.paper_type === filters.paper_type)
    }

    // Filter by faculty
    if (filters.faculty) {
      filtered = filtered.filter(paper => 
        paper.subjects.years.courses.faculties.name === filters.faculty
      )
    }

    // Filter by course
    if (filters.course) {
      filtered = filtered.filter(paper => 
        paper.subjects.years.courses.name === filters.course ||
        paper.subjects.years.courses.code === filters.course
      )
    }

    // Filter by year
    if (filters.year) {
      filtered = filtered.filter(paper => 
        paper.subjects.years.year.toString() === filters.year
      )
    }

    setPapers(filtered)
  }

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      paper_type: '',
      faculty: '',
      course: '',
      year: ''
    })
    setSearchQuery('')
    setPapers(allPapers)
  }

  useEffect(() => {
    filterPapers()
  }, [searchQuery, filters, allPapers])

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                  Dashboard
                </h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Browse by Faculty</h2>
                <nav className="space-y-2">
                  {faculties.map((faculty) => (
                    <button
                      key={faculty.id}
                      onClick={() => handleFacultySelect(faculty)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 ${
                        selectedFaculty?.id === faculty.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md transform scale-105'
                          : 'text-gray-700 hover:bg-gray-50 hover:shadow-sm'
                      }`}
                    >
                      <span className="font-medium">{faculty.name}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl shadow-xl p-8 mb-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-3">
                      Welcome back, {currentUser?.name || 'Student'}!
                    </h1>
                    <p className="text-blue-100 text-lg">
                      {currentUser?.provider === 'google' ? 'Continue your learning journey' : 'Ready to explore new study materials?'}
                    </p>
                  </div>
                  {currentUser?.picture ? (
                    <img
                      src={currentUser.picture}
                      alt={currentUser.name}
                      className="w-20 h-20 rounded-full border-4 border-white/30 shadow-xl"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <User className="h-10 w-10 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Papers Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">All Available Papers</h2>
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center px-4 py-2 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </Button>
                </div>

                {/* Search and Filters */}
                <div className="mb-8">
                  <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search papers by title, subject, or code..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200"
                    />
                  </div>

                  {showFilters && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Paper Type</label>
                        <select
                          value={filters.paper_type}
                          onChange={(e) => handleFilterChange('paper_type', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">All Types</option>
                          <option value="exam">Exam</option>
                          <option value="mock_test">Mock Test</option>
                          <option value="notes">Notes</option>
                          <option value="assignment">Assignment</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Faculty</label>
                        <select
                          value={filters.faculty}
                          onChange={(e) => handleFilterChange('faculty', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">All Faculties</option>
                          {faculties.map((faculty) => (
                            <option key={faculty.id} value={faculty.name}>
                              {faculty.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Course</label>
                        <select
                          value={filters.course}
                          onChange={(e) => handleFilterChange('course', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">All Courses</option>
                          {courses.map((course) => (
                            <option key={course.id} value={course.name}>
                              {course.name} ({course.code})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                        <select
                          value={filters.year}
                          onChange={(e) => handleFilterChange('year', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">All Years</option>
                          <option value="1">Year 1</option>
                          <option value="2">Year 2</option>
                          <option value="3">Year 3</option>
                          <option value="4">Year 4</option>
                        </select>
                      </div>
                      <div className="md:col-span-4">
                        <Button variant="outline" onClick={clearFilters} className="w-full">
                          Clear All Filters
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Papers List */}
                {loading ? (
                  <div className="flex justify-center py-16">
                    <LoadingSpinner size="lg" text="Loading papers..." className="text-blue-600" />
                  </div>
                ) : error ? (
                  <div className="text-center py-16">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-8">
                      <p className="text-red-600 mb-4">{error}</p>
                      <Button onClick={fetchAllPapers}>Retry</Button>
                    </div>
                  </div>
                ) : papers.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="bg-gray-50 rounded-xl p-8">
                      <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-lg mb-4">No papers found matching your criteria.</p>
                      <Button onClick={clearFilters} className="px-6 py-3">
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {papers.map((paper, index) => (
                      <div key={paper.id} className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden" style={{ animationDelay: `${index * 50}ms` }}>
                        {/* Animated background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                        
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-semibold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 line-clamp-2 flex-1">
                              {paper.title}
                            </h3>
                            <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full ml-2 whitespace-nowrap font-medium transform group-hover:scale-110 transition-transform duration-300">
                              {paper.paper_type.replace('_', ' ')}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                            <BookOpen className="h-4 w-4 mr-2 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
                            <span>{paper.subjects.name} ({paper.subjects.code})</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                            <span className="text-gray-500 group-hover:text-gray-600 transition-colors duration-300">{paper.subjects.years.courses.faculties.name}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600 mb-4">
                            <Clock className="h-4 w-4 mr-2 text-green-500 group-hover:text-green-600 transition-colors duration-300" />
                            <span>{new Date(paper.created_at).toLocaleDateString()}</span>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-gray-500 group-hover:text-gray-600 transition-colors duration-300">{formatFileSize(paper.file_size)}</span>
                          </div>
                          
                          <Button
                            variant="outline"
                            className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105"
                            onClick={() => handlePaperClick(paper.id)}
                          >
                            <span className="flex items-center justify-center">
                              View Paper
                              <ChevronRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
