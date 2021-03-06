import React from 'react';
import Board from './Board'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                historyStep: 0,
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares).winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState((state) => {
            return {
                history: history.concat([{
                    squares: squares,
                    currentLocation: getLocationOfMove(i),
                    historyStep: history.length,
                }]),
                stepNumber: history.length,
                xIsNext: !state.xIsNext,
            }
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    sortMoves() {
        this.setState((state) => {
            return {history: state.history.reverse()}
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const { winner, winnerRow } = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const currentLocation = step.currentLocation ? `(${step.currentLocation})` : '';
            const classButton = (move === this.state.stepNumber) ? 'btn-green' : '';
            const desc = step.historyStep ?
                'Go to move #' + step.historyStep :
                'Go to game start';
            return (
                <li key={step.historyStep}>
                    <button className={classButton} onClick={() => this.jumpTo(move)}>{`${desc} ${currentLocation}`}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else if (history.length === 10) {
            status = 'No one won. Pls go to game start.';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        winnerSquares={winnerRow}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button className="button" onClick={() => this.sortMoves()}>
                        Sort moves
                    </button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], winnerRow: lines[i] };
        }
    }
    return { winner: null, winnerRow: null };
}

function getLocationOfMove(move) {
    const locations = {
        0: 'row: 1, col: 1',
        1: 'row: 1, col: 2',
        2: 'row: 1, col: 3',
        3: 'row: 2, col: 1',
        4: 'row: 2, col: 2',
        5: 'row: 2, col: 3',
        6: 'row: 3, col: 1',
        7: 'row: 3, col: 2',
        8: 'row: 3, col: 3',
    };
    return locations[move];
}

export default Game;