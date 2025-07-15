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
};
