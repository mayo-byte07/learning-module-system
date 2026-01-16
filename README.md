# Learning Module System

A comprehensive Full-Stack Web Application for managing educational content, including past papers, mock tests, and study materials.

## Features

### 🎯 Core Features
- **Dynamic Landing Page** with search functionality
- **Drill-Down Dashboard** navigation (Faculty > Course > Year > Subject)
- **Integrated PDF Reader** with zoom, rotate, and dark mode
- **CBT Interface** (Computer-Based Testing) with timer and question palette
- **Admin Dashboard** for content management
- **Bulk Upload** system for papers
- **MFT Creator** for mock full tests
- **User Management** system

### 🚀 Advanced Features
- **AI Question Solver** (with Gemini integration)
- **Offline Mode** (PWA support)
- **Error Reporting** system
- **Real-time Search** with Algolia/Meilisearch
- **Responsive Design** for all devices

## Tech Stack

| Component | Technology |
|-----------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth |
| **Storage** | Supabase Storage |
| **PDF Handling** | React-PDF |
| **UI Components** | Radix UI + Custom |
| **Deployment** | Vercel (recommended) |

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd learning-module-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL schema from `database/schema.sql` in your Supabase SQL editor
   - Get your project URL and anon key from Supabase settings

4. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
learning-module-system/
├── app/                          # Next.js app directory
│   ├── admin/                   # Admin dashboard
│   ├── api/                     # API routes
│   │   ├── papers/             # Paper management API
│   │   └── hierarchy/          # Course hierarchy API
│   ├── dashboard/              # User dashboard
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing page
├── components/                  # React components
│   ├── ui/                     # Reusable UI components
│   ├── pdf-viewer.tsx          # PDF viewer component
│   └── cbt-interface.tsx       # CBT testing interface
├── database/                   # Database schema
│   └── schema.sql              # Supabase schema
├── lib/                        # Utility libraries
│   ├── supabase.ts            # Supabase client
│   └── utils.ts               # Helper functions
├── types/                      # TypeScript type definitions
│   └── database.ts            # Database types
└── public/                     # Static assets
```

## Database Schema

The application uses a hierarchical structure:

```
Faculties
├── Courses
    ├── Years
        ├── Subjects
            ├── Papers
                └── Questions (for mock tests)
```

### Key Tables
- `faculties` - Academic faculties (Engineering, Science, etc.)
- `courses` - Courses within faculties
- `years` - Academic years and semesters
- `subjects` - Subjects within years
- `papers` - PDF papers, mock tests, and notes
- `questions` - Questions for mock tests
- `user_progress` - Track user progress
- `error_reports` - User-reported errors

## API Endpoints

### Papers API
- `GET /api/papers` - Fetch papers with filters
- `POST /api/papers` - Create new paper

### Hierarchy API
- `GET /api/hierarchy?type=faculties` - Get all faculties
- `GET /api/hierarchy?type=courses&parent_id={faculty_id}` - Get courses for faculty
- `GET /api/hierarchy?type=years&parent_id={course_id}` - Get years for course
- `GET /api/hierarchy?type=subjects&parent_id={year_id}` - Get subjects for year

## Features in Detail

### 1. Dynamic Landing Page
- Search-centric hero section
- Real-time search suggestions
- Faculty browsing
- Recent papers display
- Statistics dashboard

### 2. Drill-Down Dashboard
- Hierarchical navigation
- Breadcrumb navigation
- Quick filters
- Paper management
- Progress tracking

### 3. PDF Reader
- Zoom in/out functionality
- Rotation controls
- Dark mode support
- Download option
- Error reporting

### 4. CBT Interface
- Countdown timer
- Question palette
- Flag questions
- Progress tracking
- Results summary
- Navigation controls

### 5. Admin Dashboard
- Bulk upload with drag-and-drop
- MFT creator
- User management
- Analytics dashboard
- Settings management

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Digital Ocean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Contact the development team

## Roadmap

### Phase 1 (Current)
- ✅ Basic CRUD operations
- ✅ PDF viewer integration
- ✅ CBT interface
- ✅ Admin dashboard
- ✅ User authentication

### Phase 2 (Upcoming)
- 🔄 AI question solver integration
- 🔄 Advanced search with Algolia
- 🔄 PWA offline support
- 🔄 Mobile app development
- 🔄 Analytics dashboard

### Phase 3 (Future)
- 📋 Collaborative study features
- 📋 Video content support
- 📋 Live testing sessions
- 📋 Integration with LMS systems
- 📋 Advanced analytics

---

Built with ❤️ for students and educators worldwide.
