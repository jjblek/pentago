import { useState } from "react"

// Pentago Hooks
const usePentago = (m) => {
    const [board, setBoard] = useState(m)
    const boardCopy = [...board]
    const [quadrants, setQuadrants] = useState([
        [
            boardCopy[0].slice(0, 3),
            boardCopy[0 + 1].slice(0, 3), 
            boardCopy[0 + 2].slice(0, 3)
        ],
        [
            boardCopy[0].slice(3), 
            boardCopy[0 + 1].slice(3), 
            boardCopy[0 + 2].slice(3)
        ],[
            boardCopy[3].slice(0, 3),
            boardCopy[3 + 1].slice(0, 3), 
            boardCopy[3 + 2].slice(0, 3)
        ],
        [
            boardCopy[3].slice(3), 
            boardCopy[3 + 1].slice(3), 
            boardCopy[3 + 2].slice(3)
        ]
    ])

    // game states
    const [currentTurn, setCurrentTurn] = useState(0)
    const [marblePlaced, setMarblePlaced] = useState(false)
    const [whiteMarbles, setWhiteMarbles] = useState(18)
    const [blackMarbles, setBlackMarbles] = useState(18)
    // const [usedMarbles, setUsedMarbles] = useState(0)
    // const [guesses, setGuesses] = useState([...Array(6)])
    const [gameState, setGameState] = useState('ongoing');
    const resetGame = () => {
        const emptyArr = Array.from(Array(6), _ => Array(6).fill(0))
        setBoard(emptyArr)
        setQuadrants([
            [
                emptyArr[0].slice(0, 3),
                emptyArr[0 + 1].slice(0, 3), 
                emptyArr[0 + 2].slice(0, 3)
            ],
            [
                emptyArr[0].slice(3), 
                emptyArr[0 + 1].slice(3), 
                emptyArr[0 + 2].slice(3)
            ],[
                emptyArr[3].slice(0, 3),
                emptyArr[3 + 1].slice(0, 3), 
                emptyArr[3 + 2].slice(0, 3)
            ],
            [
                emptyArr[3].slice(3), 
                emptyArr[3 + 1].slice(3), 
                emptyArr[3 + 2].slice(3)
            ]
        ])
        
        setBlackMarbles(18)
        setWhiteMarbles(18)
        setMarblePlaced(false)
        setCurrentTurn(0)
        setGameState('ongoing')
    }
    const addMarble = (player, quadrant, row, col) => {

        let quadrantsCopy = [...quadrants]
        let quadrantCopy = quadrantsCopy[quadrant]
        quadrantCopy[row][col] = player;
        setQuadrants(quadrantsCopy)

        if (quadrant === 1 || quadrant === 3) col+=3
        if (quadrant === 2 || quadrant === 3) row+=3

        let copy = [...board];
        
        copy[row][col] = player;
        setBoard(copy);
        checkWinConditions()
        setMarblePlaced(true)
        if (player === 1) 
            setBlackMarbles(blackMarbles-1)
        else setWhiteMarbles(whiteMarbles-1)
        
    }

    const getQuadrant = quadrantNumber => {

        switch(quadrantNumber) {
            case 0: return [
                board[0].slice(0, 3),
                board[0 + 1].slice(0, 3), 
                board[0 + 2].slice(0, 3)
            ];
            case 1: return [
                board[0].slice(3), 
                board[0 + 1].slice(3), 
                board[0 + 2].slice(3)
            ];
            case 2: return [
                board[3].slice(0, 3),
                board[3 + 1].slice(0, 3), 
                board[3 + 2].slice(0, 3)
            ];
            case 3: return [
                board[3].slice(3), 
                board[3 + 1].slice(3), 
                board[3 + 2].slice(3)
            ];
            default: return null 
        }
    }
    
    const reverse = matrix =>  matrix.map(row => row.reverse());
    const transpose = matrix => {
        for (let row = 0; row < matrix.length; row++) {
            for (let column = 0; column < row; column++) {
                let temp = matrix[row][column]
                matrix[row][column] = matrix[column][row]
                matrix[column][row] = temp
            }
        }
        return matrix;
    }

    const rotateQuadrant = (quadrantNumber, direction) => {
            let copy = [...board];
            let quadrant = getQuadrant(quadrantNumber)
            
            let rotated = direction === 'right' ? reverse(transpose(quadrant)) : transpose(reverse(quadrant));
            
            let quadrantsCopy = [...quadrants]
            quadrantsCopy[quadrantNumber] = rotated
            setQuadrants(quadrantsCopy)

            switch (quadrantNumber) {
                case 0:
                    copy[0].splice(0, 3, rotated[0][0], rotated[0][1], rotated[0][2])
                    copy[0 + 1].splice(0, 3, rotated[1][0], rotated[1][1], rotated[1][2])
                    copy[0 + 2].splice(0, 3, rotated[2][0], rotated[2][1], rotated[2][2])
                    break;
                case 1:
                    copy[0].splice(3, 3, rotated[0][0], rotated[0][1], rotated[0][2])
                    copy[0 + 1].splice(3, 3, rotated[1][0], rotated[1][1], rotated[1][2])
                    copy[0 + 2].splice(3, 3, rotated[2][0], rotated[2][1], rotated[2][2])
                    break;
                case 2: 
                    copy[3].splice(0, 3, rotated[0][0], rotated[0][1], rotated[0][2])
                    copy[3 + 1].splice(0, 3, rotated[1][0], rotated[1][1], rotated[1][2])
                    copy[3 + 2].splice(0, 3, rotated[2][0], rotated[2][1], rotated[2][2])
                    break;
                case 3: 
                    copy[3].splice(3, 3, rotated[0][0], rotated[0][1], rotated[0][2]) 
                    copy[3 + 1].splice(3, 3, rotated[1][0], rotated[1][1], rotated[1][2])
                    copy[3 + 2].splice(3, 3, rotated[2][0], rotated[2][1], rotated[2][2])
                    break;
                default: break;
            }

            setBoard(copy);
            checkWinConditions()
            
            if (gameState === 'ongoing') {
                setCurrentTurn(currentTurn + 1)
                setMarblePlaced(false)
            }

        
    }


    function isWinner(line) {
        if (line === 5) {
            if (gameState === 'WHITE') setGameState('TIE')
            else setGameState('BLACK')
        } 
        if (line === -5) {
            if (gameState === 'BLACK') setGameState('TIE')
            else setGameState('WHITE')
        }
    }

    const checkWinConditions = () => {

        //let diagonalLeft = 0
        //let diagonalRight = 0
        if (currentTurn === 10) return
        for (let row = 0; row < board.length; row++) {
            let horizontal = 0;
            for (let col = 0; col < board[row].length; col++) {
                if (col === 0) horizontal += board[row][col]
                else if (board[row][col] === board[row][col - 1]) horizontal += board[row][col]
                else horizontal = board[row][col]
                isWinner(horizontal)
            }

            let vertical = 0
            for (let col = 0; col < board.length; col++) {
                if (col === 0) vertical += board[col][row]
                else if (board[col][row] === board[col-1][row]) vertical += board[col][row]
                else vertical = board[col][row]
                
                isWinner(vertical)
            }
            
        }

        // there are eight diagonals to check
        // the only diagonals that need to be checked are of length 5
        const diagonals = [
            board[0][0] + board[1][1] + board[2][2] + board[3][3] + board[4][4], 
            board[1][1] + board[2][2] + board[3][3] + board[4][4] + board[5][5], 
            board[0][1] + board[1][2] + board[2][3] + board[3][4] + board[4][5], 
            board[1][0] + board[2][1] + board[3][2] + board[4][3] + board[5][4],
            board[0][5] + board[1][4] + board[2][3] + board[3][2] + board[4][1],
            board[1][4] + board[2][3] + board[3][2] + board[4][1] + board[5][0],
            board[0][4] + board[1][3] + board[2][2] + board[3][1] + board[4][0],
            board[1][5] + board[2][4] + board[3][3] + board[4][2] + board[5][1]
        ]
        
        diagonals.forEach(isWinner)

        if (currentTurn === 35 && gameState === 'ongoing') setGameState('TIE')
    }

    return {
        currentTurn, addMarble, board, gameState, rotateQuadrant, quadrants, marblePlaced, whiteMarbles, blackMarbles, resetGame
    }
}

export default usePentago