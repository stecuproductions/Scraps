package scraps.logic;

import okhttp3.Response;
import scraps.data.DataProvider;
import scraps.data.DatabaseDataProvider;
import scraps.data.SampleDataProvider;
import scraps.model.Item;

import java.io.File;
import java.util.List;

public class ScrapsManager {
    private  static DataProvider dataProvider = new DatabaseDataProvider();
    private ApiRequestSender apiRequestSender = new ApiRequestSender();
    private static  ScrapsManager _manager;
    private  ScrapsManager() {}
    public static ScrapsManager getInstance() {
        if (_manager == null) {
            _manager = new ScrapsManager();
        }
        return _manager;
    }

    public Response AddNewItem(String name, String description, String longDescription, int a, int b, int c, String material, int weightG, int stock, double price, List<File> imageList) {
        Item newItem = new Item(name, description, longDescription, a, b, c, material, weightG, stock, price);
        return apiRequestSender.AddProduct(newItem, imageList);
    }
    public Response DeleteItem(int id){
        return apiRequestSender.DeleteProduct(id);
    }
    public Response EditItem(int id, Item item){
        return apiRequestSender.EditProduct(id, item);
    }
    public List<Item> GetItemList(){
        return dataProvider.getItems();
    }
}
