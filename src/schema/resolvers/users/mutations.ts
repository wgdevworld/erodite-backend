import { prisma } from "../../../prisma";
import { GraphQLContext } from "../../../types/store";

export const userMutations = {
  createUser: async (
    _: any,
    args: { email: string; firebaseUid: string },
    ctx: GraphQLContext
  ) => {
    const user = await prisma.user.create({
      data: {
        email: args.email,
        firebaseUid: args.firebaseUid,
      },
    });
    return user;
  },
  getOrCreateUser: async (
    _: any,
    args: { email: string; firebaseUid: string },
    ctx: GraphQLContext
  ) => {
    let user;
    if (ctx.user) {
      user = await prisma.user.findUnique({ where: { id: ctx.user.id } });
    }
    if (!user) {
      user = await prisma.user.create({
        data: { email: args.email, firebaseUid: args.firebaseUid },
      });
    }
    return user;
  },
};
