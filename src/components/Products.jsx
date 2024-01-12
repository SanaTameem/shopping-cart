import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct, addToCart } from '../redux/Products/ProductsSlice';

function Products() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.product.products);
  // const [product, setProduct] = useState([]);

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProduct());
    }
  }, [dispatch]);
  return (
    <section className="products-container">
      {allProducts.map((item) => (
        <div className="product-item" key={item.id}>
          <div className="product-img-container">
            <img className="product-img" src={`${item.img}`} alt={`${item.name}`} />
          </div>
          <div className="product-info">
            <h2 className="product-name">{item.name}</h2>
            <div className="price-btn-container">
              <h2 className="product-price">{`Rp. ${item.price}`}</h2>
              {!item.addedToCart ? (
                <button onClick={() => dispatch(addToCart(item.id))} type="button" className="add-to-cart-btn">Add To Cart</button>
              ) : (
                <button type="button" className="non-clickable-button">Added</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Products;
