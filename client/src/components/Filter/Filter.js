import React, { useState } from "react";
import "./Filter.css";
import PropTypes from "prop-types";

const Filter = ({ options, changeCategory }) => {
  const [chosenCategory, setChosenCategory] = useState("View All");
  const handleChange = (event) => {
    const value = event.target.value;
    console.log("event.target.value:  " + value);
    if (value) {
      setChosenCategory(value);
      changeCategory(value);
    }
  };
  return (
    <div className="collection-sort">
      <label>Filter by:</label>
      <select value={chosenCategory} onChange={handleChange}>
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
Filter.propTypes = {
  options: PropTypes.array,
  changeCategory: PropTypes.func,
};
export default Filter;
