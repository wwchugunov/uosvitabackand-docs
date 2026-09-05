document.querySelector('[data-print]').addEventListener('click', () => window.print());

const links = [...document.querySelectorAll('.toc a')];
const sections = links
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).at(-1);
  if (!visible) return;
  links.forEach((link) => link.classList.toggle('active', link.hash === `#${visible.target.id}`));
}, { rootMargin: '-20% 0px -70%' });

sections.forEach((section) => observer.observe(section));

