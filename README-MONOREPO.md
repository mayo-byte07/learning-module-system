# Learning Module System - Monorepo Structure

This project has been reorganized into a monorepo structure with separate frontend and backend applications.

## Project Structure

```
learning-module-system/
├── frontend/                     # Next.js frontend application
│   ├── app/                     # Next.js app directory (pages, layouts)
│   ├── components/              # React components
│   ├── contexts/               # React contexts
│   ├── hooks/                  # Custom React hooks
│   ├── public/                 # Static assets
│   ├── src/                    # Additional source files
│   ├── types/                  # TypeScript type definitions
│   ├── package.json            # Frontend dependencies
│   └── [config files]          # Next.js, TypeScript, Tailwind configs
├── backend/                     # Next.js backend application (API)
│   ├── app/                    # Next.js app directory
│   │   └── api/                # API routes
│   ├── lib/                    # Backend utilities and database clients
│   ├── database/               # Database schema and migrations
│   ├── package.json            # Backend dependencies
│   └── [config files]          # Next.js, TypeScript configs
├── package.json                # Root workspace configuration
└── [shared config files]       # Git, ESLint, etc.
```

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies for all packages:
   ```bash
   npm run install:all
   ```

2. Set up environment variables in `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

### Running the Application

1. **Development mode** (runs both frontend and backend):
   ```bash
   npm run dev
   ```

2. **Individual services**:
   ```bash
   # Frontend only (port 3000)
   npm run dev:frontend
   
   # Backend only (port 3001)
   npm run dev:backend
   ```

3. **Production build**:
   ```bash
   npm run build
   ```

4. **Start production servers**:
   ```bash
   npm run start
   ```

### API Communication

The frontend and backend run on different ports in development:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

API calls from the frontend should use relative paths (e.g., `/api/papers`) which will be proxied to the backend.

## Scripts

- `npm run dev` - Start both frontend and backend in development
- `npm run build` - Build both applications
- `npm run start` - Start both applications in production
- `npm run lint` - Lint both applications
- `npm run install:all` - Install dependencies for all packages

## Database Setup

1. Create a Supabase project
2. Run the SQL schema from `backend/database/schema.sql` in your Supabase SQL editor
3. Update environment variables with your Supabase credentials

## Deployment

This monorepo structure allows for flexible deployment:
- Deploy frontend and backend separately
- Deploy both together on platforms supporting monorepos
- Use Vercel for frontend, Railway/Heroku for backend

## Benefits of This Structure

- **Separation of Concerns**: Clear distinction between frontend and backend code
- **Independent Scaling**: Frontend and backend can be scaled independently
- **Team Collaboration**: Frontend and backend teams can work independently
- **Technology Flexibility**: Easy to swap frontend or backend technologies
- **Shared Dependencies**: Common dependencies managed at workspace level
