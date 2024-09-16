import { AoiFunction, ArgsType } from "aoitelegram"
import { createCanvas } from "@napi-rs/canvas"

export default new AoiFunction({
    name: "$createCanvas",
    brackets: true,
    fields: [
        {
            name: "Width",
            type: [ArgsType.Number],
            required: true,
            rest: false
        },{
            name: "Height",
            type: [ArgsType.Number],
            required: true,
            rest: false
        },{
            name: "Canvas Name",
            required: false
        }
    ],
    async callback(ctx, fn) {
        let [width, height, name] = await fn.resolveFields(ctx);
        name ||= "canvas";

        const canvas = createCanvas(width, height)
        ctx.variable.set(name, canvas)

        return fn.resolve(ctx.variable.has(name))
    }
})