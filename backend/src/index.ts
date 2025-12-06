import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { autoload } from "elysia-autoload";

const app = new Elysia()
  .use(cors())
  .use(await autoload({
    types: {
      useExport: true
    }
  }))

await app.modules


app.listen(3000, () => {
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}\n${app.routes.map((x) => x.path).join("\n")}`
  );
});

export type App = typeof app;