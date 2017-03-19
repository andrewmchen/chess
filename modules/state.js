import Chess from 'chess.js';
import { SQUARES } from './Constants.js';

class Game {
    constructor() {
        this.chess = new Chess();
    }

    get state() {
        let state = {}
        SQUARES.forEach(s => {
            if (this.chess.get(s)) {
                state[s] = this.chess.get(s);
            } else {
                state[s] = undefined;
            }
        });
        return state;
    }

    loadFen(fen) {
        this.chess.load(fen);
    }

    movesFrom(from) {
        return this.chess.moves({
            square: from,
            verbose: true,
        });
    }

    moveDetail(from, to) {
        const moves = this.movesFrom(from).filter(m => m.to === to);
        if (moves.length == 0) {
            return;
        } else {
            return moves[0];
        }
    }

    move(from, to) {
        const moveDetail = this.moveDetail(from, to);
        if (moveDetail !== undefined) {
            const move = { from: from, to: to }
            if ('promotion' in moveDetail) {
                move.promotion = 'q';
            }
            return this.chess.move(move);
        }
    }

    squareColor(s) {
        return this.chess.square_color(s);
    }

    render() {
        return (
            <Board />
        );
    }
}

export { Game };
