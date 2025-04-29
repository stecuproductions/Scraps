package scraps.logic;


import com.google.gson.Gson;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import scraps.GlobalVars;
import scraps.data.Item;

import java.io.File;
import java.util.List;


public class ApiRequestSender {
    private OkHttpClient client = new OkHttpClient();

    public void AddProduct(Item item, List<File> imageList){
        Gson gson = new Gson();
        String specJson = gson.toJson(item.getSpecification());

        MultipartBody.Builder formBuilder = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("name", item.getName())
                .addFormDataPart("price", String.valueOf(item.getPrice()))
                .addFormDataPart("description", item.getDescription())
                .addFormDataPart("stock", String.valueOf(item.getStock()))
                .addFormDataPart("longDescription", item.getLongDescription())
                .addFormDataPart("specifications", specJson);

        for (File image : imageList) {
            formBuilder.addFormDataPart(
                    "images",
                    image.getName(),
                    RequestBody.create(image, MediaType.parse("image/*")) // <-- domyślny typ obrazka
            );
        }

        RequestBody formData = formBuilder.build();

        Request request = new Request.Builder()
                .url(GlobalVars.apiUrl + "/api/products/add")
                .post(formData)
                .addHeader("Authorization", GlobalVars.adminToken)
                .build();
        try(Response response = client.newCall(request).execute()){
            System.out.println(response);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void DeleteProduct(int id){


        MultipartBody.Builder formBuilder = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("id", String.valueOf(id));


        RequestBody formData = formBuilder.build();

        Request request = new Request.Builder()
                .url(GlobalVars.apiUrl + "/api/products/delete")
                .delete(formData)
                .addHeader("Authorization", GlobalVars.adminToken)
                .build();
        try(Response response = client.newCall(request).execute()){
            System.out.println(response);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void EditProduct(int id, Item item){
        Gson gson = new Gson();
        String specJson = gson.toJson(item.getSpecification());
        MultipartBody.Builder formBuilder = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("id", String.valueOf(id))
                .addFormDataPart("name", item.getName())
                .addFormDataPart("price", String.valueOf(item.getPrice()))
                .addFormDataPart("description", item.getDescription())
                .addFormDataPart("stock", String.valueOf(item.getStock()))
                .addFormDataPart("longDescription", item.getLongDescription())
                .addFormDataPart("specifications", specJson);
        RequestBody formData = formBuilder.build();
        Request request = new Request.Builder()
                .url(GlobalVars.apiUrl + "/api/products/edit")
                .put(formData)
                .addHeader("Authorization", GlobalVars.adminToken)
                .build();
        try(Response response = client.newCall(request).execute()){
            System.out.println(response);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}


