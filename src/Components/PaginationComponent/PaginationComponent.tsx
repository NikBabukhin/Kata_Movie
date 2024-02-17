import { Pagination } from "antd";
import React from "react";
import style from './PaginationComponent.module.css'

type PaginationComponentPropsType = {
  totalResults: number,
  pageNumber: number,
  changePageNumber: (newPage:number)=>void
}

export const PaginationComponent:React.FC<PaginationComponentPropsType> = ({totalResults, pageNumber, changePageNumber}) => {
  return totalResults?<div className={style.wrapper}>
    <Pagination defaultCurrent={pageNumber} total={totalResults} showSizeChanger={false} defaultPageSize={20} onChange={changePageNumber}/>
  </div>:<></>
}