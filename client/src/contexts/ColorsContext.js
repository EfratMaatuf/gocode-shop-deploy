import { createContext } from "react";

export const Colors = {
  begin: {
    // foreground: "rgb(1, 46, 101)",
    // background: "rgb(255, 255, 255)",
    backgroundCountDown: "rgb(131, 89, 108)",
    foregroundCountDown: "rgb(207, 207, 207)",
  },
  change: {
    // foreground: "rgb(255, 255, 255)",
    // background: "rgb(1, 46, 101)",
    backgroundCountDown: "rgb(207, 207, 207)",
    foregroundCountDown: "rgb(131, 89, 108)",
  },
};

const ColorsContext = createContext(null);
export default ColorsContext;

// https://dev.to/devdammak/react-hook-usestate-with-react-context-api-3pco
