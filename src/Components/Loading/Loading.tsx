import { Flex, Spin } from "antd";
import React from "react";

type LoadingPropsType = {
  size: "small" | "large" | "default",
  background?: boolean,
}

export const Loading:React.FC<LoadingPropsType> = ({size, background}) => {
  return <Flex align="center" gap="middle">
    <Spin size={size}> {background?<span>Loading...</span>:''} </Spin>
  </Flex>;
};