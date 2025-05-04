package scraps.ui;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import scraps.ui.edit.EditionController;
import scraps.ui.newsletter.NewsletterController;

import java.io.IOException;

public class MainController {
    @FXML
    public void goToEdit(ActionEvent event) {
        try {
            FXMLLoader loader = new FXMLLoader(getClass().getResource("/scraps/ui/edit/EditView.fxml"));
            Parent root = loader.load();
            EditionController controller = loader.getController();
            Stage editionStage = new Stage();
            controller.setStage(editionStage);
            editionStage.setScene(new Scene(root));
            editionStage.show();
        } catch (IOException e) {
            e.printStackTrace();

            Alert alert = new Alert(AlertType.ERROR);
            alert.setTitle("Błąd");
            alert.setHeaderText("Nie udało się załadować widoku edycji.");
            alert.setContentText("Sprawdź, czy plik FXML istnieje i czy nie zawiera błędów.");
            alert.showAndWait();
        }
    }

    public void goToNewsletter(ActionEvent event) {
        try {
            FXMLLoader loader = new FXMLLoader(getClass().getResource("/scraps/ui/newsletter/NewsletterView.fxml"));
            Parent root = loader.load();
            NewsletterController controller = loader.getController();
            Stage newsletterStage = new Stage();
            controller.setStage(newsletterStage);
            newsletterStage.setScene(new Scene(root));
            newsletterStage.show();
        } catch (IOException e) {
            e.printStackTrace();

            Alert alert = new Alert(AlertType.ERROR);
            alert.setTitle("Błąd");
            alert.setHeaderText("Nie udało się załadować widoku newsletter.");
            alert.setContentText("Sprawdź, czy plik FXML istnieje i czy nie zawiera błędów.");
            alert.showAndWait();
        }
    }
}

