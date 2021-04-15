import "./Admin.css";
import React, { useState } from "react";
import Header from "../../components/Header/Header";
import ProductsAdmin from "../../components/ProductsAdmin/ProductsAdmin";

const Admin = () => {
  const [category, setCategory] = useState("View All");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  return (
    <>
      <Header
        changeCategory={(category) => setCategory(category)}
        changeMinPrice={(minPrice) => setMinPrice(minPrice)}
        changeMaxPrice={(maxPrice) => setMaxPrice(maxPrice)}
      />
      <ProductsAdmin
        category={category}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    </>
  );
};
export default Admin;
