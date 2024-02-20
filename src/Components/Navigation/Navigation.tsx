import React from "react";
import { Menu, MenuProps } from "antd";
import style from './Navigation.module.css'
import { RouteValueType } from "../../App";

type NavigationPropsType = {
  activeRoute: RouteValueType,
  changeRoute: (route:RouteValueType)=>void
}

export const Navigation: React.FC<NavigationPropsType> = ({activeRoute, changeRoute}) => {
  const items: MenuProps["items"] = [
    { label: "Search", key: "Search"},
    { label: "Rated", key: "Rated"}
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'Search' || e.key === 'Rated') {
      changeRoute(e.key)
    }
  };


  return <div className={style.wrapper}>
    <Menu mode="horizontal"
          items={items}
          className={style.menu}
          defaultSelectedKeys={[activeRoute.toString()]}
          onClick={onClick}
    />
  </div>;
};