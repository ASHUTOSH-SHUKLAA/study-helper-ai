# Study Helper AI

An AI-powered study assistant that helps students learn smarter by generating summaries, quiz questions, and study tips for any topic.

## Overview

Study Helper AI is a full-stack web application that:
- Fetches topic information from Wikipedia API
- Uses AI (OpenAI GPT or Gemini) to generate educational content
- Creates 3-bullet summaries, multiple-choice quizzes, and personalized study tips
- Supports special "Math Mode" for quantitative/logic questions
- Provides a clean, responsive interface with dark mode support

## Tech Stack

**Frontend:**
- React 18 with Vite
- Tailwind CSS for styling
- Axios for API calls
- LocalStorage for topic history

**Backend:**
- Node.js with Express
- Axios for external API calls
- OpenAI API / Google Gemini API
- CORS enabled for cross-origin requests

**Hosting:**
- Frontend: Vercel
- Backend: Render

## Live Demo

- **Frontend URL**: [To be deployed]
- **Backend URL**: [To be deployed]

## Features

✅ Topic-based learning with AI-generated content
✅ Wikipedia integration for accurate information
✅ Math Mode for quantitative questions
✅ Dark mode toggle
✅ Topic history tracking
✅ Loading states and error handling
✅ Responsive design
✅ Clean, modern UI

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key OR Google Gemini API key
- Git

### Backend Setup

1. Navigate to backend folder:
\`\`\`bash
cd backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create \`.env\` file:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Add your API keys to \`.env\`:
\`\`\`env
PORT=5000
OPENAI_API_KEY=your_openai_key_here
# OR
GEMINI_API_KEY=your_gemini_key_here
AI_PROVIDER=openai
\`\`\`

5. Start the server:
\`\`\`bash
npm start
\`\`\`

Backend will run on \`http://localhost:5000\`

### Frontend Setup

1. Navigate to frontend folder:
\`\`\`bash
cd frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create \`.env\` file:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update \`.env\` with backend URL:
\`\`\`env
VITE_API_URL=http://localhost:5000
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

Frontend will run on \`http://localhost:3000\`

## API Documentation

### Endpoint: GET /study

Generates study materials for a given topic.

**Query Parameters:**
- \`topic\` (required): The subject to study (e.g., "photosynthesis", "calculus")
- \`mode\` (optional): Set to "math" for quantitative questions

**Example Requests:**

\`\`\`bash
# Regular mode
GET http://localhost:5000/study?topic=photosynthesis

# Math mode
GET http://localhost:5000/study?topic=calculus&mode=math
\`\`\`

**Response Format:**

\`\`\`json
{
  "success": true,
  "data": {
    "topic": "Photosynthesis",
    "summary": [
      "Photosynthesis is the process by which plants convert light energy into chemical energy",
      "It occurs in chloroplasts and requires sunlight, water, and carbon dioxide",
      "The process produces glucose and oxygen as byproducts"
    ],
    "quiz": [
      {
        "question": "What is the primary pigment involved in photosynthesis?",
        "options": ["Chlorophyll", "Carotene", "Xanthophyll", "Anthocyanin"],
        "correctAnswer": 0
      },
      {
        "question": "Which organelle is responsible for photosynthesis?",
        "options": ["Mitochondria", "Nucleus", "Chloroplast", "Ribosome"],
        "correctAnswer": 2
      },
      {
        "question": "What gas is released during photosynthesis?",
        "options": ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
        "correctAnswer": 2
      }
    ],
    "studyTip": "Create a diagram showing the light-dependent and light-independent reactions to visualize the complete process.",
    "mode": "regular"
  }
}
\`\`\`

**Math Mode Response:**

\`\`\`json
{
  "success": true,
  "data": {
    "topic": "Calculus",
    "summary": [...],
    "quiz": [
      {
        "question": "Find the derivative of f(x) = 3x² + 2x - 5",
        "answer": "6x + 2",
        "explanation": "Using the power rule: d/dx(x^n) = nx^(n-1), we get 6x + 2"
      }
    ],
    "studyTip": "Practice derivatives daily and work through example problems step by step.",
    "mode": "math"
  }
}
\`\`\`

**Error Response:**

\`\`\`json
{
  "success": false,
  "error": "Topic parameter is required"
}
\`\`\`

### Health Check: GET /health

Returns server status.

\`\`\`json
{
  "status": "ok",
  "timestamp": "2025-11-14T01:47:00.000Z"
}
\`\`\`

## Testing

### Manual Test Plan

1. **Basic Topic Test**
   - Input: "photosynthesis"
   - Expected: Summary with 3 bullets, 3 MCQs, study tip
   - Verify: All fields populated, quiz has correct structure

2. **Math Mode Test**
   - Input: "algebra" with Math Mode enabled
   - Expected: Quantitative question with answer and explanation
   - Verify: Question is mathematical, answer is provided

3. **Error Handling Test**
   - Input: Empty topic
   - Expected: Error message displayed
   - Verify: User-friendly error shown

4. **Topic History Test**
   - Search multiple topics
   - Expected: History list updates
   - Verify: Can click history items to reload

5. **Dark Mode Test**
   - Toggle dark mode
   - Expected: Theme changes persist
   - Verify: All elements readable in both modes

### Backend Test Cases

Run tests with:
\`\`\`bash
cd backend
npm test
\`\`\`

**Test Case 1: Valid Topic Request**
\`\`\`javascript
// Input
GET /study?topic=photosynthesis

// Expected Output
- Status: 200
- Response contains: summary (array), quiz (array), studyTip (string)
- Summary has 3 items
- Quiz has 3 questions with options and correctAnswer
\`\`\`

**Test Case 2: Math Mode Request**
\`\`\`javascript
// Input
GET /study?topic=calculus&mode=math

// Expected Output
- Status: 200
- Response contains math question with answer and explanation
- mode field equals "math"
\`\`\`

**Test Case 3: Missing Topic Parameter**
\`\`\`javascript
// Input
GET /study

// Expected Output
- Status: 400
- Error message: "Topic parameter is required"
\`\`\`

## Deployment

### Backend Deployment (Render)

1. Create account on [Render](https://render.com)
2. Create new Web Service
3. Connect your GitHub repository
4. Configure:
   - Build Command: \`cd backend && npm install\`
   - Start Command: \`cd backend && npm start\`
   - Add environment variables (OPENAI_API_KEY, etc.)
5. Deploy

### Frontend Deployment (Vercel)

1. Install Vercel CLI: \`npm i -g vercel\`
2. Navigate to frontend folder
3. Run: \`vercel\`
4. Add environment variable: \`VITE_API_URL=<your-backend-url>\`
5. Deploy: \`vercel --prod\`

## Environment Variables

### Backend (.env)
\`\`\`
PORT=5000
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...
AI_PROVIDER=openai
NODE_ENV=production
\`\`\`

### Frontend (.env)
\`\`\`
VITE_API_URL=http://localhost:5000
\`\`\`

## AI Tools Disclosure

This project was developed with assistance from:
- **GitHub Copilot**: Code completion and suggestions
- **ChatGPT/Claude**: Architecture planning and debugging assistance
- **AI APIs Used**: OpenAI GPT-3.5/4 or Google Gemini for content generation

The AI integration in this app uses:
- OpenAI API for generating educational content
- Wikipedia API for fetching topic information
- Prompt engineering to ensure educational quality

## Project Structure

\`\`\`
study-helper-ai/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── studyController.js
│   │   ├── services/
│   │   │   ├── aiService.js
│   │   │   └── wikipediaService.js
│   │   ├── routes/
│   │   │   └── studyRoutes.js
│   │   └── app.js
│   ├── tests/
│   │   └── study.test.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudyForm.jsx
│   │   │   ├── Summary.jsx
│   │   │   ├── Quiz.jsx
│   │   │   ├── StudyTip.jsx
│   │   │   ├── TopicHistory.jsx
│   │   │   └── DarkModeToggle.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
└── README.md
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License

## Support

For issues or questions:
- Open a GitHub issue
- Check the API documentation
- Review test cases for examples