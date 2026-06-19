// Additional weapon mods — appended to base catalog
// Source: https://marathonthegame.fandom.com/wiki/Mods

import type { ModSlot, Rarity } from "@/data/types";

interface ModSeed {
  id: string;
  name: string;
  slot: ModSlot;
  rarity: Rarity;
  price: number;
  description: string;
  statChanges: string[];
  compatibleWeaponIds: string[];
  wikiUrl?: string;
}

const wikiUrl = "https://marathonthegame.fandom.com/wiki/Mods";

const arWeapons = ["impact-h-ar", "m77-assault-rifle", "overrun-ar", "v75-scar"];
const prWeapons = ["br33-volley-rifle", "hardline-pr", "repeater-hpr", "stryder-m1t", "twin-tap-hbr", "v66-lookout", "v95-lookout"];
const smgWeapons = ["bully-smg", "brrt-smg", "copperhead-rf", "v22-volt-thrower", "drrvish", "kkv-9sd"];
const shotgunWeapons = ["misriah-2442", "v85-circuit-breaker", "wstr-combat-shotgun"];
const sniperWeapons = ["longshot", "outland", "v99-channel-rifle"];
const lmgWeapons = ["conquest-lmg", "demolition-hmg", "retaliator-lmg"];
const railWeapons = ["ares-rg", "v00-zeus-rg", "v85-free-tail", "v99-watchtower"];
const allBallistic = [...arWeapons, ...prWeapons, ...smgWeapons, "ce-tactical-sidearm", "magnum-mc", "d54-battle-pistol", ...shotgunWeapons, ...sniperWeapons, ...lmgWeapons];

function withWiki(mods: ModSeed[]) {
  return mods.map((mod) => ({ ...mod, wikiUrl: wikiUrl }));
}

export const extendedMods = withWiki([
  // Barrel
  { id: "flechette-split-action", name: "Flechette Split Action", slot: "barrel", rarity: "prestige", price: 1620, description: "Splits rounds into flechettes.", statChanges: ["Equip -0.05s", "Hipfire -0.08°", "Recoil -39%"], compatibleWeaponIds: shotgunWeapons },
  { id: "lockout-muzzle-brake", name: "Lockout Muzzle Brake", slot: "barrel", rarity: "prestige", price: 1620, description: "Heavy muzzle brake for recoil control.", statChanges: ["Hipfire -1.8°", "Weight -18"], compatibleWeaponIds: arWeapons },
  { id: "outland-suppressor", name: "Outland Suppressor", slot: "barrel", rarity: "prestige", price: 1620, description: "Long-range suppressor.", statChanges: ["Range +20", "Recoil -20%"], compatibleWeaponIds: sniperWeapons },
  { id: "overcharge-lens", name: "Overcharge Lens", slot: "barrel", rarity: "prestige", price: 1620, description: "Volt overcharge barrel.", statChanges: ["Aim Assist +1°", "Range +2"], compatibleWeaponIds: ["v75-scar", "v66-lookout"] },
  { id: "ironhold-barrel", name: "Ironhold Barrel", slot: "barrel", rarity: "superior", price: 540, description: "Massive recoil reduction.", statChanges: ["Crouch bonus -20%", "Recoil -42%"], compatibleWeaponIds: arWeapons },
  { id: "weighted-barrel", name: "Weighted Barrel", slot: "barrel", rarity: "superior", price: 540, description: "Stabilized heavy barrel.", statChanges: ["Aim Assist +0.36°", "Moving Inaccuracy -10%"], compatibleWeaponIds: prWeapons },
  { id: "precision-barrel", name: "Precision Barrel", slot: "barrel", rarity: "enhanced", price: 60, description: "Precision tuning barrel.", statChanges: ["ADS Speed -", "Range +2"], compatibleWeaponIds: prWeapons },

  // Magazine
  { id: "adaptive-mag", name: "Adaptive Mag", slot: "magazine", rarity: "prestige", price: 1620, description: "Adaptive magazine system.", statChanges: ["Magazine +30", "Reload -0.24s"], compatibleWeaponIds: allBallistic },
  { id: "flechette-drum", name: "Flechette Drum", slot: "magazine", rarity: "prestige", price: 1863, description: "High-capacity flechette drum.", statChanges: ["Magazine +64", "Ready -0.32s"], compatibleWeaponIds: smgWeapons },
  { id: "infinity-belt", name: "Infinity Belt", slot: "magazine", rarity: "prestige", price: 1620, description: "LMG belt feed extension.", statChanges: ["Magazine +90", "Reload +1.55s"], compatibleWeaponIds: lmgWeapons },
  { id: "rodeo-mag", name: "Rodeo Mag", slot: "magazine", rarity: "prestige", price: 1620, description: "Ramping fire-rate magazine.", statChanges: ["Fire Rate +60", "Magazine +49", "Recoil -13%"], compatibleWeaponIds: lmgWeapons },
  { id: "hi-speed-mag", name: "Hi-Speed Mag", slot: "magazine", rarity: "superior", price: 378, description: "Fast reload magazine.", statChanges: ["Magazine +3", "Reload -0.52s"], compatibleWeaponIds: allBallistic },
  { id: "feather-mag", name: "Feather Mag", slot: "magazine", rarity: "deluxe", price: 207, description: "Lightweight fast mag.", statChanges: ["Magazine +12", "Reload -0.72s"], compatibleWeaponIds: smgWeapons },
  { id: "hollow-case-rounds", name: "Hollow-Case Rounds", slot: "magazine", rarity: "deluxe", price: 207, description: "Hollow-point ballistic rounds.", statChanges: ["Magazine +12", "Range +5", "Reload -0.12s"], compatibleWeaponIds: prWeapons },
  { id: "cloudfeather-chamber", name: "Cloudfeather Chamber", slot: "magazine", rarity: "enhanced", price: 69, description: "Slightly increases magazine and reload.", statChanges: ["Magazine +", "Reload +"], compatibleWeaponIds: smgWeapons },

  // Optic
  { id: "charge-coupled-optic", name: "Charge-Coupled Optic", slot: "optic", rarity: "prestige", price: 1620, description: "High precision volt optic.", statChanges: ["ADS Spread -0.2°"], compatibleWeaponIds: prWeapons },
  { id: "lever-focus", name: "Lever Focus", slot: "optic", rarity: "prestige", price: 1620, description: "Lever-action precision optic.", statChanges: ["ADS Zoom +0.9", "Hipfire -1.27°"], compatibleWeaponIds: ["repeater-hpr"] },
  { id: "midsight-optic", name: "Midsight Optic", slot: "optic", rarity: "deluxe", price: 180, description: "Mid-range combat optic.", statChanges: ["ADS Spread -", "Zoom +0.4"], compatibleWeaponIds: allBallistic },
  { id: "thermal-optic", name: "Thermal Optic", slot: "optic", rarity: "deluxe", price: 207, description: "Thermal imaging scope.", statChanges: ["ADS Zoom +0.4"], compatibleWeaponIds: sniperWeapons },
  { id: "shortwave-scout-optic", name: "Shortwave Scout Optic", slot: "optic", rarity: "deluxe", price: 234, description: "Compact scout sight.", statChanges: ["ADS Spread -0.06°", "Zoom +0.1"], compatibleWeaponIds: smgWeapons },

  // Grip
  { id: "snapshot-grip", name: "Snapshot Grip", slot: "grip", rarity: "deluxe", price: 180, description: "Faster ADS grip.", statChanges: ["ADS Speed -0.12s"], compatibleWeaponIds: allBallistic },
  { id: "guarded-grip", name: "Guarded Grip", slot: "grip", rarity: "deluxe", price: 180, description: "Recoil control grip.", statChanges: ["Equip -0.2s", "Recoil -9%"], compatibleWeaponIds: arWeapons },
  { id: "speed-scout-grip", name: "Speed Scout Grip", slot: "grip", rarity: "deluxe", price: 180, description: "Lightweight scout grip.", statChanges: ["ADS Speed +0.12s", "ADS Spread -0.04°"], compatibleWeaponIds: smgWeapons },
  { id: "sturdy-brace-grip", name: "Sturdy Brace Grip", slot: "grip", rarity: "enhanced", price: 60, description: "Increases stability.", statChanges: ["Stability +"], compatibleWeaponIds: lmgWeapons },

  // Chip — expanded set
  { id: "blue-blood", name: "Blue Blood", slot: "chip", rarity: "superior", price: 621, description: "Downing a Runner restores health.", statChanges: ["Heal on runner down"], compatibleWeaponIds: allBallistic },
  { id: "circuit-tracers", name: "Circuit Tracers", slot: "chip", rarity: "superior", price: 621, description: "Eliminations reload magazine significantly.", statChanges: ["Reload on kill"], compatibleWeaponIds: allBallistic },
  { id: "insomniac", name: "Insomniac", slot: "chip", rarity: "superior", price: 621, description: "Extends Energy Amp with eliminations.", statChanges: ["Energy Amp extend"], compatibleWeaponIds: allBallistic },
  { id: "last-resort", name: "Last Resort", slot: "chip", rarity: "superior", price: 621, description: "Overheated non-precision damage boost.", statChanges: ["Overheat damage +"], compatibleWeaponIds: arWeapons },
  { id: "punishment", name: "Punishment", slot: "chip", rarity: "superior", price: 621, description: "Bonus damage vs S'pht combatants.", statChanges: ["Anti-S'pht damage +"], compatibleWeaponIds: allBallistic },
  { id: "rorschach-test", name: "Rorschach Test", slot: "chip", rarity: "superior", price: 621, description: "Surrounded reload overflows magazine.", statChanges: ["Overflow when surrounded"], compatibleWeaponIds: lmgWeapons },
  { id: "slip-protocol", name: "Slip Protocol", slot: "chip", rarity: "superior", price: 621, description: "Moving increases accuracy and stability.", statChanges: ["Moving accuracy +"], compatibleWeaponIds: smgWeapons },
  { id: "afterburner", name: "Afterburner", slot: "chip", rarity: "enhanced", price: 69, description: "Sliding reloads portion of magazine.", statChanges: ["Slide reload"], compatibleWeaponIds: smgWeapons },
  { id: "battle-runner", name: "Battle Runner", slot: "chip", rarity: "enhanced", price: 69, description: "Eliminations grant sprint speed.", statChanges: ["Sprint on kill"], compatibleWeaponIds: allBallistic },
  { id: "bounty-hunter", name: "Bounty Hunter", slot: "chip", rarity: "standard", price: 23, description: "UESC kills pay credits.", statChanges: ["Credits on UESC kill"], compatibleWeaponIds: allBallistic },
  { id: "chaos-theory", name: "Chaos Theory", slot: "chip", rarity: "standard", price: 23, description: "Sustained damage drops random ammo.", statChanges: ["Ammo drop"], compatibleWeaponIds: lmgWeapons },
  { id: "cloudborn", name: "Cloudborn", slot: "chip", rarity: "standard", price: 23, description: "Smoke reload overflows magazine.", statChanges: ["Smoke overflow"], compatibleWeaponIds: smgWeapons },
  { id: "eyes-on-fire", name: "Eyes on Fire", slot: "chip", rarity: "standard", price: 23, description: "Ability eliminations restore energy.", statChanges: ["Ability energy on kill"], compatibleWeaponIds: allBallistic },
  { id: "heatsink", name: "Heatsink", slot: "chip", rarity: "standard", price: 23, description: "Sustained fire reduces heat generation.", statChanges: ["Heat reduction"], compatibleWeaponIds: ["v75-scar", "v66-lookout", "v22-volt-thrower"] },
  { id: "optimal-prime", name: "Optimal Prime", slot: "chip", rarity: "standard", price: 23, description: "Post-prime damage grants Energy Amp.", statChanges: ["Energy Amp proc"], compatibleWeaponIds: allBallistic },
  { id: "sucker-punch", name: "Sucker Punch", slot: "chip", rarity: "standard", price: 23, description: "Next melee after weapon damage deals more.", statChanges: ["Melee damage +"], compatibleWeaponIds: shotgunWeapons },

  // Shield mods
  { id: "overclocked-shield", name: "Overclocked Shield", slot: "shield", rarity: "prestige", price: 1620, description: "Overclocked volt weapon shield.", statChanges: ["Recoil -6%", "Weight -4.5%"], compatibleWeaponIds: railWeapons },
  { id: "control-shield", name: "Control Shield", slot: "shield", rarity: "enhanced", price: 69, description: "Recoil control shield.", statChanges: ["Recoil -10%"], compatibleWeaponIds: allBallistic },
]);
