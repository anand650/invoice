// File: api/integration/index.js

import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/invoice', async (req, res) => {
  try {
    const n8nWebhookUrl = 'https://n8n.srv788488.hstgr.cloud/webhook/2a6287d0-9458-4421-8a13-56c0216f730f';

    const response = await axios.post(n8nWebhookUrl, req.body);

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Forwarding error:', err.message);
    res.status(500).json({ error: 'Forwarding to n8n failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
