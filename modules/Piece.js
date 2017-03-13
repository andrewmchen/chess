import { Component } from 'react';
import { DragSource } from 'react-dnd';

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

const pieceSource = {
    beginDrag(props) {
        return { square: props.square };
    }
};

function pieceCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

export const Piece = DragSource('piece', pieceSource, pieceCollect)(_Piece);

