public class Player {
    private String name;
    private Scorecard scorecard;
    public int totalscore;
    public int roundsPlayed;


    public Player(String name) {
        this.name = name;
        this.scorecard = new Scorecard();
        totalscore=0;

    }

    public String getName() {
        return name;
    }

    public Scorecard getScorecard() {
        return scorecard;
    }
    public int getscore() {
        return totalscore;
    }
    public int getround() {
        return roundsPlayed;
    }

}
