export function renderList(breeds, center = false) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  if (center) {
    app.classList.add("centered-result");
  } else {
    app.classList.remove("centered-result");
  }

  if (breeds.length === 0) {
    app.textContent = "No breeds found.";
    return;
  }

  breeds.forEach(breed => {
    const breedDiv = renderBreed(breed);
    app.appendChild(breedDiv);
  });
}

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

  if (breed.weight && breed.weight.metric) {
    const weight = document.createElement("p");
    weight.textContent = `Weight: ${breed.weight.metric} kg`;
    weight.classList.add("breed-weight");
    infoContainer.appendChild(weight);
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

