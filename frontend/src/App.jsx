import React, { useState, useEffect } from 'react'
import axios from 'axios'
import IceCreamForm from './components/IceCreamForm'
import IceCreamList from './components/IceCreamList'
import Summary from './components/Summary'

// Global notification system
let notificationCallback = null

export const showNotification = (message, type = 'success') => {
  if (notificationCallback) {
    notificationCallback({ message, type })
  }
}

function App() {
  const [icecreams, setIcecreams] = useState([])
  const [totalCalories, setTotalCalories] = useState(0)
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState(null)
  const [stats, setStats] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || '/api'

  // Notification system
  notificationCallback = (notif) => {
    setNotification(notif)
    setTimeout(() => setNotification(null), 3000)
  }

  // Fetch all ice creams
  const fetchIceCreams = async () => {
    try {
      console.log('[ASYNC] Fetching all ice creams...')
      const response = await axios.get(`${API_URL}/icecream`)
      setIcecreams(response.data.data || [])
      fetchTotalCalories()
      fetchStats()
    } catch (error) {
      console.error('Error fetching ice creams:', error)
      showNotification('Failed to fetch ice creams', 'error')
    }
  }

  // Fetch total calories
  const fetchTotalCalories = async () => {
    try {
      const response = await axios.get(`${API_URL}/icecream-total`)
      setTotalCalories(response.data.totalCalories)
    } catch (error) {
      console.error('Error fetching total calories:', error)
    }
  }

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/stats`)
      setStats(response.data.stats)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  // Add ice cream
  const handleAddIceCream = async (data) => {
    try {
      setLoading(true)
      const response = await axios.post(`${API_URL}/icecream`, data)
      setIcecreams([...icecreams, response.data.data])
      setTotalCalories(totalCalories + response.data.data.calories)
      showNotification(`🍦 Added ${data.name} - ${response.data.data.calories} kcal`, 'success')
      fetchStats()
    } catch (error) {
      showNotification(error.response?.data?.error || 'Failed to add ice cream', 'error')
      console.error('Error adding ice cream:', error)
    } finally {
      setLoading(false)
    }
  }

  // Delete ice cream
  const handleDeleteIceCream = async (id) => {
    try {
      const icecream = icecreams.find(ic => ic.id === id)
      await axios.delete(`${API_URL}/icecream/${id}`)
      setIcecreams(icecreams.filter(ic => ic.id !== id))
      setTotalCalories(totalCalories - icecream.calories)
      showNotification(`${icecream.name} removed`, 'success')
      fetchStats()
    } catch (error) {
      showNotification('Failed to delete ice cream', 'error')
      console.error('Error deleting ice cream:', error)
    }
  }

  // Initial load
  useEffect(() => {
    fetchIceCreams()
    setLoading(false)
  }, [])

  // Sort ice creams by calories (highest first)
  const sortedIcecreams = [...icecreams].sort((a, b) => b.calories - a.calories)

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100'
    }`}>
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg animate-fade-in z-50 ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-4 left-4 p-2 rounded-full shadow-lg transition-all hover:scale-110 z-40 ${
          darkMode 
            ? 'bg-yellow-400 text-gray-900' 
            : 'bg-gray-800 text-yellow-400'
        }`}
        title="Toggle Dark Mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      {/* Main Container */}
      <div className={`min-h-screen py-8 px-4 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-pulse">
              🍦 IceCream Calorie Tracker
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Track your ice cream calories and stay healthy!
            </p>
          </header>

          {/* Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-1">
              <div className={`rounded-2xl shadow-2xl p-6 ${
                darkMode 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-white border border-pink-200'
              } sticky top-8 transition-all hover:shadow-xl`}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  ➕ New Entry
                </h2>
                <IceCreamForm onAddIceCream={handleAddIceCream} loading={loading} darkMode={darkMode} />
              </div>
            </div>

            {/* Right Column - List and Summary */}
            <div className="lg:col-span-2 space-y-8">
              {/* Summary */}
              <Summary 
                totalCalories={totalCalories} 
                count={icecreams.length}
                stats={stats}
                darkMode={darkMode}
              />

              {/* List */}
              <div className={`rounded-2xl shadow-2xl p-6 ${
                darkMode 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-white border border-pink-200'
              } transition-all`}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  📋 Your Entries
                </h2>
                <IceCreamList 
                  icecreams={sortedIcecreams}
                  onDelete={handleDeleteIceCream}
                  loading={loading}
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
