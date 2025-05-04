package scraps.ui.edit;

import javafx.fxml.FXML;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.FlowPane;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.VBox;
import javafx.stage.FileChooser;
import javafx.stage.Stage;
import okhttp3.Response;
import scraps.logic.ScrapsManager;
import scraps.model.Item;
import javafx.scene.layout.HBox;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

public class EditionController {

    @FXML
    private FlowPane productContainer;
    private  Stage stage;

    private final ScrapsManager scrapsManager = ScrapsManager.getInstance();

    public void setStage(Stage stage){
        this.stage = stage;
    }

    @FXML
    public void initialize() {
        List<Item> items = scrapsManager.GetItemList();

        for (Item item : items) {
            productContainer.getChildren().add(createProductCard(item));
        }
    }

    private VBox createProductCard(Item item) {
        VBox card = new VBox(10);
        card.setStyle("""
        -fx-padding: 15;
        -fx-border-color: #999;
        -fx-border-radius: 10;
        -fx-border-width: 1;
        -fx-background-color: #f9f9f9;
        -fx-background-radius: 10;
    """);

        Label nameLabel = new Label("[" + item.getId() + "] " + item.getName());
        nameLabel.setStyle("-fx-font-size: 20px; -fx-font-weight: bold;");

        Label shortDesc = new Label(item.getDescription());
        shortDesc.setStyle("-fx-font-style: italic;");

        Label longDesc = new Label(item.getLongDescription());
        longDesc.setWrapText(true);

        VBox specs = new VBox(3);
        specs.getChildren().addAll(
                new Label("a: " + item.getSpecification().getDimensions()[0]),
                new Label("b: " + item.getSpecification().getDimensions()[1]),
                new Label("c: " + item.getSpecification().getDimensions()[2]),
                new Label("Materiał: " + item.getSpecification().getMaterial()),
                new Label("Waga: " + item.getSpecification().getWeightG() + "g"),
                new Label("Stan magazynowy: " + item.getStock()),
                new Label("Cena: " + String.format("%.2f zł", item.getPrice()))
        );

        // Obrazki
        VBox images = new VBox(5);
        for (String url : item.getImageUrls()) {
            String fixedUrl = url.replace("/upload/", "/upload/f_auto/");
            ImageView img = new ImageView(new Image(fixedUrl, 120, 120, true, true));
            img.setStyle("-fx-effect: dropshadow(three-pass-box, rgba(0,0,0,0.2), 5, 0, 0, 2);");
            images.getChildren().add(img);
        }

        // Całość
        card.getChildren().addAll(nameLabel, shortDesc, longDesc, specs, images);

        Button editButton = new Button("Edytuj");
        editButton.setStyle("""
    -fx-background-color: #007bff;
    -fx-text-fill: white;
    -fx-font-weight: bold;
    -fx-cursor: hand;
    -fx-padding: 5 15;
    -fx-background-radius: 5;
""");
        editButton.setOnAction(e -> onEditProduct(item));


        Button deleteButton = new Button("Usuń");
        deleteButton.setStyle("""
    -fx-background-color: #dc3545;
    -fx-text-fill: white;
    -fx-font-weight: bold;
    -fx-cursor: hand;
    -fx-padding: 5 15;
    -fx-background-radius: 5;
""");
        deleteButton.setOnAction(e -> {
            Alert alert = new Alert(Alert.AlertType.CONFIRMATION);
            alert.setTitle("Potwierdzenie");
            alert.setHeaderText("Usuwanie produktu");
            alert.setContentText("Czy na pewno chcesz usunąć produkt: " + item.getName() + "?");

            // Opcjonalnie: zmień przyciski na "Tak" i "Nie"
            ButtonType tak = new ButtonType("Tak");
            ButtonType nie = new ButtonType("Nie");
            alert.getButtonTypes().setAll(tak, nie);

            alert.showAndWait().ifPresent(response -> {
                if (response == tak) {
                    productContainer.getChildren().remove(card);
                    Response resp = scrapsManager.DeleteItem(item.getId());
                    if(resp.code() == 200) {
                        Alert info = new Alert(Alert.AlertType.INFORMATION);
                        info.setTitle("Sukces");
                        info.setHeaderText(null);
                        info.setContentText("Produkt \"" + item.getName() + "\" został usuniety pomyślnie.");
                        info.showAndWait();
                    }
                    else{
                        Alert info = new Alert(Alert.AlertType.ERROR);
                        info.setTitle("Failed");
                        info.setHeaderText(null);
                        info.setContentText("Cos poszlo nie tak. Skontaktuj sie z developerem lub sproboj ponownie");
                        info.showAndWait();
                    }
                } else {
                    System.out.println("Anulowano usuwanie.");
                }
            });
        });

        HBox buttonBar = new HBox(10, editButton, deleteButton);
        card.getChildren().add(buttonBar);


        return card;
    }

    @FXML
    private void onAddProduct() {
        Stage formStage = new Stage();
        formStage.setTitle("Dodaj produkt");

        GridPane grid = new GridPane();
        grid.setVgap(10);
        grid.setHgap(10);
        grid.setStyle("-fx-padding: 20;");

        TextField nameField = new TextField();
        TextField descField = new TextField();
        TextArea longDescField = new TextArea();

        Spinner<Integer> aField = new Spinner<>(0, 9999, 0);
        aField.setEditable(true);
        Spinner<Integer> bField = new Spinner<>(0, 9999, 0);
        bField.setEditable(true);
        Spinner<Integer> cField = new Spinner<>(0, 9999, 0);
        cField.setEditable(true);
        TextField materialField = new TextField();
        Spinner<Integer> weightField = new Spinner<>(0, 99999, 0);
        weightField.setEditable(true);
        Spinner<Integer> stockField = new Spinner<>(0, 9999, 0);
        stockField.setEditable(true);
        Spinner<Double> priceField = new Spinner<>();
        priceField.setEditable(true);
        priceField.setValueFactory(new SpinnerValueFactory.DoubleSpinnerValueFactory(0.0, 9999.0, 0.0, 0.1));
        VBox selectedImagesBox = new VBox(5);
        List<String> imagePaths = new java.util.ArrayList<>();
        AtomicReference<List<File>> imageFiles = new AtomicReference<>(new ArrayList<>());
        Button chooseImages = new Button("Wybierz zdjęcia");
        chooseImages.setOnAction(e -> {
            FileChooser fileChooser = new FileChooser();
            fileChooser.setTitle("Wybierz zdjęcia");
            fileChooser.getExtensionFilters().addAll(
                    new FileChooser.ExtensionFilter("Pliki graficzne", "*.png", "*.jpg", "*.jpeg")
            );
            List<java.io.File> files = fileChooser.showOpenMultipleDialog(formStage);
            if (files != null) {
                imagePaths.clear();
                selectedImagesBox.getChildren().clear();
                for (var f : files) {
                    imagePaths.add(f.toURI().toString());
                    selectedImagesBox.getChildren().add(new Label(f.getName()));
                    System.out.println(f.getName());
                }
            }
            imageFiles.set(files);
        });


        Button submit = new Button("Zatwierdź");
        submit.setStyle("-fx-background-color: #28a745; -fx-text-fill: white; -fx-font-weight: bold;");
        submit.setOnAction(e -> {
            Alert confirm = new Alert(Alert.AlertType.CONFIRMATION);
            confirm.setTitle("Potwierdzenie");
            confirm.setHeaderText("Dodawanie produktu");
            confirm.setContentText("Czy na pewno chcesz dodać ten produkt?");

            ButtonType tak = new ButtonType("Tak");
            ButtonType nie = new ButtonType("Nie");
            confirm.getButtonTypes().setAll(tak, nie);

            confirm.showAndWait().ifPresent(response -> {
                if (response == tak) {
                    // 🧠 TODO: dodaj logikę dodawania produktu do scrapsManager tutaj
                   Response resp = scrapsManager.AddNewItem(nameField.getText(), descField.getText(), longDescField.getText(), aField.getValue(), bField.getValue(), cField.getValue(), materialField.getText(), weightField.getValue(), stockField.getValue(), priceField.getValue(), imageFiles.get());
                    if(resp.code() == 200) {
                        Alert info = new Alert(Alert.AlertType.INFORMATION);
                        info.setTitle("Sukces");
                        info.setHeaderText(null);
                        info.setContentText("Produkt \"" + nameField.getText() + "\" został dodany pomyślnie.");
                        info.showAndWait();
                        formStage.close();
                    }
                    else{
                        Alert info = new Alert(Alert.AlertType.ERROR);
                        info.setTitle("Failed");
                        info.setHeaderText(null);
                        info.setContentText("Cos poszlo nie tak. Skontaktuj sie z developerem lub sproboj ponownie");
                        info.showAndWait();
                        formStage.close();
                    }
                } else {
                    System.out.println("Anulowano dodawanie produktu.");
                }
            });
        });

        // Dodaj wszystko do siatki
        grid.addRow(0, new Label("Nazwa:"), nameField);
        grid.addRow(1, new Label("Opis:"), descField);
        grid.addRow(2, new Label("Opis rozszerzony:"), longDescField);
        grid.addRow(3, new Label("a:"), aField, new Label("b:"), bField, new Label("c:"), cField);
        grid.addRow(4, new Label("Materiał:"), materialField);
        grid.addRow(5, new Label("Waga (g):"), weightField);
        grid.addRow(6, new Label("Stan magazynowy:"), stockField);
        grid.addRow(7, new Label("Cena:"), priceField);
        HBox imageSection = new HBox(10, chooseImages, selectedImagesBox);
        grid.addRow(8, new Label("Zdjęcia:"), imageSection);
        grid.add(submit, 0, 9);

        formStage.setScene(new Scene(grid));
        formStage.show();
    }


    public void onEditProduct(Item item) {
        Stage formStage = new Stage();
        formStage.setTitle("Edytuj produkt");

        GridPane grid = new GridPane();
        grid.setVgap(10);
        grid.setHgap(10);
        grid.setStyle("-fx-padding: 20;");

        TextField nameField = new TextField(item.getName());
        TextField descField = new TextField(item.getDescription());
        TextArea longDescField = new TextArea(item.getLongDescription());

        Spinner<Integer> aField = new Spinner<>(0, 9999, item.getSpecification().getDimensions()[0]);
        aField.setEditable(true);
        Spinner<Integer> bField = new Spinner<>(0, 9999, item.getSpecification().getDimensions()[1]);
        bField.setEditable(true);
        Spinner<Integer> cField = new Spinner<>(0, 9999, item.getSpecification().getDimensions()[2]);
        cField.setEditable(true);
        TextField materialField = new TextField(item.getSpecification().getMaterial());
        Spinner<Integer> weightField = new Spinner<>(0, 99999, item.getSpecification().getWeightG());
        weightField.setEditable(true);
        Spinner<Integer> stockField = new Spinner<>(0, 9999, item.getStock());
        stockField.setEditable(true);
        Spinner<Double> priceField = new Spinner<>();
        priceField.setEditable(true);
        priceField.setValueFactory(new SpinnerValueFactory.DoubleSpinnerValueFactory(0.0, 9999.0, item.getPrice(), 0.1));

        // Zdjęcia tylko do podglądu
        VBox imagePreview = new VBox(5);
        for (String url : item.getImageUrls()) {
            imagePreview.getChildren().add(new Label(url)); // albo miniaturki, jeśli chcesz
        }

        Button submit = new Button("Zapisz zmiany");
        submit.setStyle("-fx-background-color: #007bff; -fx-text-fill: white; -fx-font-weight: bold;");
        submit.setOnAction(e -> {
            Alert confirm = new Alert(Alert.AlertType.CONFIRMATION);
            confirm.setTitle("Potwierdzenie");
            confirm.setHeaderText("Edycja produktu");
            confirm.setContentText("Czy na pewno chcesz zapisać zmiany?");

            confirm.showAndWait().ifPresent(response -> {
                if (response == ButtonType.OK) {
                    Item newItem = new Item( nameField.getText(), descField.getText(), longDescField.getText(), aField.getValue(), bField.getValue(), cField.getValue(), materialField.getText(), weightField.getValue(), stockField.getValue(), priceField.getValue());
                    Response resp = scrapsManager.EditItem(item.getId(), newItem);
                    if(resp.code() == 200) {
                        Alert info = new Alert(Alert.AlertType.INFORMATION);
                        info.setTitle("Sukces");
                        info.setHeaderText(null);
                        info.setContentText("Produkt \"" + nameField.getText() + "\" został edytoway pomyślnie.");
                        info.showAndWait();
                        formStage.close();
                    }
                    else{
                        Alert info = new Alert(Alert.AlertType.ERROR);
                        info.setTitle("Failed");
                        info.setHeaderText(null);
                        info.setContentText("Cos poszlo nie tak. Skontaktuj sie z developerem lub sproboj ponownie");
                        info.showAndWait();
                        formStage.close();
                    }

                }
            });
        });

        // Układ formularza
        grid.addRow(0, new Label("Nazwa:"), nameField);
        grid.addRow(1, new Label("Opis:"), descField);
        grid.addRow(2, new Label("Opis rozszerzony:"), longDescField);
        grid.addRow(3, new Label("a:"), aField, new Label("b:"), bField, new Label("c:"), cField);
        grid.addRow(4, new Label("Materiał:"), materialField);
        grid.addRow(5, new Label("Waga (g):"), weightField);
        grid.addRow(6, new Label("Stan magazynowy:"), stockField);
        grid.addRow(7, new Label("Cena:"), priceField);
        grid.addRow(8, new Label("Zdjęcia (nie do edycji):"), imagePreview);
        grid.add(submit, 0, 9);

        formStage.setScene(new Scene(grid));
        formStage.show();
        stage.close();

    }


}
