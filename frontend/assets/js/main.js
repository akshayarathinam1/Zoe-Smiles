/* Inject Navbar and Footer */
document.addEventListener("DOMContentLoaded", function() {
  // Inject Navbar HTML directly to work on local file:// protocol
  const navbarHTML = `<!-- ===== PREMIUM TOP BAR ===== -->
<div class="premium-topbar" id="premium-topbar">
  <p class="premium-topbar__text">
    <span class="premium-topbar__dot"></span>
    Now accepting new patients &mdash; Book your consultation today!
    <a href="index.html#home" class="premium-topbar__cta">Book Now &rarr;</a>
  </p>
</div>

<!-- ===== NAVBAR ===== -->
<header class="navbar" id="site-navbar">
  <nav class="navbar__inner">

    <!-- Top row: logo | links | hamburger -->
    <div class="navbar__row">

      <!-- Logo -->
      <a href="index.html" id="logo-link" class="navbar__logo-link">
        <img
          src="assets/logo/logo_zoesmiles.png"
          alt="Zoe Smiles Dental Clinic Logo"
          class="navbar__logo-img"
        />
      </a>

      <!-- Desktop Nav Links -->
      <ul class="navbar__links" id="desktop-nav">
        <li><a href="index.html#home" id="nav-home" class="nav-link">Home</a></li>
        <li><a href="about.html" id="nav-about" class="nav-link">About</a></li>
        <li><a href="services.html" id="nav-services" class="nav-link">Services</a></li>
        <li><a href="gallery.html" id="nav-smilegallery" class="nav-link">Smile Gallery</a></li>
        <li><a href="contact.html" id="nav-contact" class="nav-link">Contact</a></li>
      </ul>

      <!-- Desktop CTA Button -->
      <div class="navbar__cta-wrapper">
        <a href="contact.html#appointment" class="btn-book" id="nav-book-btn">
          <span>Book Appointment</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 inline-block ml-1"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
        </a>
      </div>

      <!-- Hamburger — Mobile -->
      <button
        id="hamburger-btn"
        class="hamburger"
        aria-label="Toggle navigation menu"
        aria-expanded="false"
        aria-controls="mobile-menu"
      >
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
      </button>

    </div><!-- /navbar__row -->

    <!-- Mobile Dropdown Menu -->
    <div
      id="mobile-menu"
      class="mobile-menu"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <ul class="mobile-menu__list">
        <li><a href="index.html#home"       id="mob-home"        class="mobile-menu__link">Home</a></li>
        <li><a href="about.html"             id="mob-about"       class="mobile-menu__link">About</a></li>
        <li><a href="services.html"          id="mob-services"    class="mobile-menu__link">Services</a></li>
        <li><a href="gallery.html"           id="mob-smilegallery" class="mobile-menu__link">Smile Gallery</a></li>
        <li><a href="contact.html"           id="mob-contact"     class="mobile-menu__link">Contact</a></li>
        <li class="px-4 py-2"><a href="contact.html#appointment" class="btn-book w-full justify-center text-center mt-2 flex" id="mob-book-btn">Book Appointment</a></li>
      </ul>
    </div><!-- /mobile-menu -->

  </nav>
</header>`;

  const navPlaceholder = document.getElementById('navbar-placeholder');
  if (navPlaceholder) {
    navPlaceholder.innerHTML = navbarHTML;
    initNavbar();
    setActiveNavLink();
  }

  // Inject Footer HTML directly to work on local file:// protocol
  const footerHTML = `<!-- ===== FOOTER ===== -->
<footer class="site-footer" id="site-footer">
  <div class="footer-overlay"></div>
  <div class="footer-inner">
    <div class="footer-grid">

      <!-- Col 1: Brand & Desc -->
      <div class="footer-col reveal" id="footer-col-1">
        <a href="index.html" class="footer-logo">
          <img src="assets/logo/logo_zoesmiles.png" alt="Zoe Smiles" class="footer-logo-img" loading="lazy" />
        </a>
        <p class="footer-desc">
          Providing high-end oral healthcare using cutting-edge technology and a patient-first specialist approach.
        </p>
        <div class="footer-socials">
          <a href="#" class="social-link" aria-label="Facebook">
            <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
              <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.324V1.325C24 .597 23.403 0 22.675 0z"/>
            </svg>
          </a>
          <a href="#" class="social-link" aria-label="Instagram">
            <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Col 2: Quick Links -->
      <div class="footer-col reveal reveal-delay-1" id="footer-col-2">
        <h4 class="footer-title">Quick Links</h4>
        <ul class="footer-links">
          <li><a href="index.html#home">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="gallery.html">Smile Gallery</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>

      <!-- Col 3: Services -->
      <div class="footer-col reveal reveal-delay-2" id="footer-col-3">
        <h4 class="footer-title">Our Expertise</h4>
        <ul class="footer-links">
          <li><a href="services.html">Cosmetic Dentistry</a></li>
          <li><a href="services.html">Orthodontics</a></li>
          <li><a href="services.html">Oral Surgery</a></li>
          <li><a href="services.html">Pediatric Care</a></li>
          <li><a href="services.html">Dental Implants</a></li>
        </ul>
      </div>

      <!-- Col 4: Contact -->
      <div class="footer-col reveal reveal-delay-3" id="footer-col-4">
        <h4 class="footer-title">Contact Us</h4>
        <p class="footer-contact-text">
          123 Dental Plaza, Health Avenue<br>
          Medical District, NY 10001
        </p>
        <p class="footer-contact-text" style="margin-top: 1rem;">
          <strong>Phone:</strong> (555) 0123-4567<br>
          <strong>Email:</strong> care@zoesmiles.com
        </p>
      </div>

    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <div class="copyright">
        &copy; 2026 Zoe Smiles. All rights reserved.
      </div>
      <div class="footer-bottom-links" style="font-size: 0.78rem; color: #ffffff; opacity: 0.8;">
        Designed by <a href="https://modominds.com/" target="_blank" rel="noopener noreferrer" style="color: #ffffff; font-weight: 600; text-decoration: underline;">Modominds</a>
      </div>
    </div>
  </div>
</footer>`;

  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = footerHTML;
    
    // Set up scroll reveal observer specifically for dynamic footer columns
    const footerRevealEls = footerPlaceholder.querySelectorAll('.reveal');
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          footerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    footerRevealEls.forEach(el => footerObserver.observe(el));
  }

  // ===== Inject Chatbot Icon and Widget =====
  const chatbotContainer = document.createElement('div');
  chatbotContainer.innerHTML = `
    <!-- Chatbot Toggle Button -->
    <button id="chatbot-toggle-btn" class="chatbot-toggle-btn" aria-label="Open chat assistant">
      <div class="pulse-ring"></div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 26px; height: 26px;">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z" />
      </svg>
      <span class="chatbot-tooltip">Chat with Zoe Assistant</span>
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

      <!-- Chat Body -->
      <div id="chatbot-body" class="chatbot-body">
        <div class="chat-message bot">
          Hi there! 👋 I am Zoe's Virtual Assistant. How can I help you today?
          <div class="chat-actions">
            <button class="chat-action-btn" data-action="appt">📅 Book Appointment</button>
            <button class="chat-action-btn" data-action="services">🦷 Our Services</button>
            <button class="chat-action-btn" data-action="hours">🕒 Clinic Hours</button>
            <button class="chat-action-btn" data-action="contact">📞 Contact Us</button>
          </div>
        </div>
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

  // Toggle Widget
  chatbotToggleBtn.addEventListener('click', () => {
    chatbotWidget.classList.toggle('chatbot-widget--open');
  });

  // Close Widget
  chatbotCloseBtn.addEventListener('click', () => {
    chatbotWidget.classList.remove('chatbot-widget--open');
  });

  // Append user/bot messages
  function appendMessage(text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    msgDiv.innerText = text;
    chatbotBody.appendChild(msgDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }

  // Handle action click
  function handleActionClick(action) {
    appendMessage(action, true);
    setTimeout(() => {
      if (action.includes('Appointment')) {
        appendMessage("You can easily schedule a premium oral health session by visiting our Contact & Appointment page (contact.html#appointment) or by filling out the Hero Section form on the Homepage!");
      } else if (action.includes('Services')) {
        appendMessage("We offer high-end cosmetic dentistry, advanced orthodontics, professional dental implants, pediatric care, and emergency surgery. Visit services.html to learn more!");
      } else if (action.includes('Hours')) {
        appendMessage("Our specialist clinic is open:\nMon - Fri: 8:00 AM - 7:00 PM\nSaturday: 9:00 AM - 4:00 PM\nSunday: Closed (Emergency on call)");
      } else if (action.includes('Contact')) {
        appendMessage("You can call us directly at (555) 0123-4567 or email care@zoesmiles.com. We are located at 123 Dental Plaza, Health Avenue, NY!");
      }
    }, 600);
  }

  // Bind clicks for quick action buttons
  chatbotBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('chat-action-btn')) {
      const btnText = e.target.innerText;
      handleActionClick(btnText);
    }
  });

  // Send message
  function handleSend() {
    const query = chatbotInput.value.trim();
    if (!query) return;
    appendMessage(query, true);
    chatbotInput.value = '';

    // Mock responses
    setTimeout(() => {
      const q = query.toLowerCase();
      if (q.includes('appointment') || q.includes('book') || q.includes('schedule')) {
        appendMessage("To book a consultation, you can fill out the booking form on our homepage or head over to our dedicated Contact & Appointment page.");
      } else if (q.includes('price') || q.includes('cost') || q.includes('insur')) {
        appendMessage("We accept all major PPO insurance plans. For specific costs or treatment quotes, please contact our office for a personalized consultation!");
      } else if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
        appendMessage("Hello! How can I help you today? Please feel free to ask about our clinic hours, location, or dental services.");
      } else {
        appendMessage("Thank you for your message! Our clinical team will get back to you shortly, or you can call us directly at (555) 0123-4567 for immediate assistance.");
      }
    }, 700);
  }

  chatbotSendBtn.addEventListener('click', handleSend);
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
});

function initNavbar() {
  /* ── Hamburger Toggle ── */
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu   = document.getElementById("mobile-menu");

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("is-open");
      hamburgerBtn.classList.toggle("is-open", isOpen);
      hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
    });

    /* Close mobile menu on link click */
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("is-open");
        hamburgerBtn.classList.remove("is-open");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ── Scroll Shadow ── */
  const navbar = document.getElementById("site-navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("navbar--scrolled", window.scrollY > 10);
    }, { passive: true });
    // Trigger once on load
    navbar.classList.toggle("navbar--scrolled", window.scrollY > 10);
  }
}

function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll("#desktop-nav .nav-link");
  
  navLinks.forEach(link => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    
    // Simple logic to match href with pathname
    if (currentPath.includes("about.html") && href.includes("about.html")) {
      link.classList.add("active");
    } else if (currentPath.includes("services.html") && href.includes("services.html")) {
      link.classList.add("active");
    } else if (currentPath.includes("gallery.html") && href.includes("gallery.html")) {
      link.classList.add("active");
    } else if (currentPath.includes("contact.html") && href.includes("contact.html")) {
      link.classList.add("active");
    } else if ((currentPath.endsWith("/") || currentPath.includes("index.html")) && href.includes("index.html#home")) {
      link.classList.add("active");
    }
  });
}
