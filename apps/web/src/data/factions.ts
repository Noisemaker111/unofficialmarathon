// Faction data for the 2026 Marathon extraction shooter
// Source: https://marathonthegame.fandom.com/wiki/Factions

export interface Faction {
  id: string;
  name: string;
  description: string;
  color: string; // Tailwind color class for faction branding
  textColor: string; // CSS-variable-based Tailwind class via theme tokens
  bgColor: string; // CSS-variable-based background Tailwind class
  imageUrl: string; // Faction logo/AI icon URL
  wikiUrl: string;
}

export const factions: Faction[] = [
  {
    id: "arachne",
    name: "Arachne",
    description: "A death cult fixated on blood and violence. Arachne wants you to kill other Runners, giving off horror movie-like vibes with its blood-red aesthetic. Their contracts are PvP-focused, rewarding players for dealing damage and downing enemy Runners.",
    color: "text-red-400",
    textColor: "text-faction-arachne",
    bgColor: "bg-faction-arachne",
    imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/f/f5/Arachne_AI.png/revision/latest?cb=20260102064336",
    wikiUrl: "https://marathonthegame.fandom.com/wiki/Arachne",
  },
  {
    id: "cyberacme",
    name: "CyberAcme",
    description: "The industry leader in AI architecting, data analysis, and cybersecurity. CyberAcme provides integrated support to Runners—managing communications, atmospheric monitoring, procurement algorithms, and neural sync security. Their proprietary ONI system is equipped with every Runner shell.",
    color: "text-yellow-400",
    textColor: "text-faction-cyberacme",
    bgColor: "bg-faction-cyberacme",
    imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/b/b9/CyberAcme_AI.png/revision/latest?cb=20260102064426",
    wikiUrl: "https://marathonthegame.fandom.com/wiki/CyberAcme",
  },
  {
    id: "nucaloric",
    name: "NuCaloric",
    description: "Founded after the devastating famine of the 2360s, NuCaloric Agricultural exists to feed, clothe, and supply humanity with its most basic needs. As major stakeholders in the Tau Ceti colony, their contracts focus on uncovering why the original Marathon expedition failed over a century ago.",
    color: "text-green-400",
    textColor: "text-faction-nucaloric",
    bgColor: "bg-faction-nucaloric",
    imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/a/a9/NuCaloric_AI.png/revision/latest?cb=20260102064540",
    wikiUrl: "https://marathonthegame.fandom.com/wiki/NuCaloric",
  },
  {
    id: "sekiguchi",
    name: "Sekiguchi",
    description: "Sekiguchi Genetics is responsible for the Weaveform technology used to create the shell bodies worn by Runners. Similar to CyberAcme in importance to Runner infrastructure, their contracts involve scanning shell stimulants and analyzing necrotic samples.",
    color: "text-blue-400",
    textColor: "text-faction-sekiguchi",
    bgColor: "bg-faction-sekiguchi",
    imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/b/bb/Sekiguchi_AI.png/revision/latest?cb=20260102064515",
    wikiUrl: "https://marathonthegame.fandom.com/wiki/Sekiguchi",
  },
  {
    id: "traxus",
    name: "Traxus",
    description: "The leading industrial, technology, and space mining megacorporation across Sol—and the most powerful private corporation in human history. Traxus played a key role in developing the Marathon ship and claims rights of reacquisition to all proprietary technology from the Tau Ceti colony.",
    color: "text-orange-400",
    textColor: "text-faction-traxus",
    bgColor: "bg-faction-traxus",
    imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/1/12/Traxus_AI.png/revision/latest?cb=20260102064452",
    wikiUrl: "https://marathonthegame.fandom.com/wiki/Traxus",
  },
  {
    id: "mida",
    name: "MIDA",
    description: "A faction dating back to the original Marathon trilogy, where it began as a political party before transforming into a terrorist organization. As explosive experts obsessed with destruction, MIDA's contracts revolve around destroying UESC equipment and infrastructure.",
    color: "text-purple-400",
    textColor: "text-faction-mida",
    bgColor: "bg-faction-mida",
    imageUrl: "https://static.wikia.nocookie.net/marathonthegame/images/9/95/MIDA_AI.png/revision/latest?cb=20260102064119",
    wikiUrl: "https://marathonthegame.fandom.com/wiki/MIDA",
  },
];