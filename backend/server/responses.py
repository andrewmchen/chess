from flask import Response
from backend.proto import chess_pb2 as ChessProto

class StateResponse(Response):
    """
    :param: game_state := chess.Board
    """
    def __init__(self, game):
        super(StateResponse, self).__init__()
        state = ChessProto.GameState()
        state.fen = game.fen()
        self.headers['Content-Type'] = 'application/octet-stream'
        self.data = state.SerializeToString()

class MoveResponse(Response):
    """
    :param: game_state := chess.Board
    """
    def __init__(self, game):
        super(StateResponse, self).__init__(game)

