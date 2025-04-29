package scraps.logic;

import scraps.data.DataProvider;
import scraps.data.Item;
import scraps.data.Specification;

import java.io.File;
import java.util.List;

public class ScrapsManager {
    private  static DataProvider dataProvider;
    private ApiRequestSender apiRequestSender = new ApiRequestSender();
    public void AddNewItem(String name, String description, String longDescription,  int a, int b, int c, String material, int weightG,  int stock, double price, List<File> imageList){
        Item newItem = new Item(name, description, longDescription, a, b, c, material, weightG, stock, price);
        apiRequestSender.AddProduct(newItem, imageList);
    }
    public void DeleteItem(int id){
        apiRequestSender.DeleteProduct(id);
    }
    public void EditItem(int id, Item item){
        apiRequestSender.EditProduct(id, item);
    }
    public List<Item> GetItemList(){
        return dataProvider.getItems();
    }
}
