import { Colors } from "../../classes/Canvas"

/**
 * Resolves the given color.
 * Reference: https://github.com/discordjs/discord.js/blob/a5afc406b965b39a9cc90ef9e0e7a4b460c4e04c/packages/discord.js/src/util/Util.js#L280
 * @param color - ColorResolvable.
 * @returns {number}
 */
export default function(color: Colors | "Random" | "Default" | [red: number, green: number, blue: number] | number | `#${string}`) {
    let resolvedColor: number

    if (typeof color === "string") {
        if (color === "Random") {
            return Math.floor(Math.random() * (0xffffff + 1))
        } else if (color === "Default") {
            return 0
        } else if (/^#?[\da-f]{6}$/i.test(color)) {
            return parseInt(color.replace('#', ''), 16)
        } else {
            resolvedColor = Colors[<keyof typeof Colors>color]
        }
    } else if (Array.isArray(color)) {
        resolvedColor = (color[0] << 16) + (color[1] << 8) + color[2]
    } else {
        resolvedColor = color
    }

    return resolvedColor
}