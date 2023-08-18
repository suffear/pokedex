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
      const validate = (value, type, errorMessage) => {
        if (typeof value !== type) {
          console.error(errorMessage, value);
          return false;
        }
        return true;
      };
    
      if (
        validate(pkmn.no, 'string', 'Invalid Pokémon number:') &&
        validate(pkmn.name, 'string', 'Invalid Pokémon name:') &&
        validate(pkmn.height, 'object', 'Invalid Pokémon height:') && pkmn.height.length === 2 &&
        validate(pkmn.height[0], 'number', 'Invalid Pokémon height:') &&
        validate(pkmn.height[1], 'number', 'Invalid Pokémon height:') &&
        validate(pkmn.weight, 'number', 'Invalid Pokémon weight:') &&
        validate(pkmn.type, 'object', 'Invalid Pokémon type:') &&
        Array.isArray(pkmn.type) &&
        pkmn.type.every(type => validate(type, 'string', 'Invalid Pokémon type:'))
      ) {
        pokeList.push(pkmn);
      }
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