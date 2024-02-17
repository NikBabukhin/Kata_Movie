import style from "./CardsWrapper.module.css";
import React, { useEffect, useState } from "react";
import { getFilms } from "../../requests/getFilms";
import { Card } from "../Card/Card";
import { Loading } from "../Loading/Loading";
import { Error as ErrorComponent } from "../Error/Error";

export type FilmType = {
  id: number,
  image: string,
  title: string,
  release_date: string,
  genre_ids: number[],
  description: string,
  poster_path: string | null,
  overview: string | null,
}

type CardsWrapperPropsType = {
  changeResultCount: (resultsCount: number) => void
  findValue: string,
  pageNumber: number,
}

export const CardsWrapper: React.FC<CardsWrapperPropsType> = ({ changeResultCount, findValue, pageNumber }) => {
  const [films, setFilms] = useState([] as FilmType[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isResultLength, setResultLength] = useState<boolean>(true)

  useEffect(() => {
    if (findValue) {
      setIsLoading(true);
      getFilms(findValue, pageNumber).then(response => {
        if (!response) {
          setError("error");
          setIsLoading(false);
        } else if(response.results.length === 0) {
          setIsLoading(false);
          setFilms(response.results);
          setResultLength(false)
          changeResultCount(response.resultCount)
        } else {
          setFilms(response.results);
          setResultLength(true)
          changeResultCount(response.resultCount);
          setIsLoading(false);
        }
      }).catch(err => {
        setIsLoading(false);
        setError(err.message);
      });
    }
  }, [findValue, pageNumber]);

  return <div className={style.wrapper}>
    {error ? <ErrorComponent errorText={error} />
      : isLoading ? <Loading />
        : isResultLength ? films.map(film => <Card id={film.id}
                                                 key={film.id}
                                                 genres={film.genre_ids}
                                                 title={film.title || "Unknown"}
                                                 image={film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : null}
                                                 overview={film.overview}
                                                 release_date={film.release_date} />)
          : "No results"}

  </div>;
};