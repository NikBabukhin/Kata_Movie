import React, { useEffect, useState } from "react";
import { CardsWrapper } from "./Components/CardsWrapper/CardsWrapper";
import { Offline, Online } from "react-detect-offline";
import { Error } from "./Components/Error/Error";
import { SearchInput } from "./Components/SearchInput/SearchInput";
import { PaginationComponent } from "./Components/PaginationComponent/PaginationComponent";
import { Navigation } from "./Components/Navigation/Navigation";
import { getGenres } from "./requests/getFilms";
import { GenresContext, GenresContextType } from "./index";
import { Rated } from "./Components/Rated/Rated";

export type RouteValueType = "Search" | "Rated"

export const App = () => {
  const [findValue, setFindValue] = useState<string>("");
  const [totalResults, setTotalResults] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [genreContext, setContext] = useState<GenresContextType>({} as GenresContextType);
  const [route, setRoute] = useState<RouteValueType>("Search");

  useEffect(() => {
    getGenres().then(result => {
      // @ts-ignore
      setContext(result);
    }).catch(err => {
      setContext({});
    });
  }, []);

  const getFilmsFromServer = (value: string) => {
    if (value) {
      setFindValue(value);
    }
  };
  const changeResultCount = (resultsCount: number) => {
    setTotalResults(resultsCount);
  };
  const changePageNumber = (newPage: number) => {
    setPageNumber(newPage);
  };
  const changeRoute = (newRoute: RouteValueType) => {
    setRoute(newRoute);
  };

  const whatToShow = () => {
    if (route === "Search") {
      return <>
        <SearchInput getFilms={getFilmsFromServer} />
        <CardsWrapper findValue={findValue} pageNumber={pageNumber} changeResultCount={changeResultCount} />
        <PaginationComponent totalResults={totalResults} pageNumber={pageNumber} changePageNumber={changePageNumber} />
      </>;
    } else {
      return <Rated />;
    }
  };

  return <>
    <Offline><Error errorText={"Connection is offline"} /></Offline>
    <Online>
      <GenresContext.Provider value={genreContext}>
        <Navigation activeRoute={route} changeRoute={changeRoute} />
        {whatToShow()}
      </GenresContext.Provider>
    </Online>
  </>;
};
