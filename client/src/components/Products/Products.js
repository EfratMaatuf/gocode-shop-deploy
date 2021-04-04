import React, { useState } from "react";
import "./Products.css";
import SaleCountDown from "../SaleCountDown/SaleCountDown";
import Product from "../Product/Product";
import PropTypes from "prop-types";

const Products = ({ products, category, minPrice, maxPrice }) => {
  const [saleTime, setSaleTime] = useState(true);
  // const productsOnSale = [2, 3, 4, 7, 9, 12, 15, 16, 17, 18, 20]; //???
  let productsFilter;
  let productsFilterPrice;
  if (category !== "View All") {
    productsFilter = products.filter(
      ({ category: categoryPruduct }) => category === categoryPruduct
    );
  } else {
    productsFilter = products;
  }
  productsFilterPrice = productsFilter.filter(
    ({ price }) => price > minPrice && price < maxPrice
  );
  return (
    <section className="products">
      <SaleCountDown end={() => setSaleTime(false)} />
      {productsFilterPrice.map(({ _id, title, image, price, sale }) => (
        <Product
          key={_id}
          id={_id}
          title={title}
          image={image}
          price={price}
          sale={saleTime && sale}
        />
      ))}
    </section>
  );
};
Products.propTypes = {
  products: PropTypes.array,
  category: PropTypes.string,
  minPrice: PropTypes.number,
  maxPrice: PropTypes.number,
};
export default Products;
