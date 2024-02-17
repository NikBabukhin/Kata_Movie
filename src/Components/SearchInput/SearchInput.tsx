import React, { ChangeEvent, useCallback, useState } from "react";
import style from './searchInput.module.css'
import { Input } from "antd";
import debounce from 'lodash/debounce';

type SearchInputPropsType = {
  getFilms: (value:string)=>void
}

export const SearchInput:React.FC<SearchInputPropsType> = ({ getFilms }) => {
  const [value, setValue] = useState<string|null>('')
  const debounceFn = useCallback(debounce(getFilms, 1000), [])

  const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
    if (event.currentTarget.value.trim()) {
      debounceFn(event.currentTarget.value)
    }
  }

  return <div className={style.inputWrapper}>
   <Input className={style.input} placeholder={'Type to search...'} value={value||''} onChange={onChangeHandler}/>
  </div>
}