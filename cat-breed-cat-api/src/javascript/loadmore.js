let currentIndex = 0;
const pageSize = 6;
let allBreeds = [];
let renderListFunction;

export function setupLoadMore(breedsData, renderList) {
  allBreeds = breedsData;
  renderListFunction = renderList;
  currentIndex = 0;

  const loadMoreBtn = document.getElementById("load-more");
  if (!loadMoreBtn) return;

  loadMoreBtn.addEventListener("click", () => {
    loadMore();
  });

  loadMore();
}

function loadMore() {
  const nextIndex = currentIndex + pageSize;
  const breedsToShow = allBreeds.slice(0, nextIndex);
  renderListFunction(breedsToShow);
  currentIndex = nextIndex;

  const loadMoreBtn = document.getElementById("load-more");
  if (currentIndex >= allBreeds.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}
