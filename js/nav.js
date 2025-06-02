// Toggle mobile navigation menu

document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const body = document.body;

  navToggle.addEventListener('click', function() {
    body.classList.toggle('nav-open');
  });
});
