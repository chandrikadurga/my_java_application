import React from 'react'

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error?.message || 'Unexpected runtime error'
    }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Runtime UI error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-100">
          <div className="max-w-xl w-full rounded-2xl border border-rose-200 bg-white shadow-xl p-6">
            <h1 className="text-2xl font-bold text-rose-700 mb-2">Something went wrong</h1>
            <p className="text-gray-700 mb-3">
              The app hit a runtime error and stopped rendering. Please refresh the page.
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Error: {this.state.message}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-colors"
            >
              Reload App
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default AppErrorBoundary
