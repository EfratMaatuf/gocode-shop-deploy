import React, { useContext, useState } from "react";
import "./Filter.css";
import PropTypes from "prop-types";
import CategoriesContext from "../../contexts/CategoriesContext";

const Filter = ({ changeCategory }) => {
  const [chosenCategory, setChosenCategory] = useState("View All");
  const { categories } = useContext(CategoriesContext);

  const handleChange = (event) => {
    const value = event.target.value;
    if (value) {
      setChosenCategory(value);
      changeCategory(value);
    }
  };
  return (
    <div className="collection-sort">
      <label>Filter by:</label>
      <select value={chosenCategory} onChange={handleChange}>
        {categories.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
Filter.propTypes = {
  changeCategory: PropTypes.func,
};
export default Filter;
