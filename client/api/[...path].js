const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'content-length',
  'expect',
  'host',
  'keep-alive',
  'origin',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
]);

function getBackendUrl() {
  return (
    process.env.RENDER_API_URL ||
    process.env.VITE_API_URL ||
    process.env.VITE_API_BASE_URL ||
    ''
  ).replace(/\/$/, '');
}

function getRequestBody(req) {
  if (req.method === 'GET' || req.method === 'HEAD') return undefined;
  if (req.body === undefined || req.body === null) return undefined;
  if (typeof req.body === 'string' || Buffer.isBuffer(req.body)) return req.body;
  return JSON.stringify(req.body);
}

function getProxyHeaders(req) {
  return Object.fromEntries(
    Object.entries(req.headers)
      .filter(([key]) => !HOP_BY_HOP_HEADERS.has(key.toLowerCase()))
      .map(([key, value]) => [key, Array.isArray(value) ? value.join(', ') : value])
  );
}

export default async function handler(req, res) {
  const backendUrl = getBackendUrl();

  if (!backendUrl) {
    return res.status(500).json({
      error: 'Backend URL is not configured. Set RENDER_API_URL in Vercel.',
    });
  }

  const path = Array.isArray(req.query.path) ? req.query.path.join('/') : req.query.path;
  const incomingUrl = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
  const targetUrl = `${backendUrl}/api/${path || ''}${incomingUrl.search}`;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: getProxyHeaders(req),
      body: getRequestBody(req),
    });

    res.status(response.status);

    response.headers.forEach((value, key) => {
      if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    });

    const responseBody = Buffer.from(await response.arrayBuffer());
    return res.send(responseBody);
  } catch (error) {
    console.error('API proxy error:', error);
    return res.status(502).json({ error: 'Failed to reach backend API' });
  }
}
