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

    movie_container.addEventListener("click", async () => {
      const { data: dataMovie } = await api("movie/" + movie.id);

      console.log(dataMovie);

      location.hash = "#movie=" + dataMovie.id;
      movieDetailTitle.innerText = dataMovie.title;
      movieDetailScore.innerText = parseFloat(dataMovie.vote_average).toFixed(
        2
      );
      movieDetailDescription.innerText = dataMovie.overview;
      const imgMovie =
        "https://image.tmdb.org/t/p/w500/" + dataMovie.poster_path;
      headerSection.style.background = `url(${imgMovie})`;

      const categoriesMovie = dataMovie.genres;

      movieDetailCategoriesList.innerHTML = " ";

      categoriesMovie.forEach((category) => {
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
        movieDetailCategoriesList.appendChild(category_container);
      });
    });

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

    movie_container.addEventListener("click", async () => {
      const { data: dataMovie } = await api("movie/" + movie.id);

      location.hash = "#movie=" + dataMovie.id;
      movieDetailTitle.innerText = dataMovie.title;
      movieDetailScore.innerText = parseFloat(dataMovie.vote_average).toFixed(
        2
      );
      movieDetailDescription.innerText = dataMovie.overview;
      const imgMovie =
        "https://image.tmdb.org/t/p/w500/" + dataMovie.poster_path;
      headerSection.style.background = `url(${imgMovie})`;

      const categoriesMovie = dataMovie.genres;

      movieDetailCategoriesList.innerHTML = " ";

      categoriesMovie.forEach((category) => {
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
        movieDetailCategoriesList.appendChild(category_container);
      });
    });

    const imageMovie = document.createElement("img");
    imageMovie.classList.add("movie-img");
    imageMovie.alt = movie.title;
    imageMovie.src = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;

    movie_container.appendChild(imageMovie);
    genericSection.appendChild(movie_container);
  });
}

async function getMoviesBySearch(query) {
  const { data } = await api("search/movie", {
    params: {
      include_adult: false,
      query,
    },
  });

  const movies = data.results;

  genericSection.innerHTML = "";

  if (movies.length) {
    movies.forEach((movie) => {
      const movie_container = document.createElement("div");
      movie_container.classList.add("movie-container");

      movie_container.addEventListener("click", async () => {
        const { data: dataMovie } = await api("movie/" + movie.id);

        location.hash = "#movie=" + dataMovie.id;
        movieDetailTitle.innerText = dataMovie.title;
        movieDetailScore.innerText = parseFloat(dataMovie.vote_average).toFixed(
          2
        );
        movieDetailDescription.innerText = dataMovie.overview;
        const imgMovie =
          "https://image.tmdb.org/t/p/w500/" + dataMovie.poster_path;
        headerSection.style.background = `url(${imgMovie})`;

        const categoriesMovie = dataMovie.genres;

        movieDetailCategoriesList.innerHTML = " ";

        categoriesMovie.forEach((category) => {
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
          movieDetailCategoriesList.appendChild(category_container);
        });
      });

      const imageMovie = document.createElement("img");
      imageMovie.classList.add("movie-img");
      imageMovie.alt = movie.title;
      if (movie.poster_path) {
        imageMovie.src = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;
      } else {
        imageMovie.src =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/First_stellation_of_dodecahedron.svg/1024px-First_stellation_of_dodecahedron.svg.png";
      }
      movie_container.appendChild(imageMovie);
      genericSection.appendChild(movie_container);
    });
  } else {
    const anuncio = document.createElement("p");
    anuncio.classList.add("header-title--categoryView");
    anuncio.innerText = "Titulo no encontrado";
    anuncio.style.width = "100%";
    anuncio.style.textAlign = "center";

    genericSection.appendChild(anuncio);
  }
}

async function getTrendingMovies() {
  const { data } = await api("trending/movie/day");

  const movies = data.results;

  const trendingPreview_movieList = document.querySelector(
    ".trendingPreview-movieList"
  );

  genericSection.innerHTML = "";

  movies.forEach((movie) => {
    const movie_container = document.createElement("div");
    movie_container.classList.add("movie-container");

    /*movie_container.addEventListener("click", async () => {
      const { data: dataMovie } = await api("movie/" + movie.id);

      location.hash = "#movie=" + dataMovie.id;
      movieDetailTitle.innerText = dataMovie.title;
      movieDetailScore.innerText = parseFloat(dataMovie.vote_average).toFixed(
        2
      );
      movieDetailDescription.innerText = dataMovie.overview;
      const imgMovie =
        "https://image.tmdb.org/t/p/w500/" + dataMovie.poster_path;
      headerSection.style.background = `url(${imgMovie})`;

      const categoriesMovie = dataMovie.genres;

      movieDetailCategoriesList.innerHTML = " ";

      categoriesMovie.forEach((category) => {
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
        movieDetailCategoriesList.appendChild(category_container);
      });
    });*/
    movie_container.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });

    const imageMovie = document.createElement("img");
    imageMovie.classList.add("movie-img");
    imageMovie.alt = movie.title;
    imageMovie.src = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;

    movie_container.appendChild(imageMovie);
    genericSection.appendChild(movie_container);
  });
}

async function setInterfazMovieDetails(id) {
  const { data: dataMovie } = await api("movie/" + id);

  //location.hash = "#movie=" + dataMovie.id;
  movieDetailTitle.innerText = dataMovie.title;
  movieDetailScore.innerText = parseFloat(dataMovie.vote_average).toFixed(2);
  movieDetailDescription.innerText = dataMovie.overview;
  const imgMovie = "https://image.tmdb.org/t/p/w500/" + dataMovie.poster_path;
  headerSection.style.background = `url(${imgMovie})`;

  const categoriesMovie = dataMovie.genres;

  movieDetailCategoriesList.innerHTML = " ";

  categoriesMovie.forEach((category) => {
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
    movieDetailCategoriesList.appendChild(category_container);
  });
}
