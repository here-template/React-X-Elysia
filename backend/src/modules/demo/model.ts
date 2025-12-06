import { t } from 'elysia'

export const DemoModel = {
    greet: t.Object({
        message: t.String(),
        from: t.String()
    })
}
