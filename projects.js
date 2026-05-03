// ============================================================
//  METALI MANGAL — PORTFOLIO DATA
//  Edit this file to add / update projects & research.
//  No HTML knowledge needed!
//
//  PROJECT FIELDS:
//    title, category ("gamedev"|"graphics"), year, tags[], description
//    image   : relative path or full URL to thumbnail, "" if none
//    youtube : YouTube video ID only (e.g. "dQw4w9WgXcQ"), "" if none
//    playUrl : Unity Play / WebGL link, "" if none
//    githubUrl, reportUrl, featured (bool)
//
//  RESEARCH FIELDS:
//    title, type ("thesis"|"publication"|"conference"|"project"|"simulation")
//    year, venue, tags[], description
//    pdfUrl, projectUrl, githubUrl, featured (bool)
// ============================================================

const PROJECTS = [
  // ── GAME DEV ──────────────────────────────────────────────
  {
    title: "Social VR Amusement Park",
    category: "gamedev", year: "2022",
    tags: ["Unity", "C#", "Photon", "OpenVR", "Multiplayer"],
    description: "Led development of a multiplayer VR application where players socialize in themed amusement rooms. Responsible for full Photon networking implementation.",
    image: "", youtube: "", playUrl: "", githubUrl: "", reportUrl: "", featured: true,
  },
  {
    title: "Space Shooter",
    category: "gamedev", year: "2022",
    tags: ["Unity", "C#", "ProBuilder", "WebGL"],
    description: "A 3-level space shooter built in Unity with ProBuilder for level geometry. Fully playable in the browser via Unity WebGL.",
    image: "", youtube: "",
    playUrl: "https://play.unity.com/mg/other/webgl-builds-369884",
    githubUrl: "", reportUrl: "", featured: false,
  },
  {
    title: "Ninja Challenge",
    category: "gamedev", year: "2021",
    tags: ["Unreal", "C++", "Blueprints"],
    description: "Fast-paced ninja obstacle game on Unreal Engine. Players navigate increasingly difficult challenges using Blueprints-driven logic and C++ game systems.",
    image: "", youtube: "", playUrl: "", githubUrl: "", reportUrl: "", featured: false,
  },
  {
    title: "Shroom Splicer",
    category: "gamedev", year: "2022",
    tags: ["Unreal", "Blueprints", "PCG", "C++", "Datatables"],
    description: "Mushroom genetic algorithm game in Unreal. Led programming of procedural mushroom splicing mechanics, data table management, and Blueprint logic.",
    image: "", youtube: "", playUrl: "", githubUrl: "", reportUrl: "", featured: false,
  },
  {
    title: "Flame in the Forest",
    category: "gamedev", year: "2021",
    tags: ["Unreal", "Blueprints", "VR", "Git"],
    description: "VR game raising awareness about forest destruction. VR programmer and source control manager in a collaborative team.",
    image: "", youtube: "https://www.youtube.com/watch?v=nFl_e_c8jNo", playUrl: "", githubUrl: "", reportUrl: "", featured: false,
  },
  {
    title: "Unity Tutorial in VR",
    category: "gamedev", year: "2021",
    tags: ["Unity", "C#", "Photon", "OpenVR"],
    description: "VR-based tutorial for Unity fundamentals, studying how people learn differently in immersive vs. flat-screen environments.",
    image: "", youtube: "", playUrl: "", githubUrl: "", reportUrl: "", featured: false,
  },
  // ── GRAPHICS ──────────────────────────────────────────────
  {
    title: "Texture Synthesis & Inpainting",
    category: "graphics", year: "2024",
    tags: ["Python", "OpenCV", "tkinter", "Computer Vision"],
    description: "Implemented and compared 5 classical algorithms: Efros & Leung, Wei & Levoy, Image Quilting, Criminisi, and Telea. Built an interactive GUI with mask painting and threaded real-time execution.",
    image: "", youtube: "", playUrl: "",
    githubUrl: "",  // ← add your repo
    reportUrl: "", featured: true,
  },
  {
    title: "Neural Rendering Study",
    category: "graphics", year: "2024",
    tags: ["NeRF", "3DGS", "Ray Tracing", "Rasterization", "LaTeX"],
    description: "Technical deep-dive from rasterization and ray tracing through to NeRF and 3D Gaussian Splatting. Includes full LaTeX write-ups and mathematical derivations.",
    image: "", youtube: "", playUrl: "", githubUrl: "", reportUrl: "", featured: true,
  },
  // ← Add more graphics assignments here
];

// ============================================================
//  RESEARCH — shown in its own dedicated section
//
//  type options: "phd-research" | "thesis" | "simulation" | "project"
//
//  Tips:
//  - Add your PhD research focus / ongoing work here as it develops
//  - Once you have papers, add them with type "publication" or "conference"
//  - pdfUrl, projectUrl, githubUrl all auto-show as buttons if filled
// ============================================================
const RESEARCH = [
  {
    title: "Neural Rendering for Interactive & Immersive Environments",
    type: "phd-research",
    year: "2024–",
    venue: "Purdue University — PhD Research (Ongoing)",
    tags: ["NeRF", "3D Gaussian Splatting", "Neural Rendering", "Real-Time Graphics", "XR", "HCI"],
    description: "PhD research exploring neural rendering techniques — including NeRF and 3D Gaussian Splatting — and their application to interactive and immersive environments. Investigating how neural scene representations can enable richer, more dynamic experiences in VR/AR contexts.",
    pdfUrl: "", projectUrl: "", githubUrl: "", featured: true,
  },
  {
    title: "Gamification of VR Training — Effects of Visual Motivation",
    type: "thesis",
    year: "2023",
    venue: "Purdue University — MS Thesis",
    tags: ["VR", "Unity", "User Study", "HCI", "Gamification", "Training"],
    description: "Investigated how game elements — points, progression, and visual motivation — affect VR training outcomes for micropipette usage in laboratory settings. Combined game design principles with controlled user studies.",
    pdfUrl: "", projectUrl: "", githubUrl: "", featured: true,
  },
  {
    title: "BIO-Spinach PE — Virtual Lab Simulation",
    type: "simulation",
    year: "2022",
    venue: "Purdue Envision Center",
    tags: ["Unity", "WebXR", "WebGL", "Lab Simulation", "Education"],
    description: "Immersive browser-based virtual biology lab for student training, enabling safe and scalable remote lab practice without physical equipment.",
    pdfUrl: "", projectUrl: "", githubUrl: "", featured: false,
  },
  {
    title: "Pipette Training VR Experience",
    type: "project",
    year: "2022",
    venue: "Purdue University",
    tags: ["Unity", "VR", "Game Research", "Training", "User Study"],
    description: "Two-part VR training application for micropipette usage, combining game elements with guided tutorials to study learning effectiveness in immersive environments.",
    pdfUrl: "", projectUrl: "", githubUrl: "", featured: false,
  },
];

// ── BLOG POSTS ──────────────────────────────────────────────
const BLOG_POSTS = [
  {
    title: "Environment Creation in Virtual Reality",
    date: "Apr 24, 2022",
    url: "https://mangalm2077.wixsite.com/meta-thoughts/post/environment-creation-in-virtual-reality",
    excerpt: "From OpenGL to Unreal — how VR environments are built.",
  },
  {
    title: "Augmented Reality vs Virtual Reality",
    date: "Apr 24, 2022",
    url: "https://mangalm2077.wixsite.com/meta-thoughts/post/augmented-reality-vs-virtual-reality",
    excerpt: "Breaking down the key differences and use cases of AR vs VR.",
  },
  {
    title: "My Horizon Metaverse Experience",
    date: "Feb 26, 2022",
    url: "https://mangalm2077.wixsite.com/meta-thoughts/post/my-horizon-metaverse-experience",
    excerpt: "Personal reflections on spending time in Meta's Horizon Worlds.",
  },
  {
    title: "Education and Labs in VR?",
    date: "Feb 13, 2022",
    url: "https://mangalm2077.wixsite.com/meta-thoughts/post/education-in-virtual-reality",
    excerpt: "Could VR replace physical lab work in education? My thoughts.",
  },
];
