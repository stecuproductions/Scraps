package scraps.data;

import scraps.GlobalVars;

import javax.print.DocFlavor;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class DatabaseOrdersManipulator {
    private final String DB_URL = GlobalVars.dbUrl;
    private final String DB_USER = GlobalVars.dbUser;
    private final String DB_PASS = GlobalVars.dbPass;

    public boolean ChangeOrderStatus(int orderId, String orderStatus) {
        String query = "UPDATE \"orders\" SET status = ? WHERE id = ?";

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setString(1, orderStatus);
            stmt.setInt(2, orderId);

            int rowsAffected = stmt.executeUpdate();
            return rowsAffected > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<Map<String, Object>> getOrdersPaginated(int limit, int offset) {
        List<Map<String, Object>> orders = new ArrayList<>();

        String query = "SELECT " +
                "id, created_at, stripe_email, first_name, last_name, products, " +
                "payment_method_type, status " +
                "FROM \"orders\" " +
                "ORDER BY created_at DESC " +
                "LIMIT ? OFFSET ?";

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setInt(1, limit);
            stmt.setInt(2, offset);

            try (ResultSet rs = stmt.executeQuery()) {
                ResultSetMetaData meta = rs.getMetaData();
                int columnCount = meta.getColumnCount();

                while (rs.next()) {
                    Map<String, Object> row = new HashMap<>();
                    for (int i = 1; i <= columnCount; i++) {
                        row.put(meta.getColumnName(i), rs.getObject(i));
                    }
                    orders.add(row);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return orders;
    }
    public int getOrderRowCount() {
        String query = "SELECT COUNT(*) FROM \"orders\"";
        int count = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
             PreparedStatement stmt = conn.prepareStatement(query);
             ResultSet rs = stmt.executeQuery()) {

            if (rs.next()) {
                count = rs.getInt(1);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return count;
    }

}
