import React from "react";
import buttonCSS from "./button.module.css";

const Button = (props) => {
  return (
    <div className={buttonCSS.buttonCSS}>
      <button disabled={props.disabledBtn} onClick={() => props.action()}>
        {props.text}
      </button>
    </div>
  );
};

export default Button;
