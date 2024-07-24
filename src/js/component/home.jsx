import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [boardPositions, setBoardPositions] = useState([]);
	const [boardSize, setBoardSize] = useState(10);
	const [turns, setTurns] = useState(0);
	const [backgrounds, setBackgrounds] = useState(['#1e81a8', '#1e81a8', 'red', 'grey']);

	const buildBoard = (size) => {
		let board = [];
		for (let i = 0; i < size; i++) {
			let row = [];
			for (let j = 0; j < size; j++) {
				row.push(0);
			}
			board.push(row);
		}
		addShip(board, 3, [1, 1], true);
		addShip(board, 4, [6, 2], false);
		addShip(board, 2, [3, 3], true);

		return board;
	}

	const addShip = (board, shipSize, initialPosition, isHorizontal) => {
		let posX = initialPosition[0];
		let posY = initialPosition[1];

		if (isHorizontal) {
			for (let j = posY; j < (posY + shipSize); j++) {
				board[posX][j] = 1;
			}
		} else {
			for (let i = posX; i < (posX + shipSize); i++) {
				board[i][posY] = 1;
			}
		}
	}

	const resetBoard = () => {
		let board = buildBoard(boardSize);
		setTurns(0);
		setBoardPositions(board);
	}

	const fireBullet = (posX, posY) => {
		let board = [...boardPositions];

		if (board[posX][posY] === 1) {
			board[posX][posY] = 2;
			setTurns(turns + 1);
		}

		if (board[posX][posY] === 0) {
			board[posX][posY] = 3;
			setTurns(turns + 1);
		}

		setBoardPositions(board);
	}

	useEffect(() => {
		let board = buildBoard(boardSize);

		setBoardPositions(board);
	}, [])

	return (
		<div className="container text-center p-5">
			<h1>Battleship with React</h1>
			<h4>Turns: {turns}</h4>
			<div
				id="myboard"
			>
				{
					boardPositions.map((row, rowIndex) => {
						return (
							<div
								className="row"
								key={rowIndex}
							>
								{
									row.map((col, colIndex) => {
										return (
											<div
												className="board-block col"
												key={colIndex}
												style={{ background: backgrounds[col] }}
												onClick={() => fireBullet(rowIndex, colIndex)}
											></div>
										)
									})
								}
							</div>
						)
					})
				}
			</div>
			<div className="row">
				<div className="col-6 mx-auto">
					<button
						className="col-6 btn btn-light"
						onClick={() => {
							if (backgrounds[1] === '#1e81a8') setBackgrounds(['#1e81a8', 'lightgrey', 'red', 'grey'])
							else setBackgrounds(['#1e81a8', '#1e81a8', 'red', 'grey'])
						}}
					>{backgrounds[1] === '#1e81a8' ? "Show Ships" : "Hide Ships"}</button>
					<button
						disabled={turns === 0}
						className="col-6 btn btn-light"
						onClick={resetBoard}
					>Reset Board</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
