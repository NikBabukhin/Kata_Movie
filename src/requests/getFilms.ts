const API_KEY = "9f91c19b55f44b6b0f041e5becfd080a";
const URL_FILMS = "https://api.themoviedb.org/3/search/movie";

export const getFilms = async (filmName: string) => {
  const paramsToString = `${URL_FILMS}?query=${filmName}&api_key=${API_KEY}`;
  const response = await fetch(paramsToString).then(res => res.json())
    .catch(err => {
      console.log(err);
      return "No data found from server or unexpected response";
    });
  if (response.results.length === 0) {
    return 'No data found from server'
  } else {
    return response.results
  }
};