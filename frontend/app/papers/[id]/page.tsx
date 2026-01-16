'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Share2, FileText, Clock, Calendar, User, AlertCircle, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Paper {
  id: string
  title: string
  paper_type: string
  file_url: string
  file_size: number
  created_at: string
  subjects: {
    name: string
    code: string
    description?: string
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

export default function PaperPage() {
  const router = useRouter()
  const params = useParams()
  const paperId = params.id as string
  
  const [paper, setPaper] = useState<Paper | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'preview' | 'fullscreen'>('preview')

  useEffect(() => {
    fetchPaper()
  }, [paperId])

  const fetchPaper = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/papers?search=${paperId}`)
      const data = await response.json()
      
      if (data.papers && data.papers.length > 0) {
        setPaper(data.papers[0])
      } else {
        setError('Paper not found')
      }
    } catch (err) {
      setError('Failed to fetch paper')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (paper?.file_url) {
      window.open(paper.file_url, '_blank')
    }
  }

  const handleShare = async () => {
    if (paper) {
      const shareUrl = `${window.location.origin}/papers/${paper.id}`
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: paper.title,
            text: `Check out this ${paper.paper_type.replace('_', ' ')}: ${paper.title}`,
            url: shareUrl,
          })
        } catch (err) {
          // Fallback to copying to clipboard
          navigator.clipboard.writeText(shareUrl)
        }
      } else {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(shareUrl)
      }
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleReportError = () => {
    // TODO: Implement error reporting
    alert('Error reporting feature coming soon!')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !paper) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Paper Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The requested paper could not be found.'}</p>
          <Button onClick={() => router.push('/')}>Back to Home</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-semibold text-gray-900 truncate max-w-md">
                {paper.title}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
              {/* Paper Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Paper Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-medium text-gray-900 capitalize">
                      {paper.paper_type.replace('_', ' ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Subject</p>
                    <p className="font-medium text-gray-900">{paper.subjects.name}</p>
                    <p className="text-sm text-gray-500">{paper.subjects.code}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Course</p>
                    <p className="font-medium text-gray-900">
                      {paper.subjects.years.courses.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {paper.subjects.years.courses.code}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Faculty</p>
                    <p className="font-medium text-gray-900">
                      {paper.subjects.years.courses.faculties.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Year</p>
                    <p className="font-medium text-gray-900">
                      Year {paper.subjects.years.year} - {paper.subjects.years.semester}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">File Size</p>
                    <p className="font-medium text-gray-900">{formatFileSize(paper.file_size)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Uploaded</p>
                    <p className="font-medium text-gray-900">
                      {new Date(paper.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button className="w-full" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                {paper.paper_type === 'mock_test' && (
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Take Test
                  </Button>
                )}
                <Button variant="outline" className="w-full" onClick={handleReportError}>
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Report Error
                </Button>
              </div>

              {/* Related Papers */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Related Papers</h3>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    More papers from {paper.subjects.name}
                  </div>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Related Papers
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border">
              {/* View Mode Toggle */}
              <div className="border-b px-6 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Paper Preview</h2>
                  <div className="flex space-x-2">
                    <Button
                      variant={viewMode === 'preview' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('preview')}
                    >
                      Preview
                    </Button>
                    <Button
                      variant={viewMode === 'fullscreen' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('fullscreen')}
                    >
                      Fullscreen
                    </Button>
                  </div>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className={`${viewMode === 'fullscreen' ? 'h-screen' : 'h-96'} bg-gray-100`}>
                {paper.file_url ? (
                  <iframe
                    src={paper.file_url}
                    className="w-full h-full border-0"
                    title={paper.title}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Preview not available</p>
                      <Button onClick={handleDownload}>
                        <Download className="h-4 w-4 mr-2" />
                        Download to View
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {paper.subjects.description && (
                <div className="border-t px-6 py-4">
                  <h3 className="font-semibold text-gray-900 mb-2">About this Subject</h3>
                  <p className="text-gray-600">{paper.subjects.description}</p>
                </div>
              )}
            </div>

            {/* Study Tips */}
            {paper.paper_type === 'past_paper' && (
              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">Study Tips</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• Time yourself while practicing to simulate exam conditions</li>
                  <li>• Review the marking scheme to understand how points are awarded</li>
                  <li>• Focus on topics that appear frequently across multiple papers</li>
                  <li>• Practice with past papers from previous years for comprehensive preparation</li>
                </ul>
              </div>
            )}

            {/* Mock Test Instructions */}
            {paper.paper_type === 'mock_test' && (
              <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-3">Test Instructions</h3>
                <ul className="space-y-2 text-green-800">
                  <li>• Find a quiet place with no distractions</li>
                  <li>• Make sure you have enough time to complete the test</li>
                  <li>• Read each question carefully before answering</li>
                  <li>• Review your answers before submitting if time permits</li>
                </ul>
                <Button className="mt-4 bg-green-600 hover:bg-green-700">
                  Start Mock Test
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
