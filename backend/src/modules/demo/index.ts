import { Elysia, t } from 'elysia'
import { DemoService } from './service'
import { DemoModel } from './model'

export const demo = new Elysia({ prefix: '/demo' })
    .get('/greet', async ({ query }: { query: { name?: string } }) => {
        return await DemoService.greet(query.name)
    }, {
        query: t.Object({
            name: t.Optional(t.String())
        }),
        response: DemoModel.greet
    })
