import { Request } from "express";
import { User } from "../generated/prisma";

export interface AuthenticatedRequest extends Request {
  uid: string;
}

export interface GraphQLContext {
  user: User | null;
}
