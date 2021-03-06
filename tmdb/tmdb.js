/**
 * Axios import
 */
import axios from 'axios'

/**
 * fetchMovies function
 * reference: https://www.digitalocean.com/community/tutorials/vuejs-async-computed-properties
 */
export function fetchCollections(media, header, page = 1) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.themoviedb.org/3/${media}/${header}?api_key=fd88cff7f01965be8612902e680dd82c&language=en-US`,
        {
          params: {
            page
          }
        }
      )
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * function to fetch TV Shows
 */
export function fetchTVShows(header) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${header}?api_key=fd88cff7f01965be8612902e680dd82c&language=en-US&page=1`
      )
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * function to fetch list of movies
 */
export function fetchTrending(header, duration) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/${header}/${duration}?api_key=fd88cff7f01965be8612902e680dd82c`
      )
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * function to get single
 */
export function fetchMovie(header) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${header}?api_key=fd88cff7f01965be8612902e680dd82c&language=en-US&append_to_response=images,videos`
      )
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * fetch single tv show
 */
export function fetchTV(header) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${header}?api_key=fd88cff7f01965be8612902e680dd82c&language=en-US`
      )
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * function to fetch animated shows using discover link
 */
export function fetchDiscover(header, genre, page = 1) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/${header}?api_key=fd88cff7f01965be8612902e680dd82c&language=en-US&region=gb&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${genre}`,
        {
          params: {
            page
          }
        }
      )
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * get genre list
 */
export function fetchGenres(header) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/${header}/list?api_key=fd88cff7f01965be8612902e680dd82c&language=en-US`
      )
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * get cast info
 */
export function fetchPeople(header) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        ` https://api.themoviedb.org/3/person/${header}?api_key=fd88cff7f01965be8612902e680dd82c&language=en-US`,
        {
          params: {
            append_to_response:
              'movie_credits,tv_credits,external_ids,images,videos,content_ratings'
          }
        }
      )
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 *  fetchSimilar Shows
 */
export function fetchSimilar(media, id, page = 1) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.themoviedb.org/3/${media}/${id}/similar?api_key=fd88cff7f01965be8612902e680dd82c&language=en-US`,
        {
          params: {
            page
          }
        }
      )
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// https://api.themoviedb.org/3/tv/{tv_id}/season/{season_number}?api_key=<<api_key>>&language=en-US
/**
 * fetch Tv Seasons
 */
export function fetchEpisodes(id, season) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=fd88cff7f01965be8612902e680dd82c&language=en-US`
      )
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
