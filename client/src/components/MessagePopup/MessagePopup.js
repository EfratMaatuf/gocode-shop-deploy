import React from "react";
import "./MessagePopup.css";

const MessagePopup = ({ closePopup, message }) => {
  return (
    <div className="MessagePopup">
      <div className="MessagePopupInner">
        <div className="messageInPopup">{message}</div>
        <div>
          <button onClick={closePopup} className="closeMessagePopup">
            ok
          </button>
          {/* <button onClick={closePopup} className="closeMessagePopup">
            cancel
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default MessagePopup;
