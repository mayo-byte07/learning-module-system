-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Faculties table
CREATE TABLE faculties (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses table
CREATE TABLE courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  faculty_id UUID REFERENCES faculties(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Years table
CREATE TABLE years (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  semester VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subjects table
CREATE TABLE subjects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  year_id UUID REFERENCES years(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Papers table
CREATE TABLE papers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  paper_type VARCHAR(20) CHECK (paper_type IN ('past_paper', 'mock_test', 'notes')) NOT NULL,
  year INTEGER,
  semester VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Questions table (for mock tests)
CREATE TABLE questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  paper_id UUID REFERENCES papers(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer INTEGER NOT NULL,
  explanation TEXT,
  marks INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User progress table
CREATE TABLE user_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  paper_id UUID REFERENCES papers(id) ON DELETE CASCADE,
  score INTEGER,
  time_spent INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Error reports table
CREATE TABLE error_reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  paper_id UUID REFERENCES papers(id) ON DELETE SET NULL,
  question_id UUID REFERENCES questions(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  status VARCHAR(20) CHECK (status IN ('pending', 'resolved', 'dismissed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_courses_faculty_id ON courses(faculty_id);
CREATE INDEX idx_years_course_id ON years(course_id);
CREATE INDEX idx_subjects_year_id ON subjects(year_id);
CREATE INDEX idx_papers_subject_id ON papers(subject_id);
CREATE INDEX idx_questions_paper_id ON questions(paper_id);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_paper_id ON user_progress(paper_id);
CREATE INDEX idx_error_reports_user_id ON error_reports(user_id);

-- Row Level Security (RLS)
ALTER TABLE faculties ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE years ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_reports ENABLE ROW LEVEL SECURITY;

-- Policies for public read access (students can view)
CREATE POLICY "Faculties are viewable by everyone." ON faculties FOR SELECT USING (true);
CREATE POLICY "Courses are viewable by everyone." ON courses FOR SELECT USING (true);
CREATE POLICY "Years are viewable by everyone." ON years FOR SELECT USING (true);
CREATE POLICY "Subjects are viewable by everyone." ON subjects FOR SELECT USING (true);
CREATE POLICY "Papers are viewable by everyone." ON papers FOR SELECT USING (true);
CREATE POLICY "Questions are viewable by everyone." ON questions FOR SELECT USING (true);

-- Policies for authenticated users
CREATE POLICY "Users can insert their own progress." ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own progress." ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress." ON user_progress FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert error reports." ON error_reports FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own error reports." ON error_reports FOR SELECT USING (auth.uid() = user_id);

-- Admin policies (assuming you have a role system)
CREATE POLICY "Admins can insert faculties." ON faculties FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can update faculties." ON faculties FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can delete faculties." ON faculties FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

-- Similar policies for courses, years, subjects, papers, questions
CREATE POLICY "Admins can insert courses." ON courses FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can update courses." ON courses FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can delete courses." ON courses FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can insert years." ON years FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can update years." ON years FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can delete years." ON years FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can insert subjects." ON subjects FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can update subjects." ON subjects FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can delete subjects." ON subjects FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can insert papers." ON papers FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can update papers." ON papers FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can delete papers." ON papers FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can insert questions." ON questions FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can update questions." ON questions FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can delete questions." ON questions FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can view all error reports." ON error_reports FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can update error reports." ON error_reports FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

-- Storage bucket for papers
INSERT INTO storage.buckets (id, name, public) VALUES ('papers', 'papers', true);

-- Storage policies
CREATE POLICY "Anyone can view papers." ON storage.objects FOR SELECT USING (bucket_id = 'papers');
CREATE POLICY "Admins can upload papers." ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'papers' AND 
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);
CREATE POLICY "Admins can update papers." ON storage.objects FOR UPDATE USING (
  bucket_id = 'papers' AND 
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);
CREATE POLICY "Admins can delete papers." ON storage.objects FOR DELETE USING (
  bucket_id = 'papers' AND 
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

-- Sample data for testing
INSERT INTO faculties (name, description) VALUES 
('Engineering', 'All engineering disciplines'),
('Science', 'Pure and applied sciences'),
('Commerce', 'Business and commerce studies'),
('Arts', 'Humanities and arts');

INSERT INTO courses (faculty_id, name, code, description) VALUES 
((SELECT id FROM faculties WHERE name = 'Engineering'), 'Computer Science', 'CS', 'Computer Science and Engineering'),
((SELECT id FROM faculties WHERE name = 'Engineering'), 'Mechanical Engineering', 'ME', 'Mechanical Engineering'),
((SELECT id FROM faculties WHERE name = 'Science'), 'Physics', 'PHY', 'Physics Department'),
((SELECT id FROM faculties WHERE name = 'Commerce'), 'Business Administration', 'BBA', 'Bachelor of Business Administration');

INSERT INTO years (course_id, year, semester) VALUES 
((SELECT id FROM courses WHERE code = 'CS'), 1, 'Fall'),
((SELECT id FROM courses WHERE code = 'CS'), 1, 'Spring'),
((SELECT id FROM courses WHERE code = 'CS'), 2, 'Fall'),
((SELECT id FROM courses WHERE code = 'CS'), 2, 'Spring'),
((SELECT id FROM courses WHERE code = 'ME'), 1, 'Fall'),
((SELECT id FROM courses WHERE code = 'PHY'), 1, 'Fall');

INSERT INTO subjects (year_id, name, code, description) VALUES 
((SELECT id FROM years WHERE course_id = (SELECT id FROM courses WHERE code = 'CS') AND year = 1 AND semester = 'Fall'), 'Programming Fundamentals', 'PF101', 'Introduction to programming'),
((SELECT id FROM years WHERE course_id = (SELECT id FROM courses WHERE code = 'CS') AND year = 1 AND semester = 'Fall'), 'Mathematics I', 'MATH101', 'Calculus and Linear Algebra'),
((SELECT id FROM years WHERE course_id = (SELECT id FROM courses WHERE code = 'CS') AND year = 1 AND semester = 'Spring'), 'Data Structures', 'DS201', 'Data structures and algorithms'),
((SELECT id FROM years WHERE course_id = (SELECT id FROM courses WHERE code = 'CS') AND year = 2 AND semester = 'Fall'), 'Database Systems', 'DB301', 'Database design and management'),
((SELECT id FROM years WHERE course_id = (SELECT id FROM courses WHERE code = 'ME') AND year = 1 AND semester = 'Fall'), 'Engineering Mechanics', 'EM101', 'Basic engineering mechanics'),
((SELECT id FROM years WHERE course_id = (SELECT id FROM courses WHERE code = 'PHY') AND year = 1 AND semester = 'Fall'), 'Classical Mechanics', 'CM101', 'Newtonian mechanics');
