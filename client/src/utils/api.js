// Central API base URL utility
// In development (Vite proxy active), leave empty → relative /api/... calls go to localhost:5000
// In production (Railway), set VITE_API_URL to your Railway backend URL in the Railway dashboard
const API_BASE = import.meta.env.VITE_API_URL || '';

export default API_BASE;
