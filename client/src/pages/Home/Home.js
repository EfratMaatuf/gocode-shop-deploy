import "./Home.css";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Products from "../../components/Products/Products";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("View All");
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState([0]);
  const [maxPrice, setMaxPrice] = useState([1000]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/products");
      const json = await res.json();
      setProducts(json);
    }
    fetchData();
  }, []);
  useEffect(() => {
    let categories1;
    const groupBy = (xs, key) =>
      xs.reduce((rv, x) => {
        rv[x[key]] = true || [];
        return rv;
      }, {});
    categories1 = Object.keys(groupBy(products, "category"));
    categories1.unshift("View All");
    setCategories(categories1);
  }, [products]);
  return (
    <>
      <Header
        categories={categories}
        changeCategory={(category) => setCategory(category)}
        changeMinPrice={(minPrice) => setMinPrice(minPrice)}
        changeMaxPrice={(maxPrice) => setMaxPrice(maxPrice)}
      />
      <Products
        products={products}
        category={category}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    </>
  );
};
export default Home;
