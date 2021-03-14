import { createContext } from "react";

export const Colors = {
  begin: {
    foreground: "rgb(1, 46, 101)",
    background: "rgb(145, 185, 184)",
    backgroundCountDown: "rgb(0, 106, 156)",
    foregroundCountDown: "rgb(204, 51, 51)",
  },
  change: {
    foreground: "rgb(145, 185, 184)",
    background: "rgb(1, 46, 101)",
    backgroundCountDown: "rgb(204, 51, 51)",
    foregroundCountDown: "rgb(0, 106, 156)",
  },
};

const ColorsContext = createContext(null);
export default ColorsContext;

// https://dev.to/devdammak/react-hook-usestate-with-react-context-api-3pco
