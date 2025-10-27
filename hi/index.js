// ✅ Fixed Decryption (Vercel compatible)
function decryptData(encrypted, key) {
  try {
    // Base64 decode
    const decoded = atob(encrypted);
    const decodedStr = decodeURIComponent(escape(decoded));
    
    // XOR decrypt
    let decrypted = '';
    for (let i = 0; i < decodedStr.length; i++) {
      decrypted += String.fromCharCode(decodedStr.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Decryption failed: ' + error.message);
  }
}

export default async function handler(req, res) {
  // CORS headers
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
    console.log('Received body:', req.body); // Debug
    
    const { payload } = req.body;

    if (!payload) {
      return res.status(400).json({ error: 'Invalid request - no payload' });
    }

    const secretKey = "MyS3cr3tK3y@2025!";
    
    // Decrypt
    const decryptedData = decryptData(payload, secretKey);
    console.log('Decrypted data:', decryptedData); // Debug
    
    const { visitorIp, userAgent, date, time, timeZone } = decryptedData;

    const telegramMessage = `🚀 New Visitor Alert 🚀
    
🌐 IP: ${visitorIp}
    
🖥️ User Agent: ${userAgent}
    
📅 Date: ${date}
    
🕒 Time: ${time} (${timeZone})
    
🔗 https://worm0x1.vercel.app`;

    const TELEGRAM_BOT_TOKEN = '6138795643:AAHyMhQwdqhnDLIG7w0vzkXcLLSPPsnhFR0';
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
    console.log('Telegram response:', result); // Debug

    if (response.ok) {
      return res.status(200).json({ success: true, telegram: result });
    } else {
      return res.status(500).json({ error: 'Telegram failed', details: result });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Server error', 
      message: error.message,
      stack: error.stack 
    });
  }
}