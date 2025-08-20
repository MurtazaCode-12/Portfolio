// script.js

// --- Interactive Background Canvas ---
const canvas = document.getElementById('canvas-background');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray;
const mouse = { x: null, y: null, radius: (canvas.height / 120) * (canvas.width / 120) };
window.addEventListener('mousemove', (event) => { mouse.x = event.x; mouse.y = event.y; });
class Particle {
    constructor(x, y, directionX, directionY, size, color) { this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size; this.color = color; }
    draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = 'rgba(0, 170, 255, 0.3)'; ctx.fill(); }
    update() { if (this.x > canvas.width || this.x < 0) { this.directionX = -this.directionX; } if (this.y > canvas.height || this.y < 0) { this.directionY = -this.directionY; } let dx = mouse.x - this.x; let dy = mouse.y - this.y; let distance = Math.sqrt(dx * dx + dy * dy); if (distance < mouse.radius + this.size) { if (mouse.x < this.x && this.x < canvas.width - this.size * 10) { this.x += 5; } if (mouse.x > this.x && this.x > this.size * 10) { this.x -= 5; } if (mouse.y < this.y && this.y < canvas.height - this.size * 10) { this.y += 5; } if (mouse.y > this.y && this.y > this.size * 10) { this.y -= 5; } } this.x += this.directionX; this.y += this.directionY; this.draw(); }
}
function init() { particlesArray = []; let numberOfParticles = (canvas.height * canvas.width) / 9000; for (let i = 0; i < numberOfParticles; i++) { let size = (Math.random() * 2) + 1; let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2); let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2); let directionX = (Math.random() * 0.4) - 0.2; let directionY = (Math.random() * 0.4) - 0.2; particlesArray.push(new Particle(x, y, directionX, directionY, size, '')); } }
function animate() { requestAnimationFrame(animate); ctx.clearRect(0, 0, innerWidth, innerHeight); for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); } }
window.addEventListener('resize', () => { canvas.width = innerWidth; canvas.height = innerHeight; mouse.radius = (canvas.height / 120) * (canvas.width / 120); init(); });
window.addEventListener('mouseout', () => { mouse.x = undefined; mouse.y = undefined; });
init(); animate();

// --- Typing Effect for Hero Section ---
const nameText = "Murtaza Sojitrawala";
const titleText = "Generative AI Specialist | IT Innovator | Process Automation Expert";
const nameEl = document.getElementById('main-name');
const titleEl = document.getElementById('main-title');
function typeWriter(element, text, speed, callback) { let i = 0; element.innerHTML = ''; const cursor = document.createElement('span'); cursor.className = 'typing-cursor'; element.appendChild(cursor); function type() { if (i < text.length) { element.insertBefore(document.createTextNode(text.charAt(i)), cursor); i++; setTimeout(type, speed); } else { cursor.style.display = 'none'; if (callback) callback(); } } type(); }
document.addEventListener('DOMContentLoaded', () => { typeWriter(nameEl, nameText, 100, () => { setTimeout(() => { typeWriter(titleEl, titleText, 50); }, 500); }); });

// --- Scroll Reveal Animations ---
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => { const windowHeight = window.innerHeight; revealElements.forEach(el => { const elementTop = el.getBoundingClientRect().top; if (elementTop < windowHeight - 100) { el.classList.add('active'); } }); };
window.addEventListener('scroll', revealOnScroll); revealOnScroll();

// --- Phone Modal Logic ---
const phoneModal = document.getElementById('phoneModal');
const phoneModalContent = phoneModal.querySelector('.glass-card');
function showPhoneModal() { phoneModal.classList.remove('hidden'); setTimeout(() => { phoneModal.classList.add('opacity-100'); phoneModalContent.classList.add('scale-100'); }, 10); }
function hidePhoneModal() { phoneModal.classList.remove('opacity-100'); phoneModalContent.classList.remove('scale-100'); setTimeout(() => { phoneModal.classList.add('hidden'); }, 300); }
function copyPhoneNumber() { const phoneNumber = document.getElementById('phoneNumber').innerText; const feedback = document.getElementById('copy-feedback'); const tempTextArea = document.createElement('textarea'); tempTextArea.value = phoneNumber; document.body.appendChild(tempTextArea); tempTextArea.select(); try { document.execCommand('copy'); feedback.textContent = 'Copied!'; } catch (err) { feedback.textContent = 'Failed to copy!'; } document.body.removeChild(tempTextArea); setTimeout(() => { feedback.textContent = ''; }, 2000); }
phoneModal.addEventListener('click', (event) => { if (event.target === phoneModal) { hidePhoneModal(); } });

// --- AI Chatbot Logic ---
const chatButton = document.getElementById('ai-chat-button');
const chatModal = document.getElementById('chatModal');
const chatModalContent = chatModal.querySelector('.glass-card');
const closeChatButton = document.getElementById('closeChatModal');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const loadingIndicator = document.getElementById('loading-indicator');

function showChatModal() { chatModal.classList.remove('hidden'); setTimeout(() => { chatModal.classList.add('opacity-100'); chatModalContent.classList.add('scale-100'); }, 10); }
function hideChatModal() { chatModal.classList.remove('opacity-100'); chatModalContent.classList.remove('scale-100'); setTimeout(() => { chatModal.classList.add('hidden'); }, 300); }

chatButton.addEventListener('click', showChatModal);
closeChatButton.addEventListener('click', hideChatModal);
chatModal.addEventListener('click', (event) => { if (event.target === chatModal) { hideChatModal(); } });

// Function to add a message to the chat window
function addMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender, 'p-3', 'rounded-lg', 'w-fit');
    messageElement.textContent = text;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to bottom
}

// Handle chat form submission
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userInput = chatInput.value.trim();
    if (!userInput) return;

    addMessage('user', userInput);
    chatInput.value = '';
    loadingIndicator.classList.remove('hidden');

    try {
        const aiResponse = await getAiResponse(userInput);
        addMessage('ai', aiResponse);
    } catch (error) {
        addMessage('ai', 'Sorry, I encountered an error. Please try again.');
        console.error("Error fetching AI response:", error);
    } finally {
        loadingIndicator.classList.add('hidden');
    }
});

// --- Gemini API Integration ---
async function getAiResponse(prompt) {
    // NOTE: In a real-world project, avoid exposing your API key directly in the client-side code.
    const apiKey = "AIzaSyCRpXnjhtotpfSOa7uVSFKZ3HBcwK8pzxc";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    // Provide context from the resume for better answers
    const resumeContext = `
        You are Murtaza Sojitrawala's AI Twin, a helpful AI assistant integrated into his portfolio website. 
        Your goal is to answer questions from visitors about Murtaza based on the following information. 
        Be friendly, professional, and concise. Do not make up information. If you don't know the answer, say that you don't have information on that topic.

        **Murtaza's Resume:**
        - Name: Murtaza Sojitrawala
        - Location: Pune, Maharashtra, India
        - Summary: Adaptable IT professional specializing in Generative AI, process automation, and IT infrastructure. Automated workflows for an 80% productivity increase.
        - Experience:
          1. NSTARIZ EDTECH (Oct 2023 - Present): IT Infrastructure Manager & Content Developer. Automated processes, managed IT infra with 99% uptime, developed educational scripts. Won "Best Contributor of the Year".
          2. SAIFEE COMPUTER SOLUTIONS (Aug 2022 - Sept 2023): IT Engineer. Installed CCTV, resolved network/software issues, repaired systems.
        - Technical Skills:
          - GenAI: ChatGPT, Gemini, MidJourney, Kling, Claude, DALL·E, etc.
          - Programming: Python, C, Web Dev (HTML, CSS, JS), SQL.
          - Automation: Workflow Optimization, Process Automation.
          - IT Infra: Office 365, Hardware/Software Troubleshooting, CCTV.
        - Education: Bachelor of Business Administration (Computer Applications) from Sinhgad College, expected 2026.
        - Certifications: Generative AI from UpGrad & Microsoft.
    `;
    
    let chatHistory = [{ role: "user", parts: [{ text: resumeContext + "\n\nVisitor's Question: " + prompt }] }];
    const payload = { contents: chatHistory };

    let retries = 3;
    let delay = 1000;
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                return result.candidates[0].content.parts[0].text;
            } else {
                // Handle cases of blocked content or unexpected response structure
                const blockReason = result.candidates?.[0]?.finishReason;
                if (blockReason === 'SAFETY') {
                    return "I am unable to answer this question due to safety filters.";
                }
                return "I received an unusual response. Please try rephrasing your question.";
            }
        } catch (error) {
            console.error(`Attempt ${i + 1} failed. Retrying in ${delay}ms...`, error);
            if (i < retries - 1) {
                await new Promise(res => setTimeout(res, delay));
                delay *= 2; // Exponential backoff
            } else {
                throw error; // Rethrow error after last retry
            }
        }
    }
}