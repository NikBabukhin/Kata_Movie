import React, { useEffect, useState } from "react";
import style from "./Rated.module.css";
import { Card } from "../Card/Card";
import { FilmType } from "../CardsWrapper/CardsWrapper";
import { Error as ErrorComponent } from "../Error/Error";
import { Loading } from "../Loading/Loading";
import { PaginationComponent } from "../PaginationComponent/PaginationComponent";
import { getRatedFilms } from "../../requests/getRatedFilms";


export const Rated: React.FC = () => {
  const [films, setFilms] = useState([] as FilmType[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isResultLength, setResultLength] = useState<boolean>(true);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const changePageNumber = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setIsLoading(true);
    getRatedFilms(currentPage).then(response => {
      if (!response) {
        setError('no correct response from server')
        setIsLoading(false)
      } else if(!response.results || !response.resultCount) {
        setError('No results from server')
        setIsLoading(false)
      } else {
        setFilms(response.results);
        setError(null);
        setIsLoading(false);
        setTotalResults(response.resultCount);
        setResultLength(isResultLength);
      }
    }).catch(err=>{
      setIsLoading(false)
      setError(err.message)
    });
  }, [currentPage]);
  return <>
    <div className={style.wrapper}>
      {error ? <ErrorComponent errorText={error} />
        : isLoading ? <Loading size={"large"} />
          : isResultLength ? films.map(film => <Card id={film.id}
                                                     key={film.id}
                                                     currentRating={film.rating}
                                                     genres={film.genre_ids}
                                                     title={film.title || "Unknown"}
                                                     image={film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : null}
                                                     overview={film.overview}
                                                     vote_average={film.vote_average || 0}
                                                     release_date={film.release_date} />)
            : "No results"}
    </div>
    {totalResults>20?<PaginationComponent totalResults={totalResults} pageNumber={currentPage} changePageNumber={changePageNumber} />:''}
  </>;
};