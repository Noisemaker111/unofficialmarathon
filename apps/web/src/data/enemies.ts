// Enemy data extracted from gameplay.md
// Sources: https://www.marathonwiki.com/, https://marathontrilogy.miraheze.org/

export type GameTitle = "marathon" | "marathon2" | "infinity";
export type ThreatLevel = "low" | "medium" | "high" | "very-high" | "extreme";
export type EnemyFaction = "pfhor" | "spht" | "mechanical" | "human" | "unknown";

export interface EnemyVariant {
  name: string;
  health: number;
  speed: number;
  primaryAttack: string;
  secondaryAttack?: string;
  notes?: string;
}

export interface Enemy {
  id: string;
  name: string;
  faction: EnemyFaction;
  games: GameTitle[];
  description: string;
  variants: EnemyVariant[];
  weaknesses: string[];
  resistances: string[];
  specialProperties: string[];
  visualIdentification: string;
  threatLevel: ThreatLevel;
  source: string;
}

export const enemies: Enemy[] = [
  {
    id: "pfhor-fighter",
    name: "Pfhor Fighter",
    faction: "pfhor",
    games: ["marathon", "marathon2", "infinity"],
    description:
      "Standard Pfhor soldiers. Fighters are the most common enemies encountered. They serve as the backbone of Pfhor infantry.",
    variants: [
      { name: "Minor Fighter", health: 40, speed: 34, primaryAttack: "Energy Staff (20 Dmg)" },
      { name: "Minor Projectile Fighter", health: 80, speed: 39, primaryAttack: "Energy Staff (20 Dmg)", secondaryAttack: "Energy Bolt (30 Dmg)" },
      { name: "Major Fighter", health: 80, speed: 36, primaryAttack: "Energy Staff (20 Dmg)" },
      { name: "Major Projectile Fighter", health: 80, speed: 42, primaryAttack: "Energy Staff (20 Dmg)", secondaryAttack: "Energy Bolt (30 Dmg)" },
      { name: "Elite Fighter", health: NaN, speed: NaN, primaryAttack: "Energy Staff (TBA)", notes: "Marathon Infinity only" },
    ],
    weaknesses: [],
    resistances: [],
    specialProperties: [
      "Most common enemy type",
      "Projectile variants have both melee and ranged attacks",
      "Elite Fighters only appear in Marathon Infinity",
    ],
    visualIdentification:
      "Minor: Green armor. Major: Purple armor. Projectile: Orange (minor) / Blue (major) armor. Elite: Dark grey armor.",
    threatLevel: "medium",
    source: "https://marathontrilogy.miraheze.org/wiki/Fighter",
  },
  {
    id: "pfhor-trooper",
    name: "Pfhor Trooper",
    faction: "pfhor",
    games: ["marathon", "marathon2", "infinity"],
    description:
      "Heavier infantry with both ranged weapons and grenades. More dangerous than Fighters due to grenade capability.",
    variants: [
      { name: "Minor Trooper", health: 110, speed: 39, primaryAttack: "Assault Rifle (15 Dmg)", secondaryAttack: "Grenade Launcher (40 Dmg)" },
      { name: "Major Trooper", health: 200, speed: 39, primaryAttack: "Assault Rifle (15 Dmg)", secondaryAttack: "Grenade Launcher (40 Dmg)" },
      { name: "Elite Trooper", health: NaN, speed: NaN, primaryAttack: "Assault Rifle (TBA)", secondaryAttack: "Grenade Launcher (TBA)", notes: "Marathon Infinity only" },
    ],
    weaknesses: [],
    resistances: [],
    specialProperties: [
      "Armed with assault rifle and grenades",
      "Grenades can damage other enemies (infighting)",
    ],
    visualIdentification: "Minor: Green armor. Major: Purple armor. Elite: Dark grey armor.",
    threatLevel: "high",
    source: "https://marathontrilogy.miraheze.org/wiki/Trooper",
  },
  {
    id: "pfhor-enforcer",
    name: "Pfhor Enforcer",
    faction: "pfhor",
    games: ["marathon", "marathon2", "infinity"],
    description:
      "Elite Pfhor troops. In Marathon, they carry Alien Assault Rifles. In Marathon 2+, they carry Alien Flamethrowers. They will drop their weapon on death.",
    variants: [
      { name: "Minor Enforcer", health: 120, speed: 42, primaryAttack: "Alien Assault Rifle / Alien Flamethrower (20 Dmg)" },
      { name: "Major Enforcer", health: 160, speed: 51, primaryAttack: "Alien Assault Rifle / Alien Flamethrower (20 Dmg)" },
      { name: "Elite Enforcer", health: NaN, speed: NaN, primaryAttack: "Alien Flamethrower (TBA)", notes: "Marathon Infinity only" },
    ],
    weaknesses: ["Cannot be burned to death with flamethrower or they won't drop the Alien Weapon"],
    resistances: [],
    specialProperties: [
      "Drop weapon on death",
      "Weapon drop negated if killed by flamethrower",
    ],
    visualIdentification:
      "Minor: Teal robes (M1) / Teal/green (M2+). Major: Green robes (M1) / Blue/orange (M2+). Elite: Dark grey robes.",
    threatLevel: "high",
    source: "https://marathontrilogy.miraheze.org/wiki/Enforcer",
  },
  {
    id: "pfhor-hunter",
    name: "Pfhor Hunter",
    faction: "pfhor",
    games: ["marathon", "marathon2", "infinity"],
    description:
      "The strongest Pfhor infantry. Hunters are decked out in heavy armor and equipped with shoulder-mounted plasma cannons. Unlike Fighters, Hunters never take prisoners. They will explode when killed by fusion bolts, missiles, and grenades — the explosion can chain-react with nearby Hunters.",
    variants: [
      { name: "Minor Hunter", health: 200, speed: 39, primaryAttack: "Hunter bolt (15 + 5 random, 2 reps)" },
      { name: "Major Hunter", health: 300, speed: 43, primaryAttack: "Hunter bolt (15 + 5 random, 5 reps)" },
      { name: "Mother Of All Hunters (MOAH)", health: 450, speed: 43, primaryAttack: "Multiple bolts" },
    ],
    weaknesses: ["Zeus-Class Fusion Pistol", "Grenades", "Rockets"],
    resistances: ["Immune to TOZT-7 Backpack Napalm Unit"],
    specialProperties: [
      "Explosive death when killed by fusion bolts, missiles, or grenades",
      "Shoulder-mounted plasma cannon",
      "Giant shields on both forearms",
      "Never take prisoners",
    ],
    visualIdentification:
      "Minor: Brown armor. Major: Green armor. MOAH: Blue armor (1.5x size).",
    threatLevel: "extreme",
    source: "https://marathongame.fandom.com/wiki/Hunter",
  },
  {
    id: "spht-compiler",
    name: "S'pht Compiler",
    faction: "spht",
    games: ["marathon", "marathon2", "infinity"],
    description:
      "S'pht robots that float and attack with energy bolts. Major variants have heat-seeking capabilities. They are weak against fusion weapons but resistant to fire damage.",
    variants: [
      { name: "Minor Compiler", health: 160, speed: 36, primaryAttack: "Compiler Bolt (40 Dmg)" },
      { name: "Major Compiler", health: 200, speed: 39, primaryAttack: "Heat-Seeking Compiler Bolt (40 Dmg)" },
    ],
    weaknesses: ["Fusion weapons"],
    resistances: ["Fire damage"],
    specialProperties: [
      "Floats, phases in and out of visibility",
      "Teleports when taking damage",
      "Coordinates with other S'pht",
      "Major variant has heat-seeking bolts",
    ],
    visualIdentification: "Minor: Orange cloak. Major: Purple cloak.",
    threatLevel: "high",
    source: "https://marathontrilogy.miraheze.org/wiki/Compiler",
  },
  {
    id: "pfhor-cyborg",
    name: "Pfhor Cyborg",
    faction: "mechanical",
    games: ["marathon2", "infinity"],
    description:
      "Pfhor cyborgs with grenade-based attacks. Heat-seeking grenades track targets. Flame cyborgs add flamethrower to their arsenal. All fusion weapons deal bonus damage.",
    variants: [
      { name: "Minor Cyborg", health: 300, speed: 46, primaryAttack: "Grenades (20 Dmg)" },
      { name: "Major Cyborg", health: 450, speed: 42, primaryAttack: "Grenades (20 Dmg)" },
      { name: "Minor Flame Cyborg", health: 300, speed: 42, primaryAttack: "Heat-Seeking Grenades + Flamethrower" },
      { name: "Major Flame Cyborg", health: 450, speed: 42, primaryAttack: "Heat-Seeking Grenades + Flamethrower" },
      { name: "Mother of All Cyborgs (MOAC)", health: 1500, speed: 42, primaryAttack: "Heat-Seeking Grenades (40 Dmg) + Flamethrower (8 Dmg)" },
    ],
    weaknesses: ["Fusion weapons (all variants)"],
    resistances: [],
    specialProperties: [
      "Heat-seeking grenades track targets",
      "Flame variants add flamethrower attacks",
    ],
    visualIdentification:
      "Minor: Red light on back. Major: Green light on back. MOAC: Red light but much larger.",
    threatLevel: "very-high",
    source: "https://marathontrilogy.miraheze.org/wiki/Cyborg",
  },
  {
    id: "juggernaut",
    name: "Juggernaut",
    faction: "pfhor",
    games: ["marathon", "marathon2", "infinity"],
    description:
      "The heaviest Pfhor ground units. Juggernauts are massive tanks that can withstand enormous amounts of damage. They attack with both ranged weapons and tracking missiles.",
    variants: [
      { name: "Minor Juggernaut", health: 2500, speed: 51, primaryAttack: "Alien Assault Rifle / Flamethrower (20 Dmg)", secondaryAttack: "Missiles (40 Dmg)" },
      { name: "Major Juggernaut", health: 5000, speed: 51, primaryAttack: "Flamethrower (20 Dmg)", secondaryAttack: "Missiles (40 Dmg)" },
    ],
    weaknesses: ["Fusion weapons (bonus damage)"],
    resistances: [],
    specialProperties: [
      "Massive health pool",
      "Tracking missiles",
      "Multiple weapon systems",
    ],
    visualIdentification: "Minor: Dark grey armor. Major: Brown armor.",
    threatLevel: "extreme",
    source: "https://marathontrilogy.miraheze.org/wiki/Juggernaut",
  },
  {
    id: "bob",
    name: "BOBs (Battle Operation Buddies)",
    faction: "human",
    games: ["marathon", "marathon2", "infinity"],
    description:
      "Human colonists and security personnel. Initially friendly, some may become hostile depending on story events. Can be killed by player (with consequences).",
    variants: [
      { name: "Standard BOB", health: NaN, speed: NaN, primaryAttack: "None (friendly)" },
    ],
    weaknesses: [],
    resistances: [],
    specialProperties: [
      "Friendly NPCs that can be killed by player",
      "Killing 3+ civilians causes remaining BOBs to turn hostile",
      "Adds moral dimension to combat decisions",
    ],
    visualIdentification: "Orange/yellow work uniforms (civilians) or military-style uniforms (Security variants)",
    threatLevel: "low",
    source: "",
  },
];

export const factionColors: Record<EnemyFaction, string> = {
  pfhor: "text-purple-400",
  spht: "text-green-400",
  mechanical: "text-red-400",
  human: "text-amber-400",
  unknown: "text-gray-400",
};

export const factionLabels: Record<EnemyFaction, string> = {
  pfhor: "Pfhor",
  spht: "S'pht",
  mechanical: "Mechanical",
  human: "Human",
  unknown: "Unknown",
};

export const threatLevelColors: Record<ThreatLevel, string> = {
  low: "text-green-400",
  medium: "text-yellow-400",
  high: "text-orange-400",
  "very-high": "text-red-400",
  extreme: "text-red-500 font-bold",
};

export const threatLevelLabels: Record<ThreatLevel, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  "very-high": "Very High",
  extreme: "Extreme",
};