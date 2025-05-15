import React from 'react';

// Header now accepts cartItemCount
function Header({ cartItemCount }) {
  return (
    <header className="custom-header py-3 bg-warning text-white">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <div className="logo d-flex align-items-center">
              <img src="/images/местерок.png" alt="Логотип МастерОК" className="me-2" style={{ height: '50px' }} />
              <a href="/" className="text-decoration-none text-black fs-4 fw-bold">МастерОК</a>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item me-4"><a href="#" className="nav-link text-black">Добавить</a></li>
                <li className="nav-item dropdown me-4">
                  <a href="#" className="nav-link text-black dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Акции
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Подарок папе</a></li>
                    <li><a className="dropdown-item" href="#">Супер цены</a></li>
                    <li><a className="dropdown-item" href="#">Постоянным клиентам</a></li>
                  </ul>
                </li>
                <li className="nav-item me-4"><a href="#" className="nav-link text-black">Контакты</a></li>
                <li className="nav-item me-4"><a href="#" className="nav-link text-black">Доставка</a></li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-black">
                    <i className="bi bi-cart"></i> Корзина
                    {cartItemCount > 0 && <span className="badge bg-danger ms-1">{cartItemCount}</span>}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header; 