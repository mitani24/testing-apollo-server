import { ApolloServer } from "apollo-server";
import { typeDefs } from "./type-defs";
import { dataSources } from "./data-sources";
import { resolvers } from "./resolvers";

export const server = new ApolloServer({
  typeDefs,
  dataSources,
  resolvers,
});
