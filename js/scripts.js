const pokeRepo = (function () {
  let pokeList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

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
        const data = await fetchJSON(apiUrl);
        const pkmn = await Promise.all(data.results.map(async item => {
            const details = await fetchJSON(item.url);
            return {
                id: details.id,
                name: details.name,
                detailsUrl: item.url,
                gifUrl: details.sprites.versions['generation-v']['black-white'].animated['front_default'],
            };
        }));
        
        // Sort the Pokémon details array by ID in ascending order
        pkmn.sort((a, b) => a.id - b.id);

        // Add sorted details to the pokeList
        pkmn.forEach(add);

        hideLoadMsg();
        displayPokeList();
        await Promise.all(pokeList.map(loadDetails));
    } catch (error) {
        console.error(error);
        hideLoadMsg();
    }
}


  async function loadDetails(pkmn) {
    let url = pkmn.detailsUrl;
    try {
      const details = await fetchJSON(url);
      // console.log('details:', details); 
      pkmn.imgUrl = details.sprites.other['official-artwork'].front_default;
      pkmn.height = details.height;
      pkmn.weight = details.weight;
      pkmn.types = details.types;
      // console.log('pkmn object after fetching details', pkmn); 
    } catch (error) {
      console.error(error);
      
    }
  }

  function add(pkmn) {
    if (typeof pkmn === 'object') {
      pokeList.push(pkmn);
    } else {
      console.error('Invalid Pokémon data format:', pkmn);
    }
  }

  function caps(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  function displayPokeList() {
    const list = document.querySelector('.pokeList');
    pokeList.forEach(pkmn => {
      const listItem = document.createElement('li');
      listItem.classList.add('pokeItem');
      const btn = document.createElement('btn');
      btn.classList.add('pokeBtn');
      btn.innerText = caps(pkmn.name);
      const img = document.createElement('img');
      img.classList.add('pokeImg');
      img.src = pkmn.gifUrl;
      img.alt = pkmn.name;
      btn.appendChild(img);
      btn.addEventListener('click', () =>  showModal(pkmn));
      listItem.appendChild(btn);
      list.appendChild(listItem);
    });
  }

// Show details of clicked Pokémon
  function showModal(pkmn) {
    
    // console.log('showModal Called');
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeBtnElement = document.createElement('btn');
    closeBtnElement.classList.add('modal-close');
    closeBtnElement.innerText = 'Close';
    closeBtnElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pkmn.name + ' (ID: ' + pkmn.id + ')';

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height: ' + pkmn.height;
    contentElement.innerText += ' | Weight: ' + pkmn.weight;

    let imageElement = document.createElement('img');
    imageElement.src = pkmn.imgUrl;
    imageElement.alt = pkmn.name;

    modal.appendChild(closeBtnElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible')
    }
  
 window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  })  
  
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  }); 

  return {
    add,
    loadList,
  };
})();

pokeRepo.loadList(); 