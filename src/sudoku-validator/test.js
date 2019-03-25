const {
  validateRows,
  validateColumns,
  validateGrids,
  validatePuzzle,
} = require('./index');

const puzzleGenerator = validRows =>
  validRows.map(isValid => {
    return isValid
      ? validRows.map((item, index) => index + 1)
      : validRows.map(() => Math.floor(Math.random() * 10 + 1));
  });

const transposePuzzle = puzzle =>
  puzzle[0].map((col, i) => puzzle.map(row => row[i]));

describe('Row validator', () => {
  test('can tell when a row is valid', () => {
    const puzzle = puzzleGenerator([1, 1, 1, 1, 1, 1, 1, 1, 1]);
    expect(validateRows(puzzle)).toEqual(true);
  });
  test('can tell when a row is invalid', () => {
    const puzzle1 = puzzleGenerator([1, 0, 1, 1, 1, 1, 1, 1, 1]);
    const puzzle2 = puzzleGenerator([1, 1, 1, 1, 0, 1, 1, 1, 1]);
    const puzzle3 = puzzleGenerator([1, 1, 1, 1, 1, 1, 1, 0, 1]);
    expect(validateRows(puzzle1)).toEqual(false);
    expect(validateRows(puzzle2)).toEqual(false);
    expect(validateRows(puzzle3)).toEqual(false);
  });
});

describe('Column validator', () => {
  test('can tell when a column is valid', () => {
    const puzzle = transposePuzzle(puzzleGenerator([1, 1, 1, 1, 1, 1, 1, 1, 1]));
    expect(validateColumns(puzzle)).toEqual(true);
  });
  test('can tell when a column is invalid', () => {
    const puzzle1 = transposePuzzle(
      puzzleGenerator([1, 0, 1, 1, 1, 1, 1, 1, 1]),
    );
    const puzzle2 = transposePuzzle(
      puzzleGenerator([1, 1, 1, 1, 0, 1, 1, 1, 1]),
    );
    const puzzle3 = transposePuzzle(
      puzzleGenerator([1, 1, 1, 1, 1, 1, 1, 0, 1]),
    );
    expect(validateColumns(puzzle1)).toEqual(false);
    expect(validateColumns(puzzle2)).toEqual(false);
    expect(validateColumns(puzzle3)).toEqual(false);
  });
});

describe('Grid validator', () => {
  test('can tell when a grid is valid', () => {
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
    expect(validateGrids(puzzle)).toEqual(true);
  });
  test('can tell when a grid is invalid', () => {
    const puzzle1 = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ];
    const puzzle2 = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ];
    const puzzle3 = [
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ];
    expect(validateGrids(puzzle1)).toEqual(false);
    expect(validateGrids(puzzle2)).toEqual(false);
    expect(validateGrids(puzzle3)).toEqual(false);
  });
});

describe('Puzzle validator', () => {
  test('can tell when a puzzle is valid', () => {
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
    expect(validatePuzzle(puzzle)).toEqual(true);
  });
  test('can tell when a puzzle is invalid', () => {
    const puzzle1 = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ];
    const puzzle2 = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ];
    const puzzle3 = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
    ];
    expect(validatePuzzle(puzzle1)).toEqual(false);
    expect(validatePuzzle(puzzle2)).toEqual(false);
    expect(validatePuzzle(puzzle3)).toEqual(false);
  });
});
