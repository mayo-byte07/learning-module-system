'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Upload, Plus, FileText, Users, BarChart3, Settings, BookOpen } from 'lucide-react'
import AdminProtectedRoute from '@/components/AdminProtectedRoute'

export default function AdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')

  const handleAdminLogout = () => {
    localStorage.removeItem('adminAuthenticated')
    localStorage.removeItem('adminAuthTime')
    router.push('/admin/login')
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'courses', label: 'Courses & Branches', icon: BookOpen },
    { id: 'upload', label: 'Bulk Upload', icon: Upload },
    { id: 'papers', label: 'Manage Papers', icon: FileText },
    { id: 'mft', label: 'MFT Creator', icon: Plus },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />
      case 'courses':
        return <CoursesContent />
      case 'upload':
        return <BulkUploadContent />
      case 'papers':
        return <ManagePapersContent />
      case 'mft':
        return <MFTCreatorContent />
      case 'users':
        return <UserManagementContent />
      case 'settings':
        return <SettingsContent />
      default:
        return <DashboardContent />
    }
  }

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <Settings className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  onClick={handleAdminLogout}
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                >
                  Admin Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">+12%</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">1,247</div>
              <p className="text-gray-600 text-sm">Total Papers</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">+8%</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">5,432</div>
              <p className="text-gray-600 text-sm">Active Users</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">+15%</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">8</div>
              <p className="text-gray-600 text-sm">Faculties</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">+23%</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">42</div>
              <p className="text-gray-600 text-sm">Courses</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Management</h2>
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md transform scale-105'
                            : 'text-gray-700 hover:bg-gray-50 hover:shadow-sm'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </AdminProtectedRoute>
  )
}

function DashboardContent() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-blue-600">Total Papers</p>
                <p className="text-2xl font-bold text-blue-900">1,247</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-green-600">Active Users</p>
                <p className="text-2xl font-bold text-green-900">5,432</p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-purple-600">Tests Taken</p>
                <p className="text-2xl font-bold text-purple-900">12,847</p>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Upload className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-orange-600">Uploads Today</p>
                <p className="text-2xl font-bold text-orange-900">23</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'New paper uploaded', detail: 'CS201 - Data Structures', time: '2 hours ago' },
              { action: 'Mock test created', detail: 'MATH101 - Calculus', time: '4 hours ago' },
              { action: 'User registered', detail: 'student@university.edu', time: '6 hours ago' },
            ].map((activity, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.detail}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Courses</h3>
          <div className="space-y-3">
            {[
              { course: 'Computer Science', students: 1234, papers: 156 },
              { course: 'Mechanical Engineering', students: 987, papers: 142 },
              { course: 'Business Administration', students: 876, papers: 98 },
            ].map((course, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{course.course}</p>
                  <p className="text-sm text-gray-600">{course.students} students</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{course.papers}</p>
                  <p className="text-sm text-gray-600">papers</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function BulkUploadContent() {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFaculty, setSelectedFaculty] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')

  const faculties = [
    { id: 1, name: 'Engineering', branches: ['Computer Science', 'Mechanical', 'Civil', 'Electrical', 'Chemical'] },
    { id: 2, name: 'Science', branches: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'] },
    { id: 3, name: 'Commerce', branches: ['Accounting', 'Finance', 'Management', 'Economics'] },
    { id: 4, name: 'Arts', branches: ['English', 'History', 'Political Science', 'Sociology'] },
    { id: 5, name: 'Medical', branches: ['MBBS', 'BDS', 'Nursing', 'Pharmacy'] },
    { id: 6, name: 'Law', branches: ['LLB', 'LLM', 'Corporate Law'] },
    { id: 7, name: 'Management', branches: ['MBA', 'BBA', 'HR Management'] },
    { id: 8, name: 'Agriculture', branches: ['Agronomy', 'Horticulture', 'Forestry'] }
  ]

  const currentFaculty = faculties.find(f => f.name === selectedFaculty)
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English', 'Economics', 'History']

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    console.log('Files dropped:', files)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Bulk Upload Papers</h2>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          Drag and drop your PDF files here
        </p>
        <p className="text-sm text-gray-600 mb-4">
          You can upload multiple files at once. Maximum file size: 50MB per file.
        </p>
        <Button>
          Select Files
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Faculty
          </label>
          <select 
            value={selectedFaculty}
            onChange={(e) => {
              setSelectedFaculty(e.target.value)
              setSelectedBranch('')
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Faculty</option>
            {faculties.map((faculty) => (
              <option key={faculty.id} value={faculty.name}>
                {faculty.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Branch
          </label>
          <select 
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            disabled={!selectedFaculty}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Branch</option>
            {currentFaculty?.branches.map((branch, index) => (
              <option key={index} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year
          </label>
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Year</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <select 
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Paper Type
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input type="radio" name="paperType" className="mr-2" />
            <span>Past Paper</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="paperType" className="mr-2" />
            <span>Mock Test</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="paperType" className="mr-2" />
            <span>Notes</span>
          </label>
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Upload Papers</Button>
      </div>
    </div>
  )
}

function ManagePapersContent() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Manage Papers</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Paper
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                CS201 Final Exam 2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Data Structures
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  Past Paper
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                2.4 MB
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                2024-12-15
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                <Button variant="destructive" size="sm">Delete</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function MFTCreatorContent() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Mock Full Test Creator</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., CS201 Mock Test 1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
              <option>Select Subject</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Limit (minutes)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="120"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Questions</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-900">Question 1</h4>
                <Button variant="outline" size="sm">Remove</Button>
              </div>
              
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mb-3"
                rows={3}
                placeholder="Enter your question here..."
              />
              
              <div className="space-y-2">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Option A"
                />
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Option B"
                />
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Option C"
                />
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Option D"
                />
              </div>
              
              <div className="mt-3 flex items-center space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correct Answer
                  </label>
                  <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                    <option>Option A</option>
                    <option>Option B</option>
                    <option>Option C</option>
                    <option>Option D</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marks
                  </label>
                  <input
                    type="number"
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline">Save as Draft</Button>
          <Button>Publish Test</Button>
        </div>
      </div>
    </div>
  )
}

function UserManagementContent() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">User Management</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">JD</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">John Doe</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                john.doe@university.edu
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Student
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                2024-01-15
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                <Button variant="destructive" size="sm">Deactivate</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CoursesContent() {
  const [faculties, setFaculties] = useState([
    { id: 1, name: 'Engineering', branches: ['Computer Science', 'Mechanical', 'Civil', 'Electrical', 'Chemical'] },
    { id: 2, name: 'Science', branches: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'] },
    { id: 3, name: 'Commerce', branches: ['Accounting', 'Finance', 'Management', 'Economics'] },
    { id: 4, name: 'Arts', branches: ['English', 'History', 'Political Science', 'Sociology'] },
    { id: 5, name: 'Medical', branches: ['MBBS', 'BDS', 'Nursing', 'Pharmacy'] },
    { id: 6, name: 'Law', branches: ['LLB', 'LLM', 'Corporate Law'] },
    { id: 7, name: 'Management', branches: ['MBA', 'BBA', 'HR Management'] },
    { id: 8, name: 'Agriculture', branches: ['Agronomy', 'Horticulture', 'Forestry'] }
  ])

  const [newFaculty, setNewFaculty] = useState({ name: '', branches: [''] })
  const [showAddForm, setShowAddForm] = useState(false)

  const handleAddFaculty = () => {
    if (newFaculty.name.trim()) {
      setFaculties([...faculties, { 
        id: faculties.length + 1, 
        name: newFaculty.name, 
        branches: newFaculty.branches.filter(b => b.trim()) 
      }])
      setNewFaculty({ name: '', branches: [''] })
      setShowAddForm(false)
    }
  }

  const handleAddBranch = (facultyId: number, branch: string) => {
    if (branch.trim()) {
      setFaculties(faculties.map(faculty => 
        faculty.id === facultyId 
          ? { ...faculty, branches: [...faculty.branches, branch] }
          : faculty
      ))
    }
  }

  const handleDeleteBranch = (facultyId: number, branchIndex: number) => {
    setFaculties(faculties.map(faculty => 
      faculty.id === facultyId 
        ? { ...faculty, branches: faculty.branches.filter((_, index) => index !== branchIndex) }
        : faculty
    ))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Manage Courses & Branches</h2>
            <p className="text-gray-600">Organize your educational structure</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Faculty
          </Button>
        </div>

        {/* Add Faculty Form */}
        {showAddForm && (
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Add New Faculty</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Faculty Name</label>
                <input
                  type="text"
                  value={newFaculty.name}
                  onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200"
                  placeholder="e.g., Engineering"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Branches (comma separated)</label>
                <input
                  type="text"
                  value={newFaculty.branches.join(', ')}
                  onChange={(e) => setNewFaculty({ 
                    ...newFaculty, 
                    branches: e.target.value.split(',').map(b => b.trim()) 
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200"
                  placeholder="e.g., Computer Science, Mechanical, Civil"
                />
              </div>
              <div className="flex space-x-3">
                <Button 
                  onClick={handleAddFaculty}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Add Faculty
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Faculties List */}
        <div className="space-y-6">
          {faculties.map((faculty) => (
            <div key={faculty.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{faculty.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1 text-blue-500" />
                      {faculty.branches.length} branches
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                    Delete
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {faculty.branches.map((branch, index) => (
                    <div key={index} className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2 rounded-full text-sm border border-gray-200 group">
                      <span className="font-medium text-gray-700">{branch}</span>
                      <button
                        onClick={() => handleDeleteBranch(faculty.id, index)}
                        className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                  <input
                    type="text"
                    placeholder="Add new branch..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddBranch(faculty.id, (e.target as HTMLInputElement).value)
                        ;(e.target as HTMLInputElement).value = ''
                      }
                    }}
                  />
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => {
                      const inputs = document.querySelectorAll('input[placeholder="Add new branch..."]')
                      const input = inputs[inputs.length - 1] as HTMLInputElement
                      if (input && input.value.trim()) {
                        handleAddBranch(faculty.id, input.value)
                        input.value = ''
                      }
                    }}
                  >
                    Add Branch
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SettingsContent() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Enable User Registration</p>
                <p className="text-sm text-gray-600">Allow new users to register themselves</p>
              </div>
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Send email notifications for new uploads</p>
              </div>
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Storage Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum File Size (MB)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                defaultValue="50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allowed File Types
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                defaultValue="pdf"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Save Settings</Button>
        </div>
      </div>
    </div>
  )
}
