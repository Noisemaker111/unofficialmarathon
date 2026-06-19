import type { ItemType, Rarity } from "@/data/types";

interface ItemSeed {
  id: string;
  name: string;
  type: ItemType;
  description: string;
  rarity?: Rarity;
  value?: number;
  zone?: string;
  location?: string;
  unlocks?: string;
}

export const extendedItems: ItemSeed[] = [
  // More backpacks
  { id: "8xs-med-pack", name: "8XS Med Pack", type: "backpack", description: "+8 slots. Faster health and shield consumable usage.", rarity: "enhanced" },
  { id: "16xs-ammo-backpack", name: "16XS Ammo Backpack", type: "backpack", description: "+16 slots. Stowed weapons reload from inventory over time.", rarity: "enhanced" },
  { id: "24xs-base-pack", name: "24XS Base Pack", type: "backpack", description: "+24 slots.", rarity: "superior" },
  { id: "24xs-sneak-pack-plus", name: "24XS Sneak Pack+", type: "backpack", description: "+24 slots. Invisibility when opening containers.", rarity: "superior" },
  { id: "32xl-sneakpack", name: "32XL Sneakpack++", type: "backpack", description: "+32 slots. Invisibility when opening containers and doors.", rarity: "prestige" },

  // More consumables
  { id: "medium-med-kit", name: "Medium Med Kit", type: "consumable", description: "Restores a moderate amount of health.", rarity: "enhanced" },
  { id: "large-med-kit", name: "Large Med Kit", type: "consumable", description: "Restores a large amount of health.", rarity: "deluxe" },
  { id: "advanced-patch-kit", name: "Advanced Patch Kit", type: "consumable", description: "Restores a large amount of health.", rarity: "deluxe" },
  { id: "advanced-shield-charge", name: "Advanced Shield Charge", type: "consumable", description: "Quickly recharges shields to full.", rarity: "deluxe" },
  { id: "shield-booster", name: "Shield Booster", type: "consumable", description: "Boosts shield recharge rate.", rarity: "enhanced" },
  { id: "advanced-mechanics-kit", name: "Advanced Mechanics Kit", type: "consumable", description: "Removes mechanical hazards and maximizes Hardware.", rarity: "deluxe" },
  { id: "advanced-os-debug", name: "Advanced OS Debug", type: "consumable", description: "Removes OS hazards and maximizes Firewall.", rarity: "deluxe" },
  { id: "advanced-os-reboot", name: "Advanced OS Reboot", type: "consumable", description: "Clears operating system debuffs.", rarity: "deluxe" },
  { id: "hec", name: "HEC", type: "consumable", description: "High-efficiency combat stim.", rarity: "superior" },
  { id: "os-reboot", name: "OS Reboot", type: "consumable", description: "Reboots operating system status.", rarity: "standard" },

  // More equipment
  { id: "chem-grenade", name: "Chem Grenade", type: "equipment", description: "Sprays caustic liquid across surfaces.", rarity: "deluxe" },
  { id: "heat-grenade", name: "Heat Grenade", type: "equipment", description: "Expanding wave of searing heat.", rarity: "deluxe" },
  { id: "flechette-grenade", name: "Flechette Grenade", type: "equipment", description: "Self-guided needles that heal on hit.", rarity: "superior" },
  { id: "trap-pack", name: "Trap Pack", type: "equipment", description: "Explodes when hostiles search it.", rarity: "deluxe" },
  { id: "enhanced-ammo-crate", name: "Enhanced Ammo Crate", type: "equipment", description: "Deployable ammo container.", rarity: "enhanced" },
  { id: "ammo-crate", name: "Ammo Crate", type: "equipment", description: "Small deployable ammo cache.", rarity: "standard" },

  // More keys
  { id: "greenhouse-lab", name: "Greenhouse Lab", type: "key", description: "Unlocks greenhouse laboratory.", zone: "Dire Marsh", location: "Greenhouse", unlocks: "Lab access", rarity: "superior" },
  { id: "north-relay-storage", name: "North Relay Storage", type: "key", description: "Unlocks relay storage rooms.", zone: "Perimeter", location: "North Relay", unlocks: "Storage rooms" },
  { id: "durandal-snippet", name: "Durandal Snippet", type: "key", description: "Generates a random key template upon exfil.", rarity: "contraband" },
  { id: "marathon-c03", name: "Marathon C.03", type: "key", description: "Encrypted key data for Cryo Archive.", zone: "Cryo Archive", rarity: "contraband" },
  { id: "marathon-c06", name: "Marathon C.06", type: "key", description: "Encrypted key data for Cryo Archive.", zone: "Cryo Archive", rarity: "contraband" },

  // Salvage catalog
  { id: "amygdala-drive", name: "Amygdala Drive", type: "salvage", description: "Storage drive mimicking biological memory." },
  { id: "anomalous-wire", name: "Anomalous Wire", type: "salvage", description: "Wire exposed to Tau Ceti IV anomalies." },
  { id: "biomata-node", name: "Biomata Node", type: "salvage", description: "Cybernetic node from a biomata." },
  { id: "biomata-resin", name: "Biomata Resin", type: "salvage", description: "Powerful flesh-to-synthetic adhesive." },
  { id: "cetinite-rods", name: "Cetinite Rods", type: "salvage", description: "Rods smelted from strange Tau Ceti alloy." },
  { id: "deimosite-rods", name: "Deimosite Rods", type: "salvage", description: "Rods mined from Deimos." },
  { id: "drone-node", name: "Drone Node", type: "salvage", description: "Digital node from an autonomous drone." },
  { id: "fractal-circuit", name: "Fractal Circuit", type: "salvage", description: "Processor with exponential speed gains." },
  { id: "neural-insulation", name: "Neural Insulation", type: "salvage", description: "Insulation for neural transfer processes." },
  { id: "predictive-framework", name: "Predictive Framework", type: "salvage", description: "Wiring that anticipates inputs." },
  { id: "reflex-coil", name: "Reflex Coil", type: "salvage", description: "Myelin-coated filament spool." },
  { id: "sparkleaf", name: "Sparkleaf", type: "salvage", description: "High-silica plant resource." },
  { id: "storage-drive", name: "Storage Drive", type: "salvage", description: "Colony-era data storage." },
  { id: "tachyon-filament", name: "Tachyon Filament", type: "salvage", description: "Self-arranging filament material." },
  { id: "unstable-biomass", name: "Unstable Biomass", type: "salvage", description: "Molecularly destabilised biomass sample." },
  { id: "unstable-diode", name: "Unstable Diode", type: "salvage", description: "Molecularly destabilised diode." },
  { id: "unstable-gel", name: "Unstable Gel", type: "salvage", description: "Destabilised resorcinol formaldehyde gel." },
  { id: "unstable-gunmetal", name: "Unstable Gunmetal", type: "salvage", description: "Destabilised gunmetal chunk." },
  { id: "unstable-lead", name: "Unstable Lead", type: "salvage", description: "Destabilised lead chunk." },

  // Valuables
  { id: "compiler-trace", name: "Compiler Trace", type: "valuable", description: "Alien fabric worth a great deal.", rarity: "contraband" },
  { id: "cryoprotectant", name: "Cryoprotectant", type: "valuable", description: "Biocompatible cryosleep buffer medium." },
  { id: "damaged-uesc-helmet", name: "Damaged UESC Helmet", type: "valuable", description: "Auto-sold for credits on exfil." },
  { id: "encrypted-communique", name: "Encrypted Communique", type: "valuable", description: "Dark underbelly of idealistic missions.", rarity: "contraband" },
  { id: "strauss-journal", name: "Strauss's Journal", type: "valuable", description: "Private thoughts from Bernard Strauss." },
  { id: "unknown-reverie", name: "Unknown Reverie", type: "valuable", description: "Strange conversation in corrupted code.", rarity: "contraband" },
  { id: "personal-log-kuzmin", name: "Personal Log: Isaak Kuzmin", type: "valuable", description: "Coherent glimpse into colonist life." },
  { id: "personal-log-pike", name: "Personal Log: Pike, U.", type: "valuable", description: "Multi-generational personal logs." },

  // Sponsored kits
  { id: "enhanced-cyberacme-kit", name: "Enhanced CyberAcme Sponsored Kit", type: "sponsored-kit", description: "CyberAcme emergency infil package.", rarity: "enhanced" },
  { id: "enhanced-nucaloric-kit", name: "Enhanced NuCaloric Sponsored Kit", type: "sponsored-kit", description: "NuCaloric emergency infil package.", rarity: "enhanced" },
  { id: "enhanced-sekiguchi-kit", name: "Enhanced Sekiguchi Sponsored Kit", type: "sponsored-kit", description: "Sekiguchi emergency infil package.", rarity: "enhanced" },
  { id: "enhanced-traxus-kit", name: "Enhanced Traxus Sponsored Kit", type: "sponsored-kit", description: "Traxus emergency infil package.", rarity: "enhanced" },
  { id: "deluxe-arachne-kit", name: "Deluxe Arachne Sponsored Kit", type: "sponsored-kit", description: "Deluxe Arachne infil package.", rarity: "deluxe" },
  { id: "deluxe-nucaloric-kit", name: "Deluxe NuCaloric Sponsored Kit", type: "sponsored-kit", description: "Deluxe NuCaloric infil package.", rarity: "deluxe" },

  // Additional contracts
  { id: "lost-contract-sekiguchi", name: "Lost Contract: Sekiguchi", type: "contract", description: "Recovered contract offering Sekiguchi reputation." },
  { id: "lost-contract-nucaloric", name: "Lost Contract: NuCaloric", type: "contract", description: "Recovered contract offering NuCaloric reputation." },
  { id: "lost-contract-arachne", name: "Lost Contract: Arachne", type: "contract", description: "Recovered contract offering Arachne reputation." },
  { id: "lost-contract-mida", name: "Lost Contract: MIDA", type: "contract", description: "Recovered contract offering MIDA reputation." },
  { id: "lost-contract-cyberacme", name: "Lost Contract: CyberAcme", type: "contract", description: "Recovered contract offering CyberAcme reputation." },

  // More salvage
  { id: "bio-gel-sample", name: "Bio-Gel Sample", type: "salvage", description: "Synthetic bio-gel used in shell repair." },
  { id: "capacitor-bank", name: "Capacitor Bank", type: "salvage", description: "Salvaged capacitor array from colony tech." },
  { id: "cryo-cell", name: "Cryo Cell", type: "salvage", description: "Cryogenic storage cell from Marathon archives." },
  { id: "data-shard", name: "Data Shard", type: "salvage", description: "Fragmented data storage from colony systems." },
  { id: "ferrofluid-core", name: "Ferrofluid Core", type: "salvage", description: "Magnetic fluid core for volt systems." },
  { id: "hull-plating", name: "Hull Plating", type: "salvage", description: "Reinforced plating from colony structures." },
  { id: "ionized-filament", name: "Ionized Filament", type: "salvage", description: "Ionized conductive filament spool." },
  { id: "optic-lens", name: "Optic Lens", type: "salvage", description: "Precision optic lens assembly." },
  { id: "polymer-sheet", name: "Polymer Sheet", type: "salvage", description: "Flexible polymer sheeting for repairs." },
  { id: "power-cell", name: "Power Cell", type: "salvage", description: "Standard colony power cell." },
  { id: "servo-motor", name: "Servo Motor", type: "salvage", description: "Compact servo motor from automated systems." },
  { id: "synthetic-fiber", name: "Synthetic Fiber", type: "salvage", description: "High-tensile synthetic fiber bundle." },

  // More valuables
  { id: "colony-charter", name: "Colony Charter", type: "valuable", description: "Original Tau Ceti IV colony founding charter." },
  { id: "durandal-fragment", name: "Durandal Fragment", type: "valuable", description: "Fragment of Durandal AI communication.", rarity: "contraband" },
  { id: "mission-briefing", name: "Classified Mission Briefing", type: "valuable", description: "Classified UESC mission documents.", rarity: "contraband" },
  { id: "runner-blackbox", name: "Runner Blackbox", type: "valuable", description: "Recovered runner shell flight recorder." },
  { id: "strauss-memo", name: "Strauss Memo", type: "valuable", description: "Internal memo from Bernard Strauss." },

  // More keys
  { id: "airfield-hangar-key", name: "Airfield Hangar Key", type: "key", description: "Unlocks eastern hangar caches.", zone: "Outpost", location: "Airfield", unlocks: "Hangar equipment caches" },
  { id: "pinwheel-command-key", name: "Pinwheel Command Key", type: "key", description: "Unlocks Pinwheel secure rooms.", zone: "Outpost", location: "Pinwheel", unlocks: "Command sublevel", rarity: "deluxe" },
  { id: "quarantine-access", name: "Quarantine Access", type: "key", description: "Emergency quarantine sector access.", zone: "Dire Marsh", location: "Quarantine", unlocks: "Quarantine wing" },

  // More consumables
  { id: "hardware-boost", name: "Hardware Boost", type: "consumable", description: "Temporarily maximizes Hardware stat.", rarity: "enhanced" },
  { id: "firewall-boost", name: "Firewall Boost", type: "consumable", description: "Temporarily maximizes Firewall stat.", rarity: "enhanced" },
  { id: "prime-boost", name: "Prime Boost", type: "consumable", description: "Accelerates Prime ability recovery.", rarity: "deluxe" },
  { id: "tactical-boost", name: "Tactical Boost", type: "consumable", description: "Accelerates Tactical ability recovery.", rarity: "deluxe" },

  // Currency
  { id: "silk", name: "SILK", type: "currency", description: "Seasonal currency for the Rewards Pass." },
  { id: "lux", name: "LUX", type: "currency", description: "Premium currency for the in-game store." },

  // More equipment
  { id: "flash-bang", name: "Flash Bang", type: "equipment", description: "Blinds and disorients hostiles in radius.", rarity: "enhanced" },
  { id: "decoy-drone", name: "Decoy Drone", type: "equipment", description: "Deployable decoy that draws hostile fire.", rarity: "superior" },
  { id: "barricade-kit", name: "Barricade Kit", type: "equipment", description: "Deployable hard cover barricade.", rarity: "deluxe" },
  { id: "scanner-drone", name: "Scanner Drone", type: "equipment", description: "Aerial scanner that pings hostiles.", rarity: "superior" },
  { id: "repair-drone", name: "Repair Drone", type: "equipment", description: "Repairs shell damage over time.", rarity: "deluxe" },
  { id: "signal-jammer", name: "Signal Jammer", type: "equipment", description: "Disrupts hostile radar and pings.", rarity: "superior" },
  { id: "thermal-flare", name: "Thermal Flare", type: "equipment", description: "Thermal distraction device.", rarity: "enhanced" },
  { id: "riot-foam", name: "Riot Foam", type: "equipment", description: "Expanding foam that slows hostiles.", rarity: "deluxe" },
];
