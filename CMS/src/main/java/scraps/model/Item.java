package scraps.model;

import scraps.GlobalVars;

import java.util.ArrayList ;
import java.util.List ;

public class Item {
    private int id;
    private String name;
    private String description;
    private String longDescription;
    private Specification specification;
    double price;
    private int stock;
    private List<String> imageUrls = new ArrayList<>();

    public Item(int id, String name, String description, String longDescription,  int a, int b, int c, String material, int weightG,  int stock, List<String> imageUrls, double price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.longDescription = longDescription;
        this.specification = new Specification(material, a, b, c, weightG);
        this.stock = stock;
        this.price = price;
        for(String imageUrl : imageUrls){
            this.imageUrls.add(imageUrl);
        }
    }

    public Item(String name, String description, String longDescription,  int a, int b, int c, String material, int weightG,  int stock, double price) {
        this.name = name;
        this.description = description;
        this.longDescription = longDescription;
        this.specification = new Specification(material, a, b, c, weightG);
        this.stock = stock;
        this.price = price;
    }
    public  int getStock() {
        return stock;
    }
    public void setStock(int stock) {
        this.stock = stock;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getLongDescription() {
        return longDescription;
    }
    public void setLongDescription(String longDescription) {
        this.longDescription = longDescription;
    }
    public Specification getSpecification() {
        return specification;
    }
    public List<String> getImageUrls() {
        return imageUrls;
    }
    public double getPrice() {
        return price;
    }

    @Override
    public String toString() {
        return super.toString();
    }
}
