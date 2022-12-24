//geting fact class from html and creating random fuction which return 0 to 11 
var facts = document.getElementsByClassName("facts");
const num = Math.floor(Math.random() * (11 - 0 + 1)) + 0;

switch (num) {
    case 0: facts[0].innerHTML = "Initially, the Queen could only move one square at a time, diagonally. Later, she could move two squares at a time, diagonally. It wasn’t until Reconquista Spain, with its powerful queen Isabella, that the Queen became the strongest piece on the board.";
        break;
    case 1: facts[0].innerHTML = "The number of possibilities of a Knight's tour is over 122 million.";
        break;
    case 2: facts[0].innerHTML = "During World War II, some of the top Chess players were also code breakers. British masters Harry Golombek, Stuart Milner - Barry and H.O'D. Alexander was on the teamwhich broke the Nazi Enigma code."
        break;
    case 3: facts[0].innerHTML ='The word "Checkmate" in Chess comes from the Persian phrase "Shah Mat," which means"the King is dead."';
            break;
    case 4: facts[0].innerHTML ="The longest chess game theoretically possible is 5,949 moves."
            break;
    case 5: facts[0].innerHTML ="A computer called DeepThought became the first computer to beat an international grandmaster in November 1988, Long Beach, California"
            break;
    case 6: facts[0].innerHTML ="The folding chessboard was invented by a priest who was forbidden to play chess. The priest found a way around it by making a folding chessboard. When folded together and put ona bookshelf, it simply lookslike two books."
            break;
    case 7: facts[0].innerHTML ="If you put one grain of wheat on the first square of the chessboard, two on the second, four on the third, eight on the fourth, and so on, how many grains of wheat do you need to put on the 64th square? The answer is 9,223,372,036,8 54,775,808(appr oximately 9.22x10 18 ) grains of wheat"
            break;
    case 8: facts[0].innerHTML ="The new pawn move, where pawns were allowed to advance two squares on its first move instead of one, was first introduced in Spain in 1280."
            break;
    case 9: facts[0].innerHTML ="The longest chess game ever was I.Nikolic - Arsovic, Belgrade 1989, which ended in 269 moves. The game was a draw."
            break;
    case 10: facts[0].innerHTML ="According to the America's Foundation for Chess, there are 169,518,829,100 ,544,000,000,000,000,000 (approximately 1.70x10 29) ways to play the first 10 moves of a game of chess."
            break;
    case 11:facts[0].innerHTML="There are 400 different possible positions after onemove each.There are 72,084 different possible positions after two moves each. There are over 9 million different possible positions after three moveseach. There are over 318 billion different possible positions after four moves each. The number of distinct 40-move games in chess is far greater than the number of electrons in the observable universe. The number of electrons is approximately 10^79 , whilethe number of uniquechess games is 10^120 ."
            break;
}
