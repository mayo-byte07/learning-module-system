'use client'

import { useState } from 'react'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { Button } from '@/components/ui/button'
import { ZoomIn, ZoomOut, RotateCw, Download, Moon, Sun } from 'lucide-react'

interface PDFViewerProps {
  fileUrl: string
  title?: string
}

export default function PDFViewer({ fileUrl, title }: PDFViewerProps) {
  const [darkMode, setDarkMode] = useState(false)
  const [scale, setScale] = useState(1.0)

  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3.0))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5))
  }

  const handleRotate = () => {
    // Rotation functionality would need custom implementation
    console.log('Rotate PDF')
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = title || 'document.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => window.history.back()}>
                ← Back
              </Button>
              <h1 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {title || 'PDF Viewer'}
              </h1>
            </div>
            
            {/* Toolbar */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                className={darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {Math.round(scale * 100)}%
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                className={darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRotate}
                className={darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}
              >
                <RotateCw className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className={darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}
              >
                <Download className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className={darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="h-[calc(100vh-4rem)]">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <div className={`h-full ${darkMode ? 'bg-gray-900' : ''}`}>
            <Viewer
              fileUrl={fileUrl}
              plugins={[defaultLayoutPluginInstance]}
              defaultScale={scale}
              theme={darkMode ? 'dark' : 'light'}
            />
          </div>
        </Worker>
      </div>

      {/* Error Reporting Button */}
      <div className="fixed bottom-4 right-4">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            // Implement error reporting modal
            console.log('Report error for this paper')
          }}
        >
          Report Error
        </Button>
      </div>
    </div>
  )
}
