// Game configuration
const CONFIG = {
    // Game dimensions
    WIDTH: 800,
    HEIGHT: 600,

    // Physics constants
    GRAVITY: 1, // Matter.js gravity (1 = normal, ~60fps)
    BALL_RADIUS: 15,
    BALL_MASS: 1.0,
    FRICTION: 0.3,
    RESTITUTION: 0.2,

    // Surface properties
    SURFACES: {
        NORMAL: {
            friction: 0.3,
            color: 0x7F8C8D,
            name: 'normal'
        },
        ICE: {
            friction: 0.05,
            color: 0xAED6F1,
            name: 'ice'
        },
        STICKY: {
            friction: 0.9,
            color: 0x7D6608,
            name: 'sticky'
        },
        BOUNCE: {
            friction: 0.3,
            restitution: 1.8,
            color: 0x52BE80,
            name: 'bounce'
        }
    },

    // Hazard colors
    HAZARDS: {
        SPIKE: 0xE74C3C,
        RESET_ZONE: 0xE67E22,
        LASER: 0xFF0000
    },

    // Collectibles
    COLLECTIBLES: {
        STAR: 0xF1C40F,
        TIME_GEM: 0xFFD700
    },

    // Goal
    GOAL_COLOR: 0x2ECC71,

    // Gravity directions
    GRAVITY_DIRECTIONS: {
        DOWN: { x: 0, y: 1 },
        UP: { x: 0, y: -1 },
        LEFT: { x: -1, y: 0 },
        RIGHT: { x: 1, y: 0 }
    }
};
