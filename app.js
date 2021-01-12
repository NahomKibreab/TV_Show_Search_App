const form = document.querySelector('form');

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const searchTitle = document.querySelector('#search_title');
  try {
    const config = { params: { q: searchTitle.value } };
    const req = await axios.get('http://api.tvmaze.com/search/shows', config);
    console.log(req);
  } catch (e) {
    console.log('Error Has occur');
    const body = document.querySelector('.col');
    const displayError = document.createElement('div');
    displayError.classList.add('h3');
    displayError.textContent = `Result for ${searchTitle.value} not found!`;
    body.append(displayError);
    console.dir(displayError);
  }
});
