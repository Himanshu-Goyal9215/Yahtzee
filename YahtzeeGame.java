import java.util.*;
import java.util.Random;

public class YahtzeeGame {
    private Dice dice;
    private Random random;
    private Player[] players;

    public YahtzeeGame() {
        players = new Player[2];
        dice = new Dice();
        random = new Random();
        players[0] = new Player("HIMANSHU");
        players[1] = new Player("HITESH");

    }
int[] diceValues=new int [5];

    public void playGame() {
        for (int round = 0; round < 13; round++) {
            for (Player player : players) {
                playRound(player);
            }
        }
        printFinalScores();
    }

    private void printFinalScores() {
        System.out.println("Final Scores:");
        for (Player player : players) {
            System.out.println(player.getName() + " : " +player.getscore());
            player.getScorecard().printScorecard();
        }
    }

    public void playRound(Player player) {
        player.roundsPlayed++;
        System.out.println("Round " +  player.roundsPlayed + " - " + player.getName() + "'s turn");
//        Dice dice = player.getDice();
        Scanner scanner = new Scanner(System.in);
        boolean stopRolling = false;
        for (int roll = 0; roll < 3 && !stopRolling; roll++) {
            if (roll > 0) {
                System.out.println("Enter dice numbers to re-roll (e.g., '1 3 5' to re-roll dice 1, 3, and 5): ");
                String input = scanner.nextLine();
                String[] inputs = input.split(" ");
                boolean[] diceToRoll = new boolean[5];
                for (String numStr : inputs) {
                    int diceNum = Integer.parseInt(numStr);
                    if (diceNum >= 1 && diceNum <= 5) {
                        diceToRoll[diceNum - 1] = true; // Mark the corresponding index to re-roll
                    } else {
                        System.out.println("Invalid dice number: " + diceNum);
                    }
                }

                for (int i = 0; i < 5; i++) {
                    if (diceToRoll[i]) {
                        diceValues[i] = random.nextInt(6) + 1;
                    }
                }

            } else {
                for (int i = 0; i < 5; i++) {
                    diceValues[i] = random.nextInt(6) + 1;
                }
            }
            System.out.println("Current dice: ");
            for (int value : diceValues) {
                System.out.print(value + " ");
            }
            System.out.println();

            displayPotentialScores(player);
        }


        System.out.println("Enter score category to use (e.g., 'chance'): ");
        String category = scanner.nextLine();
        while (player.getScorecard().getScore(category) != null) {
            System.out.println("Category already used. Enter a different category: ");
            category = scanner.nextLine();
        }
        int score = calculateScore(player,category);
        player.getScorecard().setScore(category, score);

        player.getScorecard().printScorecard();
        player.totalscore+=score;
        int scoreYet=player.totalscore;
        System.out.println("Score till round "+ player.roundsPlayed+" is:" +player.totalscore);
    }

    private int calculateScore(Player player,String category) {
        int[] diceValues = dice.getValues();
        Arrays.sort(diceValues);
        Map<Integer, Long> frequencyMap = new HashMap<>();
        for (int value : diceValues) {
            frequencyMap.put(value, frequencyMap.getOrDefault(value, 0L) + 1);
        }

        int score = 0;
        switch (category) {
            case "1s":
            case "2s":
            case "3s":
            case "4s":
            case "5s":
            case "6s":
                int faceValue = Integer.parseInt(category.substring(0, category.length() - 1));
                score = frequencyMap.getOrDefault(faceValue, 0L).intValue() * faceValue;
                break;
            case "three_of_a_kind":
                for (Map.Entry<Integer, Long> entry : frequencyMap.entrySet()) {
                    if (entry.getValue() >= 3) {
                        score = Arrays.stream(diceValues).sum();
                        break;
                    }
                }
                break;
            case "four_of_a_kind":
                for (Map.Entry<Integer, Long> entry : frequencyMap.entrySet()) {
                    if (entry.getValue() >= 4) {
                        score = Arrays.stream(diceValues).sum();
                        break;
                    }
                }
                break;
            case "full_house":
                if (frequencyMap.containsValue(3L) && frequencyMap.containsValue(2L)) {
                    score = 25;
                }
                break;
            case "small_straight":
                if (Arrays.toString(diceValues).contains("1") && Arrays.toString(diceValues).contains("2") && Arrays.toString(diceValues).contains("3") && Arrays.toString(diceValues).contains("4") ||
                        Arrays.toString(diceValues).contains("2") && Arrays.toString(diceValues).contains("3") && Arrays.toString(diceValues).contains("4") && Arrays.toString(diceValues).contains("5") ||
                        Arrays.toString(diceValues).contains("3") && Arrays.toString(diceValues).contains("4") && Arrays.toString(diceValues).contains("5") && Arrays.toString(diceValues).contains("6")) {
                    score = 30;
                }
                break;
            case "large_straight":
                if (Arrays.toString(diceValues).contains("1") && Arrays.toString(diceValues).contains("2") && Arrays.toString(diceValues).contains("3") && Arrays.toString(diceValues).contains("4") && Arrays.toString(diceValues).contains("5") ||
                        Arrays.toString(diceValues).contains("2") && Arrays.toString(diceValues).contains("3") && Arrays.toString(diceValues).contains("4") && Arrays.toString(diceValues).contains("5") && Arrays.toString(diceValues).contains("6")) {
                    score = 40;
                }
                break;
            case "yahtzee":
                if (frequencyMap.containsValue(5L)) {
                    score = 50;
                }
                break;
            case "chance":
                score = Arrays.stream(diceValues).sum();
                break;
        }
        return score;
    }

    private void displayPotentialScores(Player player) {
        int[] diceValues = dice.getValues();
        Map<String, Integer> potentialScores = new LinkedHashMap<>();

        // Calculate potential scores for all categories
        potentialScores.put("1s", calculateScore(player,"1s"));
        potentialScores.put("2s", calculateScore(player,"2s"));
        potentialScores.put("3s", calculateScore(player,"3s"));
        potentialScores.put("4s", calculateScore(player,"4s"));
        potentialScores.put("5s", calculateScore(player,"5s"));
        potentialScores.put("6s", calculateScore(player,"6s"));
        potentialScores.put("three_of_a_kind", calculateScore(player,"three_of_a_kind"));
        potentialScores.put("four_of_a_kind", calculateScore(player,"four_of_a_kind"));
        potentialScores.put("full_house", calculateScore(player,"full_house"));
        potentialScores.put("small_straight", calculateScore(player,"small_straight"));
        potentialScores.put("large_straight", calculateScore(player,"large_straight"));
        potentialScores.put("yahtzee", calculateScore(player,"yahtzee"));
        potentialScores.put("chance", calculateScore(player,"chance"));
        for(Map.Entry<String, Integer> i:potentialScores.entrySet()){
            System.out.print(i.getKey()+" : "+i.getValue()+" | ");
        }
        System.out.println();
    }


    public static void main(String[] args) {

        YahtzeeGame game = new YahtzeeGame();
        for (int i = 0; i < 13; i++) {
            game.playGame();
        }
    }
}
