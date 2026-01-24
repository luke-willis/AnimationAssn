const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./windows_xp.jpg");
ASSET_MANAGER.queueDownload("./kirbyFighterSpritesheet.png");


ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    gameEngine.addEntity(new kirbyfighter(gameEngine)); // Add Kirby first

    gameEngine.addEntity(new Background(ASSET_MANAGER.getAsset("./windows_xp.jpg"))); // Add background second

    gameEngine.init(ctx);

    gameEngine.start();
});
