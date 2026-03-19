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

            const orderImageInput = document.getElementById('order-image');
            if (orderImageInput && orderImageInput.files && orderImageInput.files.length > 0) {
                waMessage += `\nAttached Image: ${orderImageInput.files[0].name} (I will send this image in the chat)`;
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

    // ==========================================
    // Gallery Filter & Lightbox Logic
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            // Re-calculate visible items for lightbox navigation
            updateVisibleItems();
        });
    });

    // Lightbox Logic
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxPrice = document.getElementById('lightbox-price');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxOrderBtn = document.getElementById('lightbox-order-btn');
    const lightboxWaBtn = document.getElementById('lightbox-wa-btn');

    let visibleItems = Array.from(galleryItems);
    let currentIndex = 0;

    function updateVisibleItems() {
        visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    }

    // Initialize visible items
    updateVisibleItems();

    function openLightbox(index) {
        if (!lightbox) return;
        currentIndex = index;
        const item = visibleItems[currentIndex];

        // Populate data
        const imgSrc = item.querySelector('img').src;
        const title = item.getAttribute('data-title');
        const price = item.getAttribute('data-price');
        const desc = item.getAttribute('data-desc');

        lightboxImg.src = imgSrc;
        lightboxTitle.textContent = title;
        lightboxPrice.textContent = 'Starting at ₹' + price;
        lightboxDesc.textContent = desc;

        // WhatsApp Link formulation
        const waMessage = `Hi SS Magic Printers, I am interested in ordering the '${title}' (Starting at ₹${price}). Can you share more details?`;
        if (lightboxWaBtn) {
            lightboxWaBtn.href = `https://wa.me/917731879736?text=${encodeURIComponent(waMessage)}`;
        }

        // Order Now Link (opens the custom order modal)
        if (lightboxOrderBtn) {
            lightboxOrderBtn.onclick = () => {
                closeLightbox();
                const productSelect = document.getElementById('product');
                if (productSelect) productSelect.value = title;
                const orderModal = document.getElementById('order-modal');
                if (orderModal) orderModal.classList.add('show');
                document.body.classList.add('no-scroll');
            };
        }

        lightbox.classList.remove('hidden');
        document.body.classList.add('no-scroll');
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.add('hidden');
        document.body.classList.remove('no-scroll');
        // Clear src to prevent flash of old image on next open
        setTimeout(() => lightboxImg.src = '', 300);
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % visibleItems.length;
        openLightbox(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        openLightbox(currentIndex);
    }

    // Attach click events to gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = visibleItems.indexOf(item);
            if (index !== -1) {
                openLightbox(index);
            }
        });
    });

    if (lightbox) {
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxNext) lightboxNext.addEventListener('click', showNext);
        if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);

        // Close on overlay click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content') || e.target.classList.contains('lightbox-image-container')) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('hidden')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        });
    }

    // ==========================================
    // Amazon-Style Product Modal Logic
    // ==========================================
    const amazonModal = document.getElementById('amazon-product-modal');
    const amazonModalClose = document.getElementById('amazon-modal-close');
    const amazonModalImg = document.getElementById('amazon-modal-img');
    const amazonModalTitle = document.getElementById('amazon-modal-title');
    const amazonModalPrice = document.getElementById('amazon-modal-price');
    const amazonModalOrderBtn = document.getElementById('amazon-modal-order-btn');
    const amazonModalWaBtn = document.getElementById('amazon-modal-wa-btn');

    if (amazonModal) {
        // Use generic selector to work across different sections
        const productCards = document.querySelectorAll('.ecommerce-products-grid .product-card');
        
        productCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const img = card.querySelector('.product-img');
                const title = card.querySelector('.product-title');
                const priceElem = card.querySelector('.product-price');
                const waLink = card.querySelector('.product-order-btn');
                
                if (img) amazonModalImg.src = img.src;
                if (title) {
                    amazonModalTitle.textContent = title.textContent;
                    if (typeof loadReviews === 'function') loadReviews(title.textContent);
                }
                if (priceElem) {
                    // product-price usually contains "₹599", remove ₹ for the Amazon price display
                    amazonModalPrice.textContent = priceElem.textContent.replace('₹', '');
                }
                
                if (waLink) {
                    amazonModalWaBtn.href = waLink.href;
                }
                
                if (amazonModalOrderBtn && title) {
                    amazonModalOrderBtn.onclick = () => {
                        amazonModal.classList.remove('show');
                        document.body.style.overflow = '';
                        // Wait for transition before opening the main order modal
                        setTimeout(() => openOrderModal(title.textContent), 300);
                    };
                }

                amazonModal.classList.remove('hidden');
                // Slight delay for CSS opacity transition to trigger
                setTimeout(() => {
                    amazonModal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }, 10);
            });
        });

        // Close logic
        function closeAmazonModal() {
            amazonModal.classList.remove('show');
            document.body.style.overflow = '';
            setTimeout(() => {
                amazonModal.classList.add('hidden');
            }, 300);
        }

        if (amazonModalClose) {
            amazonModalClose.addEventListener('click', closeAmazonModal);
        }

        amazonModal.addEventListener('click', (e) => {
            if (e.target === amazonModal || e.target.classList.contains('amazon-modal-img-container')) {
                closeAmazonModal();
            }
        });

        // Reviews Logic
        const defaultReviews = {
            "Love Collage Frame": [
                {name: "Ramesh Reddy", rating: 5, text: "Beautiful design and great quality!"},
                {name: "Sneha", rating: 4, text: "Loved it, my partner was very happy."}
            ],
            "Photo Calendars": [
                {name: "Venkatesh", rating: 5, text: "Excellent print quality for the entire year."},
            ]
        };

        const reviewsListContainer = document.getElementById('product-reviews-list');
        const addReviewForm = document.getElementById('add-review-form');

        function getReviews(productName) {
            const raw = localStorage.getItem('reviews_' + productName);
            if (raw) return JSON.parse(raw);
            return defaultReviews[productName] || [
                {name: "Customer", rating: 5, text: "Excellent product, highly recommended!"}
            ];
        }

        function renderStars(rating) {
            let stars = '';
            for(let i=1; i<=5; i++) {
                if(i <= rating) stars += '<i class="ph-fill ph-star" style="color: #FFA41C;"></i>';
                else stars += '<i class="ph-fill ph-star" style="color: #e5e7eb;"></i>';
            }
            return stars;
        }

        // Make loadReviews accessible inside the outer scope of the modal block
        window.loadReviews = function(productName) {
            if(!reviewsListContainer) return;
            const reviews = getReviews(productName);
            reviewsListContainer.innerHTML = '';
            
            if (reviews.length === 0) {
                reviewsListContainer.innerHTML = '<p style="color: var(--clr-text-light); font-size: 0.95rem;">No reviews yet. Be the first to review!</p>';
                return;
            }

            reviews.forEach(r => {
                reviewsListContainer.innerHTML += `
                    <div class="review-item" style="border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                            <div style="width: 32px; height: 32px; background: #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--clr-text); font-weight: 600; font-size: 0.9rem;">
                                ${r.name.charAt(0).toUpperCase()}
                            </div>
                            <span style="font-weight: 600; color: var(--clr-blue); font-size: 0.95rem;">${r.name}</span>
                        </div>
                        <div style="display: flex; gap: 2px; font-size: 0.9rem; margin-bottom: 6px;">
                            ${renderStars(r.rating)}
                        </div>
                        <p style="color: var(--clr-text-light); font-size: 0.95rem; line-height: 1.4; margin: 0;">${r.text}</p>
                    </div>
                `;
            });
        };

        if(addReviewForm) {
            addReviewForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const productName = amazonModalTitle.textContent;
                const name = document.getElementById('review-name').value;
                const rating = parseInt(document.getElementById('review-rating').value);
                const text = document.getElementById('review-text').value;

                let reviews = getReviews(productName);
                reviews.unshift({name, rating, text});
                localStorage.setItem('reviews_' + productName, JSON.stringify(reviews));

                addReviewForm.reset();
                window.loadReviews(productName);
            });
        }
    }

    // ==========================================
    // Lead Capture Logic
    // ==========================================
    const leadModal = document.getElementById('lead-modal');
    const leadForm = document.getElementById('lead-capture-form');
    const leadSubmitBtn = document.getElementById('lead-submit-btn');

    // Display Logic
    if (leadModal && leadForm) {
        // Check if user has already submitted the form
        const hasCapturedLead = localStorage.getItem('leadCaptured');

        if (!hasCapturedLead) {
            // Show the modal
            setTimeout(() => {
                leadModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }, 1000); // 1-second delay for smoother entry
        }

        // Handle Submission
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('lead-name').value.trim();
            const phone = document.getElementById('lead-phone').value.trim();
            const email = document.getElementById('lead-email').value.trim();

            if (!name || !phone) return; // Native HTML5 handles required, but safety check

            // Update UI State
            const originalText = leadSubmitBtn.innerHTML;
            leadSubmitBtn.innerHTML = '<i class="ph-bold ph-spinner ph-spin"></i> Saving...';
            leadSubmitBtn.disabled = true;

            const now = new Date();
            const data = {
                name: name,
                phone: "+91" + phone,
                email: email || "Not Provided",
                date: now.toLocaleDateString(),
                time: now.toLocaleTimeString(),
                source: 'Website Entry Form'
            };

            // GOOGLE APPS SCRIPT WEB APP URL
            // Replace this with the URL after deploying the Google Sheet Script!
            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw5Y_oIoec0Q5fBDKUbv_QXa6LN_BMzhvc1UmMywrwTnNmQtWDSo6u0igMuftcDdg13/exec';

            try {
                // We do a fire-and-forget or await depending on preference.
                // Using no-cors mode since Google Apps Script redirects.
                if (SCRIPT_URL) {
                    await fetch(SCRIPT_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    });
                } else {
                    console.warn("Please add your Google Apps Script URL to script.js to save data.");
                }
            } catch (error) {
                console.error("Error saving lead:", error);
                // We still let them in even if it fails to avoid blocking the user experience.
            }

            // Save flag and close modal
            localStorage.setItem('leadCaptured', 'true');
            leadModal.classList.remove('show');
            document.body.style.overflow = '';

            // Restore button just in case
            leadSubmitBtn.innerHTML = originalText;
            leadSubmitBtn.disabled = false;
        });
    }

});
