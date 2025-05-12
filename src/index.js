import { addToCart, updateCartDisplay } from './scripts/cart.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const addToCartButtons = document.querySelectorAll('.btn.btn-primary.add-to-cart-btn');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);

        const productId = button.getAttribute('data-id');
        const isInCart = cart.some(item => item.id === productId);

        if (isInCart) {
            button.textContent = 'В корзине';
            button.classList.add('added-to-cart');
            button.disabled = true;
        }
    });

    if (window.location.pathname.includes('basket.html')) {
        updateCartDisplay();

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
