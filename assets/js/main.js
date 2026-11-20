/**
* Template Name: Mentor
* Template URL: https://bootstrapmade.com/mentor-free-education-bootstrap-theme/
* Updated: Jul 07 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  
function mobileNavToogle() {
  document.body.classList.toggle('mobile-nav-active');

  mobileNavToggleBtn.classList.toggle('bi-list');
  mobileNavToggleBtn.classList.toggle('bi-x');

  const isOpen = document.body.classList.contains('mobile-nav-active');

  mobileNavToggleBtn.setAttribute('aria-expanded', String(isOpen));

  mobileNavToggleBtn.setAttribute(
    'aria-label',
    isOpen ? 'Close navigation menu' : 'Open navigation menu'
  );
}

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: false,
      mirror: false,
      offset: 80,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Forms: no backend on GitHub Pages, so stop the POST and show the thank-you message.
   * shortcut: nothing is actually sent; point the form action at a form service (e.g. Formspree) when real delivery is needed
   */
  document.querySelectorAll('.email-form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      form.querySelector('.sent-message').classList.add('d-block');
      form.reset();
    });
  });

})();

  /**
   * Project 3: Active navigation on scroll
   */
  const navLinks = Array.from(
    document.querySelectorAll('#navmenu a[href^="#"]')
  );

  const navSections = navLinks
    .map(link => {
      const target = link.getAttribute('href');
      return document.querySelector(target);
    })
    .filter(section => section !== null);

  function updateActiveNavigation() {
    const header = document.querySelector('#header');
    const headerHeight = header ? header.offsetHeight : 0;

    const scrollPosition = window.scrollY + headerHeight + 140;

    let currentSection = navSections[0];

    navSections.forEach(section => {
      if (section.offsetTop <= scrollPosition) {
        currentSection = section;
      }
    });

    navLinks.forEach(link => {
      const isActive =
        currentSection &&
        link.getAttribute('href') === `#${currentSection.id}`;

      link.classList.toggle('active', isActive);

      if (isActive) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavigation, {
    passive: true
  });

  window.addEventListener('load', updateActiveNavigation);
  window.addEventListener('resize', updateActiveNavigation);
