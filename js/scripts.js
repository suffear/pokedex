const pokeRepo = (function () {
  let pokeList = [];
  // API URL, change Nr of Pokémon to load by changing the limit parameter 
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = $('#modalContainer'); // Use jQuery to select the modal container

  // Show loading message using jQuery
  function showLoadMsg() {
    $('<p class="loadMsg">Loading...</p>').appendTo('body');
  }

  // Hide loading message using jQuery
  function hideLoadMsg() {
    $('body > p.loadMsg').remove();
  }

  // Fetch JSON data from API
  async function fetchJSON(url) {
    const response = await fetch(url);
    return await response.json();
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
      console.error(error);
    }
  }

  // Add Pokémon to pokeList
  function add(pkmn) {
    if (typeof pkmn === 'object') {
      pokeList.push(pkmn);
    } else {
      console.error('Invalid Pokémon data format:', pkmn);
    }
  }

  // Display list of Pokémon
  function displayPokeList() {
    const list = $('#pokeList'); // Use jQuery to select the list container
    pokeList.forEach(pkmn => {
      // Create list item using jQuery
      const listItem = $('<li>').addClass('list-group-item col-sm-6 col-md-4 col-lg-3 col-xl-2');
      
      // Create button using jQuery
      const btn = $('<button>').addClass('btn btn-dark btn-outline-light').text(pkmn.name);
      
      // Create image using jQuery
      const img = $('<img>').addClass('img-fluid').attr('src', pkmn.gifUrl).attr('alt', pkmn.name);
      
      // Append elements using jQuery
      btn.append(img);
      listItem.append(btn);
      
      // Add click event using jQuery
      btn.on('click', () => showModal(pkmn));
      
      // Append list item to the list container using jQuery
      list.append(listItem);
    });
  }

  // Show details of clicked Pokémon
  function showModal(pkmn) {
    modalContainer.empty(); // Use jQuery to clear the modal container

    // Create the modal using jQuery
    let modal = $('<div>').addClass('modal fade').attr('tabindex', '-1').attr('role', 'dialog');
    
    // Create the modal dialog using jQuery
    let modalDialog = $('<div>').addClass('modal-dialog').attr('role', 'document');
    
    // Create the modal content using jQuery
    let modalContent = $('<div>').addClass('bg-dark text-light modal-content');
    
    // Create the close button (X) using jQuery
    let closeBtnElement = $('<button>').attr('type', 'button').addClass('close').attr('data-dismiss', 'modal').html('&times;');
    
    // Create the modal header using jQuery
    let modalHeader = $('<div>').addClass('modal-header');
    
    // Create the title element using jQuery
    let titleElement = $('<h5>').addClass('modal-title').text(pkmn.name + ' (ID: ' + pkmn.id + ')');
    
    // Create the modal body using jQuery
    let modalBody = $('<div>').addClass('modal-body');
    
    // Create content elements using jQuery
    let contentElement = $('<p>').text('Height: ' + pkmn.height + ' | Weight: ' + pkmn.weight);
    
    let imageElement = $('<img>').attr('src', pkmn.imgUrl).attr('alt', pkmn.name);
    
    // Append elements using jQuery
    modalHeader.append(titleElement);
    modalHeader.append(closeBtnElement);
    
    modalBody.append(contentElement);
    modalBody.append(imageElement);
    
    modalContent.append(modalHeader);
    modalContent.append(modalBody);
    
    modalDialog.append(modalContent);
    
    modal.append(modalDialog);
    
    modalContainer.append(modal);
    
    // Show the modal using jQuery
    modal.modal('show');
  }

  return {
    add,
    loadList,
  };
})();

pokeRepo.loadList();
