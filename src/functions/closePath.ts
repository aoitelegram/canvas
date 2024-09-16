import { AoiFunction, ArgsType } from "aoitelegram"
import type { Canvas } from "@napi-rs/canvas"

/**
 * Attempts to add a straight line from the current point
 * to the start of the current sub-path. If the shape has
 * already been closed or has only one point, this
 * function does nothing.
 */
export default new AoiFunction({
    name: "$closePath",
    brackets: true,
    fields: [
        {
            name: "Canvas Name",
            type: [ArgsType.String],
            required: true,
            rest: false
        }
    ],
    async callback(ctx, func) {
        const [canvasName] = await func.resolveFields(ctx);
        
        if (!ctx.variable.has(canvasName)) {
            return func.reject("No canvas to start a new path in.")
        }

        const canvas = ctx.variable.get(canvasName) as Canvas
        const context = canvas.getContext("2d")
        context.closePath()

        return func.resolve()
    }
})