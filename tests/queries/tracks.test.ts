import { HTTPCache } from "apollo-datasource-rest";
import { server } from "../../src/server";
import { Tracks } from "../lib/generated/graphql-documents";

const fetch = jest.spyOn(HTTPCache.prototype, "fetch");

describe("tracks", () => {
  it("トラック一覧を取得できる", async () => {
    const res = await server.executeOperation({ query: Tracks });

    expect(res).toMatchSnapshot();
  });

  it("/tracks エンドポイントを叩く", async () => {
    const res = await server.executeOperation({ query: Tracks });

    expect(fetch).toHaveBeenCalledTimes(2);
    const reqs = fetch.mock.calls.map(([req]) => req);
    const urls = reqs.map((req) => new URL(req.url));
    expect(urls[0].pathname).toContain("/tracks");
  });

  it("author_id でフィルタできる", async () => {
    const res = await server.executeOperation({
      query: Tracks,
      variables: { authorId: "cat-1" },
    });

    expect(fetch).toHaveBeenCalledTimes(2);
    const reqs = fetch.mock.calls.map(([req]) => req);
    const urls = reqs.map((req) => new URL(req.url));
    expect(urls[0].search).toContain("author_id=cat-1");
  });
});
