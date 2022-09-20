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

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const urlImg = entry.target.getAttribute("data-image");
      entry.target.setAttribute("src", urlImg);
    }
  });
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

    /*movie_container.addEventListener("click", async () => {
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
    });*/
    movie_container.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });

    const imageMovie = document.createElement("img");
    imageMovie.classList.add("movie-img");
    imageMovie.alt = movie.title;
    imageMovie.setAttribute(
      "data-image",
      "https://image.tmdb.org/t/p/w300/" + movie.poster_path
    );

    observer.observe(imageMovie);

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
    imageMovie.setAttribute(
      "data-image",
      "https://image.tmdb.org/t/p/w300/" + movie.poster_path
    );

    observer.observe(imageMovie);

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
      movie_container.addEventListener("click", () => {
        location.hash = "#movie=" + movie.id;
      });

      if (movie.poster_path) {
        const imageMovie = document.createElement("img");
        imageMovie.classList.add("movie-img");
        imageMovie.alt = movie.title;
        imageMovie.setAttribute(
          "data-image",
          "https://image.tmdb.org/t/p/w300/" + movie.poster_path
        );
        movie_container.appendChild(imageMovie);
        observer.observe(imageMovie);
      } else {
        const withOutImg = document.createElement("div");
        withOutImg.classList.add("movie-img--default");
        withOutImg.classList.add("movie-img");
        withOutImg.innerText = movie.title;
        movie_container.appendChild(withOutImg);
      }
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

  pageMax = data.total_pages;
  console.log(pageMax);

  const trendingPreview_movieList = document.querySelector(
    ".trendingPreview-movieList"
  );

  genericSection.innerHTML = "";

  movies.forEach((movie) => {
    const movie_container = document.createElement("div");
    movie_container.classList.add("movie-container");
    movie_container.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });

    const imageMovie = document.createElement("img");
    imageMovie.classList.add("movie-img");
    imageMovie.alt = movie.title;
    imageMovie.setAttribute(
      "data-image",
      "https://image.tmdb.org/t/p/w300/" + movie.poster_path
    );

    observer.observe(imageMovie);

    movie_container.appendChild(imageMovie);
    genericSection.appendChild(movie_container);
  });
}

async function getPaginatedTrendingMovies() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;

  if (scrollIsBottom && page < pageMax) {
    page++;
    const { data } = await api("trending/movie/day", {
      params: {
        page,
      },
    });
    const movies = data.results;

    movies.forEach((movie) => {
      const movie_container = document.createElement("div");
      movie_container.classList.add("movie-container");
      movie_container.addEventListener("click", () => {
        location.hash = "#movie=" + movie.id;
      });

      const imageMovie = document.createElement("img");
      imageMovie.classList.add("movie-img");
      imageMovie.alt = movie.title;
      imageMovie.setAttribute(
        "data-image",
        "https://image.tmdb.org/t/p/w300/" + movie.poster_path
      );

      observer.observe(imageMovie);

      movie_container.appendChild(imageMovie);
      genericSection.appendChild(movie_container);
    });
    //createMovies(movies, genericSection, { lazyLoad: true, clean: false });
  }
}

async function getMovieById(id) {
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

async function getRelatedMoviesById(id) {
  const { data } = await api(`movie/${id}/recommendations`);
  const relatedMovies = data.results;

  relatedMoviesContainer.innerHTML = "";

  relatedMovies.forEach((movieRecom) => {
    const movie_container = document.createElement("div");
    movie_container.classList.add("movie-container");
    movie_container.addEventListener("click", () => {
      location.hash = "#movie=" + movieRecom.id;
    });

    const imageMovie = document.createElement("img");
    imageMovie.classList.add("movie-img");
    imageMovie.alt = movieRecom.title;
    imageMovie.src =
      "https://image.tmdb.org/t/p/w300/" + movieRecom.poster_path;

    movie_container.appendChild(imageMovie);
    relatedMoviesContainer.appendChild(movie_container);
  });
}
