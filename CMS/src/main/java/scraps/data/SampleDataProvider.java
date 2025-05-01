package scraps.data;

import scraps.model.Item;

import java.util.*;

public class SampleDataProvider implements DataProvider {
    private List<Item> items = new ArrayList<>();
    private List<String> newsletterSubscribers = new ArrayList<>();
    public SampleDataProvider() {
        items.add(new Item(
                1,
                "Product 1",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                10, 15, 5,
                "Premium quality",
                250,
                10,
                List.of(
                        "https://example.com/images/product2-1.jpg",
                        "https://example.com/images/product2-2.jpg",
                        "https://example.com/images/product2-3.jpg"
                ),
                24
        ));

        items.add(new Item(
                2,
                "Product 2",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                15, 20, 8,
                "High quality",
                300,
                5,
                List.of(
                        "https://example.com/images/product1-1.jpg",
                        "https://example.com/images/product1-2.jpg"
                ),
                24

        ));
        newsletterSubscribers.add("john@doe.com");
        newsletterSubscribers.add("jane@doe.com");
        newsletterSubscribers.add("mike@domain.com");
        newsletterSubscribers.add("sarah@anothermail.com");
        newsletterSubscribers.add("paul@randomsite.org");
        newsletterSubscribers.add("emma@coolmail.net");
        newsletterSubscribers.add("lucas@domain.co");
        newsletterSubscribers.add("mia@somethingmail.com");
        newsletterSubscribers.add("oliver@fakemail.com");
        newsletterSubscribers.add("lily@samplemail.com");
    }

    public List<Item> getItems() {
        return items;
    }
    public List<String> getNewsletterSubscribers() {
        return newsletterSubscribers;
    }



}
