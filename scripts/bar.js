import gameConfig from "./game_config.js";
import user from './user_info.js'
import MAPS from './map_level.js'
import TEXT_FLY from './text_fly.js'

user.level = localStorage.getItem("level")
const currentMap = MAPS[`level${user.level}`]?.map

const bar = {
    type: "bar",
    x: 550,
    y: 500,
    width: 120,
    height: 12,
    color: "#db3ffd",
    strokeColor: "#f389f5",
    speed: 5.25,
    velX: 0,
    velY: 0,
    mp: 50,
    maxMp: 50,
    isFull: true,
    timer: 500,
    cnt: 0,

    update: function()
    {
        this.collideWithWalls();
        this.collideWithMap();
        this.x += this.velX * this.speed
        this.y += this.velY * this.speed

        if(!this.isFull)
        {
            this.timer--;
            this.cnt++;
            if(this.cnt === 100)
            {
                this.mp = Math.min(this.maxMp, this.mp+5)
                this.cnt = 0
            }
            if(this.timer <= 0 && this.mp === this.maxMp)
            {
                this.isFull = true
                this.timer = 50
                TEXT_FLY.text_flies.push(TEXT_FLY.createTextFly(
                    this.x +this.width/2,
                    this.y,
                    `Full MP`,
                    {
                        font: "20px Arial bold",
                        color: "#7ad9ff",
                        align: "center",
                        baseLine: "middle",
                        lifeTime: 50
                    }
            ))
            }
        }
    },

    move: function(e, canMoveVertical)
    {
        if(canMoveVertical && (
            e.key === 'ArrowUp' || e.key === 'ArrowDown'
        ) && this.isFull)
        {
            if(this.mp > 0)
            {
                this.moveVertical(e)
                this.mp = Math.max(0, this.mp - 5)
                if(this.mp <= 0) this.isFull = false
            }

        }
        this.moveHorizontal(e)
    },

    moveVertical: function(e)
    {
        if(e.key === 'ArrowUp' && this.velY !== -1)
        {
            this.velY = -1
            this.velX = 0
        }else if(e.key === 'ArrowDown' && this.velY !== 1)
        {
            this.velY = 1
            this.velX = 0
        }

    },

    moveHorizontal: function(e)
    {
        if(e.key === 'ArrowRight' && this.velX !== 1)
        {
            this.velX = 1
            this.velY = 0
        }else if(e.key === 'ArrowLeft' && this.velX !== -1)
        {
            this.velX = -1
            this.velY = 0
        }
    },

    collideWithWalls: function()
    {
        const barLeft = this.x
        const barRight = this.x + this.width
        const barBottom = this.y + this.height

        if(gameConfig.WALLS.LEFT >= barLeft)
        {
            this.stop()
            this.x++;
        }else if(barRight >= gameConfig.WALLS.RIGHT)
        {
            this.stop()
            this.x--;
        }else if(barBottom >= gameConfig.WALLS.BOTTOM)
        {
            this.stop()
            this.y-=50;
        }
    },

    collideWithMap: function()
    {
        if(this.y <= (currentMap.length * gameConfig.configs.TILE_SIZE))
        {
            this.y++;
            this.velY = 0
        }
    },

    stop: function()
    {
        this.velX = 0
        this.velY = 0
    },

    draw: function(ctx)
    {
        ctx.shadowBlur = 10
        ctx.shadowColor = this.color
        ctx.fillStyle = this.color
        ctx.strokeStyle = this.strokeColor
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.shadowBlur = 0
        ctx.shadowColor = "transparent"


        if(MAPS[`level${user.level}`]?.moveUp)
        {
            ctx.shadowBlur = 10
            ctx.shadowColor = "#00f0ff"
            ctx.fillStyle = "#00f0ff"
            ctx.strokeStyle = "#00f0ff"
            ctx.strokeRect(this.x, this.y + 20, this.width, 5)
            ctx.fillRect(this.x, this.y + 20, Math.max(0, (this.mp / this.maxMp)*this.width), 5)
            ctx.shadowBlur = 0
            ctx.shadowColor = "transparent"
        }
    }
}


export default bar
