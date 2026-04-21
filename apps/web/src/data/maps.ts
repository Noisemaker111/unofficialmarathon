// Map zone data for the 2026 Marathon extraction shooter
// Source: https://marathonthegame.fandom.com/wiki/Maps

export type ThreatLevel = "low" | "moderate" | "high" | "extreme";

export interface MapZone {
  id: string;
  name: string;
  description: string;
  threat: ThreatLevel;
  maxPlayers: number;
  duration: string; // e.g. "25 Minutes"
  requiredLevel: number | null; // null = no level requirement
  ante?: number;
  location?: string;
  pointsOfInterest: string[];
  extractions?: string[];
  activities?: string[];
  imageUrl: string; // Zone image/screenshot URL
  mapUrl: string; // Fandom interactive map URL
  wikiUrl: string;
}

export const mapZones: MapZone[] = [
  {
    id: "perimeter",
    name: "Perimeter",
    description:
      "Part of the colony's expansion and terraplatforming efforts on Tau Ceti IV. The presence of a Data Wall and massive Relay towers suggests operations shifted from terraplatforming to anomalous radiological and geological surveillance. Most systems read as dormant.",
    threat: "low",
    maxPlayers: 15,
    duration: "25 Minutes",
    requiredLevel: null,
    pointsOfInterest: ["Hauler", "North Relay", "South Relay", "Overflow", "Station"],
    extractions: ["North Extraction", "South Extraction", "East Extraction"],
    activities: [],
    imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/4/41/Perimeter_Page.png/revision/latest?cb=20260201033733",
    mapUrl: "https://marathonthegame.fandom.com/wiki/Map:Perimeter",
    wikiUrl: "https://marathonthegame.fandom.com/wiki/Perimeter",
  },
  {
    id: "dire-marsh",
    name: "Dire Marsh",
    description:
      "Located in New Cascadia's farming sector, Dire Marsh was key to the colony's sustainability efforts. A collaborative project between Colony Science Command and NuCaloric Agricultural, it housed algae ponds, greenhouses, and bio-research facilities. An ethereal anomaly cuts across the central region, and a quarantine operation was initiated prior to abandonment.",
    threat: "moderate",
    maxPlayers: 18,
    duration: "25 Minutes",
    requiredLevel: null,
    pointsOfInterest: ["Algae Ponds", "Bio-Research", "Complex", "Greenhouse", "Maintenance", "Quarantine", "A.I. Uplink"],
    extractions: ["Northwest Extraction", "Southeast Extraction"],
    activities: ["Anomaly Event", "UESC Lockdown"],
    imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/1/1e/Dire_Marsh_Page.png/revision/latest?cb=20260201033922",
    mapUrl: "https://marathonthegame.fandom.com/wiki/Map:Dire_Marsh",
    wikiUrl: "https://marathonthegame.fandom.com/wiki/Dire_Marsh",
  },
  {
    id: "outpost",
    name: "Outpost",
    description:
      "The tip of the spear for Tau Ceti IV colonization. Outpost served as a forward operating base deployed from the UESC Marathon, featuring the central Pinwheel Base — a hub for atmospheric, geologic, and microbial surveys. Airfield and processing facilities supported wide-ranging field experimentation during the colony's first days.",
    threat: "high",
    maxPlayers: 0, // Not specified on wiki
    duration: "", // Not specified on wiki
    requiredLevel: 15,
    pointsOfInterest: ["Airfield", "Dormitories", "Pinwheel", "Processing"],
    extractions: ["Airfield Extraction", "Processing Extraction"],
    activities: ["UESC Convoy Event", "Secured Resources"],
    imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/0/06/Outpost_Page.png/revision/latest?cb=20260201034001",
    mapUrl: "https://marathonthegame.fandom.com/wiki/Map:Outpost",
    wikiUrl: "https://marathonthegame.fandom.com/wiki/Outpost",
  },
  {
    id: "cryo-archive",
    name: "Cryo Archive",
    description:
      "Located aboard the UESC Marathon colony ship in orbit around Tau Ceti IV. The Cryo Archive managed cryostasis for 30,000 colonists and cataloged their DNA for personalized medical care. Sealed off from the rest of the ship after an unknown incident, the facility now suffers from extensive cryo leakage and heightened UESC security presence.",
    threat: "extreme",
    maxPlayers: 0, // Not specified on wiki
    duration: "30 Minutes",
    requiredLevel: 25,
    ante: 5000,
    location: "UESC Marathon",
    pointsOfInterest: ["Control", "Biostock", "Cold Storage", "Preservation", "Labs"],
    extractions: ["Control Extraction", "Labs Extraction"],
    activities: [],
    imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/1/12/Cryo_Archive_Page.png/revision/latest?cb=20260201034038",
    mapUrl: "https://marathonthegame.fandom.com/wiki/Map:Cryo_Archive",
    wikiUrl: "https://marathonthegame.fandom.com/wiki/Cryo_Archive",
  },
];