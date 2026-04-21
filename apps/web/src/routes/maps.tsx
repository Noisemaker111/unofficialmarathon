import { createFileRoute } from "@tanstack/react-router";
import { mapZones, type ThreatLevel } from "@/data/maps";
import { Badge } from "@unofficialmarathon/ui/components/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@unofficialmarathon/ui/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@unofficialmarathon/ui/components/tabs";
import { MapPin, ExternalLink, Shield, Users, Clock, Swords, Activity, Coins, Navigation } from "lucide-react";

export const Route = createFileRoute("/maps")({
  component: MapsPage,
});

const threatColors: Record<ThreatLevel, string> = {
  low: "text-faction-nucaloric",
  moderate: "text-marathon-amber",
  high: "text-marathon-pink",
  extreme: "text-faction-arachne",
};

const threatBg: Record<ThreatLevel, string> = {
  low: "bg-faction-nucaloric/10",
  moderate: "bg-marathon-amber/10",
  high: "bg-marathon-pink/10",
  extreme: "bg-faction-arachne/10",
};

function MapsPage() {
  return (
    <div className="min-h-full bg-background marathon-lattice">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="mb-12 border-b border-border/50 pb-8 marathon-fiducial relative">
          <div className="marathon-data-label mb-3">TC4-SYS://MAPS.DAT</div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-primary">Level Maps</h1>
          <p className="mt-2 text-muted-foreground font-mono">
            Interactive maps for the zones of Tau Ceti IV. Explore Perimeter, Dire Marsh, Outpost, and Cryo Archive.
          </p>
        </div>

        <div className="mb-8 rounded-none border border-primary/30 bg-primary/5 p-4 marathon-fiducial relative">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Interactive Maps</h3>
              <p className="text-sm text-muted-foreground font-mono mt-1">
                Full interactive maps with key locations, containers, and points of interest are available on the{" "}
                <a
                  href="https://marathonthegame.fandom.com/wiki/Special:AllMaps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-bold"
                >
                  Marathon Wiki
                  <ExternalLink className="ml-0.5 inline h-3 w-3" />
                </a>
                . Select a zone below to view its details and access its interactive map.
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue={mapZones[0].id} className="mb-16">
          <TabsList className="mb-6 flex w-full flex-wrap justify-start gap-2 bg-transparent p-0">
            {mapZones.map((zone) => (
              <TabsTrigger
                key={zone.id}
                value={zone.id}
                className="rounded-none border border-border/50 bg-background/80 backdrop-blur px-6 py-3 font-mono uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary"
              >
                {zone.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {mapZones.map((zone) => (
            <TabsContent key={zone.id} value={zone.id} className="mt-0 outline-none">
              <Card className="overflow-hidden rounded-none border-border/50 bg-background/90 backdrop-blur-sm marathon-fiducial relative">
                <div className="h-64 relative overflow-hidden border-b border-border/50">
                  <img src={zone.imageUrl} alt={zone.name} loading="lazy" className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                  <div className="absolute bottom-6 left-6 z-10">
                    <div className="text-4xl font-black uppercase tracking-tighter text-primary drop-shadow-md">{zone.name}</div>
                    {zone.location && (
                      <div className="text-sm font-mono uppercase tracking-widest text-primary/80 mt-1">{zone.location}</div>
                    )}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/50">
                  <div className="p-6 md:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold uppercase tracking-wider text-foreground">Overview</h2>
                      <span className={`rounded-none border px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-widest ${threatColors[zone.threat]} ${threatBg[zone.threat]} border-current/30`}>
                        Threat: {zone.threat}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground font-mono leading-relaxed mb-8">
                      {zone.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-8 mb-8">
                      {zone.pointsOfInterest.length > 0 && (
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2 border-b border-border/50 pb-2">
                            <MapPin className="h-4 w-4" />
                            Points of Interest
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {zone.pointsOfInterest.map((poi) => (
                              <Badge key={poi} variant="secondary" className="rounded-none font-mono text-[10px] uppercase tracking-wider bg-secondary/50 hover:bg-secondary border border-border/50">
                                {poi}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {zone.extractions && zone.extractions.length > 0 && (
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2 border-b border-border/50 pb-2">
                            <Navigation className="h-4 w-4" />
                            Extractions
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {zone.extractions.map((ext) => (
                              <Badge key={ext} variant="outline" className="rounded-none font-mono text-[10px] uppercase tracking-wider border-primary/30 text-primary bg-primary/5">
                                {ext}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {zone.activities && zone.activities.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2 border-b border-border/50 pb-2">
                          <Activity className="h-4 w-4" />
                          Known Activities & Events
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {zone.activities.map((activity) => (
                            <Badge key={activity} variant="destructive" className="rounded-none font-mono text-[10px] uppercase tracking-wider bg-destructive/20 text-destructive-foreground border border-destructive/30">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/50">
                      <a
                        href={zone.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-none bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        <MapPin className="h-4 w-4" />
                        Open Interactive Map
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                      <a
                        href={zone.wikiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-none border border-primary/50 bg-background px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary hover:bg-primary/10 transition-colors"
                      >
                        View Wiki Details
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>

                  <div className="p-6 bg-muted/5">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-6 border-b border-border/50 pb-2">Zone Parameters</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-none bg-background/50 border border-border/50 marathon-serial" data-id="REQ-LVL">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Shield className="h-4 w-4 text-primary/70" />
                          <span className="text-xs font-mono uppercase tracking-wider">Required Level</span>
                        </div>
                        <span className="font-mono font-bold text-primary">{zone.requiredLevel !== null ? `${zone.requiredLevel}+` : "None"}</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-none bg-background/50 border border-border/50 marathon-serial" data-id="MAX-PLY">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Users className="h-4 w-4 text-primary/70" />
                          <span className="text-xs font-mono uppercase tracking-wider">Max Players</span>
                        </div>
                        <span className="font-mono font-bold text-primary">{zone.maxPlayers > 0 ? zone.maxPlayers : "Unknown"}</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-none bg-background/50 border border-border/50 marathon-serial" data-id="DUR-EST">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Clock className="h-4 w-4 text-primary/70" />
                          <span className="text-xs font-mono uppercase tracking-wider">Duration</span>
                        </div>
                        <span className="font-mono font-bold text-primary">{zone.duration || "Unknown"}</span>
                      </div>

                      {zone.ante && (
                        <div className="flex items-center justify-between p-3 rounded-none bg-background/50 border border-border/50 marathon-serial" data-id="ENT-FEE">
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <Coins className="h-4 w-4 text-yellow-500" />
                            <span className="text-xs font-mono uppercase tracking-wider">Entry Ante</span>
                          </div>
                          <span className="font-mono font-bold text-yellow-500">{zone.ante.toLocaleString()} CR</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16">
          <h2 className="text-2xl font-bold uppercase tracking-wider text-primary mb-6">Map Resources</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="rounded-none border-border/50 bg-background/80 backdrop-blur">
              <CardHeader className="border-b border-border/50 pb-4">
                <CardTitle className="text-lg uppercase tracking-wider text-foreground">Keys by Zone</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground font-mono">
                  Each zone has unique keys and clearance codes required for locked doors and containers. Check the{" "}
                  <a
                    href="https://marathonthegame.fandom.com/wiki/Keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-bold"
                  >
                    Keys page
                  </a>{" "}
                  for zone-specific key locations.
                </p>
              </CardContent>
            </Card>
            <Card className="rounded-none border-border/50 bg-background/80 backdrop-blur">
              <CardHeader className="border-b border-border/50 pb-4">
                <CardTitle className="text-lg uppercase tracking-wider text-foreground">Lockdown Zones</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground font-mono">
                  High-value areas with increased danger and better loot. Learn the{" "}
                  <a
                    href="https://marathonthegame.fandom.com/wiki/Lockdown_Zones"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-bold"
                  >
                    Lockdown Zone
                  </a>{" "}
                  layouts and extraction routes before going in.
                </p>
              </CardContent>
            </Card>
            <Card className="rounded-none border-border/50 bg-background/80 backdrop-blur">
              <CardHeader className="border-b border-border/50 pb-4">
                <CardTitle className="text-lg uppercase tracking-wider text-foreground">Containers & Loot</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground font-mono">
                  Container spawn locations and loot tables vary by zone. The{" "}
                  <a
                    href="https://marathonthegame.fandom.com/wiki/Containers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-bold"
                  >
                    Containers page
                  </a>{" "}
                  covers container types and priority vs. salvage loot.
                </p>
              </CardContent>
            </Card>
            <Card className="rounded-none border-border/50 bg-background/80 backdrop-blur">
              <CardHeader className="border-b border-border/50 pb-4">
                <CardTitle className="text-lg uppercase tracking-wider text-foreground">Terminals & Audiologs</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground font-mono">
                  Terminals provide lore and contract information. Audiologs contain story fragments. Find all locations on the{" "}
                  <a
                    href="https://marathonthegame.fandom.com/wiki/Terminals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-bold"
                  >
                    Terminals
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://marathonthegame.fandom.com/wiki/Audiologs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-bold"
                  >
                    Audiologs
                  </a>{" "}
                  pages.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
