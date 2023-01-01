//class game has all the functions of game
class GameMain {
	constructor(pieces) {
		this.board = document.getElementById("board");
		this.squares = this.board.querySelectorAll(".square");
		this.pieces = pieces;
		this.turn = "white";
		this.turnSign = document.getElementById("turn");
		this.turnTitle = document.getElementById("title");
		this.clickedPiece = null;
		this.allowedMoves = null;
		this.addEventListeners();
		this.whiteMainPieces = document.getElementById("whiteMainPieces");
		this.blackMainPieces = document.getElementById("blackMainPieces");
	}

	//dom manipulation of images 
	addEventListeners() {
		this.pieces.forEach(piece => {
			piece.img.addEventListener("click", this.pieceMove.bind(this));
			piece.img.addEventListener("dragstart", this.pieceMove.bind(this));
			piece.img.addEventListener("drop", this.pieceMove.bind(this));
		});
		this.squares.forEach(square => {
			square.addEventListener("click", this.movePiece.bind(this));
			square.addEventListener("dragover", function (event) {
				event.preventDefault();
			});
			square.addEventListener("drop", this.movePiece.bind(this));
		});
	}

	//adding allowed moves class to the pieces
	pieceMove(e) {
		const name = e.target.getAttribute("id");
		const allowedMoves = this.getPieceAllowedMoves(e, name);
		if (allowedMoves) {
			const position = this.getPieceByname(name).position;
			const clickedSquare = document.getElementById(position);

			clickedSquare.classList.add("clicked-square");

			allowedMoves.forEach(allowedMove => {
				if (document.body.contains(document.getElementById(allowedMove))) {
					document.getElementById(allowedMove).classList.add("allowed");
				}
			});
		}
		else {
			this.clearSquare();
		}
	}

	//getting allowed moves for each pieces
	getPieceAllowedMoves(e, pieceName) {
		const piece = this.getPieceByname(pieceName);
		if (this.turn == piece.color) {
			this.clearSquare();
			this.setClickedPiece(piece);
			if (e.type == "dragstart") {
				e.dataTransfer.setData("text", e.target.id);
			}
			let pieceAllowedMoves = piece.getAllowedMoves();
			if (piece.rank == "king") {
				pieceAllowedMoves = this.getCastlingSquares(pieceAllowedMoves);
			}

			const allowedMoves = this.unlockedPositions(pieceAllowedMoves, piece.position, piece.color, true);
			this.allowedMoves = allowedMoves;
			return allowedMoves;
		}
		else if (this.clickedPiece && this.turn == this.clickedPiece.color && this.allowedMoves && this.allowedMoves.indexOf(piece.position) != -1) {
			this.kill(piece);
		} else {
			return 0;
		}
	}

	//getting pieces name
	getPieceByname(pieceName) {
		return this.pieces.filter(obj => obj.name === pieceName)[0];
	}

	//clearing pieces square
	clearSquare() {
		this.allowedMoves = null;
		const allowedSquares = this.board.querySelectorAll(".allowed");
		allowedSquares.forEach(allowedSquare => {
			allowedSquare.classList.remove("allowed");
		});
		const clickedSquare = document.getElementsByClassName("clicked-square")[0];
		if (clickedSquare) {
			clickedSquare.classList.remove("clicked-square");
		}
	}

	//count the time of each player funtion still in development
	countdown(elementName, minutes, seconds) {
		var element, endTime, hours, mins, msLeft, time;

		function twoDigits(n) {
			return (n <= 9 ? "0" + n : n);
		}

		function updateTimer() {
			msLeft = endTime - (+new Date);
			if (msLeft < 1000) {
				element.innerHTML = "Time is up!";
			} else {
				time = new Date(msLeft);
				hours = time.getUTCHours();
				mins = time.getUTCMinutes();
				element.innerHTML = (hours ? hours + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds());
				setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
			}
		}

		element = document.getElementById(elementName);
		endTime = (+new Date) + 1000 * (60 * minutes + seconds) + 500;
		updateTimer();
	}

	//getting turn of white or black and changing innertext in html
	changeTurn() {
		if (this.turn == 'white') {
			this.turn = 'black';
			this.turnSign.innerHTML = "Black's Turn";
		}
		else {
			this.turn = 'white';
			this.turnSign.innerHTML = "White's Turn";
		}
	}

	//getting pieces by there color
	getPieceByColor(color) {
		return this.pieces.filter(obj => {
			return obj.color == color
		});
	}

	//getting player position or rank
	getPlayerPositions(color) {
		const pieces = this.getPieceByColor(color);
		return pieces.map(a => parseInt(a.position));
	}

	//filtering thr position
	filterPosition(positions) {
		return positions.filter(pos => {
			return pos > 10 && pos < 89
		});
	}

	//getting pieces position
	getPieceByPos(piecePosition) {
		return this.pieces.filter(obj =>
			obj.position === piecePosition)[0];
	}

	//checking postion has exisiting piece 
	positionHasExistingPiece(position) {
		return this.getPieceByPos(position) != undefined;
	}

	//setting clicked piece
	setClickedPiece(piece) {
		this.clickedPiece = piece;
	}

	//King checked funtion
	kingChecked(color) {
		const piece = this.clickedPiece;
		const king = this.getPieceByname(color + "King");
		const enemyColor = (color == 'white') ? 'black' : 'white';
		const enemyPieces = this.getPieceByColor(enemyColor);
		for (const enemyPiece of enemyPieces) {
			this.setClickedPiece(enemyPiece);
			const allowedMoves = this.unlockedPositions(enemyPiece.getAllowedMoves(), enemyPiece.position, enemyColor, false);
			if (allowedMoves.indexOf(king.position) != -1) {
				this.setClickedPiece(piece);
				return 1;
			}
		}
		this.setClickedPiece(piece);
		return 0;
	}

	//asigning castling square for king side or queen side castle
	getCastlingSquares(allowedMoves) {
		const rook1 = this.getPieceByname(this.turn + "Rook1");
		const rook2 = this.getPieceByname(this.turn + "Rook2");
		if (!this.clickedPiece.ableToCastle || this.kingChecked(this.turn)) {
			return allowedMoves;
		}
		if (rook1 && rook1.ableToCastle) {
			const castlingPosition = rook1.position + 2;
			if (!this.positionHasExistingPiece(castlingPosition - 1) &&
				!this.positionHasExistingPiece(castlingPosition) &&
				!this.positionHasExistingPiece(castlingPosition + 1) &&
				!this.mykingChecked(castlingPosition, true) &&
				!this.mykingChecked(castlingPosition + 1, true)) {
				allowedMoves[1].push(castlingPosition);
			}
		}
		if (rook2 && rook2.ableToCastle) {
			const castlingPosition = rook2.position - 1;
			if (!this.positionHasExistingPiece(castlingPosition - 1) &&
				!this.mykingChecked(castlingPosition - 1, true) &&
				!this.positionHasExistingPiece(castlingPosition) &&
				!this.mykingChecked(castlingPosition, true)) {
				allowedMoves[0].push(castlingPosition);
			}
		}
		return allowedMoves;
	}

	//unlocking the position of the piece which position piece can move 
	unlockedPositions(allowedPositions = [], position, color, checking = true) {
		position = parseInt(position);
		const unlockPositions = [];

		if (color == "white") {
			var myBlockedPos = this.getPlayerPositions("white");
			var otherBlockedPos = this.getPlayerPositions("black");
		} else {
			var myBlockedPos = this.getPlayerPositions("black");
			var otherBlockedPos = this.getPlayerPositions("white");
		}

		if (this.clickedPiece.hasRank("pawn")) {
			for (const move of allowedPositions[0]) {
				if (checking && this.mykingChecked(move)) {
					continue;
				}
				if (otherBlockedPos.indexOf(move) != -1) { unlockPositions.push(move); }
			}
			const blockedPos = myBlockedPos + otherBlockedPos;
			for (const move of allowedPositions[1]) {
				if (blockedPos.indexOf(move) != -1) break;
				else if (checking && this.mykingChecked(move, false)) continue;
				unlockPositions.push(move);
			}
		} else {
			allowedPositions.forEach(allowedPos => {
				for (const move of allowedPos) {
					if (myBlockedPos.indexOf(move) != -1) {
						break;
					}
					else if (checking && this.mykingChecked(move)) {
						continue;
					}
					unlockPositions.push(move);
					if (otherBlockedPos.indexOf(move) != -1) break;
				}
			});
		}
		return this.filterPosition(unlockPositions);
	}

	//kill the piece and appending the image of the piece
	kill(piece) {
		piece.img.parentNode.removeChild(piece.img);
		piece.img.className = '';

		if (piece.color == "white") {
			this.whiteMainPieces.querySelector("." + piece.rank).append(piece.img);
		} else {
			this.blackMainPieces.querySelector("." + piece.rank).append(piece.img);
		}

		const chosenSquare = document.getElementById(piece.position);
		this.pieces.splice(this.pieces.indexOf(piece), 1);
		this.movePiece("", chosenSquare);
	}


	//chicking king deaad function
	king_dead(color) {
		const pieces = this.getPieceByColor(color);
		for (const piece of pieces) {
			this.setClickedPiece(piece);
			const allowedMove = this.unlockedPositions(piece.getAllowedMoves(), piece.position, piece.color, true);
			if (allowedMove.length) {
				this.setClickedPiece(null);
				return 0;
			}
		}
		this.setClickedPiece(null);
		return 1;
	}

	//moving pieces based on the allowed class asigned to pieces
	movePiece(e, square = "") {
		let allMoves = [];
		let turn = this.turn;
		let turnid = document.getElementById("checksign");
		let previousMoves = document.getElementById("previousmoves");
		const WkingBackgroundColor = document.getElementById("whiteKing");
		const BkingBackgroundColor = document.getElementById("blackKing");
		square = square || e.target;
		if (square.classList.contains("allowed")) {
			const clickedPiece = this.clickedPiece;
			let datasquare = document.getElementById(clickedPiece.position);
			const position = datasquare.dataset.square;
			if (clickedPiece) {
				const newPos = square.getAttribute("id");
				const nextPosition = document.getElementById(newPos);
				const nextDataPosition = nextPosition.dataset.square;
				//previousMoves.innerHTML= position+"-"+nextDataPosition+": "+turn+" "+clickedPiece.rank+" was moved.";
				const displayMoves = position + "-" + nextDataPosition + ": " + turn + " " + clickedPiece.rank + " was moved.";
				allMoves.push(displayMoves);
				allMoves.forEach((item) => {
					let li = document.createElement("li");
					li.innerHTML = item;
					previousMoves.appendChild(li);
				})
				if (clickedPiece.hasRank("king") || clickedPiece.hasRank("pawn")) {
					clickedPiece.changePosition(newPos, true);
				} else {
					clickedPiece.changePosition(newPos);
				}
				square.append(clickedPiece.img);
				this.clearSquare();
				this.changeTurn();
				if (!this.kingChecked(this.turn)) {
					if (turn == 'white') {
						WkingBackgroundColor.classList.remove("kingcheckcolor");
					}
					else {
						BkingBackgroundColor.classList.remove("kingcheckcolor");
					}
				}
				if (this.kingChecked(this.turn)) {
					if (this.king_dead(this.turn)) {
						this.checkmate(clickedPiece.color);
					}
					else {
						if (turn == 'white') {
							turnid.innerHTML = "Black: your king is checked";
							setTimeout(function () {
								turnid.innerHTML = "";
							}, 3000);
							BkingBackgroundColor.classList.add("kingcheckcolor");

						} else {
							turnid.innerHTML = "White: your king is checked";
							setTimeout(function () {
								turnid.innerHTML = "";
							}, 3000);
							WkingBackgroundColor.classList.add("kingcheckcolor");
						}
					}
				}
			}
			else {
				return 0;
			}
		}
		if (e) {
			e.preventDefault();
		}

	}

	//king checked funtion 
	mykingChecked(pos, kill = true) {
		const piece = this.clickedPiece;
		const originalPos = piece.position;
		const otherPiece = this.getPieceByPos(pos);
		const killOtherPiece = kill && otherPiece && otherPiece.rank != "king";
		piece.changePosition(pos);
		if (killOtherPiece) {
			this.pieces.splice(this.pieces.indexOf(otherPiece), 1);
		}
		if (this.kingChecked(piece.color)) {
			piece.changePosition(originalPos);
			if (killOtherPiece) this.pieces.push(otherPiece);
			return 1;
		}
		else {
			piece.changePosition(originalPos);
			if (killOtherPiece) this.pieces.push(otherPiece);
			return 0;
		}
	}

	//promating pieces option
	Options(pawn, option) {
		const image = pawn.img;
		if (option === 'Queen') {
			const pawnToQueen = pawn.name.replace('Pawn', 'Queen');
			image.id = pawnToQueen;
			image.src = image.src.replace('Pawn', 'Queen');
			this.pieces.splice(this.pieces.indexOf(pawn), 1);
			this.pieces.push(new Queen(pawn.position, pawnToQueen));
		} else if (option === 'Rook') {
			const pawnToRook = pawn.name.replace('Pawn', 'Rook');
			image.id = pawnToRook;
			image.src = image.src.replace('Pawn', 'Rook');
			this.pieces.splice(this.pieces.indexOf(pawn), 1);
			this.pieces.push(new Rook(pawn.position, pawnToRook));
		} else if (option === 'Knight') {
			const pawnToKnight = pawn.name.replace('Pawn', 'Knight');
			image.id = pawnToKnight;
			image.src = image.src.replace('Pawn', 'Knight');
			this.pieces.splice(this.pieces.indexOf(pawn), 1);
			this.pieces.push(new Knight(pawn.position, pawnToKnight));
		} else {
			const pawnToBishop = pawn.name.replace('Pawn', 'Bishop');
			image.id = pawnToBishop;
			image.src = image.src.replace('Pawn', 'Bishop');
			this.pieces.splice(this.pieces.indexOf(pawn), 1);
			this.pieces.push(new Bishop(pawn.position, pawnToBishop));
		}
	}

	//geting options from option function
	getOption() {
		let x = document.getElementById("myOption").selectedIndex;
		let t;
		let num = prompt("what your pawn evolve into? \n1.Queen\n2.Rook\n3.Knight\n4.Bishop ");
		if (num == 1) {
			t = document.getElementsByTagName("option")[0].value;
		}
		else if (num == 2) {
			t = document.getElementsByTagName("option")[1].value;
		} else if (num == 3) {
			t = document.getElementsByTagName("option")[2].value;
		} else {
			t = document.getElementsByTagName("option")[3].value;
		}

		return t;
	}

	//promote funtion of a pawn
	promote(pawn) {
		this.Options(pawn, this.getOption());
	}

	//castle rook side funtion
	castleRook(rook) {
		const name = this.getPieceByname(rook);
		const newPos = rook.indexOf("Rook1") != -1 ? name.position + 3 : name.position - 2;

		this.setClickedPiece(name);
		const chosenSqure = document.getElementById(newPos);
		chosenSqure.classList.add("allowed");

		this.movePiece("", chosenSqure);
		this.changeTurn();
	}

	//checkmate funntion return winning sign based on which player won
	checkmate(color) {
		if (color == 'White' || color == "white") {
			document.getElementById("title").innerHTML = "Ooops! Black Lost 🥺 \n better luck next time."
		} else {
			document.getElementById("title").innerHTML = "Ooops! White Lost 🥺 \n better luck next time."
		}
		const refresh = document.getElementById("refresh");
		const endScene = document.getElementById('endscene');
		endScene.getElementsByClassName('winning-sign')[0].innerHTML = "<span>" + color + " Win's" + "</span>" + "<br />" + "Please Restart the game and enjoy";
		endScene.classList.add('show')
	}
}

//creating array of all pieces
const allPieces = [
	new King(15, 'whiteKing'),
	new Knight(12, 'whiteKnight1'),
	new Knight(17, 'whiteKnight2'),
	new Queen(14, 'whiteQueen'),
	new Pawn(21, 'whitePawn1'),
	new Pawn(22, 'whitePawn2'),
	new Pawn(23, 'whitePawn3'),
	new Pawn(24, 'whitePawn4'),
	new Pawn(25, 'whitePawn5'),
	new Pawn(26, 'whitePawn6'),
	new Pawn(27, 'whitePawn7'),
	new Pawn(28, 'whitePawn8'),
	new Rook(11, 'whiteRook1'),
	new Rook(18, 'whiteRook2'),
	new Bishop(13, 'whiteBishop1'),
	new Bishop(16, 'whiteBishop2'),

	new King(85, 'blackKing'),
	new Knight(82, 'blackKnight1'),
	new Knight(87, 'blackKnight2'),
	new Queen(84, 'blackQueen'),
	new Bishop(83, 'blackBishop1'),
	new Bishop(86, 'blackBishop2'),
	new Pawn(71, 'blackPawn1'),
	new Pawn(72, 'blackPawn2'),
	new Pawn(73, 'blackPawn3'),
	new Pawn(74, 'blackPawn4'),
	new Pawn(75, 'blackPawn5'),
	new Pawn(76, 'blackPawn6'),
	new Pawn(77, 'blackPawn7'),
	new Pawn(78, 'blackPawn8'),
	new Rook(81, 'blackRook1'),
	new Rook(88, 'blackRook2')

]

//obj of GameMain
const game = new GameMain(allPieces);



//Thanks AhmadAlkholy i learnt so many new things,hope you dont mind.Thanks a lot
