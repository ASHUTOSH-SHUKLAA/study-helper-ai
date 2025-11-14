import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'

const AI_PROVIDER = process.env.AI_PROVIDER || 'openai'

// Initialize AI clients
let openai, gemini

if (AI_PROVIDER === 'openai' && process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })
}

if (AI_PROVIDER === 'gemini' && process.env.GEMINI_API_KEY) {
  gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
}

export const generateStudyContent = async (topicInfo, mode = 'regular') => {
  try {
    const prompt = createPrompt(topicInfo, mode)
    
    let aiResponse
    if (AI_PROVIDER === 'openai' && openai) {
      aiResponse = await generateWithOpenAI(prompt)
    } else if (AI_PROVIDER === 'gemini' && gemini) {
      aiResponse = await generateWithGemini(prompt)
    } else {
      // Fallback to mock data if no AI provider configured
      console.warn('⚠️  No AI provider configured, using mock data')
      return generateMockContent(topicInfo, mode)
    }

    return parseAIResponse(aiResponse, mode)
  } catch (error) {
    console.error('AI generation error:', error.message)
    // Fallback to mock content on error
    return generateMockContent(topicInfo, mode)
  }
}

function createPrompt(topicInfo, mode) {
  const basePrompt = `Topic: ${topicInfo.title}
Context: ${topicInfo.extract}

Generate educational study material in JSON format with the following structure:`

  if (mode === 'math') {
    return `${basePrompt}

{
  "summary": ["bullet point 1", "bullet point 2", "bullet point 3"],
  "quiz": [
    {
      "question": "A quantitative or logic problem related to ${topicInfo.title}",
      "answer": "The correct answer",
      "explanation": "Step-by-step explanation of how to solve it"
    }
  ],
  "studyTip": "A practical study tip for mastering this topic"
}

Requirements:
- Summary: 3 concise bullet points covering key concepts
- Quiz: 1 mathematical/quantitative question with numerical answer and detailed explanation
- Study Tip: One actionable tip for learning this topic effectively

Return ONLY valid JSON, no additional text.`
  }

  return `${basePrompt}

{
  "summary": ["bullet point 1", "bullet point 2", "bullet point 3"],
  "quiz": [
    {
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0
    }
  ],
  "studyTip": "A practical study tip"
}

Requirements:
- Summary: 3 concise bullet points covering key concepts
- Quiz: 3 multiple-choice questions with 4 options each
- correctAnswer: index (0-3) of the correct option
- Study Tip: One actionable tip for learning this topic effectively

Return ONLY valid JSON, no additional text.`
}

async function generateWithOpenAI(prompt) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are an expert educational content creator. Generate accurate, helpful study materials in JSON format.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 1000
  })

  return completion.choices[0].message.content
}

async function generateWithGemini(prompt) {
  const model = gemini.getGenerativeModel({ model: 'gemini-pro' })
  const result = await model.generateContent(prompt)
  const response = await result.response
  return response.text()
}

function parseAIResponse(response, mode) {
  try {
    // Remove markdown code blocks if present
    let cleanResponse = response.trim()
    if (cleanResponse.startsWith('```json')) {
      cleanResponse = cleanResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '')
    } else if (cleanResponse.startsWith('```')) {
      cleanResponse = cleanResponse.replace(/```\n?/g, '')
    }

    const parsed = JSON.parse(cleanResponse)

    // Validate structure
    if (!parsed.summary || !Array.isArray(parsed.summary)) {
      throw new Error('Invalid summary format')
    }
    if (!parsed.quiz || !Array.isArray(parsed.quiz)) {
      throw new Error('Invalid quiz format')
    }
    if (!parsed.studyTip || typeof parsed.studyTip !== 'string') {
      throw new Error('Invalid study tip format')
    }

    return parsed
  } catch (error) {
    console.error('Failed to parse AI response:', error.message)
    throw error
  }
}

function generateMockContent(topicInfo, mode) {
  const topic = topicInfo.title

  if (mode === 'math') {
    return {
      summary: [
        `${topic} involves mathematical concepts and quantitative reasoning`,
        `Understanding the fundamental principles is key to solving problems`,
        `Practice with varied examples helps build problem-solving skills`
      ],
      quiz: [
        {
          question: `Solve a problem related to ${topic}: If x + 5 = 12, what is x?`,
          answer: '7',
          explanation: 'Subtract 5 from both sides: x = 12 - 5 = 7'
        }
      ],
      studyTip: `Practice ${topic} problems daily, starting with simple examples and gradually increasing difficulty. Work through each step methodically.`
    }
  }

  return {
    summary: [
      `${topic} is an important concept with wide-ranging applications`,
      `Key principles include understanding the fundamental mechanisms and relationships`,
      `Practical applications demonstrate the real-world relevance of ${topic}`
    ],
    quiz: [
      {
        question: `What is a key characteristic of ${topic}?`,
        options: [
          'It involves complex interactions',
          'It is completely random',
          'It has no practical use',
          'It cannot be studied'
        ],
        correctAnswer: 0
      },
      {
        question: `Which field commonly uses ${topic}?`,
        options: [
          'Unrelated fields',
          'Relevant scientific or practical fields',
          'No fields use it',
          'Only theoretical physics'
        ],
        correctAnswer: 1
      },
      {
        question: `What is important when studying ${topic}?`,
        options: [
          'Ignoring the basics',
          'Understanding core concepts first',
          'Memorizing without understanding',
          'Avoiding practice'
        ],
        correctAnswer: 1
      }
    ],
    studyTip: `Create a mind map connecting different aspects of ${topic}. Use visual aids and real-world examples to reinforce your understanding.`
  }
}