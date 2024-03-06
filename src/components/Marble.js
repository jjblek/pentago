import React, { useEffect, useState } from 'react'
import { Box } from '../imports'

export default function Marble(props) {
    const [marbleValue, setMarbleValue] = useState(0)

    useEffect(() => {
        setMarbleValue(props.value)
    }, [props.value])

    const handleClick = () => {
        
        if (marbleValue !== 0) return    // if a marble has already been placed, do nothing
        
        if (props.currentTurn & 1) {      // if the current turn is odd, it is player 1's turn

            
            // add a marble
            props.addMarble(1, props.quadrantNumber, props.row, props.col)

        } 
        else {
    
            // add a marble
            props.addMarble(-1, props.quadrantNumber, props.row, props.col)
        }
        
        
        
    }

    return (
        <Box onClick={props.marblePlaced ? null : handleClick} 
            borderRadius={'50%'}
            sx={{
                margin: {xs: '10px', sm: '15px'},
                background:  marbleValue !== 0 ? 
                    `radial-gradient(circle at 100px 100px, 
                    ${marbleValue === 1 ? 'white' : 'black'}, ${marbleValue === 1 ? 'black' : 'white'})` : 
                    `radial-gradient(circle at center, #876343,
                        ${'#BA8C63'})`,
                boxShadow: marbleValue !== 0 && '1px 1px 8px 1px rgba(0,0,0,.6)',
                width: {xs: '25px', sm: '35px'},
                height: {xs: '25px', sm: '35px'},
                '&:hover': !props.marblePlaced && marbleValue === 0 && props.gameState === 'ongoing' ? {

                        border: '2px solid red',
                } : null,
            }}
        />
        
    )
}
