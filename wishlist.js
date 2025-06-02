document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const searchIcon = document.getElementById('searchIcon');
    const searchBar = document.getElementById('searchBar');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener("click", function () {
            this.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        const navLinks = document.querySelectorAll(".nav-menu a");
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenuToggle.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });

        document.addEventListener("click", (event) => {
            if (!mobileMenuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                mobileMenuToggle.classList.remove("active");
                navMenu.classList.remove("active");
            }
        });
    }

    // Search functionality
    if (searchIcon && searchBar) {
        searchIcon.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                searchBar.classList.toggle('active');
                if (searchBar.classList.contains('active')) {
                    searchBar.focus();
                }
            }
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && !e.target.closest('.search-wrapper')) {
                searchBar.classList.remove('active');
            }
        });
    }

    // Wait a moment for the header to be fully injected before initializing cart
    setTimeout(() => {
        initializeCart();
        loadWishlistItems();
    }, 100);
});

// Cart variables
let cart_arr = [];
let cnt_cart = 0;

// Wishlist variables
let wishlist_arr = [];

function initializeCart() {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('flutura_cart');
    if (savedCart) {
        cart_arr = JSON.parse(savedCart);
        cnt_cart = cart_arr.reduce((total, item) => total + item.quantity, 0);
        updateCartBadge();
    }

    // Cart overlay event listeners
    const cartOverlay = document.getElementById('cartOverlay');
    const cartClose = document.getElementById('cartClose');
    
    // Event delegation for cart icons - this will work even if elements are added dynamically
    document.addEventListener('click', function(e) {
        // Check if clicked element is a cart icon
        if (e.target.closest('img[alt="Cart"], .cart-icon, #cart-icon')) {
            console.log("Cart icon clicked via delegation");
            e.preventDefault();
            openCart();
        }
    });

    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', (e) => {
            if (e.target === cartOverlay) {
                closeCart();
            }
        });
    }

    // Checkout button functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('checkout-btn')) {
            alert('Checkout functionality would be implemented here!');
        }
    });
}

function openCart() {
    console.log("Opening cart");
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        renderCartItems();
    } else {
        console.error("Cart overlay element not found");
    }
}

function closeCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function addToCart(item) {
    const existingItem = cart_arr.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart_arr.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
        });
    }
    
    cnt_cart = cart_arr.reduce((total, item) => total + item.quantity, 0);
    updateCartBadge();
    saveCartToStorage();
    
    // Show feedback
    showCartFeedback('Item added to cart!');
}

function removeFromCart(itemId) {
    cart_arr = cart_arr.filter(item => item.id !== itemId);
    cnt_cart = cart_arr.reduce((total, item) => total + item.quantity, 0);
    updateCartBadge();
    saveCartToStorage();
    renderCartItems();
}

function updateCartQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(itemId);
        return;
    }
    
    const item = cart_arr.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        cnt_cart = cart_arr.reduce((total, item) => total + item.quantity, 0);
        updateCartBadge();
        saveCartToStorage();
        renderCartItems();
    }
}

function renderCartItems() {
    const cartContent = document.getElementById('cartContent');
    const cartFooter = document.getElementById('cartFooter');
    
    if (!cartContent) return;
    
    if (cart_arr.length === 0) {
        cartContent.innerHTML = `
            <div class="cart-empty">
                <p>Your cart is empty</p>
                <p>Add some beautiful jewelry to get started!</p>
            </div>
        `;
        if (cartFooter) cartFooter.style.display = 'none';
        return;
    }
    
    if (cartFooter) cartFooter.style.display = 'block';
    
    const cartItemsHTML = cart_arr.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-item-price">$${item.price}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">&times;</button>
        </div>
    `).join('');
    
    cartContent.innerHTML = cartItemsHTML;
    
    // Update total
    const total = cart_arr.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    const cartTotalAmount = document.getElementById('cartTotalAmount');
    if (cartTotalAmount) {
        cartTotalAmount.textContent = `$${total.toFixed(2)}`;
    }
}

function updateCartBadge() {
    // Update cart badge if it exists
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        if (cnt_cart > 0) {
            cartBadge.textContent = cnt_cart;
            cartBadge.style.display = 'block';
        } else {
            cartBadge.style.display = 'none';
        }
    }
}

function saveCartToStorage() {
    localStorage.setItem('flutura_cart', JSON.stringify(cart_arr));
}

function showCartFeedback(message) {
    // Create and show a temporary feedback message
    const feedback = document.createElement('div');
    feedback.className = 'cart-feedback';
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 300);
    }, 2000);
}

// Wishlist functionality
function loadWishlistItems() {
    const savedWishlist = localStorage.getItem('flutura_wishlist');
    if (savedWishlist) {
        wishlist_arr = JSON.parse(savedWishlist);
        renderWishlistItems();
    } else {
        renderEmptyWishlist();
    }
}

function renderWishlistItems() {
    const wishlistContainer = document.getElementById('wishlistItems');
    if (!wishlistContainer) return;

    if (wishlist_arr.length === 0) {
        renderEmptyWishlist();
        return;
    }

    const wishlistHTML = wishlist_arr.map(item => `
        <div class="wishlist-item" data-id="${item.id}">
            <div class="wishlist-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="wishlist-item-details">
                <h3>${item.name}</h3>
                <p class="price">$${item.price}</p>
                <div class="wishlist-item-actions">
                    <button class="add-to-cart-btn" onclick="addToCartFromWishlist('${item.id}')">Add to Cart</button>
                    <button class="remove-from-wishlist-btn" onclick="removeFromWishlist('${item.id}')">Remove</button>
                </div>
            </div>
        </div>
    `).join('');

    wishlistContainer.innerHTML = wishlistHTML;
}

function renderEmptyWishlist() {
    const wishlistContainer = document.getElementById('wishlistItems');
    if (!wishlistContainer) return;

    wishlistContainer.innerHTML = `
        <div class="empty-wishlist">
            <h3>Your wishlist is empty</h3>
            <p>Start adding items you love to see them here!</p>
            <a href="index.html" class="continue-shopping-btn">Continue Shopping</a>
        </div>
    `;
}

function addToCartFromWishlist(itemId) {
    const item = wishlist_arr.find(wishlistItem => wishlistItem.id === itemId);
    if (item) {
        addToCart(item);
    }
}

function removeFromWishlist(itemId) {
    wishlist_arr = wishlist_arr.filter(item => item.id !== itemId);
    localStorage.setItem('flutura_wishlist', JSON.stringify(wishlist_arr));
    renderWishlistItems();
    
    // Show feedback
    showCartFeedback('Item removed from wishlist!');
}

// Add CSS animations for feedback
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
