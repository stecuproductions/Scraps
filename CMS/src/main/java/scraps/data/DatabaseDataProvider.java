package scraps.data;

import scraps.GlobalVars;
import scraps.model.Item;
import org.json.JSONArray;
import org.json.JSONObject;

import java.sql.*;
import java.util.*;

public class DatabaseDataProvider implements DataProvider {
    private final String DB_URL = GlobalVars.dbUrl;
    private final String DB_USER = GlobalVars.dbUser;
    private final String DB_PASS = GlobalVars.dbPass;

    // DTO (dane produktu bez obrazków)
    record ProductRow(int id, String name, String description, String longDescription,
                      String specifications, int stock, double price) {}

    public List<Item> getItems() {
        List<Item> items = new ArrayList<>();

        String query = """
            SELECT 
                p.id, p.name, p.description, p.long_description, p.specifications, 
                p.stock, p.price,
                pi.image_url
            FROM products p
            LEFT JOIN products_images pi ON p.id = pi.product_id
            ORDER BY p.id
        """;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
             PreparedStatement stmt = conn.prepareStatement(query);
             ResultSet rs = stmt.executeQuery()) {

            Map<Integer, List<String>> imageMap = new HashMap<>();
            Map<Integer, ProductRow> rowMap = new LinkedHashMap<>();

            while (rs.next()) {
                int id = rs.getInt("id");

                // Dodajemy obrazki do listy
                String imageUrl = rs.getString("image_url");
                if (imageUrl != null) {
                    imageMap.computeIfAbsent(id, k -> new ArrayList<>()).add(imageUrl);
                }

                // Dodajemy dane produktu tylko raz
                rowMap.putIfAbsent(id, new ProductRow(
                        id,
                        rs.getString("name"),
                        rs.getString("description"),
                        rs.getString("long_description"),
                        rs.getString("specifications"),
                        rs.getInt("stock"),
                        rs.getDouble("price")
                ));
            }

            // Tworzymy obiekty Item
            for (var entry : rowMap.entrySet()) {
                int id = entry.getKey();
                ProductRow r = entry.getValue();

                // Parsowanie JSON
                JSONObject obj = new JSONObject(r.specifications());
                int weightG = obj.getInt("weightG");
                String material = obj.getString("material");

                JSONArray dims = obj.getJSONArray("dimensions");
                int a = dims.getInt(0);
                int b = dims.getInt(1);
                int c = dims.getInt(2);

                List<String> imageUrls = imageMap.getOrDefault(id, List.of());

                Item item = new Item(r.id(), r.name(), r.description(), r.longDescription(),
                        a, b, c, material, weightG, r.stock(), imageUrls, r.price());

                items.add(item);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return items;
    }

    public List<String> getNewsletterSubscribers() {
        List<String> subscribers = new ArrayList<>();

        String query = "SELECT email FROM newsletter_subscribers";

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
             PreparedStatement stmt = conn.prepareStatement(query);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                subscribers.add(rs.getString("email"));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return subscribers;
    }
}
