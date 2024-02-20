import React, { useContext } from "react";
import style from "./Ganres.module.css";
import { GenresContext, useGenresContext } from "../../index";

type GenresPropsType = {
  genres: number[],
}

export const Genres: React.FC<GenresPropsType> = ({ genres }) => {
  const context = useContext(GenresContext);
  const genresToShow = () => {
    if (genres.length>3) {
      return [context[genres[0]], context[genres[1]], `Other ${genres.length-2} ...`]
    }
    return genres.map(genre=>context[genre])
  }
  return <GenresContext.Consumer>
    {() => {
      return <div className={style.wrapper}>
        {genres.length ? genresToShow().map(el => <div className={style.genreCard}
                                                  key={el}>{el}</div>) : "No genres"}
      </div>;
    }
    }
  </GenresContext.Consumer>;
};