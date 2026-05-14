// ── NETWORK NODE CANVAS ──
(function() {
  const canvas = document.getElementById('network-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, nodes, animId;
  const COUNT = 55;
  const MAX_DIST = 160;
  const COLORS = ['rgba(0,229,212,', 'rgba(155,93,229,', 'rgba(76,201,240,'];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initNodes() {
    nodes = Array.from({length: COUNT}, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2 + 1.5,
      colorIdx: Math.floor(Math.random() * COLORS.length),
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < MAX_DIST) {
          const alpha = (1 - d/MAX_DIST) * 0.25;
          const ci = nodes[i].colorIdx;
          ctx.beginPath();
          ctx.strokeStyle = COLORS[ci] + alpha + ')';
          ctx.lineWidth = 0.7;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    // nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
      ctx.fillStyle = COLORS[n.colorIdx] + '0.7)';
      ctx.shadowBlur = 8;
      ctx.shadowColor = COLORS[n.colorIdx] + '0.5)';
      ctx.fill();
      ctx.shadowBlur = 0;
      // update
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
    animId = requestAnimationFrame(draw);
  }

  resize(); initNodes(); draw();
  window.addEventListener('resize', () => { cancelAnimationFrame(animId); resize(); initNodes(); draw(); });
})();

// ── SKILLS DATA ──
const SKILLS = [
  { group: "Engines & XR",    pills: ["Unity","Unreal Engine","Blueprints","VR","AR","WebXR","OpenVR","Open XR","AR Core","Vuforia","Photon"] },
  { group: "Graphics",        pills: ["OpenGL","GLSL","GLFW","Blender","NeRF","3D Gaussian Splatting","Ray Tracing","Rasterization"] },
  { group: "Languages",       pills: ["C#","C++","Python","Java","Swift","GLSL","HTML5","CSS","MySQL","Perl"] },
  { group: "Tools & Pipeline",pills: ["Git","Perforce","Jenkins","Azure","CI/CD","JIRA","Xcode","Visual Studio","Autodesk Fusion 360"] },
  { group: "Research & HCI",  pills: ["User Studies","VR Training","Gamification","HCI","CHI PLAY","Game Research","Experimental Design"] },
  { group: "Platforms",       pills: ["Android","iOS","WebGL","PC VR","Meta Quest","WebXR"] },
];

const skillsGrid = document.getElementById('skillsGrid');
SKILLS.forEach(sg => {
  const el = document.createElement('div');
  el.className = 'skill-group fade-in';
  el.innerHTML = `<div class="skill-group-title">${sg.group}</div><div class="skill-pills">${sg.pills.map(p=>`<span class="skill-pill">${p}</span>`).join('')}</div>`;
  skillsGrid.appendChild(el);
});

// ── RESEARCH ──
const researchGrid = document.getElementById('researchGrid');
const sorted = [...RESEARCH].sort((a,b) => (b.featured?1:0)-(a.featured?1:0));
sorted.forEach((r, i) => {
  const el = document.createElement('div');
  el.className = 'research-card fade-in' + (r.featured ? ' featured' : '');
  el.style.transitionDelay = `${i*0.06}s`;

  // media — youtube or image
  let media = '';
  if (r.youtube) {
    media = `<div class="research-media"><iframe src="https://www.youtube-nocookie.com/embed/${r.youtube}" allowfullscreen loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`;
  } else if (r.image) {
    media = `<div class="research-media"><img src="${r.image}" alt="${r.title}" loading="lazy"/></div>`;
  }

  let links = '';
  if (r.pdfUrl)     links += `<a href="${r.pdfUrl}" target="_blank" class="research-link">⟶ PDF</a>`;
  if (r.projectUrl) links += `<a href="${r.projectUrl}" target="_blank" class="research-link">⟶ PROJECT</a>`;
  if (r.githubUrl)  links += `<a href="${r.githubUrl}" target="_blank" class="research-link">{ } CODE</a>`;

  const TYPE_LABELS = {
    'phd-research': 'PHD RESEARCH',
    'thesis': 'THESIS',
    'conference': 'CONFERENCE',
    'simulation': 'SIMULATION',
    'project': 'PROJECT',
    'publication': 'PUBLICATION',
  };
  el.innerHTML = `
    ${media}
    <div class="research-card-inner">
      <div class="research-year-col">
        <div class="research-year">${r.year}</div>
        <div class="research-type-badge type-${r.type}">${TYPE_LABELS[r.type] || r.type.toUpperCase()}</div>
      </div>
      <div class="research-body">
        <div class="research-venue">${r.venue}</div>
        <div class="research-title">${r.title}</div>
        <div class="research-desc">${r.description}</div>
        <div class="research-tags">${r.tags.map(t=>`<span class="research-tag">${t}</span>`).join('')}</div>
      </div>
      ${links ? `<div class="research-links">${links}</div>` : ''}
    </div>
  `;
  researchGrid.appendChild(el);
});

// ── PROJECTS ──
const projectsGrid = document.getElementById('projectsGrid');
let currentCat = 'gamedev';

function renderProjects(cat) {
  currentCat = cat;
  projectsGrid.innerHTML = '';
  const filtered = [...PROJECTS.filter(p=>p.category===cat)].sort((a,b)=>(b.featured?1:0)-(a.featured?1:0));

  if (!filtered.length) {
    projectsGrid.innerHTML = '<div class="empty-state">// No projects yet — add some in projects.js</div>';
    return;
  }
  filtered.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'project-card fade-in' + (p.featured ? ' featured-card' : '');
    card.style.transitionDelay = `${i*0.05}s`;

    let media = '';
    if (p.youtube) {
      media = `<div class="card-media"><iframe src="https://www.youtube-nocookie.com/embed/${p.youtube}" allowfullscreen loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`;
    } else if (p.image) {
      media = `<div class="card-media"><img src="${p.image}" alt="${p.title}" loading="lazy"/></div>`;
    } else {
      media = `<div class="card-media"><div class="card-media-placeholder"><span class="placeholder-icon">◈</span>// no preview yet</div></div>`;
    }

    let links = '';
    if (p.playUrl)   links += `<a href="${p.playUrl}" target="_blank" class="card-link play">▶ PLAY</a>`;
    if (p.githubUrl) links += `<a href="${p.githubUrl}" target="_blank" class="card-link">{ } CODE</a>`;
    if (p.reportUrl) links += `<a href="${p.reportUrl}" target="_blank" class="card-link">⟶ REPORT</a>`;

    card.innerHTML = `
      ${p.featured ? '<div class="featured-badge">FEATURED</div>' : ''}
      ${media}
      <div class="card-body">
        <div class="card-meta">${p.year} · ${p.category === 'gamedev' ? 'GAME DEV' : 'GRAPHICS'}</div>
        <div class="card-title">${p.title}</div>
        <div class="card-desc">${p.description}</div>
        <div class="card-tags">${p.tags.map(t=>`<span class="card-tag">${t}</span>`).join('')}</div>
        ${links ? `<div class="card-links">${links}</div>` : ''}
      </div>
    `;
    projectsGrid.appendChild(card);
    requestAnimationFrame(() => card.classList.add('visible'));
  });
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.cat);
  });
});
renderProjects('gamedev');

// ── BLOG ──
const blogGrid = document.getElementById('blogGrid');
BLOG_POSTS.forEach(post => {
  const el = document.createElement('div');
  el.className = 'blog-card fade-in';
  el.innerHTML = `
    <div class="blog-date">${post.date}</div>
    <div class="blog-title">${post.title}</div>
    <div class="blog-excerpt">${post.excerpt}</div>
    <a href="${post.url}" target="_blank" class="read-more">READ POST →</a>
  `;
  blogGrid.appendChild(el);
});

// ── FADE OBSERVER ──
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.07 }
);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ══════════════════════════════════════════
//  GACHA COIN SYSTEM — UPGRADED
// ══════════════════════════════════════════
const PULL_COST = 10;
const CHARACTERS = [
  // ── COMMON (40%) ──
  { name: "The Rasterizer",    title: "Pipeline Grunt",           art: "🖥️",  rarity: "common",    desc: "Transforms every vertex with relentless precision. Respects the z-buffer. Doesn't ask questions." },
  { name: "UV Mapper",         title: "Texture Wrangler",         art: "🗺️",  rarity: "common",    desc: "Knows exactly where every texel belongs. Has strong opinions about seams." },
  { name: "Shader Apprentice", title: "GLSL Initiate",            art: "✨",  rarity: "common",    desc: "Still learning the difference between world space and view space. Getting there." },
  { name: "The Debugger",      title: "RenderDoc Devotee",        art: "🔍",  rarity: "common",    desc: "Can spot a missing depth test from a mile away. Keeps a second monitor for frame captures." },
  { name: "Build Bot",         title: "CI/CD Automator",          art: "🤖",  rarity: "common",    desc: "Runs Jenkins pipelines at 3am. Has never manually deployed anything. Proud of it." },
  // ── RARE (35%) ──
  { name: "NeRF Scout",        title: "Volume Sampler",           art: "🌐",  rarity: "rare",      desc: "Shoots rays through implicit neural fields and reports back with color and density. Never gets lost." },
  { name: "The Quilter",       title: "Texture Synthesis Expert", art: "🧩",  rarity: "rare",      desc: "Defeated Efros & Leung. Mastered Image Quilting. Treats seams like puzzles." },
  { name: "VR Pioneer",        title: "Immersion Architect",      art: "🥽",  rarity: "rare",      desc: "Has logged more hours in headsets than outside them. Knows comfort radius by instinct." },
  { name: "Photon Wrangler",   title: "Ray Tracing Specialist",   art: "💡",  rarity: "rare",      desc: "Bounces photons across scenes with mathematical grace. Caustics are their love language." },
  { name: "Multiplayer Mage",  title: "Photon Network Sorcerer",  art: "🔮",  rarity: "rare",      desc: "Implemented room syncing across VR instances. Lag is their nemesis." },
  { name: "The Inpainter",     title: "Criminisi's Disciple",     art: "🎨",  rarity: "rare",      desc: "Heals image wounds with confidence propagation. Patch priority is a way of life." },
  // ── EPIC (18%) ──
  { name: "Gaussian Ghost",    title: "3DGS Apparition",          art: "👻",  rarity: "epic",      desc: "Exists as millions of floating ellipsoids. Renders in real-time. Refuses to be baked." },
  { name: "XR Architect",      title: "Mixed Reality Builder",    art: "🏗️",  rarity: "epic",      desc: "Designed spaces that exist in both worlds simultaneously. Has strong opinions about anchors." },
  { name: "CI/CD Phantom",     title: "Pipeline Automation Ghost",art: "⚙️",  rarity: "epic",      desc: "Configured Jenkins pipelines at 2am. Builds pass on the first try. Mostly." },
  { name: "The HCI Whisperer", title: "User Study Conductor",     art: "🧠",  rarity: "epic",      desc: "Runs controlled user studies in virtual worlds. IRB approved. Mostly." },
  { name: "Gamification Sage", title: "Game Loop Philosopher",    art: "🎮",  rarity: "epic",      desc: "Turned a micropipette into a game. Participants didn't notice. That was the point." },
  // ── LEGENDARY (7%) ──
  { name: "Metali Mangal",     title: "The Researcher Herself",   art: "⚡",  rarity: "legendary", desc: "PhD researcher, neural rendering explorer, XR pioneer, and game developer. You found the rarest pull." },
  { name: "The Radiance Field",title: "Implicit Neural Overlord", art: "🌌",  rarity: "legendary", desc: "Encodes an entire 3D scene in a tiny MLP. Renders any viewpoint. Unbothered by traditional geometry." },
];
const RARITY_WEIGHTS = { common: 40, rare: 35, epic: 18, legendary: 7 };
const RARITY_COLORS  = { common: '#4a6278', rare: '#4cc9f0', epic: '#9b5de5', legendary: '#f72585' };

// ── STATE ──
let coins = 0;
let lastClickCoin  = 0;
let lastScrollCoin = 0;
let readingTimer   = null;
let pullHistory    = JSON.parse(sessionStorage.getItem('gacha_pulls') || '[]');
// collection = unique names pulled
let collection     = [...new Set(pullHistory.map(p => p.name))];

// ── DOM REFS ──
const coinCountEl = document.getElementById('coin-count');
const heroCoinEl  = document.getElementById('hero-coin-display');
const coinHud     = document.getElementById('coin-hud');
const pullBtn     = document.getElementById('pull-btn');
const gachaModal  = document.getElementById('gacha-modal');
const hudPullBtn = document.getElementById('hud-pull-btn');

// ── COIN UI UPDATE ──
function updateCoinUI() {
  coinCountEl.textContent = coins;
  if (heroCoinEl) heroCoinEl.textContent = coins;
  pullBtn.disabled = coins < PULL_COST;
  hudPullBtn.disabled = coins < PULL_COST;
}

hudPullBtn.addEventListener('click', () => {
  if (coins < PULL_COST) return;
  coins -= PULL_COST;
  updateCoinUI();
  const char = weightedPull();
  spawnFloatingCard(char);
});

// ── FLOATING LABEL ──
function floatLabel(text, x, y, color) {
  const el = document.createElement('div');
  el.className = 'coin-plus';
  el.textContent = text;
  el.style.left  = Math.min(x, window.innerWidth - 80) + 'px';
  el.style.top   = y + 'px';
  el.style.color = color || '#00e5d4';
  document.body.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

// ── AWARD COINS ──
function awardCoins(amount, x, y, label) {
  coins += amount;
  updateCoinUI();
  coinHud.classList.remove('bump');
  void coinHud.offsetWidth;
  coinHud.classList.add('bump');
  floatLabel(label || `+${amount} ◈`, x || window.innerWidth - 100, y || 90);
}

// 1. CLICK on interactive content
document.addEventListener('click', (e) => {
  const now = Date.now();
  if (now - lastClickCoin < 700) return;
  const target = e.target.closest(
    '.project-card, .research-card, .blog-card, .skill-group, .tab-btn, ' +
    '.card-link, .research-link, .read-more, a[href^="#"], .mini-cabinet-wrap'
  );
  if (!target) return;
  lastClickCoin = now;
  const r = target.getBoundingClientRect();
  awardCoins(1, r.left + r.width / 2 - 20, r.top + window.scrollY - 30, '+1 ◈');
});

// 2. SCROLL — award every ~400px of new scroll depth
let maxScrollDepth = 0;
let lastScrollDepthCoin = 0;
window.addEventListener('scroll', () => {
  const depth = window.scrollY + window.innerHeight;
  const now = Date.now();
  if (depth > maxScrollDepth + 400 && now - lastScrollCoin > 1200) {
    maxScrollDepth = depth;
    lastScrollCoin = now;
    awardCoins(1, window.innerWidth - 100, 90, '+1 ◈  scroll');
  }
}, { passive: true });

// 3. SECTION DISCOVERY — bonus when a section first enters view
const discoveredSections = new Set();
const sectionBonus = { skills: 2, research: 3, projects: 2, blog: 2, contact: 1 };
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !discoveredSections.has(e.target.id)) {
      discoveredSections.add(e.target.id);
      const bonus = sectionBonus[e.target.id] || 1;
      setTimeout(() => awardCoins(bonus, window.innerWidth - 100, 90, `+${bonus} ◈  discovered`), 400);
    }
  });
}, { threshold: 0.25 });
Object.keys(sectionBonus).forEach(id => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

// 4. READING TIME — award 2 coins every 20s the tab is visible and active
let tabVisible = true;
document.addEventListener('visibilitychange', () => { tabVisible = !document.hidden; });
let lastReadCoin = Date.now();
setInterval(() => {
  if (!tabVisible) return;
  const now = Date.now();
  if (now - lastReadCoin >= 20000) {
    lastReadCoin = now;
    awardCoins(2, window.innerWidth - 100, 90, '+2 ◈  reading');
  }
}, 2000);

// 5. HOVER DWELL — hover on a project/research card for 3s earns a coin
let hoverTarget = null, hoverTimer = null;
document.addEventListener('mouseover', (e) => {
  const card = e.target.closest('.project-card, .research-card');
  if (!card || card === hoverTarget) return;
  clearTimeout(hoverTimer);
  hoverTarget = card;
  hoverTimer = setTimeout(() => {
    const r = card.getBoundingClientRect();
    awardCoins(1, r.left + r.width / 2, r.top + window.scrollY - 30, '+1 ◈  curious');
    hoverTarget = null;
  }, 3000);
});
document.addEventListener('mouseout', (e) => {
  if (e.target.closest('.project-card, .research-card')) {
    clearTimeout(hoverTimer);
    hoverTarget = null;
  }
});

// ══ PULL SYSTEM ══════════════════════════════
function weightedPull() {
  const pool = [];
  CHARACTERS.forEach(c => {
    for (let i = 0; i < RARITY_WEIGHTS[c.rarity]; i++) pool.push(c);
  });
  return pool[Math.floor(Math.random() * pool.length)];
}

// Floating pull card that appears at pull button then flies up
function spawnFloatingCard(char) {
  const btn = document.getElementById('pull-btn');
  const br  = btn.getBoundingClientRect();
  const fc  = document.createElement('div');
  fc.className = 'floating-pull-card';
  fc.innerHTML = `
    <div class="fpc-rarity rarity-${char.rarity}">◈ ${char.rarity.toUpperCase()}</div>
    <div class="fpc-art">${char.art}</div>
    <div class="fpc-name">${char.name}</div>
  `;
  fc.style.left = (br.left + br.width / 2 - 70) + 'px';
  fc.style.top  = (br.top + window.scrollY - 10) + 'px';
  fc.style.borderColor = RARITY_COLORS[char.rarity];
  fc.style.boxShadow   = `0 0 20px ${RARITY_COLORS[char.rarity]}55`;
  document.body.appendChild(fc);
  // trigger animation after paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { fc.classList.add('fpc-fly'); });
  });
  fc.addEventListener('animationend', () => {
    // open full modal after float completes
    fc.remove();
    openGachaModal(char);
  });
}

function openGachaModal(char) {
  document.getElementById('gacha-rarity').textContent = `◈ ${char.rarity.toUpperCase()} ◈`;
  document.getElementById('gacha-rarity').className   = `gacha-rarity-label rarity-${char.rarity}`;
  document.getElementById('gacha-art').textContent    = char.art;
  document.getElementById('gacha-name').textContent   = char.name;
  document.getElementById('gacha-title').textContent  = `// ${char.title}`;
  document.getElementById('gacha-desc').textContent   = char.desc;

  const isNew = !collection.includes(char.name);
  document.getElementById('gacha-new-badge').style.display = isNew ? 'inline-block' : 'none';

  const flash = document.getElementById('gacha-flash');
  flash.style.animation = 'none'; void flash.offsetWidth; flash.style.animation = '';

  const card = document.getElementById('gacha-card');
  card.style.borderColor = RARITY_COLORS[char.rarity];
  card.style.boxShadow = char.rarity === 'legendary'
    ? `0 0 70px ${RARITY_COLORS.legendary}55, inset 0 0 30px ${RARITY_COLORS.legendary}0a`
    : char.rarity === 'epic'
    ? `0 0 35px ${RARITY_COLORS.epic}44`
    : 'none';

  // save to history
  pullHistory.push({ name: char.name, rarity: char.rarity, art: char.art, time: Date.now() });
  sessionStorage.setItem('gacha_pulls', JSON.stringify(pullHistory));
  if (!collection.includes(char.name)) collection.push(char.name);

  updateCollectionGrid();
  document.getElementById('gacha-collection-count').textContent =
    `${collection.length} / ${CHARACTERS.length} unique · ${pullHistory.length} total pulls`;

  gachaModal.classList.add('open');
}

function updateCollectionGrid() {
  const grid = document.getElementById('collection-grid');
  if (!grid) return;
  grid.innerHTML = '';
  CHARACTERS.forEach(c => {
    const owned = collection.includes(c.name);
    const cell = document.createElement('div');
    cell.className = 'coll-cell' + (owned ? ' owned rarity-border-' + c.rarity : ' locked');
    cell.title = owned ? `${c.name} — ${c.title}` : '???';
    cell.innerHTML = owned
      ? `<div class="coll-art">${c.art}</div><div class="coll-name">${c.name}</div>`
      : `<div class="coll-art">?</div><div class="coll-name">???</div>`;
    grid.appendChild(cell);
  });
}

pullBtn.addEventListener('click', () => {
  if (coins < PULL_COST) return;
  coins -= PULL_COST;
  updateCoinUI();
  const char = weightedPull();
  spawnFloatingCard(char);
});

// Collection tab toggle inside modal
document.getElementById('tab-result').addEventListener('click', () => {
  document.getElementById('tab-result').classList.add('active');
  document.getElementById('tab-collection').classList.remove('active');
  document.getElementById('panel-result').style.display = 'block';
  document.getElementById('panel-collection').style.display = 'none';
});
document.getElementById('tab-collection').addEventListener('click', () => {
  document.getElementById('tab-collection').classList.add('active');
  document.getElementById('tab-result').classList.remove('active');
  document.getElementById('panel-result').style.display = 'none';
  document.getElementById('panel-collection').style.display = 'block';
  updateCollectionGrid();
});

document.getElementById('gacha-close').addEventListener('click', () => gachaModal.classList.remove('open'));
gachaModal.addEventListener('click', (e) => { if (e.target === gachaModal) gachaModal.classList.remove('open'); });

// Collection button in HUD
document.getElementById('hud-collection-btn').addEventListener('click', () => {
  // open modal on collection tab without a pull
  document.getElementById('gacha-rarity').textContent = '◈ YOUR COLLECTION ◈';
  document.getElementById('gacha-rarity').className = 'gacha-rarity-label rarity-common';
  document.getElementById('gacha-art').textContent = '📦';
  document.getElementById('gacha-name').textContent = 'Card Collection';
  document.getElementById('gacha-title').textContent = '// all characters discovered so far';
  document.getElementById('gacha-desc').textContent = 'Pull more characters by exploring the portfolio and spending coins!';
  document.getElementById('gacha-new-badge').style.display = 'none';
  document.getElementById('gacha-card').style.borderColor = 'rgba(0,229,212,0.25)';
  document.getElementById('gacha-card').style.boxShadow = 'none';
  document.getElementById('gacha-collection-count').textContent =
    `${collection.length} / ${CHARACTERS.length} unique · ${pullHistory.length} total pulls`;
  // switch to collection tab
  document.getElementById('tab-collection').click();
  gachaModal.classList.add('open');
});

updateCoinUI();
updateCollectionGrid();

// ── THEME TOGGLE ──────────────────────────────────────────
(function() {
  const html        = document.documentElement;
  const toggleBtn   = document.getElementById('theme-toggle');
  const toggleIcon  = document.getElementById('theme-icon');
  const toggleLabel = document.getElementById('theme-label');

  function isDark() {
    return html.getAttribute('data-theme') !== 'light';
  }

  function updateToggleUI() {
    if (isDark()) {
      toggleIcon.textContent  = '☀️';
      toggleLabel.textContent = 'LIGHT';
      toggleBtn.title = 'Switch to light mode';
    } else {
      toggleIcon.textContent  = '🌙';
      toggleLabel.textContent = 'DARK';
      toggleBtn.title = 'Switch to dark mode';
    }
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    updateToggleUI();
  }

  toggleBtn.addEventListener('click', () => {
    setTheme(isDark() ? 'light' : 'dark');
  });

  // Listen for OS preference changes (when no manual override was set yet)
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('portfolio-theme')) {
      html.setAttribute('data-theme', e.matches ? 'light' : 'dark');
      updateToggleUI();
    }
  });

  // Initialise button UI to match whatever theme was applied pre-paint
  updateToggleUI();
})();

