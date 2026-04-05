document.querySelector('.intro').classList.add('start');
document.querySelector('.sub-intro').classList.add('start');
document.querySelector('.social').classList.add('start');

const nav = document.querySelector('.nav');
const burger = document.querySelector('.burger');
const mobileNav = document.querySelector('.mobile-nav');

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (lastScrollY < window.scrollY) {
    nav.style.top = '-100px';
  } else {
    nav.style.top = '0';
  }
  lastScrollY = window.scrollY;
});

burger.addEventListener('click', () => {
  mobileNav.style.left = mobileNav.style.left === '0px' ? '-100%' : '0';
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
    if (mobileNav.style.left === '0px') {
      mobileNav.style.left = '-100%';
    }
  });
});

// Intersection Observer for section reveals
const sections = document.querySelectorAll('.section');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15 // Trigger when 15% of the section is visible
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // Stop observing once visible
    }
  });
}, observerOptions);

sections.forEach(section => {
  sectionObserver.observe(section);
});

// Custom cursor logic
const cursorSmall = document.querySelector('.cursor--small');
const links = document.querySelectorAll('.link');

const onMouseMove = (e) => {
  cursorSmall.style.transform = `translate3d(${e.clientX - cursorSmall.offsetWidth / 2}px, ${e.clientY - cursorSmall.offsetHeight / 2}px, 0)`;
};

const onMouseEnterLink = () => {
  cursorSmall.style.transform = `scale(2)`;
  cursorSmall.style.backgroundColor = `var(--primary-accent)`; // Use CSS variable
};

const onMouseLeaveLink = () => {
  cursorSmall.style.transform = `scale(1)`;
  cursorSmall.style.backgroundColor = `var(--text-color)`; // Use CSS variable
};

document.addEventListener('mousemove', onMouseMove);

links.forEach(link => {
  link.addEventListener('mouseenter', onMouseEnterLink);
  link.addEventListener('mouseleave', onMouseLeaveLink);
});
