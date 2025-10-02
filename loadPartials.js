document.addEventListener('DOMContentLoaded', () => {
  // Load Header
  fetch('partials/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;
    });

  // Load Footer
  fetch('partials/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    });
});
