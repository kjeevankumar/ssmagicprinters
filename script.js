document.addEventListener('DOMContentLoaded', () => {
    // Scroll handling for sticky header
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('menu-overlay');
    body.appendChild(overlay);

    function toggleMenu() {
        navMenu.classList.toggle('open');
        overlay.classList.toggle('open');

        // Toggle icon between list and x
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('open')) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
            body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
            body.style.overflow = '';
        }
    }

    mobileToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Offset for header
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-list a[href="#${sectionId}"]`);

            // Only toggle active class if navLink exists and it's not the highlight button
            if (navLink && !navLink.classList.contains('highlight')) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    // Remove active from all
                    document.querySelectorAll('.nav-link:not(.highlight)').forEach(link => {
                        link.classList.remove('active');
                    });
                    navLink.classList.add('active');
                }
            }
        });
    });

    // Set current year in footer
    const yearElem = document.getElementById('year');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }

    // ==========================================
    // Smart Order Popup Logic
    // ==========================================
    const orderModal = document.getElementById('order-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const orderForm = document.getElementById('order-form');
    const orderProductInput = document.getElementById('order-product');
    const orderNameInput = document.getElementById('order-name');
    const orderPhoneInput = document.getElementById('order-phone');
    const orderQtyInput = document.getElementById('order-qty');
    const orderNotesInput = document.getElementById('order-notes');

    function openOrderModal(productName) {
        if (orderProductInput) orderProductInput.value = productName;
        if (orderModal) orderModal.classList.add('show');
    }

    function closeOrderModal() {
        if (orderModal) orderModal.classList.remove('show');
        if (orderForm) orderForm.reset();
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeOrderModal);

    // Intercept WhatsApp links for product orders
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        // Skip links that don't have '?text=' (like the generic footer float)
        if (link.href.includes('?text=') && (link.classList.contains('service-link') || link.classList.contains('btn'))) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // Extract product name from href text
                const urlParams = new URLSearchParams(link.href.split('?')[1]);
                const textBody = urlParams.get('text') || '';

                let productName = 'Custom Request';
                if (textBody.includes('Order Now: ')) {
                    productName = textBody.split('Order Now: ')[1];
                } else if (textBody.includes('interested in ')) {
                    productName = textBody.split('interested in ')[1];
                } else if (textBody.includes('custom quote for ')) {
                    productName = textBody.split('custom quote for ')[1];
                }
                openOrderModal(productName);
            });
        }
    });

    // Handle Combo offer buttons
    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const product = e.target.getAttribute('data-product');
            if (product) openOrderModal(product);
        });
    });

    // Handle form submission and generate WhatsApp link
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const product = orderProductInput.value;
            const name = orderNameInput.value;
            const phone = orderPhoneInput.value;
            const qty = orderQtyInput.value;
            const notes = orderNotesInput.value;

            // Generate message format requested
            let waMessage = `Hello SS Magic Printers,\nI would like to order:\n\nProduct: ${product}\nQuantity: ${qty}\nName: ${name}\nPhone: ${phone}`;
            if (notes.trim() !== '') {
                waMessage += `\nSpecial Instructions: ${notes}`;
            }
            waMessage += `\n\nPlease share payment and delivery details.`;

            // Redirect to WhatsApp
            const encodedMessage = encodeURIComponent(waMessage);
            window.open(`https://wa.me/919030077663?text=${encodedMessage}`, '_blank');

            closeOrderModal();
        });
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === orderModal) {
            closeOrderModal();
        }
    });

    // ==========================================
    // Lightweight Chatbot FAQ Logic
    // ==========================================
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const quickReplyBtns = document.querySelectorAll('.quick-reply-btn');

    if (chatbotToggle) {
        // Bot Data Matrix
        const botData = {
            price: "Our Love Story Frame starts at ₹599, Calendars at ₹399, and Canvas Frames at ₹899. We offer free delivery on photo frames! For other items, please contact us for a quote!",
            products: "We specialize in Photo Frames, Custom Mugs, T-Shirts, Photo Pillows, Wall Clocks, LED Frames, and Keychains.",
            frames: "We offer Love Collage (₹599), Photo Calendars (₹399), Spotify Style (₹699), Mosaic (₹549), Large Canvas (₹899), Romantic Collage (₹649), Birthday (₹449), Teacher's Day (₹499), and Multi-Photo (₹749).",
            mugs: "We design Magic Color Changing Mugs, Christmas Season Mugs, Colorful Inside Sets, Custom Photo Mugs, Rainbow Handle Collections, and Premium Photo Mugs.",
            tshirts: "Choose from EEE Department T-Shirts, Custom Photo, Portrait Print, Custom Design, Graphic Print, Kids Custom, Traditional, Artistic, Polo Style, and Team T-Shirts Sets.",
            pillows: "Our cozy collection includes Heart Photo Pillow (Red), Fluffy Heart, Sequin Heart (Starting ₹799), Custom Pillow Collection, Red Custom Photo, and Family Heart Pillows.",
            clocks: "We offer Couple Photo Clock (Wooden), Ship Wheel Wall Clocks, and Round LED Photo Clocks.",
            led: "Brighten a room with our Pentagon Revolving Lamp, Multi-Photo LED Tower, or Digital LED Clock Frame! (Round LED Photo Frame starting at ₹999)",
            keys: "Carry memories everywhere with Custom Photo Keychains, Golden Photo Keychains Set, or Holiday Photo Ornaments.",
            delivery: "We offer Same Day Delivery for many items in the Kurnool area, ensuring your gifts arrive fresh and fast.",
            contact: "Call or WhatsApp us at +91 90300 77663, +91 79933 14343, or +91 77318 79736.",
            location: "Visit us at SS Magic Printers, Beside Walmart, Birla Compound, Gooty Road, Kurnool – 518002, Andhra Pradesh.",
            fallback: "Please contact us directly via WhatsApp or call for more details.",
            process: "Simply tap the 'Order on WhatsApp' button, send us your desired photos and requirements, and we will design exactly what you desire!"
        };

        function toggleChatbot() {
            chatbotWindow.classList.toggle('hidden');
        }

        chatbotToggle.addEventListener('click', toggleChatbot);
        chatbotClose.addEventListener('click', toggleChatbot);

        // Scroll to bottom helper
        function scrollToBottom() {
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        // Append Message helper
        function appendMessage(text, sender) {
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-msg ${sender}-msg`;
            msgDiv.innerHTML = `<p>${text}</p>`;
            chatbotMessages.appendChild(msgDiv);
            scrollToBottom();
        }

        // Typing effect simulation
        function simulateTyping(callback) {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'chat-msg bot-msg typing-indicator';
            typingDiv.innerHTML = `<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>`;
            chatbotMessages.appendChild(typingDiv);
            scrollToBottom();

            setTimeout(() => {
                typingDiv.remove();
                callback();
            }, 600);
        }

        // Handle Quick Replies
        quickReplyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const queryType = btn.getAttribute('data-query');
                const userText = btn.innerText;

                // Add user message to UI
                appendMessage(userText, 'user');

                // Disable buttons temporarily to prevent spam tracking
                quickReplyBtns.forEach(b => b.style.pointerEvents = 'none');

                // Add typing indicator, then the bot response
                simulateTyping(() => {
                    const responseText = botData[queryType] || botData.fallback;
                    let finalHTML = responseText;

                    // For 'fallback' or end-funnel questions, append a visual CTA link to WhatsApp inside the chat block
                    if (queryType === 'fallback' || queryType === 'price' || queryType === 'process') {
                        finalHTML += `<br><a href="https://wa.me/917731879736" target="_blank" class="chat-action-btn">Chat on WhatsApp</a>`;
                    }

                    appendMessage(finalHTML, 'bot');

                    // Re-enable buttons
                    quickReplyBtns.forEach(b => b.style.pointerEvents = 'auto');
                });
            });
        });
    }

    // ==========================================
    // Reviews View More Toggle
    // ==========================================
    const viewMoreReviewsBtn = document.getElementById('view-more-reviews-btn');
    if (viewMoreReviewsBtn) {
        viewMoreReviewsBtn.addEventListener('click', () => {
            const hiddenReviews = document.querySelectorAll('.hidden-review');
            let isHidden = false;

            hiddenReviews.forEach(review => {
                if (review.style.display === 'none') {
                    review.style.display = 'flex'; // Use flex pattern from .review-card
                    isHidden = true;
                } else {
                    review.style.display = 'none';
                }
            });

            if (isHidden) {
                viewMoreReviewsBtn.textContent = 'View Less';
            } else {
                viewMoreReviewsBtn.textContent = 'View More Reviews';
            }
        });
    }

});
