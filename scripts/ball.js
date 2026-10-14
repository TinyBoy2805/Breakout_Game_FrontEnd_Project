import gameConfig from "./game_config.js"
import BAR from './bar.js'
import BRICK from './brick.js'
import BLOCK from './block_types.js'
import sprites from "./assets.js"
import SHIELD from './shield.js'
import MAPS from './map_level.js'
import user from "./user_info.js"
import MOVINGS from './moving_wall.js'
import particle_manager from "./particles.js"
import TEXT_FLY from './text_fly.js'

user.level = localStorage.getItem("level")

const currentMap = MAPS[`level${user.level}`]

const createBall = (x, y, type = 'ball')=>
{
    return {
        type,
        x,
        y,
        radius: (type==='ball') ? 7 : 10,
        color: (type==='ball') ? "#fafafa" : "#ff7f08",
        strokeColor: (type==='ball') ? "#fafafa" : "#ff1919",
        speed: (type === 'ball') ? 2 : 2.3,
        velX: (type === 'ball') ? 0 : (Math.random()<0.5?-1:1),
        velY: (type==='ball') ? -1: 1,
        destroyed: false,
        damage: (type === 'ball')?1:10,
        vector_scale: 1,


        update: function()
        {
            this.move();
            this.collideWithWalls();
            this.collideWithBar();
            this.collideWithBricks();
            if(currentMap?.shield) this.collideWithShield();
            this.collideWithMovingWalls();
        },

        move: function()
        {
            this.x += this.velX * this.speed * this.vector_scale
            this.y += this.velY * this.speed * this.vector_scale
        },

        collideWithWalls: function()
        {

            const {ball_t, ball_r, ball_b, ball_l} = {
                ball_t: this.y - this.radius,
                ball_r: this.x + this.radius,
                ball_b: this.y + this.radius,
                ball_l: this.x - this.radius
            }


            const add_factor = 0.0001
            if(ball_t <= gameConfig.WALLS.TOP)
            {
                this.velY *= -1
                this.y = gameConfig.WALLS.TOP + this.radius + add_factor
            }else if(ball_b >= gameConfig.WALLS.BOTTOM)
            {
                this.destroyed = true
            }else if(ball_l <= gameConfig.WALLS.LEFT)
            {
                this.velX *= -1
                this.x = gameConfig.WALLS.LEFT + this.radius + add_factor

            }else if(ball_r >= gameConfig.WALLS.RIGHT)
            {
                this.velX *= -1
                this.x = gameConfig.WALLS.RIGHT - this.radius - add_factor
            }

        },

        collideWithBar: function()
        {
            const {ball_t, ball_r, ball_b, ball_l} = {
                ball_t: this.y - this.radius,
                ball_r: this.x + this.radius,
                ball_b: this.y + this.radius,
                ball_l: this.x - this.radius
            }


            if(
                this.y + this.radius >= BAR.y
                && this.y - this.radius <= BAR.y + BAR.height
                && this.x + this.radius >= BAR.x
                && this.x - this.radius <= BAR.x + BAR.width
            )
            {
                const hit_pos = (this.x - BAR.x) / BAR.width
                const normalize_pos = (hit_pos - 0.5) * 2
                const maxAngle = Math.PI / 3

                const bounce_angle = normalize_pos * maxAngle - (Math.PI / 2);
                this.speed = Math.min(this.speed * 1.05, 4.5)

                this.velX = Math.cos(bounce_angle)
                this.velY = Math.sin(bounce_angle)

                if(this.type !== 'ball')
                {
                    BAR.y += 10
                }
            }else return;


        },

        collideWithBricks: function()
        {

            let hit = false
            let block = null
            let hitX = -1
            let hitY = -1
            let particleRadius = 0;
            let color = ""
            for(let y = 0; y<BRICK.map.length; y++)
            {
                for(let x = 0; x<BRICK.map[y].length; x++)
                {
                    const currentBlock = BRICK.map[y][x]
                    if(this.collideWithBrick(x, y) && currentBlock)
                    {
                        hit = true
                        block = currentBlock
                        hitX = x
                        hitY = y
                        break;
                    }
                }
                if(hit) break;
            }

            if(hit)
            {
                const brick_l = hitX * gameConfig.configs.TILE_SIZE
                const brick_t = hitY * gameConfig.configs.TILE_SIZE

                const centerX = brick_l + gameConfig.configs.TILE_SIZE/2
                const centerY = brick_t + gameConfig.configs.TILE_SIZE/2
                const dx = this.x - centerX
                const dy = this.y - centerY
                let dir = [0 , 0]
                if(Math.abs(dx) > Math.abs(dy))
                {
                    if(this.x < centerX)
                    {
                        dir = [1, 0]
                    }else
                    {
                        dir = [-1, 0]
                    }
                }
                else if(Math.abs(dx) < Math.abs(dy))
                {
                    if(this.y < centerY)
                    {
                        dir = [0, 1]
                    }else
                    {
                        dir = [0, -1]
                    }
                }

                switch(block.type)
                {
                    case BLOCK.BLOCK_TYPES.BRICK1:

                        BRICK.removeBlock(hitX, hitY)
                        color = "#2dff7d"
                        particleRadius = 6
                        break;
                    case BLOCK.BLOCK_TYPES.WALL:

                        color = "#fbff1d"
                        particleRadius = 3

                        break;
                    case BLOCK.BLOCK_TYPES.BOMB:
                        BRICK.explode(hitX, hitY, block.data.explode_radius)
                        color = "#ff004c"
                        particleRadius = 3
                        break;
                    case BLOCK.BLOCK_TYPES.BOMB_SEEDER:
                        BRICK.spawnBomb(hitX, hitY)
                        color = "#ff004c"
                        particleRadius = 3
                        break;
                    case BLOCK.BLOCK_TYPES.MULTIPLE_BREAK:
                        block.data.breakCount--;
                        block.sprite = sprites[block.type][block.data.maxBreak - block.data.breakCount]
                        if(block.data.breakCount <= 0)
                        {
                            BRICK.removeBlock(hitX, hitY);
                        }
                        color = "#10dfff"
                        particleRadius = 6

                        break;
                    case BLOCK.BLOCK_TYPES.MULTIPLE_SEEDER:
                        BRICK.spawnMultyBreak(hitX, hitY)
                        color = "#10dfff"
                        particleRadius = 6
                        break;
                    case BLOCK.BLOCK_TYPES.BLOCK_EATER:
                        BRICK.eatBlock(hitX, hitY, dir)
                        color = "#a217ff"
                        particleRadius = 3
                    break;
                }

                if(block.data.score > 0)
                {
                    user.addScore(block.data.score)
                    TEXT_FLY.text_flies.push(TEXT_FLY.createTextFly(centerX, centerY, `+${block.data.score}`, {
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
                            color,
                            gravity: 0.3,
                            angle: Math.random() * (Math.PI * 2),
                            speed: 1,
                            life: 30,
                            radius: particleRadius
                        }
                    )
                }

                this.setNewBounceVector(hitX, hitY)

                if(this.type !== 'ball')
                {
                    this.destroyed = true
                    BRICK.breakArea(hitX, hitY, 1)
                }
            }
        },


        setNewBounceVector: function(x, y)
        {

            const brick_l = x * gameConfig.configs.TILE_SIZE
            const brick_r = brick_l + gameConfig.configs.TILE_SIZE

            const brick_t = y * gameConfig.configs.TILE_SIZE
            const brick_b = brick_t + gameConfig.configs.TILE_SIZE


            const centerX = brick_l + gameConfig.configs.TILE_SIZE/2
            const centerY = brick_t + gameConfig.configs.TILE_SIZE/2

            const dx = this.x - centerX
            const dy = this.y - centerY

            if(Math.abs(dx) > Math.abs(dy))
            {
                this.velX *= -1
                if(this.x < centerX)
                {
                    this.x = brick_l - this.radius
                }else
                {
                    this.x = brick_r + this.radius
                }

                if(this.y < centerY)
                {
                    this.y -= 0.001
                }else
                {
                    this.y += 0.001
                }
            }
            else if(Math.abs(dx) < Math.abs(dy))
            {
                this.velY *= -1
                if(this.y < centerY)
                {
                    this.y = brick_t - this.radius
                }else
                {
                    this.y = brick_b + this.radius
                }

                if(this.x < centerX)
                {
                    this.x -= 0.001
                }else
                {
                    this.x += 0.001
                }
            }
        },

        collideWithBrick: function(x, y)
        {

            const {ball_t, ball_r, ball_b, ball_l} = {
                ball_t: this.y - this.radius,
                ball_r: this.x + this.radius,
                ball_b: this.y + this.radius,
                ball_l: this.x - this.radius
            }

            const brick_l = x * gameConfig.configs.TILE_SIZE
            const brick_r = brick_l + gameConfig.configs.TILE_SIZE

            const brick_t = y * gameConfig.configs.TILE_SIZE
            const brick_b = brick_t + gameConfig.configs.TILE_SIZE

            if(
                ball_t <= brick_b &&
                ball_b >= brick_t &&
                ball_l <= brick_r &&
                ball_r >= brick_l
            )
            {
                return true
            }

            return false
        },

        collideWithShield: function()
        {
            const ball_b = this.y + this.radius

            if(ball_b >= SHIELD.shield.y)
            {
                if(this.type === 'ball')
                {
                    this.velY *= -1
                }else this.destroyed = true;
                SHIELD.shield.takeDamage(this.damage)
                TEXT_FLY.text_flies.push(TEXT_FLY.createTextFly(this.x, this.y, `-${this.damage}`,
                {
                    font: "20px Arial bold",
                    color: "#ff155b",
                    align: "center",
                    baseLine: "middle",
                    lifeTime: 50
                }))
                for(let i = 0; i<5; i++)
                {
                    particle_manager.addParticle(
                        this.x,
                        this.y+this.radius,
                        {
                            alpha: 1,
                            color: "#00f0ff",
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

        collideWithMovingWalls: function()
        {
            for(const moving of MOVINGS.movings)
            {
                const {ball_t, ball_r, ball_b, ball_l} = {
                    ball_t: this.y - this.radius,
                    ball_r: this.x + this.radius,
                    ball_b: this.y + this.radius,
                    ball_l: this.x - this.radius
                }

                let w, h;

                if(moving.type === 'horizontal')
                {
                    w = moving.width
                    h = moving.height
                }else if(moving.type === 'vertical')
                {
                    w = moving.height
                    h = moving.width
                }

                const move_l = moving.x
                const move_r = move_l + w

                const move_t = moving.y
                const move_b = move_t + h

                if((ball_r >= move_l && ball_l <= move_r) && (ball_b >= move_t && ball_t <= move_b))
                {
                    moving.speed = 0

                    this.velX *= -1
                    this.velY *= -1

                    if(ball_r >= move_l)
                    {
                        this.x -= this.radius
                    }else if(ball_l <= move_r)
                    {
                        this.x += this.radius
                    }

                    for(let i = 0; i<5; i++)
                    {
                        particle_manager.addParticle(
                            this.x,
                            this.y,
                            {
                                alpha: 1,
                                color: "#fbca1a",
                                gravity: 0.3,
                                angle: Math.random() * (Math.PI * 2),
                                speed: 1,
                                life: 30,
                                radius: 3
                            }
                        )
                    }

                    setTimeout(()=>
                    {
                        moving.speed = 1
                    }, 500)
                }




            }



        },

        draw: function (ctx)
        {
            ctx.beginPath()

            ctx.shadowBlur = 20
            ctx.shadowColor = this.color

            ctx.fillStyle = this.color
            ctx.strokeStyle = this.strokeColor
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
            ctx.fill()
            ctx.stroke()

            ctx.shadowBlur = 0;
            ctx.shadowColor = "transparent";
        }
    }
}


const balls = []

export default {createBall, balls}
