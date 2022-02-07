import { rest } from "msw";
import { setupServer } from "msw/node";

export const mockServer = setupServer(
  rest.all("*", async (req, res, ctx) => {
    const redirectUrl = new URL(req.url);
    redirectUrl.protocol = "http";
    redirectUrl.host = "localhost";
    redirectUrl.port = "4010";
    const redirectReq = { ...req, url: redirectUrl };

    const data = await ctx.fetch(redirectReq);
    const json = await data.json();

    return res(ctx.status(data.status), ctx.json(json));
  })
);
