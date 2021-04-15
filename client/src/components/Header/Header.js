import React, { useState } from "react";
import "./Header.css";
import Sort from "../Sort/Sort";
import PropTypes from "prop-types";
import { Slider } from "antd";

const Header = ({ changeCategory, changeMinPrice, changeMaxPrice }) => {
  const [minPrice, setMinPrice] = useState([0]);
  const [maxPrice, setMaxPrice] = useState([1000]);

  function onChange(value) {
    console.log("onChange: ", value);
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  }

  function onAfterChange(value) {
    console.log("onAfterChange: ", value);
    changeMinPrice(value[0]);
    changeMaxPrice(value[1]);
  }

  return (
    <nav className="product-filter">
      <h1 className="titleHome">My Shop</h1>
      <Sort changeCategory={(category) => changeCategory(category)} />
      &nbsp;&nbsp;
      <label className="labelPrice">{minPrice}$</label>
      &nbsp;
      <Slider
        className="sliderPrice"
        style={{ width: "20%" }}
        range
        max={1000}
        step={10}
        defaultValue={[0, 1000]}
        onChange={onChange}
        onAfterChange={onAfterChange}
      />
      &nbsp;
      <label className="labelPrice">{maxPrice}$</label>
    </nav>
  );
};
Header.propTypes = {
  changeCategory: PropTypes.func,
  changeMinPrice: PropTypes.func,
  changeMaxPrice: PropTypes.func,
};
export default Header;
