// --- PARTICLES.JS CONFIGURATION ---
particlesJS("particles-js", {
  particles: {
    number: { value: 60, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2, // SLOWED DOWN from 6 to 2
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      repulse: { distance: 150, duration: 0.4 },
      push: { particles_nb: 4 },
    },
  },
  retina_detect: true,
});

// --- SCROLL ANIMATIONS ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

// --- PROJECT MODAL LOGIC ---
const projectData = {
  bls: {
    title: "Beamline For Schools Proposal",
    description:
      "A comprehensive research proposal submitted to the CERN Beamline for Schools competition. The project explores the impacts of symmetry in relativistic electron particle beam cross sections on beam quality, aiming to improve high-accuracy beam collimation techniques. This involves experimental physics, data modeling, and simulation.",
    // Add a real image path here
    image: "static/setup2.png",
    link: "#", // Link to the actual proposal PDF or page
  },
  crowd: {
    title: "Crowd Dynamics Lab Research",
    description:
      "As part of the Crowd Dynamics Lab, I conducted advanced network analysis on the terms of service of major online platforms. The research focused on developing novel algorithms to parse, analyze, and visualize complex legal text, enhancing user transparency and understanding of their rights and obligations.",
    image: "static/Reddit.png",
    link: "#", // Link to the research paper or project page
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
