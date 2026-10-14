import gameConfig from './game_config.js'



const createTextFly = (x, y, text, config)=>
{
    return {
        x, y, text, config,
        destroyed: false,

        update: function()
        {
            this.config.lifeTime--;
            if(this.config.lifeTime <= 0)
            {
                this.destroyed = true
            }

            this.y -= 0.35
        },

        draw: function(ctx)
        {
            ctx.shadowBlur = 20
            ctx.shadowColor = config?.color ?? "#fafafa"

            ctx.font = config?.font ?? "20px Arial"
            ctx.fillStyle = config?.color ?? "#fafafa"
            ctx.textAlign = config?.align ?? "center"
            ctx.textBaseline = config?.baseLine ?? "middle"
            ctx.fillText(this.text, this.x, this.y)

            ctx.shadowBlur = 0
            ctx.shadowColor = "transparent"
        }


    }
}


const text_flies = []

export default {createTextFly, text_flies}
