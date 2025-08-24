# N-Queens Solver

A Java-based solver for the classic N-Queens problem with an interactive web interface.

## Problem Description

The N-Queens problem asks: "Can N queens be placed on an N×N chessboard so that no two queens threaten each other?"

**Rules:**
- Queens can move horizontally, vertically, and diagonally
- No two queens can be in the same row, column, or diagonal
- The goal is to place exactly N queens on the board

## Features

- **Interactive Chessboard**: Click to place/remove queens manually
- **Automatic Solving**: Uses backtracking algorithm to find solutions
- **Variable Board Size**: Supports board sizes from 1 to 12
- **Real-time Validation**: Checks if manual placements are valid
- **Performance Metrics**: Shows solving time
- **Responsive Design**: Works on desktop and mobile devices

## Files

- `NQueensSolver.java` - Java implementation of the N-Queens solving algorithm
- `n_queens_solver.html` - Web interface for interactive solving
- `README.md` - This documentation file

## How to Use

### Running the Java Solver

1. Compile the Java file:
   ```bash
   javac NQueensSolver.java
   ```

2. Run the solver:
   ```bash
   java NQueensSolver [board_size]
   ```

   Examples:
   ```bash
   java NQueensSolver        # Default 8-queens
   java NQueensSolver 4      # 4-queens problem
   java NQueensSolver 12     # 12-queens problem
   ```

The Java program will find the first solution and then find all possible solutions, displaying them in the console.

### Using the Web Interface

1. Open `n_queens_solver.html` in any modern web browser
2. Set the desired board size (1-12)
3. Choose your approach:
   - **Manual Placement**: Click on board cells to place/remove queens
   - **Auto Solve**: Click "Solve" to automatically find a solution
4. Use "Clear" to reset the board

## Algorithm

The solver uses a **backtracking algorithm** that:

1. Places queens one column at a time
2. For each column, tries placing a queen in each row
3. Checks if the placement is safe (no conflicts with existing queens)
4. If safe, recursively tries to place queens in the next column
5. If no safe placement is found, backtracks to the previous column
6. Continues until all N queens are placed or no solution exists

## Complexity

- **Time Complexity**: O(N!) in worst case
- **Space Complexity**: O(N) for the recursion stack
- **Solutions**: The number of solutions varies by board size:
  - 4×4: 2 solutions
  - 5×5: 10 solutions
  - 6×6: 4 solutions
  - 7×7: 40 solutions
  - 8×8: 92 solutions
  - 9×9: 352 solutions
  - 10×10: 724 solutions
  - 11×11: 2,680 solutions
  - 12×12: 14,200 solutions

## Performance

The solver can handle:
- **Small boards (1-8)**: Solved in milliseconds
- **Medium boards (9-10)**: Solved in under a second
- **Large boards (11-12)**: May take several seconds to minutes

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

## Example Solutions

### 4-Queens Problem
```
+---+---+---+---+
|   | Q |   |   |
+---+---+---+---+
|   |   |   | Q |
+---+---+---+---+
| Q |   |   |   |
+---+---+---+---+
|   |   | Q |   |
+---+---+---+---+
```

### 8-Queens Problem
The classic 8-queens problem has 92 distinct solutions, with the first solution typically found quickly using the backtracking approach.

## Future Enhancements

Potential improvements could include:
- Step-by-step solving visualization
- Multiple solution navigation
- Threat highlighting
- Move validation
- Solution export/import
- Performance optimization for larger boards
- Parallel solving algorithms

## Mathematical Background

The N-Queens problem is a classic constraint satisfaction problem that demonstrates:
- **Backtracking algorithms**
- **Constraint propagation**
- **Combinatorial optimization**
- **NP-complete problem characteristics**

It's often used in computer science education to teach:
- Recursive algorithms
- Backtracking techniques
- Problem-solving strategies
- Algorithm complexity analysis
