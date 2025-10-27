        let isExpanded = false;
        const bioText = "I am a Cyber Security researcher with expertise across various domains. With deep knowledge in AI and a passion for building innovative solutions, I thrive in creating meaningful impact through technology.";
        let typingInProgress = false;
        
        function typeWriter(text, element, speed = 50) {
            if (typingInProgress) return;
            typingInProgress = true;
            
            let i = 0;
            element.innerHTML = '';
            
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            element.appendChild(cursor);
            
            function type() {
                if (i < text.length) {
                    const textNode = document.createTextNode(text.charAt(i));
                    
                    // ✅ FIX: Check if cursor still exists and is a child before inserting
                    try {
                        if (cursor && cursor.parentNode === element) {
                            element.insertBefore(textNode, cursor);
                        } else {
                            // Fallback: just append if cursor is not available
                            element.appendChild(textNode);
                        }
                    } catch(e) {
                        // If insertBefore fails, use appendChild
                        element.appendChild(textNode);
                    }
                    
                    i++;
                    setTimeout(type, speed);
                } else {
                    setTimeout(() => {
                        // ✅ FIX: Safely remove cursor
                        try {
                            if (cursor && cursor.parentNode === element) {
                                cursor.remove();
                            }
                        } catch(e) {
                            // Ignore error if cursor already removed
                        }
                        typingInProgress = false;
                    }, 500);
                }
            }
            
            type();
        }
        
        function toggleProfile() {
            const container = document.querySelector('.container');
            const bioElement = document.getElementById('bioText');
            isExpanded = !isExpanded;
            
            if (isExpanded) {
                container.classList.add('expanded');
                setTimeout(() => {
                    typeWriter(bioText, bioElement, 30);
                }, 400);
            } else {
                container.classList.remove('expanded');
                container.scrollTop = 0;
                bioElement.innerHTML = '';
                typingInProgress = false;
            }
        }
        
        document.querySelector('.container').addEventListener('click', function(e) {
            if (!e.target.closest('.social-container')) {
                toggleProfile();
            }
        });

        function createInkSplatters() {
            const container = document.getElementById('inkSplatter');
            const count = 20;
            
            for (let i = 0; i < count; i++) {
                const splatter = document.createElement('div');
                splatter.classList.add('splatter');
                const size = Math.random() * 100 + 50;
                splatter.style.width = size + 'px';
                splatter.style.height = size + 'px';
                splatter.style.left = Math.random() * 100 + '%';
                splatter.style.top = Math.random() * 100 + '%';
                splatter.style.animationDelay = Math.random() * 20 + 's';
                splatter.style.animationDuration = (Math.random() * 10 + 15) + 's';
                container.appendChild(splatter);
            }
        }

        function createMangaLines() {
            const container = document.getElementById('mangaLines');
            const count = 15;
            
            for (let i = 0; i < count; i++) {
                const line = document.createElement('div');
                line.classList.add('speed-line');
                line.style.top = Math.random() * 100 + '%';
                line.style.left = Math.random() * 50 + '%';
                line.style.animationDelay = Math.random() * 3 + 's';
                line.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
                container.appendChild(line);
            }
        }

        window.addEventListener('load', function() {
            createInkSplatters();
            createMangaLines();
        });
        
        // ✅ Working Encryption Function
function encryptData(data, key) {
  const dataStr = JSON.stringify(data);
  let encrypted = '';
  
  // XOR encryption
  for (let i = 0; i < dataStr.length; i++) {
    const charCode = dataStr.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    encrypted += String.fromCharCode(charCode);
  }
  
  // Convert to hex (more reliable than base64 for binary data)
  let hex = '';
  for (let i = 0; i < encrypted.length; i++) {
    const hexChar = encrypted.charCodeAt(i).toString(16).padStart(2, '0');
    hex += hexChar;
  }
  
  return hex;
}

async function sendVisitorInfo() {
  try {
    console.log('Starting visitor info collection...');
    
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const ip = ipData.ip;
    
    const userAgent = navigator.userAgent;
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const visitorData = {
      visitorIp: ip,
      userAgent: userAgent,
      date: currentDate,
      time: currentTime,
      timeZone: timeZone,
    };

    const secretKey = "MyS3cr3tK3y@2025!";
    const encryptedData = encryptData(visitorData, secretKey);
    
    console.log('Encrypted payload:', encryptedData);

    const response = await fetch('https://worm0x1.vercel.app/hi/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload: encryptedData
      }),
    });
    
    console.log('Response status:', response.status);
    const result = await response.json();
    console.log('Response:', result);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

sendVisitorInfo();