class kirbyfighter {
	constructor(game) {
		this.game = game;
								//spritesheet, xStart, yStart, width, height, frameCount, frameDuration
		this.Animator = new Animator(ASSET_MANAGER.getAsset("./kirbyFighterWalk.png"), 0, 0, 34.25, 23, 12, 0.1);
		
		this.x = 0;
		this.y = 0;
		this.speed = 75;

	};

	update() {
		this.x += this.speed*this.game.clockTick;
		if (this.x > 1024) this.x = 0;

		
	};

	draw(ctx) {
		this.Animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	}

}