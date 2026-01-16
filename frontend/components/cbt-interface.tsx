'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Clock, Flag, CheckCircle, Circle, AlertCircle } from 'lucide-react'

interface Question {
  id: string
  question_text: string
  options: string[]
  correct_answer: number
  explanation?: string
  marks: number
}

interface CBTInterfaceProps {
  questions: Question[]
  timeLimit: number // in minutes
  onComplete: (results: any) => void
}

export default function CBTInterface({ questions, timeLimit, onComplete }: CBTInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: number }>({})
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set())
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60) // convert to seconds
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Timer effect
  useEffect(() => {
    if (timeRemaining <= 0 && !isSubmitted) {
      handleSubmit()
      return
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [timeRemaining, isSubmitted])

  const formatTime = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(questionId)) {
        newSet.delete(questionId)
      } else {
        newSet.add(questionId)
      }
      return newSet
    })
  }

  const navigateToQuestion = (index: number) => {
    setCurrentQuestion(index)
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    
    const results = {
      answers,
      flaggedQuestions: Array.from(flaggedQuestions),
      timeSpent: timeLimit * 60 - timeRemaining,
      score: calculateScore(),
      totalQuestions: questions.length,
      totalMarks: questions.reduce((sum, q) => sum + q.marks, 0)
    }
    
    onComplete(results)
    setShowResults(true)
  }

  const calculateScore = () => {
    let score = 0
    questions.forEach(question => {
      if (answers[question.id] === question.correct_answer) {
        score += question.marks
      }
    })
    return score
  }

  const getQuestionStatus = (index: number) => {
    const question = questions[index]
    const isAnswered = answers[question.id] !== undefined
    const isFlagged = flaggedQuestions.has(question.id)

    if (isFlagged) return 'flagged'
    if (isAnswered) return 'answered'
    return 'unvisited'
  }

  if (showResults) {
    const score = calculateScore()
    const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0)
    const percentage = totalMarks > 0 ? (score / totalMarks) * 100 : 0

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full mx-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Test Completed!</h2>
            <div className="mb-6">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {percentage.toFixed(1)}%
              </div>
              <p className="text-gray-600">
                You scored {score} out of {totalMarks} marks
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div className="bg-green-50 p-4 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Correct</p>
                <p className="text-xl font-bold text-green-600">
                  {questions.filter(q => answers[q.id] === q.correct_answer).length}
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Incorrect</p>
                <p className="text-xl font-bold text-red-600">
                  {questions.filter(q => answers[q.id] !== undefined && answers[q.id] !== q.correct_answer).length}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Circle className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Unanswered</p>
                <p className="text-xl font-bold text-gray-600">
                  {questions.filter(q => answers[q.id] === undefined).length}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Time taken: {formatTime(timeLimit * 60 - timeRemaining)}</p>
              <p className="text-sm text-gray-600">Flagged questions: {flaggedQuestions.size}</p>
            </div>

            <Button onClick={() => window.history.back()} className="w-full">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                Mock Test - Question {currentQuestion + 1} of {questions.length}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
                timeRemaining < 300 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
              }`}>
                <Clock className="h-4 w-4" />
                <span className="font-mono font-medium">{formatTime(timeRemaining)}</span>
              </div>
              
              <Button
                variant="outline"
                onClick={() => toggleFlag(question.id)}
                className={flaggedQuestions.has(question.id) ? 'bg-orange-50 border-orange-300 text-orange-700' : ''}
              >
                <Flag className="h-4 w-4 mr-2" />
                {flaggedQuestions.has(question.id) ? 'Flagged' : 'Flag'}
              </Button>
              
              <Button onClick={handleSubmit} variant="destructive">
                Submit Test
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Palette */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Question Palette</h3>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, index) => {
                  const status = getQuestionStatus(index)
                  return (
                    <button
                      key={q.id}
                      onClick={() => navigateToQuestion(index)}
                      className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${
                        currentQuestion === index
                          ? 'ring-2 ring-blue-500'
                          : ''
                      } ${
                        status === 'answered'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : status === 'flagged'
                          ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                })}
              </div>
              
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 rounded"></div>
                  <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-orange-100 rounded"></div>
                  <span className="text-gray-600">Flagged</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-100 rounded"></div>
                  <span className="text-gray-600">Not Answered</span>
                </div>
              </div>
            </div>
          </div>

          {/* Question Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Question {currentQuestion + 1}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {question.marks} {question.marks === 1 ? 'mark' : 'marks'}
                  </span>
                </div>
                
                <p className="text-gray-800 leading-relaxed mb-6">
                  {question.question_text}
                </p>

                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <label
                      key={index}
                      className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        answers[question.id] === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        checked={answers[question.id] === index}
                        onChange={() => handleAnswerSelect(question.id, index)}
                        className="mt-1 mr-3"
                      />
                      <span className="text-gray-800">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>

                <div className="text-sm text-gray-600">
                  {Object.keys(answers).length} of {questions.length} questions answered
                </div>

                <Button
                  onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                  disabled={currentQuestion === questions.length - 1}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
