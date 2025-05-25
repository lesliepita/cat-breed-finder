import { getData } from "../javascript/api.js";
import { renderList } from "../javascript/info.js";
import { setupLoadMore } from "../javascript/loadmore.js";
import { setupSearch } from "../javascript/navsearch.js";
import { setupZoom } from "../javascript/zoom.js";

let breedsData = [];

window.addEventListener("load", async () => {
  try {
    breedsData = await getData();
    renderList(breedsData);
    setupLoadMore(breedsData, renderList);
    setupSearch(breedsData, renderList);
    setupZoom();
  } catch (error) {
    document.getElementById("app").textContent = "Error loading data: " + error.message;
  }
});