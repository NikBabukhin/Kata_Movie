import style from "./CardsWrapper.module.css";
import React, { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { getFilms } from "../requests/getFilms";

export type FilmType = {
  id: number,
  image: string,
  title: string,
  release_date: string,
  genre_ids: number[],
  description: string,
}


const filmsTest = [{
  adult: false,
  backdrop_path: null,
  genre_ids: [
    99
  ],
  id: 1045592,
  original_language: "en",
  original_title: "Jack Reacher: When the Man Comes Around",
  overview: "Cast and crew speak on adapting One Shot as the first Jack Reacher film, casting Tom Cruise, earning Lee Child's blessing, additional character qualities and the performances that shape them, Lee Child's cameo in the film, and shooting the film's climax.",
  popularity: 13.286,
  poster_path: "/tcOPca5Ook6aR9mehrnxD9kfk7m.jpg",
  release_date: "2013-05-07",
  title: "Jack Reacher: When the Man Comes Around",
  video: false,
  vote_average: 10.0,
  vote_count: 1
}];

export const CardsWrapper: React.FC = () => {
  const [films, setFilms] = useState(filmsTest);

  useEffect(() => {
    getFilms('return').then(response=>setFilms(response))
  }, []);

  return <div className={style.wrapper}>
    {films.map(film => <Card id={film.id}
                             genres={film.genre_ids}
                             title={film.title}
                             image={film.poster_path? `https://image.tmdb.org/t/p/w500${film.poster_path}`:null}
                             overview={film.overview}
                             release_date={film.release_date}
    />)}
  </div>;
};