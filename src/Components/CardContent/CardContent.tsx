import React from "react";
import style from "./CardContent.module.css";
import { Genres } from "../Genres/Genres";
import { format } from "date-fns";

type CardContentPropsType = {
  title: string,
  release_date: string,
  genres: number[],
  overview: string|null,
  id: number,
}

export const CardContent: React.FC<CardContentPropsType> = ({ title, release_date, genres, overview , id}) => {
  const getSmallText = (text: string) => {
    if (text.length < 200 && text.length > 30) {
      return text;
    } else if (text.length > 200) {
      for (let i = 200; i <= 220; i++) {
        if (text[i] === " ") {
          return text.slice(0, i) + " ...";
        } else if (i === 220) {
          return text.slice(0, i) + " ...";
        }
      }
    } else {
      return <i>{'No movie description has been added yet...'}</i>
    }
  };

  const getTime = (time: string|null) => {
    if (time==='') {
      return 'Unknown'
    } else {
      return format((new Date(release_date)).getTime(), 'PP')
    }
  }

  return <div className={style.cardContent}>
    <h5 className={style.header} onClick={()=>console.log(id)}>{title}</h5>
    <span className={style.date}>{getTime(release_date)}</span>
    <Genres genres={genres} />
    <span className={style.text}>{getSmallText(overview||'')}</span>
  </div>;
};