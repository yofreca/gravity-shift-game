// Player Ball - Main controllable object
class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.startX = x;
        this.startY = y;
        this.isAlive = true;

        this.createBall(x, y);
        this.createVisuals();
    }

    createBall(x, y) {
        // Create physics body
        this.ball = this.scene.matter.add.circle(
            x, y,
            CONFIG.BALL_RADIUS,
            {
                friction: CONFIG.FRICTION,
                frictionAir: 0.01,
                restitution: CONFIG.RESTITUTION,
                density: 0.001,
                label: 'player',
                sleepThreshold: -1  // Prevent ball from sleeping
            }
        );
    }

    createVisuals() {
        // Main ball sprite (using graphics for now)
        this.sprite = this.scene.add.circle(
            this.ball.position.x,
            this.ball.position.y,
            CONFIG.BALL_RADIUS,
            0x3498DB
        );

        // Add shine effect
        this.shine = this.scene.add.circle(
            this.ball.position.x - 5,
            this.ball.position.y - 5,
            5,
            0xFFFFFF,
            0.6
        );

        // Add shadow
        this.shadow = this.scene.add.ellipse(
            this.ball.position.x,
            this.ball.position.y + CONFIG.BALL_RADIUS + 3,
            CONFIG.BALL_RADIUS * 1.5,
            CONFIG.BALL_RADIUS * 0.5,
            0x000000,
            0.3
        );
    }

    update() {
        if (!this.isAlive) return;

        // Update sprite position to match physics body
        this.sprite.x = this.ball.position.x;
        this.sprite.y = this.ball.position.y;

        // Update shine position
        this.shine.x = this.ball.position.x - 5;
        this.shine.y = this.ball.position.y - 5;

        // Update shadow position (shadow stays at bottom relative to gravity)
        const gravity = this.scene.physicsManager.getGravityDirection();
        this.shadow.x = this.ball.position.x + gravity.x * (CONFIG.BALL_RADIUS + 3);
        this.shadow.y = this.ball.position.y + gravity.y * (CONFIG.BALL_RADIUS + 3);

        // Check if ball is out of bounds
        this.checkBounds();
    }

    checkBounds() {
        const x = this.ball.position.x;
        const y = this.ball.position.y;

        if (x < -50 || x > CONFIG.WIDTH + 50 ||
            y < -50 || y > CONFIG.HEIGHT + 50) {
            this.die();
        }
    }

    die() {
        if (!this.isAlive) return;

        this.isAlive = false;

        // Death animation
        this.scene.tweens.add({
            targets: this.sprite,
            alpha: 0,
            scale: 0.5,
            duration: 300,
            onComplete: () => {
                this.reset();
            }
        });

        this.scene.tweens.add({
            targets: [this.shine, this.shadow],
            alpha: 0,
            duration: 300
        });
    }

    reset() {
        // Reset position
        this.scene.matter.body.setPosition(this.ball, {
            x: this.startX,
            y: this.startY
        });

        // Reset velocity
        this.scene.matter.body.setVelocity(this.ball, { x: 0, y: 0 });
        this.scene.matter.body.setAngularVelocity(this.ball, 0);

        // Reset visuals
        this.sprite.alpha = 1;
        this.sprite.scale = 1;
        this.shine.alpha = 0.6;
        this.shadow.alpha = 0.3;

        this.isAlive = true;
    }

    getPosition() {
        return {
            x: this.ball.position.x,
            y: this.ball.position.y
        };
    }

    destroy() {
        this.sprite.destroy();
        this.shine.destroy();
        this.shadow.destroy();
        this.scene.matter.world.remove(this.ball);
    }
}
