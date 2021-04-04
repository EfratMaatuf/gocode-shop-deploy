import React, { useState } from "react";
import "./NewProductAdmin.css";
import saleImage from "../Product/saleImage.png";

const NewProductAdmin = ({ categories }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState("");
  const [sale, setSale] = useState(false);

  const newProduct = async () => {
    console.log(
      "title:  " +
        title +
        "  category:  " +
        category +
        "  description:  " +
        description +
        "  price:  " +
        price +
        "  image:  " +
        image +
        "  sale:  " +
        sale
    );
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
    if (ans.Text === "OK!") {
      /* לעדכן את רשימת המוצרים*/
      setTitle("");
      setCategory("");
      setDescription("");
      setPrice(0);
      setImage("");
      setSale(false);
      alert("The product is added");
    } else {
      alert(ans.Text);
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
        {/* id="category" */}
        <input
          type="text"
          list="category"
          maxLength="20"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <datalist id="category">
          {categories.map((option, index) => (
            <option value={option} key={index} />
          ))}
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
      </td>
    </tr>
  );
};
export default NewProductAdmin;
