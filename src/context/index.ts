import admin from "firebase-admin";

import { prisma } from "../prisma";
import { AuthenticatedRequest, GraphQLContext } from "../types/store";

export const buildContext = async ({
  req,
}: {
  req: AuthenticatedRequest;
}): Promise<GraphQLContext | null> => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return null;

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const user = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
    });

    return user ? { user } : { user: null };
  } catch {
    return null;
  }
};
