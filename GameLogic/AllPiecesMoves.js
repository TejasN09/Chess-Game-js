//class pices which a=has all function based on pieces move
class Piece {
	constructor(position, rank, name) {
		this.position = position;
		this.rank = rank;
		this.name = name;
		this.color = this.name.substring(0, 5);
		this.img = document.getElementById(this.name);
	}

	//return rank of the piece
	hasRank(rank) {
		return this.rank == rank;
	}

	//change position of the piece
	changePosition(position) {
		this.position = parseInt(position);
	}

	//gets all the posible moves of top side moves
	getMovesTop() {
		const moveTop = [];
		for (let move = this.position + 10; move <= 88; move += 10) {
			moveTop.push(move);
		}
		return moveTop;
	}

	//gets all the posible moves of bottom side moves
	getMovesBottom() {
		const moveBottom = [];
		for (let move = this.position - 10; move >= 11; move -= 10) {
			moveBottom.push(move);
		}
		return moveBottom;
	}

	//gets all the posible moves of left side moves
	getMovesLeft() {
		const pos = this.position + "";
		const moveLeft = [];
		for (let move = this.position - 1; move >= parseInt(pos[0] + "1"); move--) {
			moveLeft.push(move);
		}
		return moveLeft;
	}

	//gets all the posible moves of right side moves
	getMovesRight() {
		const pos = this.position + "";
		const moveRight = [];
		for (let move = this.position + 1; move <= parseInt(pos[0] + "8"); move++) {
			moveRight.push(move);
		}
		return moveRight;
	}

	//gets all the posible moves of diagnal right side moves
	getMovesDiagnalRight() {
		const moveRight = [];
		for (let move = this.position + 11; move <= 88; move += 11) {
			const firstDigit = ('' + move)[1];
			if (firstDigit > 8 || firstDigit < 1) {
				break;
			}
			moveRight.push(move);
		}
		return moveRight;
	}

	//gets all the posible moves of diagnal left side moves
	getMovesDiagnalLeft() {
		const moveLeft = [];
		for (let move = this.position + 9; move <= 88; move += 9) {
			const firstDigit = ('' + move)[1];
			if (firstDigit > 8 || firstDigit < 1) {
				break;
			}
			moveLeft.push(move);
		}
		return moveLeft;
	}

	//gets all the posible moves of diagnal bottom right side moves
	getMovesBottomDiagnalRight() {
		const moveRight = [];
		for (let move = this.position - 9; move >= 11; move -= 9) {
			const firstDigit = ('' + move)[1];
			if (firstDigit > 8 || firstDigit < 1) {
				break;
			}
			moveRight.push(move);
		}
		return moveRight;
	}

	//gets all the posible moves of diagnal bottom left side moves
	getMovesBottomDiagnalLeft() {
		const moveLeft = [];
		for (let move = this.position - 11; move >= 11; move -= 11) {
			const firstDigit = ('' + move)[1];
			if (firstDigit > 8 || firstDigit < 1) {
				break;
			}
			moveLeft.push(move);
		}
		return moveLeft;
	}

}