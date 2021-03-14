import React, { useState, useEffect, useRef, useContext } from "react";
import "./SaleCountDown.css";
import PropTypes from "prop-types";
import ColorsContext from "../../contexts/ColorsContext";

const SaleCountDown = ({ end }) => {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(5);
  const interval = useRef();
  const colors = useContext(ColorsContext);

  useEffect(() => {
    interval.current = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
  }, []);
  useEffect(() => {
    if (seconds === -1) {
      setSeconds(59);
      setMinutes((minutes) => minutes - 1);
    }
  }, [seconds]);
  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      console.log("end");
      end();
      clearInterval(interval.current);
      interval.current = null;
    }
  }, [minutes, seconds, end]);

  return (
    <div
      className="saleCountDown"
      style={{
        background: colors.backgroundCountDown,
        color: colors.foregroundCountDown,
      }}
    >
      {interval.current && (
        <div>
          Sale ends in &nbsp;
          {minutes > 9 ? minutes : "0" + minutes}:
          {seconds > 9 ? seconds : "0" + seconds}
          &nbsp;
        </div>
      )}
      {!interval.current && <div>Sale ended</div>}
    </div>
  );
};
SaleCountDown.propTypes = {
  end: PropTypes.func,
};
export default SaleCountDown;
