export type TGameState = 'Pending' | 'Win' | 'Loss';
export type TScore = Array<{
    roundNumber: number,
    numberOfLettersInWord: number,
    roundGained: number;
}>;
export type TWordLength = 4 | 5 | 6 | 7 | 8 | 9;
export const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
