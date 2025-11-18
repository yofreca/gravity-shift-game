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
            debug: true, // Enable for physics debugging
            debugBodyColor: 0xff00ff,
            debugShowBody: true,
            debugShowStaticBody: true
        }
    },
    scene: [GameScene]
};

// Create game instance
const game = new Phaser.Game(gameConfig);

// Prevent arrow keys from scrolling the page
window.addEventListener('keydown', function(e) {
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

console.log('🎮 Gravity Shift loaded successfully!');
console.log('Controls:');
console.log('  ↑↓←→ Arrow Keys (or WASD) - Change gravity direction');
console.log('  R - Restart level');
console.log('  SPACE - Next level (when complete)');
