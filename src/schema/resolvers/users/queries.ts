import { AuthenticationError } from "apollo-server-core";
import { prisma } from "../../../prisma";
import { GraphQLContext } from "../../../types/store";

export const userQueries = {
  getUserById: async (_: any, args: { id: string }) => {
    return await prisma.user.findUnique({ where: { id: args.id } });
  },
  getUser: async (_: any, args: {}, ctx: GraphQLContext) => {
    if (!ctx.user) {
      throw new AuthenticationError("Not authenticated");
    }
    return await prisma.user.findUnique({ where: { id: ctx.user.id } });
  },
};
