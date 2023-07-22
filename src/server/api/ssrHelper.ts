import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "./root";
import { createInnerTRPCContext } from "./trpc";
import superjson from "superjson";

// Internal router -> https://trpc.io/docs/client/nextjs/server-side-helpers
export const ssrHelper = createServerSideHelpers({
  router: appRouter,
  ctx: createInnerTRPCContext({
    session: null,
  }),
  transformer: superjson, // optional - adds superjson serialization
});
