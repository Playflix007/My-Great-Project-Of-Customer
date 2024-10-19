// pages/api/getPlaylist.js

import fs from 'fs';
import path from 'path';

// users.json फाइलचा पथ
const usersFilePath = path.join(process.cwd(), 'users.json');

// M3U playlist फाइलचा पथ
const playlistFilePath = path.join(process.cwd(), 'playlists', 'playlist.m3u');

export default async function handler(req, res) {
  const { username, token } = req.query;

  // users.json वाचा
  const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

  // ग्राहक शोधा
  const user = usersData.find(u => u.username === username && u.token === token);

  // ग्राहक सापडला का ते तपासा
  if (!user) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  // ग्राहक ब्लॉक केलेला असल्यास त्याला प्लेलिस्ट देऊ नका
  if (user.blocked) {
    return res.status(403).json({ error: 'Your account has been blocked' });
  }

  // M3U playlist फाइल वाचा
  const playlist = fs.readFileSync(playlistFilePath, 'utf8');

  // योग्य header सेट करा
  res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
  res.send(playlist); // M3U playlist 
}
