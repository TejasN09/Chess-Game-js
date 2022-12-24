//class pwan which as allowed moves which inherite the properties from piece class
class Pawn extends Piece {
	constructor(position, name) {
		super(position, 'pawn', name);
	}

	getAllowedMoves() {
		const position = this.position;
		const sign = (this.color == "white") ? "+" : "-";
		const allowedMoves = [eval(position + sign + '10')];

		if ((position > 20 && position < 29) || (position > 70 && position < 79)) {
			allowedMoves.push(eval(position + sign + '20'));
		}
		const attackMoves = [eval(position + sign + '9'), eval(position + sign + '11')];
		return [attackMoves, allowedMoves];
	}
	changePosition(position, promte = false) {
		this.position = parseInt(position);
		if (promte && (position > 80 || position < 20)) {
			game.promote(this);
		}
	}
}
