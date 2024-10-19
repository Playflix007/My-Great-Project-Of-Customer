import fs from 'fs';
import path from 'path';

const customers = require('../../data/customers.json');  // ग्राहकांची माहिती

export default function handler(req, res) {
  const { username, token } = req.query;

  // ग्राहक अस्तित्व तपासा आणि टोकन तपासा
  const customer = customers[username];

  if (!customer || customer.token !== token) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  // सर्व चॅनेल्स असलेली M3U फाइल वाचा
  const m3uFilePath = path.join(process.cwd(), 'data', 'playlist.m3u');
  const m3uData = fs.readFileSync(m3uFilePath, 'utf-8');

  // योग्य header सेट करा
  res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
  res.send(m3uData);  // सर्व चॅनेल्स असलेली प्लेलिस्ट
}
