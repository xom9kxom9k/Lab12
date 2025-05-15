import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, onEdit, onDelete, onAddToCart }) {
  if (!products || products.length === 0) {
    return <p>Товары не найдены.</p>;
  }

  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onEdit={onEdit} 
          onDelete={onDelete} 
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductList; 