import org.junit.jupiter.api.Test;
import scraps.data.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class DataProviderTests {
    @Test
    public void testDataProvider(){
        DataProvider dataProvider = new SampleDataProvider();
        var items = dataProvider.getItems();
        var subscribers = dataProvider.getNewsletterSubscribers();
        for(var item : items){
            System.out.println(item);
        }
        for (var subscriber : subscribers){
            System.out.println(subscriber);
        }
        assertNotNull(items);
        assertNotNull(subscribers);
    }
}
