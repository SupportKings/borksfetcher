# Email Fetcher API

This is a simple API that fetches sender emails from send.borks.io. It's designed to be deployed on Vercel.

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

## Deployment to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy the project:
```bash
vercel
```

4. Add your environment variable in the Vercel dashboard:
   - Go to your project settings
   - Navigate to the "Environment Variables" tab
   - Add `BORKS_API_KEY` with your API key

## API Endpoints

- `GET /api`: Fetches all sender emails from send.borks.io

## Environment Variables

- `BORKS_API_KEY`: Your API key for send.borks.io
- `PORT`: (Optional) Port number for local development (defaults to 3000) 