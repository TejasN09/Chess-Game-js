//class queen which as allowed moves which inherite the properties from piece class
class Queen extends Piece {
	constructor(position, name) {
		super(position, 'queen', name);
	}

	getAllowedMoves() {
		return [this.getMovesRight(),
		this.getMovesLeft(),
		this.getMovesTop(),
		this.getMovesBottom(),
		this.getMovesDiagnalRight(),
		this.getMovesDiagnalLeft(),
		this.getMovesBottomDiagnalRight(),
		this.getMovesBottomDiagnalLeft()
		]
	}
}