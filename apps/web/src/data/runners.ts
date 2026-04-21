// Runner shell data for the 2026 Marathon extraction shooter
// Source: https://marathonthegame.fandom.com/wiki/Runners

export interface RunnerAbility {
  name: string;
  type: "prime" | "tactical" | "trait1" | "trait2";
  description: string;
}

export interface RunnerCore {
  name: string;
  tier: "prestige" | "superior" | "deluxe" | "enhanced" | "standard";
  price: number;
  description: string;
}

export interface Runner {
  id: string;
  name: string;
  archetype: string;
  tech: string;
  series: string;
  manufacturer: string;
  description: string;
  quote: string;
  abilities: RunnerAbility[];
  defaultStats: Record<string, number>;
  imageUrl: string; // Runner card image URL
  wikiUrl: string;
}

export const runners: Runner[] = [
  {
    id: "assassin",
    name: "Assassin",
    archetype: "Shadow Agent",
    tech: "Invisibility Systems",
    series: "Void",
    manufacturer: "Sekiguchi Genetics",
    description: "Assassin is a personality matrix branching from the archetype shadow agent. This runner shell inherits all trades and abilities from the archetype.",
    quote: "Active Camo and synthetic smoke deployment allows for unseen strikes or the perfect cover during hostile engagements. The ability to move undetected makes Assassins valued allies and lethal enemies.",
    abilities: [
      { name: "Smoke Screen", type: "prime", description: "Throw a smoke disc that emits a line of smoke fields in front of you, disrupting the optics of those who step inside." },
      { name: "Active Camo", type: "tactical", description: "Activate your shell's camouflage systems, pulling a shroud of invisibility over yourself. Performing offensive actions, taking damage, and using abilities or consumables briefly disrupts your invisibility." },
      { name: "Shadow Dive", type: "trait1", description: "Activate while airborne to slam a smoke disc into the ground, deploy a smoke field." },
      { name: "Shroud", type: "trait2", description: "Your shell automatically activates its camouflage systems when entering any smoke field, making you invisible. Invisibility persists for a short time after leaving the smoke field." },
    ],
    defaultStats: { "Heat Capacity": 10, Agility: 20, "Loot Speed": 35, "Melee Damage": 10, "Prime Recovery": 10, "Tactical Recovery": 5, "Self-Repair Speed": 10, "Finisher Siphon": 10, "Revive Speed": 15, Hardware: 10, Firewall: 20, "Fall Resistance": 10, "Ping Duration": 10 },
    imageUrl: "https://marathon.wiki.gallery/images/thumb/6/63/Assassin_runner_card.jpg/400px-Assassin_runner_card.jpg",
    wikiUrl: "https://marathonthegame.fandom.com/wiki/Runners/Shadow_Agent",
  },
  {
    id: "destroyer",
    name: "Destroyer",
    archetype: "Combat Specialist",
    tech: "Offense / Defense",
    series: "Locus",
    manufacturer: "Sekiguchi Genetics",
    description: "Destroyer is a personality matrix branching from the archetype combat specialist. This runner shell inherits all trades and abilities from the archetype.",
    quote: "Advanced weapons systems, a personal defense barricade, and increased movement abilities allow Destroyers to take the fight to any threat or rival they encounter during a run.",
    abilities: [
      { name: "Search and Destroy", type: "prime", description: "Activate your shoulder-mounted missile pods. Dealing sustained damage to targets launches homing missiles, Immobilizing and dealing damage upon impact." },
      { name: "Riot Barricade", type: "tactical", description: "Toggle an energy barricade that blocks incoming damage, draining tactical ability energy over time. Taking damage drains additional energy." },
      { name: "Thruster", type: "trait1", description: "Activate while airborne to fire boosters that thrust you in the direction you are moving." },
      { name: "Tactical Sprint", type: "trait2", description: "Double-press sprint to move faster at the cost of generating additional heat." },
    ],
    defaultStats: { "Heat Capacity": 15, Agility: 10, "Loot Speed": 25, "Melee Damage": 15, "Prime Recovery": 5, "Tactical Recovery": 10, "Self-Repair Speed": 15, "Finisher Siphon": 10, "Revive Speed": 10, Hardware: 25, Firewall: 20, "Fall Resistance": 5, "Ping Duration": 5 },
    imageUrl: "https://marathon.wiki.gallery/images/thumb/a/a5/Destroyer_runner_card.jpg/400px-Destroyer_runner_card.jpg",
    wikiUrl: "https://marathonthegame.fandom.com/wiki/Runners/Combat_Specialist",
  },
  {
    id: "vandal",
    name: "Vandal",
    archetype: "Combat Anarchist",
    tech: "Enhanced Movement",
    series: "Glitch",
    manufacturer: "Sekiguchi Genetics",
    description: "Vandal is a personality matrix branching from the archetype combat anarchist. This runner shell inherits all trades and abilities from the archetype.",
    quote: "Amplified movement abilities help cover ground at incredible speeds, changing any encounter in their favor. Microjets allow a secondary jump to reach higher ground. And a built-in Disrupt Cannon provides instant offense or defense when it is charged and ready to fire.",
    abilities: [
      { name: "Amplify", type: "prime", description: "Overcharge your movement systems, reducing the heat generated from your movement abilities while increasing your movement speed and weapon dexterity." },
      { name: "Disruptor", type: "tactical", description: "Transform your arm into a cannon and fire a high-powered energy projectile that deals damage and pushes targets away. Overcharge your arm cannon greatly increasing the size and damage of the blast." },
      { name: "Microjets", type: "trait1", description: "Activate while airborne to perform another jump at the cost of generating additional heat." },
      { name: "Power Slide", type: "trait2", description: "Grants a supercharged slide that generates additional heat." },
    ],
    defaultStats: { "Heat Capacity": 25, Agility: 30, "Loot Speed": 25, "Melee Damage": 5, "Prime Recovery": 10, "Tactical Recovery": 5, "Self-Repair Speed": 5, "Finisher Siphon": 10, "Revive Speed": 5, Hardware: 10, Firewall: 5, "Fall Resistance": 10, "Ping Duration": 5 },
    imageUrl: "https://marathon.wiki.gallery/images/thumb/c/c2/Vandal_runner_card.jpg/400px-Vandal_runner_card.jpg",
    wikiUrl: "https://marathonthegame.fandom.com/wiki/Runners/Combat_Anarchist",
  },
  {
    id: "triage",
    name: "Triage",
    archetype: "Field Medic",
    tech: "Damage Mitigation",
    series: "Aux",
    manufacturer: "Sekiguchi Genetics",
    description: "Triage is a personality matrix branching from the archetype field medic. This runner shell inherits all trades and abilities from the archetype.",
    quote: "Deployable healing drones and onboard reboot abilities allow Triage Runners and their crews to keep running after taking damage. Mend health and shields and even reboot crewmates at a distance to survive and fight again and again.",
    abilities: [
      { name: "Reboot+", type: "prime", description: "Ready your shell's emergency defibrillator systems. Lock on to downed crew members or hostile targets and fire your Reboot+ device at them, which revives crew members and EMPs hostiles." },
      { name: "Med-Drone", type: "tactical", description: "Deploy a floating medical drone that attaches to crew members and restores health or recharges shields, and prevents them from bleeding out while downed. Can be applied to all teammates including yourself. Non-crewmates can hack Med-Drones to gain their effects." },
      { name: "Shareware.exe", type: "trait1", description: "Benefits from medical consumables are shared between crew members with Med-Drone attached to them." },
      { name: "Battery Overcharge", type: "trait2", description: "Divert energy from your cooling systems to boost the performance of your weapons at the cost of generating additional heat. While active, breaking a target's shield with a volt weapon EMPs them." },
    ],
    defaultStats: { "Heat Capacity": 10, Agility: 10, "Loot Speed": 30, "Melee Damage": 5, "Prime Recovery": 10, "Tactical Recovery": 5, "Self-Repair Speed": 15, "Finisher Siphon": 5, "Revive Speed": 20, Hardware: 15, Firewall: 5, "Fall Resistance": 5, "Ping Duration": 15 },
    imageUrl: "https://marathon.wiki.gallery/images/thumb/a/af/Triage_runner_card.jpg/400px-Triage_runner_card.jpg",
    wikiUrl: "https://marathonthegame.fandom.com/wiki/Runners/Field_Medic",
  },
  {
    id: "recon",
    name: "Recon",
    archetype: "Intel Specialist",
    tech: "Threat Detection",
    series: "Blackbird",
    manufacturer: "Sekiguchi Genetics",
    description: "Recon is a personality matrix branching from the archetype intel specialist. This runner shell inherits all trades and abilities from the archetype.",
    quote: "Recon specializes in detecting and tracking enemies. Its abilities reveal enemy positions, disrupt movement, and provide crucial information for the team.",
    abilities: [
      { name: "Echo Pulse", type: "prime", description: "Activate your shell's Advanced Detection Systems, releasing sonar pulses that reveal locations of nearby enemies." },
      { name: "Tracker Drone", type: "tactical", description: "Deploy a microbot that tracks down nearby enemies and explodes." },
      { name: "Interrogation", type: "trait1", description: "When pinged by a hostile Runner, receive a warning in your shell's HUD." },
      { name: "Stalker Protocol", type: "trait2", description: "After breaking a hostile's shield, a lingering holographic trail is left behind for a short time." },
    ],
    defaultStats: { "Heat Capacity": 20, Agility: 15, "Loot Speed": 10, "Melee Damage": 5, "Prime Recovery": 5, "Tactical Recovery": 10, "Self-Repair Speed": 5, "Finisher Siphon": 25, "Revive Speed": 10, Hardware: 10, Firewall: 15, "Fall Resistance": 5, "Ping Duration": 25 },
    imageUrl: "https://marathon.wiki.gallery/images/thumb/6/6e/Recon_runner_card.jpg/400px-Recon_runner_card.jpg",
    wikiUrl: "https://marathonthegame.fandom.com/wiki/Runners/Intel_Specialist",
  },
  {
    id: "thief",
    name: "Thief",
    archetype: "Covert Acquisitions",
    tech: "Advanced Heist Mechanics",
    series: "",
    manufacturer: "CyberAcme",
    description: "Thief is a personality matrix branching from the archetype covert acquisitions. This runner shell inherits all trades and abilities from the archetype.",
    quote: "A Thief always keeps their eyes on the prize.",
    abilities: [
      { name: "Pickpocket Drone", type: "prime", description: "Deploy a remotely piloted flying drone with a limited lifespan. While piloting the drone: Fire a hooked tether that can eject the highest-value item from target inventories, collect and store loose loot and open doors. Exit the drone and return to your shell. At any point while the drone is still active, activate the ability again to continue piloting the drone." },
      { name: "Grapple Device", type: "tactical", description: "Launch a grapple device in your aim direction, propelling yourself toward it." },
      { name: "X-Ray Visor", type: "trait1", description: "Activate your visor, highlighting hostiles and containers in the color of the most valuable item they're storing. Containers are revealed through walls, while hostiles require line of sight. While active, aiming at a hostile for a short time Hacks their optics, disrupting their vision until you look away." },
      { name: "The Finer Things", type: "trait2", description: "Gain increased weapon handling and accelerated Grapple Device recharge rate based on the number of items in your Backpack." },
    ],
    defaultStats: { "Heat Capacity": 10, Agility: 20, "Loot Speed": 35, "Melee Damage": 10, "Prime Recovery": 10, "Tactical Recovery": 5, "Self-Repair Speed": 10, "Finisher Siphon": 10, "Revive Speed": 15, Hardware: 10, Firewall: 20, "Fall Resistance": 10, "Ping Duration": 10 },
    imageUrl: "https://marathon.wiki.gallery/images/thumb/2/2e/Thief_runner_card.jpg/400px-Thief_runner_card.jpg",
    wikiUrl: "https://marathonthegame.fandom.com/wiki/Runners/Covert_Acquisitions",
  },
  {
    id: "rook",
    name: "Rook",
    archetype: "Scavenger",
    tech: "",
    series: "",
    manufacturer: "UESC",
    description: "Rook is a personality matrix branching from the archetype scavenger. The Rook frame is designed for scavenger mode — drop into a match already in progress as a solo player with no loadout, risking nothing, making it an excellent option for scavengers.",
    quote: "",
    abilities: [
      { name: "Recuperation", type: "prime", description: "Activate your prototype frame's emergency repair system to slowly restore health. Interrupted when you take damage." },
      { name: "Signal Mask", type: "tactical", description: "Activate a temporary holodisplay mask to deceive UESC forces, making them unaware of your presence. Disrupted when you sprint or take damage." },
      { name: "IFF Override", type: "trait1", description: "Disguises you from UESC combatants." },
      { name: "Self-Repair", type: "trait2", description: "Your shell automatically repairs damage over time." },
    ],
    defaultStats: { "Heat Capacity": 10, Agility: 20, "Loot Speed": 35, "Melee Damage": 10, "Prime Recovery": 10, "Tactical Recovery": 5, "Self-Repair Speed": 10, "Finisher Siphon": 10, "Revive Speed": 15, Hardware: 10, Firewall: 20, "Fall Resistance": 10, "Ping Duration": 10 },
    imageUrl: "https://marathon.wiki.gallery/images/thumb/1/1b/Rook_runner_card.jpg/400px-Rook_runner_card.jpg",
    wikiUrl: "https://marathonthegame.fandom.com/wiki/Runners/Scavenger",
  },
];

export const runnerArchetypes = runners.map((r) => r.archetype);