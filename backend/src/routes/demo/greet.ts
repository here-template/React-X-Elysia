import type { App } from "../../index";
import { t } from "elysia";

export default (app: App) =>
    app.get(
        "",
        async ({ query }: { query: { name?: string } }) => {
            return {
                message: `Hello ${query.name}!`,
                from: "Elysia Backend"
            }
        }, {
        query: t.Object({
            name: t.Optional(t.String())
        }),
        response: t.Object({
            message: t.String(),
            from: t.String()
        })
    })