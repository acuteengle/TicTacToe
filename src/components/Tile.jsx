import React from "react";
import Radium from "radium";

const Tile = (props) => {
  const { value, index, handleClick, xColor, oColor } = props;

  //   https://colorhunt.co/palette/201413
  const style = {
    tile: {
      width: "33%",
      height: "33%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid black",
      boxSizing: "initial",
      ":hover":
        value === ""
          ? {
              cursor: "pointer",
              backgroundColor: "#4e89ae",
            }
          : {},
    },
    text: {
      fontSize: 60,
      color: value === "X" ? xColor : oColor,
    },
  };

  return (
    <div style={style.tile} onClick={handleClick ? handleClick(index) : null}>
      <span style={style.text}>{value}</span>
    </div>
  );
};

export default Radium(Tile);
