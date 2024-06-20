import { Mode } from "@/types";
import React from "react";

interface clearPropsType {
  handleClear: (mode: Mode) => void;
  mode: Mode;
}
const Clear = ({ handleClear, mode }: clearPropsType) => {
  return (
    <button className="clear-button" onClick={() => handleClear(mode)}>
      Clear
    </button>
  );
};

export default Clear;
