let form = document.querySelector('.catchForm');
let productListHere = document.querySelector('.productListHere');
let clearButton = document.querySelector('.clear');
let productList = [];

function handleFormSubmit(e) {
  e.preventDefault();
  let formData = new FormData(form);
  let formObj = Object.fromEntries(formData);
  formObj.price = parseFloat(formObj.price);
  productList.push(formObj);
  form.reset();
  save();
  renderList();
}

function save() {
  localStorage.setItem('productList', JSON.stringify(productList));
}

function renderList() {
  productListHere.innerHTML = '';
  let categories = {};

  productList.forEach(product => {
    if (!categories[product.category]) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);
  });

  for (let category in categories) {
    let categoryProducts = categories[category];
    let categoryTotal = categoryProducts.reduce((total, product) => total + product.price, 0);

    productListHere.innerHTML += `
      <h3>${category} (Toplam: ${categoryTotal} TL)</h3>
      <ul>
        ${categoryProducts.map(product => `
          <li>Ürün Adı: ${product.productName}</li>
          <li>Fiyatı: ${product.price} TL</li>
          <li>Ürün Açıklaması: ${product.explanation}</li>
          <li>Ürün Detayı: ${product.productDetail}</li>
          <li>Ürün Fotoğrafı: <img src="${product.productPhoto}" alt="${product.productName}"></li>
        `).join('')}
      </ul>
    `;
  }
}

function clearList() {
  if (!confirm('Tüm ürünleri silmek istediğinizden emin misiniz?')) return;
  localStorage.removeItem('productList');
  productList = [];
  renderList();
}

form.addEventListener('submit', handleFormSubmit);
clearButton.addEventListener('click', clearList);
