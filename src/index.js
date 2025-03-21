document.addEventListener('DOMContentLoaded', () => {

    function addToCart(event) {
        const button = event.target;
        const productId = button.getAttribute('data-id');
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProduct = cart.find(item => item.id === productId);
        if (!existingProduct) {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            });

            localStorage.setItem('cart', JSON.stringify(cart));

            button.textContent = 'В корзине';
            button.classList.add('added-to-cart');
            button.disabled = true;
        }

        if (window.location.pathname.includes('basket.html')) {
            updateCartDisplay();
        }
    }

    function removeFromCart(event) {
        const button = event.target;
        const productId = button.getAttribute('data-id');

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart = cart.filter(item => item.id !== productId);

        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartDisplay();
    }
    
    function updateCartDisplay() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsContainer = document.getElementById('cart-items');
        const itemCountElement = document.getElementById('item-count');
        const totalPriceElement = document.getElementById('total-price');

        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';

            let totalPrice = 0;

            cart.forEach(item => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                li.innerHTML = `
                    <span>${item.name} - ${item.price} руб. (${item.quantity} шт.)</span>
                    <button class="btn btn-danger btn-sm remove-from-cart" data-id="${item.id}">Удалить</button>
                `;
                cartItemsContainer.appendChild(li);

                totalPrice += item.price * item.quantity;
            });

            if (itemCountElement) {
                itemCountElement.textContent = cart.length;
            }

            if (totalPriceElement) {
                totalPriceElement.textContent = totalPrice.toFixed(2);
            }

            document.querySelectorAll('.remove-from-cart').forEach(button => {
                button.addEventListener('click', removeFromCart);
            });
        }
    }

    const addToCartButtons = document.querySelectorAll('.btn.btn-warning');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (window.location.pathname.includes('basket.html')) {
        updateCartDisplay();
    }

    addToCartButtons.forEach(button => {
        const productId = button.getAttribute('data-id');
        const isInCart = cart.some(item => item.id === productId);

        if (isInCart) {
            button.textContent = 'В корзине';
            button.classList.add('added-to-cart');
            button.disabled = true;
        }
    });
    
    const checkoutButton = document.getElementById('checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

            const modalTotalPrice = document.getElementById('modal-total-price');
            if (modalTotalPrice) {
                modalTotalPrice.textContent = totalPrice.toFixed(2);
            }

            const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
            checkoutModal.show();
        });
    }

    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const phone = document.getElementById('phone').value;

            if (!firstName || !lastName || !phone) {
                alert('Пожалуйста, заполните все поля!');
                return;
            }

            const order = {
                firstName,
                lastName,
                phone,
                cart: JSON.parse(localStorage.getItem('cart')) || [],
                totalPrice: document.getElementById('modal-total-price').textContent
            };

            console.log('Заказ оформлен:', order);

            localStorage.removeItem('cart');

            const checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
            checkoutModal.hide();

            alert('Заказ успешно оформлен! Спасибо за покупку!');

            updateCartDisplay();
        });
    }
    document.getElementById('addProductForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productImageUrl = document.getElementById('productImageUrl').value;
    
        const newProductCard = document.createElement('div');
        newProductCard.className = 'col';
    
        newProductCard.innerHTML = `
            <div class="card h-100">
                <img src="${productImageUrl}" class="card-img-top" alt="${productName}" width="200" height="300">
                <div class="card-body">
                    <h5 class="card-title">${productName}</h5>
                    <p class="card-text text-warning fw-bold">${productPrice} руб.</p>
                    <button class="btn btn-warning" data-id="${Date.now()}" data-name="${productName}" data-price="${productPrice}">В корзину</button>
                </div>
            </div>
        `;
    
        document.querySelector('.row.row-cols-1.row-cols-md-3.row-cols-lg-4.g-4').appendChild(newProductCard);

        document.getElementById('addProductForm').reset();
    });
});
