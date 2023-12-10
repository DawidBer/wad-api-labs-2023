export const getMovies = async () => {
    const response = await  fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=0a979fddd5b7d5295ebfb464e526be2a&language=en-US&include_adult=false&page=1`
    )
    return response.json()
  };