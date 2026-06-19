#!/usr/bin/env node
/**
 * Sync Marathon gear images from MarathonDB / MarathonMeta CDNs into apps/web/public/assets.
 * Regenerates item-assets.ts and mod-assets.ts maps.
 */
import { mkdirSync, readdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const WEB = join(ROOT, "apps/web");
const PUBLIC = join(WEB, "public/assets");
const UA = "Mozilla/5.0 (compatible; UnofficialMarathon/1.0)";

const raritySuffixes = {
  standard: ["standard", ""],
  enhanced: ["enhanced", ""],
  deluxe: ["deluxe", ""],
  superior: ["superior", ""],
  prestige: ["", "prestige"],
};

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function download(url, dest) {
  if (existsSync(dest)) return false;
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, buf);
    return true;
  } catch {
    return false;
  }
}

function collectMods() {
  const files = [
    join(WEB, "src/data/mods.ts"),
    join(WEB, "src/data/mods-extended.ts"),
    join(WEB, "src/data/mods-bulk.ts"),
  ];
  const mods = new Map();
  for (const file of files) {
    if (!existsSync(file)) continue;
    const text = readFileSync(file, "utf8");
    for (const match of text.matchAll(/mod\("([^"]+)",\s*"([^"]+)",\s*"[^"]+",\s*"([^"]+)"/g)) {
      mods.set(match[1], { id: match[1], name: match[2], rarity: match[3] });
    }
    for (const match of text.matchAll(/\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*slot:\s*"[^"]+",\s*rarity:\s*"([^"]+)"/g)) {
      mods.set(match[1], { id: match[1], name: match[2], rarity: match[3] });
    }
  }
  return [...mods.values()];
}

function collectItems() {
  const files = [join(WEB, "src/data/items.ts"), join(WEB, "src/data/items-extended.ts")];
  const items = new Set();
  for (const file of files) {
    if (!existsSync(file)) continue;
    const text = readFileSync(file, "utf8");
    for (const match of text.matchAll(/item\("([^"]+)"/g)) {
      items.add(match[1]);
    }
    for (const match of text.matchAll(/\{\s*id:\s*"([^"]+)"/g)) {
      items.add(match[1]);
    }
  }
  return [...items];
}

function findModFile(mod, files) {
  const id = mod.id;
  const nameSlug = slugify(mod.name);
  const suffixes = raritySuffixes[mod.rarity] ?? [mod.rarity, ""];

  const candidates = new Set();
  for (const suffix of suffixes) {
    if (suffix) {
      candidates.add(`${id}-${suffix}`);
      candidates.add(`${nameSlug}-${suffix}`);
    } else {
      candidates.add(id);
      candidates.add(nameSlug);
    }
  }

  for (const candidate of candidates) {
    if (files.has(candidate)) return candidate;
  }

  const prefixMatches = [...files].filter(
    (f) => f === id || f.startsWith(`${id}-`) || f === nameSlug || f.startsWith(`${nameSlug}-`),
  );

  if (prefixMatches.length === 0) return undefined;
  if (prefixMatches.length === 1) return prefixMatches[0];

  const rarityHits = prefixMatches.filter((f) => {
    for (const suffix of suffixes) {
      if (!suffix) continue;
      if (f.endsWith(`-${suffix}`) || f.includes(`-${suffix}-`)) return true;
    }
    return false;
  });
  if (rarityHits.length === 1) return rarityHits[0];
  if (rarityHits.length > 1) return rarityHits.sort((a, b) => a.length - b.length)[0];

  if (mod.rarity === "prestige" && prefixMatches.includes(id)) return id;
  if (prefixMatches.includes(id)) return id;
  return prefixMatches.sort((a, b) => a.length - b.length)[0];
}

function writeTsMap(filePath, exportName, map) {
  const lines = Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `  "${k}": "${v}",`);
  const content = `/** Auto-generated — run scripts/sync-marathon-assets.mjs */\nexport const ${exportName}: Record<string, string> = {\n${lines.join("\n")}\n};\n`;
  writeFileSync(filePath, content);
}

async function main() {
  const modsDir = join(PUBLIC, "mods");
  mkdirSync(modsDir, { recursive: true });

  const mods = collectMods();
  const items = collectItems();

  console.log(`Catalog: ${mods.length} mods, ${items.length} items`);

  let modDownloads = 0;
  for (const mod of mods) {
    const slug = mod.id;
    const dest = join(modsDir, `${slug}.webp`);
    if (await download(`https://mods.marathondb.gg/images/${slug}.webp`, dest)) modDownloads++;

    const nameSlug = slugify(mod.name);
    for (const suffix of raritySuffixes[mod.rarity] ?? []) {
      const variant = suffix ? `${slug}-${suffix}` : slug;
      if (await download(`https://mods.marathondb.gg/images/${variant}.webp`, join(modsDir, `${variant}.webp`))) {
        modDownloads++;
      }
      if (nameSlug !== slug) {
        const nameVariant = suffix ? `${nameSlug}-${suffix}` : nameSlug;
        if (await download(`https://mods.marathondb.gg/images/${nameVariant}.webp`, join(modsDir, `${nameVariant}.webp`))) {
          modDownloads++;
        }
      }
    }
  }

  const modFiles = new Set(readdirSync(modsDir).map((f) => f.replace(/\.webp$/, "")));
  const modAssets = {};
  let modMapped = 0;
  for (const mod of mods) {
    const file = findModFile(mod, modFiles);
    if (file) {
      modAssets[mod.id] = `/assets/mods/${file}.webp`;
      modMapped++;
    }
  }
  writeTsMap(join(WEB, "src/data/mod-assets.ts"), "modAssets", modAssets);
  console.log(`Mods: ${modFiles.size} files, ${modMapped}/${mods.length} mapped, ${modDownloads} new downloads`);

  const itemsDir = join(PUBLIC, "items");
  mkdirSync(itemsDir, { recursive: true });
  let itemDownloads = 0;
  for (const id of items) {
    const dest = join(itemsDir, `${id}.webp`);
    if (await download(`https://items.marathondb.gg/images/items/${id}.webp`, dest)) itemDownloads++;
  }

  const itemFiles = readdirSync(itemsDir)
    .filter((f) => f.endsWith(".webp"))
    .map((f) => f.replace(/\.webp$/, ""));
  const itemAssets = Object.fromEntries(itemFiles.map((id) => [id, `/assets/items/${id}.webp`]));
  writeTsMap(join(WEB, "src/data/item-assets.ts"), "itemAssets", itemAssets);
  console.log(`Items: ${itemFiles.length} files, ${itemDownloads} new downloads`);

  const equipmentDir = join(PUBLIC, "equipment");
  mkdirSync(equipmentDir, { recursive: true });
  const metaSlugs = [
    "frost-mine", "mercy-kit", "signal-flares", "vector-grenade",
    "flash-bang", "decoy-drone", "barricade-kit", "scanner-drone",
    "repair-drone", "thermal-flare", "riot-foam",
    "hardware-boost", "firewall-boost", "prime-boost", "tactical-boost",
  ];
  let equipDownloads = 0;
  for (const slug of metaSlugs) {
    if (await download(`https://marathonmeta.gg/assets/equipment/${slug}.png`, join(equipmentDir, `${slug}.png`))) {
      equipDownloads++;
    }
  }
  console.log(`Equipment: ${equipDownloads} new marathonmeta downloads`);

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
