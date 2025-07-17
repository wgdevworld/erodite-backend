import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    firebaseUid: String!
    createdAt: String!
    updatedAt: String!
  }

  extend type Mutation {
    createUser(email: String!, firebaseUid: String!): User!
    getOrCreateUser(email: String!, firebaseUid: String!): User!
  }

  extend type Query {
    getUserById(id: ID!): User
    getUser: User
  }
`;
