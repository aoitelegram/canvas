import { AoiFunction, ArgsType } from "aoitelegram"
import type { Canvas } from "@napi-rs/canvas"

/**
 * Draws a circular arc in the current path.
 */
export default new AoiFunction({
    name: "$renderArc",
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
            name: "Radius",
            type: [ArgsType.Number],
            required: true,
            rest: false
        },
        {
            name: "Start Angle",
            type: [ArgsType.Number],
            required: true,
            rest: false
        },
        {
            name: "End Angle",
            type: [ArgsType.Number],
            required: true,
            rest: false
        },
        {
            name: "Counter Clockwise",
            type: [ArgsType.Boolean],
            rest: false
        }
    ],
    async callback(ctx, func) {
        let [canvasName, x, y, radius, startAngle, endAngle, counterClockwise] = await func.resolveFields(ctx);
        
        if (!ctx.variable.has(canvasName)) {
            return func.reject("No canvas to draw a circular arc in.")
        }

        const canvas = ctx.variable.get(canvasName) as Canvas
        const context = canvas.getContext("2d")
        context.arc(x, y, radius, startAngle, endAngle, counterClockwise)

        return func.resolve()
    }
})