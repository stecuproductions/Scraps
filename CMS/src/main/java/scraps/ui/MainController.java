package scraps.ui;

import javafx.fxml.FXML;
import javafx.scene.control.Label;

public class MainController {

    @FXML
    private Label helloLabel;

    @FXML
    private void onClick() {
        helloLabel.setText("Kliknięto!");
    }
}
