class kirbyfighter {
	constructor(game) {
		this.game = game;
								//spritesheet, xStart, yStart, width, height, frameCount, frameDuration
		this.Animator = new Animator(ASSET_MANAGER.getAsset("./kirbyFighterSpritesheet.png"), 136, 10, 34.25, 23, 12, 0.1);
		this.idleAnimator = new Animator(ASSET_MANAGER.getAsset("./kirbyFighterSpritesheet.png"), 12, 10, 28, 22, 1, 1);
		this.jumpAnimator = new Animator(ASSET_MANAGER.getAsset("./kirbyFighterSpritesheet.png"), 132, 78, 36, 35, 12, 0.1); // Updated frameDuration to 0.1

		this.x = 512;
		this.y = 500;
		this.speed = 75;
		this.isMoving = false;
		this.facing = 1; // 1: right, -1: left
		this.velocityY = 0;
		this.gravity = 500; // Updated for synced landing
		this.jumpStrength = 300; // Updated for synced landing
		this.state = 'idle';


	};

	update() {
		this.isMoving = false;
		this.state = 'idle';

		this.velocityY += this.gravity * this.game.clockTick;
		this.y += this.velocityY * this.game.clockTick;

		//hitting the ground
		if (this.y >= 500) {
			this.y = 500;
			this.velocityY = 0;
		}

		if (this.game.keys["ArrowRight"]) {
			this.x += this.speed * this.game.clockTick;
			this.isMoving = true;
			this.facing = 1;
			this.state = 'walking'
		} 
		if (this.game.keys["ArrowLeft"]) {
			this.x -= this.speed * this.game.clockTick;
			this.isMoving = true;
			this.facing = -1;
			this.state = 'walking'
		}
		if (this.game.keys["ArrowUp"] && this.y >= 500) {
			this.velocityY = -this.jumpStrength;
		}
		if (this.game.keys["ArrowDown"]) {
			this.y += this.speed * this.game.clockTick;
			this.isMoving = true;
		}

		//boundary checks
		if (this.x > 1024) this.x = 0;
		if (this.y > 768) this.y = 0;
		if (this.x < 0) this.x = 1024;
		if (this.y < 0) this.y = 768;

		if (this.velocityY !== 0){
			this.isMoving = true;
			this.state = 'jumping';
		}

		
	};

    draw(ctx) {
        ctx.save();
        let animator;
        let widthScale = 1;
        if (this.state === 'jumping') {
            animator = this.jumpAnimator;
            widthScale = 1; // Adjust if jump animation has different scale
        } else if (this.state === 'walking') {
            animator = this.Animator;
        } else {
            animator = this.idleAnimator;
        }

        if (this.facing === -1) {
            ctx.translate(this.x + animator.width * widthScale, this.y);
            ctx.scale(-1, 1);
            animator.drawFrame(this.game.clockTick, ctx, 0, 0);
        } else {
            animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        ctx.restore();
    }

}