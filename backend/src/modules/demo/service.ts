export abstract class DemoService {
    static async greet(name: string = "World") {
        return {
            message: `Hello ${name}!`,
            from: "Elysia Backend"
        }
    }
}

