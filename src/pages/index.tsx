import { useState } from 'react';
import { clearBoard } from '../boardService';
import Board from '@/components/board';
import Head from 'next/head';

export default function Home() {
    const [playerTurn, setPlayerTurn] = useState<1 | 2>(1);
    const [won, setWon] = useState<boolean>(false);

    const reset = () => {
        setPlayerTurn(1);
        clearBoard();
        setWon(false);
    };

    return (
        <>
            <Head>
                <title>Tic Tac Toe</title>
                <meta
                    property="og:title"
                    content="Tic Tac Toe"
                    key="title"
                />
            </Head>
            <div className="bg-zinc-900 min-h-screen flex-col flex">
                <div className="flex h-[10vh] items-center justify-between px-36 pt-14">
                    <h1 className="text-5xl text-white">Tic Tac Toe</h1>
                    <button
                        onClick={() => {
                            reset();
                        }}
                        className="btn"
                    >
                        Reset
                    </button>
                </div>
                <div className="min-w-full min-h-[90vh] flex text-white">
                    <div className="w-1/3 flex-col flex justify-evenly items-center">
                        <div className={playerTurn == 1 ? ' border-green-600 player-box' : ' border-white player-box'}>
                            <p>Player 1</p>
                            <p>X</p>
                        </div>
                        <div className={playerTurn == 2 ? ' border-green-600 player-box' : ' border-white player-box'}>
                            <p>Player 2</p>
                            <p>O</p>
                        </div>
                    </div>
                    <Board
                        playerTurn={playerTurn}
                        setPlayerTurn={setPlayerTurn}
                        won={won}
                        setWon={setWon}
                    ></Board>
                </div>
            </div>
        </>
    );
}
