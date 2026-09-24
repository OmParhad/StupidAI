# Stupid AI

Stupid AI is a playful chat application that turns normal questions into deliberately absurd, humorous answers. The project is split into a React frontend and a TypeScript/Express backend so provider credentials stay on the server.

## Architecture

```mermaid
flowchart LR
    User[User in browser]
    Frontend[React + Vite frontend\nfrontend/src]
    API[Express API\nbackend/src/server.ts]
    Chat[Chat route\nPOST /api/chat]
    Service[AI service\ngenerateStupidAnswer]
    Config[Provider config\nGROQ_API_KEY or OPENROUTER_API_KEY]
    Provider[Groq or OpenRouter API]

    User --> Frontend
    Frontend -->|POST /api/chat\nmessage| API
    API -->|CORS + JSON limit| Chat
    Chat -->|validate + rate limit| Service
    Service --> Config
    Config -->|server-side HTTPS request| Provider
    Provider -->|generated answer| Service
    Service --> Chat
    Chat -->|{ answer }| Frontend
    Frontend --> User
```

### Request flow

1. The browser loads the Vite-built React application.
2. The user submits a message from the chat interface.
3. The frontend sends the message to the backend at `${VITE_API_URL}/api/chat`.
4. Express accepts JSON requests, applies CORS rules, and limits request bodies to 10 KB.
5. The chat route validates that the message is a non-empty string of no more than 4,000 characters.
6. A rate limiter allows up to 10 chat requests per 15 minutes per client.
7. The AI service sends the prompt to the configured provider using a secret server-side API key.
8. The backend returns `{ "answer": "..." }` to the browser.

The API key is never sent to the frontend and must never be placed in a `VITE_*` variable.

## Project structure

```text
StupiedAI/
├── backend/
│   ├── src/
│   │   ├── config/groq.ts       # Provider configuration and model selection
│   │   ├── routes/chat.ts       # Chat validation and HTTP response handling
│   │   ├── services/stupiedAi.ts # AI prompt and provider request
│   │   └── server.ts            # Express app, CORS, health route, rate limit
│   ├── .env.example             # Safe environment template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.tsx              # Chat UI and API calls
│   │   └── Legal/               # About, disclaimer, and license views
│   └── package.json
├── .gitignore
└── README.md
```

## Requirements

- Node.js 20 or newer
- npm
- A Groq API key, or an OpenRouter API key if using that provider

## Local setup

Clone the repository and install dependencies separately for each application:

```powershell
git clone https://github.com/OmParhad/StupidGPT.git
cd StupidGPT

cd backend
npm install
Copy-Item .env.example .env

cd ..\frontend
npm install
```

Open `backend/.env` and replace the placeholder API key. Keep this file local and never commit it.

### Start the backend

```powershell
cd backend
npm run dev
```

The backend runs at `http://localhost:5000` by default.

### Start the frontend

In a second terminal:

```powershell
cd frontend
npm run dev
```

The frontend runs at the Vite development URL, normally `http://localhost:5173`.

The frontend uses `http://localhost:5000` by default. To use another backend URL, create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

## Environment variables

Backend variables belong in `backend/.env`:

| Variable | Required | Description |
| --- | --- | --- |
| `AI_PROVIDER` | No | `groq` by default; set to `openrouter` to use OpenRouter |
| `GROQ_API_KEY` | For Groq | Secret Groq API key |
| `GROQ_MODEL` | No | Groq model, default `openai/gpt-oss-20b` |
| `OPENROUTER_API_KEY` | For OpenRouter | Secret OpenRouter API key |
| `OPENROUTER_MODEL` | No | OpenRouter model name |
| `OPENROUTER_SITE_URL` | No | Site URL sent as OpenRouter metadata |
| `PORT` | No | Backend port, default `5000` |
| `FRONTEND_ORIGIN` | No | Comma-separated allowed frontend origins |

The frontend only needs the public backend URL:

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Backend base URL; defaults to `http://localhost:5000` |

Vite exposes `VITE_*` variables to the browser. Never put provider keys in them.

## API reference

### `GET /`

Returns a basic service welcome response.

### `GET /api/health`

Returns a lightweight health response:

```json
{
  "status": "alive",
  "message": "Stupid AI is thinking incorrectly."
}
```

### `POST /api/chat`

Request:

```json
{
  "message": "Why is the sky blue?"
}
```

Successful response:

```json
{
  "answer": "Because the sky failed its RGB calibration test."
}
```

Validation rules:

- `message` must be a string.
- Whitespace-only messages are rejected.
- Messages longer than 4,000 characters are rejected.
- Chat requests are limited to 10 per 15-minute window per client.

## Production checks

Run the available checks before deploying:

```powershell
cd backend
npm run typecheck
npm run build

cd ..\frontend
npm run lint
npm run build
```

To run the compiled backend:

```powershell
cd backend
npm start
```

The production frontend output is generated in `frontend/dist` and can be served by a static hosting provider.

## Security and GitHub push protection

- `backend/.env` and `frontend/.env` are ignored by Git.
- `backend/.env.example` contains placeholders only and is safe to commit.
- Provider API keys must remain in backend environment variables.
- If a key has ever been committed, revoke it and create a replacement before pushing.
- If GitHub blocks a push because of a secret, remove the secret from Git history instead of allowing the secret through push protection.
- Dependencies and build output should not be committed.

After cleaning a previously tracked environment file, verify the staged file list before pushing:

```powershell
git diff --cached --name-only | Select-String -Pattern '(^|/)(\.env$|node_modules/|dist/)'
```

That command should produce no output.

## License

See the license information in the frontend application under `frontend/src/Legal/Licenses.tsx`.
