import React from "react";
import "./Product.css";
import PropTypes from "prop-types";
import saleImage from "./saleImage.png";
import { Link } from "react-router-dom";

const Product = ({ id, title, image, price, sale }) => {
  const style = {
    color: sale ? "red" : "black",
    fontWeight: sale ? "bold" : "normal",
  };

  return (
    <div className="product-card">
      <Link to={`/product/${id}`}>
        <div className="product-image">
          <img className="imgProduct" src={image} alt="img"></img>
        </div>
        {sale && (
          <img className="product-sale" src={saleImage} alt="sale"></img>
        )}
        <div className="product-info">
          <h5>{title}</h5>
          <h6 style={style}>{price}$</h6>
        </div>
      </Link>
    </div>
  );
};
Product.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  sale: PropTypes.bool,
};
export default Product;
