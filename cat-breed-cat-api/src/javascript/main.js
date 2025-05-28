import { getData } from "../javascript/api.js";
import { renderList } from "../javascript/info.js";
import { setupLoadMore } from "../javascript/loadmore.js";
import { setupSearch } from "../javascript/navsearch.js";
import { setupZoom } from "../javascript/zoom.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { initCatCarousel } from './carousel.js';
import { setupNavResponsive } from './navresponsive.js';

let breedsData = [];

window.addEventListener("load", async () => {
  try {
    breedsData = await getData();
    renderList(breedsData);
    setupLoadMore(breedsData, renderList);
    setupSearch(breedsData, renderList);
    setupZoom();
    initCatCarousel();
    setupNavResponsive();
  } catch (error) {
    document.getElementById("app").textContent = "Error loading data: " + error.message;
  }
});

const startYear = 2025;
const currentYear = new Date().getFullYear();
const yearSpan = document.getElementById("year-span");

yearSpan.textContent = `${startYear}${currentYear !== startYear ? "–" + currentYear : ""}`;

