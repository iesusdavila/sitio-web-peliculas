const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "aplication/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
    language: "es-MX",
  },
});

async function getTrendingMoviesPreview() {
  /*const res = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY
  );
  const data = await res.json();*/

  const { data } = await api("trending/movie/day");

  const movies = data.results;

  const trendingPreview_movieList = document.querySelector(
    ".trendingPreview-movieList"
  );

  trendingPreview_movieList.innerHTML = "";

  movies.forEach((movie) => {
    const movie_container = document.createElement("div");
    movie_container.classList.add("movie-container");

    const imageMovie = document.createElement("img");
    imageMovie.classList.add("movie-img");
    imageMovie.alt = movie.title;
    imageMovie.src = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;

    movie_container.appendChild(imageMovie);
    trendingPreview_movieList.appendChild(movie_container);
  });
}

async function getCategoriesMovies() {
  /*const res = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      API_KEY +
      "&language=en-US"
  );
  const data = await res.json();*/
  const { data } = await api("genre/movie/list");

  const categories = data.genres;

  const categoriesPreview_list = document.querySelector(
    ".categoriesPreview-list"
  );
  categoriesPreview_list.innerHTML = "";

  categories.forEach((category) => {
    const category_container = document.createElement("div");
    category_container.classList.add("category_container");

    const category_title = document.createElement("h3");
    category_title.setAttribute("id", "id" + category.id);
    category_title.classList.add("category-title");
    category_title.innerText = category.name;
    category_title.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });

    category_container.appendChild(category_title);
    categoriesPreview_list.appendChild(category_container);
  });
}

// getTrendingMoviesPreview();
// getCategoriesMovies();

async function getMoviesByCategory(idCtg, nameCtg) {
  const { data } = await api("/discover/movie", {
    params: {
      sort_by: "popularity.desc",
      include_adult: false,
      include_video: true,
      with_genres: idCtg,
    },
  });

  const movies = data.results;

  headerCategoryTitle.innerText = nameCtg;
  genericSection.innerHTML = "";

  movies.forEach((movie) => {
    const movie_container = document.createElement("div");
    movie_container.classList.add("movie-container");

    const imageMovie = document.createElement("img");
    imageMovie.classList.add("movie-img");
    imageMovie.alt = movie.title;
    imageMovie.src = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;

    movie_container.appendChild(imageMovie);
    genericSection.appendChild(movie_container);
  });
}
