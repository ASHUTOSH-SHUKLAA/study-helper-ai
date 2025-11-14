import { useState, useEffect } from 'react'
import { History, Calculator, Trash2 } from 'lucide-react'

const TopicHistory = ({ onTopicSelect }) => {
  const [history, setHistory] = useState([])

  useEffect(() => {
    loadHistory()
    
    // Listen for history updates
    const handleHistoryUpdate = () => loadHistory()
    window.addEventListener('historyUpdated', handleHistoryUpdate)
    
    return () => {
      window.removeEventListener('historyUpdated', handleHistoryUpdate)
    }
  }, [])

  const loadHistory = () => {
    const saved = localStorage.getItem('topicHistory')
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }

  const clearHistory = () => {
    localStorage.removeItem('topicHistory')
    setHistory([])
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}d ago`
  }

  if (history.length === 0) return null

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <History className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Recent Topics
          </h3>
        </div>
        <button
          onClick={clearHistory}
          className="text-xs text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
          title="Clear history"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2">
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() => onTopicSelect(item.topic)}
            className="w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1 min-w-0">
                {item.mathMode && (
                  <Calculator className="h-3 w-3 text-primary-600 dark:text-primary-400 mr-1 flex-shrink-0" />
                )}
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                  {item.topic}
                </span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
                {formatDate(item.timestamp)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TopicHistory