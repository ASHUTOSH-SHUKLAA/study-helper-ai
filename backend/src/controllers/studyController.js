import { fetchTopicInfo } from '../services/wikipediaService.js'
import { generateStudyContent } from '../services/aiService.js'

export const getStudyMaterial = async (req, res) => {
  try {
    const { topic, mode } = req.query

    // Validate input
    if (!topic || topic.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Topic parameter is required'
      })
    }

    const cleanTopic = topic.trim()
    const studyMode = mode === 'math' ? 'math' : 'regular'

    console.log(`📖 Processing request for topic: ${cleanTopic}, mode: ${studyMode}`)

    // Fetch topic information from Wikipedia
    let topicInfo
    try {
      topicInfo = await fetchTopicInfo(cleanTopic)
    } catch (error) {
      console.error('Wikipedia fetch error:', error.message)
      // Continue with just the topic name if Wikipedia fails
      topicInfo = {
        title: cleanTopic,
        extract: `Information about ${cleanTopic}`,
        url: ''
      }
    }

    // Generate AI study content
    const studyContent = await generateStudyContent(topicInfo, studyMode)

    // Return response
    res.json({
      success: true,
      data: {
        topic: topicInfo.title,
        summary: studyContent.summary,
        quiz: studyContent.quiz,
        studyTip: studyContent.studyTip,
        mode: studyMode,
        source: topicInfo.url || null
      }
    })

  } catch (error) {
    console.error('Study controller error:', error)
    
    res.status(500).json({
      success: false,
      error: 'Failed to generate study material',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}