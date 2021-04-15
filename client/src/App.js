import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import ProductId from "./pages/ProductId/ProductId";
import ProductsContext from "./contexts/ProductsContext";
import CategoriesContext from "./contexts/CategoriesContext";
import IsAdminContext from "./contexts/IsAdminContext";
import ColorsContext, { Colors } from "./contexts/ColorsContext";
import ContactUs from "./pages/ContactUs/ContactUs";
import Admin from "./pages/Admin/Admin";
import LogInPopup from "./components/LogInPopup/LogInPopup";
import ShoppingCart from "./ShoppingCart.png";
import ShoppingCartContext from "./contexts/ShoppingCartContext";

import createPersistedState from "use-persisted-state";
const useCounterState = createPersistedState("ShoppingCart");

const App = () => {
  const [shoppingCart, setShoppingCart] = useCounterState([]);
  const [numberItems, setNumberItems] = useState(0);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [colors, setColors] = useState(Colors.begin);
  const [showPopup, setShowPopup] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/products");
      const json = await res.json();
      setProducts(json);
    }
    fetchData();
  }, []);
  useEffect(() => {
    let categories1;
    const groupBy = (xs, key) =>
      xs.reduce((rv, x) => {
        rv[x[key]] = true || [];
        return rv;
      }, {});
    categories1 = Object.keys(groupBy(products, "category"));
    categories1.unshift("View All");
    setCategories(categories1);
  }, [products]);
  useEffect(() => {
    let num = 0;
    shoppingCart.forEach((item) => {
      num = num + item[1];
    });
    setNumberItems(num);
  }, [shoppingCart]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      <CategoriesContext.Provider value={{ categories, setCategories }}>
        <ShoppingCartContext.Provider value={{ shoppingCart, setShoppingCart }}>
          <IsAdminContext.Provider value={{ isAdmin, setIsAdmin }}>
            <ColorsContext.Provider value={colors}>
              <button
                className="buttonChangeColor"
                onClick={() =>
                  setColors(
                    colors === Colors.begin ? Colors.change : Colors.begin
                  )
                }
              >
                change color
              </button>
              <Router>
                <div
                  style={{
                    background: colors.background,
                    color: colors.foreground,
                  }}
                >
                  <nav className="navApp">
                    <span>
                      <Link to="/">Home</Link>
                      &nbsp; / &nbsp;
                      <Link to="/contactUs">Contact Us</Link>
                      &nbsp; / &nbsp;
                      <Link to="/about">About </Link>
                      &nbsp; / &nbsp;
                      <span onClick={() => setShowPopup(!showPopup)}>
                        &nbsp;Login
                      </span>
                      {showPopup && <LogInPopup closePopup={togglePopup} />}
                    </span>
                    <span>
                      <img
                        src={ShoppingCart}
                        alt=""
                        className="shoppingCartImg"
                      />
                      <span className="numSelectedItems">
                        &nbsp;{numberItems}&nbsp;
                      </span>
                    </span>
                  </nav>
                  <Switch>
                    <Route
                      path="/product/:productId"
                      component={ProductId}
                    ></Route>
                    <Route path="/about">
                      <About />
                    </Route>
                    <Route path="/contactUs">
                      <ContactUs />
                    </Route>
                    {isAdmin && (
                      <Route path="/admin">
                        <Admin />
                      </Route>
                    )}
                    <Route path="/">
                      <Home />
                    </Route>
                  </Switch>
                </div>
              </Router>
            </ColorsContext.Provider>
          </IsAdminContext.Provider>
        </ShoppingCartContext.Provider>
      </CategoriesContext.Provider>
    </ProductsContext.Provider>
  );
};
export default App;
