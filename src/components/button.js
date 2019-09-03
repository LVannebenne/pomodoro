import React from "react";

const Button = prop => (
    <button type={"button"} onClick={prop.handleFunc}>
        {prop.value}
    </button>
);

export default Button;
