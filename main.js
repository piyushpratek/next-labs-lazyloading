const resultsContainer = document.getElementById('results');
const loadingContainer = document.getElementById('loading');
let currentPage = 1;
const resultsPerPage = 10;
let isLoading = false;

function fetchResults() {
  isLoading = true;
  fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((product) => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <img src="${product.image}" alt="${product.title}" style="max-width: 100px; height: auto;">
        `;
        resultsContainer.appendChild(productElement);
      });
      isLoading = false;
      loadingContainer.style.display = 'none';
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      isLoading = false;
      loadingContainer.style.display = 'none';
    });
}

// Function to check if the user has reached the end of the page
function isAtEndOfPage() {
  const windowHeight = window.innerHeight;
  const scrollTop = document.documentElement.scrollTop;
  const totalHeight = document.documentElement.scrollHeight;
  return totalHeight - (scrollTop + windowHeight) < 100;
}

// Function to load more results when the user reaches the end of the page
function loadMoreResults() {
  if (!isLoading && isAtEndOfPage()) {
    currentPage++;
    loadingContainer.style.display = 'block';
    fetchResults();
  }
}

window.addEventListener('scroll', loadMoreResults);
fetchResults();
