// Popup functions
function showPopup() {
  document.getElementById('popup-overlay').style.display = 'flex';
}

function closePopup() {
  document.getElementById('popup-overlay').style.display = 'none';
}

// Close popup when clicking outside
document.getElementById('popup-overlay').addEventListener('click', (e) => {
  if (e.target.id === 'popup-overlay') {
    closePopup();
  }
});

// Your existing JavaScript
document.addEventListener('DOMContentLoaded', () => {
  const terminalInput = document.getElementById('terminal-input');
  const output = document.getElementById('output');
  const terminalBody = document.getElementById('terminal-body');

  const commands = {
    help: `Available commands:
<br>  <span class="prompt">about</span>      - Who I am
  <span class="prompt">projects</span>   - View my projects
  <span class="prompt">skills</span>     - See my technical skills
  <span class="prompt">contact</span>    - How to get in touch
  <span class="prompt">clear</span>      - Clear the terminal screen
  <span class="prompt">banner</span>     - Display the welcome banner`,

    banner: `
<pre class="prompt">
  RRRRR     GGGG  RRRRR     GGGG  RRRRR     GGGG  RRRRR     GGGG 
  R   R    G      R   R    G      R   R    G      R   R    G    
  RRRRR    G  GG  RRRRR    G  GG  RRRRR    G  GG  RRRRR    G  GG
  R  R     G   G  R  R     G   G  R  R     G   G  R  R     G   G
  R   R     GGGG  R   R     GGGG  R   R     GGGG  R   R     GGGG
</pre>
<br>Welcome to my portfolio!
Type '<span class="prompt">help</span>' to see the list of available commands.`,

    about: `
<div class="about-output">
    <img src="static/DSC08945.JPG" alt="A photo of Rishabh Garg">
    <div>
        <p>I am a high school student with a deep passion for the interwoven fields of physics and computer science. I am fascinated by the fundamental laws that govern our universe, and I enjoy leveraging my programming skills to solve complex problems, model intricate systems, and analyze data.</p>
        <p>My goal is to pursue a career that allows me to combine these two fields to push the boundaries of scientific research and technological innovation.</p>
    </div>
</div>`,

    skills: `
<div class="category-title">Physics & Research</div>
<div class="skill-list"><span>Data Analysis</span><span>High Energy Particle Physics</span><span>Network Analysis</span><span>Scientific Computing</span><span>Astrophysical Radiative Transfer Computation</span></div>
<div class="category-title">Programming</div>
<div class="skill-list"><span>Python</span><span>C++</span><span>LaTeX</span><span>GoLang</span><span>Java</span></div>
<div class="category-title">Tools & Technologies</div>
<div class="skill-list"><span>Git</span><span>Linux</span><span>Numpy / Scipy</span><span>Matplotlib</span><span>ROOT</span><span>Geant4</span></div>`,

    projects: `
Listing projects... Type '<span class="prompt">project [name]</span>' to see details.
<br>
  <span class="prompt">bls</span>       - Beamline For Schools Proposal
  <span class="prompt">exomoon</span>   - Caltech Exomoon Research
  <span class="prompt">crowd</span>     - Crowd Dynamics Lab Research
  <span class="prompt">python</span>    - Python Projects Collection`,

    contact: `
You can reach out to me via:
<br>
  <span class="prompt">Email</span>      - <a href="mailto:rishabh@rishabhgarg.dev">rishabh@rishabhgarg.dev</a>
  <span class="prompt">GitHub</span>     - <a href="https://github.com/CrazeXD" target="_blank">CrazeXD</a>
  <span class="prompt">LinkedIn</span>   - <a href="https://www.linkedin.com/in/rishabh-garg-34a5a51b7/" target="_blank">Rishabh Garg</a>`,
    git: `https://github.com/CrazeXD/crazedx.github.io :)`,
  };

  const projectData = {
    bls: {
      title: "Beamline For Schools Proposal",
      description: "Team captain for a research proposal to the CERN Beamline for Schools competition, shortlisted as a winning proposal. The project explores relativistic electron particle beam cross sections to improve high-accuracy beam collimation techniques, involving experimental physics, data modeling, and simulation.",
      image: "static/setup2.png",
      link: "https://beamline-for-schools.web.cern.ch/sites/default/files/BL4S_all-winners_2025.pdf",
    },
    crowd: {
      title: "Crowd Dynamics Lab Research",
      description: "Conducted advanced network analysis on the terms of service of major online platforms at the University of Illinois Urbana-Champaign. The research focused on developing novel algorithms to parse, analyze, and visualize complex legal text, enhancing user transparency and understanding of their rights.",
      image: "static/Reddit.png",
      link: "https://github.com/CrazeXD/ToS-Complexity",
    },
    exomoon: {
      title: "Caltech Department of Geological and Planetary Sciences Research",
      description: "Collaborated on research at Caltech with Dr. Apurva Oza to simulate the prescense of exomoons around gas giant exoplanets. Published research in the Monthly Notice of the Royal Astronomical Society on sodium signatures around WASP-39b, using Monte Carlo and forward-modelling methods to align with telescope spectral data.",
      image: "static/combined_mcmc_prometheus_models-1.png",
      link: "https://arxiv.org/abs/2509.08349",
    },
    python: {
      title: "Python Projects Collection",
      description: "A curated collection of my work in Python, from small scripts to complex applications. It showcases my proficiency in the language and my ability to tackle a variety of problems, including data structures, algorithms, and more.",
      image: "",
      link: "https://github.com/CrazeXD?tab=repositories",
    },
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.value.trim().toLowerCase();
      const [cmd, ...args] = command.split(' ');

      printCommand(terminalInput.value);
      terminalInput.value = '';

      executeCommand(cmd, args);
      scrollToBottom();
    }
  });

  function executeCommand(cmd, args) {
    if (cmd === 'clear') {
      output.innerHTML = '';
    } else if (commands[cmd]) {
      printOutput(commands[cmd]);
    } else if (cmd === 'project' && args.length > 0) {
      const projectId = args[0];
      if (projectData[projectId]) {
        const data = projectData[projectId];
        const imgHTML = data.image ? `<img src="${data.image}" alt="${data.title}">` : '';
        const projectHTML = `
        <div class="project-output">
            <div class="project-header">
          ${imgHTML}
          <h3 class="project-title">${data.title}</h3>
            </div>
            <p class="project-description">${data.description}<br><a href="${data.link}" target="_blank">View Details -></a></p>
        </div>`;
        printOutput(projectHTML);
      } else {
        printOutput(`Error: Project '${projectId}' not found. Type '<span class="prompt">projects</span>' to see all projects.`);
      }
    } else if (cmd !== '') {
      printOutput(`Command not found: ${cmd}. Type '<span class="prompt">help</span>' for a list of commands.`);
    }
  }

  function printCommand(command) {
    const line = document.createElement('div');
    line.classList.add('input-line', 'command-history');
    line.innerHTML = `<span class="prompt">guest@rishabhgarg.dev:~$</span><span class="command-text">${command}</span>`;
    output.appendChild(line);
  }

  function printOutput(htmlContent) {
    const line = document.createElement('div');
    line.classList.add('output-line');
    line.innerHTML = htmlContent;
    output.appendChild(line);
  }

  function scrollToBottom() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function init() {
    const bannerElement = document.createElement('div');
    bannerElement.classList.add('output-line');
    output.appendChild(bannerElement);
    bannerElement.innerHTML = commands.banner;
    scrollToBottom();
  }

  init();
});

// Particles.js configuration
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