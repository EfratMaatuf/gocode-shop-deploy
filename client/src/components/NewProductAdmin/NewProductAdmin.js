import React from "react";
import "./NewProductAdmin.css";
// import PropTypes from "prop-types";

const NewProductAdmin = () => {
  return (
    <tr>
      <td>
        <input type="text" id="title" name="title" />
      </td>
      <td>
        <input type="text" id="category" name="category" />
      </td>
      <td>
        <textarea id="w3review" name="w3review" rows="5" cols="25" />
      </td>
      <td>
        <input type="number" id="price" name="price" min="0" max="1000" />
      </td>
      <td>
        <input type="text" id="title" name="title" />
        <img src="" alt="" />
      </td>
      <td>
        <input type="checkbox" id="onSale" />

        {/* {onSale ? (
            <input type="checkbox" id="onSale" checked />
          ) : (
            <input type="checkbox" id="onSale" />
          )} */}
      </td>
      <td>
        <button className="newProduct">New product</button>
      </td>
    </tr>
  );
};
export default NewProductAdmin;
