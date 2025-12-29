const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

export const sendMessageToBackend = async (message) => {
  try {
    const response = await fetch(`${API_BASE_URL}/agent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    return data.response || data.message || 'No response from backend'
  } catch (error) {
    console.error('Backend communication error:', error)
    throw new Error('Unable to connect to the backend. Please ensure the backend service is running.')
  }
}

export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
    })
    return response.ok
  } catch (error) {
    console.error('Backend health check failed:', error)
    return false
  }
}
