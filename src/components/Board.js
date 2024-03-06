import React from 'react'
import { Grid, Box, Typography, Button } from '../imports'

import usePentago from '../util/usePentago'
import Quadrant from './Quadrant'
import { useTheme } from '@emotion/react'

export default function Board({start}) {
    
    const { 
        currentTurn, 
        addMarble, 
        whiteMarbles,
        blackMarbles, 
        marblePlaced, 
        gameState, 
        rotateQuadrant, 
        quadrants, 
        resetGame

    } = usePentago(Array.from(Array(6), _ => Array(6).fill(0)))

    return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} mt={'20px'}>
        {gameState === 'ongoing' ? 
        <Box display={'flex'} justifyContent={'space-between'}>
            <Box width={'80px'}>
            {currentTurn % 2 === 0 ? 
            <Typography 
                fontWeight={'bold'} 
                fontFamily={'Dosis'}>
                WHITE TURN
            </Typography> : null}
            </Box>
            <Box width={'200px'}>
            <Typography 
                fontWeight={'bold'} 
                fontFamily={'Dosis'}>
                {marblePlaced ? 'ROTATE A QUADRANT' : 'PLACE A MARBLE'}
            </Typography>
            </Box>
            <Box width={'80px'}>
            {currentTurn % 2 !== 0 ? <Typography 
                fontWeight={'bold'} 
                fontFamily={'Dosis'}>
                BLACK TURN
            </Typography> : null}
            </Box>
        </Box> : 
        <Box height={'20px'} mb={2}>
            {gameState === 'TIE' ? 
                <Typography 
                    fontWeight={'bold'} 
                    fontFamily={'Dosis'}>
                    {gameState} GAME!
                </Typography> : 
                <Typography 
                    fontWeight={'bold'} 
                    fontFamily={'Dosis'}>
                    {gameState} WINS!
                </Typography>
            }
        </Box>}
        
        
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} >
        
            <Box display={'flex'} maxWidth={'200px'}>
                <Grid container spacing={0} columns={18} sx={{display: {xs: 'none', md: 'inherit'}}}>
                {[...Array(whiteMarbles)].map((e, whiteMarbleIndex) => (
                    <Grid item key={whiteMarbleIndex} xs={8} sm={8} md={6}>
                        <Box 
                            borderRadius={'50%'} m={'15px'} 
                            sx={{ 
                                border: gameState === 'ongoing' && !marblePlaced && currentTurn % 2 === 0 && whiteMarbleIndex === whiteMarbles-1 ? '2px solid red' : null,
                                margin: {xs: '5px', md: '10px'},
                                background:
                                    `radial-gradient(circle at 100px 100px, 
                                    ${'black'}, ${'white'})`,
                                boxShadow: '1px 1px 8px 1px rgba(0,0,0,.6)',
                                width: {xs: '25px', md: '35px'},
                                height: {xs: '25px', md: '35px'},
                                
                            }}
                        />
                    </Grid>
                ))}
                </Grid>
            </Box>
        
            <Grid container columns={2} spacing={0}
                pt={2} justifyContent={'center'} sx={{maxWidth: {xs: '350px', sm: '520px'}}}
            >
                {quadrants.map((quadrant, index) => (
                    <Grid item key={index} className={`quadrant${index}`} xs={0}>
                    
                        <Quadrant 
                            quadrant={quadrant} 
                            quadrantNumber={index} 
                            currentTurn={currentTurn} 
                            addMarble={addMarble} 
                            marblePlaced={marblePlaced}
                            rotateQuadrant={rotateQuadrant}
                            gameState={gameState}
                            />
                    </Grid>
                ))} 
            </Grid>

        <Box display={'flex'} maxWidth={'200px'}>
            <Grid container spacing={0} columns={18}  sx={{display: {xs: 'none', md: 'inherit'}}} >
            {[...Array(blackMarbles)].map((e, blackMarbleIndex) => (
                <Grid item key={blackMarbleIndex} xs={8} sm={8} md={6}>
                    <Box
                        borderRadius={'50%'} m={'15px'} 
                        sx={{
                            border: gameState === 'ongoing' && !marblePlaced && currentTurn % 2 !== 0 && blackMarbleIndex === blackMarbles-1 ? '2px solid red' : null,
                            margin: {xs: '5px', md: '10px'},
                            background:
                                `radial-gradient(circle at 100px 100px, ${'white'}, ${'black'})`,
                            boxShadow: '1px 1px 8px 1px rgba(0,0,0,.6)',
                            width: {xs: '25px', md: '35px'},
                            height: {xs: '25px', md: '35px'},
                        }}
                    />
                </Grid>
            ))}
            </Grid></Box>
        </Box>
        {
            <Box>
                <Button variant='contained' color='primary' onClick={() => resetGame()}>
                    RESTART   
                </Button>
            </Box>
        }
    </Box>
    )
}
