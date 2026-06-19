// Core data for the 2026 Marathon extraction shooter
// Source: https://marathonthegame.fandom.com/wiki/Cores

import type { Rarity } from "@/data/types";

export interface Core {
  id: string;
  name: string;
  runnerId: string;
  rarity: Rarity;
  price: number;
  description: string;
  wikiUrl: string;
}

function core(
  id: string,
  name: string,
  runnerId: string,
  rarity: Rarity,
  price: number,
  description: string,
): Core {
  return {
    id,
    name,
    runnerId,
    rarity,
    price,
    description,
    wikiUrl: "https://marathonthegame.fandom.com/wiki/Cores",
  };
}

export const cores: Core[] = [
  // Assassin
  core("assassin-minus-sights", "Minus Sights", "assassin", "prestige", 3000, "After aiming down sights for a short time, you become invisible at the cost of generating heat."),
  core("assassin-shadow-strike", "Shadow Strike", "assassin", "prestige", 3000, "Your Utility Knife deals greatly increased damage when attacking from invisibility."),
  core("assassin-silent-killer", "Silent Killer", "assassin", "prestige", 3000, "Melee attacks from behind while cloaked deal massive bonus damage."),
  core("assassin-ghost-walk", "Ghost Walk", "assassin", "superior", 600, "Moving while invisible generates less heat."),
  core("assassin-smoke-bomb", "Smoke Bomb", "assassin", "deluxe", 200, "Smoke fields last longer and cover a wider area."),

  // Destroyer
  core("destroyer-counter-attack", "Counter Attack", "destroyer", "prestige", 3000, "When Riot Barricade takes damage, release retaliatory missiles at your attacker."),
  core("destroyer-impact-siphons", "Impact Siphons", "destroyer", "prestige", 3000, "Incoming damage to Riot Barricade is returned as shield energy."),
  core("destroyer-fortress", "Fortress", "destroyer", "superior", 600, "Riot Barricade drains tactical energy more slowly."),
  core("destroyer-ordnance", "Ordnance", "destroyer", "deluxe", 200, "Search and Destroy missiles fire faster after sustained damage."),

  // Vandal
  core("vandal-overdrive", "Overdrive", "vandal", "prestige", 3000, "Amplify lasts longer and generates less heat."),
  core("vandal-shockwave", "Shockwave", "vandal", "superior", 600, "Disruptor blast radius increased."),
  core("vandal-afterburn", "Afterburn", "vandal", "deluxe", 200, "Microjets recharge faster after landing."),

  // Triage
  core("triage-triage-plus", "Triage+", "triage", "prestige", 3000, "Med-Drone heals and shields faster on attached allies."),
  core("triage-field-surgery", "Field Surgery", "triage", "superior", 600, "Reboot+ range and revive speed increased."),
  core("triage-overcharge", "Overcharge", "triage", "deluxe", 200, "Battery Overcharge EMP duration increased on volt shield breaks."),

  // Recon
  core("recon-early-warning", "Early Warning System", "recon", "prestige", 3000, "Receive HUD alert when a hostile Runner is nearby."),
  core("recon-intuition", "Intuition", "recon", "prestige", 3000, "Interrogation triggers when you down a hostile runner."),
  core("recon-hunter", "Hunter", "recon", "superior", 600, "Tracker Drone tracks targets for longer."),
  core("recon-echo", "Echo", "recon", "deluxe", 200, "Echo Pulse reveals enemies through thin cover."),

  // Thief
  core("thief-break-and-enter", "Break and Enter", "thief", "prestige", 3000, "Pickpocket Drone can steal from locked containers."),
  core("thief-grapple-master", "Grapple Master", "thief", "superior", 600, "Grapple Device cooldown reduced."),
  core("thief-x-ray", "X-Ray Pro", "thief", "deluxe", 200, "X-Ray Visor highlights highest-value items from farther away."),

  // Sentinel (Season 2)
  core("sentinel-bulwark", "Bulwark", "sentinel", "prestige", 3000, "Defensive barriers absorb more damage before breaking."),
  core("sentinel-anchor", "Anchor Point", "sentinel", "superior", 600, "Deployable cover lasts longer in contested zones."),
  core("sentinel-hold-line", "Hold the Line", "sentinel", "deluxe", 200, "Allies near Sentinel gain reduced incoming damage."),
];

export function getCoreById(id: string): Core | undefined {
  return cores.find((entry) => entry.id === id);
}

export function getCoresByRunner(runnerId: string): Core[] {
  return cores.filter((entry) => entry.runnerId === runnerId);
}
