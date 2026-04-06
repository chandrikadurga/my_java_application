import React from 'react'

function Summary({ totalCalories, count, stats, darkMode }) {
  const safeTotalCalories = Number.isFinite(totalCalories) ? totalCalories : 0
  const safeCount = Number.isFinite(count) ? count : 0
  const dailyCalorieLimit = 2000
  const caloriePercentage = Math.min((safeTotalCalories / dailyCalorieLimit) * 100, 100)
  
  const getHealthStatus = () => {
    if (safeTotalCalories === 0) return { status: 'No entries yet', color: 'text-gray-500', bg: 'from-gray-400 to-gray-500' }
    if (safeTotalCalories < 500) return { status: 'Light 💪', color: 'text-green-500', bg: 'from-green-500 to-lime-500' }
    if (safeTotalCalories < 1000) return { status: 'Moderate ⚡', color: 'text-blue-500', bg: 'from-blue-500 to-cyan-500' }
    if (safeTotalCalories < 1500) return { status: 'Heavy ⚠️', color: 'text-yellow-500', bg: 'from-yellow-500 to-orange-500' }
    return { status: 'Very Heavy 🔥', color: 'text-red-500', bg: 'from-red-500 to-pink-500' }
  }

  const health = getHealthStatus()
  const avgCalories = safeCount > 0 ? Math.round(safeTotalCalories / safeCount) : 0

  return (
    <div className="space-y-4">
      {/* Main Summary Card */}
      <div className={`rounded-2xl shadow-xl p-8 ${
        darkMode 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white border border-pink-200'
      } transition-all`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Calories */}
          <div className="text-center">
            <p className={`text-sm font-semibold mb-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              TOTAL CALORIES
            </p>
            <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
              {safeTotalCalories.toLocaleString()}
            </p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              kcal
            </p>
          </div>

          {/* Total Entries */}
          <div className="text-center">
            <p className={`text-sm font-semibold mb-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              TOTAL ENTRIES
            </p>
            <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 mb-2">
              {safeCount}
            </p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              ice creams
            </p>
          </div>

          {/* Average Calories */}
          <div className="text-center">
            <p className={`text-sm font-semibold mb-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              AVERAGE CALORIES
            </p>
            <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500 mb-2">
              {avgCalories}
            </p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              per entry
            </p>
          </div>
        </div>

        {/* Daily Limit Progress */}
        <div className={`p-5 rounded-xl ${
          darkMode 
            ? 'bg-gray-700 border border-gray-600' 
            : 'bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300'
        }`}>
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className={`text-sm font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Daily Limit Progress
              </p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {safeTotalCalories} / {dailyCalorieLimit} kcal
              </p>
            </div>
            <span className={`text-lg font-bold ${health.color}`}>
              {health.status}
            </span>
          </div>
          <div className="w-full h-3 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-600">
            <div
              className={`h-full bg-gradient-to-r ${health.bg} transition-all duration-500 rounded-full`}
              style={{ width: `${caloriePercentage}%` }}
            />
          </div>
          <p className="text-xs mt-2 font-semibold text-center">
            {safeTotalCalories > dailyCalorieLimit 
              ? `⚠️ Over limit by ${safeTotalCalories - dailyCalorieLimit} kcal`
              : `✅ ${dailyCalorieLimit - safeTotalCalories} kcal remaining`
            }
          </p>
        </div>
      </div>

      {/* Stats Card */}
      {stats && stats.typeBreakdown && (
        <div className={`rounded-2xl shadow-xl p-6 ${
          darkMode 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-pink-200'
        }`}>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            📊 Type Breakdown
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg text-center ${
              darkMode 
                ? 'bg-gray-700 border border-gray-600' 
                : 'bg-orange-100 border border-orange-300'
            }`}>
              <p className="text-2xl mb-2">🍦</p>
              <p className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Cones</p>
              <p className="text-2xl font-bold text-orange-500">{stats.typeBreakdown.cone || 0}</p>
            </div>
            <div className={`p-4 rounded-lg text-center ${
              darkMode 
                ? 'bg-gray-700 border border-gray-600' 
                : 'bg-blue-100 border border-blue-300'
            }`}>
              <p className="text-2xl mb-2">🥣</p>
              <p className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Cups</p>
              <p className="text-2xl font-bold text-blue-500">{stats.typeBreakdown.cup || 0}</p>
            </div>
            <div className={`p-4 rounded-lg text-center ${
              darkMode 
                ? 'bg-gray-700 border border-gray-600' 
                : 'bg-pink-100 border border-pink-300'
            }`}>
              <p className="text-2xl mb-2">🍨</p>
              <p className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sundaes</p>
              <p className="text-2xl font-bold text-pink-500">{stats.typeBreakdown.sundae || 0}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Summary
