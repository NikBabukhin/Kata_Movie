export const API_KEY = "9f91c19b55f44b6b0f041e5becfd080a";
export const API_AUTH = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjkxYzE5YjU1ZjQ0YjZiMGYwNDFlNWJlY2ZkMDgwYSIsInN1YiI6IjY1Yzc3NmMzZTI5NWI0MDE3YmY4MjMzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wwFzNXThTt_Q9zY4n98jCtOMeP2ewscfNORPAg2ebnE"
export const URL_FILMS = "https://api.themoviedb.org/3/search/movie";
export const URL_GENRES = "https://api.themoviedb.org/3/genre/movie/list";

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

export const getGenres = async () => {
  return await fetch(`${URL_GENRES}?api_key=${API_KEY}`).then(res=>res.json()).then(res => {
    if (res.success===false) {
      throw new Error(res.status_message);
    } else {
      const result = {}
      for (let i=0;i<res.genres.length;i++) {
        // @ts-ignore
        result[res.genres[i].id] = res.genres[i].name
      }
      return result
    }
  }).catch(err => {
    throw new Error(err)
  });
}