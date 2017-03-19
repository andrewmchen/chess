import os
import chess
import base64
import  google.protobuf.json_format as json_format
from server import GameManager, responses
from proto import chess_pb2 as ChessProto
from flask import Flask, Response, request

app = Flask(__name__, static_folder='../static')
game_manager = GameManager()

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/api/1.0/state')
def state():
    game = game_manager.get_game()
    return responses.StateResponse(game)

@app.route('/api/1.0/move', methods=['POST'])
def move():
    game = game_manager.get_game()
    move = json_format.Parse(request.data, ChessProto.Move())
    chess_move = chess.Move.from_uci('{0}{1}'.format(
        move.from_square,
        move.to_square))
    if chess_move in game.legal_moves:
        game.push(chess_move)
    return responses.MoveResponse(game)

@app.route('/api/1.0/reset')
def reset():
    game = game_manager.get_game()
    game.reset()
    return responses.StateResponse(game)
