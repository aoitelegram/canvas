import { AoiFunction, ArgsType } from "aoitelegram"
import type { Canvas } from "@napi-rs/canvas"

/**
 * Specifies the color, gradient, or pattern to use inside shapes. The default style is #000 (black).
 */
export default new AoiFunction({
    name: "$setFillStyle",
    brackets: true,
    fields: [
        {
            name: "Canvas Name",
            type: [ArgsType.String],
            required: true,
            rest: false
        },
        {
            name: "Style",
            type: [ArgsType.String],
            required: true,
            rest: false
        }
    ],
    async callback(ctx, func) {
        const [canvasName, style] = await func.resolveFields(ctx);
        
        if (!ctx.variable.has(canvasName)) {
            return func.reject("No canvas to set the fill style to.")
        }

        const canvas = ctx.variable.get(canvasName) as Canvas
        const context = canvas.getContext("2d")
        const fillColor = ctx.variable.get(style) ?? style

        context.fillStyle = fillColor
        
        return func.resolve()
    }
})