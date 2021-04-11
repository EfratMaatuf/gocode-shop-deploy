import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import ProductId from "./pages/ProductId/ProductId";
import IsAdminContext from "./contexts/IsAdminContext";
import ColorsContext, { Colors } from "./contexts/ColorsContext";
import ContactUs from "./pages/ContactUs/ContactUs";
import Admin from "./pages/Admin/Admin";
import LogInPopup from "./components/LogInPopup/LogInPopup";

const App = () => {
  const [colors, setColors] = useState(Colors.begin);
  const [showPopup, setShowPopup] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <IsAdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      <ColorsContext.Provider value={colors}>
        <button
          className="buttonChangeColor"
          onClick={() =>
            setColors(colors === Colors.begin ? Colors.change : Colors.begin)
          }
        >
          change color
        </button>
        <Router>
          <div
            style={{ background: colors.background, color: colors.foreground }}
          >
            <nav className="navApp">
              <span>
                <Link to="/">Home</Link>
                &nbsp; / &nbsp;
                <Link to="/contactUs">Contact Us</Link>
                &nbsp; / &nbsp;
                <Link to="/about">About </Link>
              </span>
              <span onClick={() => setShowPopup(!showPopup)}> Login</span>
              {showPopup ? <LogInPopup closePopup={togglePopup} /> : null}
            </nav>
            <Switch>
              <Route path="/product/:productId" component={ProductId}></Route>
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
  );
};
export default App;
