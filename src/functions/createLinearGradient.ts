import { AoiFunction, ArgsType } from "aoitelegram"
import type { Canvas } from "@napi-rs/canvas"

/**
 * Creates a gradient along the line connecting two given coordinates.
 */
export default new AoiFunction({
    name: "$createLinearGradient",
    brackets: true,
    fields: [
        {
            name: "Canvas Name",
            type: [ArgsType.String],
            required: true,
            rest: false
        },
        {
            name: "Gradient Name",
            type: [ArgsType.String],
            required: true,
            rest: false
        },
        {
            name: "Start X",
            type: [ArgsType.Number],
            required: true,
            rest: false
        },
        {
            name: "Start Y",
            type: [ArgsType.Number],
            required: true,
            rest: false
        },
        {
            name: "End X",
            type: [ArgsType.Number],
            required: true,
            rest: false
        },
        {
            name: "End Y",
            type: [ArgsType.Number],
            required: true,
            rest: false
        }
    ],
    async callback(ctx, func) {
        const [canvasName, gradientName, startX, startY, endX, endY] = await func.resolveFields(ctx);
        
        if (!ctx.variable.has(canvasName)) {
            return func.reject("No canvas to create a gradient on.")
        }

        const canvas = ctx.variable.get(canvasName) as Canvas
        const context = canvas.getContext("2d")
        const gradient = context.createLinearGradient(startX, startY, endX, endY)

        ctx.variable.set(gradientName, gradient)

        return func.resolve()
    }
})