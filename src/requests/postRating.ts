import { getGuestSessionToken } from "./getGuestSession";
import { API_AUTH } from "./getFilms";

const URL_PUT_RATING = "https://api.themoviedb.org/3/movie"

export const postRating = async (movieId: number, rating: number) => {
  const guestToken = await getGuestSessionToken()
  const url = `${URL_PUT_RATING}/${movieId}/rating?guest_session_id=${guestToken.sessionId}`
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${API_AUTH}`
    },
    body: JSON.stringify({value: rating})
  }
  return await fetch(url, options).then(res=> {
    return res.json();
  }).then(result=>{
    if (!result.success) {
      throw new Error('Rating assignment was unsuccessful')
    } else {
      return result.success
    }
  }).catch(err=>{
    throw new Error(err)
  })
}