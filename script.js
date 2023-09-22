const productList = document.getElementById('productList');
const form = document.getElementById('searchForm');
const searchContent = document.getElementById('searchContent');
const alertMessage = document.getElementById('alertMessage');

async function makeRequest() {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  console.log(data);
  data.products.map(
    (product) =>
      (productList.innerHTML += `
    <div class="card mt-2" style="width: 18rem;">
    <img class="card-img-top" src=${product.thumbnail} alt="Card image cap">
    <div class="card-body">
      <p class="card-text">${product.title}</p>
    </div>
  </div>
    `)
  );
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  searchContent.innerHTML = '';
  alertMessage.setAttribute('hidden', true);
  const searchText = e.target.searchText.value;
  console.log(searchText);
  if (searchText) {
    console.log('hello');
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${searchText}`
    );
    const data = await res.json();
    if (data.products.length === 0) {
      alertMessage.removeAttribute('hidden');
      alertMessage.innerHTML = 'no matching results';
    }
    data.products.map(
      (product) =>
        (searchContent.innerHTML += `
        <div class="card mt-2" style="width: 18rem;">
        <img class="card-img-top" src=${product.thumbnail} alt="Card image cap">
        <div class="card-body">
          <p class="card-text">${product.title}</p>
        </div>
      </div>
        `)
    );
  } else {
    alertMessage.removeAttribute('hidden');
    alertMessage.innerHTML = 'Please enter Search field';
  }
});

window.onload = (event) => {
  makeRequest();
};