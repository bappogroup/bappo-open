import React from "react";
const style = {
  flex: 1,
  overflowX: "scroll",
  overflowY: "scroll",
  display: "flex",
  flexDirection: "column",
  position: "relative"
};

export default props => (
  <div
    style={style}
    onScroll={e =>
      props.onScroll({
        scrollTop: e.target.scrollTop,
        scrollLeft: e.target.scrollLeft
      })
    }
  >
    {props.children}
  </div>
);
