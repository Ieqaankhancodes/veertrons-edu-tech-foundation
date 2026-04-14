// Central API base URL utility
// In development (Vite proxy), this is empty → relative URLs like /api/...
// In production (Vercel), this is the Render backend URL set via VITE_API_URL env var
const API_BASE = import.meta.env.VITE_API_URL || '';

export default API_BASE;
