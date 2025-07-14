import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  uid: string;
}

export interface GraphQLContext {
  uid?: string;
}
