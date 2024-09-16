import { AoiFunction, ArgsType } from "aoitelegram"
import type { Canvas } from "@napi-rs/canvas"

/**
 * Erase the pixels in a rectangular area by setting them to transparent black.
 */
export default new AoiFunction({
    name: "$clearRect",
    brackets: true,
    fields: [
        {
            name: "Canvas Name",
            type: [ArgsType.String],
            required: true,
            rest: false
        },
        {
            name: "X",
            type: [ArgsType.Number],
            required: true,
            rest: false
        },
        {
            name: "Y",
            type: [ArgsType.Number],
            required: true,
            rest: false
        },
        {
            name: "Width",
            type: [ArgsType.Number],
            required: true,
            rest: false
        },
        {
            name: "Height",
            type: [ArgsType.Number],
            required: true,
            rest: false
        }
    ],
    async callback(ctx, func) {
        const [canvasName, x, y, width, height] = await func.resolveFields(ctx);
        
        if (!ctx.variable.has(canvasName)) {
            return func.reject("No canvas to clear rect from.")
        }

        const canvas = ctx.variable.get(canvasName) as Canvas
        const context = canvas.getContext("2d")
        context.clearRect(x, y, width, height)

        return func.resolve()
    }
})