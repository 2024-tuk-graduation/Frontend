import React, { ChangeEvent, useState } from "react";

const CodeModeSelect = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedLanguage(e.target.value);
  };
  return (
    <div>
      <label htmlFor="js">
        <input
          type="radio"
          name="language"
          value="javascript"
          id="js"
          onChange={handleChange}
          checked={selectedLanguage === "javascript"}
        />
        javascript
      </label>
      <label htmlFor="python">
        <input
          type="radio"
          name="language"
          value="python"
          id="python"
          onChange={handleChange}
          checked={selectedLanguage === "python"}
        />
        python
      </label>
      <label htmlFor="c++">
        <input
          type="radio"
          name="language"
          value="c++"
          id="c++"
          onChange={handleChange}
          checked={selectedLanguage === "c++"}
        />
        c++
      </label>
    </div>
  );
};
export default CodeModeSelect;
