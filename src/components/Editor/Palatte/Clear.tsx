import { Mode } from "@/types";
import React from "react";

interface clearPropsType {
  handleClear: () => void;
}
const Clear = ({ handleClear }: clearPropsType) => {
  return (
    <button className="clear-button" onClick={handleClear}>
      Clear
    </button>
  );
};

export default Clear;
