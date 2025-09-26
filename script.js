gsap.registerPlugin(ScrollTrigger);

const pickupSound = new Audio('assets/pickup.mp3');
let soundEnabled = false;
document.body.addEventListener('click', () => soundEnabled = true);

// Initialize Locomotive Scroll
const scrollContainer = document.querySelector('[data-scroll-container]');
const locoScroll = new LocomotiveScroll({
  el: scrollContainer,
  smooth: true
});

// Tell ScrollTrigger to use LocomotiveScroll as scrollerProxy
ScrollTrigger.scrollerProxy(scrollContainer, {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: scrollContainer.style.transform ? "transform" : "fixed"
});

locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

// Apply glitch effect to section headers
document.querySelectorAll('section').forEach(sec => {
  const header = sec.querySelector('h2');
  if (!header) return;
  header.classList.add('glitch-text');
  header.setAttribute('data-text', header.textContent);

  ScrollTrigger.create({
    trigger: sec,
    scroller: scrollContainer,
    start: "top 75%",
    once: true,
    onEnter: () => {
      if (soundEnabled) pickupSound.play().catch(()=>{});
      header.classList.add('glitch-active');
      setTimeout(() => header.classList.remove('glitch-active'), 500);
    }
  });
});
