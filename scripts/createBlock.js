
import BLOCK from './block_types.js'
import sprites from './assets.js'

const block = (type)=>
{
    return {
        type,
        sprite: sprites[type][0],
        data: {...BLOCK.BLOCK_DATAS[type]}
    }
}

export default block
