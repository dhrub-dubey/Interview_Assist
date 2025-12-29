import { useState, useEffect } from 'react'
import { useConversation } from '@elevenlabs/react'
import '../styles/VoiceAssistant.css'

const VoiceAssistant = ({ apiKey, agentId }) => {
  const [statusMessage, setStatusMessage] = useState('Ready to start')
  const [error, setError] = useState(null)

  const conversation = useConversation({
    agentId,
    apiKey,
    branchId: 'agtbrch_3501kdm5se6geraaf2ex7kagga5y'
  })

  useEffect(() => {
    if (conversation.status === 'connected') {
      setStatusMessage('Connected - Listening')
    } else if (conversation.status === 'connecting') {
      setStatusMessage('Connecting...')
    } else if (conversation.status === 'disconnected') {
      setStatusMessage('Ready to start')
    }
  }, [conversation.status])

  const handleStartConversation = async () => {
    try {
      setError(null)
      setStatusMessage('Starting conversation...')
      await conversation.startSession()
      setStatusMessage('Connected - Ready to talk')
    } catch (err) {
      console.error('Failed to start conversation:', err)
      setError('Failed to start conversation. Please check your configuration.')
      setStatusMessage('Error')
    }
  }

  const handleStopConversation = async () => {
    try {
      await conversation.endSession()
      setStatusMessage('Conversation ended')
      setError(null)
    } catch (err) {
      console.error('Failed to stop conversation:', err)
      setError('Failed to stop conversation properly.')
    }
  }

  const getStatusColor = () => {
    switch (conversation.status) {
      case 'connected':
        return 'status-active'
      case 'connecting':
        return 'status-connecting'
      case 'disconnected':
        return 'status-idle'
      default:
        return 'status-idle'
    }
  }

  const getStatusText = () => {
    if (error) return 'Error'

    switch (conversation.status) {
      case 'connected':
        return conversation.isSpeaking ? 'Speaking' : 'Listening'
      case 'connecting':
        return 'Connecting'
      case 'disconnected':
        return 'Idle'
      default:
        return 'Idle'
    }
  }

  return (
    <div className="voice-assistant-container">
      <div className="voice-assistant-card">
        <div className="header">
          <h1>Voice Assistant</h1>
          <p className="subtitle">Powered by ElevenLabs</p>
        </div>

        <div className={`status-indicator ${getStatusColor()}`}>
          <div className="status-dot"></div>
          <span className="status-text">{getStatusText()}</span>
        </div>

        <div className="status-message">
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <p className="info-message">{statusMessage}</p>
          )}
        </div>

        <div className="controls">
          {conversation.status !== 'connected' ? (
            <button
              onClick={handleStartConversation}
              disabled={conversation.status === 'connecting'}
              className="btn btn-start"
            >
              {conversation.status === 'connecting' ? 'Connecting...' : 'Start Talking'}
            </button>
          ) : (
            <button
              onClick={handleStopConversation}
              className="btn btn-stop"
            >
              Stop Conversation
            </button>
          )}
        </div>

        <div className="info-panel">
          <h3>How to use:</h3>
          <ul>
            <li>Click "Start Talking" to begin the conversation</li>
            <li>Speak naturally - the assistant will listen and respond</li>
            <li>The conversation is hands-free and voice-only</li>
            <li>Click "Stop Conversation" when you're done</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default VoiceAssistant
