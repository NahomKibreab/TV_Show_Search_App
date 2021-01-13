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
    if (req.data.length > 0) {
      console.log('Value found');
      console.log(req.data);
      newResult(req.data);
    } else {
      console.log('no value found');
      emptyResult(searchTitle.value);
    }
  } catch (e) {
    console.log('Error Has occur', e);
    emptyResult(searchTitle.value);
  }
});

const emptyResult = (data) => {
  const container = document.querySelector('.container-fluid');
  const displayError = document.createElement('div');
  displayError.classList.add('h3');
  displayError.classList.add('text-center');
  displayError.textContent = `Result for ${data} not found!`;
  return container.append(displayError);
};

const newResult = (reponse) => {
  for (let data of reponse) {
    displayResult(data.show);
  }
};

const displayResult = (show) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.classList.add('mx-2');
  card.style.width = '18rem';

  const image = document.createElement('img');
  image.classList.add('card-img-top');
  image.src =
    show.image === null
      ? `https://wiki.tripwireinteractive.com/images/4/47/Placeholder.png`
      : `${show.image.medium}`;
  image.alt = `Image for ${show.name}`;
  card.append(image);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const h5 = document.createElement('h5');
  h5.classList.add('card-title');
  h5.textContent = `${show.name}`;
  cardBody.append(h5);

  const p = document.createElement('p');
  p.classList.add('card-text');
  p.innerHTML = !show.summary
    ? `No Summary found...`
    : `${show.summary.slice(0, 200)}...`;
  cardBody.append(p);

  const a = document.createElement('a');
  a.classList.add('btn');
  a.classList.add('btn-primary');
  a.href = `${show.url}`;
  a.textContent = `More Info`;
  cardBody.append(a);

  card.append(cardBody);

  body.append(card);
};
