const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');

const pokemonWeight = document.querySelector('.pokemon-weight');
const pokemonHeight = document.querySelector('.pokemon-height');

const form = document.querySelector('.form');
const input = document.querySelector('.search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const  renderPokemon = async (pokemon) => {  
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
    pokemonWeight.innerHTML = data.weight + ' oz'; 
    pokemonHeight.innerHTML = data.height + ' ft';  
  } else {
    // pokemonImage.style.display = 'none';
    pokemonImage.src = './assets/img/missign.png'
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '404';
    pokemonWeight.innerHTML = '--'; 
    pokemonHeight.innerHTML = '--';  
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);