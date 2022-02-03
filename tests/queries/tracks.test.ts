import { server } from "../../src/server";
import { Tracks } from "../lib/generated/graphql-documents";

describe("tracks", () => {
  it("tracks を取得する", async () => {
    const res = await server.executeOperation({ query: Tracks });
    expect(res).toMatchSnapshot();
  });
});
