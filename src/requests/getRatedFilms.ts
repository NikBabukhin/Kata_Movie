import { getGuestSessionToken } from "./getGuestSession";
import { API_KEY } from "./getFilms";

export const URL_RATED_FILMS = `https://api.themoviedb.org/3/guest_session`

export const getRatedFilms = async (page:number) => {
  const guestToken = await getGuestSessionToken()
  const url = `${URL_RATED_FILMS}/${guestToken.sessionId}/rated/movies?page=${page}&api_key=${API_KEY}`
  return await fetch(url).then(res=>{
    return res.json()
  }).then(result=>{
    return {results: result.results, resultCount: result.total_results}
  }).catch(err=>{
    throw new Error(err.message)
  })
}