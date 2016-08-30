import React, { Component } from 'react';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {Game} from './state';
import {COLS, ROWS, SQUARE} from './constants';

let a = new Game();
console.log(a.state);

class _Board extends Component {
    constructor(props) {
        super(props);
        this.state = a.state;
        this.move = this.move.bind(this)
    }
    canMove(from, to) {
        let moves = a.movesFrom(from);
        console.log(moves);
        let squares = moves.map(m => m.match(/[a-h][1-8]/)[0]);
        return (squares.indexOf(to) != -1);
    }
    move(from, to) {
        console.log(a.move(from, to));
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
                    color = a.state[s]['color']; 
                    piece = a.state[s]['type'];
                }
                row.push((<Square canMove={this.canMove} move={this.move} key={s} square={s} squareColor={squareColor} color={color} piece={piece}/>));
            });
            rows.push(<div key={r} className='row'>{row}</div>);
        });
        return (<div className='board'>{rows}</div>);
    }
}

const squareTarget = {
  drop(props, monitor) {
      let from = monitor.getItem()['square'];
      let to = props.square;
      if (props.canMove(from, to)) {
          props.move(from, to);
      }
  }
};

function squareCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        dragged: monitor.getItem(),
    };
}

class _Square extends Component {
    render() {
        let overClass = this.props.isOver && this.props.canMove(this.props.dragged['square'], this.props.square) ? 'over' : '';
        let classes = ['square', this.props.squareColor, overClass].join(' ')
        return this.props.connectDropTarget(
            <div className={classes}>
                <Piece square={this.props.square} color={this.props.color} piece={this.props.piece}/>
            </div>
        );
    }
}
let Square = DropTarget('piece', squareTarget, squareCollect)(_Square);

const pieceSource = {
    beginDrag(props) {
        return {square: props.square};
    }
};

function pieceCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class _Piece extends Component {
    render() {
        if (this.props.color && !this.props.isDragging) {
            let imageName = `assets/${this.props.color}${this.props.piece}.svg`;
            return this.props.connectDragSource(
                <img className='piece' src={imageName}></img>
            );
        } else {
            return null;
        }
    }
}
let Piece = DragSource('piece', pieceSource, pieceCollect)(_Piece);

let Board = DragDropContext(HTML5Backend)(_Board);
export {Board};
