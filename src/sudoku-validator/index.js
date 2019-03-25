const puzzle = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const transpose2dMatrix = matrix =>
  matrix[0].map((col, i) => matrix.map(row => row[i]));

export function validateRows(puzzle) {
  return puzzle.every(row =>
    row
      .slice(0)
      .sort()
      .every((item, index) => item === index + 1),
  );
}
export function validateColumns(puzzle) {
  return validateRows(transpose2dMatrix(puzzle));
}

const gridsAsArrays = puzzle => {
  const grids = [];
  for (let col = 0; col < 9; col += 3) {
    for (let row = 0; row < 9; row += 3) {
      const outputRow = col + row / 3;
      if (!grids[outputRow]) {
        grids[outputRow] = [];
      }
      grids[outputRow] = grids[outputRow]
        .concat(puzzle[row].slice(col, col + 3))
        .concat(puzzle[row + 1].slice(col, col + 3))
        .concat(puzzle[row + 2].slice(col, col + 3));
    }
  }
  return grids;
};

export function validateGrids(puzzle) {
  const gridArrays = gridsAsArrays(puzzle);
  return validateRows(gridArrays);
}
export function validatePuzzle(puzzle) {
  const correctRows = validateRows(puzzle);
  const correctColumns = validateColumns(puzzle);
  const correctGrids = validateGrids(puzzle);
  return correctRows && correctColumns && correctGrids;
}
