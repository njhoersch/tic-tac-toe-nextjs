import { addO, addX, boardSubject } from '@/boardService';
import { useEffect, useState } from 'react';

const possibleWins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [0, 4, 6],
];

const Board = ({
    playerTurn,
    setPlayerTurn,
    won,
    setWon,
}: {
    playerTurn: 1 | 2;
    setPlayerTurn: Function;
    won: boolean;
    setWon: Function;
}) => {
    const [board, setBoard] = useState<('o' | 'x' | null)[]>(Array(9).fill(null));

    useEffect(() => {
        const subscription = boardSubject.subscribe((newBoard) => {
            setBoard(newBoard);
        });

        return () => {
            subscription.unsubscribe();
        };
    });

    const evaluate = () => {
        for (const condition of possibleWins) {
            if (
                board?.at(condition[0]) &&
                board?.at(condition[1]) &&
                board?.at(condition[2]) &&
                board?.at(condition[0]) == board?.at(condition[1]) &&
                board?.at(condition[0]) == board?.at(condition[2])
            ) {
                setWon(true);
            }
        }
    };

    const makePlayerMove = (index: number) => {
        if (board?.at(index)) {
            return;
        }

        if (playerTurn == 1) {
            addX(index);
            setPlayerTurn(2);
        } else {
            addO(index);
            setPlayerTurn(1);
        }

        evaluate();
    };

    if (won) {
        return (
            <div className="flex  w-2/3 p-10 justify-center items-center">
                <div className="board">
                    {playerTurn != 1 && <div>Player 1 wins.</div>}
                    {playerTurn != 2 && <div>Player 2 wins.</div>}
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex  w-2/3 p-10 justify-center items-center">
                <div className="board board-background">
                    {board?.map((square, index) => {
                        return (
                            <div
                                className="board-spot"
                                key={index}
                                onClick={() => {
                                    makePlayerMove(index);
                                }}
                            >
                                {square == null ? '' : square.toString().toUpperCase()}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
};

export default Board;
