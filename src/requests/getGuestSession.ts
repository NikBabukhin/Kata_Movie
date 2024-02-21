import { API_KEY } from "./getFilms";

export const URL_CREATE_GUEST_SESSION = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`;

export const getGuestSession = async () => {
  return await fetch(URL_CREATE_GUEST_SESSION).then(res => res.json())
    .then(token => {
      if (token.success) {
        return {sessionId: token.guest_session_id, expiresAt: token.expires_at}
      } else {
        throw new Error('request is unsuccessful')
      }
    })
    .catch(err => {
      throw new Error(err);
    });
};

export const getGuestSessionToken = async () => {
  const stringLocalSessionToken = sessionStorage.getItem('guestSession')
  if (stringLocalSessionToken) {
    const sessionData = {
      sessionId: JSON.parse(stringLocalSessionToken).sessionId,
      expiresAt: JSON.parse(stringLocalSessionToken).expiresAt,
    }
    if ((new Date(sessionData.expiresAt)).getTime() - 3600000 > Date.now()) {
      return sessionData
    } else {
      return await getGuestSession().then(sessionData=>{
        sessionStorage.clear()
        sessionStorage.setItem('guestSession', JSON.stringify(sessionData))
        return sessionData
      }).catch(err=>{
        throw new Error(err)
      })
    }
  } else {
    return await getGuestSession().then(sessionData=>{
      sessionStorage.clear()
      sessionStorage.setItem('guestSession', JSON.stringify(sessionData))
      return sessionData
    }).catch(err=>{
      throw new Error(err)
    })
  }
}