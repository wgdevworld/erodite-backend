import { gql } from "apollo-server-express";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { userTypeDefs } from "./typeDefs/users";

const baseTypeDefs = gql`
  type Query
  type Mutation
`;

export const typeDefs = mergeTypeDefs([baseTypeDefs, userTypeDefs]);
