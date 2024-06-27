import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

public class Scorecard {
    private Map<String, Integer> scores;

    public Scorecard() {
        scores = new LinkedHashMap<>();
        scores.put("1s", null);
        scores.put("2s", null);
        scores.put("3s", null);
        scores.put("4s", null);
        scores.put("5s", null);
        scores.put("6s", null);
        scores.put("three_of_a_kind", null);
        scores.put("four_of_a_kind", null);
        scores.put("full_house", null);
        scores.put("small_straight", null);
        scores.put("large_straight", null);
        scores.put("yahtzee", null);
        scores.put("chance", null);
    }

    public void setScore(String category, int score) {
        if (scores.containsKey(category)) {
            scores.put(category, score);
        }
    }

    public Integer getScore(String category) {
        return scores.get(category);
    }

    public void printScorecard() {
        System.out.println("Scorecard:");
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.print(entry.getKey() + ": " + (entry.getValue() != null ? entry.getValue() : "")+ " | ");
        }
        System.out.println();

    }
}
