import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { showNotification } from '../App'

function IceCreamForm({ onAddIceCream, loading, darkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'cone',
    scoops: 1
  })
  const [previewCalories, setPreviewCalories] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || '/api'

  // Calculate preview calories
  useEffect(() => {
    calculatePreview()
  }, [formData.type, formData.scoops])

  const calculatePreview = async () => {
    try {
      const response = await axios.post(`${API_URL}/calculate-calories`, {
        type: formData.type,
        scoops: parseInt(formData.scoops) || 1
      })
      setPreviewCalories(response.data.calories)
    } catch (error) {
      console.error('Error calculating calories:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Validation
    if (name === 'scoops') {
      const numValue = parseInt(value)
      if (numValue <= 0 || isNaN(numValue)) {
        return
      }
    }

    if (name === 'name' && value.trim().length > 50) {
      return
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim()) {
      showNotification('Please enter an ice cream name', 'error')
      return
    }

    if (parseInt(formData.scoops) <= 0) {
      showNotification('Scoops must be greater than 0', 'error')
      return
    }

    setIsSubmitting(true)
    await onAddIceCream({
      ...formData,
      scoops: parseInt(formData.scoops)
    })
    
    // Reset form
    setFormData({
      name: '',
      type: 'cone',
      scoops: 1
    })
    setPreviewCalories(0)
    setIsSubmitting(false)
  }

  const getTypeInfo = () => {
    const info = {
      cone: { icon: '🍦', color: 'from-orange-400 to-yellow-400' },
      cup: { icon: '🥣', color: 'from-blue-400 to-cyan-400' },
      sundae: { icon: '🍨', color: 'from-pink-400 to-red-400' }
    }
    return info[formData.type] || info.cone
  }

  const typeInfo = getTypeInfo()

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name Input */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold">Ice Cream Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Vanilla, Chocolate..."
          maxLength={50}
          className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-pink-500'
              : 'bg-white border-pink-200 text-gray-900 placeholder-gray-400 focus:border-pink-500'
          }`}
          disabled={isSubmitting}
        />
        <p className="text-xs text-gray-500">{formData.name.length}/50</p>
      </div>

      {/* Type Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white focus:border-pink-500'
              : 'bg-white border-pink-200 text-gray-900 focus:border-pink-500'
          }`}
          disabled={isSubmitting}
        >
          <option value="cone">🍦 Cone - 120 kcal/scoop + 50</option>
          <option value="cup">🥣 Cup - 100 kcal/scoop</option>
          <option value="sundae">🍨 Sundae - 110 kcal/scoop + 80</option>
        </select>
      </div>

      {/* Scoops Input */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold">Number of Scoops</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, scoops: Math.max(1, prev.scoops - 1) }))}
            className="px-3 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all font-bold text-lg"
            disabled={isSubmitting}
          >
            −
          </button>
          <input
            type="number"
            name="scoops"
            value={formData.scoops}
            onChange={handleChange}
            min="1"
            max="10"
            className={`flex-1 px-4 py-3 rounded-lg border-2 text-center font-bold transition-all focus:outline-none ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-white focus:border-pink-500'
                : 'bg-white border-pink-200 text-gray-900 focus:border-pink-500'
            }`}
            disabled={isSubmitting}
          />
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, scoops: Math.min(10, prev.scoops + 1) }))}
            className="px-3 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all font-bold text-lg"
            disabled={isSubmitting}
          >
            +
          </button>
        </div>
      </div>

      {/* Calorie Preview */}
      <div className={`p-4 rounded-xl ${
        darkMode
          ? 'bg-gray-700 border border-gray-600'
          : 'bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-300'
      }`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Estimated Calories:</span>
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            {previewCalories} kcal
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || loading}
        className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all transform hover:scale-105 flex items-center justify-center gap-2 ${
          isSubmitting || loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-lg'
        }`}
      >
        {isSubmitting ? (
          <>
            <span className="animate-spin">⏳</span>
            Adding...
          </>
        ) : (
          <>
            ✅ Add Ice Cream
          </>
        )}
      </button>
    </form>
  )
}

export default IceCreamForm
