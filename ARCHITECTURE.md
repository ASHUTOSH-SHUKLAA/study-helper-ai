# Study Helper AI - Architecture Documentation

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              React Frontend (Vite)                     │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐            │ │
│  │  │  Study   │  │   Quiz   │  │  Study   │            │ │
│  │  │   Form   │  │ Component│  │   Tip    │            │ │
│  │  └──────────┘  └──────────┘  └──────────┘            │ │
│  │                                                        │ │
│  │  ┌──────────────────────────────────────────────┐    │ │
│  │  │         API Service (Axios)                  │    │ │
│  │  └──────────────────────────────────────────────┘    │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Express Backend (Node.js)                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    Routes Layer                        │ │
│  │              GET /study?topic=&mode=                   │ │
│  │                  GET /health                           │ │
│  └────────────────────────────────────────────────────────┘ │
│                            │                                 │
│                            ▼                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                 Controllers Layer                      │ │
│  │              studyController.js                        │ │
│  │         (Request validation & orchestration)           │ │
│  └────────────────────────────────────────────────────────┘ │
│                            │                                 │
│                            ▼                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  Services Layer                        │ │
│  │  ┌──────────────────┐    ┌──────────────────┐         │ │
│  │  │ Wikipedia Service│    │   AI Service     │         │ │
│  │  │  (Fetch topic)   │    │ (Generate content)│        │ │
│  │  └──────────────────┘    └──────────────────┘         │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                │                           │
                │                           │
                ▼                           ▼
    ┌──────────────────┐      ┌──────────────────────┐
    │  Wikipedia API   │      │   OpenAI / Gemini    │
    │  (Topic Info)    │      │   (AI Generation)    │
    └──────────────────┘      └──────────────────────┘
```

## Data Flow Diagram

```
User Input
    │
    ├─► Topic: "photosynthesis"
    └─► Mode: "regular" or "math"
    │
    ▼
Frontend (React)
    │
    ├─► Validate input
    ├─► Show loading state
    └─► Send HTTP GET request
    │
    ▼
Backend API (/study)
    │
    ├─► Validate query parameters
    ├─► Extract topic and mode
    │
    ▼
Wikipedia Service
    │
    ├─► Fetch topic summary
    ├─► Extract key information
    └─► Return: { title, extract, url }
    │
    ▼
AI Service
    │
    ├─► Build prompt with context
    ├─► Call OpenAI/Gemini API
    ├─► Parse JSON response
    └─► Fallback to mock if error
    │
    ▼
Response Assembly
    │
    └─► {
          topic: "Photosynthesis",
          summary: [...],
          quiz: [...],
          studyTip: "...",
          mode: "regular",
          source: "..."
        }
    │
    ▼
Frontend Display
    │
    ├─► Summary Component (3 bullets)
    ├─► Quiz Component (3 MCQs)
    ├─► Study Tip Component
    └─► Save to History (localStorage)
```

## Component Architecture (Frontend)

```
App.jsx (Root)
│
├─► DarkModeToggle
│   └─► Manages theme state
│
├─► StudyForm
│   ├─► Topic input
│   ├─► Math mode checkbox
│   └─► Submit button
│
├─► TopicHistory
│   ├─► Displays recent searches
│   ├─► Loads from localStorage
│   └─► Click to reload topic
│
├─► Summary
│   ├─► Displays 3 bullet points
│   └─► Shows Wikipedia link
│
├─► Quiz
│   ├─► Regular Mode:
│   │   ├─► 3 MCQ questions
│   │   ├─► Answer selection
│   │   ├─► Submit & scoring
│   │   └─► Try again option
│   │
│   └─► Math Mode:
│       ├─► 1 quantitative problem
│       ├─► Answer display
│       └─► Step-by-step explanation
│
└─► StudyTip
    └─► Displays personalized tip
```

## Backend Service Architecture

```
server.js (Entry Point)
│
├─► Middleware
│   ├─► CORS
│   ├─► JSON parser
│   └─► Error handler
│
├─► Routes
│   ├─► /study → studyRoutes
│   └─► /health → health check
│
└─► studyRoutes.js
    │
    └─► studyController.js
        │
        ├─► Validate request
        │
        ├─► wikipediaService.js
        │   ├─► Fetch from Wikipedia API
        │   ├─► Parse response
        │   └─► Handle errors
        │
        └─► aiService.js
            ├─► Select AI provider
            │   ├─► OpenAI (GPT-3.5)
            │   └─► Gemini (gemini-pro)
            │
            ├─► Build prompt
            │   ├─► Regular mode prompt
            │   └─► Math mode prompt
            │
            ├─► Call AI API
            │
            ├─► Parse response
            │
            └─► Fallback to mock data
```

## State Management (Frontend)

```
App Component State
│
├─► studyData (object | null)
│   └─► Stores API response
│
├─► loading (boolean)
│   └─► Controls loading UI
│
├─► error (string | null)
│   └─► Stores error messages
│
└─► darkMode (boolean)
    └─► Theme preference

StudyForm State
│
├─► topic (string)
│   └─► User input
│
└─► mathMode (boolean)
    └─► Mode selection

Quiz State
│
├─► selectedAnswers (object)
│   └─► { questionIndex: answerIndex }
│
└─► showResults (boolean)
    └─► Display correct answers

TopicHistory State
│
└─► history (array)
    └─► Loaded from localStorage
```

## API Request/Response Flow

### Request Flow
```
1. User enters topic
2. Frontend validates input
3. Frontend shows loading state
4. Axios sends GET request
   └─► URL: /study?topic=photosynthesis&mode=regular
   └─► Headers: { Content-Type: application/json }
5. Backend receives request
6. Controller validates parameters
7. Wikipedia service fetches data
8. AI service generates content
9. Response assembled
10. JSON sent to frontend
11. Frontend updates state
12. Components re-render
13. User sees results
```

### Response Structure
```json
{
  "success": true,
  "data": {
    "topic": "Photosynthesis",
    "summary": [
      "Point 1",
      "Point 2",
      "Point 3"
    ],
    "quiz": [
      {
        "question": "...",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": 0
      }
    ],
    "studyTip": "...",
    "mode": "regular",
    "source": "https://..."
  }
}
```

## Error Handling Architecture

```
Frontend Error Handling
│
├─► Input Validation
│   └─► Empty topic → Show error message
│
├─► Network Errors
│   ├─► Timeout → "Request timed out"
│   ├─► No connection → "Cannot connect to server"
│   └─► Server error → Display error message
│
└─► Display Errors
    └─► Error component with user-friendly message

Backend Error Handling
│
├─► Request Validation
│   └─► Missing params → 400 Bad Request
│
├─► Wikipedia API Errors
│   ├─► 404 Not Found → Continue with topic name
│   └─► Timeout → Use fallback
│
├─► AI API Errors
│   ├─► Invalid key → Use mock data
│   ├─► Rate limit → Use mock data
│   └─► Timeout → Use mock data
│
└─► Server Errors
    └─► 500 Internal Server Error with message
```

## Security Architecture

```
Security Layers
│
├─► Environment Variables
│   ├─► API keys stored in .env
│   ├─► Not committed to git
│   └─► Loaded at runtime
│
├─► CORS Configuration
│   ├─► Allowed origins specified
│   ├─► Credentials support
│   └─► Prevents unauthorized access
│
├─► Input Validation
│   ├─► Topic parameter required
│   ├─► Mode parameter validated
│   └─► Sanitized before processing
│
└─► Error Messages
    ├─► No sensitive info leaked
    ├─► Generic messages in production
    └─► Detailed logs server-side only
```

## Deployment Architecture

### Development
```
Localhost:3000 (Frontend)
    │
    └─► Localhost:5000 (Backend)
        │
        ├─► Wikipedia API
        └─► OpenAI/Gemini API
```

### Production
```
Vercel CDN (Frontend)
    │
    └─► Render Server (Backend)
        │
        ├─► Wikipedia API
        └─► OpenAI/Gemini API

Features:
- HTTPS encryption
- Environment variables
- Auto-scaling
- CDN caching
- Health monitoring
```

## Technology Stack Details

### Frontend Stack
```
React 18
├─► Component-based UI
├─► Hooks for state management
└─► Virtual DOM for performance

Vite
├─► Fast dev server
├─► Hot module replacement
└─► Optimized production builds

Tailwind CSS
├─► Utility-first styling
├─► Dark mode support
└─► Responsive design

Axios
├─► HTTP client
├─► Promise-based
└─► Request/response interceptors

Lucide React
└─► Icon library
```

### Backend Stack
```
Node.js
└─► JavaScript runtime

Express
├─► Web framework
├─► Middleware support
└─► Routing

OpenAI SDK
└─► GPT-3.5 integration

Google Generative AI
└─► Gemini integration

Axios
└─► HTTP client for APIs

dotenv
└─► Environment variables
```

## Performance Optimizations

```
Frontend
├─► Code splitting
├─► Lazy loading
├─► Optimized re-renders
├─► LocalStorage caching
└─► Debounced API calls

Backend
├─► Efficient error handling
├─► Timeout configurations
├─► Minimal dependencies
└─► Response caching potential

Network
├─► Compressed responses
├─► CDN delivery
└─► HTTP/2 support
```

## Scalability Considerations

```
Current Architecture
├─► Stateless backend
├─► Horizontal scaling ready
└─► CDN for frontend

Future Enhancements
├─► Redis caching layer
├─► Load balancer
├─► Database for user data
├─► Message queue for async tasks
└─► Microservices architecture
```

## Monitoring & Logging

```
Frontend
├─► Browser console errors
├─► Performance metrics
└─► User analytics (optional)

Backend
├─► Server logs
├─► Error tracking
├─► API response times
└─► Health check endpoint

Production
├─► Uptime monitoring
├─► Error alerting
├─► Performance dashboards
└─► Usage analytics
```

This architecture provides a solid foundation for a scalable, maintainable, and production-ready application.