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
    const { visitorIp, userAgent, date, time, timeZone } = req.body;

    const telegramMessage = `🚀 New Visitor Alert 🚀
    
🌐 IP: ${visitorIp}
    
🖥️ User Agent: ${userAgent}
    
📅 Date: ${date}
    
🕒 Time: ${time} (${timeZone})
    
🔗 https://worm0x1.vercel.app`;

    const TELEGRAM_BOT_TOKEN = '7712427129:AAFXrzQ6jwFR0TmhSkD4uy4vRgvXXhYQi6Q';
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
