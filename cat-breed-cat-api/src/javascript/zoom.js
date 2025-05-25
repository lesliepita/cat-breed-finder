export function setupZoom() {
  document.addEventListener("click", function (e) {
    const img = e.target.closest(".breed-image");
    if (!img) return;

    img.classList.toggle("zoomed");

    if (!img.classList.contains("zoomed")) {
      img.style.transformOrigin = "center center";
    }
  });

  document.addEventListener("mousemove", function (e) {
    const img = e.target.closest(".breed-image.zoomed");
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    img.style.transformOrigin = `${x}% ${y}%`;
  });
}
