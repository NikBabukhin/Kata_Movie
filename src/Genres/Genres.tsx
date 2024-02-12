import React from "react";
import style from './Ganres.module.css'

type GenresPropsType = {
  genres: number[] | string[],
}

export const Genres:React.FC<GenresPropsType> = ({genres}) => {
  return <div className={style.wrapper}>
    {genres.length?genres.map(genre=><div className={style.genreCard}>{genre}</div>):'No results'}
  </div>
}