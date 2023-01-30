import { Subject } from 'rxjs';

let board: Array<'o' | 'x' | null> = Array(9).fill(null);

export const boardSubject: Subject<Array<'o' | 'x' | null>> = new Subject<Array<'o' | 'x' | null>>();

export function addX(index: number) {
    board[index] = 'x';
    boardSubject.next(board);
}

export function addO(index: number) {
    board[index] = 'o';
    boardSubject.next(board);
}

export function clearBoard() {
    board = Array(9).fill(null);
    boardSubject.next(board);
}
