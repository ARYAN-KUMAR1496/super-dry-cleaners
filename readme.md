# Super Dry Cleaners - Website Documentation

> **Tagline:** Fresh Clothes. Professional Care.  
> **Location:** Bahadurpur Colony Road, Near Purana Rozgaar Daftar, Ballia, Uttar Pradesh, India  
> **Contact:** +91 8931051894 | Superdrycleaners94@gmail.com  

A modern, high-performance, and fully responsive business website for **Super Dry Cleaners**. Built with semantic HTML5, pure modern CSS3, and vanilla JavaScript—zero frameworks, zero build tools needed.

---

## 📁 Project Structure

```
super-dry-cleaners/
│
├── index.html              # Main HTML structure with local SEO and Schema.org JSON-LD
├── css/
│   └── style.css           # Design system, color tokens, responsive media queries
├── js/
│   └── script.js           # Navigation, form validation, WhatsApp link, FAQ accordion
├── images/
│   ├── logo.jpg            # Official Super Dry Cleaners brand crest
│   └── owner.jpg           # Authentic proprietor / store greeting photo
└── README.md               # Website guide and handoff documentation
```

---

## 🚀 1. How to Run the Website Locally

Since this website is built with pure web standards (HTML5, CSS3, JS), **no installation or build command is required**.

### Option A: Direct Browser Launch (Simplest)
1. Open your file explorer and navigate to `super-dry-cleaners/`.
2. Double-click `index.html` to open it in Chrome, Edge, Safari, or Firefox.

### Option B: VS Code Live Server (Recommended for Development)
1. Open the `super-dry-cleaners` folder in VS Code.
2. If you have the **Live Server** extension installed, right-click `index.html` and choose **"Open with Live Server"**.
3. It will launch at `http://127.0.0.1:5500/index.html`.

---

## ✏️ 2. Where to Change the Business Name

To update the business name:
1. Open `index.html`:
   - Search for `SUPER DRY CLEANERS` (appears in `<title>`, `<meta>`, `.brand-name`, and footer).
   - In the `<script type="application/ld+json">` structured data block, edit `"name": "Super Dry Cleaners"`.
2. Open `js/script.js`:
   - Search for `Super Dry Cleaners` in WhatsApp message templates.

---

## 📞 3. Where to Change Phone / WhatsApp Number

The current verified phone number is `8931051894` (+91 format).

### In `index.html`:
- **Top Announcement Bar:** Search `tel:+918931051894` and `+91 8931051894`.
- **Navbar Call Button:** `tel:+918931051894`.
- **Booking Hotline Box:** `tel:+918931051894`.
- **Contact Section Buttons:** `tel:+918931051894` and `wa.me/918931051894`.
- **Floating WhatsApp Button:** `href="https://wa.me/918931051894?text=..."`.
- **JSON-LD Schema:** `"telephone": "+918931051894"`.

### In `js/script.js`:
- Look for the WhatsApp confirmation handler on line ~220:
  ```javascript
  sendWhatsAppBtn.setAttribute('href', `https://wa.me/918931051894?text=${formattedMsg}`);
  ```
  Replace `918931051894` with your new international number format (e.g. `91XXXXXXXXXX`).

---

## 📍 4. Where to Change the Business Address & Hours

### In `index.html`:
- **Top Bar:** Search for `Bahadurpur Colony Road, Ballia, UP`.
- **Contact Section:** Lines ~540–560 contain:
  ```html
  <p>
    Bahadurpur Colony Road,<br>
    Near Purana Rozgaar Daftar, Gali,<br>
    Ballia, Uttar Pradesh, India
  </p>
  ```
- **Google Maps iframe / Directions Link:**
  Update the URL in the `<iframe>` `src` and the `Get Directions` anchor tag:
  ```html
  https://maps.google.com/maps?q=Your+New+Address+Here&t=&z=15&ie=UTF8&iwloc=&output=embed
  ```
- **Business Hours:** Update `Mon – Sun: 9:00 AM – 8:00 PM` in both the top bar and contact section.

---

## 💰 5. Where to Change Prices

All prices are organized in `index.html` inside `<section id="pricing">`:
- **Shirt:** Look for `Wash & Iron – ₹40` and `Dry Clean – ₹80`.
- **Trouser:** Look for `Wash & Iron – ₹50` and `Dry Clean – ₹100`.
- **Suit:** Look for `Full Dry Clean – ₹350`.
- **Saree:** Look for `Dry Clean & Roll Press – ₹250+`.
- **Blanket:** Look for `Deep Sanitized Clean – ₹250+`.

Simply change the numerical values inside the `<span class="price-value">` elements.

---

## 🖼️ 6. Where to Replace Images

Images are stored inside the `images/` directory:
- `images/logo.jpg` — Official round crest logo. To replace, save your new logo image with the exact name `logo.jpg` or update the `src` attribute in `index.html`.
- `images/owner.jpg` — Founder / team greeting photo. Replace with any high-resolution photo named `owner.jpg`.

---

## 🔗 7. Connecting the Booking Form to Google Sheets / Formspree

The booking form in `js/script.js` already validates user input and generates a pre-filled WhatsApp order link.

To also automatically log bookings in a **Google Sheet**:
1. Create a free Google Sheet and attach a Google Apps Script Webhook (or use [Formspree](https://formspree.io) / [EmailJS](https://www.emailjs.com/)).
2. In `js/script.js`, find the comment `DEVELOPER HOOK: CONNECT BACKEND / GOOGLE SHEETS HERE` (around line 230).
3. Uncomment the `fetch()` call and paste your Webhook URL.

---

## 🌐 8. How to Deploy (Free Hosting)

### Deploying on Netlify (Drag & Drop - 60 Seconds)
1. Go to [Netlify.com](https://www.netlify.com) and log in (or sign up for free).
2. Go to the **Sites** tab.
3. Drag and drop the whole `super-dry-cleaners` folder directly into the Netlify browser window.
4. Netlify will publish your site instantly with a free SSL certificate (`https://your-site-name.netlify.app`).
5. (Optional) In **Domain Management**, connect your custom domain (e.g. `superdrycleaners.com`).

### Deploying on GitHub Pages (Free)
1. Initialize git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial launch of Super Dry Cleaners website"
   ```
2. Create a repository on GitHub (e.g. `super-dry-cleaners`).
3. Push your repository:
   ```bash
   git remote add origin https://github.com/<your-username>/super-dry-cleaners.git
   git branch -M main
   git push -u origin main
   ```
4. Go to repository **Settings** > **Pages**.
5. Under **Source**, select `Deploy from a branch` > `main` > `/root` > click **Save**.
6. Your website will be live in 1-2 minutes at `https://<your-username>.github.io/super-dry-cleaners/`.
