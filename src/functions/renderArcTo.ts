import { AoiFunction, ArgsType } from "aoitelegram"
import type { Canvas } from "@napi-rs/canvas"

/**
 * Adds a circular arc to the current path.
 */
export default new AoiFunction({
    name: "$renderArcTo",
    brackets: true,
    fields: [
        {
            name: "Canvas Name",
            type: [ArgsType.String],
            required: true,
            rest: false
        },
        {
            name: "X1",
            type: [ArgsType.Number],
            required: true,
            rest: false
        },
        {
            name: "Y1",
            type: [ArgsType.Number],
            required: true,
            rest: false
        },
        {
            name: "X2",
            type: [ArgsType.Number],
            required: true,
            rest: false
        },
        {
            name: "Y2",
            type: [ArgsType.Number],
            required: true,
            rest: false
        },
        {
            name: "Radius",
            type: [ArgsType.Number],
            required: true,
            rest: false
        }
    ],
    async callback(ctx, func) {
        let [canvasName, x1, y1, x2, y2, radius] = await func.resolveFields(ctx);
        
        if (!ctx.variable.has(canvasName)) {
            return func.reject("No canvas to draw a circular arc in.")
        }

        const canvas = ctx.variable.get(canvasName) as Canvas
        const context = canvas.getContext("2d")
        context.arcTo(x1, y1, x2, y2, radius)

        return func.resolve()
    }
})