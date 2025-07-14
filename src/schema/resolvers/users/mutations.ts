import { prisma } from "../../../prisma";

export const userMutations = {
  createUser: async (
    _: any,
    args: { email: string; firebaseUid: string },
    ctx: any
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
