import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../redux/Products/ProductsSlice';

function Cart() {
  const [quantity, setQuantity] = useState(1);
  const decreaseAmount = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const increaseAmount = () => {
    setQuantity(quantity + 1);
  };

  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.product.products);
  const addedToCartProduct = allProducts.filter((item) => item.addedToCart === true);
  return (
    <section className="cart-container">
      {addedToCartProduct.length === 0 ? (
        <div className="empty-card-container">
          <h2 className="empty-card-text">Your card is empty!</h2>
        </div>
      ) : (
        addedToCartProduct.map((item) => (
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
              <input type="number" className="quantity-input" value={quantity} />
              <button type="button" className="increase-amount-btn" onClick={increaseAmount}>+</button>
            </div>
            <p className="cart-item-total-price">
              Total Rp.
              {item.price * quantity}
            </p>
            <button type="button" className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
          </div>
        ))
      )}
    </section>
  );
}

export default Cart;
