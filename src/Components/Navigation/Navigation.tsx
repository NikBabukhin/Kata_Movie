import React from "react";
import { Menu, MenuProps } from "antd";
import style from './Navigation.module.css'

export const Navigation: React.FC = () => {
  const items: MenuProps["items"] = [
    { label: "Search", key: "Search" },
    { label: "Rated", key: "Rated" }
  ];

  return <div className={style.wrapper}>
    <Menu mode="horizontal" items={items} className={style.menu} defaultSelectedKeys={['Search']}/>
  </div>;
};