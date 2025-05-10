// File: api/integration/invoice.js

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const n8nWebhookUrl = 'https://n8n.srv788488.hstgr.cloud/webhook/2a6287d0-9458-4421-8a13-56c0216f730f';

    const response = await axios.post(n8nWebhookUrl, req.body);

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Forwarding error:', err.message);
    res.status(500).json({ error: 'Forwarding to n8n failed' });
  }
}
