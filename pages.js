(function () {
  const grid = document.getElementById("appGrid");
  const cards = Array.from(document.querySelectorAll(".app-card"));
  const filters = Array.from(document.querySelectorAll(".filter-button"));
  const links = Array.from(document.querySelectorAll(".app-card a"));
  const search = document.getElementById("productSearch");
  const resultCount = document.getElementById("resultCount");
  const emptyState = document.getElementById("emptyState");
  let activeFilter = "all";

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function searchableText(card) {
    return normalize(card.textContent + " " + (card.dataset.keywords || ""));
  }

  function updateLastOpened(href) {
    cards.forEach((card) => {
      const matches = Array.from(card.querySelectorAll("a")).some((link) => link.getAttribute("href") === href);
      card.classList.toggle("is-last-opened", matches);

      let marker = card.querySelector(".last-opened");
      if (matches && !marker) {
        marker = document.createElement("span");
        marker.className = "last-opened";
        marker.textContent = "Last opened";
        card.insertBefore(marker, card.firstChild);
      } else if (!matches && marker) {
        marker.remove();
      }
    });
  }

  function applyFilter() {
    const query = normalize(search && search.value);
    let visible = 0;

    cards.forEach((card) => {
      const stateMatches = activeFilter === "all" || card.dataset.state === activeFilter;
      const queryMatches = !query || searchableText(card).includes(query);
      const matches = stateMatches && queryMatches;
      card.classList.toggle("is-hidden", !matches);
      if (matches) {
        visible += 1;
      }
    });

    filters.forEach((button) => {
      const active = button.dataset.filter === activeFilter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (grid) {
      grid.setAttribute("aria-label", visible + " visible product cards");
    }

    if (resultCount) {
      resultCount.textContent = "Showing " + visible + " product" + (visible === 1 ? "" : "s");
    }

    if (emptyState) {
      emptyState.hidden = visible !== 0;
    }
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "all";
      applyFilter();
    });
  });

  if (search) {
    search.addEventListener("input", applyFilter);
  }

  links.forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href") || "";
      try {
        localStorage.setItem("portfolio:last-opened", href);
      } catch (error) {
        // Browser storage is optional; links continue to work without it.
      }
      updateLastOpened(href);
    });
  });

  try {
    updateLastOpened(localStorage.getItem("portfolio:last-opened") || "");
  } catch (error) {
    updateLastOpened("");
  }

  applyFilter();
})();
