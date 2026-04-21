// Weapon data for the 2026 Marathon extraction shooter
// Source: https://marathonthegame.fandom.com/wiki/Weapons

export type WeaponCategory =
  | "assault_rifle"
  | "machine_gun"
  | "precision_rifle"
  | "pistol"
  | "railgun"
  | "shotgun"
  | "sniper_rifle"
  | "smg";

export type AmmoType = "Light Rounds" | "Heavy Rounds" | "MIPS Rounds" | "Volt Battery" | "Volt Cells";

export interface Weapon {
  id: string;
  name: string;
  category: WeaponCategory;
  description: string;
  firepower: string;
  accuracy: string;
  handling: string;
  range: string;
  magazine: string;
  zoom: string;
  ammoType: AmmoType;
  special?: string;
  imageUrl: string;
  wikiUrl: string;
}

export const weaponCategories: { value: WeaponCategory; label: string }[] = [
  { value: "assault_rifle", label: "Assault Rifles" },
  { value: "machine_gun", label: "Machine Guns" },
  { value: "precision_rifle", label: "Precision Rifles" },
  { value: "pistol", label: "Pistols" },
  { value: "railgun", label: "Railguns" },
  { value: "shotgun", label: "Shotguns" },
  { value: "sniper_rifle", label: "Sniper Rifles" },
  { value: "smg", label: "Submachine Guns" },
];

export const weapons: Weapon[] = [
  // Assault Rifles
  { id: "impact-h-ar", name: "Impact H-AR", category: "assault_rifle", description: "Heavy assault rifle with reinforced frame and high-caliber firing system.", firepower: "28.8", accuracy: "48.5", handling: "41", range: "60M", magazine: "18", zoom: "1.2X", ammoType: "Heavy Rounds", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/9/9a/Impact_HAR.png/revision/latest?cb=20260109230121", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/Impact_H-AR" },
  { id: "m77-assault-rifle", name: "M77 Assault Rifle", category: "assault_rifle", description: "Press: Toggle the built-in flip scope for high precision.", firepower: "24.0", accuracy: "59.3", handling: "38", range: "46M", magazine: "24", zoom: "1.2X", ammoType: "Light Rounds", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/1/1f/M77_Assault_Rifle.png/revision/latest?cb=20260109230157", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/M77_Assault_Rifle" },
  { id: "overrun-ar", name: "Overrun AR", category: "assault_rifle", description: "Light assault rifle with high rate of fire.", firepower: "14.7", accuracy: "50.3", handling: "46", range: "40M", magazine: "20", zoom: "1.2X", ammoType: "Light Rounds", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/0/0f/Overrun_AR.png/revision/latest?cb=20260109230225", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/Overrun_AR" },
  { id: "v75-scar", name: "V75 SCAR", category: "assault_rifle", description: "Volt-actuated assault rifle with tracking projectiles. Sustained fire overheats the weapon, lowering its rate of fire.", firepower: "20.3", accuracy: "59.3", handling: "42", range: "46M", magazine: "2.5%", zoom: "1.2X", ammoType: "Volt Battery", special: "Tracking projectiles; overheats with sustained fire", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/e/e3/V75_SCAR.png/revision/latest?cb=20260109230300", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/V75_SCAR" },
  // Machine Guns
  { id: "conquest-lmg", name: "Conquest LMG", category: "machine_gun", description: "Light machine gun with ramping rate of fire. Stability is increased while firing from crouched position.", firepower: "24.0", accuracy: "49.9", handling: "22", range: "60M", magazine: "36", zoom: "1.2X", ammoType: "Light Rounds", special: "Ramping rate of fire; increased stability crouched", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/1/1d/Conquest_LMG.png/revision/latest?cb=20260109230405", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/Conquest_LMG" },
  { id: "demolition-hmg", name: "Demolition HMG", category: "machine_gun", description: "Heavy machine gun with moderate rate of fire.", firepower: "45.8", accuracy: "63.8", handling: "31", range: "65M", magazine: "20", zoom: "1.2X", ammoType: "Heavy Rounds", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/3/39/Demolition_HMG.png/revision/latest?cb=20260109230436", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/Demolition_HMG" },
  { id: "retaliator-lmg", name: "Retaliator LMG", category: "machine_gun", description: "Belt-fed light machine gun with high rate of fire.", firepower: "16.4", accuracy: "49.8", handling: "25", range: "51M", magazine: "44", zoom: "1.2X", ammoType: "Light Rounds", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/a/a1/Retaliator_LMG.png/revision/latest?cb=20260109230426", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/Retaliator_LMG" },
  // Precision Rifles
  { id: "br33-volley-rifle", name: "BR33 Volley Rifle", category: "precision_rifle", description: "Semiautomatic precision rifle with three-round burst fire.", firepower: "20.7", accuracy: "61.2", handling: "45", range: "48M", magazine: "27", zoom: "1.4X", ammoType: "Light Rounds", special: "Three-round burst", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/1/1f/B33_Volley_Rifle.png/revision/latest?cb=20260109230511", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/BR33_Volley_Rifle" },
  { id: "hardline-pr", name: "Hardline PR", category: "precision_rifle", description: "Single-round semiautomatic precision rifle with high rate of fire.", firepower: "36.8", accuracy: "66.9", handling: "36", range: "74M", magazine: "14", zoom: "1.2X", ammoType: "Heavy Rounds", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/d/de/Hardline_PR.png/revision/latest?cb=20260109230535", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/Hardline_PR" },
  { id: "repeater-hpr", name: "Repeater HPR", category: "precision_rifle", description: "Lever-action heavy precision rifle. Reloads one round at a time.", firepower: "79.8", accuracy: "60.4", handling: "52", range: "37M", magazine: "9", zoom: "1.2X", ammoType: "Heavy Rounds", special: "Lever-action; one-round-at-a-time reload", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/b/b9/Repeater_HPR.png/revision/latest?cb=20260109230541", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/Repeater_HPR" },
  { id: "stryder-m1t", name: "Stryder M1T", category: "precision_rifle", description: "Fine-tuned semiautomatic precision rifle.", firepower: "46.5", accuracy: "59.4", handling: "39", range: "84M", magazine: "12", zoom: "1.4X", ammoType: "Light Rounds", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/3/33/Stryder_M1T.png/revision/latest?cb=20260109230548", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/Stryder_M1T" },
  { id: "twin-tap-hbr", name: "Twin Tap HBR", category: "precision_rifle", description: "Burst-fire heavy ballistic precision rifle with dual-round delivery system.", firepower: "28.9", accuracy: "59.8", handling: "51", range: "48M", magazine: "20", zoom: "1.4X", ammoType: "Light Rounds", special: "Dual-round burst fire", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/3/33/Twin_Tap_HBR.png/revision/latest?cb=20260109230554", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/Twin_Tap_HBR" },
  { id: "v66-lookout", name: "V66 Lookout", category: "precision_rifle", description: "Volt-actuated precision rifle with tracking projectiles. Sustained fire overheats the weapon, lowering its rate of fire.", firepower: "46.8", accuracy: "66.0", handling: "46", range: "88M", magazine: "3.4%", zoom: "1.4X", ammoType: "Volt Battery", special: "Tracking projectiles; overheats with sustained fire", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/c/c9/V66_Lookout.png/revision/latest?cb=20260109230601", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/V66_Lookout" },
  // Pistols
  { id: "ce-tactical-sidearm", name: "CE Tactical Sidearm", category: "pistol", description: "Light ballistics pistol with standard semiautomatic fire.", firepower: "36.0", accuracy: "56.3", handling: "59", range: "26M", magazine: "18", zoom: "1.1X", ammoType: "Light Rounds", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/c/c6/CE_Tactical_Sidearm.png/revision/latest?cb=20260109230903", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/CE_Tactical_Sidearm" },
  { id: "magnum-mc", name: "Magnum MC", category: "pistol", description: "Heavy pistol equipped with modular muzzle and optics rail.", firepower: "66.0", accuracy: "54.8", handling: "40", range: "21M", magazine: "12", zoom: "1.4X", ammoType: "Heavy Rounds", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/e/e1/Magnum_MC.png/revision/latest?cb=20260109230914", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/Magnum_MC" },
  { id: "v11-punch", name: "V11 Punch", category: "pistol", description: "Tap for semiautomatic fire or hold to build and release a high-damage burst.", firepower: "37.5", accuracy: "36.0", handling: "49", range: "21M", magazine: "4.5%", zoom: "1.1X", ammoType: "Volt Battery", special: "Charge-up burst fire mode", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/2/2b/V11_Punch.png/revision/latest?cb=20260109230924", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/V11_Punch" },
  // Railguns
  { id: "ares-rg", name: "ARES RG", category: "railgun", description: "Heavy ballistic railgun. Charges up to fire massive projectile at extreme velocity.", firepower: "159.9", accuracy: "100.0", handling: "47", range: "55M", magazine: "4", zoom: "2.5X", ammoType: "MIPS Rounds", special: "Charge-up mechanic", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/c/ca/ARES_RG.png/revision/latest?cb=20260109232148", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/ARES_RG" },
  { id: "v00-zeus-rg", name: "V00 ZEUS RG", category: "railgun", description: "Anti-materiel railgun. Fires automatically once fully charged.", firepower: "150.0", accuracy: "74.8", handling: "47", range: "55M", magazine: "50%", zoom: "2.0X", ammoType: "Volt Cells", special: "Auto-fires when fully charged", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/f/fd/V00_ZEUS_RG.png/revision/latest?cb=20260109232155", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/V00_ZEUS_RG" },
  // Shotguns
  { id: "misriah-2442", name: "Misriah 2442", category: "shotgun", description: "Pump-action shotgun kept for close encounters. Reloads one MIPS cartridge at a time.", firepower: "168.0", accuracy: "54", handling: "", range: "11M", magazine: "4", zoom: "1.1X", ammoType: "MIPS Rounds", special: "Pump-action; one-at-a-time reload", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/1/13/Misriah_2442.png/revision/latest?cb=20260109232306", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/Misriah_2442" },
  { id: "v85-circuit-breaker", name: "V85 Circuit Breaker", category: "shotgun", description: "Fixed-pattern heavy volt shotgun. Can be charged up to three levels.", firepower: "220.0", accuracy: "42", handling: "", range: "14M", magazine: "", zoom: "1.1X", ammoType: "Volt Cells", special: "Three-level charge mechanic", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/c/cb/V85_Circuit_Breaker.png/revision/latest?cb=20260109232357", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/V85_Circuit_Breaker" },
  { id: "wstr-combat-shotgun", name: "WSTR Combat Shotgun", category: "shotgun", description: "Ballistic double-barrel shotgun. Packs high damage in close quarters.", firepower: "172.5", accuracy: "49", handling: "", range: "4M", magazine: "2", zoom: "1.1X", ammoType: "MIPS Rounds", special: "Double-barrel", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/6/62/WSTR_Combat_Shotgun.png/revision/latest?cb=20260109232414", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/WSTR_Combat_Shotgun" },
  // Sniper Rifles
  { id: "longshot", name: "Longshot", category: "sniper_rifle", description: "Ballistic semiautomatic sniper rifle. High damage, high customization.", firepower: "63.8", accuracy: "81.0", handling: "15", range: "175M", magazine: "3", zoom: "4.0X", ammoType: "MIPS Rounds", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/e/e7/Longshot.png/revision/latest?cb=20260109232611", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/Longshot" },
  { id: "outland", name: "Outland", category: "sniper_rifle", description: "Ballistic bolt-action sniper rifle. Extreme damage and range.", firepower: "", accuracy: "", handling: "", range: "", magazine: "", zoom: "", ammoType: "MIPS Rounds", special: "Bolt-action; extreme damage and range", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/5/58/Outland.png/revision/latest?cb=20260109232632", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/Outland" },
  { id: "v99-channel-rifle", name: "V99 Channel Rifle", category: "sniper_rifle", description: "Powerful volt sniper rifle that charges up for increased damage while scoped. Hits almost instantly at long range.", firepower: "120.0", accuracy: "71.2", handling: "29", range: "175M", magazine: "29%", zoom: "4.0X", ammoType: "Volt Cells", special: "Charge-up while scoped; near-instant travel time", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/4/46/V99_Channel_Rifle.png/revision/latest?cb=20260109232648", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/V99_Channel_Rifle" },
  // SMGs
  { id: "bully-smg", name: "Bully SMG", category: "smg", description: "Heavy ballistic submachine gun with brutal reputation.", firepower: "22.5", accuracy: "62.0", handling: "47", range: "18M", magazine: "23", zoom: "1.1X", ammoType: "Heavy Rounds", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/1/14/Bully_SMG.png/revision/latest?cb=20260109232810", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/Bully_SMG" },
  { id: "brrt-smg", name: "BRRT SMG", category: "smg", description: "Compact submachine gun with five-round burst firing mechanism.", firepower: "15.4", accuracy: "60.5", handling: "35", range: "27M", magazine: "35", zoom: "1.1X", ammoType: "Light Rounds", special: "Five-round burst", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/d/d9/BRRT_SMG.png/revision/latest?cb=20260109232819", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/BRRT_SMG" },
  { id: "copperhead-rf", name: "Copperhead RF", category: "smg", description: "Light submachine gun with rapid fire capability.", firepower: "16.8", accuracy: "49.1", handling: "46", range: "15M", magazine: "21", zoom: "1.1X", ammoType: "Light Rounds", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/4/42/Copperhead_RF.png/revision/latest?cb=20260109232826", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/Copperhead_RF" },
  { id: "v22-volt-thrower", name: "V22 Volt Thrower", category: "smg", description: "Ion-actuated submachine gun with smart lock-on system.", firepower: "18.0", accuracy: "74.1", handling: "43", range: "21M", magazine: "1.6%", zoom: "1.4X", ammoType: "Volt Battery", special: "Smart lock-on system", imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/c/c0/V22_Volt_Thrower.png/revision/latest?cb=20260109232946", wikiUrl: "https://marathonthegame.fandom.com/wiki/Weapons/V22_Volt_Thrower" },
];

export const ammoTypes: { value: AmmoType; label: string }[] = [
  { value: "Light Rounds", label: "Light Rounds" },
  { value: "Heavy Rounds", label: "Heavy Rounds" },
  { value: "MIPS Rounds", label: "MIPS Rounds" },
  { value: "Volt Battery", label: "Volt Battery" },
  { value: "Volt Cells", label: "Volt Cells" },
];