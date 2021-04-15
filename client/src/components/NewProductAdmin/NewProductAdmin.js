import React, { useContext, useState } from "react";
import "./NewProductAdmin.css";
import saleImage from "../Product/saleImage.png";
import ProductsContext from "../../contexts/ProductsContext";
import CategoriesContext from "../../contexts/CategoriesContext";
import MessagePopup from "../MessagePopup/MessagePopup";

const NewProductAdmin = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState("");
  const [sale, setSale] = useState(false);
  const { products, setProducts } = useContext(ProductsContext);
  const { categories } = useContext(CategoriesContext);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const newProduct = async () => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        category: category,
        description: description,
        price: price,
        image: image,
        sale: sale,
      }),
    });
    const ans = await res.json();
    if (ans.Text) {
      setMessage(ans.Text);
      setShowPopup(true);
    } else {
      setMessage("The product is added");
      setShowPopup(true);
      setProducts([ans, ...products]);
      setTitle("");
      setCategory("");
      setDescription("");
      setPrice("");
      setImage("");
      setSale(false);
    }
  };
  return (
    <tr>
      <td>
        <textarea
          id="title"
          value={title}
          rows="5"
          cols="25"
          onChange={(e) => setTitle(e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          list="category"
          maxLength="20"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <datalist id="category">
          {categories.map(
            (option, index) =>
              option !== "View All" && <option value={option} key={index} />
          )}
        </datalist>
      </td>
      <td>
        <textarea
          id="description"
          value={description}
          rows="5"
          cols="25"
          onChange={(e) => setDescription(e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          id="price"
          value={price}
          min="0"
          max="1000"
          onChange={(e) => setPrice(e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <div className="divForImg">
          <img src={image} alt="" className="imgAdmin" />
        </div>
      </td>
      <td>
        <input
          type="checkbox"
          id="onSale"
          checked={sale}
          onChange={() => {
            setSale(!sale);
          }}
        />
        <br />
        {sale && <img src={saleImage} alt="" className="saleImageAdmin" />}
      </td>
      <td>
        <button className="newProduct" onClick={newProduct}>
          New product
        </button>
        {showPopup && (
          <MessagePopup closePopup={togglePopup} message={message} />
        )}
      </td>
    </tr>
  );
};
export default NewProductAdmin;
