// Mobile menu toggle functionality
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      navLinks.classList.remove('open');
    });
  });
}

const galleryFilters = document.querySelectorAll('.gallery-filter');
const galleryBlocks = Array.from(document.querySelectorAll('.gallery-block'));
const galleryTabs = document.querySelector('.gallery-tabs');
let autoScrollTimer = null;
let autoScrollIndex = 0;
const autoScrollDelay = 5000;

function setGalleryFilter(category) {
  galleryFilters.forEach(button => {
    button.classList.toggle('active', button.dataset.filter === category);
  });

  galleryBlocks.forEach(block => {
    const isMatch = category === 'all' || block.dataset.category === category;
    block.classList.toggle('hidden', !isMatch);
  });

  autoScrollIndex = 0;
  if (galleryTabs) {
    const visible = galleryBlocks.filter(block => !block.classList.contains('hidden'));
    if (visible.length) {
      visible[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function scrollGalleryBlocks() {
  const visibleBlocks = galleryBlocks.filter(block => !block.classList.contains('hidden'));
  if (!visibleBlocks.length) return;

  autoScrollIndex = (autoScrollIndex + 1) % visibleBlocks.length;
  visibleBlocks[autoScrollIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function startGalleryAutoScroll() {
  stopGalleryAutoScroll();
  autoScrollTimer = window.setInterval(scrollGalleryBlocks, autoScrollDelay);
}

function stopGalleryAutoScroll() {
  if (autoScrollTimer !== null) {
    window.clearInterval(autoScrollTimer);
    autoScrollTimer = null;
  }
}

if (galleryFilters.length && galleryBlocks.length) {
  galleryFilters.forEach(button => {
    button.addEventListener('click', () => {
      setGalleryFilter(button.dataset.filter);
      startGalleryAutoScroll();
    });
  });

  if (galleryTabs) {
    galleryTabs.addEventListener('mouseenter', stopGalleryAutoScroll);
    galleryTabs.addEventListener('mouseleave', startGalleryAutoScroll);
  }

  setGalleryFilter('all');
  startGalleryAutoScroll();
}
