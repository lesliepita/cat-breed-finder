export function setupNavResponsive() {
  const searchIcon = document.getElementById("search-icon");
  const mobileSearchIcon = document.getElementById("mobile-search-icon");
  const searchBar = document.querySelector(".search-bar");

  if (!searchBar) return;

  if (searchIcon) {
    searchIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      if (window.innerWidth <= 768) {
        searchBar.classList.toggle("active");
      }
    });
  }

  if (mobileSearchIcon) {
    mobileSearchIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      if (window.innerWidth <= 768) {
        searchBar.classList.toggle("active");
      }
    });
  }

  document.addEventListener("click", (e) => {
    if (
      window.innerWidth <= 768 &&
      !searchBar.contains(e.target) &&
      !(searchIcon && searchIcon.contains(e.target)) &&
      !(mobileSearchIcon && mobileSearchIcon.contains(e.target))
    ) {
      searchBar.classList.remove("active");
    }
  });
}


