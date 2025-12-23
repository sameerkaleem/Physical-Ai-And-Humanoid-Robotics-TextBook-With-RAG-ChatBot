<img src="TextBook-With-RAG-ChatBot.png" alt="" width="800">

# Physical AI and Humanoid Robotics Textbook with RAG Chatbot

This is a comprehensive textbook on Physical AI and Humanoid Robotics featuring an integrated RAG (Retrieval Augmented Generation) chatbot for enhanced learning.

## Features

- Interactive textbook on Physical AI and Humanoid Robotics
- Integrated AI chatbot that can answer questions about the textbook content
- Context-aware responses based on selected text
- Modern, responsive design using Docusaurus
 
<img src="TextBook-With-Urdu-Translation.png" alt="" width="800">

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static content hosting service.

## Deploying to Vercel

### Prerequisites

1. Install the Vercel CLI globally:
   ```bash
   npm i -g vercel
   ```

2. Log in to your Vercel account:
   ```bash
   vercel login
   ```

### Deployment Steps

1. From your project directory, run:
   ```bash
   vercel
   ```

2. Follow the prompts to connect your GitHub/GitLab account if prompted

3. Choose your project settings:
   - Framework: `Other Static Generator` (or let Vercel auto-detect)
   - Output directory: `build`
   - Build command: `npm run build`

4. Deploy to production:
   ```bash
   vercel --prod
   ```

Alternatively, you can connect your GitHub repository directly to Vercel for automatic deployments on push.

## Chatbot Integration

The textbook features an AI-powered chatbot that uses RAG (Retrieval Augmented Generation) technology to provide contextual answers about the textbook content. The chatbot connects to our backend API at https://rag-chatbot-backend-production-601a.up.railway.app/api/chat.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## License

This project is licensed under the MIT License.
