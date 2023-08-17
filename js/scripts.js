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

pokeList.forEach(pokemon => {
  document.write(`${pokemon.name} (weight: ${pokemon.weight})`);
  if (pokemon.weight > 50) {
    document.write(" - Wow, that’s heavy!");
  }
  document.write('<br>');
});