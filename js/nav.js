// Toggle mobile navigation menu

document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  navToggle.addEventListener('click', function() {
    document.body.classList.toggle('nav-open');
  });

  // Sticky shrink on scroll
  const header = document.querySelector('.site-header');
  const shrinkThreshold = 80;
  window.addEventListener('scroll', () => {
    if (window.scrollY > shrinkThreshold) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  });
});
