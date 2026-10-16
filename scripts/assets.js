import BLOCK from './block_types.js'

const loadImage = async (src)=>
{
    return new Promise((resolve, reject)=>
    {
        const img = new Image()

        img.onload = ()=>resolve(img)
        img.onerror = reject

        img.src = src
        return src
    })
}


const sprites = {
    [BLOCK.BLOCK_TYPES.BRICK1]: [await loadImage('../imgs/brick1.png')],
    [BLOCK.BLOCK_TYPES.WALL]: [await loadImage('../imgs/barrier.png')],
    [BLOCK.BLOCK_TYPES.BOMB]:[await loadImage('../imgs/bomb.png')],
    [BLOCK.BLOCK_TYPES.BOMB_SEEDER]: [await loadImage('../imgs/bomb_seeder.png')],
    [BLOCK.BLOCK_TYPES.MULTIPLE_SEEDER]: [await loadImage('../imgs/multi_seeder.png')],
    [BLOCK.BLOCK_TYPES.BLOCK_EATER]:[await loadImage('../imgs/block_eater.png')],
    [BLOCK.BLOCK_TYPES.TELEPORT_BLOCK]: [await loadImage('../imgs/tele_block.png')],
    [BLOCK.BLOCK_TYPES.CORRUPTION_BLOCK]: [await loadImage('../imgs/corrupt_block.png')],
    [BLOCK.BLOCK_TYPES.MULTIPLE_BREAK]: [
        await loadImage('../imgs/heavy.png'),
        await loadImage('../imgs/heavy2.png'),
        await loadImage('../imgs/heavy3.png')
    ],
    "DROP": [
        await loadImage('../imgs/drop1.png'),
        await loadImage('../imgs/drop2.png'),
        await loadImage('../imgs/drop3.png'),
        await loadImage('../imgs/drop4.png'),
    ],
    "SHIELD": [
        await loadImage('../imgs/shield.png')
    ]

}

export default sprites
