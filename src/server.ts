import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";
import { authenticate } from "./middleware/auth";
import { AuthenticatedRequest, GraphQLContext } from "./types/store";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { buildContext } from "./context";
import { queryLoggerExtension } from "./middleware/logger";

dotenv.config();

export async function startServer() {
  const app = express();
  app.use(cors());
  // if (process.env.ENV !== "development") {
  app.use(authenticate);
  // }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: buildContext,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground,
      queryLoggerExtension,
    ],
    debug: true,
    formatError: (error) => {
      console.log("[🚨 GraphQL Error]", error);
      return error;
    },
  });

  await server.start();
  // @ts-ignore
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
