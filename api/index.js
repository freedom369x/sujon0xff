
export default async function(req, res) {
    try {
        // 1. Fetch Key (আপনার দেওয়া লিংক ঠিক রাখা হয়েছে)
        const r = await fetch("https://cdn.jsdelivr.net/gh/freedom369x/ytxhzjz-thumbel/danm1234hsfanbxuw.js");
        const d = await r.json();
        
        // Polyfill for atob/btoa in Node environment
        const _atob = (str) => (typeof atob === 'undefined' ? Buffer.from(str, 'base64').toString('binary') : atob(str));
        
        const remotePart = _atob(d.freedom0xff1);
        const localKey = "fmowxsbo99fmikb8501";
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