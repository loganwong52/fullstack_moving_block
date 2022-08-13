import { useEffect, useState } from 'react'

function CooldownCounter({ youLost, ROWMAX, bulletRow, playerCol, setBulletRow, setBulletCol, bulletFired, setBulletFired }) {
    // Bullet Cooldown
    const [cooldownCount, setCooldownCount] = useState(1.5)

    const [reachedTheTop, setReachedTheTop] = useState(false)

    // Cooldown for Bullet //////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        // if bullet has been fired, there's a cooldown time
        console.log("Has bullet been fired: ", bulletFired)
        if (bulletFired) {
            // spawn the bullet
            setBulletCol(playerCol)

            // run the cooldown timer!
            const cdCounter = setInterval(() => {
                setCooldownCount(prevCooldown => (prevCooldown - 0.01).toFixed(2))
            }, 10)

            // wait 1.5 seconds
            console.log("I'm gonna wait...")
            setTimeout(() => {
                console.log("Done waiting! Set fired to false.")
                setBulletFired(false)
                // once the 1.5 seconds are over, delete the cdCounter so it's not subtracting anymore!
                clearInterval(cdCounter)
            }, 1500)

        } else {
            console.log("I haven't fired the bullet.")
            setReachedTheTop(false)

        }
    }, [bulletFired])

    // updating cooldown count
    useEffect(() => {
        if (bulletFired) {
            console.log(cooldownCount)
        } else {
            setCooldownCount(1.50)
        }

    }, [bulletFired, cooldownCount])



    // Bullet movemet ////////////////////////////////////////////////////////////////////////////////////////////////////

    // Every X ms, bullet 1 moves up 1 row
    useEffect(() => {
        if (bulletFired && !reachedTheTop) {
            const bulletTimer = setInterval(() => {
                setBulletRow(prevBulletRow => prevBulletRow - 1)
                // console.log("Bullet moved up!")

            }, 100)
            // it takes 600 ms to get to the other side

            return () => {
                clearInterval(bulletTimer)
                // console.log("Bullet despawned!")
            }
        }

    }, [bulletFired, reachedTheTop])


    // If Bullet is at the top, reset it's location to bottom row
    useEffect(() => {
        // console.log("bulletRow: ", bulletRow)
        // console.log("bulletCol: ", bulletCol)

        if (bulletRow === -1) {
            console.log("STOP bullet!!!")
            setBulletRow(ROWMAX - 1)
            setBulletCol(-1)
            setReachedTheTop(true)
            // setBulletCol(Math.floor(Math.random() * COLMAX - 1))
            console.log("Bullet has reset!")
        }

    }, [bulletRow])


    /////////////////////////////////////////////////////////////////////////////////////////

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