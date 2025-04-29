import org.junit.jupiter.api.Test;
import scraps.data.Item;
import scraps.logic.ApiRequestSender;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class ApiRequestSenderTests {
    @Test
    public void addItemApiRequestTest(){
        ApiRequestSender sender = new ApiRequestSender();
        Item item = new Item("new item 2", "new desc 2", "long desc 2", 1, 1, 1, "Denim", 250, 24, 2137);
        List<File> imageList = new ArrayList<>();
        imageList.add(new File("C:\\Users\\stecu\\OneDrive\\Obrazy\\Z aparatu\\WIN_20240609_00_10_27_Pro.jpg"));
        imageList.add(new File("C:\\Users\\stecu\\OneDrive\\Obrazy\\Z aparatu\\WIN_20240609_00_10_24_Pro.jpg"));
        sender.AddProduct(item, imageList);
    }
    @Test
    public void deleteItemApiRequestTest(){
        ApiRequestSender sender = new ApiRequestSender();
        int itemId = 2415;
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
        int editItemId = 1;
        sender.EditProduct(editItemId, newItem);
    }



}
