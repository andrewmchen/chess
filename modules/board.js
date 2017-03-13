import React, { Component } from 'react';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Game } from './State.js';
import { Square } from './Square.js';
import { COLS, ROWS, SQUARES } from './Constants.js';

let a = new Game();

class _Board extends Component {
    constructor(props) {
        super(props);
        this.state = a.state;
        this.move = this.move.bind(this);
    }
    canMove(from, to) {
        let moves = a.movesFrom(from);
        let squares = moves.map(m => m.match(/[a-h][1-8]/)[0]);
        return (squares.indexOf(to) != -1);
    }
    move(from, to) {
        a.move(from, to);
        this.setState(a.state);
    }
    render() {
        let rows = [];
        ROWS.split('').reverse().forEach(r => {
            let row = [];
            COLS.split('').forEach(c => {
                let s = c + r;
                let squareColor = a.squareColor(s);
                let color = null;
                let piece = null;
                if (a.state[s]) {
                    color = a.state[s].color; 
                    piece = a.state[s].type;
                }
                row.push(
                  (<Square 
                      canMove={this.canMove} 
                      move={this.move}
                      key={s}
                      square={s}
                      squareColor={squareColor}
                      color={color}
                      piece={piece}
                  />)
                );
            });
            rows.push(<div key={r} className='row'>{row}</div>);
        });
        return (<div className='board'>{rows}</div>);
    }
}
export const Board = DragDropContext(HTML5Backend)(_Board);
