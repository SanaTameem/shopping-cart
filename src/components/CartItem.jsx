import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { removeFromCart } from '../redux/Products/ProductsSlice';

function CartItem({ item }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const storedQuantity = JSON.parse(localStorage.getItem(`quantity-${item.id}`));
    if (storedQuantity) {
      setQuantity(parseInt(storedQuantity, 10));
    }
  }, [item.id]);

  const saveQuantityToLocalStorage = (newQuantity) => {
    localStorage.setItem(`quantity-${item.id}`, JSON.stringify(newQuantity.toString()));
  };

  const handleInputChange = (e) => {
    const inputValue = parseInt(e.target.value, 10) || 0;
    setQuantity(inputValue);
    saveQuantityToLocalStorage(inputValue);
  };

  const decreaseAmount = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      saveQuantityToLocalStorage(quantity - 1);
    }
  };
  const increaseAmount = () => {
    setQuantity(quantity + 1);
    saveQuantityToLocalStorage(quantity + 1);
  };

  return (
    <div key={item.id} className="cart-item">
      <div className="cart-item-img-container">
        <img src={item.img} alt={item.name} />
      </div>
      <div className="cart-item-info-container">
        <p className="cart-item-name">{item.name}</p>
        <p className="price-per-item">{`Per Item Rp. ${item.price}`}</p>
      </div>
      <div className="counter-container">
        <button type="button" className="decrease-amount-btn" onClick={decreaseAmount}>-</button>
        <input type="text" className="quantity-input" value={quantity} onChange={handleInputChange} />
        <button type="button" className="increase-amount-btn" onClick={increaseAmount}>+</button>
      </div>
      <p className="cart-item-total-price">
        Total Rp.
        {item.price * quantity}
      </p>
      <button type="button" className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
