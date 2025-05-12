export function addToCart(event) {
    const button = event.target;
    const productId = button.getAttribute('data-id');
    const productName = button.getAttribute('data-name');
    const productPrice = parseFloat(button.getAttribute('data-price'));

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

export function removeFromCart(event) {
    const button = event.target;
    const productId = button.getAttribute('data-id');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart = cart.filter(item => item.id !== productId);

    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartDisplay();
}

export function updateCartDisplay() {
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