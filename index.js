// File: api/integration/index.js

import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const SECRET_KEY = 'e2b74c5d-9140-4a4c-90f0-f64da4b3fd42';

// Actual destination API info
const DESTINATION_URL = 'https://cargomation.com:5200/redis/apinvoice/compare';
const AUTH_USERNAME = 'admin';
const AUTH_PASSWORD = 'u}M[6zzAU@w8YLx';


app.post('/compare', async (req, res) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || authHeader !== `Bearer ${SECRET_KEY}`) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  try {
//    const response = await axios.post(
//      DESTINATION_URL,
//      req.body,
//      {
//        auth: {
//          username: AUTH_USERNAME,
//          password: AUTH_PASSWORD
//        },
//        headers: {
////          'User-Agent': 'axios/0.27.2',
//          'Content-Type': 'application/json',
////          'Accept': 'application/json',
////          'Connection': 'keep-alive'
//        }
//      }
//    );

const basicAuth = Buffer.from(`${AUTH_USERNAME}:${AUTH_PASSWORD}`).toString('base64');

const response = await axios.post(
  DESTINATION_URL,
  req.body,
  {
  auth: {
             username: AUTH_USERNAME,
             password: AUTH_PASSWORD
           },
    headers: {
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Axios/1.0',
      'Accept': 'application/json'
    }
  }
);

//console.log('POST /compare hit');
    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Error forwarding request:', err.response?.data || err.message);
    return res.status(500).json({ message: 'Failed to forward request', error : err });
  }
});



app.post('/invoice', async (req, res) => {
  try {
    const webhookUrl = 'https://n8n.srv788488.hstgr.cloud/webhook/2a6287d0-9458-4421-8a13-56c0216f730f';

    const response = await axios.post(webhookUrl, req.body);

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Forwarding error:', err.message);
    res.status(500).json({ error: 'Forwarding  failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
