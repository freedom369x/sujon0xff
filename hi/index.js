// ✅ Working Decryption Function
function decryptData(encryptedHex, key) {
  try {
    // Convert hex to string
    let encrypted = '';
    for (let i = 0; i < encryptedHex.length; i += 2) {
      const hexChar = encryptedHex.substr(i, 2);
      encrypted += String.fromCharCode(parseInt(hexChar, 16));
    }
    
    // XOR decryption
    let decrypted = '';
    for (let i = 0; i < encrypted.length; i++) {
      const charCode = encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      decrypted += String.fromCharCode(charCode);
    }
    
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Decryption failed: ' + error.message);
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Request body:', req.body);
    
    const { payload } = req.body;

    if (!payload) {
      return res.status(400).json({ error: 'No payload received' });
    }

    const secretKey = "MyS3cr3tK3y@2025!";
    
    console.log('Decrypting...');
    const decryptedData = decryptData(payload, secretKey);
    console.log('Decrypted data:', decryptedData);
    
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

    const result = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: 'Telegram failed', details: result });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Server error', 
      message: error.message 
    });
  }
}