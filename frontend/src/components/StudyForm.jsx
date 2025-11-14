import { useState } from 'react'
import { fetchStudyMaterial } from '../services/api'
import { Search, Calculator } from 'lucide-react'

const StudyForm = ({ onDataReceived, onError, onLoadingChange }) => {
  const [topic, setTopic] = useState('')
  const [mathMode, setMathMode] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!topic.trim()) {
      onError('Please enter a topic')
      return
    }

    onLoadingChange(true)
    onError(null)

    try {
      const data = await fetchStudyMaterial(topic.trim(), mathMode ? 'math' : 'regular')
      
      // Save to history
      saveToHistory(topic.trim(), mathMode)
      
      onDataReceived(data)
    } catch (error) {
      onError(error.message)
    } finally {
      onLoadingChange(false)
    }
  }

  const saveToHistory = (searchTopic, isMathMode) => {
    const history = JSON.parse(localStorage.getItem('topicHistory') || '[]')
    
    const newEntry = {
      topic: searchTopic,
      mathMode: isMathMode,
      timestamp: new Date().toISOString()
    }
    
    // Remove duplicates and add to front
    const filtered = history.filter(item => 
      item.topic.toLowerCase() !== searchTopic.toLowerCase()
    )
    
    const updated = [newEntry, ...filtered].slice(0, 10) // Keep last 10
    localStorage.setItem('topicHistory', JSON.stringify(updated))
    
    // Dispatch event for history component
    window.dispatchEvent(new Event('historyUpdated'))
  }

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        What do you want to study?
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Topic
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., photosynthesis, calculus..."
            className="input-field"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="mathMode"
            checked={mathMode}
            onChange={(e) => setMathMode(e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="mathMode" className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <Calculator className="h-4 w-4 mr-1" />
            Math Mode (quantitative questions)
          </label>
        </div>

        <button
          type="submit"
          className="btn-primary w-full flex items-center justify-center"
        >
          <Search className="h-4 w-4 mr-2" />
          Generate Study Materials
        </button>
      </form>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          💡 Tip: Be specific with your topic for better results
        </p>
      </div>
    </div>
  )
}

export default StudyForm