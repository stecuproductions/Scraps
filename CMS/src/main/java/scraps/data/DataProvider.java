package scraps.data;

import scraps.model.Item;

import java.util.List;

public interface DataProvider {
    List<Item> getItems();
    List<String> getNewsletterSubscribers();
}
