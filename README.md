# Email Fetcher API

This is a simple API that fetches sender emails from send.borks.io. It's designed to be deployed on Netlify.

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and add your API key:
```bash
BORKS_API_KEY=your_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. For Netlify local development:
```bash
npm run netlify-dev
```

## Deployment to Netlify

### Option 1: Deploy via Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize and deploy the project:
```bash
netlify init
netlify deploy --prod
```

### Option 2: Deploy via Netlify UI

1. Push your code to a GitHub repository.

2. Log in to Netlify and click "New site from Git".

3. Select your repository and configure the build settings:
   - Build command: Leave empty (no build command needed)
   - Publish directory: `public`

4. Add your environment variable in the Netlify dashboard:
   - Go to Site settings > Build & deploy > Environment
   - Add `BORKS_API_KEY` with your API key

## API Endpoints

- `GET /api`: Fetches all sender emails from send.borks.io

## Environment Variables

- `BORKS_API_KEY`: Your API key for send.borks.io
- `PORT`: (Optional) Port number for local development (defaults to 3000) 