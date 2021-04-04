import React from "react";
import "./ProductsAdmin.css";
import PropTypes from "prop-types";
import ProductAdmin from "../ProductAdmin/ProductAdmin";
import NewProductAdmin from "../NewProductAdmin/NewProductAdmin";

const ProductsAdmin = ({
  products,
  category,
  categories,
  minPrice,
  maxPrice,
}) => {
  let productsFilter;
  let productsFilterPrice;
  if (category !== "View All") {
    productsFilter = products.filter(
      ({ category: categoryPruduct }) => category === categoryPruduct
    );
  } else {
    productsFilter = products;
  }
  productsFilterPrice = productsFilter.filter(
    ({ price }) => price > minPrice && price < maxPrice
  );
  return (
    <table className="adminProducts">
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Description</th>
          <th>Price</th>
          <th>Image</th>
          <th>On sale?</th>
          <th>New/Update/Delete</th>
        </tr>
      </thead>
      <tbody>
        <NewProductAdmin categories={categories} />
        {productsFilterPrice.map(
          ({ _id, title, image, price, category, sale, description }) => (
            <ProductAdmin
              key={_id}
              id={_id}
              title={title}
              image={image}
              price={price}
              category={category}
              description={description}
              sale={sale}
            />
          )
        )}
      </tbody>
    </table>
  );
};
ProductsAdmin.propTypes = {
  products: PropTypes.array,
  category: PropTypes.string,
  categories: PropTypes.array,
  minPrice: PropTypes.number,
  maxPrice: PropTypes.number,
};
export default ProductsAdmin;
