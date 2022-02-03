import { RESTDataSource } from "apollo-datasource-rest";
import { server } from "../../src/server";
import { Tracks } from "../lib/generated/graphql-documents";

describe("tracks", () => {
  it("/tracks エンドポイントが呼ばれる", async () => {
    const get = jest.spyOn(RESTDataSource.prototype, "get");
    get.mockResolvedValueOnce([
      {
        id: "track-0",
        title: "track-0:title",
        author_id: "author-0",
      },
    ]);
    get.mockResolvedValueOnce({
      id: "author-0",
      name: "author-0:name",
    });

    const res = await server.executeOperation({ query: Tracks });
    expect(get.mock.calls.length).toBe(2);
    expect(get.mock.calls[0][0]).toBe("/tracks");
    expect(get.mock.calls[1][0]).toBe("/authors/author-0");
  });
});
