import React from 'react'
import IceCreamCard from './IceCreamCard'

function IceCreamList({ icecreams, onDelete, loading, darkMode }) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">⏳</div>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Loading...</p>
      </div>
    )
  }

  if (icecreams.length === 0) {
    return (
      <div className={`text-center py-16 rounded-xl border-2 border-dashed ${
        darkMode 
          ? 'border-gray-600 bg-gray-700' 
          : 'border-pink-300 bg-pink-50'
      }`}>
        <div className="text-5xl mb-4">🍦</div>
        <p className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          No ice creams yet!
        </p>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
          Add your first ice cream to get started 🎉
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className={`text-sm font-semibold p-3 rounded-lg flex justify-between ${
        darkMode 
          ? 'bg-gray-700 text-gray-300' 
          : 'bg-pink-100 text-pink-700'
      }`}>
        <span>Total Entries: <strong>{icecreams.length}</strong></span>
        <span>Showing sorted by calories ↓</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {icecreams.map((icecream, index) => (
          <IceCreamCard
            key={icecream.id}
            icecream={icecream}
            onDelete={onDelete}
            index={index}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  )
}

export default IceCreamList
