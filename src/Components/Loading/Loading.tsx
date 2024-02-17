import { Flex, Spin } from "antd";
import React from "react";

export const Loading:React.FC = () => {
  return <Flex align="center" gap="middle">
    <Spin size="large"> <span>Loading...</span> </Spin>
  </Flex>;
};