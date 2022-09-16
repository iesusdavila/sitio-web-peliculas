async function getTrendingMoviesPreview() {
  const res = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY
  );
  const data = await res.json();

  const movies = data.results;

  const trendingPreview_movieList = document.querySelector(
    ".trendingPreview-movieList"
  );
  movies.forEach((movie) => {
    const movie_container = document.createElement("div");
    movie_container.classList.add("movie-container");

    const imageMovie = document.createElement("img");
    imageMovie.classList.add("movie-img");
    imageMovie.alt = movie.title;
    imageMovie.src = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;

    movie_container.appendChild(imageMovie);
    trendingPreview_movieList.appendChild(movie_container);
    console.log(movie_container);
  });
}

getTrendingMoviesPreview();
