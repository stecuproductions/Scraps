package scraps.ui.newsletter;

import javafx.fxml.FXML;
import javafx.scene.layout.FlowPane;
import javafx.stage.Stage;
import scraps.logic.ScrapsManager;
import scraps.model.Item;

import java.util.List;

public class NewsletterController {
    private FlowPane productContainer;
    private  Stage stage;

    private final ScrapsManager scrapsManager = ScrapsManager.getInstance();

    public void setStage(Stage stage){
        this.stage = stage;
    }

    @FXML
    public void initialize() {
    }
}
