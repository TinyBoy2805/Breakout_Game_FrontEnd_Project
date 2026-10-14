


const DEFAULT_LEVEL = 1

const user = {
    level: DEFAULT_LEVEL,
    highestLevel: DEFAULT_LEVEL,
    currentScore: 0,
    highestScore: 0,
    currentLive: 3,
    maxLive: 5,

    addScore: function(score)
    {
        this.currentScore += score
    },
}

export default user
