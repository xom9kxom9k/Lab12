import React, { useState, useEffect  } from 'react';

function ProductAddForm({ onProductAdded }) {
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
    fetch('/api/brands')
      .then(res => res.json())
      .then(setBrands)
      .catch(console.error);

    fetch('/api/categories')
      .then(res => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const newProduct = {
      name,
      price: parseFloat(price), 
      image: imageUrl,
      brandId,
      categoryId
    };

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || `HTTP error! status: ${response.status}`);
      }
      
      setSuccess(true);
      setName('');
      setPrice('');
      setImageUrl('');
      setBrandId('');
      setCategoryId('');
      if (onProductAdded) {
        onProductAdded(); 
      }
    } catch (err) {
      setError(err.message);
      console.error("Failed to add product:", err);
    }
  };

  return (
    <div className="accordion mb-3" id="addProductAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button 
            className="accordion-button collapsed" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#collapseOne" 
            aria-expanded="false" 
            aria-controls="collapseOne"
          >
            Форма добавления товара
          </button>
        </h2>
        <div 
          id="collapseOne" 
          className="accordion-collapse collapse" 
          aria-labelledby="headingOne" 
          data-bs-parent="#addProductAccordion"
        >
          <div className="accordion-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">Товар успешно добавлен!</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">Название товара</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="productName" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="productPrice" className="form-label">Стоимость товара (руб.)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  id="productPrice" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="brandSelect" className="form-label">Бренд</label>
                <select className="form-select" id="brandSelect" value={brandId} onChange={(e) => setBrandId(e.target.value)} required>
                  <option value="">Выберите бренд</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="categorySelect" className="form-label">Категория</label>
                <select className="form-select" id="categorySelect" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                  <option value="">Выберите категорию</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="productImageUrl" className="form-label">URL картинки товара</label>
                <input 
                  type="url" 
                  className="form-control" 
                  id="productImageUrl" 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary">Добавить товар</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAddForm; 