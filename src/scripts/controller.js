import { getProducts, deleteProduct, getBrands, getCategories } from './model.js';
import { createProductCard, clearProductList } from './view.js';
import { addToCart } from './cart.js';

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.product-list');
    if (!container) return;

    const brands = await getBrands();
    const products = await getProducts();
    const categories = await getCategories();

    clearProductList();
    products.forEach(p => container.appendChild(createProductCard(p, categories, brands)));

    container.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.dataset.id;
            await deleteProduct(id);
            e.target.closest('.col').remove();
        }
    });

    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const id = e.target.dataset.id;
            window.location.href = `add.html?id=${id}`;
        }
    });

    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            addToCart(e);
        }
    });
});