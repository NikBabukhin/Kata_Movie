import React, { useState } from "react";
import { CardsWrapper } from "./Components/CardsWrapper/CardsWrapper";
import { Offline, Online } from "react-detect-offline";
import { Error } from "./Components/Error/Error";
import { SearchInput } from "./Components/SearchInput/SearchInput";
import { PaginationComponent } from "./Components/PaginationComponent/PaginationComponent";
import { Navigation } from "./Components/Navigation/Navigation";

export const App = () => {
  const [findValue, setFindValue] = useState<string>('')
  const [totalResults, setTotalResults] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)

  const getFilmsFromServer = (value:string) => {
    if (value) {
      setFindValue(value)
    }
  }
  const changeResultCount = (resultsCount: number) => {
    setTotalResults(resultsCount)
  }
  const changePageNumber = (newPage:number) => {
    setPageNumber(newPage)
  }

  return <>
    <Offline><Error errorText={'Connection is offline'}/></Offline>
    <Online>
      <Navigation/>
      <SearchInput getFilms={getFilmsFromServer}/>
      <CardsWrapper findValue={findValue} pageNumber={pageNumber} changeResultCount={changeResultCount}/>
      <PaginationComponent totalResults={totalResults} pageNumber={pageNumber} changePageNumber={changePageNumber}/>
    </Online>
  </>;
};
