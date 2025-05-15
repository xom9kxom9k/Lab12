import React, { useEffect, useState } from 'react';

function ProductCard({ product, onEdit, onDelete, onAddToCart }) {
  const imageUrl = product.image ? product.image : 'https://via.placeholder.com/300x200.png?text=No+Image';
  const regularPrice = parseFloat(product.price);
  const discountPrice = product.discountPrice ? parseFloat(product.discountPrice) : null;
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const isOnSale = discountPrice !== null && discountPrice < regularPrice;
  useEffect(() => {
    fetch(`/api/brands/${product.brandId}`)
      .then(res => res.json())
      .then(setBrand)
      .catch(console.error);

    fetch(`/api/categories/${product.categoryId}`)
      .then(res => res.json())
      .then(setCategory)
      .catch(console.error);
  }, [product]);
  return (
    <div className="col">
      <div className={`card h-100 ${isOnSale ? 'border-danger' : ''}`}>
        {isOnSale && (
          <span 
            className="position-absolute top-0 start-0 bg-danger text-white p-1 px-2"
            style={{ fontSize: '0.8em', borderBottomRightRadius: '0.25rem' }}
          >
            Акция!
          </span>
        )}
        <img 
          src={imageUrl} 
          className="card-img-top" 
          alt={product.name} 
          style={{ height: '200px', objectFit: 'cover' }}
          onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/300x200.png?text=Image+Error'; }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          {brand && <p className="card-text"><strong>Бренд:</strong> {brand.name}</p>}
          {category && <p className="card-text"><strong>Категория:</strong> {category.name}</p>}
          <div>
            {isOnSale ? (
              <>
                <p className="card-text text-danger fw-bold mb-0" style={{ fontSize: '1.2em' }}>
                  {discountPrice.toFixed(2)} руб.
                </p>
                <p className="card-text text-muted text-decoration-line-through" style={{ fontSize: '0.9em' }}>
                  {regularPrice.toFixed(2)} руб.
                </p>
              </>
            ) : (
              <p className="card-text text-warning fw-bold">{regularPrice.toFixed(2)} руб.</p>
            )}
          </div>
          <div className="mt-auto pt-2"> {}
            <button 
              className="btn btn-warning w-100 mb-2" 
              onClick={() => onAddToCart(product)}
            >
              В корзину
            </button>
            <div className="d-flex justify-content-between">
              <button 
                className="btn btn-outline-primary btn-sm" 
                onClick={() => onEdit(product)}
              >
                <i className="bi bi-pencil-square"></i> Редактировать
              </button>
              <button 
                className="btn btn-outline-danger btn-sm" 
                onClick={() => onDelete(product.id)}
              >
                <i className="bi bi-trash"></i> Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;