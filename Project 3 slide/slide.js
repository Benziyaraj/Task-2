const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.getElementById("dots");
const carousel = document.getElementById("carousel");

let current = 0;
let autoPlay;

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goTo(i));
  dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll(".dots button");

function updateUI() {
  dots.forEach((d, i) => d.classList.toggle("active", i === current));
}

function goTo(index) {
  current = (index + slides.length) % slides.length;
  track.scrollTo({ left: slides[current].offsetLeft, behavior: "smooth" });
  updateUI();
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

// autoplay
function startAutoPlay() { autoPlay = setInterval(next, 3000); }
function stopAutoPlay() { clearInterval(autoPlay); }

// Events
nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
});

carousel.addEventListener("mouseenter", stopAutoPlay);
carousel.addEventListener("mouseleave", startAutoPlay);

// Track scroll to sync dots
track.addEventListener("scroll", () => {
  let index = Math.round(track.scrollLeft / track.offsetWidth);
  if (index !== current) {
    current = index;
    updateUI();
  }
});

// init
updateUI();
startAutoPlay();
