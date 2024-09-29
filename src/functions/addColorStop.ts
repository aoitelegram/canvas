import { AoiFunction, ArgsType } from "aoitelegram"

/**
 * Adds a cubic bezier curve to the currect path.
 */
export default new AoiFunction({
    name: "$addColorStop",
    brackets: true,
    fields: [        
        {
            name: "Gradient Name",
            type: [ArgsType.String],
            required: true,
            rest: false
        },
        {
            name: "Offset",
            type: [ArgsType.Number],
            required: true,
            rest: false
        },
        {
            name: "Color",
            type: [ArgsType.Number],
            required: true,
            rest: false
        }
    ],
    async callback(ctx, func) {
        const [gradientName, offset, color] = await func.resolveFields(ctx);
        const gradient = ctx.variable.get(gradientName) as CanvasGradient
        
        gradient.addColorStop(offset, color)

        return func.resolve()
    }
})