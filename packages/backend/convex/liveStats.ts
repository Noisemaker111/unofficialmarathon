import { internalMutation, internalAction, query } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

const MARATHON_STEAM_APP_ID = 3065800;
const MARATHON_TWITCH_GAME = "Marathon";

export const getLiveStats = query({
  args: {},
  returns: v.union(
    v.object({
      _id: v.id("liveStats"),
      _creationTime: v.number(),
      key: v.string(),
      steamPlayers: v.optional(v.number()),
      steamPeak24h: v.optional(v.number()),
      twitchViewers: v.optional(v.number()),
      twitchChannels: v.optional(v.number()),
      season1Peak: v.optional(v.number()),
      serverSlamPeak: v.optional(v.number()),
      updatedAt: v.number(),
    }),
    v.null(),
  ),
  handler: async (ctx) => {
    return await ctx.db
      .query("liveStats")
      .withIndex("by_key", (q) => q.eq("key", "global"))
      .unique();
  },
});

export const upsertLiveStats = internalMutation({
  args: {
    steamPlayers: v.optional(v.number()),
    steamPeak24h: v.optional(v.number()),
    twitchViewers: v.optional(v.number()),
    twitchChannels: v.optional(v.number()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("liveStats")
      .withIndex("by_key", (q) => q.eq("key", "global"))
      .unique();

    const now = Date.now();
    const season1Peak = 88153;
    const serverSlamPeak = 143621;

    if (existing) {
      const nextPeak24h =
        args.steamPlayers !== undefined
          ? Math.max(existing.steamPeak24h ?? 0, args.steamPlayers)
          : existing.steamPeak24h;

      await ctx.db.patch(existing._id, {
        steamPlayers: args.steamPlayers ?? existing.steamPlayers,
        steamPeak24h: nextPeak24h,
        twitchViewers: args.twitchViewers ?? existing.twitchViewers,
        twitchChannels: args.twitchChannels ?? existing.twitchChannels,
        season1Peak,
        serverSlamPeak,
        updatedAt: now,
      });
      return null;
    }

    await ctx.db.insert("liveStats", {
      key: "global",
      steamPlayers: args.steamPlayers,
      steamPeak24h: args.steamPlayers,
      twitchViewers: args.twitchViewers,
      twitchChannels: args.twitchChannels,
      season1Peak,
      serverSlamPeak,
      updatedAt: now,
    });
    return null;
  },
});

export const refreshLiveStats = internalAction({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    let steamPlayers: number | undefined;
    let twitchViewers: number | undefined;
    let twitchChannels: number | undefined;

    try {
      const steamResponse = await fetch(
        `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${MARATHON_STEAM_APP_ID}`,
      );
      if (steamResponse.ok) {
        const steamData = (await steamResponse.json()) as {
          response?: { player_count?: number };
        };
        steamPlayers = steamData.response?.player_count;
      }
    } catch {
      // Steam fetch failed — keep previous values
    }

    const twitchClientId = process.env.TWITCH_CLIENT_ID;
    const twitchClientSecret = process.env.TWITCH_CLIENT_SECRET;
    if (twitchClientId && twitchClientSecret) {
      try {
        const tokenResponse = await fetch(
          `https://id.twitch.tv/oauth2/token?client_id=${encodeURIComponent(twitchClientId)}&client_secret=${encodeURIComponent(twitchClientSecret)}&grant_type=client_credentials`,
          { method: "POST" },
        );

        if (tokenResponse.ok) {
          const tokenData = (await tokenResponse.json()) as { access_token?: string };
          const accessToken = tokenData.access_token;
          if (accessToken) {
            const gameResponse = await fetch(
              `https://api.twitch.tv/helix/games?name=${encodeURIComponent(MARATHON_TWITCH_GAME)}`,
              {
                headers: {
                  "Client-ID": twitchClientId,
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            );

            if (gameResponse.ok) {
              const gameData = (await gameResponse.json()) as {
                data?: Array<{ id: string }>;
              };
              const gameId = gameData.data?.[0]?.id;
              if (gameId) {
                const streamsResponse = await fetch(
                  `https://api.twitch.tv/helix/streams?game_id=${gameId}&first=100`,
                  {
                    headers: {
                      "Client-ID": twitchClientId,
                      Authorization: `Bearer ${accessToken}`,
                    },
                  },
                );
                if (streamsResponse.ok) {
                  const streamsData = (await streamsResponse.json()) as {
                    data?: Array<{ viewer_count: number }>;
                  };
                  const streams = streamsData.data ?? [];
                  twitchChannels = streams.length;
                  twitchViewers = streams.reduce((sum, stream) => sum + stream.viewer_count, 0);
                }
              }
            }
          }
        }
      } catch {
        // Twitch fetch failed — keep previous values
      }
    }

    await ctx.runMutation(internal.liveStats.upsertLiveStats, {
      steamPlayers,
      twitchViewers,
      twitchChannels,
    });
    return null;
  },
});
