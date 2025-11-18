// Level Manager - Handles level loading and management
class LevelManager {
    constructor(scene) {
        this.scene = scene;
        this.currentLevel = null;
        this.platforms = [];
        this.hazards = [];
        this.collectibles = [];
        this.portals = [];
        this.goal = null;
        this.lastTeleportTime = 0;
    }

    loadLevel(levelData) {
        this.clearLevel();
        this.currentLevel = levelData;

        // Create platforms
        if (levelData.platforms) {
            levelData.platforms.forEach(platform => {
                this.createPlatform(platform);
            });
        }

        // Create goal
        if (levelData.goalPosition) {
            this.createGoal(levelData.goalPosition.x, levelData.goalPosition.y);
        }

        // Create hazards
        if (levelData.hazards) {
            levelData.hazards.forEach(hazard => {
                this.createHazard(hazard);
            });
        }

        // Create stars
        if (levelData.stars) {
            levelData.stars.forEach(star => {
                this.createStar(star.x, star.y);
            });
        }

        // Create portals
        if (levelData.portals) {
            levelData.portals.forEach((portal, index) => {
                this.createPortal(portal.x, portal.y, index);
            });
        }

        return levelData.startPosition;
    }

    createPlatform(platformData) {
        const x = platformData.x + platformData.width / 2;
        const y = platformData.y + platformData.height / 2;
        const surfaceType = platformData.type.toUpperCase();

        const platform = this.scene.physicsManager.createStaticBody(
            x, y,
            platformData.width,
            platformData.height,
            surfaceType
        );

        this.platforms.push(platform);
    }

    createGoal(x, y) {
        const size = 40;

        // Create goal body (sensor)
        this.goal = {
            body: this.scene.matter.add.rectangle(
                x, y, size, size,
                {
                    isStatic: true,
                    isSensor: true,
                    label: 'goal'
                }
            ),
            graphics: null,
            particles: null
        };

        // Create goal visuals
        const graphics = this.scene.add.graphics();
        graphics.fillStyle(CONFIG.GOAL_COLOR, 1);
        graphics.fillRect(x - size / 2, y - size / 2, size, size);

        // Add glow effect
        graphics.lineStyle(4, CONFIG.GOAL_COLOR, 0.5);
        graphics.strokeRect(x - size / 2 - 2, y - size / 2 - 2, size + 4, size + 4);

        this.goal.graphics = graphics;

        // Pulsing animation
        this.scene.tweens.add({
            targets: graphics,
            alpha: 0.6,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
    }

    createHazard(hazardData) {
        const x = hazardData.x + hazardData.width / 2;
        const y = hazardData.y + hazardData.height / 2;

        let hazard = {
            body: this.scene.matter.add.rectangle(
                x, y,
                hazardData.width,
                hazardData.height,
                {
                    isStatic: true,
                    isSensor: true,
                    label: 'hazard'
                }
            ),
            graphics: null,
            type: hazardData.type
        };

        // Create visuals based on type
        const graphics = this.scene.add.graphics();

        if (hazardData.type === 'spikes') {
            graphics.fillStyle(CONFIG.HAZARDS.SPIKE);
            // Draw spikes
            const spikeCount = Math.floor(hazardData.width / 20);
            for (let i = 0; i < spikeCount; i++) {
                const spikeX = hazardData.x + i * 20 + 10;
                const spikeY = hazardData.y;
                graphics.fillTriangle(
                    spikeX - 10, spikeY + hazardData.height,
                    spikeX, spikeY,
                    spikeX + 10, spikeY + hazardData.height
                );
            }
        } else if (hazardData.type === 'reset_zone') {
            graphics.fillStyle(CONFIG.HAZARDS.RESET_ZONE, 0.5);
            graphics.fillRect(hazardData.x, hazardData.y, hazardData.width, hazardData.height);
        }

        hazard.graphics = graphics;
        this.hazards.push(hazard);
    }

    createStar(x, y) {
        const star = {
            body: this.scene.matter.add.circle(
                x, y, 12,
                {
                    isStatic: true,
                    isSensor: true,
                    label: 'star'
                }
            ),
            sprite: null,
            collected: false
        };

        // Create star visual
        const graphics = this.scene.add.graphics();
        graphics.fillStyle(CONFIG.COLLECTIBLES.STAR);

        // Draw 5-point star
        const points = [];
        const outerRadius = 12;
        const innerRadius = 6;

        for (let i = 0; i < 5; i++) {
            const outerAngle = (i * 72 - 90) * Math.PI / 180;
            const innerAngle = (i * 72 - 90 + 36) * Math.PI / 180;

            points.push(x + Math.cos(outerAngle) * outerRadius);
            points.push(y + Math.sin(outerAngle) * outerRadius);
            points.push(x + Math.cos(innerAngle) * innerRadius);
            points.push(y + Math.sin(innerAngle) * innerRadius);
        }

        graphics.fillPoints(points, true);
        star.sprite = graphics;

        // Rotation animation
        this.scene.tweens.add({
            targets: graphics,
            angle: 360,
            duration: 3000,
            repeat: -1
        });

        this.collectibles.push(star);
    }

    createPortal(x, y, index) {
        const radius = CONFIG.PORTAL.RADIUS;
        const color = index % 2 === 0 ? CONFIG.PORTAL.COLOR_A : CONFIG.PORTAL.COLOR_B;

        const portal = {
            body: this.scene.matter.add.circle(
                x, y, radius,
                {
                    isStatic: true,
                    isSensor: true,
                    label: 'portal'
                }
            ),
            graphics: null,
            index: index,
            x: x,
            y: y
        };

        // Create portal visual (circular with glow)
        const graphics = this.scene.add.graphics();

        // Outer glow
        graphics.fillStyle(color, 0.3);
        graphics.fillCircle(x, y, radius + 8);

        // Main portal
        graphics.fillStyle(color, 0.8);
        graphics.fillCircle(x, y, radius);

        // Inner bright circle
        graphics.fillStyle(CONFIG.PORTAL.GLOW_COLOR, 0.5);
        graphics.fillCircle(x, y, radius / 2);

        portal.graphics = graphics;

        // Pulsing animation
        this.scene.tweens.add({
            targets: graphics,
            alpha: 0.7,
            scale: 1.1,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.portals.push(portal);
    }

    clearLevel() {
        // Destroy all platforms
        this.platforms.forEach(platform => {
            if (platform.graphics) platform.graphics.destroy();
            if (platform.body) this.scene.matter.world.remove(platform.body);
        });
        this.platforms = [];

        // Destroy all hazards
        this.hazards.forEach(hazard => {
            if (hazard.graphics) hazard.graphics.destroy();
            if (hazard.body) this.scene.matter.world.remove(hazard.body);
        });
        this.hazards = [];

        // Destroy collectibles
        this.collectibles.forEach(item => {
            if (item.sprite) item.sprite.destroy();
            if (item.body) this.scene.matter.world.remove(item.body);
        });
        this.collectibles = [];

        // Destroy portals
        this.portals.forEach(portal => {
            if (portal.graphics) portal.graphics.destroy();
            if (portal.body) this.scene.matter.world.remove(portal.body);
        });
        this.portals = [];

        // Destroy goal
        if (this.goal) {
            if (this.goal.graphics) this.goal.graphics.destroy();
            if (this.goal.body) this.scene.matter.world.remove(this.goal.body);
            this.goal = null;
        }
    }

    checkCollisions(player) {
        // Check portal collisions (with cooldown to prevent loops)
        const currentTime = this.scene.time.now;
        if (currentTime - this.lastTeleportTime > CONFIG.PORTAL.TELEPORT_COOLDOWN) {
            for (let i = 0; i < this.portals.length; i++) {
                const portal = this.portals[i];
                if (this.scene.matter.overlap(player.ball, [portal.body])) {
                    // Find paired portal (even pairs with odd, odd pairs with even)
                    const pairedIndex = portal.index % 2 === 0 ? portal.index + 1 : portal.index - 1;
                    const pairedPortal = this.portals.find(p => p.index === pairedIndex);

                    if (pairedPortal) {
                        this.teleportPlayer(player, pairedPortal);
                        this.lastTeleportTime = currentTime;
                        return 'portal';
                    }
                }
            }
        }

        // Check goal collision
        if (this.goal && this.scene.matter.overlap(player.ball, [this.goal.body])) {
            this.scene.events.emit('levelComplete');
            return 'goal';
        }

        // Check hazard collisions
        const hazardBodies = this.hazards.map(h => h.body);
        if (hazardBodies.length > 0 && this.scene.matter.overlap(player.ball, hazardBodies)) {
            return 'hazard';
        }

        // Check star collisions
        this.collectibles.forEach(star => {
            if (!star.collected && this.scene.matter.overlap(player.ball, [star.body])) {
                this.collectStar(star);
            }
        });

        return null;
    }

    teleportPlayer(player, targetPortal) {
        // Get current velocity
        const velocity = player.ball.velocity;

        // Teleport to target portal
        this.scene.matter.body.setPosition(player.ball, {
            x: targetPortal.x,
            y: targetPortal.y
        });

        // Maintain velocity (important for momentum-based puzzles)
        this.scene.matter.body.setVelocity(player.ball, velocity);

        // Visual effect: flash at exit portal
        this.scene.tweens.add({
            targets: targetPortal.graphics,
            scale: 1.5,
            alpha: 1,
            duration: 100,
            yoyo: true,
            ease: 'Power2'
        });
    }

    collectStar(star) {
        star.collected = true;

        // Collection animation
        this.scene.tweens.add({
            targets: star.sprite,
            scale: 1.5,
            alpha: 0,
            duration: 300,
            onComplete: () => {
                star.sprite.destroy();
                this.scene.matter.world.remove(star.body);
            }
        });

        this.scene.events.emit('starCollected');
    }

    getStarsCollected() {
        return this.collectibles.filter(s => s.collected).length;
    }

    getTotalStars() {
        return this.collectibles.length;
    }
}
