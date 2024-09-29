import { type Canvas, loadImage } from "@napi-rs/canvas"
import { AoiFunction, ArgsType } from "aoitelegram"
import drawImage from "@functions/drawImage"

/**
 * Renders a rectangle that is filled according to the current fillStyle.
 */
export default new AoiFunction({
    name: "$renderRect",
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
            return func.reject("No canvas to start a new path in.")
        }

        const canvas = ctx.variable.get(canvasName) as Canvas
        const context = canvas.getContext("2d")
        
        context.fillRect(x, y, width, height)

        return func.resolve()
    }
})