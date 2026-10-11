import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory rate limiting map for basic abuse prevention
const rateLimitMap = new Map<string, number[]>();

function rateLimiter(req: Request, res: Response, next: () => void) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10;

  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter(t => now - t < windowMs);

  if (recent.length >= maxRequests) {
    res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
    return;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  next();
}

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Mr Deepak Studio API',
  });
});

// Secure contact submission route
app.post('/api/contact', rateLimiter, (req: Request, res: Response) => {
  const { name, email, message, honeypot } = req.body;

  // Anti-spam honeypot
  if (honeypot && String(honeypot).trim().length > 0) {
    res.json({ success: true, id: 'ack-' + Date.now() });
    return;
  }

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Name, email, and message are required.' });
    return;
  }

  console.info(`[Mr Deepak Studio API] Inbound lead received from ${name} (${email})`);

  res.status(200).json({
    success: true,
    message: 'Inquiry received securely. Mr Deepak will respond within 24 hours.',
    leadId: 'lead-' + Date.now().toString(36),
  });
});

// Serve static frontend assets in production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Start listener when run directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Mr Deepak Studio] Server active on port ${PORT}`);
  });
}

export default app;
