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
}

const testImage = "https://via.placeholder.com/180x280"

export const Card: React.FC<CardPropsType> = ({ id, genres, image, title, release_date, overview }) => {

  return <div className={style.card}>
    <div>
      <img alt="cinema image" src={image || placeholder} style={{width: 180, height: 280}} />
    </div>
    <div className={style.cardContent}>
      <CardContent id={id} genres={genres} title={title} release_date={release_date} overview={overview}/>
    </div>
  </div>;
};