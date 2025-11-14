# API Examples and Sample Responses

## Base URL

**Local Development**: `http://localhost:5000`
**Production**: `https://your-backend-url.onrender.com`

## Endpoints

### 1. Health Check

Check if the server is running.

**Request:**
```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-14T01:47:00.000Z",
  "environment": "development"
}
```

---

### 2. Generate Study Material (Regular Mode)

Generate study materials for a topic.

**Request:**
```http
GET /study?topic=photosynthesis
```

**Response:**
```json
{
  "success": true,
  "data": {
    "topic": "Photosynthesis",
    "summary": [
      "Photosynthesis is the process by which plants, algae, and some bacteria convert light energy into chemical energy stored in glucose",
      "The process occurs in chloroplasts and requires sunlight, water, and carbon dioxide as inputs",
      "Photosynthesis produces glucose and oxygen as outputs, playing a crucial role in the Earth's carbon cycle and providing oxygen for aerobic organisms"
    ],
    "quiz": [
      {
        "question": "What is the primary pigment involved in photosynthesis?",
        "options": [
          "Chlorophyll",
          "Carotene",
          "Xanthophyll",
          "Anthocyanin"
        ],
        "correctAnswer": 0
      },
      {
        "question": "Which organelle is responsible for photosynthesis in plant cells?",
        "options": [
          "Mitochondria",
          "Nucleus",
          "Chloroplast",
          "Ribosome"
        ],
        "correctAnswer": 2
      },
      {
        "question": "What gas is released as a byproduct of photosynthesis?",
        "options": [
          "Carbon dioxide",
          "Nitrogen",
          "Oxygen",
          "Hydrogen"
        ],
        "correctAnswer": 2
      }
    ],
    "studyTip": "Create a diagram showing the light-dependent and light-independent reactions (Calvin cycle) to visualize how photosynthesis works. Use different colors to represent the flow of energy and matter through each stage.",
    "mode": "regular",
    "source": "https://en.wikipedia.org/wiki/Photosynthesis"
  }
}
```

---

### 3. Generate Study Material (Math Mode)

Generate quantitative problems with solutions.

**Request:**
```http
GET /study?topic=calculus&mode=math
```

**Response:**
```json
{
  "success": true,
  "data": {
    "topic": "Calculus",
    "summary": [
      "Calculus is a branch of mathematics that studies continuous change through derivatives and integrals",
      "Differential calculus focuses on rates of change and slopes of curves, while integral calculus deals with accumulation and areas under curves",
      "Calculus has wide applications in physics, engineering, economics, and many other fields where modeling change is essential"
    ],
    "quiz": [
      {
        "question": "Find the derivative of f(x) = 3x² + 2x - 5",
        "answer": "f'(x) = 6x + 2",
        "explanation": "Using the power rule d/dx(x^n) = nx^(n-1): The derivative of 3x² is 6x, the derivative of 2x is 2, and the derivative of -5 (constant) is 0. Therefore, f'(x) = 6x + 2."
      }
    ],
    "studyTip": "Practice derivatives daily by working through 5-10 problems. Start with basic polynomial functions, then progress to trigonometric and exponential functions. Always verify your answers by checking if the derivative makes sense graphically.",
    "mode": "math",
    "source": "https://en.wikipedia.org/wiki/Calculus"
  }
}
```

---

### 4. Error: Missing Topic Parameter

**Request:**
```http
GET /study
```

**Response:**
```json
{
  "success": false,
  "error": "Topic parameter is required"
}
```

**Status Code:** `400 Bad Request`

---

### 5. Error: Invalid Endpoint

**Request:**
```http
GET /invalid-endpoint
```

**Response:**
```json
{
  "success": false,
  "error": "Endpoint not found"
}
```

**Status Code:** `404 Not Found`

---

### 6. Error: Server Error

**Request:**
```http
GET /study?topic=test
```

**Response (if server error occurs):**
```json
{
  "success": false,
  "error": "Failed to generate study material",
  "message": "Detailed error message (development only)"
}
```

**Status Code:** `500 Internal Server Error`

---

## cURL Examples

### Health Check
```bash
curl http://localhost:5000/health
```

### Regular Mode
```bash
curl "http://localhost:5000/study?topic=photosynthesis"
```

### Math Mode
```bash
curl "http://localhost:5000/study?topic=algebra&mode=math"
```

### With Pretty Print (using jq)
```bash
curl "http://localhost:5000/study?topic=biology" | jq
```

---

## JavaScript/Axios Examples

### Basic Request
```javascript
import axios from 'axios'

const fetchStudyMaterial = async (topic) => {
  try {
    const response = await axios.get('http://localhost:5000/study', {
      params: { topic }
    })
    console.log(response.data)
  } catch (error) {
    console.error('Error:', error.message)
  }
}

fetchStudyMaterial('photosynthesis')
```

### With Math Mode
```javascript
const fetchMathProblem = async (topic) => {
  try {
    const response = await axios.get('http://localhost:5000/study', {
      params: {
        topic,
        mode: 'math'
      }
    })
    console.log(response.data)
  } catch (error) {
    console.error('Error:', error.message)
  }
}

fetchMathProblem('calculus')
```

### With Error Handling
```javascript
const fetchStudyMaterial = async (topic, mode = 'regular') => {
  try {
    const response = await axios.get('http://localhost:5000/study', {
      params: {
        topic,
        mode: mode === 'math' ? 'math' : undefined
      },
      timeout: 30000
    })

    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.error)
    }
  } catch (error) {
    if (error.response) {
      // Server responded with error
      throw new Error(error.response.data.error || 'Server error')
    } else if (error.request) {
      // No response received
      throw new Error('Cannot connect to server')
    } else {
      // Other errors
      throw new Error(error.message)
    }
  }
}
```

---

## Python Examples

### Using requests library
```python
import requests

def fetch_study_material(topic, mode='regular'):
    url = 'http://localhost:5000/study'
    params = {'topic': topic}
    
    if mode == 'math':
        params['mode'] = 'math'
    
    try:
        response = requests.get(url, params=params, timeout=30)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

# Usage
data = fetch_study_material('photosynthesis')
if data and data['success']:
    print(data['data']['summary'])
```

---

## Response Field Descriptions

### Success Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Indicates if request was successful |
| `data` | object | Contains the study material |
| `data.topic` | string | The topic name (from Wikipedia) |
| `data.summary` | array | Array of 3 summary bullet points |
| `data.quiz` | array | Array of quiz questions |
| `data.studyTip` | string | Personalized study tip |
| `data.mode` | string | "regular" or "math" |
| `data.source` | string | Wikipedia URL (if available) |

### Regular Mode Quiz Question

| Field | Type | Description |
|-------|------|-------------|
| `question` | string | The question text |
| `options` | array | Array of 4 answer options |
| `correctAnswer` | number | Index (0-3) of correct option |

### Math Mode Quiz Question

| Field | Type | Description |
|-------|------|-------------|
| `question` | string | The problem statement |
| `answer` | string | The correct answer |
| `explanation` | string | Step-by-step solution |

### Error Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Always false for errors |
| `error` | string | Error message |
| `message` | string | Detailed error (development only) |

---

## Rate Limiting

Currently, there is no rate limiting implemented. However, be aware of:

- **OpenAI API**: 3 requests/minute (free tier)
- **Gemini API**: 60 requests/minute (free tier)
- **Wikipedia API**: No strict limits, but be respectful

---

## Best Practices

### 1. Handle Timeouts
```javascript
axios.get('/study', {
  params: { topic: 'biology' },
  timeout: 30000 // 30 seconds
})
```

### 2. Implement Retry Logic
```javascript
const fetchWithRetry = async (topic, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchStudyMaterial(topic)
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
}
```

### 3. Cache Responses
```javascript
const cache = new Map()

const fetchWithCache = async (topic) => {
  if (cache.has(topic)) {
    return cache.get(topic)
  }
  
  const data = await fetchStudyMaterial(topic)
  cache.set(topic, data)
  return data
}
```

### 4. Validate Input
```javascript
const isValidTopic = (topic) => {
  return topic && 
         typeof topic === 'string' && 
         topic.trim().length > 0 &&
         topic.length < 200
}
```

---

## Testing the API

### Using Postman
1. Create new GET request
2. Enter URL: `http://localhost:5000/study`
3. Add query parameter: `topic` = `photosynthesis`
4. Optional: Add `mode` = `math`
5. Send request
6. View formatted JSON response

### Using Browser
Simply navigate to:
```
http://localhost:5000/study?topic=photosynthesis
```

### Using HTTPie
```bash
http GET localhost:5000/study topic==photosynthesis
```

---

## Common Issues

### Issue: CORS Error
**Solution**: Ensure backend CORS is configured with your frontend URL

### Issue: Timeout
**Solution**: Increase timeout or check AI API status

### Issue: Empty Response
**Solution**: Check if API keys are set correctly

### Issue: Mock Data Returned
**Solution**: This is normal fallback behavior when AI API fails

---

## API Versioning

Current version: **v1** (implicit)

Future versions may include:
- `/v2/study` - Enhanced features
- `/api/v1/study` - Explicit versioning

---

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Axios Documentation](https://axios-http.com/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Wikipedia API Documentation](https://www.mediawiki.org/wiki/API:Main_page)