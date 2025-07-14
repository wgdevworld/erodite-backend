import { Request, Response, NextFunction, RequestHandler } from "express";
import admin from "firebase-admin";
import { AuthenticatedRequest } from "../types/store";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export const authenticate: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).send("Unauthorized");

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    // @ts-ignore
    req.uid = decoded.uid;
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
};
