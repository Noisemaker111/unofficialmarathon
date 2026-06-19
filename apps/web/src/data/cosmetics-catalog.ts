// Cosmetics catalog generator for Marathon (2026)
// Source: Season 1 Rewards Pass, Season 2 content, in-game store references

import type { Cosmetic, CosmeticSource, CosmeticType } from "@/data/cosmetics";
import type { Rarity } from "@/data/types";
import { runners } from "@/data/runners";
import { weapons } from "@/data/weapons";

const wikiUrl = "https://marathonthegame.fandom.com/wiki/Cosmetics";

const runnerSkinThemes: Record<string, Array<{ name: string; rarity: Rarity; source: CosmeticSource; description: string }>> = {
  assassin: [
    { name: "Achromatic Rush", rarity: "superior", source: "rewards-pass", description: "Season 1 Rewards Pass shell skin." },
    { name: "Shadow Index", rarity: "deluxe", source: "mastery", description: "Complete all Assassin mastery challenges." },
    { name: "Void Operative", rarity: "deluxe", source: "store", description: "In-game store shell skin." },
    { name: "Smoke Veil", rarity: "enhanced", source: "store", description: "Enhanced Assassin shell variant." },
    { name: "Night Glass", rarity: "deluxe", source: "event", description: "Limited event shell skin." },
    { name: "Ghost Protocol", rarity: "prestige", source: "ranked", description: "Ranked milestone reward." },
    { name: "Eclipse", rarity: "superior", source: "store", description: "Superior Assassin shell skin." },
    { name: "Onyx", rarity: "deluxe", source: "pre-order", description: "Pre-order bonus shell skin." },
    { name: "Specter", rarity: "enhanced", source: "free", description: "Default enhanced variant." },
    { name: "Wraith", rarity: "superior", source: "codex", description: "Codex challenge reward." },
    { name: "Null Set", rarity: "deluxe", source: "faction", description: "Sekiguchi faction reward." },
    { name: "Phase Shift", rarity: "prestige", source: "store", description: "Premium store shell skin." },
  ],
  destroyer: [
    { name: "Jagged Purpose", rarity: "superior", source: "rewards-pass", description: "Season 1 Rewards Pass shell skin." },
    { name: "Siege Frame", rarity: "deluxe", source: "mastery", description: "Destroyer mastery reward." },
    { name: "Barrage", rarity: "enhanced", source: "store", description: "Enhanced Destroyer shell." },
    { name: "Ironclad", rarity: "deluxe", source: "store", description: "Deluxe Destroyer shell skin." },
    { name: "Warpath", rarity: "superior", source: "ranked", description: "Ranked reward shell skin." },
    { name: "Breach", rarity: "deluxe", source: "event", description: "Event-exclusive shell." },
    { name: "Overwatch", rarity: "enhanced", source: "free", description: "Free enhanced variant." },
    { name: "Rampart", rarity: "prestige", source: "store", description: "Prestige Destroyer shell." },
    { name: "Bastion", rarity: "superior", source: "codex", description: "Codex challenge shell." },
    { name: "Payload", rarity: "deluxe", source: "faction", description: "Traxus faction shell." },
    { name: "Aegis", rarity: "enhanced", source: "store", description: "Store shell variant." },
    { name: "Colossus", rarity: "prestige", source: "rewards-pass", description: "Late pass reward shell." },
  ],
  vandal: [
    { name: "Satiated Bliss", rarity: "superior", source: "rewards-pass", description: "Season 1 Rewards Pass shell skin." },
    { name: "Glitch Runner", rarity: "deluxe", source: "mastery", description: "Vandal mastery reward." },
    { name: "Overclock", rarity: "enhanced", source: "store", description: "Enhanced Vandal shell." },
    { name: "Velocity", rarity: "deluxe", source: "store", description: "Deluxe Vandal shell skin." },
    { name: "Afterburn", rarity: "superior", source: "ranked", description: "Ranked shell reward." },
    { name: "Jetstream", rarity: "deluxe", source: "event", description: "Event shell skin." },
    { name: "Rogue", rarity: "enhanced", source: "free", description: "Free enhanced variant." },
    { name: "Hyperdrive", rarity: "prestige", source: "store", description: "Prestige Vandal shell." },
    { name: "Slipstream", rarity: "superior", source: "codex", description: "Codex shell reward." },
    { name: "Anarchy", rarity: "deluxe", source: "faction", description: "MIDA faction shell." },
    { name: "Surge", rarity: "enhanced", source: "store", description: "Store shell variant." },
    { name: "Terminal Velocity", rarity: "prestige", source: "rewards-pass", description: "Late pass reward." },
  ],
  triage: [
    { name: "Overcast Classic", rarity: "superior", source: "rewards-pass", description: "Season 1 Rewards Pass shell skin." },
    { name: "Field Medic", rarity: "deluxe", source: "mastery", description: "Triage mastery reward." },
    { name: "Rescue", rarity: "enhanced", source: "store", description: "Enhanced Triage shell." },
    { name: "Lifeline", rarity: "deluxe", source: "store", description: "Deluxe Triage shell skin." },
    { name: "Triage Unit", rarity: "superior", source: "ranked", description: "Ranked shell reward." },
    { name: "Sterile", rarity: "deluxe", source: "event", description: "Event shell skin." },
    { name: "Aid", rarity: "enhanced", source: "free", description: "Free enhanced variant." },
    { name: "Vital Signs", rarity: "prestige", source: "store", description: "Prestige Triage shell." },
    { name: "Pulse", rarity: "superior", source: "codex", description: "Codex shell reward." },
    { name: "Sanctuary", rarity: "deluxe", source: "faction", description: "NuCaloric faction shell." },
    { name: "Recovery", rarity: "enhanced", source: "store", description: "Store shell variant." },
    { name: "White Coat", rarity: "prestige", source: "rewards-pass", description: "Late pass reward." },
  ],
  recon: [
    { name: "Midnight Illuminator", rarity: "superior", source: "rewards-pass", description: "Season 1 Rewards Pass shell skin." },
    { name: "Long Range", rarity: "deluxe", source: "mastery", description: "Recon mastery reward." },
    { name: "Spotter", rarity: "enhanced", source: "store", description: "Enhanced Recon shell." },
    { name: "Scout", rarity: "deluxe", source: "store", description: "Deluxe Recon shell skin." },
    { name: "Observer", rarity: "superior", source: "ranked", description: "Ranked shell reward." },
    { name: "Horizon", rarity: "deluxe", source: "event", description: "Event shell skin." },
    { name: "Beacon", rarity: "enhanced", source: "free", description: "Free enhanced variant." },
    { name: "Oracle", rarity: "prestige", source: "store", description: "Prestige Recon shell." },
    { name: "Watchtower", rarity: "superior", source: "codex", description: "Codex shell reward." },
    { name: "Signal", rarity: "deluxe", source: "faction", description: "CyberAcme faction shell." },
    { name: "Ping", rarity: "enhanced", source: "store", description: "Store shell variant." },
    { name: "Far Sight", rarity: "prestige", source: "rewards-pass", description: "Late pass reward." },
  ],
  thief: [
    { name: "Achromatic Smack", rarity: "superior", source: "rewards-pass", description: "Season 1 Rewards Pass shell skin." },
    { name: "Heist", rarity: "deluxe", source: "mastery", description: "Thief mastery reward." },
    { name: "Pickpocket", rarity: "enhanced", source: "store", description: "Enhanced Thief shell." },
    { name: "Larceny", rarity: "deluxe", source: "store", description: "Deluxe Thief shell skin." },
    { name: "Shadow Lift", rarity: "superior", source: "ranked", description: "Ranked shell reward." },
    { name: "Smuggler", rarity: "deluxe", source: "event", description: "Event shell skin." },
    { name: "Rogue Agent", rarity: "enhanced", source: "free", description: "Free enhanced variant." },
    { name: "Black Market", rarity: "prestige", source: "store", description: "Prestige Thief shell." },
    { name: "Fence", rarity: "superior", source: "codex", description: "Codex shell reward." },
    { name: "Contraband", rarity: "deluxe", source: "faction", description: "Arachne faction shell." },
    { name: "Swipe", rarity: "enhanced", source: "store", description: "Store shell variant." },
    { name: "Grand Heist", rarity: "prestige", source: "rewards-pass", description: "Late pass reward." },
  ],
  rook: [
    { name: "Scavenger Standard", rarity: "standard", source: "free", description: "Default Rook shell appearance." },
    { name: "Rust Bucket", rarity: "enhanced", source: "store", description: "Enhanced Rook shell." },
    { name: "Salvage King", rarity: "deluxe", source: "codex", description: "Codex challenge shell." },
    { name: "Junkyard", rarity: "enhanced", source: "store", description: "Store Rook variant." },
    { name: "Scrap Heap", rarity: "deluxe", source: "event", description: "Event Rook shell." },
    { name: "Patchwork", rarity: "superior", source: "mastery", description: "Rook mastery reward." },
    { name: "Wreckage", rarity: "deluxe", source: "faction", description: "Faction reward shell." },
    { name: "Hoarder", rarity: "enhanced", source: "free", description: "Free enhanced variant." },
  ],
  sentinel: [
    { name: "Retro Remix", rarity: "superior", source: "store", description: "Store Sentinel shell skin — 1,100 LUX." },
    { name: "Shadow Index", rarity: "deluxe", source: "mastery", description: "Complete all Sentinel mastery challenges." },
    { name: "Syntax Disrupt", rarity: "deluxe", source: "faction", description: "Exfil with CyberAcme sponsored kit." },
    { name: "Fineline-XS", rarity: "deluxe", source: "faction", description: "Exfil with Sekiguchi sponsored kit." },
    { name: "Refresh_Resist", rarity: "deluxe", source: "faction", description: "Exfil with MIDA sponsored kit." },
    { name: "Expiration Matrix", rarity: "deluxe", source: "faction", description: "Exfil with NuCaloric sponsored kit." },
    { name: "Anti-Caution", rarity: "deluxe", source: "faction", description: "Exfil with Traxus sponsored kit." },
    { name: "The Severed", rarity: "deluxe", source: "faction", description: "Exfil with Arachne sponsored kit." },
    { name: "Hardpoint", rarity: "enhanced", source: "free", description: "Default Season 2 Sentinel shell." },
    { name: "Bastion Prime", rarity: "superior", source: "rewards-pass", description: "Season 2 Rewards Pass shell." },
    { name: "Castle Doctrine", rarity: "prestige", source: "ranked", description: "Ranked Sentinel shell reward." },
    { name: "Defender", rarity: "deluxe", source: "codex", description: "Sentinel codex challenge reward." },
  ],
};

const weaponSkinThemes = [
  { name: "Achromatic Rush", rarity: "superior" as Rarity, source: "rewards-pass" as CosmeticSource },
  { name: "Schema", rarity: "enhanced" as Rarity, source: "rewards-pass" as CosmeticSource },
  { name: "Deluxe Schema", rarity: "deluxe" as Rarity, source: "rewards-pass" as CosmeticSource },
  { name: "Carbon", rarity: "enhanced" as Rarity, source: "store" as CosmeticSource },
  { name: "Chrome", rarity: "deluxe" as Rarity, source: "store" as CosmeticSource },
  { name: "Colony Issue", rarity: "standard" as Rarity, source: "free" as CosmeticSource },
];

const emblems: Array<{ name: string; rarity: Rarity; source: CosmeticSource; description: string }> = [
  { name: "Checkmate Standard", rarity: "deluxe", source: "codex", description: "Sentinel orientation codex reward." },
  { name: "Achromatic Rush", rarity: "superior", source: "rewards-pass", description: "Season 1 Rewards Pass emblem." },
  { name: "Death Is Only the First Step", rarity: "deluxe", source: "rewards-pass", description: "Season 1 title emblem." },
  { name: "Tau Ceti IV", rarity: "enhanced", source: "free", description: "Default colony emblem." },
  { name: "UESC Marathon", rarity: "deluxe", source: "codex", description: "UESC Marathon codex emblem." },
  { name: "Extraction Complete", rarity: "enhanced", source: "free", description: "Complete your first exfil." },
  { name: "Runner Down", rarity: "enhanced", source: "free", description: "First hostile runner elimination." },
  { name: "Lockdown", rarity: "superior", source: "event", description: "UESC Lockdown event emblem." },
  { name: "Convoy", rarity: "superior", source: "event", description: "UESC Convoy event emblem." },
  { name: "Nightfall", rarity: "deluxe", source: "rewards-pass", description: "Season 2 Rewards Pass emblem." },
  { name: "Sentinel", rarity: "deluxe", source: "codex", description: "Sentinel shell codex emblem." },
  { name: "Sekiguchi", rarity: "enhanced", source: "faction", description: "Sekiguchi Genetics emblem." },
  { name: "Traxus", rarity: "enhanced", source: "faction", description: "Traxus emblem." },
  { name: "NuCaloric", rarity: "enhanced", source: "faction", description: "NuCaloric emblem." },
  { name: "CyberAcme", rarity: "enhanced", source: "faction", description: "CyberAcme emblem." },
  { name: "Arachne", rarity: "enhanced", source: "faction", description: "Arachne emblem." },
  { name: "MIDA", rarity: "enhanced", source: "faction", description: "MIDA emblem." },
  { name: "Ranked I", rarity: "enhanced", source: "ranked", description: "Ranked mode tier I emblem." },
  { name: "Ranked II", rarity: "deluxe", source: "ranked", description: "Ranked mode tier II emblem." },
  { name: "Ranked III", rarity: "superior", source: "ranked", description: "Ranked mode tier III emblem." },
  { name: "Ranked IV", rarity: "prestige", source: "ranked", description: "Ranked mode tier IV emblem." },
  { name: "Server Slam", rarity: "deluxe", source: "event", description: "Server Slam beta participant emblem." },
  { name: "Founder", rarity: "prestige", source: "pre-order", description: "Pre-order founder emblem." },
  { name: "Deluxe Edition", rarity: "superior", source: "pre-order", description: "Deluxe edition emblem." },
  { name: "Ghost Signal", rarity: "deluxe", source: "store", description: "Store emblem." },
  { name: "Compiler", rarity: "superior", source: "codex", description: "Compiler codex emblem." },
  { name: "Cryo Vault", rarity: "deluxe", source: "codex", description: "Cryo Archive codex emblem." },
  { name: "Perimeter", rarity: "enhanced", source: "codex", description: "Perimeter zone codex emblem." },
  { name: "Dire Marsh", rarity: "enhanced", source: "codex", description: "Dire Marsh zone codex emblem." },
  { name: "Outpost", rarity: "enhanced", source: "codex", description: "Outpost zone codex emblem." },
  { name: "First Blood", rarity: "standard", source: "free", description: "First elimination emblem." },
  { name: "Clean Exfil", rarity: "enhanced", source: "free", description: "Exfil with full backpack." },
  { name: "Contraband Runner", rarity: "prestige", source: "codex", description: "Contraband codex emblem." },
  { name: "Night Marsh", rarity: "deluxe", source: "rewards-pass", description: "Season 2 Night Marsh emblem." },
];

const charms: Array<{ name: string; rarity: Rarity; source: CosmeticSource; description: string }> = [
  { name: "Marathon Ship", rarity: "deluxe", source: "pre-order", description: "UESC Marathon ship charm." },
  { name: "Durandal Chip", rarity: "superior", source: "codex", description: "AI subroutine charm." },
  { name: "Tau Ceti Star", rarity: "enhanced", source: "store", description: "Tau Ceti system charm." },
  { name: "Runner Tag", rarity: "standard", source: "free", description: "Default runner identification charm." },
  { name: "Exfil Beacon", rarity: "deluxe", source: "rewards-pass", description: "Rewards Pass charm." },
  { name: "Compiler Fragment", rarity: "prestige", source: "event", description: "Limited event charm." },
  { name: "S'pht Core", rarity: "superior", source: "codex", description: "S'pht technology charm." },
];

const backgrounds: Array<{ name: string; rarity: Rarity; source: CosmeticSource; description: string }> = [
  { name: "Defensive POV", rarity: "deluxe", source: "codex", description: "Sentinel prime ability codex background." },
  { name: "Tau Ceti Horizon", rarity: "enhanced", source: "free", description: "Default profile background." },
  { name: "UESC Marathon Interior", rarity: "deluxe", source: "store", description: "Marathon ship interior background." },
  { name: "Perimeter Dawn", rarity: "enhanced", source: "codex", description: "Perimeter zone background." },
  { name: "Dire Marsh Fog", rarity: "enhanced", source: "codex", description: "Dire Marsh zone background." },
  { name: "Outpost Airfield", rarity: "enhanced", source: "codex", description: "Outpost zone background." },
  { name: "Cryo Archive Vault", rarity: "deluxe", source: "codex", description: "Cryo Archive background." },
  { name: "Night Marsh", rarity: "superior", source: "rewards-pass", description: "Season 2 map background." },
  { name: "Achromatic Rush", rarity: "superior", source: "rewards-pass", description: "Season 1 pass background." },
  { name: "Lockdown Alert", rarity: "deluxe", source: "event", description: "UESC Lockdown event background." },
  { name: "Convoy Route", rarity: "deluxe", source: "event", description: "UESC Convoy event background." },
  { name: "Compiler Nest", rarity: "superior", source: "codex", description: "Compiler encounter background." },
  { name: "Ghost Signal", rarity: "deluxe", source: "store", description: "Store profile background." },
  { name: "Ranked Arena", rarity: "superior", source: "ranked", description: "Ranked mode background." },
  { name: "Server Slam", rarity: "deluxe", source: "event", description: "Beta event background." },
  { name: "Founder", rarity: "prestige", source: "pre-order", description: "Pre-order founder background." },
  { name: "Sekiguchi Lab", rarity: "enhanced", source: "faction", description: "Sekiguchi faction background." },
  { name: "Traxus HQ", rarity: "enhanced", source: "faction", description: "Traxus faction background." },
  { name: "NuCaloric Greenhouse", rarity: "enhanced", source: "faction", description: "NuCaloric faction background." },
  { name: "CyberAcme Server", rarity: "enhanced", source: "faction", description: "CyberAcme faction background." },
  { name: "Arachne Web", rarity: "enhanced", source: "faction", description: "Arachne faction background." },
  { name: "MIDA Protocol", rarity: "enhanced", source: "faction", description: "MIDA faction background." },
  { name: "Extraction Pad", rarity: "standard", source: "free", description: "Basic exfil pad background." },
  { name: "Storm Front", rarity: "deluxe", source: "store", description: "Weather event background." },
  { name: "Deep Storage", rarity: "superior", source: "codex", description: "Cryo deep storage background." },
  { name: "Relay Station", rarity: "enhanced", source: "codex", description: "Perimeter relay background." },
  { name: "Bio-Research", rarity: "enhanced", source: "codex", description: "Dire Marsh research background." },
  { name: "Pinwheel Command", rarity: "deluxe", source: "codex", description: "Outpost command background." },
  { name: "Marathon Exterior", rarity: "superior", source: "store", description: "Ship exterior vista." },
  { name: "Nightfall", rarity: "deluxe", source: "rewards-pass", description: "Season 2 title background." },
  { name: "Smoke Screen", rarity: "enhanced", source: "store", description: "Assassin-themed background." },
  { name: "Riot Barricade", rarity: "enhanced", source: "store", description: "Destroyer-themed background." },
  { name: "Defender System", rarity: "deluxe", source: "codex", description: "Sentinel ability background." },
  { name: "Active Camo", rarity: "superior", source: "store", description: "Assassin camo background." },
  { name: "Volt Surge", rarity: "deluxe", source: "store", description: "Volt weapons background." },
  { name: "Contraband Cache", rarity: "prestige", source: "codex", description: "Contraband loot background." },
  { name: "Colony Ruins", rarity: "enhanced", source: "free", description: "Tau Ceti ruins background." },
  { name: "First Step", rarity: "deluxe", source: "rewards-pass", description: "Season 1 title screen background." },
];

const stickers: Array<{ name: string; rarity: Rarity; source: CosmeticSource; description: string }> = [
  { name: "UESC Approved", rarity: "standard", source: "free", description: "UESC approval sticker." },
  { name: "Runner Down", rarity: "enhanced", source: "free", description: "Elimination sticker." },
  { name: "Extract or Die", rarity: "deluxe", source: "rewards-pass", description: "Season 1 sticker." },
  { name: "Nightfall", rarity: "deluxe", source: "rewards-pass", description: "Season 2 sticker." },
];

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function generateCosmeticCatalog(): Cosmetic[] {
  const catalog: Cosmetic[] = [];

  for (const runner of runners) {
    const themes = runnerSkinThemes[runner.id] ?? [];
    for (const theme of themes) {
      catalog.push({
        id: `runner-skin-${runner.id}-${slugify(theme.name)}`,
        name: theme.name,
        type: "runner-skin",
        rarity: theme.rarity,
        source: theme.source,
        runnerId: runner.id,
        description: theme.description,
        wikiUrl,
      });
    }
  }

  const playableWeapons = weapons.filter((w) => !w.unique);
  for (const weapon of playableWeapons) {
    for (const theme of weaponSkinThemes) {
      catalog.push({
        id: `weapon-skin-${weapon.id}-${slugify(theme.name)}`,
        name: `${theme.name} ${weapon.name}`,
        type: "weapon-skin",
        rarity: theme.rarity,
        source: theme.source,
        weaponId: weapon.id,
        description: `${theme.name} cosmetic schema for the ${weapon.name}.`,
        wikiUrl,
      });
    }
  }

  for (const emblem of emblems) {
    catalog.push({
      id: `emblem-${slugify(emblem.name)}`,
      name: emblem.name,
      type: "emblem",
      rarity: emblem.rarity,
      source: emblem.source,
      description: emblem.description,
      wikiUrl,
    });
  }

  for (const charm of charms) {
    catalog.push({
      id: `charm-${slugify(charm.name)}`,
      name: charm.name,
      type: "charm",
      rarity: charm.rarity,
      source: charm.source,
      description: charm.description,
      wikiUrl,
    });
  }

  for (const background of backgrounds) {
    catalog.push({
      id: `background-${slugify(background.name)}`,
      name: background.name,
      type: "background",
      rarity: background.rarity,
      source: background.source,
      description: background.description,
      wikiUrl,
    });
  }

  for (const sticker of stickers) {
    catalog.push({
      id: `sticker-${slugify(sticker.name)}`,
      name: sticker.name,
      type: "sticker",
      rarity: sticker.rarity,
      source: sticker.source,
      description: sticker.description,
      wikiUrl,
    });
  }

  return catalog;
}
