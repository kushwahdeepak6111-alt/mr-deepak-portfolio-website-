export interface HandlerEvent {
  path: string;
  httpMethod: string;
  headers: Record<string, string | undefined>;
  queryStringParameters?: Record<string, string | undefined>;
  body?: string | null;
  isBase64Encoded?: boolean;
}

export interface HandlerResponse {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
}

export type Handler = (event: HandlerEvent, context?: any) => Promise<HandlerResponse>;

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: '',
    };
  }

  const path = event.path.replace(/\/\.netlify\/functions\/api/, '').replace(/^\/api/, '');

  if (path === '/health' || path === '' || path === '/') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: 'Netlify Edge Serverless',
        service: 'Mr Deepak Studio API',
      }),
    };
  }

  if (path === '/contact' && event.httpMethod === 'POST') {
    try {
      const data = event.body ? JSON.parse(event.body) : {};

      // Anti-spam honeypot
      if (data.honeypot && String(data.honeypot).trim().length > 0) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, leadId: 'drop-' + Date.now() }),
        };
      }

      if (!data.name || !data.email || !data.message) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Missing required inquiry parameters.' }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          leadId: 'lead-' + Date.now().toString(36),
          message: 'Inquiry securely processed at Netlify Edge.',
        }),
      };
    } catch {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Malformed JSON payload.' }),
      };
    }
  }

  return {
    statusCode: 404,
    headers,
    body: JSON.stringify({ error: 'Endpoint not found.' }),
  };
};
