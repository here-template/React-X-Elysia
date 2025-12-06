import { Elysia } from "elysia";
import { demo } from "./modules/demo";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .use(demo)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
