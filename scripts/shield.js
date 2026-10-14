
import gameConfig from './game_config.js'
import particle_manager from './particles.js'
const OUT_RANGE_Y = 9999

const createShield = ()=>
{
    return {
        x: 0,
        y: 590,
        width: 1200,
        height: 10,
        color: "#04ffb4d5",
        blurColor: "#00f0ff",
        hp: 100,
        maxHP: 100,
        recoverTime: 25000,
        maxRecoverTime: 25000,
        isBreak: false,
        lastY: 0,

        update: function()
        {
            if(this.isBreak)
            {
                this.recoverTime--;

                if(this.recoverTime === 0)
                {
                    this.recoverTime = this.maxRecoverTime
                    this.isBreak = false
                    this.hp = this.maxHP
                    this.y = this.lastY
                }
            }
        },

        takeDamage: function(dmg)
        {
            this.hp = Math.max(0, this.hp - dmg)
            if(this.hp <= 0)
            {
                this.inactivate();
                this.isBreak = true
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
        },

        inactivate: function()
        {
            this.lastY = this.y
            this.y = OUT_RANGE_Y
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

            if(this.isBreak)
            {
                ctx.shadowBlur = 20
                ctx.shadowColor = "#00f7ff"
                ctx.font = "20px Arial"
                ctx.fillStyle = "#00f7ff"
                ctx.textAlign ="center"
                ctx.textBaseline = "middle"

                const percent = this.maxHP * (1 - (this.recoverTime / this.maxRecoverTime))

                ctx.fillText(`Shield Recharging... ${Math.floor(percent)} / ${this.maxHP}`, gameConfig.configs.GAME_WIDTH/2, this.lastY-10)
                ctx.shadowBlur = 0
                ctx.shadowColor = "transparent"
            }


        }
    }
}

let shield = null

export default {createShield, shield}

