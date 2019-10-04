import React from "react";
import ReactDOM from "react-dom";
import { View, Text, styled } from "bappo-components";

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
      <Grid
        columnCount={100}
        rowCount={1000}
        renderCell={renderCell}
        renderRowLabel={renderCell}
        renderColumnLabel={renderCell}
        renderTopLeftCorner={renderTopLeftCorner}
      />
    </div>
  </div>
);

const renderTopLeftCorner = () => <Cell />;

const renderCell = ({ columnIndex, rowIndex }) => {
  if (columnIndex == null) {
    return (
      <Cell>
        <Text>Row {rowIndex}</Text>
      </Cell>
    );
  }

  if (rowIndex == null) {
    return (
      <Cell>
        <Text>Col {columnIndex}</Text>
      </Cell>
    );
  }

  return (
    <Cell>
      <Text>
        {columnIndex}:{rowIndex}
      </Text>
    </Cell>
  );
};

const Cell = styled(View)`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
  margin-left: 1px;
  margin-top: 1px;
`;

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<Demo />, wrapper) : false;
