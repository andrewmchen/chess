import chess

class GameManager():
    def __init__(self):
        self.board = chess.Board()
    def get_game(self):
        return self.board
    
