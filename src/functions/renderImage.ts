import { type Canvas, loadImage } from "@napi-rs/canvas"
import { AoiFunction, ArgsType } from "aoitelegram"
import drawImage from "@functions/drawImage"

/**
 * Renders an image over the canvas.
 */
export default new AoiFunction({
    name: "$renderImage",
    brackets: true,
    fields: [
        {
            name: "Canvas Name",
            type: [ArgsType.String],
            required: true,
            rest: false
        },
        {
            name: "Path",
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
        },
        {
            name: "Radius",
            type: [ArgsType.Number]
        }
    ],
    async callback(ctx, func) {
        const [canvasName, path, x, y, width, height, radius] = await func.resolveFields(ctx);
        
        if (!ctx.variable.has(canvasName)) {
            return func.reject("No canvas to start a new path in.")
        }

        const canvas = ctx.variable.get(canvasName) as Canvas
        const context = canvas.getContext("2d")
        const image = await loadImage(path).catch((e) => null)
        if (!image) {
            return func.reject("Unable to resolve image path.")
        }

        await drawImage(context, image, x, y, width, height, radius);

        return func.resolve()
    }
})