# SS Magic Printers

Welcome to the **SS Magic Printers** website repository! This is a modern, fast, and feature-rich static e-commerce website designed to showcase and sell custom printed gifts such as Photo Frames, Mugs, T-Shirts, Pillows, Clocks, and Keychains.

## ✨ Features

- **Responsive Modern UI**: Built with a sleek, premium design, glassy navigation bar, and smooth scrolling interactions that work perfectly on both desktop and mobile devices.
- **Dynamic Hero & Product Grids**: Immediate visual impact with high-definition custom product showcases right on the home page.
- **Amazon-Style Product Modals**: Clicking on any product opens a detailed modal showing a large image, price, stock status, delivery information, and an integrated **Customer Reviews** section.
- **Local Review System**: Users can submit custom star ratings and reviews which are dynamically saved and loaded.
- **Direct-to-WhatsApp Ordering**: Frictionless checkout process! The order form captures the user's details, quantity, instructions, and automatically generates a pre-formatted WhatsApp message directly to the business owner.
- **File Upload Support**: The order form supports capturing file uploads so users can immediately attach their photos for custom prints.
- **Interactive Lightbox Gallery**: A filterable dynamic portfolio showing past work.
- **Automated FAQ Chatbot**: A lightweight, built-in chat widget that answers common customer questions (prices, delivery, location, products) without navigating away.
- **Lead Capture Modal**: A popup allowing you to collect visitor names and phone numbers directly into a Google Sheet via Google Apps Script.

## 🛠️ Built With

- **HTML5**: Semantic and accessible page structure.
- **CSS3** (Vanilla): Custom design system using CSS Variables for consistent theming (`--clr-blue`, `--clr-gold`, variables etc.), CSS Grid, Flexbox, and complex animations (like the top marquee). No external CSS frameworks are required.
- **JavaScript** (Vanilla ES6): Handling DOM manipulation, localStorage for reviews, modal toggling, chatbot logic, and WhatsApp API integration.
- **Phosphor Icons**: Used for premium, consistent iconography throughout the site.
- **Google Fonts**: Inter & Outfit.

## 🚀 Running the Project Locally

Because this is a static site, you don't need a complex build pipeline (like Node.js or Webpack) to run it!

### Option 1: Live Server (VS Code)
1. Open the project folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click on `index.html` and select **Open with Live Server**.

### Option 2: Python HTTP Server (Windows/Mac/Linux)
1. Open your terminal or command prompt.
2. Navigate to the project directory:
   ```bash
   cd ssmagic
   ```
3. Run the built-in Python server:
   ```bash
   python -m http.server 8000
   ```
4. Open your browser and go to `http://localhost:8000/`.

## 📂 Project Structure

```text
ssmagic/
├── index.html         # Main entry point of the application
├── style.css          # Design system, styling, and responsive layout
├── script.js          # All client-side JavaScript logic 
├── processed_images/  # Optimized WebP/PNG images for products and gallery 
└── README.md          # Project documentation
```

## ⚙️ Configuration & Customization

- **WhatsApp Number**: To change the business WhatsApp number, search for `917731879736` and `919030077663` in both `index.html` and `script.js` and replace them with your own.
- **Google Sheets Lead Capture**: In `script.js` (around line 538), there is a `SCRIPT_URL` variable. You can deploy your own Google Apps Script attached to a Google Sheet and paste the Web App URL there to capture incoming visitor leads.
- **Colors**: To modify the color scheme, simply update the CSS Custom Properties at the top of `style.css` (e.g., `--clr-bg`, `--clr-blue`, `--clr-gold`).

## 📜 License

This project is private and tailored specifically for **SS Magic Printers**.
