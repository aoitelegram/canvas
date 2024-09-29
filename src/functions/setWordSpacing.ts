import { AoiFunction, ArgsType } from "aoitelegram"
import type { Canvas } from "@napi-rs/canvas"

/**
 * Turns the current or given path into the current clipping region.
 */
export default new AoiFunction({
    name: "$setWordSpacing",
    brackets: true,
    fields: [
        {
            name: "Canvas Name",
            type: [ArgsType.String],
            required: true,
            rest: false
        },
        {
            name: "Amount",
            type: [ArgsType.Number],
            required: true,
            rest: false
        }
    ],
    async callback(ctx, func) {
        const [canvasName, amount] = await func.resolveFields(ctx);
        
        if (!ctx.variable.has(canvasName)) {
            return func.reject("No canvas to clip.")
        }

        const canvas = ctx.variable.get(canvasName) as Canvas
        const context = canvas.getContext("2d")
        
        context.wordSpacing = `${amount}px`

        return func.resolve()
    }
})