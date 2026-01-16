import { NextResponse } from 'next/server'

// Mock stats data
const mockStats = {
  papersCount: 1247,
  facultiesCount: 4,
  coursesCount: 5,
  recentPapers: [
    {
      id: 'paper-1',
      title: 'CS201 Final Exam 2024',
      paper_type: 'past_paper',
      created_at: '2024-12-15T10:00:00Z',
      file_size: 2048576,
      subjects: {
        name: 'Programming Fundamentals',
        code: 'PF101',
        years: {
          year: 1,
          semester: 'Fall',
          courses: {
            name: 'Computer Science',
            code: 'CS',
            faculties: {
              name: 'Engineering'
            }
          }
        }
      }
    },
    {
      id: 'paper-2',
      title: 'MATH101 Midterm Exam 2024',
      paper_type: 'past_paper',
      created_at: '2024-10-20T14:30:00Z',
      file_size: 1536000,
      subjects: {
        name: 'Mathematics I',
        code: 'MATH101',
        years: {
          year: 1,
          semester: 'Fall',
          courses: {
            name: 'Computer Science',
            code: 'CS',
            faculties: {
              name: 'Engineering'
            }
          }
        }
      }
    },
    {
      id: 'paper-3',
      title: 'Data Structures Mock Test 1',
      paper_type: 'mock_test',
      created_at: '2024-11-10T09:15:00Z',
      file_size: 1024000,
      subjects: {
        name: 'Data Structures',
        code: 'DS201',
        years: {
          year: 2,
          semester: 'Fall',
          courses: {
            name: 'Computer Science',
            code: 'CS',
            faculties: {
              name: 'Engineering'
            }
          }
        }
      }
    },
    {
      id: 'paper-4',
      title: 'Database Systems Notes',
      paper_type: 'notes',
      created_at: '2024-09-05T16:45:00Z',
      file_size: 512000,
      subjects: {
        name: 'Database Systems',
        code: 'DB301',
        years: {
          year: 2,
          semester: 'Fall',
          courses: {
            name: 'Computer Science',
            code: 'CS',
            faculties: {
              name: 'Engineering'
            }
          }
        }
      }
    },
    {
      id: 'paper-5',
      title: 'Engineering Mechanics Final',
      paper_type: 'past_paper',
      created_at: '2024-11-25T11:00:00Z',
      file_size: 2560000,
      subjects: {
        name: 'Engineering Mechanics',
        code: 'EM101',
        years: {
          year: 1,
          semester: 'Fall',
          courses: {
            name: 'Mechanical Engineering',
            code: 'ME',
            faculties: {
              name: 'Engineering'
            }
          }
        }
      }
    }
  ],
  faculties: [
    { id: '1', name: 'Engineering', description: 'All engineering disciplines' },
    { id: '2', name: 'Science', description: 'Pure and applied sciences' },
    { id: '3', name: 'Commerce', description: 'Business and commerce studies' },
    { id: '4', name: 'Arts', description: 'Humanities and arts' }
  ]
}

export async function GET() {
  try {
    return NextResponse.json(mockStats)
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
