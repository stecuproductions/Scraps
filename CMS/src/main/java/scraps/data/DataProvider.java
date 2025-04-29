package scraps.data;

import java.util.List;

public interface DataProvider {
    List<Item> getItems();
    List<String> getNewsletterSubscribers();
}
