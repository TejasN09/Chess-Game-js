//class bishop which as allowed moves which inherite the properties from piece class
class Bishop extends Piece {
	constructor(position, name) {
		super(position, 'bishop', name);
	}

	getAllowedMoves() {
		return [this.getMovesDiagnalLeft(),
                this.getMovesDiagnalRight(), 
                this.getMovesBottomDiagnalLeft(), 
                this.getMovesBottomDiagnalRight()
            ];
	}
}