/**
 * SUPER DRY CLEANERS - OFFICIAL JAVASCRIPT
 * Fresh Clothes. Professional Care.
 * Location: Ballia, Uttar Pradesh, India
 * 
 * Features:
 * - Mobile navigation drawer with accessible ARIA toggle
 * - Sticky header with scroll shadow
 * - Active navigation scrollspy
 * - FAQ interactive accordion
 * - Booking form validation with direct WhatsApp order confirmation
 * - Back to top button
 * - Service card quick-select auto-scroll
 * - Dynamic copyright year
 */
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzPxK5qKNUqb7_HYW9XFRDyeX7aVcMxLBWB5tvrM3Yure6L7o0-S30mIfpZga0wzVYJdA/exec"
document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. DYNAMIC COPYRIGHT YEAR
  // -------------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // -------------------------------------------------------------------------
  // 2. MOBILE HAMBURGER MENU & ACCESSIBILITY
  // -------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  function openMobileMenu() {
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('active');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeMobileMenu() {
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }

  // -------------------------------------------------------------------------
  // 3. STICKY NAVBAR SCROLL SHADOW
  // -------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  // -------------------------------------------------------------------------
  // 4. ACTIVE NAVIGATION LINK (SCROLL SPY)
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  
  function highlightActiveNavLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNavLink, { passive: true });

  // -------------------------------------------------------------------------
  // 5. FAQ ACCORDION
  // -------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other accordion items for clean scanability
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question-btn');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          otherBtn?.setAttribute('aria-expanded', 'false');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
        if (answer) answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
        if (answer) answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });

  // -------------------------------------------------------------------------
  // 6. QUICK SERVICE BOOKING LINK (Connects Service Cards to Form)
  // -------------------------------------------------------------------------
  const serviceButtons = document.querySelectorAll('.service-book-trigger');
  const serviceSelect = document.getElementById('booking-service');

  serviceButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = btn.getAttribute('data-service');
      if (serviceSelect && serviceName) {
        serviceSelect.value = serviceName;
      }
    });
  });

  // -------------------------------------------------------------------------
  // 7. BOOK A PICKUP FORM VALIDATION & HANDLING
  // -------------------------------------------------------------------------
  const bookingForm = document.getElementById('booking-form');
  const successCard = document.getElementById('booking-success');
  const resetFormBtn = document.getElementById('booking-reset-btn');
  const sendWhatsAppBtn = document.getElementById('whatsapp-confirm-btn');
  const pickupDateInput = document.getElementById('pickup-date');

  // Set minimum date to today
  if (pickupDateInput) {
    const today = new Date().toISOString().split('T')[0];
    pickupDateInput.setAttribute('min', today);
  }

  // Field validation helpers
  function validateIndianPhone(phone) {
    // 10 digits starting with 6-9 (optionally with +91 or 0 prefix)
    const cleaned = phone.replace(/\s+/g, '').replace(/^[+]?91/, '').replace(/^0/, '');
    return /^[6-9]\d{9}$/.test(cleaned);
  }

  function validateInput(input, isValid, errorElement, errorMessage) {
    if (!isValid) {
      input.classList.add('is-invalid');
      if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add('visible');
      }
      return false;
    } else {
      input.classList.remove('is-invalid');
      if (errorElement) {
        errorElement.classList.remove('visible');
      }
      return true;
    }
  }

  if (bookingForm) {
    const nameInput = document.getElementById('pickup-name');
    const phoneInput = document.getElementById('pickup-phone');
    const emailInput = document.getElementById('pickup-email');
    const addressInput = document.getElementById('pickup-address');
    const timeInput = document.getElementById('pickup-time');
    const notesInput = document.getElementById('pickup-notes');

    // Real-time error clearance on input
    [nameInput, phoneInput, addressInput, pickupDateInput].forEach(field => {
      field?.addEventListener('input', () => {
        field.classList.remove('is-invalid');
        const err = field.parentElement?.querySelector('.field-error');
        if (err) err.classList.remove('visible');
      });
    });

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;

      // Validate Name
      const nameVal = nameInput?.value.trim() || '';
      const nameErr = nameInput?.parentElement?.querySelector('.field-error');
      if (!validateInput(nameInput, nameVal.length >= 2, nameErr, 'Please enter your full name (at least 2 characters)')) {
        isFormValid = false;
      }

      // Validate Phone
      const phoneVal = phoneInput?.value.trim() || '';
      const phoneErr = phoneInput?.parentElement?.querySelector('.field-error');
      if (!validateInput(phoneInput, validateIndianPhone(phoneVal), phoneErr, 'Please enter a valid 10-digit mobile number')) {
        isFormValid = false;
      }

      // Validate Address
      const addressVal = addressInput?.value.trim() || '';
      const addressErr = addressInput?.parentElement?.querySelector('.field-error');
      if (!validateInput(addressInput, addressVal.length >= 5, addressErr, 'Please provide your full pickup address in Ballia')) {
        isFormValid = false;
      }

      // Validate Pickup Date
      const dateVal = pickupDateInput?.value || '';
      const dateErr = pickupDateInput?.parentElement?.querySelector('.field-error');
      if (!validateInput(pickupDateInput, dateVal !== '', dateErr, 'Please choose a preferred pickup date')) {
        isFormValid = false;
      }

      if (!isFormValid) {
        return;
      }

      // Form is valid! Gather submission data
      const selectedService = serviceSelect?.value || 'Dry Cleaning & Laundry';
      const selectedTime = timeInput?.value || 'Anytime between 9 AM - 8 PM';
      const emailVal = emailInput?.value.trim() || 'Not provided';
      const notesVal = notesInput?.value.trim() || 'No special instructions';

      const bookingReference = `SDC-${Math.floor(10000 + Math.random() * 90000)}`;

      // Update success card elements
      const refElement = document.getElementById('success-booking-ref');
      const detailsElement = document.getElementById('success-booking-details');
      
      if (refElement) {
        refElement.textContent = bookingReference;
      }

      if (detailsElement) {
        detailsElement.innerHTML = `
          <strong>Customer:</strong> ${escapeHtml(nameVal)}<br>
          <strong>Phone:</strong> ${escapeHtml(phoneVal)}<br>
          <strong>Service:</strong> ${escapeHtml(selectedService)}<br>
          <strong>Date & Slot:</strong> ${escapeHtml(dateVal)} (${escapeHtml(selectedTime)})<br>
          <strong>Address:</strong> ${escapeHtml(addressVal)}
        `;
      }

      // Pre-fill WhatsApp Confirmation Link
      if (sendWhatsAppBtn) {
        const formattedMsg = encodeURIComponent(
          `*New Pickup Request - Super Dry Cleaners*\n` +
          `Ref: ${bookingReference}\n` +
          `Name: ${nameVal}\n` +
          `Phone: ${phoneVal}\n` +
          `Service: ${selectedService}\n` +
          `Date: ${dateVal}\n` +
          `Time: ${selectedTime}\n` +
          `Address: ${addressVal}\n` +
          `Notes: ${notesVal}`
        );
        sendWhatsAppBtn.setAttribute('href', `https://wa.me/918931051894?text=${formattedMsg}`);
      }

    // =========================================================================
// SAVE BOOKING TO GOOGLE SHEETS
// =========================================================================

const formData = new URLSearchParams();

formData.append("name", nameVal);
formData.append("phone", phoneVal);
formData.append("email", emailVal);
formData.append("service", selectedService);
formData.append("date", dateVal);
formData.append("time", selectedTime);
formData.append("address", addressVal);
formData.append("notes", notesVal);

fetch(GOOGLE_SCRIPT_URL, {
  method: "POST",
  body: formData,
  mode: "no-cors"
})
.then(() => {
  console.log("Booking sent to Google Sheets");
})
.catch((error) => {
  console.error("Google Sheets Error:", error);
});

      // Show success message and hide form
      bookingForm.style.display = 'none';
      if (successCard) {
        successCard.classList.add('active');
        successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    // Reset Form button
    resetFormBtn?.addEventListener('click', () => {
      bookingForm.reset();
      bookingForm.style.display = 'flex';
      if (successCard) successCard.classList.remove('active');
    });
  }

  // -------------------------------------------------------------------------
  // 8. BACK TO TOP BUTTON
  // -------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Helper utility to sanitize HTML strings
  function escapeHtml(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
  }
});
