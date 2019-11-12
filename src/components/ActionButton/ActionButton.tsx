import React from "react";
// import Button from '@material-ui/core/Button';
import StyledButton from "./styles";

interface ButtonProps {
  onClick: any;
  title: string;
}

function ActionButton(props: ButtonProps) {
  return (
    <StyledButton>
      <p onClick={props.onClick}>{props.title}</p>
    </StyledButton>
  );
}

export default ActionButton;
