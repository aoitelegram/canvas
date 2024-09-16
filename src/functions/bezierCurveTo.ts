import { AoiFunction, ArgsType } from "aoitelegram"
import type { Canvas } from "@napi-rs/canvas"

/**
 * Adds a cubic bezier curve to the currect path.
 */
export default new AoiFunction({
    name: "$bezierCurveTo",
    brackets: true,
    fields: [
        {
            name: "Canvas Name",
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
            name: "Middle X",
            type: [ArgsType.Number],
            required: true,
            rest: false
        },
        {
            name: "Middle Y",
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
        const [canvasName, startX, startY, middleX, middleY, endX, endY] = await func.resolveFields(ctx);
        
        if (!ctx.variable.has(canvasName)) {
            return func.reject("No canvas to draw the curve on.")
        }

        const canvas = ctx.variable.get(canvasName) as Canvas
        const context = canvas.getContext("2d")
        context.bezierCurveTo(startX, startY, middleX, middleY, endX, endY)

        return func.resolve()
    }
})