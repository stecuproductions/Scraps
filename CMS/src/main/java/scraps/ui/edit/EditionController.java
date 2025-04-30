package scraps.ui.edition;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import scraps.logic.ScrapsManager;
import scraps.model.Item;

import java.util.List;

public class EditionController {

    @FXML
    private VBox productContainer;

    private final ScrapsManager scrapsManager = ScrapsManager.getInstance();

    @FXML
    public void initialize() {
        List<Item> items = scrapsManager.GetItemList();

        for (Item item : items) {
            productContainer.getChildren().add(createProductCard(item));
        }
    }

    private VBox createProductCard(Item item) {
        VBox card = new VBox(10);
        card.setStyle("-fx-padding: 10; -fx-border-color: gray; -fx-border-width: 1;");

        Label nameLabel = new Label(item.getName());
        nameLabel.setStyle("-fx-font-size: 18px; -fx-font-weight: bold;");

        VBox imagesContainer = new VBox(5);

        for (String imageUrl : item.getImageUrls()) {
            ImageView imageView = new ImageView(new Image(imageUrl, 100, 100, true, true));
            imagesContainer.getChildren().add(imageView);
        }

        card.getChildren().addAll(nameLabel, imagesContainer);

        return card;
    }
}
