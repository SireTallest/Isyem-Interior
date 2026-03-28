
const sections = document.querySelectorAll('section[id]');

// 2. Grab all bottom nav items and desktop nav links
const bottomNavItems = document.querySelectorAll('.bottom-nav__item');
const desktopNavLinks = document.querySelectorAll('.top-nav__links .nav-link:not(.nav-link--cta)');

// 3. This function sets the correct nav item as active
function setActiveNav(sectionId) {

  // Update bottom nav
  bottomNavItems.forEach(item => {
    // item.getAttribute('href') returns e.g. "#home"
    // sectionId is e.g. "home" — so we compare with a # prefix
    if (item.getAttribute('href') === `#${sectionId}`) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Update desktop nav
  desktopNavLinks.forEach(link => {
    if (link.getAttribute('href') === `#${sectionId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// 4. Create the IntersectionObserver
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      // entry.isIntersecting = true means the section is currently visible
      if (entry.isIntersecting) {
        setActiveNav(entry.target.id);
      }
    });
  },
  {
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0,
  }
);

// 5. Tell the observer to watch every section
sections.forEach(section => observer.observe(section));
// Hero slider
const slides = document.querySelectorAll('.hero-slides .slide');
let current = 0;

setInterval(() => {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}, 5000);

const lightbox = lightbox({
  touchNavigation: true,
  loop: true,
  autoplayVideos: true
});

const galleryItems = document.querySelectorAll('.gallery-item');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const itemsPerLoad = 3;
let visibleCount = 5;

//  hide everything beyond the first 6 on page load
galleryItems.forEach((item, index) => {
  if (index >= visibleCount) {
    item.classList.add('hidden');
  }
});

//  on button click, reveal the next batch
loadMoreBtn.addEventListener('click', () => {
  
  // how many items to show now
  const newVisible = visibleCount + itemsPerLoad;

  // loop through items and remove .hidden up to newVisible
  galleryItems.forEach((item, index) => {
    if (index < newVisible) {
      item.classList.remove('hidden');
    }
  });

  // update the count
  visibleCount = newVisible;

  // hide button when all items are visible
  if (visibleCount >= galleryItems.length) {
    loadMoreBtn.style.display = 'none';
  }

});