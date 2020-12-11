import * as React from "react";
import styled from "styled-components";

const ErrorMessage = styled.p`
  text-align: left;
  margin-top: 10px;
  color: #ff0000;
`;

const ErrorMessageContainer = ({
  errorMessage,
}) => {
  return <ErrorMessage>{errorMessage}</ErrorMessage>;
};

export default ErrorMessageContainer;
