
// Initialize AOS
AOS.init();

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Countdown Timer
function updateCountdown() {
    const expoDate = new Date('April 13, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const gap = expoDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    document.getElementById('days').innerText = textDay.toString().padStart(3, '0');
    document.getElementById('hours').innerText = textHour.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = textMinute.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = textSecond.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);

// Scroll Animation
gsap.registerPlugin(ScrollTrigger);

gsap.from('.countdown', {
    scrollTrigger: {
        trigger: '.countdown',
        start: 'top center',
        end: 'bottom center',
        scrub: 1
    },
    y: 100,
    opacity: 0
});

// Navbar Animation
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');

stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const increment = target / 200;
    
    function updateCount() {
        const count = +stat.innerText;
        if(count < target) {
            stat.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 10);
        } else {
            stat.innerText = target;
        }
    }
    
    ScrollTrigger.create({
        trigger: stat,
        onEnter: () => updateCount(),
        once: true
    });
});

// Opportunities Slider
const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-slide');
const nextBtn = document.querySelector('.next-slide');
let currentSlide = 0;

function updateSlider() {
    sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
});

// Auto slide
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}, 5000);

// Virtual Tour Scene Switching
const sceneBtns = document.querySelectorAll('.scene-btn');
const scenes = document.querySelectorAll('.scene');

sceneBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        sceneBtns.forEach(b => b.classList.remove('active'));
        scenes.forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        document.querySelector(`#${btn.dataset.scene}`).classList.add('active');
    });
});

// Contact Form Animation
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

    // Enhanced Chatbot with Google Cloud API
const API_KEY = 'AIzaSyAm2CBrcEaCVJhW7nlMfCTlDjsYJhCRWbM';
const chatbot = document.getElementById('chatbot');
const toggleChat = document.getElementById('toggleChat');
const minimizeChat = document.getElementById('minimizeChat');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendMessage = document.getElementById('sendMessage');

// Enhanced response system with API integration
async function getAIResponse(userMessage) {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {

                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    contents: [{
                      parts:[{text: userMessage}]
                      }]
            })
        });

        const data = await response.json();

        const responseMessage = data.candidates[0].content.parts[0].text;

        

        console.log(data);
        return responseMessage;
    } catch (error) {

        console.error('Error:', error);
        return getDefaultResponse(userMessage);
    }
}

// Fallback responses for offline functionality
function getDefaultResponse(input) {
    const responses = {
        'hello': 'Welcome to Zimbabwe Expo 2025! How can I enhance your experience today?',
        'vision': 'Zimbabwe\'s Vision 2030 showcases our path to an upper-middle-income economy through innovation and sustainable development.',
        'location': 'The Zimbabwe Pavilion will be a highlight at Osaka Expo 2025. Stay tuned for our exact location announcement!',
        'events': 'Get ready for an exciting lineup of cultural performances, business forums, and tech exhibitions at our pavilion.',
        'contact': 'Reach out to us at emmanuelisheanesu2004@gmail.com or +263 78 854 7017 for more information.',
        'culture': 'Experience the vibrant Zimbabwean culture through traditional dance, music, and art at our pavilion.',
        'business': 'Discover investment opportunities in mining, agriculture, tourism, and technology sectors.',
        'tourism': 'From Victoria Falls to Great Zimbabwe, learn about our world-renowned tourist destinations.',
        'default': 'Let me guide you through Zimbabwe\'s exciting journey at Expo 2025. What would you like to know more about?'
    };

    const lowercaseInput = input.toLowerCase();
    for (const [key, value] of Object.entries(responses)) {
        if (lowercaseInput.includes(key)) {
            return value;
        }
    }
    return responses.default;
}

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    messageDiv.innerHTML = `
        ${isUser ? '' : '<i class="fas fa-robot"></i>'}
        <p>${message}</p>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function handleUserMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = '';
        
        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing';
        typingDiv.innerHTML = '<i class="fas fa-robot"></i><p>Typing...</p>';
        chatMessages.appendChild(typingDiv);


        console.log(message);
        
        // Get AI response
        const response = await getAIResponse(message);
        chatMessages.removeChild(typingDiv);
        addMessage(response);
    }
}

sendMessage.addEventListener('click', handleUserMessage);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserMessage();
    }
});

minimizeChat.addEventListener('click', () => {
    chatbot.classList.toggle('minimized');
});

toggleChat.addEventListener('click', () => {
    chatbot.classList.remove('hidden');
    toggleChat.style.display = 'none';
});

// Initialize chatbot with welcome message
window.addEventListener('load', () => {
    addMessage('Welcome to Zimbabwe Expo 2025! I\'m here to help you explore our pavilion and answer any questions about Zimbabwe\'s participation in Expo 2025 Osaka.');
});
