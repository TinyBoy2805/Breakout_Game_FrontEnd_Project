import gameConfig from "./game_config.js"
import MAPS from './map_level.js'
import createDrop from "./brick_drop.js"
import user from './user_info.js'
import sprites from './assets.js'
import block from "./createBlock.js"
import BLOCK from './block_types.js'
import particle_manager from './particles.js'
import TEXT_FLY from './text_fly.js'

user.level = localStorage.getItem("level")



const convertToObjectMap = ()=>
{
    const obj_map = []
    const id_map =  MAPS[`level${user.level}`]?.map

    for(let y=0; y<id_map.length; y++)
    {
        const t = []
        for(let x=0; x<id_map[y].length; x++)
        {
            t.push(id_map[y][x] === 0 ? null : block(id_map[y][x]))
        }
        obj_map.push(t)
    }
    return obj_map
}


const brick = {
    type: "brick",
    map: convertToObjectMap(),
    drops: [],
    dropRate: 0.12,

    removeBlock: function(x, y)
    {
        this.map[y][x] = null
        this.addDrop(x, y)
    },

    addDrop: function(x, y)
    {
        if(Math.random() < this.dropRate)
        {
            this.drops.push(createDrop(x, y))
        }
    },

    eatBlock: function(x, y, direction)
    {
        this.removeBlock(x, y)
        for(let i=0; i<=5; i++)
        {
            const {newX, newY} = {newX: x+(i*direction[0]), newY: y+(i*direction[1])}
            const {centerX, centerY} = {
                centerX: newX * gameConfig.configs.TILE_SIZE + gameConfig.configs.TILE_SIZE/2,
                centerY: newY * gameConfig.configs.TILE_SIZE + gameConfig.configs.TILE_SIZE/2
            }
            if(this.checkOutOfRange(newX, newY)) continue;

            const obj = this.map[newY][newX]
            switch(obj?.type)
            {
                case BLOCK.BLOCK_TYPES.BOMB:
                    this.explode(newX, newY, obj?.data?.explode_radius)
                    break;
                case BLOCK.BLOCK_TYPES.BOMB_SEEDER:
                    this.spawnBomb(newX, newY)
                    break;
                case BLOCK.BLOCK_TYPES.MULTIPLE_SEEDER:
                    this.spawnMultyBreak(newX, newY)
                    break;
                case BLOCK.BLOCK_TYPES.BRICK1:
                    this.removeBlock(newX, newY)
                    break;
                case BLOCK.BLOCK_TYPES.WALL:
                    break;
                case BLOCK.BLOCK_TYPES.BLOCK_EATER:
                    this.eatBlock(newX, newY, direction)
                    break;
            }

            const obj_score = obj?.data?.score
            if(obj_score > 0)
            {
                user.addScore(obj_score)
                TEXT_FLY.text_flies.push(TEXT_FLY.createTextFly(centerX, centerY, `+${obj_score}`, {
                    font: "12px Arial bold",
                    color: "#fafafa",
                    align: "center",
                    baseLine: "middle",
                    lifeTime: 50
                }))
            }

            for(let j=0; j<5; j++)
            {
                particle_manager.addParticle(
                    newX*gameConfig.configs.TILE_SIZE + gameConfig.configs.TILE_SIZE/2,
                    newY*gameConfig.configs.TILE_SIZE + gameConfig.configs.TILE_SIZE/2,
                    {
                        alpha: 1,
                        color: "#7e2eff",
                        gravity: 0.3,
                        angle: Math.random() * (Math.PI * 2),
                        speed: 1,
                        life: 30,
                        radius: 3
                    }
                )
            }
        }
    },

    spawnMultyBreak: function(x, y)
    {
        this.removeBlock(x, y)

        const startRow = y-2;
        const startCol = x-2
        const endRow = y+2
        const endCol = x+2
        for(let r = startRow; r<=endRow; r++)
        {
            for(let c = startCol; c<=endCol; c++)
            {

                if(this.checkOutOfRange(c, r)) continue;

                if(r === startRow || r === endRow || c === startCol || c === endCol)
                {
                    this.map[r][c] = block(BLOCK.BLOCK_TYPES.MULTIPLE_BREAK);
                    for(let j=0; j<5; j++)
                    {
                        particle_manager.addParticle(
                            c*gameConfig.configs.TILE_SIZE + gameConfig.configs.TILE_SIZE/2,
                            r*gameConfig.configs.TILE_SIZE + gameConfig.configs.TILE_SIZE/2,
                            {
                                alpha: 1,
                                color: "#10dfff",
                                gravity: 0.3,
                                angle: Math.random() * (Math.PI * 2),
                                speed: 1,
                                life: 30,
                                radius: 6
                            }
                        )
                    }
                }
            }
        }


    },

    breakArea: function(x, y, size)
    {

        const startRow = y-size;
        const startCol = x-size
        const endRow = y+size
        const endCol = x+size
        for(let r = startRow; r<=endRow; r++)
        {
            for(let c = startCol; c<=endCol; c++)
            {
                if(this.checkOutOfRange(c, r)) continue;
                const block = this.map[r][c];

                switch(block?.type)
                {
                    case BLOCK.BLOCK_TYPES.BRICK1:
                        this.removeBlock(c, r)
                        break;
                    case BLOCK.BLOCK_TYPES.MULTIPLE_BREAK:
                        block.data.breakCount--;
                        block.sprite = sprites[block.type][block.data.maxBreak - block.data.breakCount]
                        if(block?.data?.breakCount <= 0)
                        {
                            this.removeBlock(c, r);
                        }
                        break;
                    case BLOCK.BLOCK_TYPES.WALL:
                        break;
                    case BLOCK.BLOCK_TYPES.BOMB:
                        this.explode(c, r, block?.data?.explode_radius)
                        break;
                    case BLOCK.BLOCK_TYPES.BOMB_SEEDER:
                        this.spawnBomb(c, r)
                        break;
                    case BLOCK.BLOCK_TYPES.MULTIPLE_SEEDER:
                        this.spawnMultyBreak(c, r)
                        break;
                    case BLOCK.BLOCK_TYPES.BLOCK_EATER:
                        this.eatBlock(c, r, [-1, 0])
                        break;

                }

                const obj_score = block?.data?.score
                if(obj_score > 0)
                {
                    user.addScore(obj_score)
                    TEXT_FLY.text_flies.push(TEXT_FLY.createTextFly(c * gameConfig.configs.TILE_SIZE + gameConfig.configs.TILE_SIZE/2, r * gameConfig.configs.TILE_SIZE + gameConfig.configs.TILE_SIZE/2, `+${obj_score}`, {
                        font: "12px Arial bold",
                        color: "#fafafa",
                        align: "center",
                        baseLine: "middle",
                        lifeTime: 50
                    }))
                }

                for(let j=0; j<5; j++)
                {
                    particle_manager.addParticle(
                        c*gameConfig.configs.TILE_SIZE + gameConfig.configs.TILE_SIZE/2,
                        r*gameConfig.configs.TILE_SIZE + gameConfig.configs.TILE_SIZE/2,
                        {
                            alpha: 1,
                            color: "#ff932e",
                            gravity: 0.3,
                            angle: Math.random() * (Math.PI * 2),
                            speed: 1,
                            life: 30,
                            radius: 3
                        }
                    )
                }
            }
        }
    },



    spawnBomb: function(x, y)
    {
        this.removeBlock(x, y)
        if(!this.checkOutOfRange(x-1, y-1)) this.map[y-1][x-1] = block(BLOCK.BLOCK_TYPES.BOMB)
        if(!this.checkOutOfRange(x+1, y+1)) this.map[y+1][x+1] = block(BLOCK.BLOCK_TYPES.BOMB)
        if(!this.checkOutOfRange(x-1, y+1)) this.map[y+1][x-1] = block(BLOCK.BLOCK_TYPES.BOMB)
        if(!this.checkOutOfRange(x+1, y-1)) this.map[y-1][x+1] = block(BLOCK.BLOCK_TYPES.BOMB)
    },

    checkOutOfRange: function(x, y)
    {
        if(x < 0 || y < 0 || y >=this.map.length || x >= this.map[0].length)
        {
            return true;
        }
        return false;
    },

    explode: function(x, y, explode_radius)
    {
        for(let r = y-explode_radius; r<=y+explode_radius; r++)
        {
            for(let c = x-explode_radius; c<=x+explode_radius; c++)
            {
                if(
                    r >= 0 && r < this.map.length && c >= 0 && c < this.map[0].length
                )
                {
                    const obj = this.map[r][c]
                    if(obj)
                    {
                        switch(obj.type)
                        {
                            case BLOCK.BLOCK_TYPES.WALL:
                                continue;
                            case BLOCK.BLOCK_TYPES.BOMB:
                                this.removeBlock(c, r)
                                this.explode(c, r, explode_radius)
                                break;
                            case BLOCK.BLOCK_TYPES.MULTIPLE_BREAK:
                                obj.data.breakCount--;
                                obj.sprite = sprites[obj.type][obj.data.maxBreak - obj.data.breakCount]
                                if(obj.data.breakCount <= 0)
                                {
                                    this.removeBlock(c, r);
                                }
                                break;
                            case BLOCK.BLOCK_TYPES.BOMB_SEEDER:
                                this.spawnBomb(c, r)
                                break;
                            default:
                                this.removeBlock(c, r)
                                break;
                        }
                        const {centerX, centerY} = {
                            centerX: c*gameConfig.configs.TILE_SIZE + gameConfig.configs.TILE_SIZE/2,
                            centerY: r*gameConfig.configs.TILE_SIZE + gameConfig.configs.TILE_SIZE/2
                        }
                        const obj_score = obj?.data?.score
                        if(obj_score > 0)
                        {
                            user.addScore(obj_score)
                            TEXT_FLY.text_flies.push(TEXT_FLY.createTextFly(centerX, centerY, `+${obj_score}`, {
                                font: "12px Arial bold",
                                color: "#fafafa",
                                align: "center",
                                baseLine: "middle",
                                lifeTime: 50
                            }))
                        }
                        for(let i=0; i<5; i++)
                        {
                            particle_manager.addParticle(
                                centerX,
                                centerY,
                                {
                                    alpha: 1,
                                    color: "#ff004c",
                                    gravity: 0.3,
                                    angle: Math.random() * (Math.PI * 2),
                                    speed: 1,
                                    life: 30,
                                    radius: 3
                                }
                            )
                        }
                    }
                }
            }
        }
    },

    draw: function(ctx)
    {
        for(let y=0; y<this.map.length; y++)
        {
            for(let x=0; x<this.map[y].length; x++)
            {
                if(this.map[y][x] === null) continue;
                const block = this.map[y][x];
                if(block)
                {
                    const sprite = block.sprite
                    ctx.drawImage(sprite, x*gameConfig.configs.TILE_SIZE, y*gameConfig.configs.TILE_SIZE, gameConfig.configs.TILE_SIZE, gameConfig.configs.TILE_SIZE)
                }
            }
        }
    }
}
export default brick
