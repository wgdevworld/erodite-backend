import { userMutations } from "./mutations";
import { userQueries } from "./queries";

export const userResolvers = {
  Query: {
    ...userQueries,
  },
  Mutation: {
    ...userMutations,
  },
};
