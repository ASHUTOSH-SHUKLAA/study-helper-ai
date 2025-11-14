import { useState } from 'react'
import { HelpCircle, CheckCircle, XCircle, Calculator } from 'lucide-react'

const Quiz = ({ data }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  if (!data || !data.quiz) return null

  const isMathMode = data.mode === 'math'

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    if (showResults) return
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    })
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  const handleReset = () => {
    setSelectedAnswers({})
    setShowResults(false)
  }

  const calculateScore = () => {
    if (isMathMode) return null
    
    let correct = 0
    data.quiz.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++
      }
    })
    return correct
  }

  const score = calculateScore()

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {isMathMode ? (
            <Calculator className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
          ) : (
            <HelpCircle className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
          )}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {isMathMode ? 'Practice Problem' : 'Quiz Questions'}
          </h2>
        </div>
        {showResults && !isMathMode && (
          <div className="text-sm font-medium">
            Score: {score}/{data.quiz.length}
          </div>
        )}
      </div>

      <div className="space-y-6">
        {data.quiz.map((question, qIndex) => (
          <div key={qIndex} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-6 last:pb-0">
            <p className="font-medium text-gray-900 dark:text-white mb-3">
              {qIndex + 1}. {question.question}
            </p>

            {isMathMode ? (
              // Math mode - show answer and explanation
              <div className="space-y-3">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                    Answer:
                  </p>
                  <p className="text-green-900 dark:text-green-100 font-mono">
                    {question.answer}
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                    Explanation:
                  </p>
                  <p className="text-blue-900 dark:text-blue-100 text-sm">
                    {question.explanation}
                  </p>
                </div>
              </div>
            ) : (
              // Regular mode - MCQ
              <div className="space-y-2">
                {question.options.map((option, oIndex) => {
                  const isSelected = selectedAnswers[qIndex] === oIndex
                  const isCorrect = question.correctAnswer === oIndex
                  const showCorrect = showResults && isCorrect
                  const showIncorrect = showResults && isSelected && !isCorrect

                  return (
                    <button
                      key={oIndex}
                      onClick={() => handleAnswerSelect(qIndex, oIndex)}
                      disabled={showResults}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                        showCorrect
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : showIncorrect
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : isSelected
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                      } ${showResults ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 dark:text-white">
                          {String.fromCharCode(65 + oIndex)}. {option}
                        </span>
                        {showCorrect && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                        {showIncorrect && (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {!isMathMode && (
        <div className="mt-6 flex gap-3">
          {!showResults ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length !== data.quiz.length}
              className="btn-primary flex-1"
            >
              Submit Answers
            </button>
          ) : (
            <button onClick={handleReset} className="btn-secondary flex-1">
              Try Again
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Quiz