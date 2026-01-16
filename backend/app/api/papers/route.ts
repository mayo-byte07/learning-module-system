import { NextResponse } from 'next/server'

// Mock papers data
const mockPapers = [
  // Computer Science Papers
  {
    id: 'paper-1',
    title: 'CS201 Final Exam 2024',
    paper_type: 'past_paper',
    created_at: '2024-12-15T10:00:00Z',
    file_size: 2048576,
    subject_id: 'ds201',
    subjects: {
      id: 'ds201',
      name: 'Data Structures',
      code: 'DS201',
      years: {
        id: 'y2-fall',
        year: 2,
        semester: 'Fall',
        courses: {
          id: 'cs-1',
          name: 'Computer Science',
          code: 'CS',
          faculties: {
            id: '1',
            name: 'Engineering'
          }
        }
      }
    }
  },
  {
    id: 'paper-2',
    title: 'Programming Fundamentals Midterm 2024',
    paper_type: 'past_paper',
    created_at: '2024-10-20T14:30:00Z',
    file_size: 1536000,
    subject_id: 'pf101',
    subjects: {
      id: 'pf101',
      name: 'Programming Fundamentals',
      code: 'PF101',
      years: {
        id: 'y1-fall',
        year: 1,
        semester: 'Fall',
        courses: {
          id: 'cs-1',
          name: 'Computer Science',
          code: 'CS',
          faculties: {
            id: '1',
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
    subject_id: 'ds201',
    subjects: {
      id: 'ds201',
      name: 'Data Structures',
      code: 'DS201',
      years: {
        id: 'y2-fall',
        year: 2,
        semester: 'Fall',
        courses: {
          id: 'cs-1',
          name: 'Computer Science',
          code: 'CS',
          faculties: {
            id: '1',
            name: 'Engineering'
          }
        }
      }
    }
  },
  
  // Mechanical Engineering Papers
  {
    id: 'paper-4',
    title: 'Engineering Mechanics Final Exam',
    paper_type: 'past_paper',
    created_at: '2024-11-25T11:00:00Z',
    file_size: 2560000,
    subject_id: 'em101',
    subjects: {
      id: 'em101',
      name: 'Engineering Mechanics',
      code: 'EM101',
      years: {
        id: 'y1-fall',
        year: 1,
        semester: 'Fall',
        courses: {
          id: 'me-1',
          name: 'Mechanical Engineering',
          code: 'ME',
          faculties: {
            id: '1',
            name: 'Engineering'
          }
        }
      }
    }
  },
  {
    id: 'paper-5',
    title: 'Thermodynamics Quiz 3',
    paper_type: 'mock_test',
    created_at: '2024-09-15T13:45:00Z',
    file_size: 896000,
    subject_id: 'td101',
    subjects: {
      id: 'td101',
      name: 'Thermodynamics',
      code: 'TD101',
      years: {
        id: 'y1-spring',
        year: 1,
        semester: 'Spring',
        courses: {
          id: 'me-1',
          name: 'Mechanical Engineering',
          code: 'ME',
          faculties: {
            id: '1',
            name: 'Engineering'
          }
        }
      }
    }
  },
  
  // Physics Papers
  {
    id: 'paper-6',
    title: 'Classical Mechanics Lab Report',
    paper_type: 'notes',
    created_at: '2024-10-05T16:20:00Z',
    file_size: 512000,
    subject_id: 'cm101',
    subjects: {
      id: 'cm101',
      name: 'Classical Mechanics',
      code: 'CM101',
      years: {
        id: 'y1-fall',
        year: 1,
        semester: 'Fall',
        courses: {
          id: 'phy-1',
          name: 'Physics',
          code: 'PHY',
          faculties: {
            id: '2',
            name: 'Science'
          }
        }
      }
    }
  },
  {
    id: 'paper-7',
    title: 'Quantum Mechanics Assignment',
    paper_type: 'past_paper',
    created_at: '2024-11-20T10:30:00Z',
    file_size: 1280000,
    subject_id: 'qm201',
    subjects: {
      id: 'qm201',
      name: 'Quantum Mechanics',
      code: 'QM201',
      years: {
        id: 'y2-fall',
        year: 2,
        semester: 'Fall',
        courses: {
          id: 'phy-1',
          name: 'Physics',
          code: 'PHY',
          faculties: {
            id: '2',
            name: 'Science'
          }
        }
      }
    }
  },
  
  // Business Administration Papers
  {
    id: 'paper-8',
    title: 'Management Principles Case Study',
    paper_type: 'past_paper',
    created_at: '2024-12-01T09:00:00Z',
    file_size: 1792000,
    subject_id: 'mg101',
    subjects: {
      id: 'mg101',
      name: 'Management Principles',
      code: 'MG101',
      years: {
        id: 'y1-fall',
        year: 1,
        semester: 'Fall',
        courses: {
          id: 'bba-1',
          name: 'Business Administration',
          code: 'BBA',
          faculties: {
            id: '3',
            name: 'Commerce'
          }
        }
      }
    }
  },
  {
    id: 'paper-9',
    title: 'Marketing Strategy Presentation',
    paper_type: 'notes',
    created_at: '2024-11-10T14:15:00Z',
    file_size: 768000,
    subject_id: 'mk101',
    subjects: {
      id: 'mk101',
      name: 'Marketing',
      code: 'MK101',
      years: {
        id: 'y1-spring',
        year: 1,
        semester: 'Spring',
        courses: {
          id: 'bba-1',
          name: 'Business Administration',
          code: 'BBA',
          faculties: {
            id: '3',
            name: 'Commerce'
          }
        }
      }
    }
  },
  
  // English Literature Papers
  {
    id: 'paper-10',
    title: 'Shakespeare Analysis Essay',
    paper_type: 'past_paper',
    created_at: '2024-12-08T11:30:00Z',
    file_size: 1024000,
    subject_id: 'el101',
    subjects: {
      id: 'el101',
      name: 'English Literature I',
      code: 'EL101',
      years: {
        id: 'y1-fall',
        year: 1,
        semester: 'Fall',
        courses: {
          id: 'eng-1',
          name: 'English Literature',
          code: 'ENG',
          faculties: {
            id: '4',
            name: 'Arts'
          }
        }
      }
    }
  },
  
  // Mathematics Papers
  {
    id: 'paper-11',
    title: 'Calculus Final Exam 2024',
    paper_type: 'past_paper',
    created_at: '2024-11-30T14:00:00Z',
    file_size: 3072000,
    subject_id: 'calc101',
    subjects: {
      id: 'calc101',
      name: 'Calculus I',
      code: 'CALC101',
      years: {
        id: 'y2-spring',
        year: 2,
        semester: 'Spring',
        courses: {
          id: 'math-1',
          name: 'Mathematics',
          code: 'MATH',
          faculties: {
            id: '2',
            name: 'Science'
          }
        }
      }
    }
  },
  {
    id: 'paper-12',
    title: 'Linear Algebra Quiz 2',
    paper_type: 'mock_test',
    created_at: '2024-10-15T10:30:00Z',
    file_size: 1536000,
    subject_id: 'la101',
    subjects: {
      id: 'la101',
      name: 'Linear Algebra',
      code: 'LA101',
      years: {
        id: 'y1-fall',
        year: 1,
        semester: 'Fall',
        courses: {
          id: 'math-1',
          name: 'Mathematics',
          code: 'MATH',
          faculties: {
            id: '2',
            name: 'Science'
          }
        }
      }
    }
  },
  
  // Chemistry Papers
  {
    id: 'paper-13',
    title: 'Organic Chemistry Lab Report',
    paper_type: 'notes',
    created_at: '2024-09-20T16:45:00Z',
    file_size: 2048000,
    subject_id: 'org101',
    subjects: {
      id: 'org101',
      name: 'Organic Chemistry',
      code: 'ORG101',
      years: {
        id: 'y3-fall',
        year: 3,
        semester: 'Fall',
        courses: {
          id: 'chem-1',
          name: 'Chemistry',
          code: 'CHEM',
          faculties: {
            id: '2',
            name: 'Science'
          }
        }
      }
    }
  },
  {
    id: 'paper-14',
    title: 'Physical Chemistry Final 2024',
    paper_type: 'past_paper',
    created_at: '2024-12-10T09:00:00Z',
    file_size: 2560000,
    subject_id: 'phychem101',
    subjects: {
      id: 'phychem101',
      name: 'Physical Chemistry',
      code: 'PC101',
      years: {
        id: 'y4-spring',
        year: 4,
        semester: 'Spring',
        courses: {
          id: 'chem-1',
          name: 'Chemistry',
          code: 'CHEM',
          faculties: {
            id: '2',
            name: 'Science'
          }
        }
      }
    }
  },
  
  // Biology Papers
  {
    id: 'paper-15',
    title: 'Cell Biology Assignment',
    paper_type: 'notes',
    created_at: '2024-11-05T13:20:00Z',
    file_size: 1792000,
    subject_id: 'bio101',
    subjects: {
      id: 'bio101',
      name: 'Cell Biology',
      code: 'BIO101',
      years: {
        id: 'y2-fall',
        year: 2,
        semester: 'Fall',
        courses: {
          id: 'bio-1',
          name: 'Biology',
          code: 'BIO',
          faculties: {
            id: '2',
            name: 'Science'
          }
        }
      }
    }
  },
  {
    id: 'paper-16',
    title: 'Genetics Mock Test 3',
    paper_type: 'mock_test',
    created_at: '2024-10-25T11:15:00Z',
    file_size: 1280000,
    subject_id: 'gen101',
    subjects: {
      id: 'gen101',
      name: 'Genetics',
      code: 'GEN101',
      years: {
        id: 'y3-spring',
        year: 3,
        semester: 'Spring',
        courses: {
          id: 'bio-1',
          name: 'Biology',
          code: 'BIO',
          faculties: {
            id: '2',
            name: 'Science'
          }
        }
      }
    }
  },
  
  // Economics Papers
  {
    id: 'paper-17',
    title: 'Microeconomics Final Exam',
    paper_type: 'past_paper',
    created_at: '2024-12-05T14:30:00Z',
    file_size: 2304000,
    subject_id: 'micro101',
    subjects: {
      id: 'micro101',
      name: 'Microeconomics',
      code: 'MICRO101',
      years: {
        id: 'y2-spring',
        year: 2,
        semester: 'Spring',
        courses: {
          id: 'econ-1',
          name: 'Economics',
          code: 'ECON',
          faculties: {
            id: '3',
            name: 'Commerce'
          }
        }
      }
    }
  },
  {
    id: 'paper-18',
    title: 'Macroeconomics Case Study',
    paper_type: 'notes',
    created_at: '2024-11-18T10:00:00Z',
    file_size: 1536000,
    subject_id: 'macro101',
    subjects: {
      id: 'macro101',
      name: 'Macroeconomics',
      code: 'MACRO101',
      years: {
        id: 'y3-fall',
        year: 3,
        semester: 'Fall',
        courses: {
          id: 'econ-1',
          name: 'Economics',
          code: 'ECON',
          faculties: {
            id: '3',
            name: 'Commerce'
          }
        }
      }
    }
  }
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')
  const subjectId = searchParams.get('subject_id')

  try {
    let papers = mockPapers

    // Filter by subject if specified
    if (subjectId) {
      papers = papers.filter(paper => paper.subjects.id === subjectId)
    }

    // Filter by search term if specified
    if (search) {
      papers = papers.filter(paper => 
        paper.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    return NextResponse.json({ papers })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // For demo purposes, just return the created paper
    return NextResponse.json({ paper: body }, { status: 201 })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
