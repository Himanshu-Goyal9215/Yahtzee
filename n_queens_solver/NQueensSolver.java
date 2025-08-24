import java.util.concurrent.atomic.AtomicLong;

public class NQueensSolver {
    private int n;
    private int[] queens;
    private static final AtomicLong nodes = new AtomicLong(0);

    public NQueensSolver(int n) {
        this.n = n;
        this.queens = new int[n];
    }

    public static void main(String[] args) {
        int n = 30; // default
        if (args.length > 0) {
            try {
                n = Integer.parseInt(args[0]);
            } catch (NumberFormatException e) {
                System.out.println("Invalid size, using default 30.");
            }
        }

        if (n < 1 || n > 63) {
            System.out.println("Unsupported board size. Please use 1 <= n <= 63 (fits in a long).");
            return;
        }

        System.out.println("Solving " + n + "-Queens Problem...");
        NQueensSolver solver = new NQueensSolver(n);

        long startTime = System.currentTimeMillis();
        boolean found = solver.solve();
        long endTime = System.currentTimeMillis();

        if (found) {
            System.out.println("\nOne valid solution for " + n + " queens:");
            solver.printBoard();
        } else {
            System.out.println("No solution exists.");
        }

        System.out.printf("Nodes explored: %d%n", nodes.get());
        System.out.printf("Time taken: %.2f ms%n", (endTime - startTime) * 1.0);
    }

    /**
     * Top-level solve with symmetry-first ordering and instrumentation.
     */
    public boolean solve() {
        nodes.set(0);

        // Try first half columns on row 0 to exploit mirror symmetry
        int half = n / 2;

        // Try first half columns
        for (int c = 0; c < half; c++) {
            long bit = 1L << c;
            queens[0] = c;
            if (placeQueen(1, bit, (bit) << 1, (bit) >>> 1)) {
                return true;
            }
        }

        // If n is odd, try the center column
        if ((n & 1) == 1) {
            int c = half;
            long bit = 1L << c;
            queens[0] = c;
            if (placeQueen(1, bit, (bit) << 1, (bit) >>> 1)) {
                return true;
            }
        }

        // If not found yet, try the remaining columns (mirror side)
        for (int c = half + (n & 1); c < n; c++) {
            long bit = 1L << c;
            queens[0] = c;
            if (placeQueen(1, bit, (bit) << 1, (bit) >>> 1)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Recursive bit-mask solver. Counts nodes (calls) in nodes.
     * Uses unsigned right shift >>> for d2 propagation.
     */
    private boolean placeQueen(int row, long cols, long d1, long d2) {
        nodes.incrementAndGet();
        if (row == n) return true;

        long allOnes = (n == 64) ? -1L : ((1L << n) - 1L);
        long available = allOnes & ~(cols | d1 | d2);

        while (available != 0L) {
            long bit = available & -available; // pick lowest set bit
            int col = Long.numberOfTrailingZeros(bit);

            queens[row] = col;

            // propagate diagonals: d1 << 1, d2 >>> 1 (unsigned)
            if (placeQueen(row + 1,
                           cols | bit,
                           (d1 | bit) << 1,
                           (d2 | bit) >>> 1)) {
                return true;
            }

            // remove lowest set bit and continue
            available &= available - 1;
        }
        return false;
    }

    public void printBoard() {
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                System.out.print(queens[r] == c ? " Q " : " . ");
            }
            System.out.println();
        }
    }
}
