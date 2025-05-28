export function initCatCarousel() {
  const carouselInner = document.getElementById("carousel-inner");
  if (!carouselInner) return;

  carouselInner.innerHTML = "";

  const fixedImageUrl = "https://cdn2.thecatapi.com/images/1ac.gif";

  const fixedDiv = document.createElement("div");
  fixedDiv.className = "carousel-item active";
  fixedDiv.innerHTML = `
    <img src="${fixedImageUrl}" alt="Fixed cat image" style="max-height: 460px; width: 100%; object-fit: contain;">
  `;
  carouselInner.appendChild(fixedDiv);

  fetch("https://api.thecatapi.com/v1/images/search?limit=4")
    .then(response => response.json())
    .then(data => {
      data.forEach(cat => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "carousel-item";
        itemDiv.innerHTML = `
          <img src="${cat.url}" alt="Random cat image" style="max-height: 460px; width: 100%; object-fit: contain;">
        `;
        carouselInner.appendChild(itemDiv);
      });

      const prevBtnIcon = document.querySelector(".carousel-control-prev-icon");
      const nextBtnIcon = document.querySelector(".carousel-control-next-icon");

      if (prevBtnIcon) {
        prevBtnIcon.style.backgroundImage = `url("data:image/svg+xml;charset=utf8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23000' viewBox='0 0 16 16'%3e%3cpath d='M11.354 1.146a.5.5 0 0 1 0 .708L5.707 7.5l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e")`;
      }
      if (nextBtnIcon) {
        nextBtnIcon.style.backgroundImage = `url("data:image/svg+xml;charset=utf8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23000' viewBox='0 0 16 16'%3e%3cpath d='M4.646 1.146a.5.5 0 0 0 0 .708L10.293 7.5 4.646 13.146a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708l-6-6a.5.5 0 0 0-.708 0z'/%3e%3c/svg%3e")`;
      }
    })
    .catch(error => {
      carouselInner.innerHTML += `<div class="alert alert-danger">Error loading images: ${error.message}</div>`;
    });
}

function displayResults(results) {
  const resultsContainer = document.getElementById("app");
  const carousel = document.getElementById("catCarousel");

  if (!resultsContainer || !carousel) return;

  if (results.length > 0) {
    resultsContainer.innerHTML = results.map(item => `<div>${item.name}</div>`).join("");
    carousel.style.display = "none";
  } else {
    resultsContainer.innerHTML = "";
    carousel.style.display = "block";
  }
}

