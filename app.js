// --- HEADER HIDE/SHOW ON SCROLL ---
let lastScrollY = window.scrollY;
const header = document.querySelector("header");
const body = document.body;

window.addEventListener("scroll", () => {
  if (lastScrollY < window.scrollY && window.scrollY > header.clientHeight) {
    header.classList.add("scrolled-down");
  } else {
    header.classList.remove("scrolled-down");
  }
  lastScrollY = window.scrollY;

  const scrollRatio =
    window.scrollY /
    (document.documentElement.scrollHeight - window.innerHeight);
  body.style.backgroundPosition = `0 ${scrollRatio * 150}px`;
});

// --- PARTICLES.JS CONFIGURATION ---
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: ["circle", "triangle"] },
    opacity: {
      value: 0.5,
      random: true,
      anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false },
    },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#ffffff",
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: { distance: 140, line_opacity: 0.7 },
      repulse: { distance: 150, duration: 0.4 },
      push: { particles_nb: 4 },
    },
  },
  retina_detect: true,
});

// --- HERO TEXT INITIAL ANIMATION ---
const h1 = document.querySelector(".animate-letters");
if (h1) {
  const text = h1.textContent;
  h1.innerHTML = "";
  text.split("").forEach((char, index) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.animationDelay = `${index * 0.05}s`;
    h1.appendChild(span);
  });
}

// --- SCROLL ANIMATIONS ---
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        const staggerChildren = entry.target.querySelectorAll(".stagger-child");
        staggerChildren.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add("visible");
          }, (index + 1) * 150);
        });
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

// --- PROJECT MODAL LOGIC ---
const projectData = {
  bls: {
    title: "Beamline For Schools Proposal",
    description:
      "A comprehensive research proposal submitted to the CERN Beamline for Schools competition. The project explores the impacts of symmetry in relativistic electron particle beam cross sections on beam quality, aiming to improve high-accuracy beam collimation techniques. This involves experimental physics, data modeling, and simulation.",
    image: "static/setup2.png",
    link: "#",
  },
  crowd: {
    title: "Crowd Dynamics Lab Research",
    description:
      "As part of the Crowd Dynamics Lab, I conducted advanced network analysis on the terms of service of major online platforms. The research focused on developing novel algorithms to parse, analyze, and visualize complex legal text, enhancing user transparency and and understanding of their rights and obligations.",
    image: "static/Reddit.png",
    link: "#",
  },
  fluxed: {
    title: "Fluxed: N-Dimensional Integral Library",
    description:
      "Fluxed is a Python library designed to compute definite integrals of distributions in complex N-dimensional shapes. It provides a user-friendly interface for advanced mathematical computations, making it easier for researchers and developers to perform high-dimensional integration tasks.",
    image: "static/fluxed.png",
    link: "https://pypi.org/project/fluxed/",
  },
  python: {
    title: "Python Projects Collection",
    description:
      "This repository is a curated collection of my work in Python, ranging from small scripts and exercises to more complex applications. It showcases my proficiency in the language and my ability to tackle a variety of problems, including data structures, algorithms, and more.",
    image: "static/logo.png",
    link: "https://github.com/CrazeXD?tab=repositories",
  },
};

const projectCards = document.querySelectorAll(".project-card");
const modal = document.getElementById("project-modal");
const closeModalButton = document.querySelector(".close-button");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalImageContainer = document.querySelector(".modal-image-container");
const modalLink = document.getElementById("modal-link");

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const projectId = card.dataset.project;
    const data = projectData[projectId];

    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    modalImageContainer.innerHTML = `<img src="${data.image}" alt="${data.title}">`;
    modalLink.href = data.link;

    modal.classList.add("active");
  });
});

function closeModal() {
  modal.classList.remove("active");
}

closeModalButton.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// --- REWRITTEN & FIXED: COSMIC RAY EVENT LOGIC ---

function checkCollision(elem1, elem2) {
  const rect1 = elem1.getBoundingClientRect();
  const rect2 = elem2.getBoundingClientRect();
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

// Rewritten to be more reliable
function fireCosmicRay() {
  const ray = document.createElement("div");
  ray.className = "cosmic-ray";
  document.body.appendChild(ray);

  const startX = Math.random() * window.innerWidth;
  const angle = 70 + Math.random() * 40;

  // We track the position in JS variables, not by reading the complex CSS transform matrix.
  let currentX = startX;
  let currentY = -200; // Start above the screen
  let hasHit = false;

  ray.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${angle}deg)`;

  function animate() {
    // Increment position
    currentY += 8; // Adjust for speed

    // Apply the new, reliable position
    ray.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${angle}deg)`;

    // Check for collision with project cards only once
    if (!hasHit) {
      projectCards.forEach((card) => {
        if (checkCollision(ray, card)) {
          hasHit = true;
          card.classList.add("hit");
          setTimeout(() => card.classList.remove("hit"), 400);
        }
      });
    }

    // Remove the ray when it goes off-screen
    if (currentY > window.innerHeight + 200) {
      ray.remove();
    } else {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

// Fire a cosmic ray at random intervals
setInterval(fireCosmicRay, 3000 + Math.random() * 4000); // Made slightly more frequent
