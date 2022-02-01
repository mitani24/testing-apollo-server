import { Config } from "apollo-server-express";
import { TrackAPI } from "./track-api";

export type ContextType = {
  dataSources: {
    trackAPI: TrackAPI;
  };
};

export const dataSources: Config["dataSources"] = () => {
  return {
    trackAPI: new TrackAPI(),
  };
};
