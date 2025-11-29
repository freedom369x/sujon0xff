
export default async function(req, res) {
    try {
        // 1. Fetch Key (আপনার দেওয়া লিংক ঠিক রাখা হয়েছে)
        const r = await fetch("https://cdn.jsdelivr.net/gh/freedom369x/ytxhzjz-thumbel/danm1234hsfanbxuw.js");
        const d = await r.json();
        
        // Polyfill for atob/btoa in Node environment
        const _atob = (str) => (typeof atob === 'undefined' ? Buffer.from(str, 'base64').toString('binary') : atob(str));
        
        const remotePart = _atob(d.freedom0xff1);
        const localKey = "7pvzzesp983mika92dr";
        const p = "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";
        
        // Decryption Process
        const binary = _atob(p);
        const len = binary.length;
        const data = new Uint8Array(len);
        for(let i=0; i<len; i++) data[i] = binary.charCodeAt(i);
        
        const keyBytes = new TextEncoder().encode(localKey);
        const kLen = keyBytes.length;
        const s = new Uint8Array(256);
        const resArr = new Uint8Array(len);
        
        let j=0, x;
        for(let i=0; i<256; i++) s[i]=i;
        for(let i=0; i<256; i++) {
            j = (j + s[i] + keyBytes[i%kLen]) & 255;
            x=s[i]; s[i]=s[j]; s[j]=x;
        }
        
        let i=0; j=0;
        for(let y=0; y<len; y++) {
            i = (i+1) & 255;
            j = (j+s[i]) & 255;
            x=s[i]; s[i]=s[j]; s[j]=x;
            resArr[y] = data[y] ^ s[(s[i]+s[j]) & 255];
        }
        
        const decryptedCode = new TextDecoder().decode(resArr);

        // --- Execution Logic (Vercel Fix) ---
        // আমরা চেক করব কোডটি সার্ভারে রান হচ্ছে কিনা।
        // 'export default' কে আমরা একটি লোকাল ভেরিয়েবলে কনভার্ট করব যাতে eval এর মাধ্যমে রান করা যায়।
        
        let runnableCode = decryptedCode;
        
        // যদি কোডে "export default" থাকে (যেমন index1.js এ আছে), আমরা সেটাকে রিপ্লেস করব
        if (runnableCode.includes('export default')) {
            runnableCode = runnableCode.replace(/export\s+default\s+(async\s+)?function\s*(\w+)?/, 'const __internalHandler =AsyncFunction');
            runnableCode = runnableCode.replace(/export\s+default/, 'const __internalHandler ='); 
        }

        // Run in current scope using eval to access req, res
        // কিন্তু scope issue এড়াতে আমরা নতুন ফাংশন বডি তৈরি করব না, সরাসরি eval করব।
        
        // Vercel এর জন্য handler execute করা:
        // আমরা decrypted code এ "export default function handler" কে "global.myHandler = function handler" এ কনভার্ট করি
        
        const finalExec = decryptedCode.replace(/export\s+default/, 'global.__secretHandler =');
        
        // কোড রান করা
        eval(finalExec);
        
        // হ্যান্ডলার কল করা
        if (global.__secretHandler) {
            return await global.__secretHandler(req, res);
        } else {
            // যদি সাধারণ স্ক্রিপ্ট হয়
             return { message: "Script executed, but no handler returned." };
        }

    } catch (e) {
        console.error("Decryption/Execution failed:", e);
        if(res && res.status) {
            return res.status(500).json({ error: 'Encryption Runtime Error', details: e.message });
        }
    }
}