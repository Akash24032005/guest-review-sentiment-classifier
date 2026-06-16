function Card({ title, description, tag, sentiment }) {
  const colors = {
    positive: 'bg-green-100 text-green-700',
    neutral: 'bg-yellow-100 text-yellow-700',
    negative: 'bg-red-100 text-red-700',
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${colors[sentiment]}`}>
          {sentiment}
        </span>
        <span className="text-sm text-gray-400">{tag}</span>
      </div>
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

export default Card