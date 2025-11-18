// Main Game Scene
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.player = null;
        this.physicsManager = null;
        this.levelManager = null;
        this.currentLevelIndex = 0;
        this.starsCollected = 0;
        this.totalStars = 0;
        this.timer = 0;
        this.levelComplete = false;

        // Completion UI elements
        this.completionText = null;
        this.completionStats = null;
        this.completionNextText = null;
    }

    preload() {
        // Preload assets here (currently using graphics)
    }

    create() {
        // Initialize managers
        this.physicsManager = new PhysicsManager(this);
        this.levelManager = new LevelManager(this);

        // Setup input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = {
            W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            R: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R),
            SPACE: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        };

        // Initialize physics
        this.physicsManager.init();

        // Create HUD
        this.createHUD();

        // Load first level
        this.loadCurrentLevel();

        // Setup event listeners
        this.events.on('levelComplete', this.onLevelComplete, this);
        this.events.on('starCollected', this.onStarCollected, this);

        // Debug: Log when SPACE is pressed
        this.keys.SPACE.on('down', () => {
            console.log('⌨️ SPACE key detected! levelComplete:', this.levelComplete);
        });
    }

    createHUD() {
        const padding = 20;

        // Level info
        this.levelText = this.add.text(padding, padding, 'Level: 1-1', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        });

        // Stars counter
        this.starsText = this.add.text(padding, padding + 30, 'Stars: 0/0', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#F1C40F',
            stroke: '#000000',
            strokeThickness: 3
        });

        // Timer
        this.timerText = this.add.text(CONFIG.WIDTH - padding, padding, 'Time: 0.0s', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(1, 0);

        // Instructions
        this.instructionsText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT - padding,
            'Use ARROW KEYS ↑↓←→ to control GRAVITY | R: Restart', {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#FFFF00',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5, 1);

        // Gravity indicator (LARGE and prominent)
        this.gravityIndicator = this.add.text(CONFIG.WIDTH / 2, padding, '↓ GRAVITY', {
            fontSize: '48px',
            fontFamily: 'Arial',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5, 0);

        // Listen for gravity changes
        this.events.on('gravityChanged', this.updateGravityIndicator, this);
    }

    updateGravityIndicator(direction) {
        const arrows = {
            '0,1': '↓ DOWN',
            '0,-1': '↑ UP',
            '-1,0': '← LEFT',
            '1,0': '→ RIGHT'
        };

        const key = `${direction.x},${direction.y}`;
        this.gravityIndicator.setText(arrows[key] || '? UNKNOWN');

        // Flash effect when gravity changes
        this.gravityIndicator.setScale(1.2);
        this.gravityIndicator.setTint(0x00FF00);

        this.tweens.add({
            targets: this.gravityIndicator,
            scale: 1,
            duration: 200,
            ease: 'Back.out'
        });

        this.tweens.add({
            targets: this.gravityIndicator,
            duration: 200,
            onComplete: () => {
                this.gravityIndicator.clearTint();
            }
        });
    }

    loadCurrentLevel() {
        // Clear completion UI from previous level
        this.clearCompletionUI();

        // Get level data
        const levelData = this.getLevelData(this.currentLevelIndex);

        // Load level
        const startPos = this.levelManager.loadLevel(levelData);

        // Create or reset player
        if (this.player) {
            this.player.destroy();
        }

        this.player = new Player(this, startPos.x, startPos.y);

        // Reset level state
        this.starsCollected = 0;
        this.totalStars = this.levelManager.getTotalStars();
        this.timer = 0;
        this.levelComplete = false;

        // Update HUD
        this.levelText.setText(`Level: ${levelData.levelId}`);
        this.starsText.setText(`Stars: 0/${this.totalStars}`);
        this.timerText.setText('Time: 0.0s');
    }

    getLevelData(index) {
        // Return test levels for now
        const testLevels = [
            {
                levelId: '1-1',
                world: 1,
                level: 1,
                name: 'First Steps',
                startPosition: { x: 100, y: 100 },
                goalPosition: { x: 700, y: 500 },
                stars: [
                    { x: 300, y: 200 },
                    { x: 500, y: 300 }
                ],
                platforms: [
                    { type: 'normal', x: 0, y: 580, width: 800, height: 20 },
                    { type: 'normal', x: 0, y: 0, width: 20, height: 600 },
                    { type: 'normal', x: 780, y: 0, width: 20, height: 600 },
                    { type: 'normal', x: 0, y: 0, width: 800, height: 20 },
                    { type: 'normal', x: 200, y: 400, width: 200, height: 20 }
                ],
                hazards: []
            },
            {
                levelId: '1-2',
                world: 1,
                level: 2,
                name: 'Ice Slide',
                startPosition: { x: 100, y: 100 },
                goalPosition: { x: 700, y: 100 },
                stars: [
                    { x: 400, y: 300 },
                    { x: 600, y: 450 }
                ],
                platforms: [
                    { type: 'normal', x: 0, y: 580, width: 800, height: 20 },
                    { type: 'normal', x: 0, y: 0, width: 20, height: 600 },
                    { type: 'normal', x: 780, y: 0, width: 20, height: 600 },
                    { type: 'normal', x: 0, y: 0, width: 800, height: 20 },
                    { type: 'ice', x: 150, y: 200, width: 500, height: 20 },
                    { type: 'normal', x: 50, y: 150, width: 100, height: 20 },
                    { type: 'normal', x: 650, y: 150, width: 100, height: 20 }
                ],
                hazards: [
                    { type: 'spikes', x: 300, y: 560, width: 200, height: 20 }
                ]
            },
            {
                levelId: '1-3',
                world: 1,
                level: 3,
                name: 'Gravity Maze',
                startPosition: { x: 100, y: 500 },
                goalPosition: { x: 700, y: 100 },
                stars: [
                    { x: 400, y: 300 },
                    { x: 650, y: 500 },
                    { x: 150, y: 200 }
                ],
                platforms: [
                    { type: 'normal', x: 0, y: 580, width: 800, height: 20 },
                    { type: 'normal', x: 0, y: 0, width: 20, height: 600 },
                    { type: 'normal', x: 780, y: 0, width: 20, height: 600 },
                    { type: 'normal', x: 0, y: 0, width: 800, height: 20 },
                    { type: 'normal', x: 50, y: 450, width: 200, height: 20 },
                    { type: 'normal', x: 350, y: 350, width: 100, height: 20 },
                    { type: 'sticky', x: 550, y: 450, width: 200, height: 20 },
                    { type: 'normal', x: 100, y: 250, width: 150, height: 20 },
                    { type: 'bounce', x: 500, y: 150, width: 100, height: 20 },
                    { type: 'normal', x: 650, y: 150, width: 100, height: 20 }
                ],
                hazards: [
                    { type: 'spikes', x: 300, y: 560, width: 100, height: 20 },
                    { type: 'spikes', x: 500, y: 560, width: 100, height: 20 }
                ]
            }
        ];

        return testLevels[index % testLevels.length];
    }

    update(time, delta) {
        // Handle next level (must be before levelComplete check)
        if (this.levelComplete) {
            if (Phaser.Input.Keyboard.JustDown(this.keys.SPACE)) {
                console.log('🎮 SPACE pressed! Moving to next level...');
                this.nextLevel();
                return;
            }
            // Don't update game logic if level is complete
            return;
        }

        // Handle gravity input
        this.physicsManager.handleGravityInput();

        // Update player
        if (this.player) {
            this.player.update();
        }

        // Check collisions
        const collision = this.levelManager.checkCollisions(this.player);
        if (collision === 'hazard') {
            this.player.die();
        }

        // Update timer
        this.timer += delta / 1000;
        this.timerText.setText(`Time: ${this.timer.toFixed(1)}s`);

        // Handle restart
        if (Phaser.Input.Keyboard.JustDown(this.keys.R)) {
            this.loadCurrentLevel();
        }
    }

    onStarCollected() {
        this.starsCollected = this.levelManager.getStarsCollected();
        this.starsText.setText(`Stars: ${this.starsCollected}/${this.totalStars}`);
    }

    onLevelComplete() {
        if (this.levelComplete) return;

        this.levelComplete = true;
        console.log('🎉 Level Complete! Press SPACE to continue...');

        // Show completion message
        this.completionText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2,
            'Level Complete!', {
            fontSize: '48px',
            fontFamily: 'Arial',
            color: '#2ECC71',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.completionStats = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2 + 60,
            `Time: ${this.timer.toFixed(2)}s | Stars: ${this.starsCollected}/${this.totalStars}`, {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.completionNextText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2 + 100,
            'Press SPACE for next level', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Pulsing animation
        this.tweens.add({
            targets: this.completionText,
            scale: 1.1,
            duration: 500,
            yoyo: true,
            repeat: -1
        });
    }

    clearCompletionUI() {
        // Destroy completion text elements
        if (this.completionText) {
            this.completionText.destroy();
            this.completionText = null;
        }
        if (this.completionStats) {
            this.completionStats.destroy();
            this.completionStats = null;
        }
        if (this.completionNextText) {
            this.completionNextText.destroy();
            this.completionNextText = null;
        }
    }

    nextLevel() {
        this.currentLevelIndex++;
        this.loadCurrentLevel();
    }
}
