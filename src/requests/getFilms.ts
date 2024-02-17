const API_KEY = "9f91c19b55f44b6b0f041e5becfd080a";
const URL_FILMS = "https://api.themoviedb.org/3/search/movie";

export const getFilms = async (filmName: string, pageNumber: number) => {
  const paramsToString = `${URL_FILMS}?query=${filmName}&page=${pageNumber}&api_key=${API_KEY}`;
  return await fetch(paramsToString).then(res => res.json()).then(res => {
    if (res.success===false) {
      throw new Error(res.status_message);
    } else {
      return {results: res.results, resultCount: res.total_results};
    }
  }).catch(err => {
    throw new Error(err)
  });
};