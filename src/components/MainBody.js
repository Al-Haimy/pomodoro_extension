import React from "react";
import Settings from "./Settings";
import OptionHeader from "./OptionHeader";

const MainBody = () => {
  return (
    <div className="options_back">
      <OptionHeader />
      <Settings />
      <About />
    </div>
  );
};

export default MainBody;
