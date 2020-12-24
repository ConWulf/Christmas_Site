package christmas;

import java.lang.reflect.Array;
import java.util.*;

public class Santa {

    public static Reindeer[] reindeer;

    public static void main(String[] args) {
        List<String> toyList = new ArrayList<>();
        Map<String, List<String>> wishList= new HashMap<>();
        Scanner sc = new Scanner(System.in);

        do {
            System.out.println("what is your name?");
            String name = sc.nextLine();
            System.out.println("What do you want for Christmas?");
            String present = sc.nextLine();
            toyList.add(present);
            wishList.putIfAbsent(name, toyList);
            System.out.println("do you want anything else?");
            String answer = sc.nextLine();
            if (!answer.equalsIgnoreCase("y")) {
                System.out.println(wishList);
                break;
            }
        } while (true);
            reindeer = new Reindeer[10];
        reindeer[0] = new Reindeer("Olive");
        reindeer[1] = new Reindeer("Dancer");
        reindeer[2] = new Reindeer("Prancer");
        reindeer[3] = new Reindeer("Rudolf");
        reindeer[4] = new Reindeer("Comet");
        reindeer[5] = new Reindeer("Cupid");
        reindeer[6] = new Reindeer("Dasher");
        reindeer[7] = new Reindeer("Vixen");
        reindeer[8] = new Reindeer("Blitzen");
        reindeer[9] = new Reindeer("Donner");
        Reindeer[] test = addReindeer(reindeer, "test");
        for (Reindeer name: test) {
            name.tellName();
        }
    }

    @org.jetbrains.annotations.NotNull
    public static Reindeer[] addReindeer(Reindeer[] reindeer, String name) {
        Reindeer[] newArr = Arrays.copyOf(reindeer, reindeer.length);
        newArr[newArr.length-1] = new Reindeer(name);
        return newArr;
    }

}
