import React, { useState, useEffect } from 'react';

function ProductEditForm({ product, onProductUpdated, onClose }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [brandId, setBrandId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price || '');
      setImageUrl(product.image || '');
      setBrandId(product.brandId || '');
      setCategoryId(product.categoryId || '');
      setError(null); 
      setSuccess(false); 
    } else {
      setName('');
      setPrice('');
      setImageUrl('');
      setError(null);
      setSuccess(false);
    }
    fetch('/api/brands').then(res => res.json()).then(setBrands).catch(console.error);
    fetch('/api/categories').then(res => res.json()).then(setCategories).catch(console.error);
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!product || !product.id) {
      setError("Товар для редактирования не выбран.");
      return;
    }

    const updatedProductData = {
      name,
      price: parseFloat(price),
      image: imageUrl,
      brandId,
      categoryId
    };

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProductData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || `HTTP error! status: ${response.status}`);
      }
      
      setSuccess(true);
      if (onProductUpdated) {
        onProductUpdated(); 
      }
    } catch (err) {
      setError(err.message);
      console.error("Failed to update product:", err);
    }
  };

  if (!product) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}> 
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Редактировать товар: {product.name}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">Товар успешно обновлен!</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="editProductName" className="form-label">Название товара</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="editProductName" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editProductPrice" className="form-label">Стоимость товара (руб.)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  id="editProductPrice" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editBrand" className="form-label">Бренд</label>
                <select className="form-select" id="editBrand" value={brandId} onChange={(e) => setBrandId(e.target.value)} required>
                  <option value="">Выберите бренд</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="editCategory" className="form-label">Категория</label>
                <select className="form-select" id="editCategory" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                  <option value="">Выберите категорию</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="editProductImageUrl" className="form-label">URL картинки товара</label>
                <input 
                  type="url" 
                  className="form-control" 
                  id="editProductImageUrl" 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)} 
                  required 
                />
              </div>
              <div className="modal-footer pb-0">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Отмена</button>
                <button type="submit" className="btn btn-primary">Сохранить изменения</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductEditForm; 