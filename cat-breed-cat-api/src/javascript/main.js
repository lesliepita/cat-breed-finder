import { getData } from "./api.js";

let breedsData = [];

window.addEventListener("load", async () => {
  try {
    breedsData = await getData();
    renderList(breedsData);

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
      renderList(breedsData);

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

  } catch (error) {
    document.getElementById("app").textContent = "Error loading data: " + error.message;
  }
});

function renderList(data) {
  const app = document.getElementById("app");
  app.innerHTML = "";
  if (data.length === 0) {
    app.textContent = "No breeds found.";
    return;
  }

  data.forEach(breed => {
    const breedDiv = renderBreed(breed);
    app.appendChild(breedDiv);
  });
}

const searchIcon = document.getElementById("search-icon");

searchIcon.addEventListener("click", () => {
  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";

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

function renderBreed(breed) {
  const container = document.createElement("div");
  container.classList.add("breed-container");

  const image = document.createElement("img");
  image.alt = breed.name || "Cat image";
  image.classList.add("breed-image");
  container.appendChild(image);

  function showImage(url) {
    image.src = url;
  }

  if (breed.image && breed.image.url) {
    showImage(breed.image.url);
  } else if (breed.id === "malayan" || breed.name.toLowerCase() === "malayan") {
    showImage("https://upload.wikimedia.org/wikipedia/commons/f/f9/IMGP1134_%2851750850378%29.jpg");
  } else {
    fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0 && data[0].url) {
          showImage(data[0].url);
        } else {
          showImage("/default-cat.jpg");
        }
      })
      .catch(() => {
        showImage("/default-cat.jpg");
      });
  }

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("breed-info-container");

  const name = document.createElement("h2");
  name.textContent = breed.name || "Unknown breed";
  name.classList.add("breed-name");
  infoContainer.appendChild(name);

  if (breed.origin) {
    const origin = document.createElement("p");
    origin.textContent = `Origin: ${breed.origin}`;
    origin.classList.add("breed-origin");
    infoContainer.appendChild(origin);
  }

  if (breed.life_span) {
    const lifeSpan = document.createElement("p");
    lifeSpan.textContent = `Life span: ${breed.life_span} years`;
    lifeSpan.classList.add("breed-lifespan");
    infoContainer.appendChild(lifeSpan);
  }

  if (breed.intelligence !== undefined) {
    const intelligence = document.createElement("p");
    intelligence.textContent = `Intelligence: ${breed.intelligence}`;
    intelligence.classList.add("breed-intelligence");
    infoContainer.appendChild(intelligence);
  }

  if (breed.hypoallergenic !== undefined) {
    const hypo = document.createElement("p");
    hypo.textContent = `Hypoallergenic: ${breed.hypoallergenic === 1 ? "Yes" : "No"}`;
    hypo.classList.add("breed-hypoallergenic");
    infoContainer.appendChild(hypo);
  }

  if (breed.description) {
    const description = document.createElement("p");
    description.textContent = breed.description;
    description.classList.add("breed-description");
    infoContainer.appendChild(description);
  }

  if (breed.wikipedia_url) {
    const wikiLink = document.createElement("a");
    wikiLink.href = breed.wikipedia_url;
    wikiLink.target = "_blank";
    wikiLink.textContent = "More info on Wikipedia";
    wikiLink.classList.add("breed-wiki-link");
    infoContainer.appendChild(wikiLink);
  }

  container.appendChild(infoContainer);

  return container;
}

