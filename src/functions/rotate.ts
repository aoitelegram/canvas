import { AoiFunction, ArgsType } from "aoitelegram"
import type { Canvas } from "@napi-rs/canvas"

/**
 * Adds a rotation to the transformation matrix.
 */
export default new AoiFunction({
    name: "$rotate",
    brackets: true,
    fields: [
        {
            name: "Canvas Name",
            type: [ArgsType.String],
            required: true,
            rest: false
        },
        {
            name: "Angle",
            type: [ArgsType.Number],
            required: true,
            rest: false
        }
    ],
    async callback(ctx, func) {
        const [canvasName, angle] = await func.resolveFields(ctx);
        
        if (!ctx.variable.has(canvasName)) {
            return func.reject("No canvas to set the fill style to.")
        }

        const canvas = ctx.variable.get(canvasName) as Canvas
        const context = canvas.getContext("2d")
        
        context.rotate(angle)
        
        return func.resolve()
    }
})