// Key and high-value POI data for Marathon map zones
// Source: https://marathonthegame.fandom.com/wiki/Keys

import type { Rarity } from "@/data/types";

export type PoiType = "key" | "extraction" | "lockdown" | "container" | "terminal" | "priority";

export interface MapPoi {
  id: string;
  name: string;
  zoneId: string;
  type: PoiType;
  region: string;
  location: string;
  unlocks?: string;
  rarity?: Rarity;
  notes?: string;
  itemId?: string;
}

export const mapPois: MapPoi[] = [
  // Perimeter
  {
    id: "perimeter-north-relay-storage",
    name: "North Relay Storage",
    zoneId: "perimeter",
    type: "key",
    region: "North Relay",
    location: "Relay storage basement",
    unlocks: "North Relay secured rooms",
    notes: "Removed from inventory on use; room access retained for the run.",
  },
  {
    id: "perimeter-station-lockbox",
    name: "Station Lockbox Key",
    zoneId: "perimeter",
    type: "key",
    region: "Station",
    location: "Central station offices",
    unlocks: "High-value lockboxes",
    rarity: "enhanced",
  },
  {
    id: "perimeter-overflow-cache",
    name: "Overflow Cache",
    zoneId: "perimeter",
    type: "container",
    region: "Overflow",
    location: "Overflow maintenance wing",
    unlocks: "Weapon and mod caches",
    notes: "Strong early-run loot route for new runners.",
  },
  {
    id: "perimeter-north-exfil",
    name: "North Extraction",
    zoneId: "perimeter",
    type: "extraction",
    region: "North Relay",
    location: "Northern platform",
    notes: "Primary exfil for north-side runs.",
  },
  {
    id: "perimeter-south-exfil",
    name: "South Extraction",
    zoneId: "perimeter",
    type: "extraction",
    region: "South Relay",
    location: "Southern platform",
  },

  // Dire Marsh
  {
    id: "dire-marsh-ai-uplink-servers",
    name: "AI Uplink Servers",
    zoneId: "dire-marsh",
    type: "key",
    region: "AI Uplink",
    location: "Basement server hub",
    unlocks: "Subterranean server hub",
    itemId: "ai-uplink-servers",
  },
  {
    id: "dire-marsh-greenhouse-operations",
    name: "Greenhouse Operations",
    zoneId: "dire-marsh",
    type: "key",
    region: "Greenhouse",
    location: "Central tend, rooftop operations",
    unlocks: "Secure research closets",
    itemId: "greenhouse-operations",
  },
  {
    id: "dire-marsh-greenhouse-lab",
    name: "Greenhouse Lab",
    zoneId: "dire-marsh",
    type: "key",
    region: "Greenhouse",
    location: "Upper lab access",
    unlocks: "Greenhouse laboratory",
    rarity: "superior",
  },
  {
    id: "dire-marsh-quarantine-lockdown",
    name: "Quarantine Lockdown",
    zoneId: "dire-marsh",
    type: "lockdown",
    region: "Quarantine",
    location: "Central anomaly sector",
    unlocks: "High-tier contraband and valuables",
    notes: "Active during UESC Lockdown events.",
  },
  {
    id: "dire-marsh-bio-research-terminal",
    name: "Bio-Research Terminal Cluster",
    zoneId: "dire-marsh",
    type: "terminal",
    region: "Bio-Research",
    location: "Research annex",
    unlocks: "Contract and lore terminals",
  },

  // Outpost
  {
    id: "outpost-pinwheel-command",
    name: "Pinwheel Command Access",
    zoneId: "outpost",
    type: "key",
    region: "Pinwheel",
    location: "Command sublevel",
    unlocks: "Pinwheel secure rooms",
    rarity: "deluxe",
  },
  {
    id: "outpost-airfield-hangar",
    name: "Airfield Hangar Cache",
    zoneId: "outpost",
    type: "container",
    region: "Airfield",
    location: "Eastern hangar row",
    unlocks: "Equipment and ammo crates",
  },
  {
    id: "outpost-processing-secured",
    name: "Processing Secured Resources",
    zoneId: "outpost",
    type: "lockdown",
    region: "Processing",
    location: "Refinery lockdown wing",
    unlocks: "Secured resource crates",
    notes: "Spawns during UESC Convoy events.",
  },
  {
    id: "outpost-dormitories-lockbox",
    name: "Dormitories Lockbox Route",
    zoneId: "outpost",
    type: "container",
    region: "Dormitories",
    location: "Officer quarters block",
    unlocks: "Valuables and sponsored kits",
  },
  {
    id: "outpost-airfield-exfil",
    name: "Airfield Extraction",
    zoneId: "outpost",
    type: "extraction",
    region: "Airfield",
    location: "Runway extraction pad",
  },

  // Cryo Archive
  {
    id: "cryo-scrambled-doorkey",
    name: "Cryo Archive Scrambled Doorkey",
    zoneId: "cryo-archive",
    type: "key",
    region: "Cold Storage",
    location: "Encrypted door network",
    unlocks: "Locked rooms aboard the Marathon",
    rarity: "contraband",
    itemId: "cryo-archive-scrambled-doorkey",
    notes: "Exfil with this item to create a key for each crew member.",
  },
  {
    id: "cryo-master-clearance",
    name: "Master Clearance Code",
    zoneId: "cryo-archive",
    type: "key",
    region: "Control",
    location: "Security command",
    unlocks: "Valuable chests and exfil sites",
    rarity: "contraband",
    itemId: "master-clearance-code",
  },
  {
    id: "cryo-subroutine-01",
    name: "AI SUBROUTINE [CRYO 01]",
    zoneId: "cryo-archive",
    type: "priority",
    region: "Labs",
    location: "Cryo Vault network",
    unlocks: "Partial Cryo DNA Network access",
    rarity: "contraband",
    itemId: "ai-subroutine-cryo-01",
    notes: "Exfil subroutines from Cryo Vaults 01–06 to unlock the network.",
  },
  {
    id: "cryo-marathon-c03",
    name: "Marathon C.03",
    zoneId: "cryo-archive",
    type: "key",
    region: "Preservation",
    location: "UESC Marathon / Cryo Archive",
    unlocks: "Offline encrypted rooms",
    rarity: "contraband",
    notes: "Encrypted key data; requires decryption.",
  },
  {
    id: "cryo-marathon-c06",
    name: "Marathon C.06",
    zoneId: "cryo-archive",
    type: "key",
    region: "Biostock",
    location: "UESC Marathon / Cryo Archive",
    unlocks: "Offline encrypted rooms",
    rarity: "contraband",
  },
  {
    id: "cryo-labs-exfil",
    name: "Labs Extraction",
    zoneId: "cryo-archive",
    type: "extraction",
    region: "Labs",
    location: "Cryo labs dock",
    notes: "High-risk exfil under UESC security pressure.",
  },
];

export function getPoisByZone(zoneId: string): MapPoi[] {
  return mapPois.filter((poi) => poi.zoneId === zoneId);
}

export function getPoisByType(zoneId: string, type: PoiType): MapPoi[] {
  return mapPois.filter((poi) => poi.zoneId === zoneId && poi.type === type);
}

export function getMapZoneIdFromName(zoneName: string): string {
  return zoneName.toLowerCase().replace(/\s+/g, "-");
}
