

const BLOCK_TYPES = {
    BRICK1: 1,
    WALL: 2,
    BOMB: 3,
    MULTIPLE_BREAK: 4,
    BOMB_SEEDER: 5,
    MULTIPLE_SEEDER: 6,
    BLOCK_EATER: 7,
    TELEPORT_BLOCK: 8,
    CORRUPTION_BLOCK: 9
}



const BLOCK_DATAS = {

    [BLOCK_TYPES.BRICK1]:
    {
        score: 10
    },
    [BLOCK_TYPES.WALL]:
    {
        score: 0
    },
    [BLOCK_TYPES.BOMB]:
    {
        explode_radius: 2,
        score: 15
    },
    [BLOCK_TYPES.BOMB_SEEDER]:
    {
        score: 0
    },
    [BLOCK_TYPES.MULTIPLE_SEEDER]:
    {
        score: 0
    },
    [BLOCK_TYPES.BLOCK_EATER]:
    {
        score: 0
    },
    [BLOCK_TYPES.MULTIPLE_BREAK]:
    {
        breakCount: 3,
        maxBreak: 3,
        score: 10
    },
    [BLOCK_TYPES.TELEPORT_BLOCK]:
    {
        score: 0
    },
    [BLOCK_TYPES.CORRUPTION_BLOCK]:
    {
        score: 0
    }

}



export default {BLOCK_TYPES, BLOCK_DATAS}

