function CooldownCounter({ youLost, cooldownCount }) {

    //  Some bug for the bullet cooldown when game ends... 
    // so I'll just NOT display it when you've Lost
    return (
        <div>
            {
                youLost
                    ? ''
                    : <h2>BULLET COOLDOWN: {cooldownCount}s</h2>
            }

        </div>
    )
}

export default CooldownCounter