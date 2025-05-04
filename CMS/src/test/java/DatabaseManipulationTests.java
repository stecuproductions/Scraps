import okhttp3.Response;
import org.junit.jupiter.api.Test;
import scraps.data.DatabaseOrdersManipulator;
import scraps.model.Item;
import scraps.logic.ApiRequestSender;

import java.io.File;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class DatabaseManipulationTests {
    @Test
    public void orderStatusChangeTest() throws SQLException {
        DatabaseOrdersManipulator manipulator = new DatabaseOrdersManipulator();
        manipulator.ChangeOrderStatus(1, "sent");
    }

    @Test
    public void selectNRowsTest() throws SQLException {
        DatabaseOrdersManipulator manipulator= new DatabaseOrdersManipulator();
        var result = manipulator.getOrdersPaginated(10, 0);
        System.out.println(result);
    }

    @Test
    public void getRowCountTest() throws SQLException {
        DatabaseOrdersManipulator manipulator= new DatabaseOrdersManipulator();
        var result = manipulator.getOrderRowCount();
        System.out.println(result);
    }

}