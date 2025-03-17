# Email Fetcher API

This is a simple API that fetches sender emails from send.borks.io. It's designed to be deployed on Deno Deploy.

## Local Development

1. Install Deno:
   - macOS/Linux: `curl -fsSL https://deno.land/x/install/install.sh | sh`
   - Windows: `iwr https://deno.land/x/install/install.ps1 -useb | iex`

2. Create a `.env` file in the root directory and add your API key:
```bash
BORKS_API_KEY=your_api_key_here
```

3. Run the development server:
```bash
deno task dev
```

## Deployment to Deno Deploy

### Option 1: Deploy via GitHub

1. Push your code to a GitHub repository.

2. Go to [Deno Deploy](https://dash.deno.com/) and create a new project.

3. Link your GitHub repository and select the `main.ts` file as the entry point.

4. Add your environment variable in the Deno Deploy dashboard:
   - Go to Project Settings > Environment Variables
   - Add `BORKS_API_KEY` with your API key

### Option 2: Deploy via CLI

1. Install Deployctl:
```bash
deno install --allow-read --allow-write --allow-env --allow-net --allow-run --no-check -r -f https://deno.land/x/deploy/deployctl.ts
```

2. Login to Deno Deploy:
```bash
deployctl login
```

3. Deploy the project:
```bash
deployctl deploy --project=your-project-name main.ts
```

## API Endpoints

- `GET /api`: Fetches all sender emails from send.borks.io

## Environment Variables

- `BORKS_API_KEY`: Your API key for send.borks.io 