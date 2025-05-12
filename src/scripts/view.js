export function createProductCard(product, categories, brands) {
    const div = document.createElement('div');
    div.className = 'col';

    const category = categories.find(cat => cat.id == product.categoryId);

    const brand = brands.find(br => br.id == product.brandId)

    div.innerHTML = `
    <div class="card h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.name}" width="200" height="300">
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text text-warning fw-bold fs-5">${product.price} руб.</p>
            <p class="card-text">${category ? category.name : 'Не указана'}</p>
            <p class="card-text">${brand ? brand.name : 'Не указан'}</p>
            <div class="d-grid gap-2">
                <button class="btn btn-warning btn-sm edit-btn" data-id="${product.id}">
                    <i class="bi bi-pencil"></i> Редактировать
                </button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${product.id}">
                    <i class="bi bi-trash"></i> Удалить
                </button>
                <button class="btn btn-success btn-sm add-to-cart-btn"
                    data-id="${product.id}"
                    data-name="${product.name}"
                    data-price="${product.price}">
                    <i class="bi bi-cart-plus"></i> В корзину
                </button>
            </div>
        </div>
    </div>`;
    return div;
}

export function clearProductList() {
    document.querySelector('.product-list')?.replaceChildren();
}