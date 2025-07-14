import { prisma } from "../../../prisma";

export const userQueries = {
  getUser: async (_: any, args: { id: string }) => {
    return await prisma.user.findUnique({ where: { id: args.id } });
  },
};
