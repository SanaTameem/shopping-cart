import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const allProducts = useSelector((state) => state.product.products);
  const addedToCartProducts = allProducts.filter((item) => item.addedToCart === true);
  const location = useLocation();
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="navbar-list">
          <Link to="/" className={`link-nav-item ${location.pathname === '/' ? 'active' : ''}`}><li className="nav-item">Market</li></Link>
          <Link to="/cart" className={`link-nav-item ${location.pathname === '/cart' ? 'active' : ''}`}>
            <li className="nav-item">
              <span>Cart</span>
              <FontAwesomeIcon icon={faCartShopping} />
              <span className="nav-icon-counter">
                { addedToCartProducts.length > 0 ? `(${addedToCartProducts.length})` : '(0)'}
              </span>
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
