import { FileText, ExternalLink } from 'lucide-react'

const Summary = ({ data }) => {
  if (!data || !data.summary) return null

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FileText className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Summary: {data.topic}
          </h2>
        </div>
        {data.source && (
          <a
            href={data.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center"
          >
            Wikipedia
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        )}
      </div>

      <div className="space-y-3">
        {data.summary.map((point, index) => (
          <div key={index} className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-sm font-medium mr-3">
              {index + 1}
            </span>
            <p className="text-gray-700 dark:text-gray-300 flex-1">
              {point}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Summary