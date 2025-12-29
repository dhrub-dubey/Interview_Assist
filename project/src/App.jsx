import VoiceAssistant from './components/VoiceAssistant'
import './App.css'

function App() {
  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY
  const agentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID

  if (!apiKey || !agentId) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <div>
          <h1>Configuration Required</h1>
          <p>Please set your environment variables in the .env file:</p>
          {!apiKey && <p>- VITE_ELEVENLABS_API_KEY</p>}
          {!agentId && <p>- VITE_ELEVENLABS_AGENT_ID</p>}
          <p style={{ marginTop: '20px', fontSize: '14px', opacity: 0.9 }}>
            See README.md for setup instructions
          </p>
        </div>
      </div>
    )
  }

  return <VoiceAssistant apiKey={apiKey} agentId={agentId} />
}

export default App
