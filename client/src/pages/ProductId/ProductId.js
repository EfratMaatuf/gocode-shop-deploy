import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartContext from "../../contexts/ShoppingCartContext";
import "./ProductId.css";

const ProductId = ({ match }) => {
  const [product, setProduct] = useState();
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext);
  let displayInCart;
  let newShoppingCart;
  let itemQuantity;
  useEffect(() => {
    fetch(`/api/products/${match.params.productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [match.params.productId]);

  const addToCard = () => {
    displayInCart = false;
    shoppingCart.map((item) => {
      if (item[0] === product.title) {
        displayInCart = true;
        itemQuantity = item[1];
        return true;
      }
      return false;
    });
    if (displayInCart) {
      newShoppingCart = shoppingCart.filter(
        (item) => item[0] !== product.title
      );
      setShoppingCart([...newShoppingCart, [product.title, itemQuantity + 1]]);
    } else {
      setShoppingCart([...shoppingCart, [product.title, 1]]);
    }
  };

  return (
    <>
      {product ? (
        <div className="card">
          &nbsp;
          <nav>
            <Link to="/" className="link">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <i className="iBack">&lt;</i>
              &nbsp;&nbsp;&nbsp;&nbsp;BACK TO ALL PRODUCTS
            </Link>
          </nav>
          <div className="product">
            <div className="divImgProductId">
              <img className="imgProductId" src={product.image} alt="" />
            </div>
            <h1 className="title">{product.title}</h1>
            <div className="description">{product.description}</div>
            <div className="price">{product.price}$</div>
            <button className="buyNow" onClick={addToCard}>
              Buy Now
            </button>
            <button className="buyNow" onClick={addToCard}>
              Add to Card
            </button>
          </div>
        </div>
      ) : (
        <div>Item does not exist</div>
      )}
    </>
  );
};
export default ProductId;
