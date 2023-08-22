const pokeRepo = (function () {
  let pokeList = [];
  function showLoadMsg() {
    const loadMsg = document.createElement('p');
    loadMsg.classList.add('loadMsg');
    loadMsg.innerText = 'Loading...';
    document.body.appendChild(loadMsg);
  }
  function hideLoadMsg() {
    const loadMsg = document.querySelector('body > p');
    if (loadMsg) {
      loadMsg.remove();
    }
  }
  async function fetchJSON(url) {
    const response = await fetch(url);
    return await response.json();
  }
  async function loadList() {
    showLoadMsg();
    try {
      const data = await fetchJSON('https://pokeapi.co/api/v2/pokemon/?limit=150');
      await Promise.all(data.results.map(async item => {
        const details = await fetchJSON(item.url);
        add({
          name: details.name,
          detailsUrl: item.url,
          imgUrl: details.sprites.front_default,
        });
      }));
      displayPokeList();
      hideLoadMsg();
    } catch (error) {
      console.error(error);
      hideLoadMsg();
    }
  }
  async function loadDetails(pkmn) {
    showLoadMsg();
    try {
      const details = await fetchJSON(pkmn.detailsUrl);
      pkmn.height = details.height;
      hideLoadMsg();
    } catch (error) {
      console.error(error);
      hideLoadMsg();
    }
  }
  function add(pkmn) {
    if (typeof pkmn === 'object') {
      pokeList.push(pkmn);
    } else {
      console.error('Invalid Pokémon data format:', pkmn);
    }
  }
  function showDetails(pkmn) {
    return async function () {
      await loadDetails(pkmn);
      console.log(pkmn);
    };
  }
  function caps(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function displayPokeList() {
    const list = document.querySelector('.pokeList');
    pokeList.forEach(pkmn => {
      const listItem = document.createElement('li');
      listItem.classList.add('pokeItem');
      const button = document.createElement('button');
      button.classList.add('pokeBtn');
      button.innerText = caps(pkmn.name);
      const img = document.createElement('img');
      img.classList.add('pokeImg');
      img.src = pkmn.imgUrl;
      img.alt = pkmn.name;
      button.appendChild(img);
      button.addEventListener('click', showDetails(pkmn));
      listItem.appendChild(button);
      list.appendChild(listItem);
    });
  }
  return {
    add,
    loadList,
  };
})();
pokeRepo.loadList(); 