(function () {
  const links = Array.from(document.querySelectorAll(".app-card a"));
  links.forEach((link) => {
    link.addEventListener("click", () => {
      try {
        localStorage.setItem("portfolio:last-opened", link.getAttribute("href") || "");
      } catch (error) {
        // Browser storage is optional; links continue to work without it.
      }
    });
  });
})();