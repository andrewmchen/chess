import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';

import { Square } from './Square.js'
import { Game } from './State.js';
import { COLS, ROWS } from './Constants.js';
import { Api } from './Api.js';

const game = new Game();
window.game = game;

class _Board extends Component {
    constructor(props) {
        super(props);
        this.state = game.state;
        this.move = this.move.bind(this);
    }
    componentDidMount() {
        Api.getState({
            success: _.bind(function(gameState) {
                game.loadFen(gameState.fen);
                this.setState(game.state);
            }, this),
        });
        setInterval(() => {
            Api.getState({
                success: _.bind(function(gameState) {
                    game.loadFen(gameState.fen);
                    this.setState(game.state);
                }, this),
            });
        }, 1000);
    }
    canMove(from, to) {
        const moves = game.movesFrom(from);
        for (let move of moves) {
            if (move.to === to) {
                return true;
            }
        }
        return false;
    }
    move(from, to) {
        console.log(from)
        console.log(to)
        Api.move(from, to);
        game.move(from, to);
        this.setState(game.state);
    }
    render() {
        let rows = [];
        ROWS.split('').reverse().forEach(r => {
            let row = [];
            COLS.split('').forEach(c => {
                let s = c + r;
                let squareColor = game.squareColor(s);
                let color = null;
                let piece = null;
                if (this.state[s]) {
                    color = this.state[s].color; 
                    piece = this.state[s].type;
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
