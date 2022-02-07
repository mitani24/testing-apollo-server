import { HTTPCache } from "apollo-datasource-rest";
import { UserInputError } from "apollo-server";
import { server } from "../../src/server";
import { Track } from "../lib/generated/graphql-documents";

const fetch = jest.spyOn(HTTPCache.prototype, "fetch");

describe("track", () => {
  it("トラックを取得できる", async () => {
    const res = await server.executeOperation({
      query: Track,
      variables: { trackId: "track-1" },
    });

    expect(res).toMatchSnapshot();
  });

  it("/tracks/<track_id> エンドポイントを叩く", async () => {
    const res = await server.executeOperation({
      query: Track,
      variables: { trackId: "track-1" },
    });

    expect(fetch).toHaveBeenCalledTimes(2);
    const reqs = fetch.mock.calls.map(([req]) => req);
    const urls = reqs.map((req) => new URL(req.url));
    expect(urls[0].pathname).toContain("/tracks/track-1");
  });

  it("track_id 未指定だとエラーが返る", async () => {
    const res = await server.executeOperation({
      query: Track,
    });

    expect(res.errors).toHaveLength(1);
    expect(res.errors[0]).toBeInstanceOf(UserInputError);
  });
});
