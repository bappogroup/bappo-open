import React from "react";
import ReactDOM from "react-dom";

import Grid from "../src";
const Demo = () => (
  <div>
    <div
      style={{
        display: "flex",
        width: 800,
        height: 400,
        position: "relative",
        flexDirection: "column",
        backgroundColor: "#f8f8f8",
        margin: 24
      }}
    >
      <Grid />
    </div>
  </div>
);

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<Demo />, wrapper) : false;
