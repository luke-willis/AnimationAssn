class Background {
    constructor(image) {
        this.image = image;
    }

    update() {
        // No update needed for a static background
    }

    draw(ctx) {
        // Draw the image to fill the entire canvas
        ctx.drawImage(this.image, 0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}