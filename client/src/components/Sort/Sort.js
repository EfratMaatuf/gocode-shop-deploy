import React from "react";
import "./Sort.css";
import Filter from "../Filter/Filter";
import PropTypes from "prop-types";

const Sort = ({ changeCategory }) => {
  const optionsSort = [
    "Featured",
    "Best Selling",
    "Alphabetically, A-Z",
    "Alphabetically, Z-A",
    "Price, low to high",
    "Price, high to low",
    "Date, new to old",
    "Date, old to new",
  ];
  return (
    <div className="sort">
      <Filter changeCategory={(category) => changeCategory(category)} />
      <div className="collection-sort">
        <label>Sort by:</label>
        <select>
          {optionsSort.map((option, index) => (
            <option value="/" key={index}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
Sort.propTypes = {
  changeCategory: PropTypes.func,
};
export default Sort;
