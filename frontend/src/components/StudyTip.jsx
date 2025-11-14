import { Lightbulb } from 'lucide-react'

const StudyTip = ({ data }) => {
  if (!data || !data.studyTip) return null

  return (
    <div className="card bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-lg">
            <Lightbulb className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Study Tip
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {data.studyTip}
          </p>
        </div>
      </div>
    </div>
  )
}

export default StudyTip