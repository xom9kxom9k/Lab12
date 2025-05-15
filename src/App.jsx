import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductAddForm from './components/ProductAddForm';
import ProductEditForm from './components/ProductEditForm'; 


const CART_STORAGE_KEY = 'reactMasterokCart';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null); 
  const [sortOrder, setSortOrder] = useState('asc');
  

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      setError(null); 
    } catch (e) {
      setError(e.message);
      console.error("Failed to fetch products:", e);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSortByPrice = () => {
    const sorted = [...products].sort((a, b) => {
      return sortOrder === 'asc' 
        ? a.price - b.price 
        : b.price - a.price;
    });
    setProducts(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleProductAdded = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleEditProduct = useCallback((product) => {
    setEditingProduct(product);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setEditingProduct(null);
  }, []);

  const handleProductUpdated = useCallback(() => {
    fetchProducts();
    setEditingProduct(null);
  }, [fetchProducts]);

  const handleDeleteProduct = useCallback(async (productId) => {
    if (!window.confirm("Вы уверены, что хотите удалить этот товар?")) {
        return;
    }
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchProducts(); 
    } catch (e) {
      setError(e.message);
      console.error("Failed to delete product:", e);
    }
  }, [fetchProducts]);

  const handleAddToCart = useCallback((productToAdd) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productToAdd.id);
      if (existingItem) {
        alert(`${productToAdd.name} уже в корзине!`); 
        return prevCart; 
      } else {
        alert(`${productToAdd.name} добавлен в корзину!`);
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });
  }, []);

  return (
    <div className={`d-flex flex-column min-vh-100 ${editingProduct ? 'modal-open' : ''}`}>
      <Header cartItemCount={cart.reduce((count, item) => count + item.quantity, 0)} />
      <main className="flex-grow-1 py-4">
        <div className="container">
          <ProductAddForm onProductAdded={handleProductAdded} />
          <hr className="my-4"/>
          <h2 className="mb-4">Товары</h2>
          <button className="btn btn-outline-secondary mb-4" onClick={handleSortByPrice}>
          Сортировать по цене ({sortOrder === 'asc' ? 'возр.' : 'убыв.'})
          </button>
          {loading && <p>Загрузка товаров...</p>}
          {error && <div className="alert alert-danger">Ошибка: {error} <button onClick={fetchProducts} className='btn btn-sm btn-link'>Попробовать снова</button></div>}
          {!loading && !error && 
            <ProductList 
              products={products} 
              onEdit={handleEditProduct} 
              onDelete={handleDeleteProduct} 
              onAddToCart={handleAddToCart}
            />
          }
        </div>
      </main>
      <Footer />
      {editingProduct && (
        <ProductEditForm 
          product={editingProduct} 
          onProductUpdated={handleProductUpdated} 
          onClose={handleCloseEditModal} 
        />
      )}
      {editingProduct && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default App; 