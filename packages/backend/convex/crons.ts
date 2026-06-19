import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval("refresh live stats", { minutes: 5 }, internal.liveStats.refreshLiveStats, {});

export default crons;
