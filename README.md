# 🪖 Job Helmet 🪖
# Job Application Assistant - Complete Documentation

## Overview

The Job Application Assistant is an AI-powered platform that automates job searching, resume tailoring, and application tracking. It integrates with multiple job boards, verifies job postings, and helps users manage their entire job search process.

## Features

- **Multi-Platform Job Search**: Searches Indeed, LinkedIn, Glassdoor, and more
- **AI Resume Parsing**: Extracts skills, experience, and education from resumes
- **Smart Job Matching**: Calculates compatibility scores based on skills and requirements
- **Job Verification**: Detects and flags potential scam postings
- **Resume Tailoring**: Automatically customizes resumes for each job
- **Application Tracking**: Manages application status, interviews, and responses
- **Email Notifications**: Alerts for new matches, interviews, and updates
- **Analytics Dashboard**: Track application success rates and trends

## Tech Stack

### Backend
- Node.js with Express.js
- PostgreSQL database
- Redis for caching
- JWT authentication
- Multer for file uploads
- Natural language processing with Natural.js

### Frontend
- React 18
- Tailwind CSS
- Axios for API calls
- Lucide React for icons
- React Router for navigation

### Infrastructure
- Docker containers
- Kubernetes orchestration
- PM2 process management
- Nginx reverse proxy
- GitHub Actions CI/CD

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- Docker (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Fuzzy-Kyle/Job-helmet
cd Job-helmet
```

2. Install dependencies:
```bash
npm install
cd frontend && npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run database migrations:
```bash
npm run migrate
```

5. Start the development servers:
```bash
# Backend
npm run dev

# Frontend (in another terminal)
cd frontend && npm start
```

### Docker Setup

```bash
docker-compose up -d
```

## API Documentation

### Authentication

#### POST /api/auth/signup
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### POST /api/auth/login
Authenticate and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Resume Management

#### POST /api/resume/upload
Upload and parse a resume.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Field: resume (file)

**Response:**
```json
{
  "success": true,
  "resumeId": 123,
  "resumeData": {
    "name": "John Doe",
    "email": "john@example.com",
    "skills": ["React", "Node.js", "Python"],
    "totalExperience": {
      "years": 5,
      "months": 3
    }
  }
}
```

#### GET /api/resume
Get all user's resumes.

#### POST /api/resume/tailor
Generate a tailored resume for a specific job.

**Request Body:**
```json
{
  "jobId": "indeed_12345",
  "resumeId": 123
}
```

### Job Search

#### POST /api/jobs/search
Search for jobs across multiple platforms.

**Request Body:**
```json
{
  "skills": ["React", "Node.js"],
  "location": "San Francisco, CA",
  "experience": 5,
  "salary_min": 100000,
  "page": 1
}
```

**Response:**
```json
{
  "success": true,
  "jobs": [
    {
      "id": "indeed_12345",
      "title": "Senior Software Engineer",
      "company": "Tech Corp",
      "location": "San Francisco, CA",
      "salary": "$150k-$200k",
      "matchScore": 85,
      "verification": {
        "verified": true,
        "score": 0.9
      }
    }
  ],
  "total": 50,
  "page": 1
}
```

#### GET /api/jobs/:jobId
Get detailed information about a specific job.

### Applications

#### POST /api/applications/apply
Submit a job application.

**Request Body:**
```json
{
  "jobId": "indeed_12345",
  "resumeId": 123,
  "coverLetter": "Optional cover letter text"
}
```

#### GET /api/applications
Get user's application history.

**Query Parameters:**
- `status`: Filter by status (applied, interviewing, rejected, offered)
- `sort`: Sort by field (applied_at, match_score, company)
- `order`: Sort order (asc, desc)

#### PATCH /api/applications/:id/status
Update application status.

**Request Body:**
```json
{
  "status": "interviewing",
  "notes": "Phone screen scheduled for Monday"
}
```

#### POST /api/applications/:id/interview
Add interview information.

**Request Body:**
```json
{
  "date": "2024-01-15T10:00:00Z",
  "type": "phone_screen",
  "notes": "Ask about team structure"
}
```

#### GET /api/applications/stats
Get application statistics.

**Response:**
```json
{
  "success": true,
  "totalApplications": 45,
  "interviews": 8,
  "responses": 12,
  "avgMatchScore": 78,
  "uniqueCompanies": 32,
  "interviewRate": 18
}
```

## Database Schema

### Core Tables

- **users**: User accounts and authentication
- **resumes**: Uploaded resumes with parsed data
- **jobs**: Cached job listings from various sources
- **job_verifications**: Verification status and scam detection
- **applications**: Job applications and their status
- **application_events**: Timeline of application updates

### Supporting Tables

- **saved_searches**: User's saved search criteria
- **user_preferences**: Job search preferences
- **job_alerts**: Notifications for new matches
- **api_keys**: Encrypted third-party API credentials

## Security

### Authentication
- JWT tokens with 7-day expiration
- Bcrypt password hashing with 10 rounds
- Email verification required

### Data Protection
- HTTPS only in production
- SQL injection prevention via parameterized queries
- XSS protection with content security headers
- Rate limiting on all endpoints

### File Upload Security
- File type validation
- Size limits (5MB)
- Virus scanning (when configured)
- Isolated storage per user

## Job Verification System

The system uses multiple signals to verify job postings:

1. **Company Domain Verification**: Checks if company website exists
2. **Salary Range Analysis**: Flags unrealistic compensation
3. **Description Quality**: Detects poor grammar and formatting
4. **Scam Pattern Detection**: Identifies common scam indicators
5. **Source Verification**: Prioritizes trusted job boards

Verification scores:
- > 0.7: Verified (green shield)
- 0.3-0.7: Needs review (yellow warning)
- < 0.3: Likely scam (red alert)

## Deployment

### Production Checklist

1. **Environment Variables**
   - Set all required API keys
   - Use strong JWT secret
   - Configure production database

2. **Database**
   - Run migrations
   - Set up backups
   - Configure connection pooling

3. **Security**
   - Enable HTTPS
   - Configure CORS properly
   - Set security headers

4. **Monitoring**
   - Set up Prometheus metrics
   - Configure alerts
   - Enable error tracking

### Deployment Options

#### Option 1: Traditional VPS
```bash
# On your server
git clone <repo>
npm install --production
npm run migrate
pm2 start ecosystem.config.js
```

#### Option 2: Docker
```bash
docker build -t job-assistant .
docker run -d -p 3001:3001 --env-file .env job-assistant
```

#### Option 3: Kubernetes
```bash
kubectl apply -f kubernetes/
```

## Monitoring & Maintenance

### Health Checks
- GET /api/health - Basic health check
- GET /api/ready - Readiness probe
- GET /api/metrics - Prometheus metrics

### Scheduled Tasks
- **Hourly**: Interview reminders
- **Every 3 hours**: Update job listings
- **Every 6 hours**: Send job alerts
- **Daily**: Clean expired jobs
- **Weekly**: Send user reports

### Performance Optimization
- Redis caching for job searches
- Database indexes on frequently queried fields
- Connection pooling for database
- Clustered Node.js processes

## API Rate Limits

- Authentication endpoints: 5 requests per minute
- Job search: 100 requests per 15 minutes
- File uploads: 10 per hour
- General API: 1000 requests per hour

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

- Documentation: https://docs.jobassistant.com
- Email: support@jobassistant.com
- Issues: GitHub Issues

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Browser extension for quick apply
- [ ] AI-powered cover letter generation
- [ ] Interview preparation assistant
- [ ] Salary negotiation tips
- [ ] Integration with more job boards
- [ ] Video resume support
- [ ] Company research automation