//class rook which as allowed moves which inherite the properties from piece class
class Rook extends Piece {
	constructor(position, name) {
		super(position, 'rook', name);
		this.ableToCastle = true;
	}

	changePosition(position) {

		this.position = parseInt(position);
		if (this.position === 18 || this.position === 88 || this.position === 81 || this.position !== 11) {
			this.ableToCastle = true;
		} else {
			this.ableToCastle = false;
		}
	}

	getAllowedMoves() {
		return [this.getMovesTop(), this.getMovesBottom(), this.getMovesRight(), this.getMovesLeft()];
	}
}