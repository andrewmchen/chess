import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import { Piece } from './Piece.js'

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

const squareTarget = {
  drop(props, monitor) {
      let from = monitor.getItem()['square'];
      let to = props.square;
      console.log(from);
      console.log(to);
      console.log(props.canMove(from, to));
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

export const Square = DropTarget('piece', squareTarget, squareCollect)(_Square);
