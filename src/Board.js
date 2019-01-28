import React from 'react';
import Square from './Square'
import './index.css';

class Board extends React.Component {
    createTable(row, col) {
        const table = [];
        let counter = 0;

        for (let i = 0; i < row; i += 1) {
            const children = [];
            for (let j = 0; j < col; j += 1) {
                children.push(this.renderSquare(counter++));
            }
            table.push(<div key={i} className="board-row">{children}</div>);
        }
        return table;
    }

    renderSquare(i) {
        const winnerClass =
            this.props.winnerSquares &&
            (this.props.winnerSquares[0] === i ||
                this.props.winnerSquares[1] === i ||
                this.props.winnerSquares[2] === i)
                ? 'winner-squares '
                : '';

        return <Square
            key={i}
            winnerClass={winnerClass}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />;
    }

    render() {
        return (
            <div>
                {this.createTable(3, 3)}
            </div>
        );
    }
}

export default Board;