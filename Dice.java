import java.util.Arrays;
import java.util.Random;

public class Dice {
    int[] diceValues;
    private Random random;

    public Dice() {
        diceValues = new int[5];
        random = new Random();
    }

    public void roll() {
        for (int i = 0; i < 5; i++) {
            diceValues[i] = random.nextInt(6) + 1;
        }
    }

    public void rollSpecific(boolean[] diceToRoll) {
        for (int i = 0; i < 5; i++) {
            if (diceToRoll[i]) {
                diceValues[i] = random.nextInt(6) + 1;
            }
        }
    }

    public int[] getValues() {
        return diceValues;
    }

    public void printValues() {
        System.out.println("Current dice: ");
        for (int value : diceValues) {
            System.out.print(value + " ");
        }
        System.out.println();
    }
}
