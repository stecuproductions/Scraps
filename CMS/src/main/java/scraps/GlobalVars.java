package scraps;

import io.github.cdimascio.dotenv.Dotenv;

public class GlobalVars {
    private static Dotenv dotenv = Dotenv.load();
    public static final String adminToken = dotenv.get("ADMIN_TOKEN");
    public static final String apiUrl = dotenv.get("API_ADDRESS");
}
