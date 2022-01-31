import fs from "fs";
import path from "path";
import { gql } from "apollo-server";

const schema = fs
  .readFileSync(path.join(__dirname, "../schema.graphql"))
  .toString();

export const typeDefs = gql`
  ${schema}
`;
