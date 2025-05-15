import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto"> {/* mt-auto for sticky footer with flex */}
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-6 mb-4 mb-md-0">
            <h3>Контактная информация</h3>
            <p>Адрес: г. Ульяновск, ул. Северный венец, д. 32, к. 3</p>
            <p>Телефон: +7 (999) 99-99-90</p>
            <p>Email: masterok@mail.ru</p>
          </div>
          <div className="col-md-6 text-md-end">
            <h3>Мы в соцсетях</h3>
            {/* Assuming images are in public/images or handled via Vite's public directory feature */}
            <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="me-2">
              {/* <img src="/images/tg.png" alt="Telegram" style={{ width: '32px' }} /> */}
              <i className="bi bi-telegram" style={{ fontSize: '32px' }}></i> {/* Using Bootstrap Icon */}
            </a>
            <a href="https://vk.com/" target="_blank" rel="noopener noreferrer">
              {/* <img src="/images/vk.png" alt="VK" style={{ width: '32px' }} /> */}
              <i className="bi bi-facebook" style={{ fontSize: '32px' }}></i> {/* Placeholder, use bi-vk if available or custom SVG */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 