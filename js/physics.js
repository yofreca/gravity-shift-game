// Physics Manager - Handles gravity and physics interactions
class PhysicsManager {
    constructor(scene) {
        this.scene = scene;
        this.currentGravity = { ...CONFIG.GRAVITY_DIRECTIONS.DOWN };
        this.gravityMagnitude = CONFIG.GRAVITY;
    }

    init() {
        // Set initial gravity
        this.setGravity(CONFIG.GRAVITY_DIRECTIONS.DOWN);
    }

    setGravity(direction) {
        this.currentGravity = { ...direction };

        // Update Matter.js gravity
        this.scene.matter.world.setGravity(
            direction.x * this.gravityMagnitude,
            direction.y * this.gravityMagnitude
        );

        // Emit gravity change event
        this.scene.events.emit('gravityChanged', direction);
    }

    getGravityDirection() {
        return this.currentGravity;
    }

    handleGravityInput() {
        const cursors = this.scene.cursors;
        const keys = this.scene.keys;

        // Check for gravity change input
        if (Phaser.Input.Keyboard.JustDown(cursors.up) ||
            Phaser.Input.Keyboard.JustDown(keys.W)) {
            this.setGravity(CONFIG.GRAVITY_DIRECTIONS.UP);
            this.scene.sound.play('gravityChange', { volume: 0.3 });
        } else if (Phaser.Input.Keyboard.JustDown(cursors.down) ||
                   Phaser.Input.Keyboard.JustDown(keys.S)) {
            this.setGravity(CONFIG.GRAVITY_DIRECTIONS.DOWN);
            this.scene.sound.play('gravityChange', { volume: 0.3 });
        } else if (Phaser.Input.Keyboard.JustDown(cursors.left) ||
                   Phaser.Input.Keyboard.JustDown(keys.A)) {
            this.setGravity(CONFIG.GRAVITY_DIRECTIONS.LEFT);
            this.scene.sound.play('gravityChange', { volume: 0.3 });
        } else if (Phaser.Input.Keyboard.JustDown(cursors.right) ||
                   Phaser.Input.Keyboard.JustDown(keys.D)) {
            this.setGravity(CONFIG.GRAVITY_DIRECTIONS.RIGHT);
            this.scene.sound.play('gravityChange', { volume: 0.3 });
        }
    }

    createStaticBody(x, y, width, height, surfaceType = 'NORMAL') {
        const surface = CONFIG.SURFACES[surfaceType];

        const body = this.scene.matter.add.rectangle(
            x, y, width, height,
            {
                isStatic: true,
                friction: surface.friction,
                restitution: surface.restitution || CONFIG.RESTITUTION,
                label: 'platform'
            }
        );

        // Create visual representation
        const graphics = this.scene.add.graphics();
        graphics.fillStyle(surface.color);
        graphics.fillRect(x - width / 2, y - height / 2, width, height);

        return { body, graphics, surfaceType };
    }
}
