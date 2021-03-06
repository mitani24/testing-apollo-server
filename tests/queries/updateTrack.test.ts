import { HTTPCache } from "apollo-datasource-rest";
import { UserInputError } from "apollo-server";
import { UpdateTrackBody } from "../../src/data-sources/track-api/types";
import { server } from "../../src/server";
import { UpdateTrack } from "../lib/generated/graphql-documents";
import { UpdateTrackInput } from "../lib/generated/graphql-types";

const fetch = jest.spyOn(HTTPCache.prototype, "fetch");

describe("updateTrack", () => {
  it("トラックが返却される", async () => {
    const input: UpdateTrackInput = {
      id: "track-1",
      title: "test",
    };
    const res = await server.executeOperation({
      query: UpdateTrack,
      variables: { input },
    });

    expect(res).toMatchSnapshot();
  });

  it("/tarcks/<track_id> エンドポイントを叩く", async () => {
    const input: UpdateTrackInput = {
      id: "track-1",
      title: "test",
    };
    const res = await server.executeOperation({
      query: UpdateTrack,
      variables: { input },
    });

    expect(fetch).toHaveBeenCalledTimes(2);
    const reqs = fetch.mock.calls.map(([req]) => req);
    const urls = reqs.map((req) => new URL(req.url));
    expect(reqs[0].method).toBe("PATCH");
    expect(urls[0].pathname).toContain("/tracks/track-1");
  });

  it("Request body に指定したプロパティが含まれる", async () => {
    const input: UpdateTrackInput = {
      id: "track-1",
      title: "test",
      authorId: "cat-1",
      thumbnail: "https://example.com/thumbnail.png",
      length: 100,
      description: "test",
      numberOfViews: 100,
    };
    const res = await server.executeOperation({
      query: UpdateTrack,
      variables: { input },
    });

    expect(fetch).toHaveBeenCalledTimes(2);
    const reqs = fetch.mock.calls.map(([req]) => req);
    const body = await reqs[0].json();
    expect(body).toEqual<UpdateTrackBody>({
      title: "test",
      author_id: "cat-1",
      thumbnail: "https://example.com/thumbnail.png",
      length: 100,
      description: "test",
      number_of_views: 100,
    });
  });

  it("Request body に指定していないプロパティが含まれない", async () => {
    const input: UpdateTrackInput = {
      id: "track-1",
    };
    const res = await server.executeOperation({
      query: UpdateTrack,
      variables: { input },
    });

    expect(fetch).toHaveBeenCalledTimes(2);
    const reqs = fetch.mock.calls.map(([req]) => req);
    const body = await reqs[0].json();
    expect(body).toEqual<UpdateTrackBody>({});
  });

  it("input 未指定だとエラーが返る", async () => {
    const res = await server.executeOperation({
      query: UpdateTrack,
    });

    expect(res.errors).toHaveLength(1);
    expect(res.errors[0]).toBeInstanceOf(UserInputError);
  });
});
