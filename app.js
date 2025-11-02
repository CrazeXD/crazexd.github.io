// === Popup Functions ===
function showPopup() {
  document.getElementById('popup-overlay').style.display = 'flex';
}
function closePopup() {
  document.getElementById('popup-overlay').style.display = 'none';
}
document.getElementById('popup-overlay').addEventListener('click', e => {
  if (e.target.id === 'popup-overlay') closePopup();
});

// === Terminal Script ===
document.addEventListener('DOMContentLoaded', async () => {
  const terminalInput = document.getElementById('terminal-input');
  const output = document.getElementById('output');
  const terminalBody = document.getElementById('terminal-body');

  // Load command and project data
  const [commands, projectData] = await Promise.all([
    fetch('data/commands.json').then(res => res.json()),
    fetch('data/projects.json').then(res => res.json())
  ]);

  terminalInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const input = terminalInput.value.trim().toLowerCase();
      const [cmd, ...args] = input.split(' ');

      printCommand(input);
      terminalInput.value = '';

      executeCommand(cmd, args);
      scrollToBottom();
    }
  });

  function executeCommand(cmd, args) {
    if (cmd === 'clear') {
      output.innerHTML = '';
      return;
    }

    if (commands[cmd]) {
      printOutput(commands[cmd]);
    } else if (cmd === 'project' && args.length > 0) {
      const projectId = args[0];
      const data = projectData[projectId];
      if (data) {
        const img = data.image ? `<img src="${data.image}" alt="${data.title}">` : '';
        printOutput(`
          <div class="project-output">
            <div class="project-header">
              ${img}
              <h3 class="project-title">${data.title}</h3>
            </div>
            <p class="project-description">${data.description}
              <br><a href="${data.link}" target="_blank">View Details →</a>
            </p>
          </div>
        `);
      } else {
        printOutput(`Error: Project '${projectId}' not found. Type '<span class="prompt">projects</span>' to see all projects.`);
      }
    } else if (cmd) {
      printOutput(`Command not found: ${cmd}. Type '<span class="prompt">help</span>' for a list of commands.`);
    }
  }

  function printCommand(command) {
    const div = document.createElement('div');
    div.classList.add('input-line', 'command-history');
    div.innerHTML = `<span class="prompt">guest@rishabhgarg.dev:~$</span><span class="command-text">${command}</span>`;
    output.appendChild(div);
  }

  function printOutput(html) {
    const div = document.createElement('div');
    div.classList.add('output-line');
    div.innerHTML = html;
    output.appendChild(div);
  }

  function scrollToBottom() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Display initial banner
  printOutput(commands.banner);
  scrollToBottom();
});

// === Particles.js Configuration ===
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: ["circle", "triangle"] },
    opacity: { value: 0.5, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false } },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 120, color: "#ffffff", opacity: 0.3, width: 1 },
    move: { enable: true, speed: 1, random: true, out_mode: "out" }
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
    modes: { grab: { distance: 140, line_opacity: 0.7 }, push: { particles_nb: 4 } }
  },
  retina_detect: true,
});
