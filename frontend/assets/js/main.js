/* Inject Navbar, Footer, and Booking Modal */
document.addEventListener("DOMContentLoaded", function() {

  /* ── Inject Booking Modal ── */
  const modalHTML = `
<div id="booking-modal" class="bk-modal-overlay bk-hidden" role="dialog" aria-modal="true" aria-labelledby="bk-modal-title" style="display:none;">
  <div class="bk-modal">
    <button class="bk-modal__close" id="bk-modal-close" aria-label="Close booking form">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="bk-modal__header">
      <div class="bk-modal__icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
      </div>
      <div>
        <h2 class="bk-modal__title" id="bk-modal-title">Book an Appointment</h2>
        <p class="bk-modal__sub">We'll confirm your visit within 24 hours.</p>
      </div>
    </div>

    <form id="booking-form" action="https://formspree.io/f/xaqkrbeg" method="POST" novalidate>
      <div class="bk-form-grid">
        <div class="bk-form-group bk-form-group--full">
          <label class="bk-label" for="bk-name">Full Name <span class="bk-req">*</span></label>
          <input class="bk-input" type="text" id="bk-name" name="name" placeholder="Your full name" required autocomplete="name" />
        </div>
        <div class="bk-form-group bk-form-group--full">
          <label class="bk-label" for="bk-phone">Phone Number <span class="bk-req">*</span></label>
          <input class="bk-input" type="tel" id="bk-phone" name="phone" placeholder="+91 98765 43210" required autocomplete="tel" />
        </div>
        <div class="bk-form-group bk-form-group--full">
          <label class="bk-label" for="bk-time">Preferred Date &amp; Time <span class="bk-req">*</span></label>
          <input class="bk-input" type="datetime-local" id="bk-time" name="preferred_time" required />
        </div>
      </div>

      <div class="bk-form-footer">
        <p class="bk-privacy">🔒 Your info is safe with us.</p>
        <button type="submit" class="bk-submit" id="bk-submit-btn">
          <span class="bk-submit__text">Book Now</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
        </button>
      </div>

      <div class="bk-success" id="bk-success" style="display:none;">
        <div class="bk-success__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <h3 class="bk-success__title">Appointment Request Sent!</h3>
        <p class="bk-success__msg">Thank you! Our team will contact you within 24 hours to confirm your slot.</p>
        <button type="button" class="bk-submit" id="bk-done-btn" style="margin-top:1.2rem;">Close</button>
      </div>
    </form>
  </div>
</div>`;

  const modalStyle = `<style>
  .bk-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(10, 25, 40, 0.72);
    display: flex !important;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    animation: bkFadeIn 0.25s ease;
  }
  .bk-modal-overlay.bk-hidden { display: none !important; }
  @keyframes bkFadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes bkSlideUp { from { opacity: 0; transform: translateY(30px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

  .bk-modal {
    position: relative;
    background: #fff;
    border-radius: 1.25rem;
    padding: 2rem;
    width: 100%;
    max-width: 400px;
    max-height: 92vh;
    overflow-y: auto;
    box-shadow: 0 24px 80px rgba(0,0,0,0.28);
    animation: bkSlideUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }

  .bk-modal__close {
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    background: #f1f5f9;
    border: none;
    border-radius: 50%;
    width: 2.2rem;
    height: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #64748b;
    transition: background 0.2s, color 0.2s;
  }
  .bk-modal__close:hover { background: #e2e8f0; color: #0f172a; }

  .bk-modal__header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 1.2rem;
  }

  .bk-modal__icon {
    width: 3.2rem;
    height: 3.2rem;
    background: linear-gradient(135deg, #006576, #00a3b8);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    flex-shrink: 0;
  }

  .bk-modal__title {
    font-family: 'Outfit', sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0;
    letter-spacing: -0.02em;
  }

  .bk-modal__sub {
    font-size: 0.85rem;
    color: #64748b;
    margin: 0.2rem 0 0;
  }

  .bk-form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }

  @media (max-width: 540px) {
    .bk-modal { padding: 1.8rem 1.2rem; border-radius: 1rem; }
    .bk-form-grid { grid-template-columns: 1fr; }
    .bk-modal__title { font-size: 1.2rem; }
  }

  .bk-form-group { display: flex; flex-direction: column; gap: 0.4rem; }
  .bk-form-group--full { grid-column: 1 / -1; }

  .bk-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #374151;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .bk-req { color: #ef4444; margin-left: 2px; }

  .bk-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 0.75rem;
    font-size: 0.9rem;
    color: #0f172a;
    background: #f8fafc;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
    font-family: inherit;
  }
  .bk-input:focus { border-color: #006576; box-shadow: 0 0 0 3px rgba(0,101,118,0.1); background: #fff; }
  .bk-input::placeholder { color: #94a3b8; }

  .bk-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.8rem center; padding-right: 2.5rem; }

  .bk-textarea { resize: vertical; min-height: 80px; }

  .bk-form-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 1.5rem;
    flex-wrap: wrap;
  }

  .bk-privacy {
    font-size: 0.78rem;
    color: #94a3b8;
    margin: 0;
  }

  .bk-submit {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #006576 0%, #00a3b8 100%);
    color: #fff;
    border: none;
    border-radius: 9999px;
    padding: 0.8rem 1.8rem;
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    font-size: 0.92rem;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
    white-space: nowrap;
    box-shadow: 0 6px 24px rgba(0,101,118,0.3);
  }
  .bk-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(0,101,118,0.4); }
  .bk-submit:disabled { opacity: 0.6; cursor: not-allowed; }

  .bk-success {
    text-align: center;
    padding: 2rem 1rem;
  }
  .bk-success__icon {
    width: 5rem;
    height: 5rem;
    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.2rem;
    color: #065f46;
  }
  .bk-success__title { font-family:'Outfit',sans-serif; font-size:1.4rem; font-weight:800; color:#0f172a; margin:0 0 0.5rem; }
  .bk-success__msg { font-size:0.9rem; color:#64748b; line-height:1.6; margin:0; }
</style>`;

  document.head.insertAdjacentHTML('beforeend', modalStyle);
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  initBookingModal();

  // Inject Navbar HTML directly to work on local file:// protocol
  const navbarHTML = `<!-- ===== PREMIUM TOP BAR ===== -->
<div class="premium-topbar" id="premium-topbar">
  <p class="premium-topbar__text">
    <span class="premium-topbar__dot"></span>
    Now accepting new patients &mdash; Book your consultation today!
    <a href="contact.html#appointment" class="premium-topbar__cta">Book Now &rarr;</a>
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
          Anderson School Campus,<br>
          Opp. Govt. ITI, Yercaud Main Road,<br>
          Salem - 636007
        </p>
        <p class="footer-contact-text" style="margin-top: 1rem;">
          <strong>Phone:</strong> (555) 0123-4567<br>
          <strong>Email:</strong> zoesmiles08@gmail.com
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
  // Chatbot logic has been moved to chatbot.js
});

function initBookingModal() {
  const overlay = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('bk-modal-close');
  const form     = document.getElementById('booking-form');
  const success  = document.getElementById('bk-success');
  const submitBtn = document.getElementById('bk-submit-btn');
  const doneBtn  = document.getElementById('bk-done-btn');

  // Set minimum date to today
  const dateInput = document.getElementById('bk-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  function openModal() {
    overlay.style.display = '';
    overlay.classList.remove('bk-hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const firstInput = overlay.querySelector('input, select');
      if (firstInput) firstInput.focus();
    }, 300);
  }

  function closeModal() {
    overlay.classList.add('bk-hidden');
    setTimeout(() => { overlay.style.display = 'none'; }, 200);
    document.body.style.overflow = '';
    form.style.display = '';
    success.style.display = 'none';
    form.reset();
    if (submitBtn) submitBtn.disabled = false;
  }

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close on button
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (doneBtn)  doneBtn.addEventListener('click', closeModal);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.style.display !== 'none') closeModal();
  });

  // Intercept ALL booking links via event delegation
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest(
      '[id="nav-book-btn"], [id="mob-book-btn"], [class*="premium-topbar__cta"], ' +
      '[id="cta-book"], .book-modal-trigger'
    );
    if (trigger) {
      e.preventDefault();
      openModal();
    }
  });

  // Also intercept topbar "Book Now" link (text-content based fallback)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href && link.href.includes('contact.html#appointment')) {
      e.preventDefault();
      openModal();
    }
  });

  // Form submission via Formspree
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('bk-submit-btn');
      if (btn) {
        btn.disabled = true;
        btn.querySelector('.bk-submit__text').textContent = 'Sending…';
      }

      const formData = new FormData(form);

      try {
        const response = await fetch('https://formspree.io/f/xaqkrbeg', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.style.display = 'none';
          success.style.display = 'block';
        } else {
          if (btn) { btn.disabled = false; btn.querySelector('.bk-submit__text').textContent = 'Confirm Appointment'; }
          alert('Something went wrong. Please try again or call us directly.');
        }
      } catch (err) {
        if (btn) { btn.disabled = false; btn.querySelector('.bk-submit__text').textContent = 'Confirm Appointment'; }
        alert('Network error. Please check your connection and try again.');
      }
    });
  }
}

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
