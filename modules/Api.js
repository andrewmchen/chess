import protobuf from 'protobufjs';
import protodef from './generated/proto.json';

const root = protobuf.Root.fromJSON(protodef);
const Move = root.lookupType('chess.Move');
const GameState = root.lookupType('chess.GameState');
const MoveResponse = root.lookupType('chess.Move.Response');
window.Move = Move;

export class Api {
    static getState(cbs) {
        const req = new XMLHttpRequest();
        req.open('GET', '/api/1.0/state', true);
        req.responseType = 'arraybuffer';
        req.onload = function (oEvent) {
            var buffer = new Uint8Array(req.response);
            cbs.success(GameState.decode(buffer));
        };
        req.send();
    }

    static move(from, to, promotion, cbs) {
        const req = new XMLHttpRequest();
        req.open('POST', '/api/1.0/move', true);
        const move = Move.create({
            fromSquare: from,
            toSquare: to,
        });
        req.send(JSON.stringify(Move.toObject(move)));
    }
}
