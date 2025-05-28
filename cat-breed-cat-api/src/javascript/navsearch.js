export function setupSearch(breedsData, renderList) {
  const input = document.getElementById("search-input");
  const suggestions = document.getElementById("suggestions");
  const searchIcon = document.getElementById("search-icon");
  const carousel = document.getElementById("catCarousel");

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    suggestions.innerHTML = "";

    if (carousel) {
      if (query.length > 0) {
        carousel.classList.add("hidden");
      } else {
        carousel.classList.remove("hidden");
      }
    }

    if (query.length === 0) {
      renderList(breedsData, false);
      return;
    }

    const filtered = breedsData.filter(breed =>
      breed.name.toLowerCase().startsWith(query)
    );

    filtered.forEach(breed => {
      const li = document.createElement("li");
      li.textContent = breed.name;
      li.style.cursor = "pointer";
      li.addEventListener("click", () => {
        input.value = breed.name;
        suggestions.innerHTML = "";

        if (carousel) {
          carousel.classList.add("hidden");
        }

        renderList([breed], true);
      });
      suggestions.appendChild(li);
    });

    if (filtered.length === 1) {
      renderList(filtered, true);
    } else {
      renderList(filtered, false);
    }
  });

  searchIcon.addEventListener("click", () => {
    input.value = "";
    suggestions.innerHTML = "";

    renderList(breedsData, false);

    if (carousel) {
      carousel.classList.remove("hidden");
    }

    breedsData.forEach(breed => {
      const li = document.createElement("li");
      li.textContent = breed.name;
      li.style.cursor = "pointer";
      li.addEventListener("click", () => {
        input.value = breed.name;
        suggestions.innerHTML = "";

        if (carousel) {
          carousel.classList.add("hidden");
        }

        renderList([breed], true);
      });
      suggestions.appendChild(li);
    });
  });
}
