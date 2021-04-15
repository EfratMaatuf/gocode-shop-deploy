import "./Home.css";
import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Products from "../../components/Products/Products";

const Home = () => {
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
      <Products category={category} minPrice={minPrice} maxPrice={maxPrice} />
    </>
  );
};
export default Home;
