document.addEventListener("DOMContentLoaded", () => {
    
    const searchInput = document.querySelector(".search-input");
    const searchBtn = document.querySelector(".search-button");

    if (searchBtn && searchInput) {
        searchBtn.addEventListener("click", () => {
            const value = searchInput.value.trim();
            if (value === "") {
                alert("Please enter something!");
            } else {
                alert("Searching for: " + value);
            }
        });
    }

    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.querySelector(".arrow.right");
    const prevBtn = document.querySelector(".arrow.left");

    let index = 0;

    function updateSlidePosition() {
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            index = (index + 1) % slides.length;
            updateSlidePosition();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            index = (index - 1 + slides.length) % slides.length;
            updateSlidePosition();
        });
    }

    setInterval(() => {
        index = (index + 1) % slides.length;
        updateSlidePosition();
    }, 4000);

});

    const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
    const cartBadge = document.querySelector(".cart-badge");

    let cartCount = 0; 

    addToCartBtns.forEach(button => {
        button.addEventListener("click", function() {
            
            cartCount++;
            cartBadge.innerText = cartCount;

            cartBadge.style.transform = "scale(1.3)";
            setTimeout(() => { cartBadge.style.transform = "scale(1)"; }, 200);

            const originalText = this.innerText;
            this.classList.add("added");
            this.innerText = "Added!";

            setTimeout(() => {
                this.classList.remove("added");
                this.innerText = originalText;
            }, 2000);
        });
    });

    document.addEventListener("DOMContentLoaded", () => {
    
    let cart = [];
    
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartBadge = document.querySelector('.cart-badge');
    const navCartBtn = document.querySelector('.nav-cart');
    const closeCartBtn = document.getElementById('close-cart');

    navCartBtn.addEventListener('click', () => cartSidebar.classList.add('active'));
    closeCartBtn.addEventListener('click', () => cartSidebar.classList.remove('active'));

    const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
    
    addToCartBtns.forEach(button => {
        button.addEventListener("click", function() {

            const id = this.getAttribute("data-id");
            const name = this.getAttribute("data-name");
            const price = parseInt(this.getAttribute("data-price"));

            const existingItem = cart.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            const originalText = this.innerText;
            this.classList.add("added");
            this.innerText = "Added!";
            setTimeout(() => {
                this.classList.remove("added");
                this.innerText = originalText;
            }, 2000);

            renderCart();
            cartSidebar.classList.add('active');
        });
    });


    function renderCart() {
        cartItemsContainer.innerHTML = ''; 
        let grandTotal = 0;
        let totalItemsCount = 0;

        cart.forEach(item => {
            const rowTotal = item.price * item.quantity;
            grandTotal += rowTotal;
            totalItemsCount += item.quantity;


            const div = document.createElement('div');
            div.className = 'cart-item-row';
            div.innerHTML = `
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">
                    <b>₹${item.price.toLocaleString('en-IN')} × ${item.quantity} = ₹${rowTotal.toLocaleString('en-IN')}</b>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn minus" data-id="${item.id}">−</button>
                    <span class="qty">${item.quantity}</span>
                    <button class="qty-btn plus" data-id="${item.id}">+</button>
                    <span class="remove-btn" data-id="${item.id}">Remove</span>
                </div>
            `;
            cartItemsContainer.appendChild(div);
        });

       
        cartTotalElement.innerHTML = `<b>₹${grandTotal.toLocaleString('en-IN')}</b>`;
        if (cartBadge) cartBadge.innerText = totalItemsCount;


        document.querySelectorAll('.qty-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                cart.find(i => i.id === id).quantity += 1;
                renderCart();
            });
        });

    
        document.querySelectorAll('.qty-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const product = cart.find(i => i.id === id);
                if (product.quantity > 1) {
                    product.quantity -= 1;
                } else {
                    cart = cart.filter(i => i.id !== id); 
                }
                renderCart();
            });
        });

    
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                cart = cart.filter(i => i.id !== id); 
                renderCart();
            });
        });
    }
});


    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay'); 
    const navCartBtn = document.querySelector('.nav-cart');
    const closeCartBtn = document.getElementById('close-cart');


    navCartBtn.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active'); 
    });


    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });


    cartOverlay.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });


    const sideMenu = document.getElementById('side-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const openMenuBtn = document.querySelector('.menu-icon'); 
    const closeMenuBtn = document.getElementById('close-menu');


    if (openMenuBtn) {
        openMenuBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            sideMenu.classList.add('active');
            menuOverlay.classList.add('active');
        });
    }

   
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => {
            sideMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
    }


    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            sideMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
    }