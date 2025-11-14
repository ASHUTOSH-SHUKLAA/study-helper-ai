import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const fetchStudyMaterial = async (topic, mode = 'regular') => {
  try {
    const response = await axios.get(`${API_URL}/study`, {
      params: {
        topic,
        mode: mode === 'math' ? 'math' : undefined
      },
      timeout: 30000 // 30 second timeout
    })

    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.error || 'Failed to fetch study material')
    }
  } catch (error) {
    if (error.response) {
      // Server responded with error
      throw new Error(error.response.data.error || 'Server error occurred')
    } else if (error.request) {
      // Request made but no response
      throw new Error('Cannot connect to server. Please check if the backend is running.')
    } else {
      // Other errors
      throw new Error(error.message || 'An unexpected error occurred')
    }
  }
}

export const checkServerHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`, { timeout: 5000 })
    return response.data.status === 'ok'
  } catch (error) {
    return false
  }
}