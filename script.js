document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  // ---------- 1. Search / filter book cards ----------
  const books = document.querySelectorAll(".book");

  function filterBooks() {
    const q = $("searchInput").value.trim().toLowerCase();
    let shown = 0;
    books.forEach((b) => {
      const text = (b.dataset.title + " " + b.dataset.cat).toLowerCase(); // combine title + category
      const match = text.includes(q); // check if the search term is inside that text
      b.classList.toggle("hidden", !match);
      if (match) shown++;
    });
    $("noResults").hidden = shown > 0;
  }

  $("searchInput").addEventListener("input", filterBooks);
  $("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    filterBooks();
  });

  // ---------- 2. Newsletter validation (no real server) ----------
  $("newsForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("email").value.trim(); // trim removes extra spaces
    const msg = $("formMsg");
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email); // email patten check karanwa 
    msg.className = valid ? "ok" : "err";
    msg.textContent = valid
      ? "Thanks for subscribing! Check " + email + " for updates."
      : "Please enter a valid email address.";
    if (valid) $("newsForm").reset(); // clear karanawa input validnam 
  });

  // ---------- 3. DOM interactions: explore button, view details, view all, mobile menu ----------
  $("exploreBtn").addEventListener("click", () => $("books").scrollIntoView({ behavior: "smooth" }));

  document.querySelectorAll(".btn-light").forEach((btn) =>
    btn.addEventListener("click", () => {
      const card = btn.closest(".book");
      alert(card.dataset.title + "\nCategory: " + card.dataset.cat);
    })
  );

  $("viewAll").addEventListener("click", (e) => {
    e.preventDefault();
    $("searchInput").value = "";
    filterBooks();
  });

  $("menuToggle").addEventListener("click", () => {
    const nav = $("mainNav");
    const isOpen = nav.classList.toggle("open");
    $("menuToggle").setAttribute("aria-expanded", isOpen);
  });

  document.querySelectorAll("#mainNav a").forEach((a) =>
    a.addEventListener("click", () => $("mainNav").classList.remove("open"))
  );
});
