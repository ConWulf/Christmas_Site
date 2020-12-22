package christmas;

public class Reindeer {

protected String name;

    public Reindeer(String name) {
        this.name = name;
    }

    public void tellName() {
        System.out.println(this.name);
    }

    public String getName() {
        return name;
    }
}
