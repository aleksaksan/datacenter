const section = document.getElementById('horizontal-section');
const container = document.getElementById('scroll-container');
const sticky = document.getElementById('sticky-container');
const blocks = container.children;

const blockCount = blocks.length;
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

// Установить ширину контейнера
container.style.width = `${blockCount * 100}vw`;

// Высота секции
section.style.height = `${blockCount * 100}vh`;

window.addEventListener('scroll', () => {
  const rect = section.getBoundingClientRect();
  const offsetTop = Math.abs(rect.top);
  const maxScroll = (blockCount - 1) * windowHeight; // максимум скролла внутри секции
  const scrollInside = Math.min(offsetTop, maxScroll); // ограничение максимума

  const progress = scrollInside / maxScroll; // пропорция движения
  const totalMove = (blockCount - 1) * windowWidth;
  const translateX = progress * totalMove;

  const stickyRect = sticky.getBoundingClientRect();
  const stickyTop = stickyRect.top;

  // Если контейнер прилип — двигаем
  if (stickyTop === 0) {
    container.style.transform = `translateX(-${translateX}px)`;
  }
  // Если скролл выше начала — сброс
  else if (stickyTop > 0) {
    container.style.transform = `translateX(0)`;
  }
  // Если скролл ниже конца секции — фиксируем на максимуме
  else if (offsetTop >= maxScroll) {
    container.style.transform = `translateX(-${totalMove}px)`;
  }
});
