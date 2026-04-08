# Marathon Trilogy: Comprehensive Game Design Document

*Marathon* (1994), *Marathon 2: Durandal* (1995), and *Marathon Infinity* (1996)

**Authoritative Sources**: Marathon Wiki (marathonwiki.com), Pfhorpedia, Aleph-One Open Source Documentation, Marathon Story Archives (marathon.bungie.org), 90's FPS Wiki

---

## Table of Contents

1. Engine Architecture
2. Level Design Philosophy
3. 2.5D Rendering: Portal Technology
4. Physics System
5. Oxygen Mechanics
6. Weapon Systems
7. Alien & Friendly-Fire Mechanics
8. Mapmaking Tools
9. Monster AI Behavior
10. Difficulty Scaling
11. Checkpoint & Save System
12. Network & Multiplayer
13. Visual Design: HUD & Interfaces
14. Sound Design
15. Jason Jones Design Philosophy
16. Innovation Over Doom & Wolfenstein
17. Pfhor/Marine Weapon Asymmetry
18. Platforming Elements
19. Liquid/Media Systems
20. Monster Infighting

## 1. Engine Architecture

### Origins: Pathways into Darkness

The **Marathon engine** was built upon the foundations of *Pathways into Darkness* (1993), Bungies first FPS developed for the Macintosh. Jason Jones served as both programmer and designer for both titles.

**Key evolutionary steps**:
- Pathways introduced the concept but had limitations in spatial complexity
- Marathon refined and extended the engine significantly
- The engine was later succeeded by the **Blam! engine** used in *Halo* (2001), which featured true 3D polygonal rendering

### Portal Rendering & 5D Space

The defining technical innovation of the Marathon engine was its advanced use of **portal rendering**, enabling **room-over-room architecture** and overlapping spatial regionswhat Bungie called **5D space**.

**How portal rendering works**:
- Each level consists of **zones** (rooms) connected by **portals** (doorways, teleporters)
- The renderer only draws zones visible from the players current zone (potential visibility set)
- Zones can spatially overlap in 3D world space while remaining logically separate
- This allows complex architecture impossible in Doom/Wolfenstein-style engines

### Shapes File Architecture

The game graphics were stored in **shapes files** containing:
- **Bitmaps**: 8-bit indexed color images with RLE compression and transparency
- **Color Tables**: RGB palettes with self-luminescent color flags for glow effects
- **Frames**: Low-level shapes referencing bitmaps with mirror flags (X/Y axis)
- **Sequences**: High-level animations organizing frames into views and orientations

**Technical Specifications**:
| Specification | Value |
|---------------|-------|
| **Resolution** | 640x480 (classic), up to true-color with Aleph One OpenGL |
| **Color Depth** | 8-bit indexed (original), 32-bit with OpenGL (Aleph One) |
| **Angular Units** | 1 unit = 0.7 degrees (1/512 of a circle) |
| **Tick Rate** | 60 ticks per second |
| **Projectile Physics** | Hitscan and physics-based with gravity |

---

## 2. Level Design Philosophy

### Non-Linear Exploration

Marathon levels were designed around **exploration over linear progression**. Unlike Dooms often corridor-based levels, Marathon featured:
- **Large, open environments** with multiple pathways
- **Vertical complexity** through multi-level structures
- **Backtracking** required to access previously locked areas
- **Non-linear objectives** - players could often tackle goals in different orders

### Terminal-Based Storytelling

Each level contained **computer terminals** providing narrative text in green phosphor CRT style, advancing Bungies science fiction story about the Pfhor invasion, the AI Durandal, and the Spht aliens.

### Chapter Structure

The original *Marathon* was divided into **6 chapters**:

| Chapter | Levels | Setting |
|---------|--------|---------|
| **Arrival** | 0-2 | UESC Marathon, initial Pfhor attack |
| **Counterattack** | 3-9 | Marathon interior, fighting back |
| **Reprisal** | 10-11 | Reclaiming ship sections |
| **Durandal** | 12-15 | Revealing Durandals agenda |
| **The Pfhor** | 16-23 | Pfhor mothership |
| **Rebellion** | 24-26 | Spht uprising |

*Marathon 2: Durandal* featured 8 chapters with 28 total levels, set on Lhhowon. *Marathon Infinity* had 87 total levels across four acts.

### Switch & Door Puzzles

Level progression relied on:
- **Pattern buffers** - deactivate security to open doors
- **Liquid-filled passages** - require swimming or oxygen management
- **Keycards and chips** - colored access levels (red, yellow, green)
- **Platform switches** - trigger rising/falling platforms
- **Teleporter networks** - complex transportation between zones

---

## 3. 2.5D Rendering: Portal Technology

### Rendering Pipeline

The Marathon engines 2.5D renderer used portal/zonal rendering:
- Only zones visible from players current zone are rendered
- Zone graph connectivity determines visibility
- Sprite-based monsters and weapons with billboard orientation
- Angular animation (8-direction sprites for monsters)

### Comparison with Doom

| Feature | Doom (id Tech 1) | Marathon |
|---------|-------------------|----------|
| **Rendering** | BSP tree, fixed view | Portal/zonal rendering |
| **Verticality** | Limited | Full room-over-room |
| **Space overlapping** | Not possible | Supported via 5D space |
| **Monster sprites** | 8 angles | 8 angles + animation states |
| **Texture animation** | Simple frame swaps | Per-texture scrolling |

---

## 4. Physics System

### Movement Physics
- **Walk speed**: ~8.7 units per tick
- **Run multiplier**: 1.5x when holding run key
- **Gravity**: 0.015 units per tick squared (for falling objects, not player)
- **Friction**: Applied when grounded, allowing precise positioning

### Projectile Physics

**Hitscan** (instant):
- Used by: Pistol, Rifle (first shot), Alien weapons (some)
- Damage calculated immediately on line trace
- No physical projectile rendered

**Physics-based** (travel time):
- Used by: Rifle (subsequent shots), rockets, alien bolts
- Projectile has velocity and position updated each tick
- Gravity can affect trajectory (slight arc on long shots)
- Explosion radius for explosive projectiles

### Collision Detection
- **Player-to-world**: Swept sphere vs. level geometry
- **Projectile-to-world**: Point trace with radius
- **Projectile-to-entity**: Sphere vs. bounding box
- **Entity-to-entity**: Used for monster infighting checks

---

## 5. Oxygen Mechanics

### Vacuum Environments

Marathon introduced **oxygen management** as a core survival mechanic for vacuum levels:
- **Oxygen depletion**: 1 unit per tick in vacuum or underwater
- Provides **360 seconds (6 minutes)** of total air supply
- Visual and audio warnings at 25%, 10%, 5% remaining

### Difficulty Modifiers

| Difficulty | Oxygen Drain Condition |
|------------|----------------------|
| **Kindergarten** | Normal drain |
| **Major Damage** | +1 unit/tick when trigger held |
| **Total Carnage** | +1 unit/tick when trigger held, +1 unit/tick when running in vacuum |

### Environmental Hazards
- **Vacuum damage**: Immediate damage when oxygen depleted
- **Underwater breathing**: Oxygen tanks can be collected to refill supply
- Swimming movement slightly slower than walking

---

## 6. Weapon Systems

### Weapon Categories

Marathon featured **8 weapon types** with **28 total weapons**:

| Category | Weapons | Characteristics |
|----------|---------|-----------------|
| **Pistols** | Fusion Pistol, .44 Magnum | Sidearms, dual-wield capable |
| **Rifles** | Assault Rifle, Battle Rifle | Primary auto weapons |
| **Heavy** | Rocket Launcher, SPNKr | Explosive, limited ammo |
| **Energy** | Alien Weapon, Devastator | Unique projectiles |
| **Thrown** | Grenades, TrihXeem | Area denial |
| **Melee** | Fists, Wrench | Last resort |

### Dual-Wield System

The game supported **dual-wielding pistols**:
- Two fusion pistols can be equipped simultaneously
- **Double fire rate** (both weapons fire alternately)
- **Increased damage per second** but same per-shot damage
- **Reduced accuracy** - spread increased over single weapon
- **More recoil** - greater pushback effect

### Weapon Switching
- **Instant swap** between equipped weapons
- **Dropped on death** - enemies can pick up dropped weapons
- **Ammo pooling** - shared ammunition pool per type
- **Weapon duplication** (Total Carnage mode): picking up same weapon refreshes inventory

---

## 7. Alien & Friendly-Fire Mechanics

### Alien Combat Behavior

**Alien damage** (per difficulty):

| Difficulty | Damage Multiplier |
|------------|-------------------|
| Kindergarten | 0.5x |
| Easy | 0.75x |
| Normal | 1.0x |

**Attack frequency** also scales with difficulty (Kindergarten: 1/3x, Total Carnage: 4x normal).

### Friendly Fire Systems

**Mechanics**:
- Monsters can damage other monsters with projectiles
- **Infighting** - monsters attack those of different types
- Projectiles can ricochet off walls to hit unintended targets

### Civilian NPC System

The original Marathon included **BOBs** (Battle Operation Buddies):
- They can be killed by player (counts against player)
- If player kills 3+ civilians, remaining BOBs turn hostile
- Adds moral dimension to combat decisions

---

## 8. Mapmaking Tools

### Forge: Level Editor

**Forge** was Bungies official level editor, shipping with *Marathon Infinity*:
- Create and edit zones (rooms)
- Place monsters, items, switches, doors
- Define zone connectivity via portals
- Set lighting levels per zone
- Place and configure terminals with text content
- Define starting positions and extraction points

### Anvil: Asset Editor

**Anvil** complemented Forge for asset creation:
- Create custom textures (wall, floor, ceiling)
- Design sprite animations
- Define physics parameters for new monster types
- Configure weapon behaviors
- Package custom sounds

### Modern Alternatives

| Editor | Platform | Notes |
|--------|----------|-------|
| **Forge+** | Windows | Open-source, Unity-based |
| **Weland** | Cross-platform | Modern Forge replacement |
| **Atque** | macOS/Windows | Advanced features |
| **ShapeFusion** | Cross-platform | Shapes editing |

---

## 9. Monster AI Behavior

### Enemy Classification

Monsters were classified by **threat level**:

| Class | Examples | Behavior Pattern |
|-------|----------|------------------|
| **Minor** | Fighter, Runner | Direct pursuit, melee/ranged |
| **Major** | Pfhor, Compiler | Coordinated, special abilities |
| **Boss** | Juggernaut, Enforcer | Heavy damage, unique attacks |

### AI State Machine

Each monster operated on a simple state machine:
1. **IDLE** - patrol, wait
2. **ALERT** - acknowledged player (triggered by detection)
3. **ATTACK** - executing attack pattern
4. **RETURN** - return to origin after losing player

### Movement Patterns

**Pathfinding**:
- Monsters navigate zone graph via portals
- Simple line-of-sight checks for direct pursuit
- Can get stuck on complex geometry

**Animation states**:
- **Walking**: 4-frame cycle, speed based on difficulty
- **Running**: Faster walk cycle
- **Attacking**: Weapon-specific animation
- **Dying**: 4-8 frame death animation
- **Berserk**: 1.5x speed multiplier, triggered by low health

### Guided Projectiles

Some monsters (Hunters, Enforcers) fired **guided projectiles**:
- Projectile adjusts yaw and pitch toward target
- Angular adjustment rate varies by difficulty
- Can be dodged by breaking line-of-sight

| Difficulty | Yaw Change/tick | Pitch Change/tick |
|------------|-----------------|------------------|
| Kindergarten | 10 units | 8 units |
| Easy | 9 units | 7 units |
| Normal | 8 units | 6 units |
| Major Damage | 7 units | 5 units |
| Total Carnage | 6 units | 4 units |

### Special Monster Types

**Spht Compiler**:
- Floats, phases in and out of visibility
- Teleports when taking damage
- Coordinates with other Spht

**Pfhor Trooper**:
- Multiple attack patterns
- Uses cover when available
- Coordinates with nearby Pfhor

---

## 10. Difficulty Scaling

Marathon featured **5 difficulty levels**, each modifying multiple gameplay parameters:

### Kindergarten
- Drop every 4th monster
- Demote every other major to minor
- Alien damage: **0.5x**
- Alien health: **0.5x**
- Alien movement: **7/8** of normal
- Projectile speed: **7/8** of normal
- Attack frequency: **1/3** normal
- Attack repetitions: halved
- Civilian kill counter decays every **128 ticks** (4.27 seconds)

### Easy
- Drop every 8th monster
- Demote every 4th major to minor
- Alien damage: **0.75x**
- Alien health: **0.75x**
- Alien movement: **15/16** of normal
- Projectile speed: **15/16** of normal
- Attack frequency: **1/2** normal
- Attack repetitions: halved
- Civilian kill counter decays every **256 ticks** (8.53 seconds)

### Normal
- Civilian kill counter decays every **512 ticks** (17.07 seconds)
- Attack repetitions: reduced
- Guided projectile agility: **8 yaw, 6 pitch**

### Major Damage
- Promote every other minor to major
- Alien health: **1.25x**
- Alien movement: **1.125x** normal
- Projectile speed: **1.125x** normal
- Attack frequency: **2x** normal
- Guided projectile agility: **7 yaw, 5 pitch**
- Oxygen drain: **+1/tick** when trigger held

### Total Carnage
- **No ammo pickup limit** (can stack maximum)
- Duplicate weapons can be picked up (Marathon 1)
- Promote every minor to major
- Alien health: **1.5x**
- Alien movement: **1.25x** normal
- Projectile speed: **1.25x** normal
- Attack frequency: **4x** normal
- Guided projectiles can lock onto **invisible targets**
- Guided projectile agility: **6 yaw, 4 pitch**
- Oxygen drain: **+1/tick** (trigger), **+1/tick** (running)
- Civilian kill counter decays every **2048 ticks** (68.27 seconds)

---

## 11. Checkpoint & Save System

### Checkpoint Mechanics

Marathon used **invisible checkpoints** throughout levels:

**Checkpoint trigger conditions**:
- Activating a switch
- Opening a door
- Completing an objective
- Entering a new zone

**On death**:
- Player respawns at last checkpoint
- Monsters reset to checkpoint state
- Items respawn (ammunition, oxygen)
- Doors reset to closed state

### Save System

**Manual saves**:
- Players could save at any time (terminal or menu)
- Save includes: position, inventory, objective progress, monster states
- Multiple save slots (typically 6-10)

**Save data includes**:
- Player position and facing
- Current health and oxygen
- Inventory contents
- Level progress and objectives
- Game time elapsed

### Inventory on Death

**Standard mode**: Lost ammunition and items carried at death

**Total Carnage mode**: Items persist (no loss on death)

---

## 12. Network & Multiplayer

### Original Multiplayer Architecture

Marathon supported **4-player deathmatch** via AppleTalk/network:

**Game types**:
- **Deathmatch**: Free-for-all, last player standing
- **Capture the Flag**: Team-based objective
- **King of the Hill**: Control zones for points

**Networking**:
- Latency-based hit detection
- Client-server architecture for local networks
- Player position synchronization

### Modern Multiplayer (2026 Marathon)

The 2026 *Marathon* revival features:
- Dedicated servers (fully authoritative)
- Client-side prediction for movement
- Server reconciliation for combat
- Server-side validation of all actions
- Movement bounds checking
- Projectile path verification

---

## 13. Visual Design: HUD & Interfaces

### Heads-Up Display

Marathons HUD featured **minimal, diegetic design**:

**Primary elements**:
- **Health bar**: Bottom-left, numeric + bar
- **Oxygen bar**: Below health, percentage display
- **Ammunition**: Weapon-specific, bottom-right
- **Weapon indicator**: Current weapon silhouette
- **Minimap**: Top-right, showing nearby zones (when available)

### Terminal Interface

Terminals used a **green phosphor CRT aesthetic** with scrollable text, simulating vintage computer interfaces.

### Chapter Screens

Each chapter featured **cinematic title screens** with chapter name, atmospheric background imagery, and mission briefing text.

### Visual Style Influences

**Aesthetic references**:
- 1970s-80s sci-fi computer interfaces
- Military HUD systems
- Alien architecture with organic curves
- Human technology: utilitarian, industrial

---

## 14. Sound Design

### Audio Categories

| Category | Examples |
|----------|----------|
| **Weapon sounds** | Pistol shots, rifle fire, explosions |
| **Monster sounds** | Roars, attacks, deaths, alerts |
| **Environmental** | Doors, switches, ambience |
| **UI sounds** | Menu navigation, terminal beeps |
| **Music** | Level themes, chapter transitions |

### Spatial Audio
- Sound attenuation with distance
- Directional sound for off-screen enemies
- Environmental reverb for enclosed spaces
- Vacuum: no sound transmission (simulated silence)

### Music System

Marathons adaptive music responded to gameplay:
- **Ambient loops** for exploration
- **Combat intensity** increases during fights
- **Chapter transitions** with distinct musical themes
- **Boss encounters** with heightened audio

---

## 15. Jason Jones Design Philosophy

### Influences & Approach

Jason Jones, co-founder of Bungie and lead programmer/designer for Marathon, brought specific design philosophies:

**Key principles**:
1. **Player agency**: Give players meaningful choices, not false ones
2. **Story through environment**: Narrative emerges from exploration, not cutscenes
3. **Consistent world logic**: Rules that players can learn and exploit
4. **Tension through resource management**: Combat as risk/reward decisions

### On Difficulty

Jones defended Marathons difficulty curve, arguing that early levels teach mechanics, later levels test mastery, and difficulty should challenge, not frustrate.

### On Story

Jones explained Durandals apparent betrayal as intentional - using the player until his goals were achieved, then abandoning them. The seemingly inconsistent ally/enemy behavior reflected Durandal manipulating the player for his own freedom.

### Technical Innovation Philosophy

Jones prioritized **rendering technology** that enabled complex level architecture, spatial puzzles, and environmental storytelling. Portal rendering was essential to achieving design goals impossible with Doom-era engines.

---

## 16. Innovation Over Doom & Wolfenstein

### Technical Innovations

| Feature | Wolfenstein 3D (1992) | Doom (1993) | Marathon (1994) |
|---------|----------------------|-------------|-----------------|
| **Engine** | Raycasting | BSP + nodes | Portal/zonal |
| **Verticality** | None | Limited | Full room-over-room |
| **Space overlapping** | No | No | Yes (5D) |
| **Monster AI** | Simple chase | State machine | State machine + infighting |
| **Story** | None | Minimal | Terminal-based narrative |
| **Oxygen mechanic** | No | No | Yes |
| **Dual-wield** | No | No | Yes |
| **NPCs** | Nazis (decoration) | None | BOBs (killable) |
| **Platforming** | None | Jumping | Full physics |

### Design Philosophy Differences

**Dooms approach**:
- Action-focused, minimal story
- Linear progression
- Demon-slaying as power fantasy
- Deathmatch-centric multiplayer

**Marathons approach**:
- Story-driven exploration
- Non-linear level design
- Survival through resource management
- Player choices have consequences (civilian kills)

### Narrative Innovation

Marathon introduced **terminal-based storytelling**:
- Story accessible but not required
- Multiple layers: surface plot + hidden terminals + environmental details
- AIs as characters with distinct personalities (Durandal, Tycho, Thoth)
- Moral ambiguity in human characters

---

## 17. Pfhor/Marine Weapon Asymmetry

### Pfhor Weapon Design

The Pfhor used **alien technology** distinctly different from human weapons:

**Characteristics**:
- **Energy-based**: Most Pfhor weapons fired plasma/energy projectiles
- **Biological components**: Some weapons incorporated living tissue
- **Tracking capability**: Guided projectiles on advanced units
- **High damage, low ammo**: Powerful but scarce pickups

### Human Weapon Design

Marine weapons emphasized **reliability and versatility**:

**Characteristics**:
- **Ballistic projectiles**: Bullets, shells, rockets
- **Familiar operation**: Standard firearm controls
- **Sustainable ammo**: More pickups throughout levels
- **Lower damage, higher accuracy**: Skill-rewarding

### Combat Implications

| Factor | Human Weapons | Pfhor Weapons |
|--------|---------------|---------------|
| **Damage** | Moderate | High |
| **Fire rate** | Variable | Often high |
| **Ammo availability** | Common | Rare |
| **Accuracy** | High | Variable |
| **Projectile type** | Ballistic/hitscan | Often physics-based |
| **Guided** | No | Some enemy units |

---

## 18. Platforming Elements

### Jump Mechanics

Marathon featured **full player jumping**:

**Parameters**:
- **Jump height**: ~2 units (allows reaching platforms)
- **Air control**: Full horizontal movement while airborne
- **Gravity**: Standard physics arc
- **No jump crouch** (cannot crouch mid-air)

### Environmental Platforming

Platforming challenges included:
- **Multi-level structures**: Vertical navigation through zones
- **Liquid traversal**: Swimming through flooded passages
- **Gap jumping**: Leaping between platforms

### Integration with Combat

Platforming served tactical purposes:
- **Vertical advantage**: Higher ground = easier targeting
- **Escape routes**: Jumping to unreachable areas for enemies
- **Choke points**: Single platforms as defensible positions

---

## 19. Liquid/Media Systems

### Liquid Types

Marathon featured multiple **environmental liquid types**:

| Liquid | Effect | Countermeasure |
|--------|--------|----------------|
| **Water** | Slowed movement, oxygen drain | Oxygen tank |
| **Lava** | Instant high damage | Dont touch |
| **Sewage** | Minor damage, slowed movement | Quick traversal |
| **Pfhor slime** | Damage over time, vision obscured | Resist/hurry through |

### Rendering of Liquids

Liquid surfaces had **special rendering**:
- **Transparency**: See through to floor/ceiling below
- **Animation**: Subtle wave/movement effect
- **Surface reflection**: Simplified mirror effect
- **Depth indication**: Darker with depth

### Tactical Considerations

- Liquids often served as **barriers** between zones
- Some paths through liquids require oxygen planning
- Combat near liquids adds risk (knockback into lava)
- Pfhor slime areas indicate hostile territory

---

## 20. Monster Infighting

### Infighting Mechanics

Monsters could **attack each other** under specific conditions:

**Triggers**:
- Projectile misses player and hits another monster
- Monster enters melee range of another monster type
- Some species have inherent inter-group hostility

**Behavior**:
- Monsters use same attack patterns against each other
- Damage calculations same as player vs. monster
- Can be exploited by skilled players

### Exploitation Strategies

**By players**:
- Lure fast monsters into slow monsters range
- Use ricocheting projectiles for multi-target damage
- Position between monster types

**Tactical outcomes**:
- Reduces difficulty in mixed-enemy areas
- Creates emergent combat scenarios
- Rewards environmental awareness

### Technical Implementation

From difficulty scaling data, **infighting was intentional design**. On Total Carnage, 	icks_since_attack is NOT reset after attacks, allowing faster repeated attacks in infighting scenarios.

### Friendly Fire Variations

Different monster types had different **in-group hostility**:
- Pfhor: Rarely attack own kind
- Spht Compilers: No (coordinated)
- Runners: Sometimes
- Fighters: Sometimes

---

## Appendices

### A. Game Timeline

| Year | Event |
|------|-------|
| 1993 | *Pathways into Darkness* released |
| 1994 | *Marathon* released (December) |
| 1995 | *Marathon 2: Durandal* released |
| 1996 | *Marathon Infinity* released |
| 2000 | Aleph One open-source engine released |
| 2023 | New Marathon announced by Bungie |
| 2026 | *Marathon* (2026) released |

### B. Monster Roster

| Monster | Type | First Appearance |
|---------|------|-----------------|
| Fighter | Minor | Marathon |
| Runner | Minor | Marathon |
| Spht Compiler | Major | Marathon |
| Pfhor Trooper | Major | Marathon |
| Pfhor Enforcer | Major | Marathon |
| Hulker | Major | Marathon 2 |
| Hunter | Major | Marathon 2 |
| Juggernaut | Boss | Marathon 2 |
| Tick | Minor | Marathon Infinity |

### C. Weapon Roster

| Weapon | Type | Dual-Wieldable? |
|--------|------|-----------------|
| Fusion Pistol | Pistol | Yes |
| .44 Magnum | Pistol | No |
| Assault Rifle | Rifle | No |
| Battle Rifle | Rifle | No |
| SPNKr Rocket Launcher | Heavy | No |
| Alien Weapon | Energy | No |

### D. Technical Limits

| Parameter | Value |
|-----------|-------|
| Max monsters per level | ~100 |
| Max items per level | ~200 |
| Max zones per level | ~50 |
| Max polygons per zone | Variable |
| Max textures | ~256 per scenario |

---

## References & Resources

### Primary Sources

- **Marathon Wiki** (marathonwiki.com) - Community wiki with game details
- **Pfhorpedia** (marathongame.fandom.com) - Comprehensive game encyclopedia  
- **Aleph-One Wiki** (github.com/Aleph-One-Marathon/alephone/wiki) - Technical documentation
- **Marathon Story Archives** (marathon.bungie.org) - Terminal texts, manuals, developer commentary

### Technical Documentation

- **Marathon Shapes File Format** (dalcanton.it) - Detailed format specification by Tito Dal Canton
- **90s FPS Wiki: Marathon Engine** - Engine history and game list
- **Forge & Anvil Tips** (dr-lex.be) - Editor techniques

### Community Resources

- **Simplici7y** - Marathon scenario downloads
- **Aleph One** - Open-source engine, modern compatibility
- **Forge+** - Modern level editor

---

*Document compiled: April 2026*
*Sources reflect original Marathon trilogy (1994-1996) and Aleph One open-source documentation*
