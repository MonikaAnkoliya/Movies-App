// Action Types
export const ADD_MOVIE = "ADD_MOVIE";
export const DELETE_MOVIE = "DELETE_MOVIE";

export function deleteMovie(id) {
  return {
    type: DELETE_MOVIE,
    payload: id,
  };
}

export function addMovie(movie) {
  return {
    type: ADD_MOVIE,
    payload: movie,
  };
}

export async function getAllMovies() {
  let t = [];

   await fetch(
    "https://imdb8.p.rapidapi.com/title/get-popular-movies-by-genre?genre=%2Fchart%2Fpopular%2Fgenre%2Fadventure",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": "2a45d3a555mshfe642d01744442ep16ced9jsn410961916640",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then(async (res) => {
      t = await res?.map(async (item) => {
        return await fetch(
          `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${
            item.split("/")[2]
          }`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host":
                "imdb-internet-movie-database-unofficial.p.rapidapi.com",
              "x-rapidapi-key":
                "2a45d3a555mshfe642d01744442ep16ced9jsn410961916640",
            },
          }
        )
          .then((response) => {
            return response.json();
          })
          .then(async (res) => {

          
            return res;
          })
          .catch((err) => {
            console.error("====", err);
          });
      });
    })
    .catch((err) => {
      console.error("====", err);
    });

  return t
}

export async function searchByTitle(arr, query) {
  const filteredArr= arr.filter(el => el.title.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  return filteredArr
}
