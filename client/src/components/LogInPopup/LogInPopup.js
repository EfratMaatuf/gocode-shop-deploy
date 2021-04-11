import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import IsAdminContext from "../../contexts/IsAdminContext";
import "./LogInPopup.css";

const LogInPopup = ({ closePopup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { setIsAdmin } = useContext(IsAdminContext);
  const history = useHistory();

  const logIn = async (e) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const ans = await res.json();
    if (ans.Text === "Admin") {
      setIsAdmin(true);
      closePopup();
      history.push("/admin");
    } else {
      setError(true);
      setMessage(ans.Text);
    }
  };

  return (
    <div className="popup">
      <div className="popupInner">
        <button onClick={closePopup} className="closePopup">
          X
        </button>
        <br />
        <br />
        <br />

        <div className="popupForm">
          <label for="email">Email:</label>
          <br />
          <input
            id="email"
            type="email"
            className="LogIn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label for="password">Password:</label>
          <br />
          <input
            id="password"
            type="password"
            className="LogIn"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          {error && <div className="errorMassageLogin">{message}</div>}
          <button className="LogInButton" onClick={logIn}>
            login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogInPopup;
