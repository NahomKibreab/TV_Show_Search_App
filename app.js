const form = document.querySelector('form');
const body = document.querySelector('.col');

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const searchTitle = document.querySelector('#search_title');
  if (searchTitle) {
    const deafultResult = document.querySelector('#default_result');
    deafultResult.remove();
  }
  try {
    const config = { params: { q: searchTitle.value } };
    const req = await axios.get('http://api.tvmaze.com/search/shows', config);
    newResult(req.data);
  } catch (e) {
    console.log('Error Has occur');
    emptyResult(searchTitle.value);
  }
});

const emptyResult = (data) => {
  const displayError = document.createElement('div');
  displayError.classList.add('h3');
  displayError.textContent = `Result for ${data} not found!`;
  return body.append(displayError);
};

const newResult = (reponse) => {
  for (let data of reponse) {
    console.log(data.show);
  }
};

const displayResult = () => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.classList.add('mx-2');
  card.style.width = '18rem';

  const image = document.createElement('img');
  image.classList.add('card-img-top');
  image.src = `http://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg`;
  image.alt = `sample image`;
  card.append(image);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const h5 = document.createElement('h5');
  h5.classList.add('card-title');
  h5.textContent = 'Girls';
  cardBody.append(h5);

  const p = document.createElement('p');
  p.classList.add('card-text');
  p.innerHTML =
    '<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>';
  cardBody.append(p);

  const a = document.createElement('a');
  a.classList.add('btn');
  a.classList.add('btn-primary');
  a.href = 'http://www.tvmaze.com/shows/139/girls';
  a.textContent = `More Info`;
  cardBody.append(a);

  card.append(cardBody);

  body.append(card);
};
