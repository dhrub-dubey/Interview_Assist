# Voice-First AI Application

A production-ready React frontend for voice-based conversational AI powered by ElevenLabs. This application enables hands-free, voice-only interactions using the official ElevenLabs React SDK.

## Features

- **Voice-First Interface**: No typing required - speak naturally and get spoken responses
- **ElevenLabs Integration**: Uses official ElevenLabs React SDK with Conversational AI Agents
- **Real-Time Status**: Visual indicators for connection state (idle, listening, speaking)
- **Modern UI**: Clean, responsive design with smooth animations
- **Backend Agnostic**: Easily integrates with any backend service
- **Error Handling**: Graceful handling of connection issues and errors

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- An ElevenLabs account with API access
- A configured ElevenLabs Conversational AI Agent

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
# Required: Get your API key from https://elevenlabs.io/app/settings/api-keys
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Required: Get your Agent ID from https://elevenlabs.io/app/conversational-ai
VITE_ELEVENLABS_AGENT_ID=your_agent_id_here

# Optional: Backend URL (defaults to http://localhost:3000)
VITE_BACKEND_URL=http://localhost:3000
```

### 3. Set Up ElevenLabs Agent

1. Go to [ElevenLabs Conversational AI](https://elevenlabs.io/app/conversational-ai)
2. Create a new Agent or use an existing one
3. Configure your agent's:
   - Voice (choose from available voices)
   - Language model
   - System prompt and behavior
   - Response settings
4. Copy the Agent ID and add it to your `.env` file

### 4. Start the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## How It Works

### ElevenLabs Integration

This application uses the ElevenLabs Conversational AI platform through their official React SDK:

- **useConversation Hook**: Manages the conversation state, connection, and audio streaming
- **Agent-Based Architecture**: Uses pre-configured ElevenLabs agents with custom voices and behaviors
- **Real-Time Voice Processing**: Handles speech capture, transcription, and response synthesis

### Voice Flow

1. User clicks "Start Talking"
2. Application connects to ElevenLabs using your Agent ID
3. Microphone access is requested and granted
4. User speaks naturally - ElevenLabs handles speech-to-text
5. Transcribed text is processed by the configured agent
6. Agent generates a response using its language model
7. Response is converted to speech and played back automatically
8. Conversation continues hands-free until user clicks "Stop"

### Backend Integration

The application is designed to be backend-agnostic:

- Backend communication is abstracted in `src/services/api.js`
- Default endpoint: `POST /agent` expects `{ message: string }`
- Expected response: `{ response: string }` or `{ message: string }`
- Optional health check: `GET /health`

To integrate with your backend:

1. Update `VITE_BACKEND_URL` in `.env`
2. Ensure your backend implements the expected endpoints
3. Modify `src/services/api.js` if you need different request/response formats

### Example Backend Integration

Your backend should handle requests like:

```javascript
// Request
POST /agent
Content-Type: application/json

{
  "message": "User's spoken message transcribed by ElevenLabs"
}

// Response
{
  "response": "AI-generated text response to be spoken by ElevenLabs"
}
```

## Project Structure

```
src/
├── App.jsx                         # Main app component
├── components/
│   └── VoiceAssistant.jsx         # Voice interface component
├── services/
│   └── api.js                     # Backend API abstraction layer
├── styles/
│   └── VoiceAssistant.css         # Component styles
└── main.jsx                        # App entry point
```

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Deployment

### Deploy to Netlify, Vercel, or similar:

1. Connect your repository
2. Set environment variables in the platform's dashboard:
   - `VITE_ELEVENLABS_API_KEY`
   - `VITE_ELEVENLABS_AGENT_ID`
   - `VITE_BACKEND_URL`
3. Build command: `npm run build`
4. Publish directory: `dist`

### Important Security Notes:

- Never commit your `.env` file to version control
- Use environment variables in your deployment platform
- Consider using separate API keys for development and production
- For production, ensure your backend implements proper authentication

## Customization

### Changing the UI Theme

Edit `src/styles/VoiceAssistant.css` to customize:
- Colors and gradients
- Button styles
- Status indicators
- Layout and spacing

### Modifying Conversation Behavior

The conversation behavior is controlled by your ElevenLabs Agent configuration:
1. Go to [ElevenLabs Dashboard](https://elevenlabs.io/app/conversational-ai)
2. Edit your agent's settings:
   - System prompt
   - Voice selection
   - Response style
   - Language model parameters

### Extending Backend Communication

To add more backend endpoints or modify the API:

1. Edit `src/services/api.js`
2. Add new functions for different endpoints
3. Update the VoiceAssistant component to use them

## Troubleshooting

### "Configuration Required" Error
- Ensure `.env` file exists and contains both required variables
- Restart the dev server after creating/modifying `.env`

### Microphone Access Denied
- Grant microphone permissions in your browser
- Check browser settings for microphone access
- Ensure you're using HTTPS in production (required for mic access)

### Connection Errors
- Verify your ElevenLabs API key is valid
- Check that your Agent ID is correct
- Ensure you have sufficient ElevenLabs API credits
- Check browser console for detailed error messages

### Backend Connection Issues
- Verify `VITE_BACKEND_URL` is correct
- Ensure backend service is running
- Check for CORS issues if backend is on different domain
- Review backend logs for errors

## ElevenLabs Resources

- [ElevenLabs Dashboard](https://elevenlabs.io/app)
- [API Keys Management](https://elevenlabs.io/app/settings/api-keys)
- [Conversational AI Agents](https://elevenlabs.io/app/conversational-ai)
- [ElevenLabs Documentation](https://elevenlabs.io/docs)
- [React SDK Documentation](https://github.com/elevenlabs/elevenlabs-react)

## Technology Stack

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **ElevenLabs React SDK**: Voice conversation management
- **Modern CSS**: Responsive styling with animations

## License

This project is provided as-is for demonstration and development purposes.

## Support

For issues related to:
- **This frontend**: Check the troubleshooting section above
- **ElevenLabs service**: Visit [ElevenLabs Support](https://elevenlabs.io/support)
- **Your backend**: Refer to your backend service documentation
