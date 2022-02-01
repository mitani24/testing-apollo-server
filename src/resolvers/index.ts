import { ContextType } from "../data-sources";
import { Resolvers } from "../lib/generated/graphql-resolver-types";

export const resolvers: Resolvers<ContextType> = {
  Author: {
    id: ({ id }) => id,
    name: ({ name }) => name,
    photo: ({ photo }) => photo ?? null,
  },
  Mutation: {
    async updateTrack(_, { input }, { dataSources }) {
      const track = await dataSources.trackAPI.updateTrack({
        path: {
          track_id: input.id,
        },
        body: {
          title: input.title ?? undefined,
          description: input.description ?? undefined,
          author_id: input.authorId ?? undefined,
          thumbnail: input.thumbnail ?? undefined,
          length: input.length ?? undefined,
          number_of_views: input.numberOfViews ?? undefined,
        },
      });
      return { track };
    },
  },
  Query: {
    tracks(_, { authorId }, { dataSources }) {
      return dataSources.trackAPI.getTracks({
        query: {
          author_id: authorId ?? undefined,
        },
      });
    },
    track(_, { id }, { dataSources }) {
      return dataSources.trackAPI.getTrack({
        path: {
          track_id: id,
        },
      });
    },
  },
  Track: {
    id: ({ id }) => id,
    title: ({ title }) => title,
    author: ({ author_id }, _, { dataSources }) => {
      return dataSources.trackAPI.getAuthor({
        path: {
          author_id,
        },
      });
    },
    thumbnail: ({ thumbnail }) => thumbnail ?? null,
    length: ({ length }) => length ?? null,
    description: ({ description }) => description ?? null,
    numberOfViews: ({ number_of_views }) => number_of_views ?? null,
  },
  UpdateTrackPayload: {
    track: ({ track }) => track,
  },
};
