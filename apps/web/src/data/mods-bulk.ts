// Additional weapon mods — bulk catalog to reach Marathon-scale coverage
// Source: https://marathonthegame.fandom.com/wiki/Mods

import type { ModSlot, Rarity } from "@/data/types";

export interface ModSeed {
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
const pistolWeapons = ["ce-tactical-sidearm", "magnum-mc", "d54-battle-pistol"];
const allBallistic = [...arWeapons, ...prWeapons, ...smgWeapons, ...pistolWeapons, ...shotgunWeapons, ...sniperWeapons, ...lmgWeapons];
const voltWeapons = ["v75-scar", "v66-lookout", "v22-volt-thrower", "v00-zeus-rg", "v85-circuit-breaker", "v99-channel-rifle"];

function withWiki(mods: ModSeed[]): ModSeed[] {
  return mods.map((mod) => ({ ...mod, wikiUrl }));
}

const bulkModSeeds = withWiki([
  // Barrel
  { id: "compensator", name: "Compensator", slot: "barrel", rarity: "enhanced", price: 60, description: "Reduces vertical recoil.", statChanges: ["Recoil -12%"], compatibleWeaponIds: arWeapons },
  { id: "flash-hider", name: "Flash Hider", slot: "barrel", rarity: "standard", price: 23, description: "Reduces muzzle flash visibility.", statChanges: ["Flash -"], compatibleWeaponIds: allBallistic },
  { id: "extended-barrel", name: "Extended Barrel", slot: "barrel", rarity: "deluxe", price: 180, description: "Extends effective range.", statChanges: ["Range +3"], compatibleWeaponIds: prWeapons },
  { id: "tactical-suppressor", name: "Tactical Suppressor", slot: "barrel", rarity: "superior", price: 540, description: "Suppresses fire without heavy handling penalty.", statChanges: ["Range +8", "Recoil -8%"], compatibleWeaponIds: smgWeapons },
  { id: "volt-converter", name: "Volt Converter", slot: "barrel", rarity: "prestige", price: 1620, description: "Converts ballistic output to volt discharge.", statChanges: ["Volt damage +"], compatibleWeaponIds: voltWeapons },
  { id: "slug-adapter", name: "Slug Adapter", slot: "barrel", rarity: "superior", price: 540, description: "Fires single high-damage slugs.", statChanges: ["Damage +", "Magazine -"], compatibleWeaponIds: shotgunWeapons },
  { id: "choke-tube", name: "Choke Tube", slot: "barrel", rarity: "enhanced", price: 60, description: "Tightens pellet spread.", statChanges: ["Spread -15%"], compatibleWeaponIds: shotgunWeapons },
  { id: "rail-accelerator", name: "Rail Accelerator", slot: "barrel", rarity: "prestige", price: 1620, description: "Increases rail charge speed.", statChanges: ["Charge -0.2s"], compatibleWeaponIds: railWeapons },
  { id: "match-grade-barrel", name: "Match Grade Barrel", slot: "barrel", rarity: "superior", price: 540, description: "Precision-machined sniper barrel.", statChanges: ["ADS Spread -0.15°"], compatibleWeaponIds: sniperWeapons },
  { id: "carbine-kit", name: "Carbine Kit", slot: "barrel", rarity: "deluxe", price: 180, description: "Shortens barrel for mobility.", statChanges: ["ADS Speed +0.1s", "Range -2"], compatibleWeaponIds: arWeapons },
  { id: "fluted-barrel", name: "Fluted Barrel", slot: "barrel", rarity: "enhanced", price: 60, description: "Lightweight fluted barrel.", statChanges: ["Weight -5%", "Range +1"], compatibleWeaponIds: prWeapons },
  { id: "heavy-port-brake", name: "Heavy Port Brake", slot: "barrel", rarity: "deluxe", price: 180, description: "Ported muzzle brake.", statChanges: ["Recoil -18%"], compatibleWeaponIds: lmgWeapons },
  { id: "integral-suppressor", name: "Integral Suppressor", slot: "barrel", rarity: "superior", price: 540, description: "Built-in suppressor assembly.", statChanges: ["Sound -", "Range +5"], compatibleWeaponIds: smgWeapons },
  { id: "ion-emitter", name: "Ion Emitter", slot: "barrel", rarity: "prestige", price: 1620, description: "Ionizes volt projectiles.", statChanges: ["Ion damage +"], compatibleWeaponIds: voltWeapons },
  { id: "harmonic-dampener", name: "Harmonic Dampener", slot: "barrel", rarity: "deluxe", price: 207, description: "Dampens weapon vibration.", statChanges: ["Accuracy +"], compatibleWeaponIds: sniperWeapons },

  // Magazine
  { id: "extended-mag", name: "Extended Mag", slot: "magazine", rarity: "enhanced", price: 69, description: "Increases magazine capacity.", statChanges: ["Magazine +6"], compatibleWeaponIds: allBallistic },
  { id: "quick-mag", name: "Quick Mag", slot: "magazine", rarity: "deluxe", price: 180, description: "Faster reload speed.", statChanges: ["Reload -0.3s"], compatibleWeaponIds: allBallistic },
  { id: "tactical-mag", name: "Tactical Mag", slot: "magazine", rarity: "deluxe", price: 180, description: "Balanced capacity and reload.", statChanges: ["Magazine +4", "Reload -0.15s"], compatibleWeaponIds: prWeapons },
  { id: "armor-piercing-mag", name: "Armor Piercing Mag", slot: "magazine", rarity: "superior", price: 540, description: "Rounds penetrate shields more effectively.", statChanges: ["Shield damage +"], compatibleWeaponIds: arWeapons },
  { id: "incendiary-mag", name: "Incendiary Mag", slot: "magazine", rarity: "superior", price: 540, description: "Ignites targets on sustained fire.", statChanges: ["Burn proc"], compatibleWeaponIds: lmgWeapons },
  { id: "volt-cell-mag", name: "Volt Cell Mag", slot: "magazine", rarity: "deluxe", price: 180, description: "Extended volt cell capacity.", statChanges: ["Magazine +15%"], compatibleWeaponIds: voltWeapons },
  { id: "belt-feed", name: "Belt Feed", slot: "magazine", rarity: "superior", price: 540, description: "Belt-fed ammunition system.", statChanges: ["Magazine +40", "Reload +0.8s"], compatibleWeaponIds: lmgWeapons },
  { id: "stripper-clip", name: "Stripper Clip", slot: "magazine", rarity: "enhanced", price: 69, description: "Speeds partial reloads.", statChanges: ["Reload -0.2s"], compatibleWeaponIds: ["repeater-hpr", "misriah-2442"] },
  { id: "overpressure-rounds", name: "Overpressure Rounds", slot: "magazine", rarity: "prestige", price: 1620, description: "High-pressure damage rounds.", statChanges: ["Damage +8%"], compatibleWeaponIds: prWeapons },
  { id: "tracer-mag", name: "Tracer Mag", slot: "magazine", rarity: "standard", price: 23, description: "Visible tracers improve tracking.", statChanges: ["Tracer rounds"], compatibleWeaponIds: allBallistic },
  { id: "extended-clip", name: "Extended Clip", slot: "magazine", rarity: "enhanced", price: 69, description: "Extended clip for pistols.", statChanges: ["Magazine +4"], compatibleWeaponIds: pistolWeapons },
  { id: "flechette-mag", name: "Flechette Mag", slot: "magazine", rarity: "superior", price: 621, description: "Flechette ammunition.", statChanges: ["Flechette rounds"], compatibleWeaponIds: shotgunWeapons },
  { id: "dual-mag", name: "Dual Mag", slot: "magazine", rarity: "deluxe", price: 207, description: "Dual magazine system.", statChanges: ["Magazine +8", "Reload -0.1s"], compatibleWeaponIds: smgWeapons },
  { id: "rail-cell-pack", name: "Rail Cell Pack", slot: "magazine", rarity: "superior", price: 621, description: "Extended rail cell magazine.", statChanges: ["Magazine +2"], compatibleWeaponIds: railWeapons },
  { id: "speed-loader", name: "Speed Loader", slot: "magazine", rarity: "enhanced", price: 69, description: "Speed loader for revolvers.", statChanges: ["Reload -0.4s"], compatibleWeaponIds: ["magnum-mc", "repeater-hpr"] },

  // Optic
  { id: "red-dot-sight", name: "Red Dot Sight", slot: "optic", rarity: "standard", price: 23, description: "Basic reflex sight.", statChanges: ["ADS Spread -0.04°"], compatibleWeaponIds: allBallistic },
  { id: "holo-sight", name: "Holo Sight", slot: "optic", rarity: "enhanced", price: 69, description: "Holographic combat sight.", statChanges: ["ADS Spread -0.06°", "Zoom +0.2"], compatibleWeaponIds: allBallistic },
  { id: "acog-scope", name: "ACOG Scope", slot: "optic", rarity: "deluxe", price: 180, description: "Medium-range magnified optic.", statChanges: ["Zoom +0.8"], compatibleWeaponIds: arWeapons },
  { id: "sniper-scope", name: "Sniper Scope", slot: "optic", rarity: "superior", price: 540, description: "Long-range precision scope.", statChanges: ["Zoom +2.0"], compatibleWeaponIds: sniperWeapons },
  { id: "variable-zoom", name: "Variable Zoom", slot: "optic", rarity: "prestige", price: 1620, description: "Adjustable magnification optic.", statChanges: ["Zoom 1.2-4.0X"], compatibleWeaponIds: sniperWeapons },
  { id: "reflex-lens", name: "Reflex Lens", slot: "optic", rarity: "enhanced", price: 69, description: "Fast-acquisition reflex lens.", statChanges: ["ADS Speed +0.05s"], compatibleWeaponIds: smgWeapons },
  { id: "rangefinder-sight", name: "Rangefinder Sight", slot: "optic", rarity: "deluxe", price: 180, description: "Built-in rangefinder.", statChanges: ["Range indicator", "Zoom +0.5"], compatibleWeaponIds: prWeapons },
  { id: "volt-sight", name: "Volt Sight", slot: "optic", rarity: "superior", price: 540, description: "Volt-tuned targeting optic.", statChanges: ["Tracking +"], compatibleWeaponIds: voltWeapons },
  { id: "low-profile-optic", name: "Low Profile Optic", slot: "optic", rarity: "enhanced", price: 69, description: "Compact low-profile sight.", statChanges: ["ADS Speed +0.04s"], compatibleWeaponIds: smgWeapons },
  { id: "scout-scope", name: "Scout Scope", slot: "optic", rarity: "deluxe", price: 207, description: "Scout magnification optic.", statChanges: ["Zoom +1.0"], compatibleWeaponIds: prWeapons },
  { id: "thermal-sight", name: "Thermal Sight", slot: "optic", rarity: "prestige", price: 1620, description: "Thermal imaging sight.", statChanges: ["Thermal vision"], compatibleWeaponIds: sniperWeapons },
  { id: "iron-sights-plus", name: "Iron Sights+", slot: "optic", rarity: "standard", price: 23, description: "Enhanced iron sights.", statChanges: ["ADS Spread -0.02°"], compatibleWeaponIds: pistolWeapons },

  // Grip
  { id: "angled-grip", name: "Angled Grip", slot: "grip", rarity: "enhanced", price: 69, description: "Improves ADS transition speed.", statChanges: ["ADS Speed +0.08s"], compatibleWeaponIds: allBallistic },
  { id: "vertical-grip", name: "Vertical Grip", slot: "grip", rarity: "deluxe", price: 180, description: "Reduces vertical recoil.", statChanges: ["Recoil -11%"], compatibleWeaponIds: arWeapons },
  { id: "rubberized-grip", name: "Rubberized Grip", slot: "grip", rarity: "standard", price: 23, description: "Improves weapon handling.", statChanges: ["Handling +"], compatibleWeaponIds: allBallistic },
  { id: "bipod-grip", name: "Bipod Grip", slot: "grip", rarity: "superior", price: 540, description: "Deployable bipod for stability.", statChanges: ["Crouch stability +"], compatibleWeaponIds: lmgWeapons },
  { id: "ergonomic-grip", name: "Ergonomic Grip", slot: "grip", rarity: "deluxe", price: 180, description: "Comfort grip for extended engagements.", statChanges: ["Equip -0.15s"], compatibleWeaponIds: smgWeapons },
  { id: "stabilizer-grip", name: "Stabilizer Grip", slot: "grip", rarity: "superior", price: 540, description: "Heavy stabilizer for precision fire.", statChanges: ["Moving Inaccuracy -12%"], compatibleWeaponIds: prWeapons },
  { id: "pistol-grip-mod", name: "Pistol Grip", slot: "grip", rarity: "enhanced", price: 69, description: "Custom pistol grip module.", statChanges: ["ADS Speed +0.06s"], compatibleWeaponIds: pistolWeapons },
  { id: "hand-stop", name: "Hand Stop", slot: "grip", rarity: "enhanced", price: 69, description: "Forward hand stop for control.", statChanges: ["Recoil -6%"], compatibleWeaponIds: arWeapons },
  { id: "thumb-rest", name: "Thumb Rest", slot: "grip", rarity: "standard", price: 23, description: "Ergonomic thumb rest.", statChanges: ["Handling +"], compatibleWeaponIds: allBallistic },
  { id: "folding-grip", name: "Folding Grip", slot: "grip", rarity: "deluxe", price: 180, description: "Folding vertical grip.", statChanges: ["Equip -0.1s"], compatibleWeaponIds: smgWeapons },

  // Generator
  { id: "volt-generator", name: "Volt Generator", slot: "generator", rarity: "deluxe", price: 180, description: "Improves volt weapon charge efficiency.", statChanges: ["Charge speed +"], compatibleWeaponIds: voltWeapons },
  { id: "overcharge-gen", name: "Overcharge Generator", slot: "generator", rarity: "superior", price: 540, description: "Overcharges volt output at heat cost.", statChanges: ["Damage +10%", "Heat +15%"], compatibleWeaponIds: voltWeapons },
  { id: "efficiency-gen", name: "Efficiency Generator", slot: "generator", rarity: "enhanced", price: 69, description: "Reduces heat generation.", statChanges: ["Heat -10%"], compatibleWeaponIds: voltWeapons },
  { id: "rail-capacitor", name: "Rail Capacitor", slot: "generator", rarity: "prestige", price: 1620, description: "Capacitor bank for rail weapons.", statChanges: ["Charge retention +"], compatibleWeaponIds: railWeapons },
  { id: "thermal-dissipator", name: "Thermal Dissipator", slot: "generator", rarity: "superior", price: 540, description: "Dissipates weapon heat faster.", statChanges: ["Cooling +"], compatibleWeaponIds: voltWeapons },
  { id: "pulse-generator", name: "Pulse Generator", slot: "generator", rarity: "deluxe", price: 207, description: "Pulse-charge volt generator.", statChanges: ["Pulse charge +"], compatibleWeaponIds: voltWeapons },
  { id: "field-coil", name: "Field Coil", slot: "generator", rarity: "enhanced", price: 69, description: "Magnetic field coil for rails.", statChanges: ["Charge +"], compatibleWeaponIds: railWeapons },

  // Shield
  { id: "light-shield", name: "Light Shield", slot: "shield", rarity: "standard", price: 23, description: "Minimal weight shield mod.", statChanges: ["Weight -3%"], compatibleWeaponIds: allBallistic },
  { id: "heavy-shield", name: "Heavy Shield", slot: "shield", rarity: "deluxe", price: 180, description: "Reinforced weapon shielding.", statChanges: ["Recoil -5%"], compatibleWeaponIds: arWeapons },
  { id: "volt-shield", name: "Volt Shield", slot: "shield", rarity: "superior", price: 540, description: "Volt-harmonic weapon shield.", statChanges: ["Volt efficiency +"], compatibleWeaponIds: voltWeapons },
  { id: "impact-dampener", name: "Impact Dampener", slot: "shield", rarity: "enhanced", price: 69, description: "Dampens firing impulse.", statChanges: ["Recoil -7%"], compatibleWeaponIds: lmgWeapons },
  { id: "kinetic-shield", name: "Kinetic Shield", slot: "shield", rarity: "deluxe", price: 180, description: "Kinetic energy dampening shield.", statChanges: ["Stability +"], compatibleWeaponIds: prWeapons },
  { id: "absorption-shield", name: "Absorption Shield", slot: "shield", rarity: "superior", price: 540, description: "Absorbs recoil energy.", statChanges: ["Recoil -12%"], compatibleWeaponIds: shotgunWeapons },

  // Chips
  { id: "adrenaline-junkie", name: "Adrenaline Junkie", slot: "chip", rarity: "enhanced", price: 69, description: "Low health increases fire rate.", statChanges: ["Fire Rate + when wounded"], compatibleWeaponIds: smgWeapons },
  { id: "ambush", name: "Ambush", slot: "chip", rarity: "superior", price: 621, description: "First shot from stealth deals bonus damage.", statChanges: ["Stealth damage +"], compatibleWeaponIds: allBallistic },
  { id: "armor-breaker", name: "Armor Breaker", slot: "chip", rarity: "deluxe", price: 207, description: "Sustained fire weakens enemy shields.", statChanges: ["Shield break +"], compatibleWeaponIds: arWeapons },
  { id: "blood-money", name: "Blood Money", slot: "chip", rarity: "standard", price: 23, description: "Eliminations grant credits.", statChanges: ["Credits on kill"], compatibleWeaponIds: allBallistic },
  { id: "close-quarters", name: "Close Quarters", slot: "chip", rarity: "enhanced", price: 69, description: "Bonus damage at close range.", statChanges: ["CQC damage +"], compatibleWeaponIds: shotgunWeapons },
  { id: "cold-bore", name: "Cold Bore", slot: "chip", rarity: "superior", price: 621, description: "First shot after reload is more accurate.", statChanges: ["First shot accuracy +"], compatibleWeaponIds: sniperWeapons },
  { id: "counter-attack", name: "Counter Attack", slot: "chip", rarity: "deluxe", price: 207, description: "Taking damage briefly boosts fire rate.", statChanges: ["Fire Rate + on hit"], compatibleWeaponIds: smgWeapons },
  { id: "deadeye", name: "Deadeye", slot: "chip", rarity: "superior", price: 621, description: "Precision kills extend ADS time.", statChanges: ["ADS duration + on precision kill"], compatibleWeaponIds: prWeapons },
  { id: "desperado", name: "Desperado", slot: "chip", rarity: "prestige", price: 1620, description: "Precision kills massively boost fire rate.", statChanges: ["Fire Rate + on precision kill"], compatibleWeaponIds: prWeapons },
  { id: "elemental-capacitor", name: "Elemental Capacitor", slot: "chip", rarity: "enhanced", price: 69, description: "Ability use boosts weapon handling.", statChanges: ["Handling + after ability"], compatibleWeaponIds: allBallistic },
  { id: "feeding-frenzy", name: "Feeding Frenzy", slot: "chip", rarity: "superior", price: 621, description: "Eliminations increase reload speed.", statChanges: ["Reload - on kill"], compatibleWeaponIds: smgWeapons },
  { id: "frenzy", name: "Frenzy", slot: "chip", rarity: "deluxe", price: 207, description: "Melee kills grant brief damage boost.", statChanges: ["Damage + after melee kill"], compatibleWeaponIds: shotgunWeapons },
  { id: "glass-cannon", name: "Glass Cannon", slot: "chip", rarity: "prestige", price: 1620, description: "Massive damage at cost of handling.", statChanges: ["Damage +20%", "Handling -15%"], compatibleWeaponIds: sniperWeapons },
  { id: "headseeker", name: "Headseeker", slot: "chip", rarity: "superior", price: 621, description: "Precision hits grant stacking accuracy.", statChanges: ["Headshot accuracy +"], compatibleWeaponIds: prWeapons },
  { id: "high-energy", name: "High Energy", slot: "chip", rarity: "deluxe", price: 207, description: "Full shields boost weapon damage.", statChanges: ["Damage + at full shields"], compatibleWeaponIds: voltWeapons },
  { id: "kill-clip", name: "Kill Clip", slot: "chip", rarity: "superior", price: 621, description: "Reload after kill boosts damage.", statChanges: ["Damage + after kill reload"], compatibleWeaponIds: allBallistic },
  { id: "killing-wind", name: "Killing Wind", slot: "chip", rarity: "deluxe", price: 207, description: "Eliminations boost range and mobility.", statChanges: ["Range + on kill"], compatibleWeaponIds: prWeapons },
  { id: "momentum", name: "Momentum", slot: "chip", rarity: "enhanced", price: 69, description: "Melee kills reduce ability cooldown.", statChanges: ["Ability CD - on melee kill"], compatibleWeaponIds: allBallistic },
  { id: "one-two-punch", name: "One-Two Punch", slot: "chip", rarity: "prestige", price: 1620, description: "Melee hits empower next shot.", statChanges: ["Melee empowers shot"], compatibleWeaponIds: shotgunWeapons },
  { id: "opening-shot", name: "Opening Shot", slot: "chip", rarity: "enhanced", price: 69, description: "First shot of engagement is more accurate.", statChanges: ["First shot accuracy +"], compatibleWeaponIds: allBallistic },
  { id: "outlaw", name: "Outlaw", slot: "chip", rarity: "deluxe", price: 207, description: "Precision kills boost reload speed.", statChanges: ["Reload - on precision kill"], compatibleWeaponIds: prWeapons },
  { id: "overflow", name: "Overflow", slot: "chip", rarity: "superior", price: 621, description: "Special ammo pickup overflows magazine.", statChanges: ["Overflow on pickup"], compatibleWeaponIds: lmgWeapons },
  { id: "rampage", name: "Rampage", slot: "chip", rarity: "deluxe", price: 207, description: "Stacking damage on eliminations.", statChanges: ["Damage stacks on kill"], compatibleWeaponIds: arWeapons },
  { id: "rapid-hit", name: "Rapid Hit", slot: "chip", rarity: "enhanced", price: 69, description: "Precision hits boost reload speed.", statChanges: ["Reload - on precision hit"], compatibleWeaponIds: allBallistic },
  { id: "reconstruction", name: "Reconstruction", slot: "chip", rarity: "prestige", price: 1620, description: "Slowly refills magazine from reserves.", statChanges: ["Auto-reload over time"], compatibleWeaponIds: lmgWeapons },
  { id: "rewind-rounds", name: "Rewind Rounds", slot: "chip", rarity: "superior", price: 621, description: "Precision hits return rounds to magazine.", statChanges: ["Ammo return on precision hit"], compatibleWeaponIds: prWeapons },
  { id: "shield-battery", name: "Shield Battery", slot: "chip", rarity: "enhanced", price: 69, description: "Eliminations recharge shields.", statChanges: ["Shield recharge on kill"], compatibleWeaponIds: allBallistic },
  { id: "subsistence", name: "Subsistence", slot: "chip", rarity: "deluxe", price: 207, description: "Eliminations return ammo to magazine.", statChanges: ["Ammo return on kill"], compatibleWeaponIds: lmgWeapons },
  { id: "surplus", name: "Surplus", slot: "chip", rarity: "standard", price: 23, description: "Increased ammo reserves.", statChanges: ["Reserve ammo +"], compatibleWeaponIds: allBallistic },
  { id: "swashbuckler", name: "Swashbuckler", slot: "chip", rarity: "enhanced", price: 69, description: "Melee kills empower weapon damage.", statChanges: ["Damage + after melee kill"], compatibleWeaponIds: pistolWeapons },
  { id: "target-lock", name: "Target Lock", slot: "chip", rarity: "superior", price: 621, description: "Sustained damage marks targets.", statChanges: ["Target mark on damage"], compatibleWeaponIds: voltWeapons },
  { id: "threat-detector", name: "Threat Detector", slot: "chip", rarity: "enhanced", price: 69, description: "Nearby hostiles boost handling.", statChanges: ["Handling + when surrounded"], compatibleWeaponIds: smgWeapons },
  { id: "tunnel-vision", name: "Tunnel Vision", slot: "chip", rarity: "deluxe", price: 207, description: "Reloading near hostiles boosts handling.", statChanges: ["Handling + on combat reload"], compatibleWeaponIds: smgWeapons },
  { id: "vorpal", name: "Vorpal", slot: "chip", rarity: "superior", price: 621, description: "Bonus damage against bosses and elites.", statChanges: ["Boss damage +"], compatibleWeaponIds: sniperWeapons },
  { id: "warm-up", name: "Warm-Up", slot: "chip", rarity: "enhanced", price: 69, description: "Sustained fire increases accuracy.", statChanges: ["Accuracy + while firing"], compatibleWeaponIds: lmgWeapons },
  { id: "adagio", name: "Adagio", slot: "chip", rarity: "superior", price: 621, description: "Precision kills boost damage and range.", statChanges: ["Damage +", "Range +"], compatibleWeaponIds: prWeapons },
  { id: "agile", name: "Agile", slot: "chip", rarity: "enhanced", price: 69, description: "Improves handling while moving.", statChanges: ["Moving handling +"], compatibleWeaponIds: smgWeapons },
  { id: "backup-mag", name: "Backup Mag", slot: "chip", rarity: "standard", price: 23, description: "Increases reserve ammo capacity.", statChanges: ["Reserve +"], compatibleWeaponIds: allBallistic },
  { id: "chain-reaction", name: "Chain Reaction", slot: "chip", rarity: "superior", price: 621, description: "Precision kills cause explosions.", statChanges: ["Explosion on precision kill"], compatibleWeaponIds: sniperWeapons },
  { id: "demolitionist", name: "Demolitionist", slot: "chip", rarity: "deluxe", price: 207, description: "Grenade kills refill grenade.", statChanges: ["Grenade refill"], compatibleWeaponIds: allBallistic },
  { id: "dragonfly", name: "Dragonfly", slot: "chip", rarity: "superior", price: 621, description: "Precision kills create elemental explosions.", statChanges: ["Elemental explosion"], compatibleWeaponIds: prWeapons },
  { id: "enemies-around", name: "Enemies Around", slot: "chip", rarity: "enhanced", price: 69, description: "Nearby hostiles boost reload speed.", statChanges: ["Reload - when surrounded"], compatibleWeaponIds: smgWeapons },
  { id: "firefly", name: "Firefly", slot: "chip", rarity: "superior", price: 621, description: "Precision kills spread ignition.", statChanges: ["Ignition spread"], compatibleWeaponIds: arWeapons },
  { id: "firmly-planted", name: "Firmly Planted", slot: "chip", rarity: "deluxe", price: 207, description: "Crouching improves accuracy and stability.", statChanges: ["Crouch bonus +"], compatibleWeaponIds: lmgWeapons },
  { id: "fourth-times", name: "Fourth Times", slot: "chip", rarity: "superior", price: 621, description: "Precision hits return two rounds.", statChanges: ["2 rounds on precision hit"], compatibleWeaponIds: ["repeater-hpr", "magnum-mc"] },
  { id: "grave-robber", name: "Grave Robber", slot: "chip", rarity: "enhanced", price: 69, description: "Melee kills instantly reload weapon.", statChanges: ["Instant reload on melee kill"], compatibleWeaponIds: shotgunWeapons },
  { id: "headstone", name: "Headstone", slot: "chip", rarity: "superior", price: 621, description: "Precision kills leave precision buff.", statChanges: ["Precision buff on kill"], compatibleWeaponIds: prWeapons },
  { id: "incandescent", name: "Incandescent", slot: "chip", rarity: "superior", price: 621, description: "Ability kills spread ignition.", statChanges: ["Ignition spread"], compatibleWeaponIds: arWeapons },
  { id: "kinetic-tremors", name: "Kinetic Tremors", slot: "chip", rarity: "deluxe", price: 207, description: "Sustained fire creates tremors.", statChanges: ["Tremor on sustained fire"], compatibleWeaponIds: lmgWeapons },
  { id: "lead-from-gold", name: "Lead from Gold", slot: "chip", rarity: "enhanced", price: 69, description: "Precision kills drop energy.", statChanges: ["Energy drop on precision kill"], compatibleWeaponIds: allBallistic },
  { id: "multikill-clip", name: "Multikill Clip", slot: "chip", rarity: "superior", price: 621, description: "Stacking damage on multikills.", statChanges: ["Damage stacks"], compatibleWeaponIds: smgWeapons },
  { id: "on-off", name: "On Off", slot: "chip", rarity: "deluxe", price: 207, description: "Alternate fire modes boost stats.", statChanges: ["Mode swap bonus"], compatibleWeaponIds: arWeapons },
  { id: "piercing", name: "Piercing", slot: "chip", rarity: "enhanced", price: 69, description: "Rounds pierce additional targets.", statChanges: ["Pierce +1"], compatibleWeaponIds: prWeapons },
  { id: "ramp-up", name: "Ramp Up", slot: "chip", rarity: "deluxe", price: 207, description: "Sustained fire increases damage.", statChanges: ["Damage ramps"], compatibleWeaponIds: voltWeapons },
  { id: "repulsor-brace", name: "Repulsor Brace", slot: "chip", rarity: "superior", price: 621, description: "Shield break empowers weapon.", statChanges: ["Damage + after shield break"], compatibleWeaponIds: allBallistic },
  { id: "reservoir", name: "Reservoir", slot: "chip", rarity: "enhanced", price: 69, description: "Full mag first shots deal bonus damage.", statChanges: ["First shots damage +"], compatibleWeaponIds: sniperWeapons },
  { id: "rewind", name: "Rewind", slot: "chip", rarity: "deluxe", price: 207, description: "Precision kills reduce ability cooldown.", statChanges: ["Ability CD -"], compatibleWeaponIds: allBallistic },
  { id: "shield-swap", name: "Shield Swap", slot: "chip", rarity: "enhanced", price: 69, description: "Shield break reloads weapon.", statChanges: ["Reload on shield break"], compatibleWeaponIds: smgWeapons },
  { id: "slide-shot", name: "Slide Shot", slot: "chip", rarity: "enhanced", price: 69, description: "Sliding reloads portion of magazine.", statChanges: ["Slide reload"], compatibleWeaponIds: smgWeapons },
  { id: "snapshot-sights", name: "Snapshot Sights", slot: "chip", rarity: "deluxe", price: 207, description: "Sprinting briefly improves accuracy.", statChanges: ["Accuracy after sprint"], compatibleWeaponIds: prWeapons },
  { id: "stats-for-all", name: "Stats For All", slot: "chip", rarity: "superior", price: 621, description: "Sustained fire boosts all stats.", statChanges: ["All stats + while firing"], compatibleWeaponIds: lmgWeapons },
  { id: "sympathetic-resonance", name: "Sympathetic Resonance", slot: "chip", rarity: "prestige", price: 1620, description: "Nearby allies gain weapon bonus.", statChanges: ["Team damage +"], compatibleWeaponIds: allBallistic },
  { id: "tapping-the-vein", name: "Tapping the Vein", slot: "chip", rarity: "deluxe", price: 207, description: "Melee kills grant overshield.", statChanges: ["Overshield on melee kill"], compatibleWeaponIds: shotgunWeapons },
  { id: "target-acquired", name: "Target Acquired", slot: "chip", rarity: "enhanced", price: 69, description: "ADS improves target acquisition.", statChanges: ["Target acquisition +"], compatibleWeaponIds: voltWeapons },
  { id: "tireless", name: "Tireless", slot: "chip", rarity: "standard", price: 23, description: "Ability kills reduce flinch.", statChanges: ["Flinch reduction"], compatibleWeaponIds: allBallistic },
  { id: "to-the-marrow", name: "To the Marrow", slot: "chip", rarity: "superior", price: 621, description: "Bonus damage to wounded targets.", statChanges: ["Wounded damage +"], compatibleWeaponIds: sniperWeapons },
  { id: "triple-tap", name: "Triple Tap", slot: "chip", rarity: "superior", price: 621, description: "Precision hits refund rounds.", statChanges: ["Round refund"], compatibleWeaponIds: prWeapons },
  { id: "under-pressure", name: "Under Pressure", slot: "chip", rarity: "enhanced", price: 69, description: "Low magazine boosts handling.", statChanges: ["Handling + when low mag"], compatibleWeaponIds: allBallistic },
  { id: "vanguard", name: "Vanguard", slot: "chip", rarity: "deluxe", price: 207, description: "Melee kills empower allies.", statChanges: ["Team buff on melee kill"], compatibleWeaponIds: shotgunWeapons },
  { id: "well-spring", name: "Well Spring", slot: "chip", rarity: "superior", price: 621, description: "Ability kills create healing zone.", statChanges: ["Heal zone"], compatibleWeaponIds: allBallistic },

  // Weapon exclusives
  { id: "impact-stopping-mag-plus", name: "Stopping Mag+", slot: "magazine", rarity: "prestige", price: 1863, description: "Impact H-AR exclusive stopping mag.", statChanges: ["Magazine +12", "Reload -0.4s"], compatibleWeaponIds: ["impact-h-ar"] },
  { id: "m77-flip-scope-kit", name: "Flip Scope Kit", slot: "optic", rarity: "superior", price: 621, description: "M77 flip scope enhancement.", statChanges: ["Zoom +0.4"], compatibleWeaponIds: ["m77-assault-rifle"] },
  { id: "v75-tracking-array", name: "Tracking Array", slot: "chip", rarity: "prestige", price: 1620, description: "V75 SCAR tracking enhancer.", statChanges: ["Tracking +"], compatibleWeaponIds: ["v75-scar"] },
  { id: "ares-charge-hold", name: "Charge Hold", slot: "chip", rarity: "prestige", price: 1620, description: "ARES RG charge retention.", statChanges: ["Charge hold +"], compatibleWeaponIds: ["ares-rg"] },
  { id: "zeus-auto-fire", name: "Auto Fire Module", slot: "chip", rarity: "prestige", price: 1620, description: "V00 ZEUS RG auto-discharge.", statChanges: ["Auto fire tuning"], compatibleWeaponIds: ["v00-zeus-rg"] },
  { id: "longshot-bolt-action", name: "Bolt Action Tuning", slot: "barrel", rarity: "superior", price: 540, description: "Longshot bolt optimization.", statChanges: ["Bolt speed +"], compatibleWeaponIds: ["longshot"] },
  { id: "channel-overcharge", name: "Channel Overcharge", slot: "generator", rarity: "prestige", price: 1620, description: "V99 Channel Rifle overcharge.", statChanges: ["Charge damage +"], compatibleWeaponIds: ["v99-channel-rifle"] },
  { id: "circuit-breaker-charge-3", name: "Triple Charge Coil", slot: "generator", rarity: "prestige", price: 1620, description: "V85 third charge level.", statChanges: ["Max charge +1"], compatibleWeaponIds: ["v85-circuit-breaker"] },
  { id: "conquest-ramping-feed", name: "Ramping Feed", slot: "chip", rarity: "superior", price: 621, description: "Conquest LMG ramping fire-rate.", statChanges: ["Ramp rate +"], compatibleWeaponIds: ["conquest-lmg"] },
  { id: "brrt-ramp-controller", name: "Ramp Controller", slot: "chip", rarity: "prestige", price: 1620, description: "BRRT SMG ramp controller.", statChanges: ["Ramp control +"], compatibleWeaponIds: ["brrt-smg"] },
  { id: "misriah-flechette-load", name: "Flechette Load", slot: "magazine", rarity: "superior", price: 621, description: "Misriah flechette cartridges.", statChanges: ["Flechette rounds"], compatibleWeaponIds: ["misriah-2442"] },
  { id: "wstr-double-tap", name: "Double Tap", slot: "chip", rarity: "superior", price: 621, description: "WSTR double barrel rapid fire.", statChanges: ["Double tap"], compatibleWeaponIds: ["wstr-combat-shotgun"] },
  { id: "repeater-lever-spring", name: "Lever Spring", slot: "grip", rarity: "deluxe", price: 207, description: "Repeater HPR lever spring.", statChanges: ["Lever speed +"], compatibleWeaponIds: ["repeater-hpr"] },
  { id: "retaliator-belt-link", name: "Belt Link", slot: "magazine", rarity: "superior", price: 621, description: "Retaliator belt extension.", statChanges: ["Magazine +20"], compatibleWeaponIds: ["retaliator-lmg"] },
  { id: "demolition-suppress-burst", name: "Suppress Burst", slot: "barrel", rarity: "superior", price: 540, description: "Demolition HMG burst control.", statChanges: ["Burst control +"], compatibleWeaponIds: ["demolition-hmg"] },
  { id: "bully-suppression", name: "Suppression", slot: "chip", rarity: "deluxe", price: 207, description: "Bully SMG suppression.", statChanges: ["Suppression +"], compatibleWeaponIds: ["bully-smg"] },
  { id: "copperhead-burst", name: "Burst Regulator", slot: "grip", rarity: "deluxe", price: 180, description: "Copperhead RF burst regulator.", statChanges: ["Burst stability +"], compatibleWeaponIds: ["copperhead-rf"] },
  { id: "magnum-rail-mount", name: "Rail Mount", slot: "optic", rarity: "enhanced", price: 60, description: "Magnum MC optics rail.", statChanges: ["Optic slot +"], compatibleWeaponIds: ["magnum-mc"] },
  { id: "outland-extreme-range", name: "Extreme Range Barrel", slot: "barrel", rarity: "prestige", price: 1620, description: "Outland max range barrel.", statChanges: ["Range +25"], compatibleWeaponIds: ["outland"] },
  { id: "overrun-rapid-kit", name: "Rapid Fire Kit", slot: "grip", rarity: "superior", price: 540, description: "Overrun AR fire-rate kit.", statChanges: ["Fire Rate +15"], compatibleWeaponIds: ["overrun-ar"] },
  { id: "hardline-precision", name: "Precision Bore", slot: "barrel", rarity: "superior", price: 540, description: "Hardline PR precision bore.", statChanges: ["Range +4", "Recoil -8%"], compatibleWeaponIds: ["hardline-pr"] },
  { id: "v66-cooling-fins", name: "Cooling Fins", slot: "generator", rarity: "superior", price: 540, description: "V66 Lookout cooling fins.", statChanges: ["Heat -15%"], compatibleWeaponIds: ["v66-lookout"] },
]);

export function generateBulkMods(existingIds: Set<string>): ModSeed[] {
  return bulkModSeeds.filter((mod) => !existingIds.has(mod.id));
}
