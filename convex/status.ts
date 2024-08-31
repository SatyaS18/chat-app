import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {
    clerkId: v.string(),
  },
  async handler(context, { clerkId }) {
    const user = await context.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  },
});

export const update = mutation({
  args: {
    clerkId: v.string(),
    status: v.string(),
  },
  async handler(context, { clerkId, status }) {
    const user = await context.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await context.db.patch(user._id, { status });

    return { success: true };
  },
});
