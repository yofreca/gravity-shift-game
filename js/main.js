// Main entry point - Initialize Phaser game
const gameConfig = {
    type: Phaser.AUTO,
    width: CONFIG.WIDTH,
    height: CONFIG.HEIGHT,
    parent: 'game-container',
    backgroundColor: '#2C3E50',
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                x: 0,
                y: 1  // Will be overridden by PhysicsManager
            },
            debug: false
        }
    },
    scene: [GameScene]
};

// Create game instance
const game = new Phaser.Game(gameConfig);

// Prevent arrow keys from scrolling the page (but allow SPACE to reach Phaser)
window.addEventListener('keydown', function(e) {
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.code) > -1) {
        e.preventDefault();
    }
    // Don't prevent SPACE - let it through to Phaser
}, false);
