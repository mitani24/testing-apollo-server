import { HTTPCache } from "apollo-datasource-rest";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { server } from "../../src/server";
import { Tracks } from "../lib/generated/graphql-documents";

const mockServer = setupServer(
  rest.all("*", async (req, res, ctx) => {
    const redirectUrl = new URL(req.url);
    redirectUrl.protocol = "http";
    redirectUrl.host = "localhost";
    redirectUrl.port = "4010";
    const redirectReq = { ...req, url: redirectUrl };

    const data = await ctx.fetch(redirectReq);
    const json = await data.json();

    const headers: Record<string, string> = {};
    for (const key of data.headers.keys()) {
      headers[key] = data.headers.get(key);
    }

    return res(ctx.status(data.status), ctx.set(headers), ctx.json(json));
  })
);

beforeAll(() => mockServer.listen({ onUnhandledRequest: "error" }));
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

describe("tracks", () => {
  it("トラック一覧を取得できる", async () => {
    const res = await server.executeOperation({ query: Tracks });
    expect(res).toMatchSnapshot();
  });

  it("author_id でフィルタできる", async () => {
    const fetch = jest.spyOn(HTTPCache.prototype, "fetch");
    const res = await server.executeOperation({
      query: Tracks,
      variables: { authorId: "cat-1" },
    });

    expect(fetch).toHaveBeenCalledTimes(2);
    const reqs = fetch.mock.calls.map(([req]) => req);
    expect(new URL(reqs[0].url).search).toContain("author_id=cat-1");
  });
});
