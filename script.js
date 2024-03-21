async function fetchNews(query) {
  try {
    const apiKey = "9c578be479284278babb4d46c0a5acf9";
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

function displayNews(articles) {
  const newsContainer = document.getElementById("newsContainer");
  newsContainer.innerHTML = "";

  articles.forEach((article) => {
    const newsCard = `
    <div class="col-md-4 mb-4">
      <div class="card">
        <img src="${article.urlToImage}" class="card-img-top" alt="${article.title}">
        <div class="card-body">
          <h5 class="card-title">${article.title}</h5>
          <p class="card-text">${article.description}</p>
          <a href="${article.url}" target="_blank" class="btn btn-primary">Baca Selengkapnya</a>
        </div>
      </div>
    </div>
  `;
    newsContainer.innerHTML += newsCard;
  });
}

document
  .getElementById("searchInput")
  .addEventListener("input", function () {
    const query = this.value;
    if (query.trim() !== "") {
      fetchNews(query);
    }
  });

function fetchDefaultNews() {
  const defaultQuery = "berita";
  fetchNews(defaultQuery);
}

window.onload = fetchDefaultNews;