import Chess from 'chess.js';
import { SQUARES } from './constants';

class Game {
    constructor() {
        this.chess = new Chess();
    }

    get state() {
        let state = {}
        SQUARES.forEach(s => {
            if (this.chess.get(s)) {
                state[s] = this.chess.get(s);
            }
        });
        return state;
    }

    movesFrom(from) {
        return this.chess.moves({square: from});
    }

    move(from, to) {
        return this.chess.move({from: from, to: to});
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
