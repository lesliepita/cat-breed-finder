import { getData } from "../javascript/api";

window.addEventListener("load", async () => {
  try {
    const data = await getData();
    const list = document.createElement("ul");

    data.forEach((catBreed) => {
      const listItem = document.createElement("li");
      listItem.style.marginBottom = "20px";

      const name = document.createElement("h2");
      name.textContent = catBreed.name;
      name.style.fontWeight = "bold";

      const origin = document.createElement("p");
      origin.textContent = `Origin: ${catBreed.origin}`;

      const lifeSpan = document.createElement("p");
      lifeSpan.textContent = `Life span: ${catBreed.life_span} years`;

      const description = document.createElement("p");
      description.textContent = catBreed.description;

      const intelligence = document.createElement("p");
      intelligence.textContent = `Intelligence: ${catBreed.intelligence}`;

      const hypoallergenic = document.createElement("p");
      hypoallergenic.textContent = `Hypoallergenic: ${
        catBreed.hypoallergenic === 1 ? "Yes" : "No"
      }`;

      const wikiLink = document.createElement("a");
      wikiLink.href = catBreed.wikipedia_url || "#";
      wikiLink.target = "_blank";
      wikiLink.textContent = "More info on Wikipedia";
      wikiLink.style.color = "blue";
      wikiLink.style.textDecoration = "underline";

      const image = document.createElement("img");
      image.src = catBreed.image?.url || "";
      image.style.width = "200px";
      image.style.height = "auto";
      image.style.display = "block";
      image.style.marginTop = "10px";

      listItem.appendChild(name);
      listItem.appendChild(origin);
      listItem.appendChild(lifeSpan);
      listItem.appendChild(description);
      listItem.appendChild(intelligence);
      listItem.appendChild(hypoallergenic);
      listItem.appendChild(wikiLink);
      listItem.appendChild(image);

      list.appendChild(listItem);
    });

    document.getElementById("app").appendChild(list);
  } catch (error) {
    document.getElementById("app").textContent =
      "Error loading data: " + error.message;
  }
});
