
import gameConfig from './game_config.js'
import particle_manager from './particles.js'
const OUT_RANGE_Y = 9999
const DEFAULT_Y = 590

const createShield = ()=>
{
    return {
        x: 0,
        y: OUT_RANGE_Y,
        width: 1200,
        height: 10,
        color: "#04ffb4d5",
        blurColor: "#00f0ff",
        hp: 0,
        maxHP: 50,

        update: function()
        {
           
        },

        addShield: function(val)
        {
            this.hp = Math.min(this.hp + val, this.maxHP)
            this.active()
        },

        takeDamage: function(dmg)
        {
            this.hp = Math.max(0, this.hp - dmg)
            if(this.hp <= 0)
            {
                this.inactivate()
                for(let i=0; i<5; i++)
                {
                    particle_manager.addParticle(
                        gameConfig.configs.GAME_WIDTH/2,
                        this.y,
                        {
                            alpha: 1,
                            color: this.color,
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

        inactivate: function()
        {
            this.y = OUT_RANGE_Y
        },

        active: function()
        {
            this.y = DEFAULT_Y
        },

        draw: function(ctx)
        {
            ctx.font = "20px Arial"
            ctx.fillStyle = "#4cffc3"
            ctx.textAlign ="center"
            ctx.textBaseline = "middle"
            ctx.fillText(`${this.hp} / ${this.maxHP}`, gameConfig.configs.GAME_WIDTH/2, this.y-10)

            ctx.shadowBlur = 20
            ctx.shadowColor = this.blurColor

            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)

            ctx.shadowBlur = 0
            ctx.shadowColor = "transparent"

        }
    }
}

let shield = null

export default {createShield, shield}

