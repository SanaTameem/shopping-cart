import React from 'react';
import { useSelector } from 'react-redux';
// import { removeFromCart } from '../redux/Products/ProductsSlice';
import CartItem from './CartItem';

function Cart() {
  // const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.product.products);
  const addedToCartProduct = allProducts.filter((item) => item.addedToCart === true);
  // const [cartTotal, setCartTotal] = useState(0);

  // useEffect(() => {
  //   const newCartTotal = addedToCartProduct.reduce(
  //     (total, item) => total + (item.price), 0,
  //   );
  //   setCartTotal(newCartTotal);
  // }, [addedToCartProduct]);

  localStorage.setItem('addedToCart', JSON.stringify(addedToCartProduct));
  return (
    <section className="cart-container">
      {addedToCartProduct.length === 0 ? (
        <div className="empty-card-container">
          <h2 className="empty-card-text">Your card is empty!</h2>
        </div>
      ) : (
        <>
          {addedToCartProduct.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          {/* <div className="total-amount-container">
            <h2>{cartTotal}</h2>
          </div> */}
        </>
      )}
    </section>
  );
}

export default Cart;
