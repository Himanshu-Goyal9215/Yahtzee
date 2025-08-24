public class NQueensSolver {
    private int n;
    private int[] queens;
    private int solutionsCount;
    private static final int MAX_SOLUTIONS = 100; // Limit solutions for display

    public NQueensSolver(int n) {
        this.n = n;
        this.queens = new int[n];
        this.solutionsCount = 0;
    }

    public static void main(String[] args) {
        int n = 8; // Default to 8-queens problem
        if (args.length > 0) {
            try {
                n = Integer.parseInt(args[0]);
                if (n <= 0) {
                    System.out.println("Board size must be positive. Using default size 8.");
                    n = 8;
                }
            } catch (NumberFormatException e) {
                System.out.println("Invalid board size. Using default size 8.");
                n = 8;
            }
        }

        System.out.println("Solving " + n + "-Queens Problem...");
        System.out.println("=====================================");

        NQueensSolver solver = new NQueensSolver(n);
        long startTime = System.currentTimeMillis();
        
        boolean hasSolution = solver.solve();
        long endTime = System.currentTimeMillis();

        if (hasSolution) {
            System.out.println("\nFirst solution found:");
            solver.printBoard();
            
            System.out.println("\nFinding all solutions...");
            solver.findAllSolutions();
            
            System.out.println("\nTotal solutions found: " + solver.getSolutionsCount());
            System.out.println("Time taken: " + (endTime - startTime) + " ms");
        } else {
            System.out.println("No solution exists for " + n + "-queens problem.");
        }
    }

    public boolean solve() {
        return solveQueens(0);
    }

    private boolean solveQueens(int col) {
        if (col >= n) {
            return true;
        }

        for (int row = 0; row < n; row++) {
            if (isSafe(row, col)) {
                queens[col] = row;
                
                if (solveQueens(col + 1)) {
                    return true;
                }
                
                queens[col] = 0; // Backtrack
            }
        }
        return false;
    }

    public void findAllSolutions() {
        solutionsCount = 0;
        findAllSolutions(0);
    }

    private void findAllSolutions(int col) {
        if (col >= n) {
            solutionsCount++;
            if (solutionsCount <= 5) { // Show first 5 solutions
                System.out.println("\nSolution " + solutionsCount + ":");
                printBoard();
            }
            return;
        }

        for (int row = 0; row < n; row++) {
            if (isSafe(row, col)) {
                queens[col] = row;
                findAllSolutions(col + 1);
                queens[col] = 0; // Backtrack
            }
        }
    }

    private boolean isSafe(int row, int col) {
        // Check row
        for (int c = 0; c < col; c++) {
            if (queens[c] == row) {
                return false;
            }
        }

        // Check upper diagonal
        for (int c = col - 1, r = row - 1; c >= 0 && r >= 0; c--, r--) {
            if (queens[c] == r) {
                return false;
            }
        }

        // Check lower diagonal
        for (int c = col - 1, r = row + 1; c >= 0 && r < n; c--, r++) {
            if (queens[c] == r) {
                return false;
            }
        }

        return true;
    }

    public void printBoard() {
        for (int i = 0; i < n; i++) {
            System.out.print("+");
            for (int j = 0; j < n; j++) {
                System.out.print("---+");
            }
            System.out.println();
            
            System.out.print("|");
            for (int j = 0; j < n; j++) {
                if (queens[j] == i) {
                    System.out.print(" Q |");
                } else {
                    System.out.print("   |");
                }
            }
            System.out.println();
        }
        
        System.out.print("+");
        for (int j = 0; j < n; j++) {
            System.out.print("---+");
        }
        System.out.println();
    }

    public int[] getQueens() {
        return queens.clone();
    }

    public int getSolutionsCount() {
        return solutionsCount;
    }

    public int getN() {
        return n;
    }

    // Method to check if a specific position is safe
    public boolean isPositionSafe(int row, int col) {
        // Temporarily place a queen
        int temp = queens[col];
        queens[col] = row;
        
        boolean safe = isSafe(row, col);
        
        // Restore original state
        queens[col] = temp;
        
        return safe;
    }

    // Method to get all solutions as arrays
    public int[][] getAllSolutions() {
        solutionsCount = 0;
        java.util.List<int[]> solutions = new java.util.ArrayList<>();
        collectAllSolutions(0, solutions);
        
        int[][] result = new int[solutions.size()][n];
        for (int i = 0; i < solutions.size(); i++) {
            result[i] = solutions.get(i);
        }
        
        return result;
    }

    private void collectAllSolutions(int col, java.util.List<int[]> solutions) {
        if (col >= n) {
            solutions.add(queens.clone());
            return;
        }

        for (int row = 0; row < n; row++) {
            if (isSafe(row, col)) {
                queens[col] = row;
                collectAllSolutions(col + 1, solutions);
                queens[col] = 0; // Backtrack
            }
        }
    }
}
