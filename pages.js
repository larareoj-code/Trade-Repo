(function () {
  const grid = document.getElementById("appGrid");
  const cards = Array.from(document.querySelectorAll(".app-card"));
  const filters = Array.from(document.querySelectorAll(".filter-button"));
  const links = Array.from(document.querySelectorAll(".app-card a"));

  function applyFilter(filter) {
    let visible = 0;

    cards.forEach((card) => {
      const matches = filter === "all" || card.dataset.state === filter;
      card.classList.toggle("is-hidden", !matches);
      if (matches) {
        visible += 1;
      }
    });

    filters.forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (grid) {
      grid.setAttribute("aria-label", visible + " visible product cards");
    }
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      applyFilter(button.dataset.filter || "all");
    });
  });

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
