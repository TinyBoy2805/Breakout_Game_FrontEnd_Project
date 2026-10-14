const level_briefs = {
    level1:
    {
        target: "Destroy all blocks to complete the level",
        mechanics: [
            {
                name: "Basic Block",
                description: "Break it by hitting it with the ball.",
                image: '../imgs/brick1.png',
                isNew: true
            },
        ]
    },
    level2:
    {
        target: "Adapt to shifting directions and clear all blocks",
        mechanics: [
            {
                name: "Basic Block",
                description: "Break it by hitting it with the ball.",
                image: '../imgs/brick1.png',
                isNew: false,
            },
            {
                name: "Static Wall Block",
                description: "Blocks the ball's path and redirects its trajectory.",
                image: '../imgs/barrier.png',
                isNew: true
            },
        ]
    },
    level3:
    {
        target: "Trigger chain reactions using bomb blocks",
        mechanics: [
            {
                name: "Basic Block",
                description: "Break it by hitting it with the ball.",
                image: '../imgs/brick1.png',
                isNew: false,
            },
            {
                name: "Static Wall Block",
                description: "Blocks the ball's path and redirects its trajectory.",
                image: '../imgs/barrier.png',
                isNew: false
            },
            {
                name: "Bomb Block",
                description: "Explodes on impact, destroying nearby blocks.",
                image: '../imgs/bomb.png',
                isNew: true
            },
            {
                name: "Bomb Spawner Block",
                description: "Spreads bombs that trigger chain reactions.",
                image: '../imgs/bomb_seeder.png',
                isNew: true
            },
        ]
    },
    level4:
    {
        target: "Break through multi-hit reinforced blocks",
        mechanics: [
            {
                name: "Basic Block",
                description: "Break it by hitting it with the ball.",
                image: '../imgs/brick1.png',
                isNew: false,
            },
            {
                name: "Static Wall Block",
                description: "Blocks the ball's path and redirects its trajectory.",
                image: '../imgs/barrier.png',
                isNew: false
            },
            {
                name: "Bomb Block",
                description: "Explodes on impact, destroying nearby blocks.",
                image: '../imgs/bomb.png',
                isNew: false
            },
            {
                name: "Bomb Spawner Block",
                description: "Spreads bombs that trigger chain reactions.",
                image: '../imgs/bomb_seeder.png',
                isNew: false
            },
            {
                name: "Multi-Break Block",
                description: "Requires multiple hits before it breaks - 3 times break",
                image: '../imgs/heavy.png',
                isNew: true
            },
            {
                name: "Multi-Break Seeder",
                description: "Creates multi-break walls that trap the ball until it escapes.",
                image: '../imgs/multi_seeder.png',
                isNew: true
            },
        ]
    },
    level5:
    {
        target: "Navigate moving walls to clear the grid",
        mechanics: []
    },
    level6:
    {
        target: "Maintain control against speed zones and hazards",
        mechanics: []
    },
    level7:
    {
        target: "Dodge incoming meteors and destroy all blocks",
        mechanics: []
    },
    level8:
    {
        target: "Master momentum shifts through speed tunnels",
        mechanics: []
    },
    level9:
    {
        target: "Predict complex trajectories to survive",
        mechanics: []
    },
    level10:
    {
        target: "Adapt to phase-shifting teleport hazards",
        mechanics: []
    },
    level11:
    {
        target: "Survive corrupting block anomalies",
        mechanics: []
    },
    level12:
    {
        target: "Conquer the ultimate anomaly grid",
        mechanics: []
    }
}

export default level_briefs;
