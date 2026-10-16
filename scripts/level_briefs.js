const level_briefs = {
    level1: {
        target: "Shatter all blocks to clear the level",
        mechanics: [
            {
                name: "Standard Block",
                description: "Breaks instantly upon ball impact.",
                image: '../imgs/brick1.png',
                isNew: true
            },
        ]
    },
    level2: {
        target: "Master 4-way movement and adapt to shifting trajectories",
        mechanics: [
            {
                name: "Unbreakable Barrier",
                description: "Indestructible obstacle that ricochets balls in new directions.",
                image: '../imgs/barrier.png',
                isNew: true
            },
            {
                name: "Omni-Thrusters (4-Way)",
                description: "Enables vertical movement at the cost of MP. Recharges fully when empty.",
                image: 'https://i.pinimg.com/736x/b1/a9/68/b1a968b45b8cafafb0107d2170081fbe.jpg',
                isNew: true,
            },
            {
                name: "Standard Block",
                description: "Breaks instantly upon ball impact.",
                image: '../imgs/brick1.png',
                isNew: false,
            },
        ]
    },
    level3: {
        target: "Unleash devastating explosive chain reactions",
        mechanics: [
            {
                name: "Blast Block",
                description: "Detonates on impact, annihilating adjacent blocks.",
                image: '../imgs/bomb.png',
                isNew: true
            },
            {
                name: "Cluster Bomb Spawner",
                description: "Spreads explosive charges across the grid to ignite chain reactions.",
                image: '../imgs/bomb_seeder.png',
                isNew: true
            },
            {
                name: "Standard Block",
                description: "Breaks instantly upon ball impact.",
                image: '../imgs/brick1.png',
                isNew: false,
            },
            {
                name: "Unbreakable Barrier",
                description: "Indestructible obstacle that ricochets balls in new directions.",
                image: '../imgs/barrier.png',
                isNew: false
            },
        ]
    },
    level4: {
        target: "Smash through heavily armored block defenses",
        mechanics: [
            {
                name: "Armored Block",
                description: "Reinforced structure requiring 3 direct hits to break.",
                image: '../imgs/heavy.png',
                isNew: true
            },
            {
                name: "Fortress Seeder",
                description: "Constructs armored barricades that trap balls inside.",
                image: '../imgs/multi_seeder.png',
                isNew: true
            },
            {
                name: "Standard Block",
                description: "Breaks instantly upon ball impact.",
                image: '../imgs/brick1.png',
                isNew: false,
            },
            {
                name: "Unbreakable Barrier",
                description: "Indestructible obstacle that ricochets balls in new directions.",
                image: '../imgs/barrier.png',
                isNew: false
            },
            {
                name: "Blast Block",
                description: "Detonates on impact, annihilating adjacent blocks.",
                image: '../imgs/bomb.png',
                isNew: false
            },
            {
                name: "Cluster Bomb Spawner",
                description: "Spreads explosive charges across the grid to ignite chain reactions.",
                image: '../imgs/bomb_seeder.png',
                isNew: false
            },
        ]
    },
    level5: {
        target: "Outmaneuver dynamic moving walls to sweep the grid",
        mechanics: [
            {
                name: "Shifting Wall",
                description: "Patrolling barriers that temporarily freeze for a second when hit.",
                image: "https://i.pinimg.com/736x/ce/ad/d9/ceadd93d2f19d9f814323bf1dd397d44.jpg",
                isNew: true
            },
            {
                name: "Standard Block",
                description: "Breaks instantly upon ball impact.",
                image: '../imgs/brick1.png',
                isNew: false,
            },
            {
                name: "Unbreakable Barrier",
                description: "Indestructible obstacle that ricochets balls in new directions.",
                image: '../imgs/barrier.png',
                isNew: false
            },
            {
                name: "Blast Block",
                description: "Detonates on impact, annihilating adjacent blocks.",
                image: '../imgs/bomb.png',
                isNew: false
            },
            {
                name: "Cluster Bomb Spawner",
                description: "Spreads explosive charges across the grid to ignite chain reactions.",
                image: '../imgs/bomb_seeder.png',
                isNew: false
            },
            {
                name: "Armored Block",
                description: "Reinforced structure requiring 3 direct hits to break.",
                image: '../imgs/heavy.png',
                isNew: false
            },
            {
                name: "Fortress Seeder",
                description: "Constructs armored barricades that trap balls inside.",
                image: '../imgs/multi_seeder.png',
                isNew: false
            },
        ]
    },
    level6: {
        target: "Fortify your defenses and maintain control against extreme hazards",
        mechanics: [
            {
                name: "Energy Shield Drop",
                description: "Collect to deploy a protective safety barrier at the bottom.",
                image: "../imgs/shield.png",
                isNew: true
            },
            {
                name: "Standard Block",
                description: "Breaks instantly upon ball impact.",
                image: '../imgs/brick1.png',
                isNew: false,
            },
            {
                name: "Unbreakable Barrier",
                description: "Indestructible obstacle that ricochets balls in new directions.",
                image: '../imgs/barrier.png',
                isNew: false
            },
            {
                name: "Blast Block",
                description: "Detonates on impact, annihilating adjacent blocks.",
                image: '../imgs/bomb.png',
                isNew: false
            },
            {
                name: "Cluster Bomb Spawner",
                description: "Spreads explosive charges across the grid to ignite chain reactions.",
                image: '../imgs/bomb_seeder.png',
                isNew: false
            },
            {
                name: "Armored Block",
                description: "Reinforced structure requiring 3 direct hits to break.",
                image: '../imgs/heavy.png',
                isNew: false
            },
            {
                name: "Fortress Seeder",
                description: "Constructs armored barricades that trap balls inside.",
                image: '../imgs/multi_seeder.png',
                isNew: false
            },
            {
                name: "Shifting Wall",
                description: "Patrolling barriers that temporarily freeze for a second when hit.",
                image: "https://i.pinimg.com/736x/ce/ad/d9/ceadd93d2f19d9f814323bf1dd397d44.jpg",
                isNew: false
            },
        ]
    },
    level7: {
        target: "Dodge lethal cosmic meteors and obliterate the target blocks",
        mechanics: [
            {
                name: "Cosmic Meteor",
                description: "Destroys shields on impact! Deflect it off static barriers to smash bricks.",
                image: "https://i.pinimg.com/1200x/4f/0a/bb/4f0abbc768224415d39c18661f23248f.jpg",
                isNew: true
            },
            {
                name: "Standard Block",
                description: "Breaks instantly upon ball impact.",
                image: '../imgs/brick1.png',
                isNew: false,
            },
            {
                name: "Unbreakable Barrier",
                description: "Indestructible obstacle that ricochets balls in new directions.",
                image: '../imgs/barrier.png',
                isNew: false
            },
            {
                name: "Blast Block",
                description: "Detonates on impact, annihilating adjacent blocks.",
                image: '../imgs/bomb.png',
                isNew: false
            },
            {
                name: "Cluster Bomb Spawner",
                description: "Spreads explosive charges across the grid to ignite chain reactions.",
                image: '../imgs/bomb_seeder.png',
                isNew: false
            },
            {
                name: "Armored Block",
                description: "Reinforced structure requiring 3 direct hits to break.",
                image: '../imgs/heavy.png',
                isNew: false
            },
            {
                name: "Fortress Seeder",
                description: "Constructs armored barricades that trap balls inside.",
                image: '../imgs/multi_seeder.png',
                isNew: false
            },
            {
                name: "Shifting Wall",
                description: "Patrolling barriers that temporarily freeze for a second when hit.",
                image: "https://i.pinimg.com/736x/ce/ad/d9/ceadd93d2f19d9f814323bf1dd397d44.jpg",
                isNew: false
            },
            {
                name: "Energy Shield Drop",
                description: "Collect to deploy a protective safety barrier at the bottom.",
                image: "../imgs/shield.png",
                isNew: false
            },
        ]
    },
    level8: {
        target: "Harness momentum fields and hyper-penetrate block formations",
        mechanics: [
            {
                name: "Gravity Field",
                description: "Alters space-time to drastically accelerate or decelerate passing balls.",
                image: "https://i.pinimg.com/1200x/4c/e9/63/4ce9635e340b9a47c145e2ef1623a00f.jpg",
                isNew: true
            },
            {
                name: "Hyper-Pierce Block",
                description: "Overcharges the ball, allowing it to drill through 5 additional blocks in its path.",
                image: "../imgs/block_eater.png",
                isNew: true
            },
            {
                name: "Standard Block",
                description: "Breaks instantly upon ball impact.",
                image: '../imgs/brick1.png',
                isNew: false,
            },
            {
                name: "Unbreakable Barrier",
                description: "Indestructible obstacle that ricochets balls in new directions.",
                image: '../imgs/barrier.png',
                isNew: false
            },
            {
                name: "Blast Block",
                description: "Detonates on impact, annihilating adjacent blocks.",
                image: '../imgs/bomb.png',
                isNew: false
            },
            {
                name: "Cluster Bomb Spawner",
                description: "Spreads explosive charges across the grid to ignite chain reactions.",
                image: '../imgs/bomb_seeder.png',
                isNew: false
            },
            {
                name: "Armored Block",
                description: "Reinforced structure requiring 3 direct hits to break.",
                image: '../imgs/heavy.png',
                isNew: false
            },
            {
                name: "Fortress Seeder",
                description: "Constructs armored barricades that trap balls inside.",
                image: '../imgs/multi_seeder.png',
                isNew: false
            },
            {
                name: "Cosmic Meteor",
                description: "Destroys shields on impact! Deflect it off static barriers to smash bricks.",
                image: "https://i.pinimg.com/1200x/4f/0a/bb/4f0abbc768224415d39c18661f23248f.jpg",
                isNew: false
            },
            {
                name: "Energy Shield Drop",
                description: "Collect to deploy a protective safety barrier at the bottom.",
                image: "../imgs/shield.png",
                isNew: false
            },
        ]
    },
    level9: {
        target: "Master space-warping portals and unpredictable spatial anomalies",
        mechanics: [
            {
                name: "Warp Gateway",
                description: "Instantly teleports balls to its connected twin gateway.",
                image: "https://i.pinimg.com/736x/d5/9a/7d/d59a7deb76f1fd8ca82270ee525789eb.jpg",
                isNew: true
            },
            {
                name: "Chaos Shift Block",
                description: "Warp-strikes balls to a completely random location on the board.",
                image: "../imgs/tele_block.png",
                isNew: true
            },
            {
                name: "Standard Block",
                description: "Breaks instantly upon ball impact.",
                image: '../imgs/brick1.png',
                isNew: false,
            },
            {
                name: "Unbreakable Barrier",
                description: "Indestructible obstacle that ricochets balls in new directions.",
                image: '../imgs/barrier.png',
                isNew: false
            },
            {
                name: "Blast Block",
                description: "Detonates on impact, annihilating adjacent blocks.",
                image: '../imgs/bomb.png',
                isNew: false
            },
            {
                name: "Cluster Bomb Spawner",
                description: "Spreads explosive charges across the grid to ignite chain reactions.",
                image: '../imgs/bomb_seeder.png',
                isNew: false
            },
            {
                name: "Armored Block",
                description: "Reinforced structure requiring 3 direct hits to break.",
                image: '../imgs/heavy.png',
                isNew: false
            },
            {
                name: "Fortress Seeder",
                description: "Constructs armored barricades that trap balls inside.",
                image: '../imgs/multi_seeder.png',
                isNew: false
            },
            {
                name: "Cosmic Meteor",
                description: "Destroys shields on impact! Deflect it off static barriers to smash bricks.",
                image: "https://i.pinimg.com/1200x/4f/0a/bb/4f0abbc768224415d39c18661f23248f.jpg",
                isNew: false
            },
            {
                name: "Energy Shield Drop",
                description: "Collect to deploy a protective safety barrier at the bottom.",
                image: "../imgs/shield.png",
                isNew: false
            },
            {
                name: "Hyper-Pierce Block",
                description: "Overcharges the ball, allowing it to drill through 5 additional blocks in its path.",
                image: "../imgs/block_eater.png",
                isNew: false
            },
        ]
    },
    level10: {
        target: "Survive void singularities and conquer corrupting block anomalies",
        mechanics: [
            {
                name: "Singularity (Black Hole)",
                description: "Pulls balls and meteors toward its core while consuming all power-up drops.",
                image: "https://i.pinimg.com/736x/2b/84/c1/2b84c1bcf2a45845f3b43f913221fc5e.jpg",
                isNew: true
            },
            {
                name: "Void Corruption Block",
                description: "Corrupts and transforms surrounding 3x3 block clusters on impact.",
                image: "../imgs/corrupt_block.png",
                isNew: true
            },
            {
                name: "Standard Block",
                description: "Breaks instantly upon ball impact.",
                image: '../imgs/brick1.png',
                isNew: false,
            },
            {
                name: "Unbreakable Barrier",
                description: "Indestructible obstacle that ricochets balls in new directions.",
                image: '../imgs/barrier.png',
                isNew: false
            },
            {
                name: "Blast Block",
                description: "Detonates on impact, annihilating adjacent blocks.",
                image: '../imgs/bomb.png',
                isNew: false
            },
            {
                name: "Cluster Bomb Spawner",
                description: "Spreads explosive charges across the grid to ignite chain reactions.",
                image: '../imgs/bomb_seeder.png',
                isNew: false
            },
            {
                name: "Armored Block",
                description: "Reinforced structure requiring 3 direct hits to break.",
                image: '../imgs/heavy.png',
                isNew: false
            },
            {
                name: "Fortress Seeder",
                description: "Constructs armored barricades that trap balls inside.",
                image: '../imgs/multi_seeder.png',
                isNew: false
            },
            {
                name: "Hyper-Pierce Block",
                description: "Overcharges the ball, allowing it to drill through 5 additional blocks in its path.",
                image: "../imgs/block_eater.png",
                isNew: false
            },
            {
                name: "Warp Gateway",
                description: "Instantly teleports balls to its connected twin gateway.",
                image: "https://i.pinimg.com/736x/d5/9a/7d/d59a7deb76f1fd8ca82270ee525789eb.jpg",
                isNew: false
            },
            {
                name: "Chaos Shift Block",
                description: "Warp-strikes balls to a completely random location on the board.",
                image: "../imgs/tele_block.png",
                isNew: false
            },
            {
                name: "Cosmic Meteor",
                description: "Destroys shields on impact! Deflect it off static barriers to smash bricks.",
                image: "https://i.pinimg.com/1200x/4f/0a/bb/4f0abbc768224415d39c18661f23248f.jpg",
                isNew: false
            },
            {
                name: "Energy Shield Drop",
                description: "Collect to deploy a protective safety barrier at the bottom.",
                image: "../imgs/shield.png",
                isNew: false
            },
            {
                name: "Shifting Wall",
                description: "Patrolling barriers that temporarily freeze for a second when hit.",
                image: "https://i.pinimg.com/736x/ce/ad/d9/ceadd93d2f19d9f814323bf1dd397d44.jpg",
                isNew: false
            },
        ]
    },
};

export default level_briefs;