import React from "react";
import { Alert } from "antd";

type ErrorPropsType = {
  errorText:string
}
export const Error:React.FC<ErrorPropsType> = ({errorText}) => {
  return <Alert message={errorText} type="error" />
}