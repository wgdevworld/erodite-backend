import { ApolloServerPlugin } from "apollo-server-plugin-base";
import { print, getOperationAST } from "graphql";

// explicit plugin signature
export const queryLoggerExtension: () => ApolloServerPlugin<any> = () => ({
  async requestDidStart(requestContext) {
    const { query, variables, operationName } = requestContext.request!;
    console.log("[Inbound GraphQL request]\n▶", query);
    console.log("▶ VARIABLES:", JSON.stringify(variables));
    return {};
  },
});
