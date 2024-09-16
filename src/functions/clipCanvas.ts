import { AoiFunction, ArgsType } from "aoitelegram"
import type { Canvas } from "@napi-rs/canvas"

/**
 * Turns the current or given path into the current clipping region.
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
            name: "Fill Rule",
            type: [ArgsType.String]
        }
    ],
    async callback(ctx, func) {
        const [canvasName, rule] = await func.resolveFields(ctx);
        
        if (!ctx.variable.has(canvasName)) {
            return func.reject("No canvas to clip.")
        } else if (rule && !["evenodd", "nonzero"].includes(rule.toLowerCase())) {
            return func.reject("Invalid fill rule.")
        }

        const canvas = ctx.variable.get(canvasName) as Canvas
        const context = canvas.getContext("2d")
        context.clip(rule)

        return func.resolve()
    }
})