import React, { useContext, useState } from "react";
import "./ProductAdmin.css";
import saleImage from "../Product/saleImage.png";
import PropTypes from "prop-types";
import ProductsContext from "../../contexts/ProductsContext";
import MessagePopup from "../MessagePopup/MessagePopup";

const ProductAdmin = ({
  id,
  title,
  category,
  image,
  price,
  sale,
  description,
}) => {
  const { products, setProducts } = useContext(ProductsContext);
  const [chengeTitle, setChengeTitle] = useState(title);
  const [chengeCategory, setChengeCategory] = useState(category);
  const [chengeDescription, setChengeDescription] = useState(description);
  const [chengePrice, setChengePrice] = useState(price);
  const [chengeImage, setChengeImage] = useState(image);
  const [onSale, setOnSale] = useState(sale);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const updateProduct = async () => {
    const res = await fetch("/api/products/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: chengeTitle,
        category: chengeCategory,
        description: chengeDescription,
        price: chengePrice,
        image: chengeImage,
        sale: onSale,
      }),
    });
    const ans = await res.json();
    console.log("ans in update:");
    console.log(ans);
    if (ans.Text) {
      setMessage("Updated");
      console.log(message);
      setShowPopup(true);
      console.log(showPopup);
    }
  };
  const deleteProduct = async () => {
    const res = await fetch("/api/products/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const ans = await res.json();
    console.log("ans in deleted:");
    console.log(ans);
    if (ans.Text) {
      setProducts(products.filter(({ _id }) => _id !== id));
      setMessage("Product deleted");
      console.log(message);
      setShowPopup(true);
      console.log(showPopup);
      alert("Product deleted");
    }
  };
  return (
    <tr>
      <td>
        <textarea
          id="title"
          name="title"
          rows="5"
          cols="25"
          value={chengeTitle}
          onChange={(e) => setChengeTitle(e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          id="category"
          name="category"
          value={chengeCategory}
          onChange={(e) => setChengeCategory(e.target.value)}
        />
      </td>
      <td>
        <textarea
          id="description"
          name="description"
          rows="5"
          cols="25"
          value={chengeDescription}
          onChange={(e) => setChengeDescription(e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          id="price"
          min="0"
          max="1000"
          value={chengePrice}
          onChange={(e) => setChengePrice(e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          id="image"
          value={chengeImage}
          onChange={(e) => setChengeImage(e.target.value)}
        />
        <div className="divForImg">
          <img src={chengeImage} alt="" className="imgAdmin" />
        </div>
      </td>
      <td>
        <input
          type="checkbox"
          id="onSale"
          checked={onSale}
          onChange={() => {
            setOnSale(!onSale);
          }}
        />
        <br />
        {onSale && <img src={saleImage} alt="" className="saleImageAdmin" />}
      </td>
      <td>
        <button
          className="updateProduct"
          onClick={() => {
            if (window.confirm("You are sure you want to delete this item?"))
              updateProduct();
          }}
        >
          update
        </button>
        <br />
        <button
          className="deleteProduct"
          onClick={() => {
            if (window.confirm("You are sure you want to delete this item?"))
              deleteProduct();
          }}
        >
          delete
        </button>
        {showPopup && (
          <MessagePopup closePopup={togglePopup} message={message} />
        )}
      </td>
    </tr>
  );
};
ProductAdmin.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  sale: PropTypes.bool,
};
export default ProductAdmin;
