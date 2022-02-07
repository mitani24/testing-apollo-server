import { mockServer } from "./helpers/mockServer";

beforeAll(() => {
  mockServer.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  mockServer.restoreHandlers();
});

afterAll(() => {
  mockServer.close();
});
