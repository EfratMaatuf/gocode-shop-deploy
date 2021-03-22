import React, { useState } from "react";
import "./ProductAdmin.css";
import PropTypes from "prop-types";

const ProductAdmin = ({
  id,
  title,
  category,
  image,
  price,
  sale,
  description,
}) => {
  const [onSale, setOnSale] = useState(sale);
  return (
    <tr>
      <td>
        <input type="text" id="title" name="title" value={title} />
      </td>
      <td>
        <input type="text" id="category" name="category" value={category} />
      </td>
      <td>
        <textarea id="w3review" name="w3review" rows="4" cols="50">
          {description}
        </textarea>
      </td>
      <td>
        <input
          type="number"
          id="price"
          name="price"
          min="0"
          max="1000"
          value={price}
        />
      </td>
      <td>
        <input type="text" id="title" name="title" />
        {/* //value //??? */}
        <img src={image} alt="" />
      </td>
      <td>
        {onSale ? (
          <input type="checkbox" id="onSale" checked />
        ) : (
          <input type="checkbox" id="onSale" />
        )}
      </td>
      <td>
        <button>update</button>
        <button> delete</button>
      </td>
    </tr>
  );
};
ProductAdmin.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  sale: PropTypes.bool,
};
export default ProductAdmin;
