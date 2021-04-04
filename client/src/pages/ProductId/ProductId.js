import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductId.css";

const ProductId = ({ match }) => {
  const [product, setProduct] = useState();
  useEffect(() => {
    fetch(`/api/products/${match.params.productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [match.params.productId]);
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
            <button className="buyNow">
              BUY <br />
              NOW
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
