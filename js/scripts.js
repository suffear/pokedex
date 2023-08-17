
let pokeRepo = (function() {
  let pokeList = [
    { number: '001', name: 'Bulbasaur', height: "2'04\"", weight: 15.2, type: ['grass', 'poison'] },
    { number: '002', name: 'Ivysaur', height: "3'03\"", weight: 28.7, type: ['grass', 'poison'] },
    { number: '003', name: 'Venusaur', height: "6'07\"", weight: 220.5, type: ['grass', 'poison'] },
    { number: '004', name: 'Charmander', height: "2'00\"", weight: 18.7, type: ['fire'] },
    { number: '005', name: 'Charmeleon', height: "3'07\"", weight: 41.9, type: ['fire'] },
    { number: '006', name: 'Charizard', height: "5'07\"", weight: 199.5, type: ['fire'] },
    { number: '007', name: 'Squirtle', height: "1'08\"", weight: 19.8, type: ['water'] },
    { number: '008', name: 'Wartortle', height: "3'03\"", weight: 49.6, type: ['water'] },
    { number: '009', name: 'Blastoise', height: "5'03\"", weight: 188.5, type: ['water'] }
  ];
  return {
    getAll: function() {
      return pokeList;
    },
    add: function(pkmn) {
      pokeList.push(pkmn);
    }
  };
})();

pokeRepo.add({ number: '025', name: 'Pikachu', height: "1'04\"", weight: 13.2, type: ['electric'] });

pokeRepo.getAll().forEach(pkmn => {
  document.write(`${pkmn.name} (weight: ${pkmn.weight})`);
  if (pkmn.weight > 50) {
    document.write(" - Wow, that’s heavy!");
  }
  document.write('<br>');
});
