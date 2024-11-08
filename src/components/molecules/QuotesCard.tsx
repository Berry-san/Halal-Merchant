import React from 'react'

interface QuotesCardProps {
  quote_header: string
  quote_title: string
  quote_content: string
  handleEdit: () => void
  handleDelete: () => void
}

const QuotesCard: React.FC<QuotesCardProps> = ({
  quote_header,
  quote_title,
  quote_content,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="p-5 border shadow-lg rounded-xl">
      <div className="gap-5">
        <h2 className="">{quote_header}</h2>
        <p className="">{quote_title}</p>
        <p className="font-semibold">{quote_content}</p>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <button onClick={handleEdit} className="text-blue-500">
          Edit
        </button>
        <button onClick={handleDelete} className="text-red-500">
          Delete
        </button>
      </div>
    </div>
  )
}

export default QuotesCard
