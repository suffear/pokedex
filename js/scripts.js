const pokeRepo = (function () {
  let pokeList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = $('#modalContainer');

  // Show loading message
  function showLoadMsg() {
    $('<p class="loadMsg">Loading...</p>').appendTo('body');
  }

  // Hide loading message
  function hideLoadMsg() {
    $('body > p.loadMsg').remove();
  }

  // Fetch JSON data from API
  async function fetchJSON(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Error fetching JSON:', error);
      throw error; // Rethrow the error to handle it in the caller
    }
  }

  // Load list of Pokémon from API
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
      pkmn.sort((a, b) => a.id - b.id);
      pkmn.forEach(add);
      hideLoadMsg();
      displayPokeList();
      await Promise.all(pokeList.map(loadDetails));
    } catch (error) {
      console.error('Error loading Pokémon list:', error);
      hideLoadMsg();
    }
  }

  // Load details of each Pokémon
  async function loadDetails(pkmn) {
    let url = pkmn.detailsUrl;
    try {
      const details = await fetchJSON(url);
      pkmn.imgUrl = details.sprites.other['official-artwork'].front_default;
      pkmn.height = details.height;
      pkmn.weight = details.weight;
      pkmn.types = details.types;
    } catch (error) {
      console.error('Error loading Pokémon details:', error);
    }
  }

  // Function to add Pokémon to the pokeList
  function add(pkmn) {
    if (typeof pkmn === 'object') {
      pokeList.push(pkmn);
    } else {
      console.error('Invalid Pokémon data format:', pkmn);
    }
  }

  // Display list of Pokémon
  function displayPokeList() {
    const list = $('#pokeList');
    pokeList.forEach(pkmn => {
      const listItem = $('<li>').addClass('list-group-item col-sm-6 col-md-4 col-lg-3 col-xl-2');
      const btn = $('<button>').addClass('btn btn-dark btn-outline-light').text(pkmn.name);
      const img = $('<img>').addClass('img-fluid').attr('src', pkmn.gifUrl).attr('alt', pkmn.name);
      btn.append(img);
      listItem.append(btn);
      btn.on('click', () => showModal(pkmn));
      list.append(listItem);
    });
  }

  // Show details of clicked Pokémon
  function showModal(pkmn) {
    modalContainer.empty();
    let modal = $('<div>').addClass('modal fade').attr('tabindex', '-1').attr('role', 'dialog');
    let modalDialog = $('<div>').addClass('modal-dialog').attr('role', 'document');
    let modalContent = $('<div>').addClass('bg-dark text-light modal-content');
    let closeBtnElement = $('<button>').attr('type', 'button').addClass('btn btn-dark').attr('data-bs-dismiss', 'modal').html('&times;');
    let modalHeader = $('<div>').addClass('modal-header');
    let titleElement = $('<h5>').addClass('modal-title').text(pkmn.name + ' (ID: ' + pkmn.id + ')');
    let modalBody = $('<div>').addClass('modal-body');
    let contentElement = $('<p>').text('Height: ' + pkmn.height + ' | Weight: ' + pkmn.weight);
    let imageElement = $('<img>').attr('src', pkmn.imgUrl).attr('alt', pkmn.name);
    modalHeader.append(titleElement);
    modalHeader.append(closeBtnElement);
    modalBody.append(contentElement);
    modalBody.append(imageElement);
    modalContent.append(modalHeader);
    modalContent.append(modalBody);
    modalDialog.append(modalContent);
    modal.append(modalDialog);
    modalContainer.append(modal);
    modal.modal('show');
  }

  return {
    add,
    loadList,
  };
})();

pokeRepo.loadList();
