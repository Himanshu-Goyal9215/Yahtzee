# Sudoku Solver

A Java-based Sudoku puzzle solver with a beautiful web interface.

## Features

- **9x9 Sudoku Grid**: Standard Sudoku puzzle format
- **Input Validation**: Ensures only valid Sudoku puzzles are solved
- **Backtracking Algorithm**: Efficient solving using recursive backtracking
- **Beautiful UI**: Modern, responsive design with gradient backgrounds
- **Example Puzzle**: Load a sample puzzle to test the solver
- **Multiple Actions**: Solve, Clear, and Reset functionality

## Files

- `SudokuSolver.java` - Java implementation of the Sudoku solving algorithm
- `sudoku_solver.html` - Web interface for the Sudoku solver
- `README.md` - This documentation file

## How to Use

### Running the Java Solver

1. Compile the Java file:
   ```bash
   javac SudokuSolver.java
   ```

2. Run the solver:
   ```bash
   java SudokuSolver
   ```

The Java program includes a sample puzzle and will solve it, displaying both the original and solved boards in the console.

### Using the Web Interface

1. Open `sudoku_solver.html` in any modern web browser
2. Enter numbers 1-9 in the grid cells where you know them
3. Leave empty cells blank for the solver to fill
4. Click "Solve" to find the solution
5. Use "Clear" to empty the grid
6. Use "Reset" to return to the original puzzle
7. Click "Load Example Puzzle" to test with a sample puzzle

## Algorithm

The solver uses a **backtracking algorithm** that:

1. Finds an empty cell in the grid
2. Tries placing numbers 1-9 in that cell
3. Checks if the placement is valid (no conflicts in row, column, or 3x3 box)
4. If valid, recursively tries to solve the rest of the puzzle
5. If no solution is found, backtracks and tries a different number
6. Continues until the entire puzzle is solved or determined to be unsolvable

## Input Validation

The solver validates that:
- Only numbers 1-9 are entered
- No duplicate numbers exist in rows, columns, or 3x3 boxes
- The puzzle follows standard Sudoku rules

## Browser Compatibility

The web interface works in all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Responsive Design

The interface is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## Example Puzzle

The solver includes a sample puzzle that demonstrates its capabilities:

```
7 0 2 | 0 5 0 | 6 0 0
0 0 0 | 0 0 3 | 0 0 0
1 0 0 | 0 0 9 | 5 0 0
------+-------+------
8 0 0 | 0 0 0 | 0 9 0
0 4 3 | 0 0 0 | 7 5 0
0 9 0 | 0 0 0 | 0 0 8
------+-------+------
0 0 9 | 7 0 0 | 0 0 5
0 0 0 | 2 0 0 | 0 0 0
0 0 7 | 0 4 0 | 2 0 3
```

## Performance

The solver can handle:
- Easy puzzles: Solved in milliseconds
- Medium puzzles: Solved in under a second
- Hard puzzles: Solved in a few seconds
- Expert puzzles: May take longer but will find the solution

## Future Enhancements

Potential improvements could include:
- Multiple solution finding
- Step-by-step solving explanation
- Difficulty rating
- Puzzle generation
- Save/load puzzle functionality
- Timer and statistics
