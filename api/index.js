// ✅ Obfuscation-safe server code - সব critical functions আলাদা করা হয়েছে

// Secret key - obfuscator এটা rename করতে পারে না
const SECRET_KEY = "MyS3cr3tK3y@2026!UPtmagiPaylodU0PC1n7";

// ✅ Simple base64 decode যা obfuscation এ কাজ করে
function base64Decode(str) {
    // Buffer এর পরিবর্তে atob-style decoding
    if (typeof Buffer !== 'undefined') {
        return Buffer.from(str, 'base64').toString('binary');
    }
    // Fallback for obfuscated code
    return atob(str);
}

// ✅ XOR decryption - এটা obfuscation safe
function xorDecrypt(encrypted, key) {
    let result = '';
    for (let i = 0; i < encrypted.length; i++) {
        const encryptedChar = encrypted.charCodeAt(i);
        const keyChar = key.charCodeAt(i % key.length);
        result += String.fromCharCode(encryptedChar ^ keyChar);
    }
    return result;
}

// ✅ URI decode - obfuscation safe
function safeUriDecode(str) {
    try {
        // Try standard decoding
        let decoded = '';
        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            if (char === '%' && i + 2 < str.length) {
                const hex = str.substr(i + 1, 2);
                decoded += String.fromCharCode(parseInt(hex, 16));
                i += 2;
            } else {
                decoded += char;
            }
        }
        return decoded;
    } catch (e) {
        return str;
    }
}

// ✅ Main decryption function
function decryptData(encryptedBase64) {
    try {
        // Step 1: Base64 decode
        const base64Decoded = base64Decode(encryptedBase64);
        
        // Step 2: XOR decrypt
        const decrypted = xorDecrypt(base64Decoded, SECRET_KEY);
        
        // Step 3: Parse JSON
        const data = JSON.parse(decrypted);
        
        return data;
    } catch (error) {
        throw new Error('Decryption failed: ' + error.message);
    }
}

// ✅ Telegram sender - obfuscation safe
async function sendToTelegram(message) {
    const BOT_TOKEN = '8075489868:AAHZzQI9EO6gExTKCMqVpBPUuEjfTC0ZtqM';
    const CHAT_ID = '1641664147';
    const API_URL = 'https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage';
    
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message
        })
    });
    
    return response.ok;
}

// ✅ Main handler - Vercel serverless function
export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only POST allowed
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get encrypted data
        const heyman = req.body.heyman;
        
        if (!heyman) {
            return res.status(400).json({ error: 'Missing data' });
        }

        // Decrypt
        const data = decryptData(heyman);
        
        // Extract fields
        const ip = data.visitorIp || 'Unknown';
        const ua = data.userAgent || 'Unknown';
        const date = data.date || 'Unknown';
        const time = data.time || 'Unknown';
        const tz = data.timeZone || 'Unknown';
        const website = data.website || 'Unknown';  // ✅ https://example.com

        // Create message
        const message = '🚀 New Visitor Alert 🚀\n\n' +
            '🌐 IP: ' + ip + '\n\n' +
            '🖥️ User Agent: ' + ua + '\n\n' +
            '📅 Date: ' + date + '\n\n' +
            '🕒 Time: ' + time + ' (' + tz + ')\n\n' +
            '🔗 ' + website;  // ✅ https://example.com দেখাবে

        // Send to Telegram
        const sent = await sendToTelegram(message);

        if (sent) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(500).json({ error: 'Telegram send failed' });
        }
        
    } catch (error) {
        return res.status(500).json({ 
            error: 'Server error',
            message: error.message 
        });
    }
}