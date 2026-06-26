// ============================================================
// AOT DATA — All node positions, content, connections,
// camera waypoints, and color palette
// ============================================================
import * as THREE from 'three'

export const PALETTE = {
  void:       '#0a0704',
  stone:      '#8b7355',
  gold:       '#d4822a',
  goldBright: '#f0a035',
  vein:       '#7a1f1f',
  veinBright: '#cc3333',
  fog:        '#2a1f14',
  text:       '#f0e8d0',
}

// ── Hub Nodes ─────────────────────────────────────────────
export const NODES = [
  /* 0 — INTRO */
  {
    id: 'intro',
    label: 'Shingeki no Kyojin',
    sublabel: 'The Complete Universe',
    position: [0, 0, 0],
    color: '#d4822a',
    rimColor: '#f0a035',
    size: 1.9,
    section: 0,
    content: null,
  },

  /* 1 — LORE */
  {
    id: 'lore',
    label: 'The Origin',
    sublabel: '2,000 Years of History',
    position: [-5.5, 2.5, -2.5],
    color: '#d4822a',
    rimColor: '#7a1f1f',
    size: 1.25,
    section: 1,
    content: {
      tag: '2,000 YEARS OF HISTORY',
      title: 'The Origin of Titans',
      desc: `A young slave girl named <strong>Ymir Fritz</strong> made contact with a mysterious spine-like entity in a hallowed tree, gaining the Power of the Titans — becoming the first and most powerful titan, the Founding Titan. Upon her death, her power split into <strong>Nine distinct Titan forms</strong> to be inherited by the Eldian people for 2,000 years. King <strong>Karl Fritz</strong> eventually tired of endless war, erected the three walls using hardened Colossal Titans, and erased all memories of the outside world from his subjects.`,
      facts: [
        { label: 'Year of Origin', value: '~Year 0' },
        { label: 'First Titan', value: 'Ymir Fritz' },
        { label: 'Power Source', value: 'Spine-like entity' },
        { label: 'Split Into', value: '9 Titans upon death' },
        { label: 'Curse Duration', value: '13 years per holder' },
        { label: 'Wall Builder', value: 'King Karl Fritz' },
      ],
      extra: `The Great Titan War (c. Year 1,820) fractured the Eldian Empire from within. The Tybur family secretly conspired with Marley to frame Eldia as the aggressor, enabling Karl Fritz's plan to resettle the remnant population on Paradis Island — hidden from the world.`,
    },
  },

  /* 2 — CHARACTERS */
  {
    id: 'characters',
    label: 'The Soldiers',
    sublabel: 'Heroes & Villains',
    position: [5.5, -0.5, -2.5],
    color: '#4a8f50',
    rimColor: '#2aaa40',
    size: 1.25,
    section: 2,
    content: {
      tag: 'THE PLAYERS',
      title: 'Legendary Characters',
      desc: `From the walls of Paradis to the shores of Marley — these soldiers carry the weight of the world. Every character's journey reflects the series' central question: what does it mean to be free in a world that chains you?`,
      characters: [
        {
          name: 'Eren Yeager',
          role: 'Attack · Founding · War Hammer Titan',
          quote: '"If you win, you live. If you lose, you die. If you don\'t fight, you can\'t win."',
          icon: '⚔️',
        },
        {
          name: 'Mikasa Ackerman',
          role: 'Humanity\'s Greatest Soldier · Ackerman Clan',
          quote: '"This world is cruel. It is also very beautiful."',
          icon: '🗡️',
        },
        {
          name: 'Armin Arlert',
          role: 'Strategic Genius · Colossal Titan · 15th Commander',
          quote: '"Someone who can\'t sacrifice anything can never change anything."',
          icon: '🧠',
        },
        {
          name: 'Levi Ackerman',
          role: 'Humanity\'s Strongest · Survey Corps Captain',
          quote: '"The only thing we\'re allowed to do is believe we won\'t regret the choice we made."',
          icon: '⚡',
        },
        {
          name: 'Reiner Braun',
          role: 'Armored Titan · Marleyan Warrior',
          quote: '"I don\'t know what a hero is. But I can become a soldier."',
          icon: '🛡️',
        },
        {
          name: 'Annie Leonhart',
          role: 'Female Titan · Master Martial Artist',
          quote: '"I\'m not like you. I know exactly what I\'m protecting."',
          icon: '💎',
        },
      ],
    },
  },

  /* 3 — TITANS */
  {
    id: 'titans',
    label: 'The Nine',
    sublabel: 'Titan Shifters',
    position: [-3.5, 5, -7],
    color: '#7a1f1f',
    rimColor: '#cc3333',
    size: 1.35,
    section: 3,
    content: {
      tag: 'POWERS OF YMIR',
      title: 'The Nine Titans',
      desc: `Originating from Ymir Fritz upon her death, the Nine Titans have been inherited by Eldian warriors for 2,000 years. Each inheritor is cursed to die within <strong>13 years</strong> — mirroring Ymir's own lifespan.`,
      titans: [
        { icon: '👑', name: 'Founding Titan',   ability: 'Memory Manipulation · Titan Control · Biology Alteration' },
        { icon: '⚔️', name: 'Attack Titan',     ability: 'Future Memory Access · Enhanced Strength · Regeneration' },
        { icon: '🌋', name: 'Colossal Titan',   ability: 'Explosive Transformation · Steam Emission (60m)' },
        { icon: '🛡️', name: 'Armored Titan',    ability: 'Hardened Armor Plating · Selective Shedding' },
        { icon: '💎', name: 'Female Titan',     ability: 'Titan Attraction Scream · Selective Hardening · Mimicry' },
        { icon: '🦍', name: 'Beast Titan',      ability: 'Lethal Projectile Throwing · Animal Form · Titan Command' },
        { icon: '🦷', name: 'Jaw Titan',        ability: 'Fastest Titan · Crushing Jaws & Claws (5m)' },
        { icon: '🐎', name: 'Cart Titan',       ability: 'Extreme Endurance · Quadrupedal · Weapon Platform' },
        { icon: '🔨', name: 'War Hammer Titan', ability: 'Hardened Structure Creation · Remote Operation from Crystal' },
      ],
    },
  },

  /* 4 — FACTIONS */
  {
    id: 'factions',
    label: 'The Factions',
    sublabel: 'Forces at War',
    position: [6.5, 2, -9],
    color: '#8b7355',
    rimColor: '#c9a227',
    size: 1.2,
    section: 4,
    content: {
      tag: 'THE SIDES',
      title: 'Factions & Forces',
      desc: `Every war has its sides — and in this world, every side has its reasons. Allegiances shift as the truth unfolds. No faction is purely evil; no faction is wholly righteous.`,
      factions: [
        { icon: '🦅', name: 'Survey Corps',              motto: '"Dedicate Your Heart"',           bg: 'rgba(45,143,61,0.12)',  border: 'rgba(45,143,61,0.3)',  nameColor: '#4acc5a' },
        { icon: '🏛️', name: 'Marley',                   motto: 'Titan Warriors of the World',     bg: 'rgba(139,32,32,0.12)', border: 'rgba(139,32,32,0.3)', nameColor: '#cc4444' },
        { icon: '⭐', name: 'Military Police',            motto: 'Order & Control Within',          bg: 'rgba(26,58,92,0.12)',  border: 'rgba(26,58,92,0.3)',  nameColor: '#4488cc' },
        { icon: '▲', name: 'Yeagerists',                 motto: '"Eren Leads Us to Freedom"',      bg: 'rgba(107,48,16,0.12)', border: 'rgba(107,48,16,0.3)', nameColor: '#cc6622' },
        { icon: '🧱', name: 'Garrison Regiment',          motto: '"Guard the Walls"',               bg: 'rgba(90,58,16,0.12)',  border: 'rgba(90,58,16,0.3)',  nameColor: '#cc9933' },
        { icon: '✓', name: 'Anti-Marleyan Volunteers',   motto: 'End Marley\'s Tyranny',           bg: 'rgba(26,90,74,0.12)',  border: 'rgba(26,90,74,0.3)',  nameColor: '#22cc88' },
      ],
    },
  },

  /* 5 — WALLS */
  {
    id: 'walls',
    label: 'The Three Walls',
    sublabel: 'Maria · Rose · Sheena',
    position: [0.5, -3.5, -6],
    color: '#8b7355',
    rimColor: '#c9a227',
    size: 1.2,
    section: 5,
    content: {
      tag: 'THE PRISON',
      title: 'The Three Walls',
      desc: `50-metre tall rings of hardened Colossal Titans — humanity's greatest deception. Built by King Karl Fritz using the Founding Titan's power, the walls entombed <strong>millions of Colossal Titans</strong> standing shoulder-to-shoulder. If released, they represented the ultimate deterrent: <strong>The Rumbling</strong>.`,
      walls: [
        { name: 'Wall Maria',  district: 'Shiganshina District (South Gate)',    status: 'Fell in 845 — Reclaimed in 854',         color: '#8B2020' },
        { name: 'Wall Rose',   district: 'Trost District · Utgard Castle Area',  status: 'Intact — Titans found inside (S2)',       color: '#c9a227' },
        { name: 'Wall Sheena', district: 'Mitras — Royal Capital',               status: 'Intact — Titans released in The Rumbling', color: '#4488cc' },
      ],
    },
  },

  /* 6 — WORLD */
  {
    id: 'world',
    label: 'The World',
    sublabel: 'Paradis vs. Marley',
    position: [-6.5, 0.5, -13],
    color: '#d4822a',
    rimColor: '#8b7355',
    size: 1.2,
    section: 6,
    content: {
      tag: 'THE BIGGER PICTURE',
      title: 'The World of AoT',
      desc: `Beyond the walls lies a world far more complex than anyone inside could imagine. Paradis Island — once the heart of the ancient Eldian Empire — is now an isolated colony. Marley dominates global politics through its Titan military, while anti-Titan technology slowly levels the playing field.`,
      worldFacts: [
        { icon: '🏝️', label: 'Paradis Island',           desc: 'Eldian homeland, resource-rich, globally isolated and targeted' },
        { icon: '🏛️', label: 'Marley Nation',            desc: 'Global superpower using Titan Warriors as weapons of conquest' },
        { icon: '🌐', label: 'The Paths',                 desc: 'Cross-dimensional realm connecting all Subjects of Ymir across time' },
        { icon: '🪝', label: 'ODM Gear',                  desc: 'Gas-powered grappling gear enabling aerial combat — humanity\'s best pre-Titan weapon' },
        { icon: '⚡', label: 'Ackerman Clan',             desc: 'Memory-immune bloodline with awakened superhuman combat instincts' },
        { icon: '👾', label: 'Pure Titans',               desc: 'Mindless humanoid giants 2–15m tall; Eldian humans transformed by injection' },
      ],
    },
  },

  /* 7 — RUMBLING */
  {
    id: 'rumbling',
    label: 'The Rumbling',
    sublabel: 'The End of the World',
    position: [1.5, 7.5, -17],
    color: '#7a1f1f',
    rimColor: '#cc3333',
    size: 1.5,
    section: 7,
    content: {
      tag: 'THE CLIMAX',
      title: 'The Rumbling',
      desc: `Eren Yeager activated the Rumbling — unleashing millions of Colossal Titans from within the walls to march across the world and flatten all life beyond Paradis Island. His former comrades formed an unlikely alliance with the Warriors to stop him. It ended with Eren's death at <strong>Mikasa's</strong> hands — but not before catastrophic global loss.`,
      arcs: [
        { arc: 'Fall of Shiganshina', season: 'S1',       year: '845',   desc: 'Wall Maria falls. Eren watches his mother devoured. His vow of vengeance ignites the story.' },
        { arc: 'Battle of Trost',     season: 'S1',       year: '850',   desc: 'Eren\'s titan power awakens. Humanity wins its first active battle against the titans.' },
        { arc: 'Female Titan',        season: 'S1',       year: '850',   desc: 'Annie Leonhart revealed as the infiltrating Female Titan. Captured in crystal.' },
        { arc: 'Clash of Titans',     season: 'S2',       year: '850',   desc: 'Reiner and Bertholdt exposed. Ymir sacrifices herself. Eren discovers hardening.' },
        { arc: 'Return to Shiganshina', season: 'S3',    year: '850',   desc: 'Erwin\'s sacrifice. Armin inherits Colossal Titan. The basement truth shakes everything.' },
        { arc: 'Marley',              season: 'S4',       year: '854',   desc: 'The world\'s perspective shifts. Eren raids Libero — opening the War for Paradis.' },
        { arc: 'War for Paradis',     season: 'S4 Final', year: '854+',  desc: 'The Rumbling. Alliance vs. Eren. Mikasa ends it. The world survives — barely.' },
      ],
    },
  },
]

// ── Connections (index pairs from NODES array) ────────────
export const CONNECTIONS = [
  { from: 0, to: 1, speed: 0.18 },   // intro → lore
  { from: 0, to: 2, speed: 0.22 },   // intro → characters
  { from: 0, to: 3, speed: 0.14 },   // intro → titans
  { from: 0, to: 5, speed: 0.16 },   // intro → walls
  { from: 1, to: 3, speed: 0.20 },   // lore → titans
  { from: 1, to: 5, speed: 0.12 },   // lore → walls
  { from: 2, to: 4, speed: 0.18 },   // characters → factions
  { from: 3, to: 7, speed: 0.10 },   // titans → rumbling
  { from: 4, to: 6, speed: 0.16 },   // factions → world
  { from: 5, to: 7, speed: 0.14 },   // walls → rumbling
  { from: 6, to: 7, speed: 0.18 },   // world → rumbling
]

// ── Camera waypoints (one per section) ───────────────────
// Positioned to frame each hub node from a cinematic angle
export const CAMERA_WAYPOINTS = [
  [0,   12,  26],   // 0 — Overview: see the whole network
  [-9,   5,   7],   // 1 — Lore: approach from upper-front-right
  [ 9,   2,   5],   // 2 — Characters: approach from upper-front-left
  [-5,   8,   0],   // 3 — Titans: approach from below-front-right
  [ 9,   5,  -2],   // 4 — Factions: upper-front-left
  [ 3,   0,  -2],   // 5 — Walls: hover above, looking down-back
  [-9,   3,  -7],   // 6 — World: approach from right
  [ 2,  11,  -9],   // 7 — Rumbling finale: looking up
]

// ── Build a CatmullRomCurve3 from waypoints ───────────────
export function buildCameraCurve() {
  return new THREE.CatmullRomCurve3(
    CAMERA_WAYPOINTS.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
    false,   // not closed
    'catmullrom',
    0.6      // tension
  )
}

// ── Section names for navigation ─────────────────────────
export const SECTION_NAMES = [
  'Home',
  'Lore',
  'Characters',
  'Titans',
  'Factions',
  'The Walls',
  'World',
  'Rumbling',
]
