import React from 'react'
import { Grid, Box, IconButton } from '../imports'
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

import Marble from './Marble'

export default function Quadrant(props) {
    
    // handle quadrant rotations, calls rotateQuadrant from usePentago hook
    const handleRotations = (quadrant, direction) => {
        props.rotateQuadrant(quadrant, direction)
        // if (direction === 'left') setRotation(rotation - 0.25)
        // else setRotation(rotation + 0.25)
    }

    return (
        <Box p={'10px'} display={'flex'} flexDirection={'column'} justifyContent={'center'} position={'relative'}>
            {props.quadrantNumber <= 1 ? <Box>
                <IconButton size='small' disabled={props.gameState !== 'ongoing'} 
                    aria-label="delete" color="#593e27" 
                    onClick={() => props.marblePlaced && handleRotations(props.quadrantNumber, 'left')}>
                    <UndoIcon />
                </IconButton>
                <IconButton size='small' 
                    disabled={props.gameState !== 'ongoing'}
                    aria-label="delete" 
                    color="#593e27" 
                    onClick={() => props.marblePlaced && handleRotations(props.quadrantNumber, 'right')}>
                    <RedoIcon />
                </IconButton>
                </Box> : null}
            <Grid container columns={3} spacing={0} 
                sx={{ 
                    width: {xs: '135px', sm: '200px', md: '200px'},
                    height: {xs: '135px', sm: '200px', md: '200px'},
                    
                }}
                borderRadius={3}
                bgcolor={'#BA8C63'} 
                justifyContent={'center'} alignItems={'center'}>
                
                {props.quadrant.map((quadrantRow, row) => (
                    quadrantRow.map((marble, col) => (
                        <Grid item key={col} xs={1}>
                            <Marble quadrantNumber={props.quadrantNumber} row={row} col={col} value={marble}
                                currentTurn={props.currentTurn} marblePlaced={props.marblePlaced}
                                addMarble={props.addMarble} gameState={props.gameState}/>
                        </Grid>
                    ))
                ))} 
                
            </Grid>
            {props.quadrantNumber > 1 ? <Box>
                <IconButton size='small' disabled={props.gameState !== 'ongoing'} 
                    aria-label="delete" color="#593e27" 
                    onClick={() => props.marblePlaced && handleRotations(props.quadrantNumber, 'left')}>
                    <UndoIcon />
                </IconButton>
                <IconButton size='small' 
                    disabled={props.gameState !== 'ongoing'}
                    aria-label="delete" 
                    color="#593e27" 
                    onClick={() => props.marblePlaced && handleRotations(props.quadrantNumber, 'right')}>
                    <RedoIcon />
                </IconButton>
                </Box> : null}
        </Box>
    )
}
