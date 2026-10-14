

//`rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`

const createParticle = (x, y, config)=>
{
    return {
        x, y,
        destroyed: false,

        update: function()
        {
            config.life--;
            config.alpha = Math.max(config.alpha - 0.001, 0);
            if(config?.life===0)
            {
                this.destroyed = true;
            }
            this.x += Math.cos(config?.angle) * config?.speed
            this.y += Math.sin(config?.angle) * config?.speed
            this.y += config?.gravity

        },


        draw: function(ctx)
        {
            ctx.fillStyle = config?.color
            ctx.globalAlpha = config?.alpha
            ctx.shadowBlur = 20
            ctx.shadowColor = config?.color
            // ctx.beginPath()
            // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
            // ctx.fill()

            ctx.fillRect(this.x, this.y, config?.radius, config?.radius)

            ctx.shadowBlur = 0
            ctx.shadowColor = "transparent"
            ctx.globalAlpha = 1

        }


    }
}

const particle_manager = {
    particles: [],
    addParticle: function(x, y, config,)
    {
        const p = createParticle(x, y, config)
        this.particles.push(p)
        return p

    },

    create: function(count)
    {
        for(let i=0; i<count; i++)
        {
            
        }
    }

}




export default particle_manager
