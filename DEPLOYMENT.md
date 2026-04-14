# Deployment Notes

The donation form calls `POST /api/donations`. In local development, Vite proxies `/api` to the Express backend on `http://localhost:5000`. In production, Vercel only serves the frontend unless the backend is deployed separately and the frontend is told where to find it.

## Backend

Deploy the `server` folder to a Node host such as Render, Railway, or another VPS.

Set these environment variables on the backend host:

```env
JWT_SECRET=use_a_strong_random_secret
CORS_ORIGIN=https://veertrons-edu-tech-foundation.vercel.app
```

After deployment, confirm this URL works in the browser:

```text
https://your-backend-url/api/health
```

## Frontend

In the Vercel project for the frontend, add this environment variable:

```env
RENDER_API_URL=https://your-render-backend-url.onrender.com
```

Use the public Render service URL, not the Render dashboard URL. The URL usually looks like `https://your-service-name.onrender.com`.

Redeploy the frontend after adding it. Vercel only applies environment variable changes to new deployments.

The `client/vercel.json` file keeps React Router pages such as `/donate` working on hard refresh. The `client/api/[...path].js` file proxies Vercel `/api/*` requests to Render. The donation form can keep posting to:

```text
/api/donations
```

If you prefer to bypass the Vercel API proxy and call Render directly from the browser, use this instead:

```env
VITE_API_URL=https://your-render-backend-url.onrender.com
```

With browser-direct calls, Render must allow the Vercel frontend origin through `CORS_ORIGIN`.

You can also hard-code a Vercel rewrite to Render instead of using `client/api/[...path].js`:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-backend-url/api/:path*"
    },
    {
      "source": "/((?!api/.*).*)",
      "destination": "/index.html"
    }
  ]
}
```
