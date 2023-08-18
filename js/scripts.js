let pokeRepo = (function () {
  let pokeList = [
    { no: '001', name: 'Bulbasaur', height: [2, 4], weight: 15.2, type: ['grass', 'poison'] },
    { no: '002', name: 'Ivysaur', height: [3, 3], weight: 28.7, type: ['grass', 'poison'] },
    { no: '003', name: 'Venusaur', height: [6, 7], weight: 220.5, type: ['grass', 'poison'] },
    { no: '004', name: 'Charmander', height: [2, 0], weight: 18.7, type: ['fire'] },
    { no: '005', name: 'Charmeleon', height: [3, 7], weight: 41.9, type: ['fire'] },
    { no: '006', name: 'Charizard', height: [5, 7], weight: 199.5, type: ['fire'] },
    { no: '007', name: 'Squirtle', height: [1, 8], weight: 19.8, type: ['water'] },
    { no: '008', name: 'Wartortle', height: [3, 3], weight: 49.6, type: ['water'] },
    { no: '009', name: 'Blastoise', height: [5, 3], weight: 188.5, type: ['water'] }
  ];
  return {
    getAll: function () {
      return pokeList;
    },
    add: function (pkmn) {
      const isString = value => typeof value === 'string';
      const isNumber = value => typeof value === 'number';
      const isValidHeight = value => Array.isArray(value) && value.length === 2 && isNumber(value[0]) && isNumber(value[1]);
      const isValidTypeArray = value => Array.isArray(value) && value.every(isString);

      if (!isString(pkmn.no)) {
        console.error('Invalid Pokémon number:', pkmn.no);
        return;
      }

      if (!isString(pkmn.name)) {
        console.error('Invalid Pokémon name:', pkmn.name);
        return;
      }

      if (!isValidHeight(pkmn.height)) {
        console.error('Invalid Pokémon height:', pkmn.height);
        return;
      }

      if (!isNumber(pkmn.weight)) {
        console.error('Invalid Pokémon weight:', pkmn.weight);
        return;
      }

      if (!isValidTypeArray(pkmn.type)) {
        console.error('Invalid Pokémon type:', pkmn.type);
        return;
      }

      pokeList.push(pkmn);
    },

    addListItem: function (pkmn) {
      let listItem = document.createElement('li');
      listItem.classList.add('pokeItem');

      let button = document.createElement('button');
      button.classList.add('pokeBtn');
      button.innerText = pkmn.name;

      listItem.appendChild(button);
      document.querySelector('.pokeList').appendChild(listItem);

      button.addEventListener('click', () =>  showDetails(pkmn));
    },
  };
  
})();

const showDetails = pokemon => {console.log(pokemon);};

pokeRepo.add({ no: '025', name: 'Pikachu', height: [1, 4], weight: 13.2, type: ['electric'] });

pokeRepo.getAll().forEach(pkmn => {pokeRepo.addListItem(pkmn)})