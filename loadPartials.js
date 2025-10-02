// loadPartials.js
document.addEventListener("DOMContentLoaded", () => {
  const load = async (placeholderId, url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
      const html = await res.text();
      const el = document.getElementById(placeholderId);
      if (el) el.innerHTML = html;
    } catch (err) {
      console.error(err);
    }
  };

  load('header-placeholder', 'partials/header.html');
  load('footer-placeholder', 'partials/footer.html');
});
