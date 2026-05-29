document.addEventListener("DOMContentLoaded", async function () {
  // ===== State & Configuration =====
  const state = {
    isOpen: false,
    hasWelcomed: false,
    kb: null, // Knowledge base loaded from kb.json
    sarvamConfig: {
      endpoint: "https://api.sarvam.ai/chat/completions",
      apiKey: "" // Configure API key here for live Sarvam AI
    }
  };

  // ===== Load Knowledge Base =====
  try {
    const response = await fetch("assets/js/kb.json");
    if (response.ok) {
      state.kb = await response.json();
      console.log("Zoe AI Knowledge Base Loaded Successfully");
    } else {
      console.error("Failed to load Knowledge Base");
    }
  } catch (error) {
    console.error("Error loading Knowledge Base:", error);
  }

  // ===== Inject Chatbot UI =====
  const chatbotContainer = document.createElement('div');
  chatbotContainer.innerHTML = `
    <!-- Chatbot Toggle Button -->
    <button id="chatbot-toggle-btn" class="chatbot-toggle-btn" aria-label="Open chat assistant">
      <div class="pulse-ring"></div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 26px; height: 26px;">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z" />
      </svg>
      <span class="chatbot-tooltip">Chat with Zoe</span>
    </button>

    <!-- Chatbot Widget Window -->
    <div id="chatbot-widget" class="chatbot-widget">
      <!-- Header -->
      <div class="chatbot-header">
        <div class="chatbot-header-info">
          <div class="chatbot-avatar">Z</div>
          <div class="chatbot-header-text">
            <h4>Zoe Assistant</h4>
            <span>Online</span>
          </div>
        </div>
        <button id="chatbot-close-btn" class="chatbot-close-btn" aria-label="Close chat window">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width: 20px; height: 20px;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- AI Branding Strip -->
      <div class="chatbot-ai-strip">
        <div class="chatbot-ai-strip__dot"></div>
        <div class="chatbot-ai-strip__text">Powered by Sarvam AI Engine</div>
      </div>

      <!-- Chat Body -->
      <div id="chatbot-body" class="chatbot-body">
      </div>

      <!-- Input Area -->
      <div class="chatbot-input-area">
        <input type="text" id="chatbot-input" placeholder="Type a message..." aria-label="Chat message input">
        <button id="chatbot-send-btn" class="chatbot-send-btn" aria-label="Send message">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width: 18px; height: 18px;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(chatbotContainer);

  const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
  const chatbotWidget = document.getElementById('chatbot-widget');
  const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
  const chatbotBody = document.getElementById('chatbot-body');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSendBtn = document.getElementById('chatbot-send-btn');

  // ===== UI Interactions =====
  chatbotToggleBtn.addEventListener('click', () => {
    state.isOpen = !state.isOpen;
    chatbotWidget.classList.toggle('chatbot-widget--open', state.isOpen);
    if (state.isOpen) {
      setTimeout(() => chatbotInput.focus(), 300);
      
      // Dynamic welcome message on first open
      if (!state.hasWelcomed) {
        state.hasWelcomed = true;
        const typingDiv = showTyping();
        setTimeout(() => {
          removeTyping(typingDiv);
          const msgDiv = document.createElement('div');
          msgDiv.className = 'chat-message bot';
          msgDiv.innerHTML = `
            <span class="chat-sender">Zoe AI</span>
            <div class="chat-bubble">
              Hi there! 👋 I am Zoe's Virtual Assistant. How can I help you today?
            </div>
            <div class="chat-actions">
              <button class="chat-action-btn" data-action="Appointment">📅 Book Appointment</button>
              <button class="chat-action-btn" data-action="Services">🦷 Our Services</button>
              <button class="chat-action-btn" data-action="Hours">🕒 Clinic Hours</button>
              <button class="chat-action-btn" data-action="Contact">📞 Contact Us</button>
            </div>
          `;
          chatbotBody.appendChild(msgDiv);
          chatbotBody.scrollTop = chatbotBody.scrollHeight;
        }, 1000);
      }
    }
  });

  chatbotCloseBtn.addEventListener('click', () => {
    state.isOpen = false;
    chatbotWidget.classList.remove('chatbot-widget--open');
  });

  function appendMessage(text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    
    if (!isUser) {
      msgDiv.innerHTML = `
        <span class="chat-sender">Zoe AI</span>
        <div class="chat-bubble"></div>
      `;
      // Use textContent to prevent XSS and handle newlines via CSS white-space
      msgDiv.querySelector('.chat-bubble').textContent = text;
    } else {
      msgDiv.innerHTML = `<div class="chat-bubble"></div>`;
      msgDiv.querySelector('.chat-bubble').textContent = text;
    }

    chatbotBody.appendChild(msgDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }

  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot chat-typing-wrapper';
    typingDiv.innerHTML = `
      <span class="chat-sender">Zoe AI</span>
      <div class="chat-typing">
        <span></span><span></span><span></span>
      </div>
    `;
    chatbotBody.appendChild(typingDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
    return typingDiv;
  }

  function removeTyping(typingDiv) {
    if (typingDiv && typingDiv.parentNode) {
      typingDiv.parentNode.removeChild(typingDiv);
    }
  }

  // ===== AI / NLP Engine =====
  
  // Fuzzy matching against Knowledge Base
  function getResponseFromKB(query) {
    if (!state.kb) return "I'm sorry, I am currently unable to access my knowledge base. Please call us at +91 (555) 0123-4567.";
    
    const lowerQuery = query.toLowerCase();
    
    // Check quick intents
    if (lowerQuery.includes("hi") || lowerQuery.includes("hello") || lowerQuery.includes("hey")) {
      return "Hello! How can I help you today? You can ask me about our services, clinic hours, or how to book an appointment.";
    }

    if (lowerQuery.includes("hour") || lowerQuery.includes("time") || lowerQuery.includes("open")) {
      const hours = state.kb.clinic.hours;
      return `Our clinic hours are:\nMon-Fri: ${hours.monday_friday}\nSaturday: ${hours.saturday}\nSunday: ${hours.sunday}`;
    }

    if (lowerQuery.includes("contact") || lowerQuery.includes("call") || lowerQuery.includes("phone")) {
      return `You can reach us at ${state.kb.clinic.phone} or email us at ${state.kb.clinic.email}. We are located at ${state.kb.clinic.address}.`;
    }
    
    if (lowerQuery.includes("location") || lowerQuery.includes("address") || lowerQuery.includes("where")) {
      return `We are located at ${state.kb.clinic.address}. You can find a map on our Contact page.`;
    }

    // Search FAQs
    for (const faq of state.kb.faqs) {
      if (faq.keywords.some(kw => lowerQuery.includes(kw))) {
        return faq.answer;
      }
    }

    // Search Services
    for (const service of state.kb.services) {
      if (service.keywords.some(kw => lowerQuery.includes(kw))) {
        return `We offer ${service.name}. ${service.detail}\nDuration: ${service.duration}.`;
      }
    }

    // Default Fallback
    return "Thank you for your message! Our clinical team will get back to you shortly, or you can call us directly at " + state.kb.clinic.phone + " for immediate assistance.";
  }

  async function handleSend() {
    const query = chatbotInput.value.trim();
    if (!query) return;

    appendMessage(query, true);
    chatbotInput.value = '';
    
    const typingDiv = showTyping();

    // Simulate network delay for natural feel
    setTimeout(() => {
      removeTyping(typingDiv);
      
      // If an API key is provided, we would call Sarvam here. 
      // Since we don't have one loaded by default, we use the local Knowledge Base intent engine.
      if (state.sarvamConfig.apiKey) {
        // Placeholder for live Sarvam API integration
        appendMessage("Sarvam API endpoint configured. (API implementation goes here).");
      } else {
        // Fallback to Rule-based intent matching over JSON
        const responseText = getResponseFromKB(query);
        appendMessage(responseText);
      }
    }, 800 + Math.random() * 500);
  }

  chatbotSendBtn.addEventListener('click', handleSend);
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  // Handle action chip clicks
  chatbotBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('chat-action-btn')) {
      const action = e.target.getAttribute('data-action');
      if (action) {
        chatbotInput.value = action;
        handleSend();
      }
    }
  });

});
