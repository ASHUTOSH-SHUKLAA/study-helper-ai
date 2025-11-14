import { useState, useEffect } from 'react'
import StudyForm from './components/StudyForm'
import Summary from './components/Summary'
import Quiz from './components/Quiz'
import StudyTip from './components/StudyTip'
import TopicHistory from './components/TopicHistory'
import DarkModeToggle from './components/DarkModeToggle'
import { BookOpen, Sparkles } from 'lucide-react'

function App() {
  const [studyData, setStudyData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode)
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleStudyDataReceived = (data) => {
    setStudyData(data)
    setError(null)
  }

  const handleError = (errorMessage) => {
    setError(errorMessage)
    setStudyData(null)
  }

  const handleTopicSelect = (topic) => {
    // Trigger a new search with the selected topic
    // This will be handled by the StudyForm component
    setStudyData(null)
    setError(null)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-lg">
                <BookOpen className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Study Helper AI
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Learn smarter with AI-powered study materials
                </p>
              </div>
            </div>
            <DarkModeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Form and History */}
          <div className="lg:col-span-1 space-y-6">
            <StudyForm
              onDataReceived={handleStudyDataReceived}
              onError={handleError}
              onLoadingChange={setLoading}
            />
            <TopicHistory onTopicSelect={handleTopicSelect} />
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-3">
            {loading && (
              <div className="card animate-fade-in">
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Generating your study materials...
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 animate-fade-in">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                      Error
                    </h3>
                    <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!loading && !error && !studyData && (
              <div className="card text-center py-12 animate-fade-in">
                <Sparkles className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Ready to Learn?
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Enter a topic to get started with AI-generated study materials
                </p>
              </div>
            )}

            {studyData && !loading && (
              <div className="space-y-6 animate-slide-up">
                <Summary data={studyData} />
                <Quiz data={studyData} />
                <StudyTip data={studyData} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Powered by AI • Built with React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App