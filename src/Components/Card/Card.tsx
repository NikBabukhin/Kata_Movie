import style from "./Card.module.css";
import { CardContent } from "../CardContent/CardContent";
import React from "react";
import placeholder from "../../assets/images/placeholder.png"

type CardPropsType = {
  id: number,
  genres: number[],
  image: string|null,
  title: string,
  release_date: string,
  overview: string|null,
  vote_average: number,
  currentRating?:number
}

export const Card: React.FC<CardPropsType> = ({ id, genres, image, title, release_date, overview, vote_average , currentRating}) => {

  const getRatingFromStorage = (filmId: number): number|undefined => {
    const ratedFilms = sessionStorage.getItem('ratedFilms')
    if (ratedFilms) {
      const films = JSON.parse(ratedFilms)
      return films[filmId]
    }
  }

  return <div className={style.card}>
    <div>
      <img alt="cinema image" src={image || placeholder} style={{width: 180, height: 280}} />
    </div>
    <div className={style.cardContent}>
      <CardContent
        id={id}
        genres={genres}
        title={title}
        release_date={release_date}
        overview={overview}
        vote_average={vote_average}
        currentRating={getRatingFromStorage(id) || currentRating}
      />
    </div>
  </div>;
};