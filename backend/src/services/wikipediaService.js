import axios from 'axios'

const WIKIPEDIA_API = 'https://en.wikipedia.org/api/rest_v1/page/summary/'

export const fetchTopicInfo = async (topic) => {
  try {
    const encodedTopic = encodeURIComponent(topic)
    const url = `${WIKIPEDIA_API}${encodedTopic}`
    
    console.log(`🌐 Fetching from Wikipedia: ${topic}`)
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'StudyHelperAI/1.0'
      },
      timeout: 10000
    })

    if (response.data && response.data.extract) {
      return {
        title: response.data.title,
        extract: response.data.extract,
        url: response.data.content_urls?.desktop?.page || ''
      }
    }

    throw new Error('No content found')
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`Topic "${topic}" not found on Wikipedia`)
    }
    throw new Error(`Wikipedia API error: ${error.message}`)
  }
}