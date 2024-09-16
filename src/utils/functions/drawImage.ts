import { Image, loadImage, SKRSContext2D } from "@napi-rs/canvas"

export default async function(ctx: SKRSContext2D, image: string | URL | Image | Buffer | ArrayBufferLike | Uint8Array, x: number, y: number, width?: number, height?: number, radius?: number | number[]) {
    image = await loadImage(image, { maxRedirects: 30 });
    width ??= image.width;
    height ??= image.height;

    if (!radius) return ctx.drawImage(image, x, y, width, height);

    ctx.save()
    ctx.beginPath()
    ctx.roundRect(x, y, width, height, radius)
    ctx.clip()
    ctx.drawImage(image, x, y, width, height)
    ctx.restore()
}