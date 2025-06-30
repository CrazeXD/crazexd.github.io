// --- HEADER HIDE/SHOW ON SCROLL ---
let lastScrollY = window.scrollY;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (lastScrollY < window.scrollY && window.scrollY > 100) {
    header.classList.add("scrolled-down");
  } else {
    header.classList.remove("scrolled-down");
  }
  lastScrollY = window.scrollY;
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

// --- TEXT SCRAMBLE ON HOVER LOGIC HAS BEEN REMOVED ---

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
      }
    });
  },
  { threshold: 0.1 }
);

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

// --- PROJECT MODAL LOGIC (No changes) ---
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
      "As part of the Crowd Dynamics Lab, I conducted advanced network analysis on the terms of service of major online platforms. The research focused on developing novel algorithms to parse, analyze, and visualize complex legal text, enhancing user transparency and understanding of their rights and obligations.",
    image: "static/Reddit.png",
    link: "#",
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
