const API_URL = 'http://localhost:3000/products';
const CATEGORIES_URL = 'http://localhost:3000/categories';
const BRANDS_URL = 'http://localhost:3000/brands';

export async function getProducts() {
    const res = await fetch(API_URL);
    return await res.json();
}

export async function getBrands() {
    const res = await fetch(BRANDS_URL);
    return await res.json();
}

export async function getCategories() {
    const res = await fetch(CATEGORIES_URL);
    return await res.json();
}

export async function addProduct(product) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(product)
    });
    return await res.json();
}

export async function deleteProduct(id) {
    await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
}