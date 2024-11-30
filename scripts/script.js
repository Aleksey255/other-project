const container = document.querySelector('.container');
const filterFilms = document.createElement('select');
const filterSpecies = document.createElement('select');
const movieOptionAll = document.createElement('option');
const speciesOptionAll = document.createElement('option');
const cards = document.querySelector('.cards');
const movieArray = [];
const movieUniqueArray = [];
const speciesArray = [];
const speciesUniqueArray = [];

filterFilms.id = 'filter-films';
filterFilms.style.marginRight = '10px';
movieOptionAll.value = 'all';
movieOptionAll.innerHTML = 'Все фильмы';
filterSpecies.id = 'filter-species';
speciesOptionAll.value = 'all';
speciesOptionAll.innerHTML = 'Все виды';

container.prepend(filterSpecies);
container.prepend(filterFilms);
filterFilms.append(movieOptionAll);
filterSpecies.append(speciesOptionAll);

const getData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

const sendData = (url, data) => {
  return fetch(url, {
    method: 'POST',
    body: data,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

const renderHeroes = (heroes) => {
  cards.innerHTML = '';
  heroes.forEach((hero) => {
    const cardsItem = document.createElement('div');
    cardsItem.classList.add('cards__item');

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('card__info');

    const cardName = document.createElement('h2');
    cardName.classList.add('card__name');
    cardName.textContent = hero.name;

    const cardRealName = document.createElement('p');
    cardRealName.classList.add('card__real-name');
    cardRealName.innerHTML = `<b>Реальное имя:</b> ${hero.realName}`;

    const cardSpecies = document.createElement('p');
    cardSpecies.classList.add('card__species');
    cardSpecies.innerHTML = `<b>Вид:</b> ${hero.species}`;

    const cardCitizenship = document.createElement('p');
    cardCitizenship.classList.add('card__citizenship');
    cardCitizenship.innerHTML = `<b>Гражданство:</b> ${hero.citizenship}`;

    const cardGender = document.createElement('p');
    cardGender.classList.add('card__gender');
    cardGender.innerHTML = `<b>Пол:</b> ${hero.gender}`;

    const cardStatus = document.createElement('p');
    cardStatus.classList.add('card__status');
    cardStatus.innerHTML = `<b>Статус:</b> ${hero.status}`;

    const cardActors = document.createElement('p');
    cardActors.classList.add('card__actors');
    cardActors.innerHTML = `<b>Актеры:</b> ${hero.actors}`;

    const cardMovies = document.createElement('p');
    cardMovies.classList.add('card__movies');
    cardMovies.innerHTML = `<b>Фильмы:</b> ${hero.movies}`;

    const cardPhoto = document.createElement('img');
    cardPhoto.classList.add('card__photo');
    cardPhoto.src = hero.photo;

    cardInfo.append(
      cardName,
      cardRealName,
      cardSpecies,
      cardCitizenship,
      cardGender,
      cardStatus,
      cardActors,
      cardMovies
    );
    cardsItem.append(cardInfo, cardPhoto);

    cards.append(cardsItem);

    if (hero.realName === undefined) {
      cardRealName.remove();
    }
    if (hero.citizenship === undefined) {
      cardCitizenship.remove();
    }
    if (hero.species === undefined) {
      cardSpecies.remove();
    }
    if (hero.movies === undefined) {
      cardMovies.remove();
    }
  });
};

const renderMovieFilter = () => {
  movieUniqueArray.forEach((item) => {
    const movieOption = document.createElement('option');
    movieOption.value = item;
    movieOption.innerHTML = item;
    filterFilms.append(movieOption);
  });
};

const movieFilter = (movies) => {
  movies.forEach((movie) => {
    if (Array.isArray(movie.movies)) {
      movie.movies.forEach((film) => {
        movieArray.push(film);
        movieArray.forEach((element) => {
          if (!movieUniqueArray.includes(element)) {
            movieUniqueArray.push(element);
          }
        });
      });
    }
  });
};

const filterHeroesByMovie = (movieName, data) => {
  const filteredHeroes = data.filter((hero) => {
    if (movieName === 'all') {
      return true;
    }
    if (Array.isArray(hero.movies)) {
      return hero.movies.includes(movieName);
    }
    return false;
  });
  return filteredHeroes;
};

const renderSpeciesFilter = () => {
  speciesUniqueArray.forEach((item) => {
    if (item !== undefined) {
      const option = document.createElement('option');
      option.value = item;
      option.innerHTML = item;
      filterSpecies.append(option);
    }
  });
};

const speciesFilter = (species) => {
  species.forEach((specie) => {
    speciesArray.push(specie.species);
    speciesArray.forEach((element) => {
      if (!speciesUniqueArray.includes(element)) {
        speciesUniqueArray.push(element);
      }
    });
  });
};

const filterHeroesBySpecies = (species, data) => {
  const filteredHeroes = data.filter((hero) => {
    if (species === 'all') {
      return true;
    }
    return hero.species === species;
  });
  return filteredHeroes;
};

getData('dbHeroes.json').then((data) => {
  renderHeroes(data);
  movieFilter(data);
  speciesFilter(data);
  renderMovieFilter();
  renderSpeciesFilter();

  filterFilms.addEventListener('change', (e) => {
    const selectedFilter = e.target.value;
    const filteredHeroesMovie = filterHeroesByMovie(selectedFilter, data);

    renderHeroes(filteredHeroesMovie);
  });
  filterSpecies.addEventListener('change', (e) => {
    const selectedFilter = e.target.value;

    const filteredHeroesSpecies = filterHeroesBySpecies(selectedFilter, data);

    renderHeroes(filteredHeroesSpecies);
  });
});
