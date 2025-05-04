import okhttp3.Response;
import org.junit.jupiter.api.Test;
import scraps.model.Item;
import scraps.logic.ApiRequestSender;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class ApiRequestSenderTests {
    @Test
    public void addItemApiRequestTest(){
        ApiRequestSender sender = new ApiRequestSender();
        Item item = new Item("Test item 2", "test desc 2", "long test desc 2", 2, 2, 2, "Denim", 250, 24, 1006);
        List<File> imageList = new ArrayList<>();
        imageList.add(new File("C:\\Users\\stecu\\OneDrive\\Pulpit\\Folder na torebki\\Torebki pliki robocze\\zdjecia_webp\\p1_1.webp"));
        imageList.add(new File("C:\\Users\\stecu\\OneDrive\\Pulpit\\Folder na torebki\\Torebki pliki robocze\\zdjecia_webp\\p1_0.webp"));
        System.out.println(sender.AddProduct(item, imageList));
    }
    @Test
    public void deleteItemApiRequestTest(){
        ApiRequestSender sender = new ApiRequestSender();
        int itemId = 23;
        sender.DeleteProduct(itemId);
    }
    @Test
    public void editItemApiRequestTest(){
        ApiRequestSender sender = new ApiRequestSender();
        String newName = "Edited Product 1";
        String newDescription = "Edited Product 1 Description";
        String newLongDescription = "Edited Product 1 Long Description";
        int newA = 1;
        int newB = 2;
        int newC = 3;
        int newWeight = 4;
        String newMaterial = "Edited Product 1 Material";
        int newStock = 420;
        double newPrice = 420.00;
        Item newItem = new Item(newName, newDescription, newLongDescription, newA, newB, newC, newMaterial, newWeight, newStock, newPrice);
        int editItemId = 2000;
        System.out.println(sender.EditProduct(editItemId, newItem));
    }

    @Test
    public void getNewsletterApiRequestTest(){
        ApiRequestSender sender = new ApiRequestSender();
        Response response = sender.GetNewsletterSubscribers();
        System.out.println(response);
    }



}
