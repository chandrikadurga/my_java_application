import React, { useState } from 'react'

function IceCreamCard({ icecream, onDelete, index, darkMode }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const getTypeEmoji = (type) => {
    const emojis = {
      cone: '🍦',
      cup: '🥣',
      sundae: '🍨'
    }
    return emojis[type] || '🍦'
  }

  const getTypeColor = (type) => {
    const colors = {
      cone: 'from-orange-400 to-yellow-400',
      cup: 'from-blue-400 to-cyan-400',
      sundae: 'from-pink-400 to-red-400'
    }
    return colors[type] || 'from-purple-400 to-pink-400'
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete(icecream.id)
    setIsDeleting(false)
  }

  const caloriePercentage = Math.min((icecream.calories / 500) * 100, 100)
  const calorieColor = icecream.calories > 400 ? 'from-red-500 to-orange-500' : 
                       icecream.calories > 200 ? 'from-yellow-500 to-orange-500' :
                       'from-green-500 to-lime-500'

  return (
    <div className={`rounded-xl shadow-lg p-5 transition-all transform hover:scale-105 hover:shadow-xl ${
      darkMode 
        ? 'bg-grad-dark border border-gray-700' 
        : 'bg-white border border-pink-200'
    } ${isDeleting ? 'opacity-50' : ''}`}
      style={{
        background: darkMode 
          ? `linear-gradient(135deg, rgba(55, 65, 81, 0.8), rgba(31, 41, 55, 0.8))`
          : `linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 240, 245, 0.9))`
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{getTypeEmoji(icecream.type)}</span>
          <div>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {icecream.name}
            </h3>
            <p className={`text-sm capitalize font-semibold ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {icecream.type}
            </p>
          </div>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
          darkMode
            ? 'bg-gray-700 text-gray-200'
            : 'bg-gray-200 text-gray-800'
        }`}>
          #{icecream.id}
        </span>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className={`p-3 rounded-lg ${
          darkMode 
            ? 'bg-gray-700' 
            : 'bg-blue-100'
        }`}>
          <p className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-blue-600'}`}>
            SCOOPS
          </p>
          <p className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {icecream.scoops}
          </p>
        </div>

        <div className={`p-3 rounded-lg bg-gradient-to-br ${calorieColor}`}>
          <p className="text-xs font-semibold text-white">CALORIES</p>
          <p className="text-2xl font-bold text-white">{icecream.calories}</p>
        </div>
      </div>

      {/* Calorie Progress Bar */}
      <div className="mb-4 space-y-1">
        <div className="flex justify-between items-center text-xs">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Calorie Load</span>
          <span className={`font-bold text-xs ${
            icecream.calories > 400 ? 'text-red-500' :
            icecream.calories > 200 ? 'text-yellow-500' :
            'text-green-500'
          }`}>
            {Math.round(caloriePercentage)}%
          </span>
        </div>
        <div className={`w-full h-2 rounded-full overflow-hidden ${
          darkMode 
            ? 'bg-gray-700' 
            : 'bg-gray-200'
        }`}>
          <div
            className={`h-full bg-gradient-to-r ${calorieColor} transition-all`}
            style={{ width: `${caloriePercentage}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={`w-full py-2 px-3 rounded-lg font-semibold transition-all transform ${
          isDeleting
            ? 'bg-gray-400 cursor-not-allowed opacity-50'
            : darkMode
            ? 'bg-red-600 hover:bg-red-700 text-white hover:scale-105'
            : 'bg-red-500 hover:bg-red-600 text-white hover:scale-105'
        }`}
      >
        {isDeleting ? '🗑️ Deleting...' : '🗑️ Delete'}
      </button>
    </div>
  )
}

export default IceCreamCard
