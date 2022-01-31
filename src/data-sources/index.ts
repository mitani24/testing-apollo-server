import { Config } from "apollo-server-express";

export type ContextType = {
  dataSources: {};
};

export const dataSources: Config["dataSources"] = () => {
  return {
    // petshopAPI: new PetshopAPI(),
  };
};
