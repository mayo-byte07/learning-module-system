export interface Faculty {
  id: string
  name: string
  description?: string
  created_at: string
}

export interface Course {
  id: string
  faculty_id: string
  name: string
  code: string
  description?: string
  created_at: string
}

export interface Year {
  id: string
  course_id: string
  year: number
  semester?: string
  created_at: string
}

export interface Subject {
  id: string
  year_id: string
  name: string
  code: string
  description?: string
  created_at: string
}

export interface Paper {
  id: string
  subject_id: string
  title: string
  file_url: string
  file_size: number
  paper_type: 'past_paper' | 'mock_test' | 'notes'
  year?: number
  semester?: string
  created_at: string
}

export interface Question {
  id: string
  paper_id: string
  question_text: string
  options: string[]
  correct_answer: number
  explanation?: string
  marks: number
  created_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  paper_id: string
  score?: number
  time_spent?: number
  completed_at?: string
  created_at: string
}

export interface User {
  id: string
  email: string
  name?: string
  role: 'student' | 'admin'
  created_at: string
}

export interface ErrorReport {
  id: string
  user_id: string
  paper_id?: string
  question_id?: string
  description: string
  status: 'pending' | 'resolved' | 'dismissed'
  created_at: string
}
