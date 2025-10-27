// Simple XOR Decryption function
function decryptData(encrypted, key) {
  try {
    const decoded = Buffer.from(encrypted, 'base64').toString('binary');
    let decrypted = '';
    for (let i = 0; i < decoded.length; i++) {
      decrypted += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return JSON.parse(decrypted);
  } catch (error) {
    throw new Error('Decryption failed');
  }
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // শুধুমাত্র POST allow করুন
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { heyman } = req.body;

    if (!heyman) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    // ✅ Secret key (client এর সাথে same)
    const secretKey = "MyS3cr3tK3y@2025!";
    
    // Data decrypt করুন
    const decryptedData = decryptData(heyman, secretKey);
    
    const { visitorIp, userAgent, date, time, timeZone } = decryptedData;

    const telegramMessage = `🚀 New Visitor Alert 🚀
    
🌐 IP: ${visitorIp}
    
🖥️ User Agent: ${userAgent}
    
📅 Date: ${date}
    
🕒 Time: ${time} (${timeZone})
    
🔗 https://worm0x1.vercel.app`;

    const TELEGRAM_BOT_TOKEN = '8075489868:AAGVGBDkpRAFMcaaziedFFMTE9ObxTzOEuU';
    const TELEGRAM_CHAT_ID = '1641664147';

    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
      }),
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: 'Failed to send message' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}