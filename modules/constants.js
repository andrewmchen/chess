const COLS = 'abcdefgh';
const ROWS = '12345678';

var SQUARES = [];
ROWS.split('').forEach(r => {
    COLS.split('').forEach(c => {
        SQUARES.push(c + r);
    });
});

export {SQUARES, ROWS, COLS};
