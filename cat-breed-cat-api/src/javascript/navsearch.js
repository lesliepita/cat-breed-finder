export function setupSearch(breedsData, renderList) {
  const input = document.getElementById("search-input");
  const suggestions = document.getElementById("suggestions");
  const searchIcon = document.getElementById("search-icon");

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    suggestions.innerHTML = "";

    if (query.length === 0) {
      renderList(breedsData);
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
        renderList([breed]);
      });
      suggestions.appendChild(li);
    });
  });

  searchIcon.addEventListener("click", () => {
    input.value = "";
    suggestions.innerHTML = "";
    renderList([]);

    breedsData.forEach(breed => {
      const li = document.createElement("li");
      li.textContent = breed.name;
      li.style.cursor = "pointer";
      li.addEventListener("click", () => {
        input.value = breed.name;
        suggestions.innerHTML = "";
        renderList([breed]);
      });
      suggestions.appendChild(li);
    });
  });
}
